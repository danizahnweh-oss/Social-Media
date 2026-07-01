# Band 5 – Technische Dokumentation

Zweck dieses Bandes: alles so festhalten, dass es direkt programmierbar ist. Dies ist das Herzstück der Engine, also der feste Kern, der bei jedem Thema gleich bleibt.

Wichtig für den Engine-Gedanken: In diesem Band wird sauber getrennt, was zum wiederverwendbaren Kern gehört und was pro Mission neu geliefert wird. Ein neues Thema soll nur neue Missions-Daten brauchen, keine Änderung an der Engine.

## Wie du diesen Band liest (für Programmier-Einsteiger)

Bevor es losgeht, drei Begriffe, die immer wieder vorkommen. Wer sie einmal verstanden hat, versteht den Rest leichter.

- **Engine (der Kern):** Das ist das eigentliche Programm. Es weiß, wie man Punkte zählt, wie man Rätsel anzeigt, wie man speichert, wie man Missionen freischaltet. Die Engine kennt aber KEIN einziges konkretes Rätsel. Sie ist wie ein DVD-Player: Er kann jede DVD abspielen, aber er hat selbst keinen Film gespeichert.
- **Missions-Modul (die Daten):** Das ist der „Film", also der Inhalt. Eine Mission ist einfach eine Datei mit Text und Rätseln, geschrieben in einem einfachen Datenformat (JSON, siehe unten). Die Engine liest diese Datei und baut daraus die Spielseite. Wer das Thema wechseln will (statt „Social Media" zum Beispiel „Klimawandel"), schreibt nur neue Missions-Module und tauscht die alten aus. Am Programm selbst ändert sich nichts.
- **JSON:** Ein einfaches Textformat, um Daten aufzuschreiben. Es besteht aus Namen und Werten in geschweiften Klammern. Man muss es nicht programmieren können, man kann es fast wie eine Liste lesen. Beispiele folgen weiter unten.

Der rote Faden dieses ganzen Bandes lautet: **Die Engine bleibt gleich. Nur die Missions-Daten wechseln.** Überall, wo du unsicher bist, ob etwas zum Kern oder zu einer Mission gehört, gilt diese Faustregel: Kommt es in JEDER Mission gleich vor, gehört es in die Engine. Ist es der konkrete Inhalt (Text, Frage, richtige Antwort, Hinweise), gehört es ins Missions-Modul.

---

## 1. Seitenstruktur

Hier geht es darum, aus welchen Dateien und Seiten das fertige Spiel besteht und wie sie zusammenhängen. Das Spiel ist bewusst als einfache, statische Website mit JavaScript geplant (siehe Band 1). „Statisch" heißt: Es braucht keinen komplizierten Server, im einfachsten Fall reicht ein Ordner mit Dateien, den man in einem Browser öffnet oder auf einen ganz normalen Webspace hochlädt.

### 1.1 Die Seiten des Spiels

Die sichtbaren Seiten entsprechen genau der Website-Struktur aus Band 1:

- **Landing Page** – der Einstieg mit Stimmung und Start-Button.
- **Login / Agent Creation** – hier legt die spielende Person ihren Codename an.
- **Mission Hub** – die Zentrale mit allen Missionen (verfügbar, gesperrt, abgeschlossen).
- **Missionsseite** – der eigentliche Spielort. Wichtig: Es gibt nur EINE Missionsseite als Vorlage. Sie wird je nach ausgewählter Mission mit den passenden Daten gefüllt. Genau das ist das Engine-Prinzip.
- **Achievement-Seite** – erreichte und offene Erfolge.
- **Leaderboard** – die Rangliste der Klasse (abschaltbar).
- **Ending-Seite** – zeigt am Ende eines der drei Enden an.

### 1.2 Vorschlag für die Ordnerstruktur

So könnten die Dateien im Projektordner liegen (Vorschlag, Namen frei änderbar):

```
smeg/
├── index.html              (Landing Page, Einstiegspunkt)
├── css/
│   └── style.css           (das gesamte Aussehen, siehe Band 4)
├── js/
│   ├── engine.js           (DER KERN – zählt Punkte, speichert, schaltet frei ...)
│   ├── ui.js               (baut die Anzeige zusammen, siehe Band 4)
│   ├── puzzles.js          (weiß, wie man jeden Rätseltyp anzeigt, siehe Band 3)
│   └── save.js             (Speichern und Laden)
├── data/
│   ├── missions/           (HIER liegen die austauschbaren Missions-Module)
│   │   ├── 01-algorithm.json
│   │   ├── 02-fake-news.json
│   │   ├── 03-deepfakes.json
│   │   ├── 04-echo-chambers.json
│   │   ├── 05-influencer.json
│   │   ├── 06-digital-footprint.json
│   │   ├── 07-cyberbullying.json
│   │   ├── 08-privacy.json
│   │   ├── 09-mental-health.json
│   │   └── 10-final-boss.json
│   ├── achievements.json   (Liste der Erfolge)
│   └── config.json         (globale Einstellungen: Punktegrenzen, Leaderboard an/aus ...)
└── assets/
    ├── images/
    └── audio/
```

Der entscheidende Punkt: Der Ordner `data/missions/` enthält die austauschbaren Teile. Will man das Thema wechseln, ersetzt man die zehn JSON-Dateien in diesem Ordner und lässt alles unter `js/` unangetastet.

