# BUILD.md – Bau-Anleitung für das "Social Media Escape Game"

Diese Datei ist die Anleitung für einen Coding-Agenten (Claude Code, Codex o. Ä.) oder eine Entwicklerin/einen Entwickler, um aus den vorhandenen Design-Dokumenten und Daten ein spielbares, interaktives Web-Spiel zu bauen. Sie ist bewusst präzise, damit das Ergebnis nah an der Vision bleibt.

## 1. Was gebaut werden soll

Ein browserbasiertes, einzeln spielbares Lern-Escape-Game auf Englisch (Niveau B2) für die 10. Klasse. Thema: Medienkompetenz rund um soziale Medien. Die spielende Person wird von der Resistance rekrutiert und durchschaut in zehn Missionen die Manipulationstechniken des Algorithmus ALGO. Wichtig: Das Spiel ist visuell und interaktiv (ziehen, klicken, Hotspots, Fake-Chats, Feeds, Töne), nicht nur Text.

Leitprinzip (Engine-Gedanke): Der Programmcode (die Engine) bleibt immer gleich. Die zehn Missionen sind austauschbare JSON-Daten. Ein neues Thema = neue JSON-Dateien, kein neuer Code.

## 2. Design-Dokumente als Quelle

Im übergeordneten Projektordner liegen acht Bände. Sie sind die verbindliche Quelle:

- Band 1 – Vision & Game Design (Gesamtbild, Gameplay-Loop, Gamification)
- Band 2 – Mission Design (Inhalt aller Missionen; die JSON-Dateien hier basieren darauf)
- Band 3 – Rätsel- und Aufgabenbibliothek (Rätseltypen im Detail)
- Band 4 – Website & UX Design (Aussehen jeder Seite, Farben, Schriften, Animationen)
- Band 5 – Technische Dokumentation (Datenmodell, Engine-Funktionen)
- Band 6 – Story Bible (Welt, Figuren, Dialogstil, Enden)
- Band 7 – Lehrerhandbuch (Durchführung, nicht baurelevant, aber hilfreich)
- Band 8 – Erweiterungen (wie das Spiel später wächst)

Bei Widersprüchen gilt: für Optik Band 4, für Technik Band 5, für Welt/Ton Band 6, für Rätselinhalte Band 2. Diese BUILD.md konkretisiert und bündelt das für die Umsetzung.

## 3. Technischer Rahmen

- Statische Website mit reinem HTML, CSS und JavaScript (kein Framework nötig, Vanilla JS empfohlen). Soll ohne Server per Doppelklick bzw. auf einfachem Webspace laufen.
- Empfehlung: Single-Page-Ansatz. Eine `index.html`, deren Inhalt per JavaScript zwischen den Ansichten wechselt. Das erleichtert Speichern und verhindert Datenverlust beim Seitenwechsel.
- Kein externer Build-Schritt zwingend. Wenn ein Bundler genutzt wird, muss das Ergebnis trotzdem als statische Dateien lauffähig sein.
- Speichern über `localStorage` (Schlüssel pro Codename). Falls `localStorage` nicht verfügbar ist, einen Export-/Import-Code als Fallback anbieten (siehe Band 5, Abschnitt 5).

## 4. Ordnerstruktur (Zielzustand)

```
smeg/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── engine.js      # Kern: Zustand, Punkte, Freischaltung, Speichern, Enden, Achievements
│   ├── ui.js          # Ansichten/Seiten aufbauen (Band 4)
│   └── puzzles.js     # Renderer + Prüfung je Rätseltyp (siehe Abschnitt 7)
└── data/              # <-- LIEGT BEREITS FERTIG VOR (dieser handoff-Ordner)
    ├── config.json
    ├── achievements.json
    └── missions/
        ├── 01-algorithm.json ... 10-final-boss.json
└── assets/            # <-- LIEGT BEREITS FERTIG VOR
    ├── img/ (logo, bg-grid, icons/, avatars/, puzzle/)
    └── audio/ (correct, wrong, hint, notify, levelup, ambient-loop)
```

Der Ordner `data/` und `assets/` in diesem handoff-Paket sind fertig und werden übernommen. Zu bauen sind `index.html`, `css/style.css` und die drei JS-Dateien.

## 5. Seiten / Ansichten (Details in Band 4)

