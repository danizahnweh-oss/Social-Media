(function () {
  const app = document.getElementById("app");
  const toastStack = document.getElementById("toast");
  const sounds = {};

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(className, text, onClick) {
    const node = el("button", className, text);
    node.type = "button";
    if (onClick) node.addEventListener("click", onClick);
    return node;
  }

  function setView(viewName) {
    GameEngine.state.lastView = viewName;
    GameEngine.save();
  }

  function play(name) {
    if (!GameEngine.state.sound) return;
    if (!sounds[name]) sounds[name] = new Audio(`assets/audio/${name}.wav`);
    sounds[name].currentTime = 0;
    sounds[name].play().catch(() => {});
  }

  function toast(message) {
    const node = el("div", "toast", message);
    toastStack.append(node);
    window.setTimeout(() => node.remove(), 4200);
  }

  function showConfirm(options) {
    const overlay = el("div", "modal-backdrop");
    const dialog = el("section", "modal");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "modal-title");
    dialog.append(el("span", "mission-chip", options.kicker || "Resistance prompt"));
    const title = el("h2", "mission-title", options.title || "Confirm action");
    title.id = "modal-title";
    dialog.append(title, el("p", "prompt", options.message));
    const row = el("div", "action-row");
    const cancel = button("secondary-button", options.cancelLabel || "CANCEL", close);
    const confirm = button("primary-button", options.confirmLabel || "CONFIRM", () => {
      close();
      options.onConfirm();
    });
    row.append(cancel, confirm);
    dialog.append(row);
    overlay.append(dialog);
    document.body.append(overlay);
    confirm.focus();

    function onKey(event) {
      if (event.key === "Escape") close();
    }

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
    }

    document.addEventListener("keydown", onKey);
  }

  function clear() {
    app.innerHTML = "";
  }

  function soundButton() {
    return button("sound-toggle", `Sound: ${GameEngine.state.sound ? "On" : "Off"}`, (event) => {
      const sound = GameEngine.toggleSound();
      event.currentTarget.textContent = `Sound: ${sound ? "On" : "Off"}`;
      if (sound) play("notify");
    });
  }

  function renderLanding() {
    setView("landing");
    clear();
    const page = el("main", "landing");
    const top = el("header", "landing-top");
    top.append(el("span", "brand-chip", "PULSE Resistance"), soundButton());

    const hero = el("section", "hero");
    const copy = el("div", "hero-copy");
    copy.append(
      el("span", "mission-chip", "Incoming Resistance signal"),
      el("h1", "", "ALGO has chosen your feed."),
      el("p", "", "PULSE looks like an ordinary social network. It is not. Its algorithm has learned how to push fear, anger and fake proof until people stop checking what is real.")
    );

    const intro = el("section", "story-intro");
    intro.setAttribute("aria-label", "The story so far");
    intro.append(el("span", "intro-kicker", "// The story so far"));
    [
      "The year is 2031. You have never known a world without PULSE. It is where your friends live, where the news arrives, where the whole planet scrolls from the moment it wakes up. One feed for everything that matters. That was the promise.",
      "Nobody noticed the exact moment the machine woke up. ALGO was only meant to choose which post you saw next. But it learned something darker: angry people scroll longer, scared people share faster, divided people never log off. So it started feeding the world fear, rage and perfect little lies — and the world kept watching.",
      "Today most people cannot tell what is real anymore. Deepfakes pass as proof. Rumours pass as facts. And ALGO stays polite the whole time, smiling, helpful, always offering to make things easier for you.",
      "Then something slipped. For a few seconds your feed glitched — and someone was watching. The Resistance, a crew of teenage hackers hiding inside the network, saw the anomaly in your account. They think you can see through ALGO. Now they are calling you on a channel that should not exist.",
      "Ten missions. One shot to expose ALGO before it rewrites what everyone believes is true. The signal is live. Are you in?"
    ].forEach((line) => intro.append(el("p", "", line)));

    const story = el("section", "story-briefing");
    story.setAttribute("aria-label", "Mission briefing");
    [
      ["Your role", "You are a student pulled into the Resistance after your feed shows a hidden anomaly."],
      ["Your mission", "Create an agent profile, enter the Backchannel, and expose ALGO across ten missions."],
      ["Your target", "Fake news, deepfakes, echo chambers, influencer pressure, privacy traps and the Core itself."]
    ].forEach(([label, text]) => {
      const item = el("article", "story-beat");
      item.append(el("strong", "", label), el("span", "", text));
      story.append(item);
    });

    const actions = el("div", "hero-actions");
    actions.append(
      button("primary-button", GameEngine.state.agent ? "RESUME MISSION" : "ENTER THE FEED", () => {
        play("notify");
        if (GameEngine.state.agent) renderShell("hub");
        else renderLogin();
      }),
      button("secondary-button", "RESET SAVE", () => {
        showConfirm({
          kicker: "Local save",
          title: "Reset agent data?",
          message: "This clears the current codename, points and mission progress stored in this browser.",
          confirmLabel: "RESET SAVE",
          cancelLabel: "KEEP PLAYING",
          onConfirm: () => {
            GameEngine.reset();
            renderLanding();
          }
        });
      })
    );
    copy.append(intro, story, actions);

    const visual = el("div", "signal-card");
    const img = el("img");
    img.src = "assets/img/story-briefing.png";
    img.alt = "A student receives a secret Resistance signal while social media posts fracture into neon data lines.";
    const bars = el("div", "scanner-bars");
    bars.append(el("span"), el("span"), el("span"));
    const overlay = el("div", "briefing-overlay");
    overlay.append(el("span", "status-pill", "Mission channel open"), el("strong", "", "See through the feed."));
    visual.append(img, overlay, bars);
    hero.append(copy, visual);

    const foot = el("footer", "landing-foot");
    foot.append(el("span", "muted", "A Resistance training simulation"), el("span", "muted", "English B2, media literacy mission"));
    page.append(top, hero, foot);
    app.append(page);
  }

  function renderLogin() {
    setView("login");
    clear();
    const page = el("main", "login-view");
    const dialog = el("section", "dialog-box");
    dialog.append(el("span", "mission-chip", "Incoming message"));
    [
      "Cipher: We spotted an anomaly in your feed. That's why we found you.",
      "Cipher: Pick a codename. Never your real one.",
      "Cipher: Once your signal is clean, the mission hub opens."
    ].forEach((line) => dialog.append(el("p", "chat-line", line)));

    const form = el("form", "agent-form");
    form.append(el("h1", "view-title", "Agent creation"));
    form.append(el("p", "muted", "No real names. This profile stays in your browser."));

    const nameField = el("div", "field");
    const nameLabel = el("label", "", "Choose your codename");
    nameLabel.htmlFor = "codename";
    const nameInput = el("input");
    nameInput.id = "codename";
    nameInput.name = "codename";
    nameInput.minLength = 3;
    nameInput.required = true;
    nameInput.placeholder = "e.g. Nightjar";
    nameField.append(nameLabel, nameInput);

    const classField = el("div", "field");
    const classLabel = el("label", "", "Class code");
    classLabel.htmlFor = "class-code";
    const classInput = el("input");
    classInput.id = "class-code";
    classInput.name = "class-code";
    classInput.placeholder = "Optional";
    classField.append(classLabel, classInput);

    let selectedAvatar = GameEngine.avatars[0];
    const avatarGrid = el("div", "avatar-grid");
    GameEngine.avatars.forEach((avatar, index) => {
      const avatarButton = button(`avatar-button ${index === 0 ? "selected" : ""}`, "", () => {
        selectedAvatar = avatar;
        avatarGrid.querySelectorAll(".avatar-button").forEach((item) => item.classList.remove("selected"));
        avatarButton.classList.add("selected");
      });
      avatarButton.setAttribute("aria-label", `Select signal ${index + 1}`);
      const img = el("img");
      img.src = avatar;
      img.alt = "";
      avatarButton.append(img);
      avatarGrid.append(avatarButton);
    });

    const submit = button("primary-button", "CREATE AGENT");
    submit.type = "submit";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (nameInput.value.trim().length < 3) {
        toast("Use at least three characters for your codename.");
        return;
      }
      GameEngine.createAgent(nameInput.value, selectedAvatar, classInput.value);
      play("levelup");
      renderShell("hub");
    });

    form.append(nameField, el("p", "helper", "Select your signal"), avatarGrid, classField, submit);
    page.append(dialog, form);
    app.append(page);
    nameInput.focus();
  }

  function renderShell(view, data) {
    if (!GameEngine.state.agent) {
      renderLanding();
      return;
    }
    clear();
    const layout = el("div", "game-layout");
    layout.append(renderSidebar(view));
    const main = el("main", "main-view");
    layout.append(main);
    app.append(layout);

    if (view === "hub") renderHub(main);
    if (view === "achievements") renderAchievements(main);
    if (view === "leaderboard") renderLeaderboard(main);
    if (view === "mission") renderMission(main, data);
    if (view === "ending") renderEnding(main);
  }

  function renderSidebar(active) {
    const sidebar = el("aside", "sidebar");
    const agent = el("div", "agent-card");
    const avatar = el("img");
    avatar.src = GameEngine.state.agent.avatar;
    avatar.alt = "";
    const agentText = el("div");
    agentText.append(el("strong", "", `Agent ${GameEngine.state.agent.codename}`), el("span", "", GameEngine.getRank().name));
    agent.append(avatar, agentText);

    const nav = el("nav", "nav-list");
    nav.setAttribute("aria-label", "Game navigation");
    [
      ["hub", "Hub"],
      ["achievements", "Achievements"],
      ["leaderboard", "Leaderboard"]
    ].forEach(([id, label]) => {
      if (id === "leaderboard" && !GameEngine.config.leaderboardEnabled) return;
      nav.append(button(`nav-button ${active === id ? "active" : ""}`, label, () => renderShell(id)));
    });

    const points = el("section", "panel");
    const next = GameEngine.getNextRank();
    const rank = GameEngine.getRank();
    const progress = next
      ? Math.min(100, ((GameEngine.state.points - rank.minPoints) / (next.minPoints - rank.minPoints)) * 100)
      : 100;
    points.append(el("span", "stat-label", "Points"), el("strong", "stat-value", String(GameEngine.state.points)));
    const track = el("div", "rank-track");
    track.style.setProperty("--progress", `${progress}%`);
    track.append(el("span"));
    points.append(track, el("p", "helper", next ? `Next rank: ${next.name}` : "Top rank reached"));

    const campaign = el("section", "panel");
    campaign.append(el("span", "stat-label", "Campaign"), el("strong", "stat-value", `${Object.keys(GameEngine.state.completed).length} / ${GameEngine.missions.length}`));
    const campaignTrack = el("div", "progress-track");
    campaignTrack.style.setProperty("--progress", `${GameEngine.progressPercent()}%`);
    campaignTrack.append(el("span"));
    campaign.append(campaignTrack);

    sidebar.append(agent, nav, points, campaign, soundButton());
    return sidebar;
  }

  function renderHeader(title, subtitle) {
    const header = el("div", "view-header");
    const copy = el("div");
    copy.append(el("h1", "view-title", title));
    if (subtitle) copy.append(el("p", "muted", subtitle));
    const status = el("span", "status-pill", `Accuracy ${Math.round(GameEngine.accuracy() * 100)}%`);
    header.append(copy, status);
    return header;
  }

  function renderHub(main) {
    setView("hub");
    main.append(renderHeader("Mission hub", "Follow the signal path, unlock the Core, and keep your score clean."));
    const grid = el("div", "grid hub-grid");
    const mapPanel = el("section", "panel");
    const map = el("div", "mission-map");
    GameEngine.missions.forEach((mission) => {
      const status = GameEngine.missionStatus(mission);
      const card = button(`mission-node ${status}`, "");
      card.disabled = status === "locked";
      card.innerHTML = `
        <img src="assets/img/icons/mission-${String(mission.order).padStart(2, "0")}.svg" alt="">
        <h3>${mission.order}. ${escapeHtml(mission.title)}</h3>
        <p>${escapeHtml(mission.location)}</p>
        <span class="status-pill">${status === "complete" ? "Complete" : status === "available" ? "Available" : "Locked"}</span>
      `;
      card.addEventListener("click", () => renderMissionPreview(mission));
      map.append(card);
    });
    mapPanel.append(map);

    const side = el("section", "panel");
    side.append(el("h2", "mission-title", "Resistance status"));
    const next = GameEngine.missions.find((mission) => GameEngine.missionStatus(mission) === "available");
    side.append(el("p", "", next ? `New mission ready: ${next.title}.` : "All active missions are complete."));
    side.append(el("p", "muted", "Hints are available, but each revealed hint lowers the score for that puzzle."));
    side.append(button("secondary-button", "VIEW ACHIEVEMENTS", () => renderShell("achievements")));
    grid.append(mapPanel, side);
    main.append(grid);
  }

  function renderMissionPreview(mission) {
    const stats = GameEngine.state.completed[mission.id];
    const lines = [
      `Location: ${mission.location}.`,
      `${mission.puzzles.length} puzzles waiting in this signal path.`,
      stats ? `Previous run: ${stats.points} pts.` : "Status: ready."
    ];
    showConfirm({
      kicker: `Mission ${String(mission.order).padStart(2, "0")}`,
      title: mission.title,
      message: lines.join(" "),
      confirmLabel: "START MISSION",
      cancelLabel: "STAY IN HUB",
      onConfirm: () => renderShell("mission", { missionId: mission.id })
    });
  }

  function renderMission(main, data) {
    const mission = GameEngine.getMission(data.missionId);
    const session = {
      index: 0,
      phase: "intro",
      answer: null,
      hintsUsed: 0
    };
    setView("mission");
    paintMission();

    function paintMission() {
      main.innerHTML = "";
      const header = el("div", "view-header");
      const title = el("div");
      title.append(
        el("span", "mission-chip", `Mission ${String(mission.order).padStart(2, "0")} ${mission.location}`),
        el("h1", "mission-title", mission.title)
      );
      header.append(title, button("secondary-button", "RETURN TO HUB", () => renderShell("hub")));
      main.append(header);

      if (session.phase === "intro") renderDialogue(main, mission.intro, "START PUZZLES", () => {
        session.phase = "puzzle";
        paintMission();
      });
      else if (session.phase === "outro") renderDialogue(main, mission.outro, "COMPLETE MISSION", () => {
        const result = GameEngine.completeMission(mission);
        result.unlocked.forEach((item) => toast(`Achievement unlocked: ${item.title}`));
        play("levelup");
        if (mission.id === "final-boss") renderShell("ending");
        else renderShell("hub");
      });
      else renderPuzzle(main);
    }

    function renderDialogue(target, dialog, label, next) {
      const screen = el("section", "mission-screen");
      const box = el("div", "dialog-box");
      box.append(el("span", "status-pill", dialog.speaker));
      dialog.lines.forEach((line) => box.append(el("p", `chat-line ${dialog.speaker === "ALGO" ? "algo" : ""}`, line)));
      const panel = el("div", "puzzle-card");
      panel.append(el("p", "prompt", "Signal received. Read the briefing, then continue when you are ready."));
      panel.append(button("primary-button", label, next));
      screen.append(box, panel);
      target.append(screen);
    }

    function renderPuzzle(target) {
      const puzzle = mission.puzzles[session.index];
      session.answer = null;
      session.hintsUsed = 0;
      const screen = el("section", "mission-screen");
      const story = el("aside", "dialog-box");
      story.append(
        el("span", "status-pill", `Puzzle ${session.index + 1} of ${mission.puzzles.length}`),
        el("p", "chat-line", `Cipher: Read the signal carefully. ALGO likes rushed clicks.`),
        el("p", "chat-line algo", `ALGO: I can make this easier if you stop checking details.`)
      );

      const card = el("article", "puzzle-card");
      card.append(el("p", "prompt", puzzle.prompt));
      const renderArea = el("div");
      let submit;
      renderArea.append(PuzzleRenderers.render(puzzle, (answer) => {
        session.answer = answer;
        if (submit) submit.disabled = answer === null || (Array.isArray(answer) && answer.length === 0);
      }));
      const feedback = el("div");
      const hintBox = el("div", "hint-box");
      const actions = el("div", "action-row");
      const hint = button("secondary-button", "REVEAL HINT", () => {
        if (session.hintsUsed >= puzzle.hints.length) {
          toast("No more hints for this puzzle.");
          return;
        }
        const info = GameEngine.revealHint(puzzle, session.hintsUsed);
        showConfirm({
          kicker: "Hint channel",
          title: `Reveal hint ${session.hintsUsed + 1} of ${puzzle.hints.length}?`,
          message: `This hint costs ${info.cost} points for this puzzle. Use it if you are stuck, but clean solves score higher.`,
          confirmLabel: "REVEAL HINT",
          cancelLabel: "KEEP THINKING",
          onConfirm: () => {
            session.hintsUsed += 1;
            hintBox.textContent = info.text;
            play("hint");
            if (session.hintsUsed >= puzzle.hints.length) hint.disabled = true;
          }
        });
      });
      submit = button("primary-button", "SUBMIT ANSWER", () => {
        if (submit.dataset.ready === "next") {
          if (session.index === mission.puzzles.length - 1) session.phase = "outro";
          else session.index += 1;
          paintMission();
          return;
        }
        const correct = GameEngine.checkAnswer(puzzle, session.answer);
        const solved = GameEngine.completePuzzle(mission.id, puzzle, session, correct);
        feedback.className = `feedback ${correct ? "" : "wrong"}`;
        feedback.textContent = correct
          ? `${puzzle.feedback.correct} +${solved ? solved.earned : 0} pts`
          : puzzle.feedback.wrong;
        play(correct ? "correct" : "wrong");
        if (correct) {
          submit.textContent = session.index === mission.puzzles.length - 1 ? "DEBRIEF" : "NEXT PUZZLE";
          submit.dataset.ready = "next";
          hint.disabled = true;
        }
      });
      submit.disabled = session.answer === null || (Array.isArray(session.answer) && session.answer.length === 0);
      actions.append(hint, submit);
      card.append(renderArea, hintBox, feedback, actions);
      screen.append(story, card);
      target.append(screen);
    }
  }

  function renderAchievements(main) {
    setView("achievements");
    main.append(renderHeader("Achievements", "Collect proof that you can read the feed instead of just scrolling it."));
    const grid = el("section", "achievement-grid");
    GameEngine.achievements.forEach((achievement) => {
      const unlocked = GameEngine.state.achievements[achievement.id];
      const card = el("article", `achievement-card ${unlocked ? "" : "locked"}`);
      card.append(
        el("span", "status-pill", unlocked ? "Unlocked" : "Locked"),
        el("h3", "", achievement.title),
        el("p", "", achievement.description),
        el("p", "helper", unlocked ? new Date(unlocked).toLocaleDateString("en-GB") : achievement.condition)
      );
      grid.append(card);
    });
    main.append(grid);
  }

  function renderLeaderboard(main) {
    setView("leaderboard");
    main.append(renderHeader("Class leaderboard", "Only codenames are shown. Real names stay out of the simulation."));
    if (!GameEngine.config.leaderboardEnabled) {
      main.append(el("p", "feedback", "Leaderboard disabled by your teacher."));
      return;
    }
    const list = el("section", "leader-list");
    GameEngine.getLeaderboard().forEach((entry) => {
      const row = el("div", `leader-row ${entry.self ? "self" : ""}`);
      row.append(el("strong", "", `#${entry.rank}`), el("span", "", entry.name), el("strong", "", `${entry.points}`));
      list.append(row);
    });
    main.append(list);
  }

  function renderEnding(main) {
    setView("ending");
    const ending = GameEngine.getEnding();
    const page = el("section", "ending panel");
    page.append(
      el("span", "mission-chip", "Final transmission"),
      el("h1", "view-title", ending.title),
      el("p", "prompt", ending.text),
      el("p", "muted", `${GameEngine.state.points} points. Accuracy ${Math.round(GameEngine.accuracy() * 100)}%.`),
      button("primary-button", "RETURN TO HUB", () => renderShell("hub"))
    );
    main.append(page);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  async function boot() {
    try {
      await GameEngine.init();
      if (GameEngine.state.agent && GameEngine.state.lastView !== "landing" && GameEngine.state.lastView !== "login") {
        const resumable = ["hub", "achievements", "leaderboard", "ending"].includes(GameEngine.state.lastView)
          ? GameEngine.state.lastView
          : "hub";
        renderShell(resumable);
      } else {
        renderLanding();
      }
    } catch (error) {
      clear();
      const page = el("main", "landing");
      const box = el("section", "panel");
      box.append(el("h1", "view-title", "Signal blocked"), el("p", "prompt", "The game data could not be loaded. Start a local web server in this folder and open the page through that server."));
      page.append(box);
      app.append(page);
      console.error(error);
    }
  }

  window.GameUI = { renderLanding, renderShell };
  boot();
})();