### 1.3 Wie die Seiten zusammenhängen

Der Ablauf folgt dem Gameplay-Loop aus Band 1:

```
Landing Page
   → Login / Agent Creation
        → Mission Hub  ⇄  Missionsseite (pro Mission)
                          ↑ nach Abschluss zurück zum Hub
   → (Achievement-Seite und Leaderboard jederzeit über die Sidebar erreichbar)
   → Ending-Seite (nach der letzten Mission)
```

Technischer Vorschlag: Man kann das Ganze als eine einzige HTML-Seite bauen, deren Inhalt per JavaScript ausgetauscht wird (eine sogenannte „Single-Page-Anwendung"). Das erleichtert das Speichern und verhindert Datenverlust beim Seitenwechsel. Für Einsteiger ist alternativ auch je eine HTML-Datei pro Seite möglich, dann muss aber beim Wechsel sauber gespeichert werden (siehe Abschnitt 5).

---

## 2. Datenmodell

Hier wird beschrieben, wie Missionen, Rätsel und der Spielstand als Daten dargestellt werden. Das Datenmodell ist der wichtigste Teil dieses Bandes, weil hier sichtbar wird, wie ein Thema austauschbar bleibt.

### 2.1 Grundidee

Es gibt drei Sorten von Daten:

1. **Missions-Daten** – der Inhalt einer Mission (Story-Text, Rätsel, richtige Antworten, Hinweise). Liegt als JSON-Datei vor und ist austauschbar.
2. **Konfigurations-Daten** – globale Einstellungen für das ganze Spiel (Punktegrenzen der Enden, Hinweiskosten, Leaderboard an/aus). Liegt in `config.json`.
3. **Spielstand** – was die spielende Person konkret getan hat (aktuelle Punkte, gelöste Missionen usw.). Dieser Teil entsteht erst beim Spielen und wird gespeichert (siehe Abschnitt 5).

Die Engine liest 1 und 2 ein und erzeugt daraus die Anzeige. Sie schreibt in 3.

### 2.2 Beispiel: eine komplette Mission als JSON-Modul

Dies ist das Herzstück des ganzen Konzepts. Eine Mission ist einfach eine Datenstruktur. Wer eine neue Mission (oder ein ganz neues Thema) bauen will, füllt genau dieses Schema neu aus – mehr nicht. Die Engine kümmert sich um alles andere.

Das folgende Beispiel zeigt die erste Mission („Algorithm"). Es ist bewusst vollständig, damit klar wird, wo jeder Bestandteil hingehört. Die Rätseltypen (`type`) stammen aus der Rätselbibliothek in **Band 3**, das genaue Aussehen der Elemente steht in **Band 4**.

Wichtig: Die konkreten Rätselinhalte in diesem JSON sind gekürzt und nur beispielhaft, damit die Struktur klar wird. Verbindlich für die tatsächlichen Rätsel, Fragen, Antworten und Punktwerte einer Mission ist **Band 2**. Beim echten Bau einer Mission werden die Inhalte aus Band 2 in dieses Schema übertragen.

```json
{
  "id": "algorithm",
  "order": 1,
  "title": "The Algorithm",
  "location": "The Feed",
  "unlockedBy": null,

  "intro": {
    "speaker": "Cipher",
    "lines": [
      "Hey Agent. Good, you made it to the Backchannel.",
      "Before we take on ALGO, you need to see how he actually works.",
      "Your first job: figure out why your feed shows you what it shows you."
    ]
  },

  "learningGoals": {
    "media": "Erklären, wie ein Empfehlungs-Algorithmus Inhalte auswählt.",
    "english": "Fachvokabular rund um 'recommendation' und 'engagement' verstehen."
  },

  "puzzles": [
    {
      "id": "algorithm-q1",
      "type": "multiple-choice",
      "prompt": "ALGO decides what to show you next. What matters MOST to him?",
      "options": [
        "How true the content is",
        "How long it keeps you watching",
        "How old the content is",
        "How many friends posted it"
      ],
      "correctIndex": 1,
      "points": 100,
      "feedback": {
        "correct": "Exactly. Attention is his currency, not truth.",
        "wrong": "Not quite. Think about what keeps YOU scrolling."
      },
      "hints": [
        "Ask yourself: what does ALGO gain from you?",
        "It has nothing to do with the content being true.",
        "The answer is: how long it keeps you watching."
      ]
    },
    {
      "id": "algorithm-q2",
      "type": "drag-and-drop",
      "prompt": "Order these posts the way ALGO would rank them for maximum attention.",
      "items": [
        "A calm, factual news update",
        "A shocking, angry rumour",
        "A boring school announcement"
      ],
      "correctOrder": [1, 0, 2],
      "points": 150,
      "feedback": {
        "correct": "Right. Outrage rises to the top.",
        "wrong": "Look again — which post makes people react the hardest?"
      },
      "hints": [
        "ALGO loves strong emotions.",
        "Anger keeps people commenting.",
        "Order: the angry rumour first, the calm news second, the boring one last."
      ]
    }
  ],

  "outro": {
    "speaker": "Cipher",
    "lines": [
      "Now you get it. ALGO isn't neutral — he's chasing your attention.",
      "That's step one. Head back to the Hub, Agent."
    ]
  },

  "achievementHooks": ["first-mission-done", "no-hint-run"]
}
```

### 2.3 Was die einzelnen Felder bedeuten

- **`id`** – ein eindeutiger, kurzer Name der Mission. Wird intern zum Wiedererkennen benutzt (im Spielstand, bei Freischaltungen).
- **`order`** – die Position in der Reihenfolge (1 bis 10). Legt fest, wo die Mission im Hub steht.
- **`title`, `location`** – der Anzeigename und der Ort in der Spielwelt (aus Band 6, z. B. „The Feed", „The Core").
- **`unlockedBy`** – von welcher Mission diese abhängt. `null` heißt „von Anfang an offen". Steht hier z. B. `"algorithm"`, wird die Mission erst frei, wenn „algorithm" gelöst ist. Details in Abschnitt 6.
- **`intro` / `outro`** – die Story-Texte vor und nach den Rätseln. `speaker` sagt, wer spricht (Cipher, ALGO ...), `lines` sind die einzelnen Sätze/Nachrichten. Die Anzeige als Chat-Dialog beschreibt Band 4.
- **`learningGoals`** – die zwei Lernziele (Medienkompetenz + Englisch). Nur zur Dokumentation und für die Lehrkraft, das Spiel muss sie nicht anzeigen.
- **`puzzles`** – eine Liste der Rätsel. Das ist der Kern der Mission.
- **`achievementHooks`** – welche Achievements diese Mission auslösen kann (siehe Abschnitt 8).

### 2.4 Aufbau eines einzelnen Rätsels

Jedes Rätsel hat immer dieselben Grundfelder, egal welcher Typ:

- **`id`** – eindeutiger Name des Rätsels.
- **`type`** – der Rätseltyp aus **Band 3** (z. B. `multiple-choice`, `drag-and-drop`, `text-input`, `hotspot`, `audio`, `true-false`). Die Engine schaut auf dieses Feld und entscheidet, wie das Rätsel angezeigt und geprüft wird.
- **`prompt`** – die Aufgabe/Frage.
- **die typabhängigen Felder** – z. B. `options` + `correctIndex` bei Multiple Choice, `items` + `correctOrder` bei Drag-and-drop. Welche Felder ein Typ braucht, legt Band 3 pro Rätseltyp fest.
- **`points`** – wie viele Punkte das Rätsel wert ist.
- **`feedback`** – die Rückmeldung bei richtig bzw. falsch.
- **`hints`** – die drei gestuften Hinweise (siehe Abschnitt 7). Immer als Liste mit genau drei Einträgen: erst ein Denkanstoß, dann eine konkretere Hilfe, dann die Lösung.

**Wichtig für den Engine-Gedanken:** Die Engine muss für jeden Rätseltyp einmal wissen, wie man ihn anzeigt und prüft. Danach kann sie beliebig viele Rätsel dieses Typs verarbeiten, ohne dass man neu programmieren muss. Ein neues Rätsel ist immer nur neuer JSON-Inhalt.

### 2.5 So wird ein Thema ausgetauscht

Genau hier zeigt sich das modulare Prinzip. Um vom Thema „Social Media" auf z. B. „Klimawandel" zu wechseln, tut man Folgendes und NUR das:

1. Die zehn Dateien in `data/missions/` durch zehn neue ersetzen.
2. In jeder neuen Datei dasselbe Schema wie oben verwenden, nur mit neuem Inhalt (neue `prompt`, neue `options`, neue `hints` ...).
3. Fertig. Die Engine unter `js/` bleibt komplett unverändert.

Das ist der ganze Sinn der Trennung: Inhalt wechseln, ohne zu programmieren.

---

## 3. Variablen

Hier stehen die wichtigsten Variablen des Spiels. Eine Variable ist einfach ein benannter „Behälter" für einen Wert, den sich das Programm merkt. Man unterscheidet zwei Gruppen: den Spielstand (ändert sich beim Spielen) und feste Einstellungen (ändern sich nicht während des Spiels).

### 3.1 Der Spielstand (`gameState`)

Alle wichtigen Werte werden in einem einzigen Objekt zusammengefasst. Das erleichtert das Speichern enorm: Wer den ganzen `gameState` speichert, hat den kompletten Fortschritt gesichert.

```javascript
let gameState = {
  codename: "Nightjar",            // gewählter Codename (Agent Creation)
  totalPoints: 0,                  // aktueller Gesamtpunktestand
  currentMission: null,            // welche Mission gerade offen ist (id), sonst null
  completedMissions: [],           // Liste der id's abgeschlossener Missionen
  unlockedMissions: ["algorithm"], // Liste der id's freigeschalteter Missionen
  solvedPuzzles: [],               // id's bereits gelöster Rätsel (kein Doppelpunkten)
  hintsUsed: {},                   // pro Rätsel-id: wie viele Hinweise genutzt wurden
  achievements: [],                // id's freigeschalteter Achievements
  correctCount: 0,                 // Anzahl richtig gelöster Rätsel (für Trefferquote)
  attemptCount: 0,                 // Anzahl aller Antwortversuche (für Trefferquote)
  soundOn: true,                   // Ton an/aus (Klassenraum)
  startedAt: "2026-07-01T09:00:00" // Zeitstempel des Starts
};
```

Zu den drei wichtigsten Variablen ausführlicher:

- **`totalPoints`** – der Punktestand, der überall (Sidebar, Leaderboard) angezeigt wird und am Ende über das Ende entscheidet.
- **`currentMission`** – merkt sich, welche Mission gerade läuft. Damit weiß das Spiel nach einer Pause, wo weitergemacht werden soll.
- **`unlockedMissions`** und **`completedMissions`** – steuern gemeinsam den Mission Hub: Was ist offen, was ist gesperrt, was ist erledigt (Abschnitt 6).

### 3.2 Werte für die Trefferquote

`correctCount` und `attemptCount` dienen der Trefferquote (Genauigkeit), die neben den Punkten das Ende mitbestimmt. Trefferquote = `correctCount / attemptCount`. Beispiel: 18 richtig bei 20 Versuchen = 0,9 = 90 %.

### 3.3 Feste Einstellungen (`config`)

Diese Werte kommen aus `config.json` und ändern sich während des Spiels nicht. Die Lehrkraft kann sie vor dem Einsatz anpassen, ohne zu programmieren.

```javascript
let config = {
  leaderboardEnabled: true,   // Rangliste anzeigen? (abschaltbar, Band 1)
  hintCosts: [25, 50, 100],   // Punktabzug pro Hinweisstufe 1/2/3 (Vorschlag)
  endingThresholds: {         // Punktegrenzen der drei Enden (Vorschlag, s. Abschnitt 4)
    signalRestored: 1800,
    ceasefire: 1000
  },
  accuracyForBestEnding: 0.8, // zusätzlich nötige Trefferquote fürs beste Ende (Vorschlag)
  ranks: [                    // Agenten-Ränge nach Punkten (Vorschlag, Anzeige siehe Band 4)
    { name: "Rookie",        minPoints: 0 },
    { name: "Operative",     minPoints: 300 },
    { name: "Analyst",       minPoints: 700 },
    { name: "Cipherbreaker", minPoints: 1200 },
    { name: "Ghost",         minPoints: 1800 }
  ]
};
```

Weil diese Werte zentral in einer Datei stehen, ist das ganze Spiel leicht „einstellbar", ohne den Kern anzufassen.

---

## 4. Punktesystem

Hier steht, wie Punkte vergeben, abgezogen, gespeichert und angezeigt werden. Das Punktesystem ist Teil des Kerns und für alle Missionen gleich.

### 4.1 Punkte bekommen

- Jedes richtig gelöste Rätsel bringt die im Rätsel hinterlegten `points` (siehe Datenmodell).
- Punkte werden nur beim ERSTEN richtigen Lösen vergeben. Ist die Rätsel-`id` schon in `solvedPuzzles`, gibt es keine Punkte mehr (kein „Farmen" durch Wiederholen).
- Vorschlag für einen kleinen Missions-Bonus: Wer eine Mission abschließt, erhält zusätzlich z. B. 100 Bonuspunkte. Das belohnt das Durchhalten.

### 4.2 Punkte verlieren (Hinweise)

Wer einen Hinweis anfordert, verliert Punkte. Die Höhe steht in `config.hintCosts` (Vorschlag: Stufe 1 = 25, Stufe 2 = 50, Stufe 3 = 100). Details in Abschnitt 7. Wichtig: Der Abzug soll nie unter null führen; `totalPoints` bleibt mindestens bei 0.

### 4.3 Rechenregel

Vereinfacht gilt beim Lösen eines Rätsels:

```
verdiente Punkte = rätsel.points − Summe der genutzten Hinweiskosten für dieses Rätsel
(mindestens 0)
```

Beispiel: Ein Rätsel bringt 150 Punkte. Die spielende Person nutzt Hinweis 1 (−25) und Hinweis 2 (−50). Bei richtiger Lösung gibt es 150 − 75 = 75 Punkte.

### 4.4 Anzeige

Der aktuelle `totalPoints` wird dauerhaft in der Sidebar gezeigt (Band 4). Nach jedem gelösten Rätsel wird der Wert sichtbar aktualisiert, idealerweise mit einer kurzen Animation, damit der Gewinn spürbar ist. Das genaue Aussehen steht in Band 4.

### 4.5 Punkte und die drei Enden

Am Spielende entscheiden Punktestand UND Trefferquote über das Ende (Namen aus Band 6). Vorschlag für die konkreten Grenzen (frei änderbar in `config.json`):

- **„Signal restored" (bestes Ende):** `totalPoints` ≥ 1800 **und** Trefferquote ≥ 80 %.
- **„Ceasefire" (mittleres Ende):** `totalPoints` ≥ 1000 (Trefferquote darunter oder Punkte reichen nicht ganz fürs beste Ende).
- **„Still watching" (nachdenkliches Ende):** alles darunter.

Die Kombination aus Punkten und Trefferquote sorgt dafür, dass nicht nur schnelles Sammeln, sondern vor allem genaues Erkennen von Manipulation belohnt wird – genau der Lernkern des Spiels. Alle Enden wirken bestärkend (Band 6), niemand „verliert".

---

## 5. Speichersystem

Hier steht, wie der Fortschritt gespeichert wird, sodass er nach dem Neuladen erhalten bleibt. Das ist besonders wichtig, weil die Taktung flexibel ist (Band 1): Das Spiel muss jederzeit pausierbar und fortsetzbar sein.

### 5.1 Was gespeichert wird

Gespeichert wird immer der komplette `gameState` (Abschnitt 3). Weil alle wichtigen Werte dort gebündelt sind, genügt es, dieses eine Objekt zu sichern und beim nächsten Start wieder einzulesen.

### 5.2 Geplante Lösung: Browser-Speicher (localStorage)

Der einfachste Weg auf einer statischen Website ist der Browser-Speicher „localStorage". Das ist ein kleiner Platz im Browser, in dem eine Website Daten dauerhaft ablegen kann, auch über das Schließen des Tabs hinaus.

So funktioniert es im Prinzip:

```javascript
// Speichern: gameState in Text umwandeln und ablegen
function saveGame() {
  localStorage.setItem("smeg_save", JSON.stringify(gameState));
}

// Laden: Text zurückholen und in ein Objekt umwandeln
function loadGame() {
  const data = localStorage.getItem("smeg_save");
  if (data) {
    gameState = JSON.parse(data);
    return true;   // Es gab einen gespeicherten Stand
  }
  return false;    // Kein Stand gefunden -> neues Spiel
}
```

Gespeichert wird automatisch nach jedem wichtigen Ereignis (Rätsel gelöst, Hinweis genutzt, Mission abgeschlossen). So geht selbst bei einem Absturz höchstens ein einziger Schritt verloren.

### 5.3 Wichtiger Hinweis zur Einschränkung

In manchen Umgebungen ist localStorage eingeschränkt oder abgeschaltet (z. B. bestimmte Schulnetzwerke, strenge Browser-Einstellungen, private/Inkognito-Fenster). Dann würde ein reiner localStorage-Ansatz den Fortschritt verlieren. Deshalb ist eine Ausweichlösung eingeplant.

### 5.4 Alternative Speicherlösungen (Vorschlag)

Falls localStorage nicht verfügbar ist, kommen zwei Wege in Frage:

- **Export-/Fortsetzungs-Code (einfachste Ausweichlösung):** Das Spiel wandelt den `gameState` in einen kurzen Text-Code um (z. B. eine kodierte Zeichenkette). Die spielende Person kopiert diesen Code am Stundenende, z. B. in ihr Heft oder ein Dokument, und fügt ihn zu Beginn der nächsten Stunde wieder ein, um genau dort weiterzumachen. Vorteil: braucht keinen Server. Nachteil: erfordert einen kleinen manuellen Schritt.
- **Serverbasiertes Speichern (komfortabelste Lösung):** Der Fortschritt wird pro Codename auf einem kleinen Server gespeichert. Beim nächsten Login lädt das Spiel den Stand automatisch. Vorteil: nichts kopieren, funktioniert geräteübergreifend, ermöglicht auch ein echtes Klassen-Leaderboard über mehrere Geräte hinweg. Nachteil: braucht einen (einfachen) Server und ist für Einsteiger mehr Aufwand.

Empfehlung: mit localStorage starten (einfach), den Export-Code als Sicherheitsnetz einbauen und die Server-Lösung als spätere Ausbaustufe vorsehen. Das Datenmodell bleibt in allen Fällen gleich, es wird immer derselbe `gameState` gesichert.

### 5.5 Leaderboard und Speichern

Ist das Leaderboard aktiv, braucht es die Punktestände mehrerer Personen an einem Ort. Ohne Server geht das nur eingeschränkt (z. B. Werte, die die Lehrkraft manuell sammelt). Ein echtes, automatisches Klassen-Leaderboard setzt die serverbasierte Lösung voraus. Da das Leaderboard laut Band 1 ohnehin abschaltbar sein muss (`config.leaderboardEnabled`), kann das Spiel auch ganz ohne Server vollständig gespielt werden.

---

## 6. Freischaltungen

Hier stehen die Regeln, welche Mission wann verfügbar wird. Diese Logik gehört zum Kern und ist vom Thema unabhängig.

### 6.1 Grundregel

Missionen werden nacheinander freigeschaltet. Zu Beginn ist nur die erste Mission offen. Wird eine Mission abgeschlossen, wird die nächste freigeschaltet. Welche Mission von welcher abhängt, steht im Feld `unlockedBy` des Missions-Moduls (Abschnitt 2). Dadurch liegt die Reihenfolge in den Daten, nicht im Programm – die Engine muss dafür nicht angefasst werden.

### 6.2 Ablauf beim Abschließen

Wenn eine Mission abgeschlossen wird, passiert Folgendes:

1. Die Missions-`id` wird zu `completedMissions` hinzugefügt.
2. Die Engine sucht alle Missionen, deren `unlockedBy` genau auf die gerade abgeschlossene zeigt.
3. Diese werden zu `unlockedMissions` hinzugefügt.
4. Es wird gespeichert (Abschnitt 5).

### 6.3 Anzeige im Mission Hub

Im Hub bekommt jede Mission einen von drei Zuständen (Aussehen in Band 4):

- **gesperrt (locked):** noch nicht in `unlockedMissions`. Nicht anklickbar, z. B. mit Schloss-Symbol.
- **verfügbar (available):** in `unlockedMissions`, aber noch nicht in `completedMissions`. Anklickbar.
- **abgeschlossen (completed):** in `completedMissions`. Anklickbar (zum Nachlesen), aber bringt keine neuen Punkte.

### 6.4 Kleines Codebeispiel

```javascript
// Ist eine Mission spielbar?
function isMissionAvailable(missionId) {
  return gameState.unlockedMissions.includes(missionId)
      && !gameState.completedMissions.includes(missionId);
}
```

### 6.5 Flexibilität

Die letzte Mission „Final Boss" wird typischerweise erst freigeschaltet, wenn die davorliegenden Missionen abgeschlossen sind. Über die `unlockedBy`-Felder lässt sich der Freischalt-Weg beliebig gestalten (streng linear oder mit Verzweigungen), ohne den Kern zu ändern. Das unterstützt die flexible Taktung aus Band 1.

---

## 7. Hint-System

Hier steht, wie die gestuften Hinweise technisch funktionieren. Das Hint-System ist Kern-Logik; die konkreten Hinweistexte liefert jedes Rätsel im Feld `hints` (Abschnitt 2).

### 7.1 Drei Stufen

Jedes Rätsel hat genau drei Hinweise, in aufsteigender Deutlichkeit:

1. **Stufe 1 – Denkanstoß:** ein kleiner Schubs in die richtige Richtung.
2. **Stufe 2 – konkrete Hilfe:** eine deutlichere Eingrenzung.
3. **Stufe 3 – Lösung:** verrät die Antwort, damit niemand komplett stecken bleibt.

Diese Abstufung folgt direkt Band 1 (erst Denkanstoß, dann Hilfe, dann Lösung).

### 7.2 Kosten

Jede angeforderte Stufe kostet Punkte. Die Kosten stehen zentral in `config.hintCosts` (Vorschlag: 25 / 50 / 100). Die Stufen müssen in Reihenfolge freigeschaltet werden: Stufe 2 gibt es erst, nachdem Stufe 1 geholt wurde, usw. So zahlt niemand versehentlich gleich für die Lösung.

### 7.3 Was gespeichert wird

Pro Rätsel merkt sich das Spiel in `gameState.hintsUsed`, wie viele Hinweise genutzt wurden, z. B.:

```javascript
gameState.hintsUsed = {
  "algorithm-q1": 2,   // für dieses Rätsel wurden Hinweis 1 und 2 geholt
  "algorithm-q2": 0
};
```

Dieser Wert wird gebraucht, um die verdienten Punkte auszurechnen (Abschnitt 4) und um bei einer Pause die schon aufgedeckten Hinweise wieder anzuzeigen.

### 7.4 Ablauf beim Anfordern

```javascript
function requestHint(puzzle) {
  const usedSoFar = gameState.hintsUsed[puzzle.id] || 0;   // wie viele schon?
  if (usedSoFar >= 3) return;                              // mehr als 3 gibt es nicht

  const cost = config.hintCosts[usedSoFar];                // Kosten dieser Stufe
  gameState.totalPoints = Math.max(0, gameState.totalPoints - cost);
  gameState.hintsUsed[puzzle.id] = usedSoFar + 1;

  showHint(puzzle.hints[usedSoFar]);                       // passenden Hinweistext zeigen
  saveGame();                                              // sofort sichern
}
```

### 7.5 Zusammenspiel mit Achievements

Wer eine Mission ganz ohne Hinweise löst, kann ein Achievement erhalten (z. B. „no-hint-run", siehe Abschnitt 8). Deshalb ist das saubere Mitzählen der Hinweise auch für die Achievements wichtig.

---

## 8. Achievement-Logik

Hier steht, wie Achievements ausgelöst und gespeichert werden. Achievements sind besondere Erfolge, die genaues Arbeiten belohnen (Band 1). Der Mechanismus gehört zum Kern; welche Achievements es gibt, steht in den Daten (`achievements.json`).

### 8.1 Achievements als Daten

Wie Missionen sind auch Achievements austauschbare Daten. So sieht ein Eintrag aus (Vorschlag):

```json
{
  "id": "no-hint-run",
  "title": "Clear Signal",
  "description": "Complete a mission without using any hints.",
  "icon": "signal.svg",
  "secret": false
}
```

Ein „secret"-Achievement (`"secret": true`) wird erst angezeigt, wenn es erreicht ist – passend zu den Easter Eggs aus Band 6.

### 8.2 Auslöser (Vorschlag)

Achievements werden an bestimmten Punkten im Spiel geprüft. Vorschlagsliste:

- **`first-mission-done`** – die erste Mission ist abgeschlossen.
- **`no-hint-run`** – eine Mission ohne einen einzigen Hinweis gelöst.
- **`fake-news-sweep`** – in der Fake-News-Mission alle Rätsel richtig.
- **`deepfake-eye`** – alle Deepfake-Rätsel richtig erkannt.
- **`perfect-run`** – eine Mission mit 100 % Trefferquote abgeschlossen.
- **`algo-slayer`** – der Final Boss ist besiegt.
- **`early-eye` (secret)** – die versteckte Anomalie ganz am Anfang bemerkt (Easter Egg, Band 6).

Diese Liste ist ein Vorschlag und lässt sich beliebig erweitern, ohne die Engine zu ändern.

### 8.3 Wie das Auslösen funktioniert

Die Engine ruft an den passenden Stellen (z. B. nach Missionsabschluss) eine Prüffunktion auf. Ist die Bedingung erfüllt und das Achievement noch nicht vorhanden, wird es vergeben, angezeigt und gespeichert:

```javascript
function unlockAchievement(achievementId) {
  if (!gameState.achievements.includes(achievementId)) {
    gameState.achievements.push(achievementId);
    showAchievementPopup(achievementId);   // kurze Einblendung (Band 4)
    saveGame();
  }
}
```

Die Verbindung zwischen Mission und möglichen Achievements steht im Missions-Feld `achievementHooks` (Abschnitt 2). Nach Missionsabschluss prüft die Engine genau diese Haken und entscheidet, ob die Bedingung erfüllt ist.

### 8.4 Anzeige

Alle Achievements werden auf der Achievement-Seite gezeigt: erreichte hell/farbig, noch offene abgedunkelt, geheime als Fragezeichen, bis sie erreicht sind. Genaues Aussehen: Band 4.

---

## 9. Dynamische Anpassung des Spiels

Hier stehen die Stellschrauben, mit denen sich das Spiel an unterschiedliche Klassen und Situationen anpassen lässt – ohne den Kern zu ändern. Alle Anpassungen laufen über Daten und Einstellungen, nicht über Programmänderungen.

### 9.1 Anpassung über die Konfiguration

Die einfachste Anpassung geschieht in `config.json`:

- **Hinweiskosten** höher/niedriger stellen (leichter oder anspruchsvoller).
- **Punktegrenzen der Enden** anpassen, falls eine Gruppe stärker oder schwächer ist.
- **Leaderboard** an- oder abschalten (z. B. um schwächere Schüler nicht zu entmutigen, Band 1).

### 9.2 Differenzierung über die Missions-Daten

Weil Rätsel reine Daten sind, lässt sich der Schwierigkeitsgrad pro Rätsel steuern, ohne zu programmieren:

- Vorschlag: ein optionales Feld `difficulty` je Rätsel (`"easy"`, `"medium"`, `"hard"`). Die Engine könnte damit z. B. schwerere Rätsel überspringen oder zusätzliche anbieten.
- Vorschlag: optionale Zusatzrätsel, die nur bei Bedarf gezeigt werden, für schnelle Gruppen.

Diese Felder sind optional. Fehlen sie, spielt die Engine ganz normal alle Rätsel.

### 9.3 Anpassung an die Zeit (Taktung)

Weil das Speichern zuverlässig ist (Abschnitt 5), passt sich das Spiel automatisch an jede Stundenzahl an: Man spielt so viele Missionen, wie die Zeit erlaubt, und macht später weiter. Zusätzlich denkbar (Vorschlag):

- ein „Kurzmodus", in dem pro Mission nur die Kern-Rätsel gespielt werden;
- eine Markierung optionaler Missionen, die bei knapper Zeit übersprungen werden dürfen.

### 9.4 Barrierefreiheit und Klassenraum

- **Ton abschaltbar** über `gameState.soundOn` (Klassenraum, Band 1).
- **Tooltips für schwieriges Vokabular** (Band 6 nennt das als Detail für Band 4/5): schwierige englische Wörter können mit einer kurzen Erklärung hinterlegt werden. Vorschlag: ein optionales Feld `glossary` pro Mission, das Wort und Erklärung enthält. Fehlt es, gibt es einfach keine Tooltips.

Alle diese Anpassungen sind so gebaut, dass die Engine gleich bleibt: Es werden nur Werte und optionale Daten verändert.

---

## 10. API- und JavaScript-Logik

Hier werden die zentralen Funktionen der Engine benannt: was sie tun und wie die Schnittstelle zwischen dem Kern und den Missions-Modulen aussieht. „API" meint hier die Menge an Funktionen, über die die Teile des Programms miteinander reden. Externe Online-Dienste sind für die Grundversion nicht nötig (die Server-Lösung aus Abschnitt 5.4 ist eine spätere Option).

### 10.1 Die Idee der Schnittstelle

Der Kern und die Missions-Module sind streng getrennt:

- **Die Missions-Module** sind nur Daten (JSON). Sie enthalten keinen Programmcode. Sie „wissen" nichts über Punkte, Speichern oder Freischalten.
- **Die Engine** kennt keinen konkreten Inhalt. Sie bekommt eine Mission als Daten übergeben und weiß, was damit zu tun ist.

Die Schnittstelle ist damit einfach: Die Engine liest eine Missions-JSON ein und verarbeitet ausschließlich die Felder aus dem Datenmodell (Abschnitt 2). Solange ein neues Modul dieses Schema einhält, funktioniert es sofort. Genau das ist der modulare Kern-Gedanke.

### 10.2 Die zentralen Engine-Funktionen

Die folgende Liste benennt die wichtigsten Funktionen des Kerns. Sie sind für alle Themen gleich. Die Namen sind Vorschläge.

**Start und Spielstand**

- `initGame()` – startet das Spiel: lädt einen vorhandenen Spielstand (`loadGame`) oder legt einen neuen `gameState` an. Zeigt danach die passende Seite (Landing oder Hub).
- `createAgent(codename)` – legt beim ersten Start das Profil mit Codename an (Agent Creation) und speichert.
- `saveGame()` / `loadGame()` – sichern bzw. laden den kompletten `gameState` (Abschnitt 5).

**Missionen laden und verarbeiten**

- `loadMission(missionId)` – lädt die passende JSON-Datei aus `data/missions/`, setzt `currentMission` und zeigt die Intro-Story an. Das ist die zentrale Schnittstelle zwischen Kern und Missions-Modul.
- `renderPuzzle(puzzle)` – zeigt ein einzelnes Rätsel an. Schaut auf `puzzle.type` (Band 3) und wählt die passende Anzeige (Band 4). Neue Rätseltypen werden hier einmalig ergänzt, danach funktioniert jedes Rätsel dieses Typs aus den Daten.
- `checkAnswer(puzzle, answer)` – prüft die Antwort gegen die im Rätsel hinterlegte richtige Lösung, gibt Feedback, aktualisiert `correctCount`/`attemptCount` und vergibt bei Erfolg die Punkte.
- `completeMission(missionId)` – schließt eine Mission ab: zeigt die Outro-Story, vergibt Bonuspunkte, prüft Achievements, schaltet Folgemissionen frei (Abschnitt 6) und speichert.

**Punkte, Hinweise, Achievements**

- `addPoints(amount)` / `subtractPoints(amount)` – verändern `totalPoints` (nie unter 0) und aktualisieren die Anzeige.
- `requestHint(puzzle)` – gibt den nächsten Hinweis frei, zieht die Kosten ab, merkt sich die Nutzung (Abschnitt 7).
- `checkAchievements(context)` – prüft nach wichtigen Ereignissen die Achievement-Bedingungen und ruft bei Erfolg `unlockAchievement` (Abschnitt 8).
- `unlockAchievement(id)` – vergibt ein Achievement, zeigt es an und speichert.

**Freischaltungen und Hub**

- `updateHub()` – berechnet für jede Mission ihren Zustand (gesperrt/verfügbar/abgeschlossen) und aktualisiert die Hub-Anzeige (Abschnitt 6).
- `isMissionAvailable(missionId)` – kleine Hilfsfunktion, ob eine Mission spielbar ist.

**Ende und Anzeige**

- `determineEnding()` – berechnet aus `totalPoints` und Trefferquote das erreichte Ende (Abschnitt 4) und zeigt die passende Ending-Seite.
- `render...`-Funktionen (in `ui.js`, Band 4) – bauen die sichtbaren Seiten zusammen (Sidebar, Dialog, Hub usw.). Sie enthalten keine Spielregeln, sondern nur die Anzeige.

### 10.3 So spielen Kern und Modul zusammen (Beispielablauf)

Ein typischer Durchlauf einer Mission zeigt die Schnittstelle in Aktion:

```
1. Person klickt im Hub auf eine Mission
        → loadMission("algorithm")
             → liest 01-algorithm.json  (das Missions-Modul, reine Daten)
             → zeigt intro-Story an

2. Für jedes Rätsel in puzzles:
        → renderPuzzle(puzzle)        (Anzeige nach type, Band 3/4)
        → Person antwortet
        → checkAnswer(puzzle, answer) (prüft, gibt Feedback, vergibt Punkte)
        → bei Bedarf requestHint(puzzle)

3. Alle Rätsel gelöst
        → completeMission("algorithm")
             → Outro-Story, Bonus, Achievements, Freischaltung, Speichern
        → updateHub()  und zurück zum Hub
```

In diesem ganzen Ablauf liefert das JSON-Modul nur den Inhalt (Texte, Fragen, richtige Antworten, Hinweise). Alle Regeln (Punkte, Speichern, Freischalten, Achievements) stecken in der Engine. Deshalb genügt für ein neues Thema ein neuer Satz JSON-Dateien.

### 10.4 Externe Dienste (optional, Vorschlag)

Für die Grundversion braucht das Spiel keine externen Online-Dienste. Optional, als spätere Ausbaustufe:

- **Speicher-/Leaderboard-Server** (Abschnitt 5.4): ein einfacher Dienst mit zwei Aufgaben – Spielstand pro Codename sichern/laden und Punktestände für das Klassen-Leaderboard sammeln. Die dazugehörigen Engine-Funktionen wären dann Erweiterungen von `saveGame`/`loadGame` sowie eine `submitScore(codename, points)`-Funktion.

Auch mit Server bleibt die Trennung erhalten: Der Server speichert nur den `gameState`, die Spielregeln bleiben in der Engine, und die Missionen bleiben austauschbare Daten.

---

## Zusammenfassung des Engine-Prinzips

Wenn du dir aus diesem ganzen Band nur eine Sache merkst, dann diese: Es gibt einen festen Kern (die Engine unter `js/`) und austauschbare Inhalte (die JSON-Module unter `data/`). Der Kern regelt Punkte, Story-Rahmen, Dialoge, Freischaltungen, Mission Hub, Achievements, Hinweise und Speichern – immer gleich, für jedes Thema. Die Missionen sind reine Daten. Ein neues Thema braucht deshalb nur neue Missions-Daten und keine Änderung am Programm. Genau darin liegt die Stärke dieser Lernspiel-Engine.