Landing Page → Login / Agent Creation → Mission Hub ⇄ Missionsseite → Ending-Seite. Achievement-Seite und Leaderboard jederzeit über die Sidebar. Optik: Cyberpunk/Neon auf sehr dunklem Grund. Farb- und Schriftwerte stehen in Band 4, Abschnitt 10 (u. a. Hintergrund `#0A0E14`, Türkis `#00F5D4`, Magenta `#FF2E97`, Warnrot `#FF3B3B`).

## 6. Datenmodell

### 6.1 config.json (global)
Enthält `language`, `cefrLevel`, `leaderboardEnabled`, `soundEnabledByDefault`, `hintCosts` `[25,50,100]`, `endingThresholds` `{signalRestored:1800, ceasefire:1000}`, `accuracyForBestEnding` `0.8`, `ranks` (Liste mit `name` + `minPoints`).

### 6.2 achievements.json
Liste von `{id, title, description, condition}`. Missionen verweisen über `achievementHooks` auf diese `id`s. Vorhandene: `first-mission-done`, `no-hint-run`, `perfect-mission`, `campaign-complete`, `best-ending`.

### 6.3 Eine Mission (data/missions/NN-slug.json)
```
{
  "id": "algorithm",
  "order": 1,
  "title": "The Algorithm",
  "location": "The Feed",
  "unlockedBy": null,            // oder die id der Vormission
  "intro": { "speaker": "Cipher", "lines": ["...", "..."] },
  "learningGoals": { "media": "<deutsch>", "english": "<deutsch>" },
  "puzzles": [ ... ],           // siehe Abschnitt 7
  "outro": { "speaker": "Cipher", "lines": ["..."] },
  "achievementHooks": ["first-mission-done", "no-hint-run", "perfect-mission"]
}
```
Freischaltung: Mission wird nur wählbar, wenn die in `unlockedBy` genannte Mission abgeschlossen ist (`null` = von Anfang an offen). Reihenfolge über `order`.

## 7. Rätseltypen (die Engine muss diese neun rendern und prüfen)

Jedes Rätsel hat immer: `id`, `type`, `prompt`, `points`, `feedback` `{correct, wrong}`, `hints` (genau drei, ansteigend). Dazu die typabhängigen Felder. Alle Typen sind visuell/interaktiv umzusetzen (Karten, Klickflächen, Chatblasen), nicht als reine Textliste.

1. `multiple-choice` – `options` (Array), `correctIndex` (Zahl). Anzeige als anklickbare Neon-Optionskarten.
2. `multi-select` – `options`, `correctIndices` (Array). Mehrere Karten auswählbar, "Confirm" prüft.
3. `order` – `items`, `correctOrder` (Array von Indizes). Karten per Drag-and-Drop in Reihenfolge bringen.
4. `categorise` – `buckets` (Namen), `items` (Texte), `correctBucket` (pro Item der Zielkübel-Index). Karten in Kübel ziehen.
5. `text-input` – `acceptedAnswers` (Array, kleingeschrieben). Eingabefeld; Vergleich case-insensitive, getrimmt.
6. `hotspot` – `image` (Pfad), `regions` (Array `{id,label,x,y,w,h,correct}`), `requiredCorrect` (Zahl). Der Spieler klickt verdächtige Bereiche auf dem Bild. Koordinaten im Bildraum 300×220 (bei den mitgelieferten Puzzle-SVGs); beim Rendern proportional auf die Anzeigegröße skalieren. Richtig, wenn alle `correct:true`-Regionen gefunden sind.
7. `chat-sim` – `frame` (Chat-Hintergrund), `script` (Array `{from,text}`; `from` ist z. B. "ALGO", "Cipher", "Player", ein Name), `decision` `{prompt, options, correctIndex}`. Zeigt einen Chatverlauf mit Tipp-Animation, endet mit einer Entscheidung.
8. `feed-mark` – `instruction`, `posts` (Array `{id,handle,text,flag}`). Nachgebauter Social-Media-Feed; der Spieler markiert alle Posts mit `flag:true` (z. B. Fakes, schädliche Beiträge). Richtig, wenn genau diese markiert sind.
9. `audio` – `audio` (Pfad), `transcript`, `options`, `correctIndex`. Ton abspielen (Play-Button); `transcript` sichtbar, damit auch ohne echte Sprache lösbar; danach die Frage beantworten.

Prüf-/Punktelogik: Bei richtiger Lösung volle `points`; genutzte Hinweise ziehen laut `config.hintCosts` ab (Stufe 1/2/3 = 25/50/100), Punkte nie unter 0 pro Rätsel. Jeder Versuch zählt für die Trefferquote (`correctCount/attemptCount`), die das Ende mitbestimmt (Band 5).

