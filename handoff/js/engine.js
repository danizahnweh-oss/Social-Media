(function () {
  const STORE_KEY = "pulse-resistance-save-v1";
  const LEADER_KEY = "pulse-resistance-leaderboard-v1";

  const missionFiles = [
    "01-algorithm.json",
    "02-fake-news.json",
    "03-deepfakes.json",
    "04-echo-chambers.json",
    "05-influencer.json",
    "06-digital-footprint.json",
    "07-cyberbullying.json",
    "08-privacy.json",
    "09-mental-health.json",
    "10-final-boss.json"
  ];

  const avatarPaths = [1, 2, 3, 4, 5, 6].map((n) => `assets/img/avatars/avatar-${n}.svg`);

  const fallbackState = {
    agent: null,
    sound: true,
    points: 0,
    correct: 0,
    attempts: 0,
    completed: {},
    missionStats: {},
    achievements: {},
    lastView: "landing"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function normaliseAnswer(value) {
    return String(value || "").trim().toLowerCase();
  }

  const GameEngine = {
    config: null,
    missions: [],
    achievements: [],
    state: clone(fallbackState),
    avatars: avatarPaths,

    async init() {
      const [config, achievementPayload, missions] = await Promise.all([
        fetch("data/config.json").then((res) => res.json()),
        fetch("data/achievements.json").then((res) => res.json()),
        Promise.all(
          missionFiles.map((file) => fetch(`data/missions/${file}`).then((res) => res.json()))
        )
      ]);

      this.config = config;
      this.achievements = achievementPayload.achievements || [];
      this.missions = missions.sort((a, b) => a.order - b.order);
      const saved = readJson(STORE_KEY, null);
      this.state = Object.assign(clone(fallbackState), saved || {});
      if (typeof this.state.sound !== "boolean") this.state.sound = config.soundEnabledByDefault;
      this.save();
      return this;
    },

    save() {
      writeJson(STORE_KEY, this.state);
    },

    reset() {
      this.state = clone(fallbackState);
      this.state.sound = this.config ? this.config.soundEnabledByDefault : true;
      this.save();
    },

    createAgent(codename, avatar, classCode) {
      const cleanName = String(codename || "").trim().slice(0, 24);
      this.state.agent = {
        codename: cleanName,
        avatar: avatar || avatarPaths[0],
        classCode: String(classCode || "").trim().slice(0, 20),
        createdAt: new Date().toISOString()
      };
      this.state.lastView = "hub";
      this.save();
      return this.state.agent;
    },

    toggleSound() {
      this.state.sound = !this.state.sound;
      this.save();
      return this.state.sound;
    },

    isUnlocked(mission) {
      if (!mission.unlockedBy) return true;
      return Boolean(this.state.completed[mission.unlockedBy]);
    },

    missionStatus(mission) {
      if (this.state.completed[mission.id]) return "complete";
      if (this.isUnlocked(mission)) return "available";
      return "locked";
    },

    getMission(id) {
      return this.missions.find((mission) => mission.id === id);
    },

    getRank(points = this.state.points) {
      return [...this.config.ranks].reverse().find((rank) => points >= rank.minPoints) || this.config.ranks[0];
    },

    getNextRank(points = this.state.points) {
      return this.config.ranks.find((rank) => rank.minPoints > points) || null;
    },

    progressPercent() {
      const completed = Object.keys(this.state.completed).length;
      return Math.round((completed / this.missions.length) * 100);
    },

    accuracy() {
      if (!this.state.attempts) return 1;
      return this.state.correct / this.state.attempts;
    },

    getLeaderboard() {
      const saved = readJson(LEADER_KEY, []);
      const self = this.state.agent
        ? [{ name: this.state.agent.codename, points: this.state.points, self: true }]
        : [];
      const seeded = [
        { name: "Vega", points: 1640 },
        { name: "Static", points: 1270 },
        { name: "Byte", points: 860 },
        { name: "Echo", points: 520 }
      ];
      return [...saved, ...seeded, ...self]
        .sort((a, b) => b.points - a.points)
        .slice(0, 12)
        .map((entry, index) => Object.assign({ rank: index + 1 }, entry));
    },

    upsertLeaderboard() {
      if (!this.state.agent) return;
      const saved = readJson(LEADER_KEY, []);
      const withoutSelf = saved.filter((entry) => entry.name !== this.state.agent.codename);
      withoutSelf.push({ name: this.state.agent.codename, points: this.state.points });
      writeJson(LEADER_KEY, withoutSelf.slice(-20));
    },

    revealHint(puzzle, hintIndex) {
      const cost = this.config.hintCosts[hintIndex] || 0;
      return { text: puzzle.hints[hintIndex], cost };
    },

    scorePuzzle(puzzle, puzzleState) {
      const hintsUsed = puzzleState.hintsUsed || 0;
      const hintCost = this.config.hintCosts
        .slice(0, hintsUsed)
        .reduce((sum, cost) => sum + cost, 0);
      return Math.max(0, puzzle.points - hintCost);
    },

    completePuzzle(missionId, puzzle, puzzleState, isCorrect) {
      const missionStats = this.state.missionStats[missionId] || {
        solved: {},
        hints: 0,
        wrong: 0,
        points: 0
      };

      this.state.attempts += 1;

      if (isCorrect) {
        this.state.correct += 1;
        if (!missionStats.solved[puzzle.id]) {
          const earned = this.scorePuzzle(puzzle, puzzleState);
          missionStats.solved[puzzle.id] = { earned, hints: puzzleState.hintsUsed || 0 };
          missionStats.points += earned;
          missionStats.hints += puzzleState.hintsUsed || 0;
          this.state.points += earned;
        }
      } else {
        missionStats.wrong += 1;
      }

      this.state.missionStats[missionId] = missionStats;
      this.save();
      return missionStats.solved[puzzle.id] || null;
    },

    completeMission(mission) {
      const stats = this.state.missionStats[mission.id] || { solved: {}, hints: 0, wrong: 0, points: 0 };
      this.state.completed[mission.id] = {
        completedAt: new Date().toISOString(),
        points: stats.points,
        hints: stats.hints,
        wrong: stats.wrong
      };

      const unlocked = [];
      (mission.achievementHooks || []).forEach((hook) => {
        if (hook === "no-hint-run" && stats.hints > 0) return;
        if (hook === "perfect-mission" && stats.wrong > 0) return;
        this.unlockAchievement(hook, unlocked);
      });

      if (mission.id === "final-boss") {
        this.unlockAchievement("campaign-complete", unlocked);
        if (this.getEnding().id === "signalRestored") this.unlockAchievement("best-ending", unlocked);
      }

      this.upsertLeaderboard();
      this.save();
      return { stats, unlocked };
    },

    unlockAchievement(id, collection) {
      if (this.state.achievements[id]) return false;
      const achievement = this.achievements.find((item) => item.id === id);
      if (!achievement) return false;
      this.state.achievements[id] = new Date().toISOString();
      if (collection) collection.push(achievement);
      return true;
    },

    getEnding() {
      const points = this.state.points;
      const accuracy = this.accuracy();
      if (
        points >= this.config.endingThresholds.signalRestored &&
        accuracy >= this.config.accuracyForBestEnding
      ) {
        return {
          id: "signalRestored",
          title: "Signal restored",
          text: "You cut through ALGO's strongest signals and gave the Resistance a clear route into the Core. The feed is not fixed forever, but people can see what was hidden."
        };
      }
      if (points >= this.config.endingThresholds.ceasefire) {
        return {
          id: "ceasefire",
          title: "Ceasefire",
          text: "You forced ALGO to slow down. Some parts of PULSE still distort the truth, but your evidence gives the Resistance time to regroup."
        };
      }
      return {
        id: "stillWatching",
        title: "Still watching",
        text: "ALGO keeps part of the feed under control, but you now know the pattern. Return to the missions, use fewer hints, and rebuild the signal."
      };
    },

    checkAnswer(puzzle, answer) {
      switch (puzzle.type) {
        case "multiple-choice":
        case "audio":
          return answer === puzzle.correctIndex;
        case "multi-select":
          return sameSet(answer, puzzle.correctIndices);
        case "order":
          return Array.isArray(answer) && answer.every((value, index) => value === puzzle.correctOrder[index]);
        case "categorise":
          return Array.isArray(answer) && answer.every((value, index) => value === puzzle.correctBucket[index]);
        case "text-input":
          return (puzzle.acceptedAnswers || []).map(normaliseAnswer).includes(normaliseAnswer(answer));
        case "hotspot": {
          const correctIds = puzzle.regions.filter((region) => region.correct).map((region) => region.id);
          return correctIds.every((id) => answer.includes(id)) && answer.length === correctIds.length;
        }
        case "draw-spot": {
          const boxes = Array.isArray(answer) ? answer : [];
          if (!boxes.length) return false;
          const MAX_AREA = 0.3;
          const centres = puzzle.regions.map((region) => ({
            correct: !!region.correct,
            cx: (region.x + region.w / 2) / 300,
            cy: (region.y + region.h / 2) / 220
          }));
          const correctCentres = centres.filter((c) => c.correct);
          const covers = (box, c) =>
            c.cx >= box.x && c.cx <= box.x + box.w && c.cy >= box.y && c.cy <= box.y + box.h;
          const validBoxes = boxes.filter((box) => box.w * box.h <= MAX_AREA);
          const foundCount = correctCentres.filter((c) => validBoxes.some((box) => covers(box, c))).length;
          const required = puzzle.requiredCorrect || correctCentres.length;
          const noStray = boxes.every((box) => box.w * box.h <= MAX_AREA && correctCentres.some((c) => covers(box, c)));
          return foundCount >= required && noStray;
        }
        case "chat-sim":
          return answer === puzzle.decision.correctIndex;
        case "feed-mark": {
          const correctIds = puzzle.posts.filter((post) => post.flag).map((post) => post.id);
          return sameSet(answer, correctIds);
        }
        default:
          return false;
      }
    }
  };

  function sameSet(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    const left = [...a].sort();
    const right = [...b].sort();
    return left.every((value, index) => value === right[index]);
  }

  window.GameEngine = GameEngine;
})();