## 8. Kern-Verhalten der Engine

- Agent anlegen (`createAgent(codename)`), Profil in `localStorage` speichern, bei Rückkehr fortsetzen.
- Mission Hub: Missionszustände gesperrt/verfügbar/abgeschlossen anzeigen (Icons unter `assets/img/icons/`).
- Mission spielen: intro (Chat-Dialog) → Rätsel nacheinander → outro → zurück zum Hub, nächste Mission freischalten.
- Punkte, Rang (aus `config.ranks`), Achievements (aus `achievements.json` über `achievementHooks`) verwalten.
- Hint-System: drei Stufen pro Rätsel, mit Bestätigung vor Punktabzug (Band 4).
- Speichern nach jedem gelösten Rätsel (flexible Taktung, jederzeit pausierbar).
- Leaderboard: standardmäßig lokal (nur Codenames); durch `config.leaderboardEnabled=false` komplett abschaltbar. Ein optionaler einfacher Server für klassenweite Ranglisten ist eine spätere Erweiterung (Band 5/8), nicht Pflicht.
- Enden: Nach Mission 10 anhand Gesamtpunkten und Trefferquote eines von drei Enden zeigen: `Signal restored` (≥1800 Punkte UND ≥80 % Trefferquote), `Ceasefire` (≥1000), sonst `Still watching`. Alle Enden bestärkend formulieren (Band 6).

## 9. Assets

Alle Grafiken sind SVG, alle Töne WAV, beide bereits im Paket. Sie sind bewusst stilisierte Platzhalter im Neon-Look und können später durch hochwertigere Assets ersetzt werden, ohne den Code zu ändern (gleiche Dateinamen behalten). Es gibt keine fotorealistischen Bilder und keine echten Sprachaufnahmen; jedes Rätsel ist so gebaut, dass es allein aus den JSON-Texten lösbar ist. Sound muss global abschaltbar sein (Klassenraum).

Bild: `img/logo.svg`, `img/bg-grid.svg`, `img/icons/mission-01..10.svg`, `img/avatars/avatar-1..6.svg`, `img/puzzle/*` (u. a. `photo-real`, `photo-altered`, `chat-frame`, `feed-post`, `consent-screen`, `core-deepfake`, `core-consent`, `footprint-photos`, `influencer-clip`).
Audio: `audio/correct.wav`, `wrong.wav`, `hint.wav`, `notify.wav`, `levelup.wav`, `ambient-loop.wav`.

## 10. Empfohlene Baureihenfolge

1. Grundgerüst: `index.html`, `style.css` mit den Design-Tokens aus Band 4, Ansichts-Wechsel in `ui.js`.
2. Datenladen: `config.json`, `achievements.json` und alle Missionen laden; Mission Hub mit Freischaltung.
3. Ein Rätseltyp end-to-end (z. B. `multiple-choice`) inkl. Punkte, Feedback, Hints, Speichern.
4. Die übrigen acht Rätseltypen ergänzen (Abschnitt 7).
5. Intro/Outro-Dialoge, Achievements, Rang, Leaderboard (lokal), Enden.
6. Feinschliff: Animationen, Sound-Toggle, Barrierefreiheit (Tastatur, `prefers-reduced-motion`), Responsivität (Tablet/Laptop).

## 11. Fertig-Kriterien (Definition of Done)

- Alle zehn Missionen sind durchspielbar, Freischaltung funktioniert, Fortschritt bleibt nach Neuladen erhalten.
- Alle neun Rätseltypen werden korrekt angezeigt, geprüft und bepunktet; Hints ziehen richtig Punkte ab.
- Rang, Achievements und eines der drei Enden werden korrekt ausgelöst.
- Läuft als statische Website ohne Server, auf Tablet und Laptop bedienbar, Sound abschaltbar.
- Keine echten personenbezogenen Daten nötig (nur frei gewählter Codename).

## 12. Hinweise

- Mission 9 (Mental Health) ist sensibel: sachlich, unterstützend, keine Kriseninhalte und keine Notrufnummern (bewusst so). Botschaft: kleine machbare Schritte, Pausen, Grenzen.
- Die learningGoals in den Missionen sind auf Deutsch und nur Doku (müssen im Spiel nicht angezeigt werden).
- Umlaute in learningGoals sind teils als ae/oe/ue geschrieben, um Encoding-Probleme zu vermeiden; das ist unkritisch, da nur interne Doku.
