# Band 8 – Erweiterungen & DLC

Zweck dieses Bandes: Wiederverwendbarkeit. Hier wird festgehalten, wie das Spiel wächst. Genau hier zahlt sich der Engine-Gedanke aus: Neue Inhalte sind Module, kein neues Spiel.

Die zentrale Botschaft dieses Bandes lautet: Weil der Kern (Punkte, Story-Rahmen, Dialogsystem, Freischaltungen, Mission Hub, Achievements, Hint-System, Speichern) fest und für jedes Thema gleich ist, entsteht jede Erweiterung als austauschbares Modul. Wer etwas Neues hinzufügen will, schreibt in aller Regel nur neue JSON-Daten (Missionen, Achievements, Konfiguration) und lässt die Engine unter `js/` unangetastet. Alles in diesem Band ist an genau diesem Prinzip ausgerichtet. Details zum Datenmodell und zur Trennung von Kern und Modul stehen in Band 5.

Mögliche neue Themen für die Engine (Beispiele): Artificial Intelligence, Climate Change, Crime and Punishment, South Africa, Globalisation, The USA.

## 1. Neue Missionen

Innerhalb eines bestehenden Themas (also z. B. weiterhin „Social Media") lassen sich jederzeit zusätzliche Missionen ergänzen. Eine neue Mission ist immer nur eine weitere JSON-Datei im Ordner `data/missions/` und folgt exakt dem Schema aus Band 5, Abschnitt 2. Es muss nichts programmiert werden. Die Engine liest die Datei ein, baut daraus die Missionsseite und fügt sie über das Feld `order` und `unlockedBy` in den bestehenden Ablauf ein.

Ideen für zusätzliche Social-Media-Missionen (Vorschlag), die gut zur bestehenden Reihe von zehn Missionen passen: „Targeted Advertising" (wie ALGO aus dem Verhalten Werbeprofile baut), „Data Brokers" (wer die gesammelten Daten kauft und verkauft), „Bots and Astroturfing" (vorgetäuschte Mehrheiten und automatische Konten), „Recommendation Rabbit Hole" (wie Empfehlungen Schritt für Schritt in Extreme führen), „Dark Patterns" (Design-Tricks, die zum Weiterklicken verleiten) und „Digital Detox" (bewusste Strategien gegen die Sogwirkung). Jede dieser Ideen deckt eine eigene Manipulationstechnik ab und verfolgt zugleich ein sprachliches Lernziel, ganz im Sinne der Doppel-Lernziele aus Band 1.

Checkliste, um eine neue Mission sauber anzulegen (jeder Punkt bezieht sich auf ein Feld aus dem JSON-Modell in Band 5):

- Eindeutige `id` vergeben (kurz, klein geschrieben, z. B. `targeted-ads`).
- `order` festlegen: An welcher Stelle steht die Mission im Hub? Bestehende Reihenfolge ggf. anpassen.
- `unlockedBy` setzen: Nach welcher Mission wird sie freigeschaltet? So bleibt der lineare Ablauf aus Band 5, Abschnitt 6, erhalten.
- `title` und `location` wählen. Der Ort muss zur Weltkarte aus Band 6 passen (z. B. „The Feed", „The Core", „The Backchannel").
- `intro` und `outro` schreiben: Wer spricht (meist Cipher oder ALGO), in welchem Ton? Die Dialogstile aus Band 6, Abschnitt 7, sind verbindlich (ALGO höflich-manipulativ, Resistance locker-direkt).
- `learningGoals` notieren: ein Medienkompetenz-Ziel und ein Englisch-Ziel (nur zur Dokumentation, siehe Band 5).
- `puzzles` bauen: mehrere Rätsel aus der Rätselbibliothek (Band 3), jeweils mit `prompt`, den typabhängigen Feldern, `points`, `feedback` und genau drei gestuften `hints`.
- `achievementHooks` ergänzen, falls die Mission ein Achievement auslösen soll (siehe Abschnitt 8 dieses Bandes und Band 5, Abschnitt 8).

Wichtig ist die inhaltliche Qualitätssicherung, nicht die Technik: Jede neue Mission sollte sprachlich auf B2-Niveau geprüft, mit klaren Anweisungen versehen (Band 6, Sprachregeln) und einmal komplett durchgespielt werden. Technisch ist die Aufnahme trivial, weil die Engine jedes gültige Modul automatisch verarbeitet.

## 2. Neue Themen

Das ist der stärkste Beweis für den Engine-Gedanken: Ein komplett neues Thema ist kein neues Spiel, sondern ein neuer Satz Missions-Module. Die gesamte Engine unter `js/` bleibt unverändert, ebenso der Spielablauf, das Punktesystem, das Speichern, die Hinweise und die Achievement-Logik. Was gleich bleibt und was neu geschrieben wird, lässt sich sauber trennen.

Was aus der Engine gleich bleibt (nichts davon wird angefasst):

- die komplette Kern-Logik (`engine.js`, `save.js`, `puzzles.js`, `ui.js`): Punkte, Speichern, Freischaltungen, Hint-System, Achievement-Auslösung, Mission Hub, Ending-Berechnung;
- das Datenmodell und das JSON-Schema aus Band 5 (Felder wie `id`, `order`, `intro`, `puzzles`, `hints`);
- die Seitenstruktur (Landing, Login, Hub, Missionsseite, Achievements, Leaderboard, Ending) und die Rätseltypen aus Band 3.

Was neu geschrieben wird (reine Daten, kein Programmcode):

- die zehn Missions-JSON-Dateien in `data/missions/` (der eigentliche Inhalt);
- die `achievements.json` (themenpassende Erfolge);
- optional Anpassungen in `config.json` (z. B. Punktegrenzen der Enden);
- optional neue Bilder/Audio in `assets/` und ein angepasstes Story-Rahmenwerk (Welt, Gegenspieler, Verbündete), das die Rolle von PULSE/ALGO/Resistance im neuen Thema übernimmt.

### Durchspiel-Beispiel: das Thema „Climate Change" (Vorschlag)

Um konkret zu zeigen, wie ein neues Thema entsteht, wird hier „Climate Change" Schritt für Schritt aufgesetzt. Alle Erfindungen sind mit „(Vorschlag)" markiert.

Schritt 1: Das Story-Gerüst auf das neue Thema übertragen (Vorschlag). Der dramaturgische Rahmen aus Band 6 wird beibehalten, nur inhaltlich neu besetzt. Aus der Plattform PULSE wird z. B. „GRID", ein globales Energie- und Klimasteuerungssystem. Aus dem Gegenspieler ALGO wird „CARBON", eine Steuerungs-KI, die kurzfristige Bequemlichkeit über langfristige Folgen stellt und dabei genauso höflich-manipulativ auftritt wie ALGO. Aus der Resistance wird eine jugendliche Klimagruppe (z. B. „The Green Signal"), die Desinformation und Greenwashing durchschaut. Wichtig: Die Struktur (ein manipulatives System, eine jugendliche Gruppe, ein rekrutierter Agent, drei Enden) bleibt identisch, weil die Engine genau darauf ausgelegt ist.

Schritt 2: Die zehn Missionsthemen festlegen (Vorschlag). Zum Beispiel: (1) Wie das Klimasystem funktioniert, (2) Klima-Fake-News erkennen, (3) Greenwashing in der Werbung, (4) Statistiken und irreführende Grafiken lesen, (5) CO2-Fußabdruck und persönliche Daten, (6) Desinformationskampagnen, (7) Faktencheck-Techniken, (8) erneuerbare Energien vs. Mythen, (9) individuelle vs. systemische Verantwortung, (10) Finale gegen CARBON. Jede Mission verfolgt weiterhin zwei Lernziele: eines inhaltlich (Klima/Medienkompetenz), eines sprachlich (B2-Englisch, themenbezogenes Vokabular).

Schritt 3: Für jede Mission das JSON-Schema aus Band 5 neu ausfüllen. Man kopiert einfach die Struktur der bestehenden `01-algorithm.json` und tauscht den Inhalt aus. Ein verkürztes Beispiel für die erste Klima-Mission (Vorschlag):

```json
{
  "id": "climate-basics",
  "order": 1,
  "title": "The Grid",
  "location": "The Control Room",
  "unlockedBy": null,

  "intro": {
    "speaker": "Mira",
    "lines": [
      "Hey Agent. Glad the Green Signal reached you.",
      "Before we take on CARBON, you need to see how the Grid really decides.",
      "First job: figure out what CARBON optimises for — comfort now, or the planet later."
    ]
  },

  "learningGoals": {
    "media": "Erklären, wie ein Steuerungssystem kurzfristige Anreize über langfristige Folgen stellt.",
    "english": "Vokabular rund um 'emissions', 'trade-off' und 'sustainability' verstehen."
  },

  "puzzles": [
    {
      "id": "climate-q1",
      "type": "multiple-choice",
      "prompt": "CARBON decides what to power first. What matters MOST to it?",
      "options": [
        "The lowest long-term impact on the planet",
        "Whatever keeps people most comfortable right now",
        "The fairest sharing of energy",
        "The oldest power sources"
      ],
      "correctIndex": 1,
      "points": 100,
      "feedback": {
        "correct": "Exactly. Short-term comfort is its currency, not the future.",
        "wrong": "Not quite. Think about what keeps people from complaining today."
      },
      "hints": [
        "Ask yourself: what does CARBON gain from you staying happy now?",
        "It has nothing to do with the long-term impact.",
        "The answer is: whatever keeps people most comfortable right now."
      ]
    }
  ],

  "outro": {
    "speaker": "Mira",
    "lines": [
      "Now you see it. CARBON isn't evil — it just never looks past today.",
      "Step one done. Head back to the Hub, Agent."
    ]
  },

  "achievementHooks": ["first-mission-done", "no-hint-run"]
}
```

Man erkennt: Es ist exakt dasselbe Schema wie bei „algorithm" aus Band 5. Nur `id`, `title`, `location`, die Sprechernamen, die Texte, Fragen, Antworten und Hinweise sind neu. Die Feldnamen und die Struktur bleiben unverändert, damit die Engine das Modul sofort versteht.

Schritt 4: Die begleitenden Dateien anpassen. In `achievements.json` schreibt man themenpassende Erfolge (z. B. „greenwash-buster" statt „fake-news-sweep"). In `config.json` kann man bei Bedarf die Punktegrenzen der Enden justieren, falls das neue Thema mehr oder weniger Rätsel enthält. Optional legt man neue Bilder und Töne in `assets/` ab.

Schritt 5: Austauschen und testen. Man ersetzt die zehn Dateien im Ordner `data/missions/` durch die zehn neuen Klima-Module (oder legt einen zweiten Missions-Ordner an und stellt ihn in `config.json` ein, falls man mehrere Themen parallel anbieten will). Danach spielt man das neue Thema einmal komplett durch. An `js/` wird nichts geändert. Genau das ist der Kern des modularen Prinzips aus Band 5: Inhalt wechseln, ohne zu programmieren.

Das Ergebnis: Aus „Social Media Escape Game" wird ein „Climate Escape Game" oder später ein „AI Escape Game", ohne dass ein neues Spiel gebaut werden muss. Dieselbe Engine trägt beliebig viele Themen. Genau darin liegt der Wert des Konzepts.

## 3. Seasonal Events

Zeitlich begrenzte Sonderinhalte halten das Spiel lebendig und geben Anlässe für einen erneuten Einsatz im Unterricht. Auch sie sind Module: eine oder wenige zusätzliche Missionen plus passende Achievements, die für einen bestimmten Zeitraum aktiviert werden. Die Engine muss dafür nicht verändert werden; es genügt, ein zusätzliches Missions-Modul einzubinden und nach dem Zeitraum wieder zu entfernen (oder über ein Datumsfeld in `config.json` steuerbar zu machen, Vorschlag).

Beispiele für Seasonal Events (Vorschlag):

- „Safer Internet Day" (Februar): eine kompakte Sondermission rund um sicheres Verhalten im Netz, passend zum realen Aktionstag.
- „Fact-Check Week": ein zeitlich begrenzter Schwerpunkt auf Faktenchecks mit einem eigenen Sonder-Achievement.
- „Year-End Review": eine reflektierende Mission zum Schuljahresende, in der ALGO die Spielenden mit ihren eigenen früheren Antworten konfrontiert (Vorschlag), passend zum Übergang in die Oberstufe aus Band 1.
- Themen-passende Anlässe bei neuen Themen, z. B. „Earth Day" beim Klima-Modul oder „Election Season" beim USA-Modul.

Technischer Vorschlag für die Steuerung: In `config.json` kann ein optionales Feld `activeEvents` stehen, das die `id`s der gerade aktiven Sondermissionen enthält. Die Engine zeigt im Mission Hub nur die Missionen an, die entweder zur Grundreihe gehören oder in `activeEvents` genannt sind. So lassen sich Sonderinhalte durch eine reine Einstellungsänderung ein- und ausblenden, ohne den Kern anzufassen. Wichtig bleibt: Ein Seasonal Event darf den normalen Spielverlauf nie blockieren, sondern ist immer ein Zusatz.

## 4. Weitere Bösewichte

ALGO bleibt der zentrale Gegenspieler der Grundgeschichte (Band 6). Erweiterungen können jedoch weitere Gegenspieler einführen, solange sie zur Story Bible passen und den Dialogstil einhalten (nie offen böse, sondern höflich-manipulativ oder auf andere Weise vielschichtig). Neue Bösewichte sind erzählerische Ergänzungen; technisch sind sie nur neue Sprechernamen im Feld `speaker` der Missions-Module.

Vorschläge für weitere Gegenspieler im Social-Media-Universum:

- „ECHO" (Vorschlag): ein untergeordnetes System von ALGO, spezialisiert auf Echokammern. Es verstärkt, was die Spielenden ohnehin schon glauben, und wirkt dadurch besonders schmeichelhaft und gefährlich. Passt gut in eine Erweiterung der Echo-Chambers-Mission.
- „MIRROR" (Vorschlag): ein Deepfake-System, das Gesichter und Stimmen fälscht und behauptet, nur zu helfen. Es könnte in einer erweiterten Deepfake-Reihe auftreten.
- „PATCH" (Vorschlag): ein scheinbar reuiger Teil von ALGO, der vorgibt, auf die Seite der Resistance zu wechseln, in Wahrheit aber Fehlinformationen streut. Ein Bösewicht, der Vertrauen testet und so Medienkompetenz auf einer höheren Stufe schult.

Bei neuen Themen bekommt jedes Modul seinen eigenen Hauptgegenspieler, der die Rolle von ALGO übernimmt (z. B. „CARBON" beim Klima-Thema aus Abschnitt 2, oder eine überoptimierende KI beim Thema Artificial Intelligence). Grundregel bleibt in allen Fällen: Der Gegenspieler klingt nie brüllend böse, sondern ruhig, überlegen und manipulativ, damit die Spannung aus der Story Bible erhalten bleibt.

## 5. Multiplayer-Version

Die Grundversion ist bewusst für Einzelspiel am eigenen Gerät ausgelegt (Band 1). Ein Multiplayer-Modus ist als spätere Ausbaustufe denkbar und würde vor allem den sozialen und kooperativen Reiz erhöhen. Wichtig für die Einordnung: Multiplayer ist die einzige Erweiterung in diesem Band, die tatsächlich Erweiterungen an der Engine erfordert (nicht nur neue Daten), weil mehrere Spielstände koordiniert werden müssen. Das setzt die serverbasierte Speicherlösung aus Band 5, Abschnitt 5.4, voraus.

Denkbare Multiplayer-Varianten (Vorschlag):

- „Co-op-Modus": Zwei bis vier Spielende lösen dieselbe Mission gemeinsam. Jede Person sieht denselben Fall, aber unterschiedliche Hinweise oder Teilinformationen, sodass sie sich absprechen müssen. Fördert die englische Kommunikation zusätzlich.
- „Team-Leaderboard": Die Klasse wird in Teams eingeteilt; das bestehende Leaderboard (Band 1/5) wird um eine Team-Wertung ergänzt. Das ist die technisch einfachste Variante, weil sie nur eine zusätzliche Auswertung der ohnehin gesammelten Punkte ist.
- „Live-Wettlauf": Alle starten gleichzeitig dieselbe Mission, und der Fortschritt wird in Echtzeit angezeigt. Das ist die anspruchsvollste Variante und braucht eine ständige Server-Verbindung.

Was die Engine dafür können müsste: einen Server, der mehrere Spielstände gleichzeitig verwaltet (aufbauend auf `submitScore` und der Server-Speicherung aus Band 5, Abschnitt 10.4); eine Zuordnung von Spielenden zu Teams oder Sitzungen; und für den Live-Wettlauf eine Übertragung des Fortschritts nahezu in Echtzeit. Das Datenmodell der Missionen (die JSON-Module) bleibt dabei unverändert, weil der Inhalt derselbe ist. Empfehlung: Multiplayer erst angehen, wenn die Server-Lösung ohnehin für ein echtes Klassen-Leaderboard eingeführt wurde, und mit dem einfachsten Fall (Team-Leaderboard) beginnen.

## 6. Lehrer-Editor

Langfristiges Ziel ist ein Werkzeug, mit dem Lehrkräfte eigene Missionen erstellen, ohne programmieren zu müssen. Der Editor ist letztlich eine komfortable Oberfläche, die im Hintergrund genau das JSON-Missions-Modell aus Band 5 erzeugt. Weil die Engine jedes gültige Modul automatisch verarbeitet, muss der Editor „nur" gültige JSON-Dateien ausgeben, dann läuft die neue Mission sofort im bestehenden Spiel.

So könnte der Lehrer-Editor funktionieren (Vorschlag):

- Eine einfache Formular-Oberfläche führt Schritt für Schritt durch die Felder einer Mission: Titel, Ort, Intro-Dialog, Rätsel, Outro-Dialog. Die Lehrkraft füllt Textfelder aus und wählt aus Listen (z. B. den Rätseltyp aus Band 3), ohne je Code zu sehen.
- Für jedes Rätsel bietet der Editor die passenden Eingabefelder je nach gewähltem Typ an: bei Multiple Choice die Antwortoptionen und die richtige Antwort, bei Drag-and-drop die Elemente und die richtige Reihenfolge, und immer die drei gestuften Hinweise, das Feedback und die Punkte.
- Eine Vorschau-Funktion zeigt die Mission sofort so, wie die Schülerinnen und Schüler sie später sehen, damit die Lehrkraft testen kann, bevor sie die Mission freigibt.
- Am Ende erzeugt der Editor die fertige JSON-Datei und legt sie im Ordner `data/missions/` ab (oder bietet sie zum Download an). Damit ist die Mission Teil des Spiels, ganz ohne Programmierkenntnisse.

Zusätzliche hilfreiche Funktionen (Vorschlag): eine Prüfung, ob alle Pflichtfelder ausgefüllt sind (z. B. genau drei Hinweise pro Rätsel, wie es Band 5 verlangt); Vorlagen zum Kopieren, damit man nicht bei null anfängt; und ein Hinweis auf das B2-Sprachniveau und die Dialogstile aus Band 6, damit selbst erstellte Missionen zur Welt passen. Der Editor ist damit die konsequente Weiterführung des Engine-Gedankens: Wenn Inhalt und Programm sauber getrennt sind, kann am Ende jede Lehrkraft Inhalte erstellen, ohne den Kern zu berühren. Dieses Werkzeug ist ausdrücklich als langfristiges Ziel gedacht, nicht als Teil der ersten Version.

## 7. KI-Integration

Künstliche Intelligenz kann das Spiel an einigen Stellen sinnvoll unterstützen. Weil es hier zugleich um Chancen und um Grenzen geht, werden beide klar benannt. Grundsatz: KI ist immer eine Ergänzung, nie ein Ersatz für die sorgfältig geschriebenen Inhalte und schon gar nicht für die pädagogische Verantwortung der Lehrkraft.

Chancen (wo KI sinnvoll helfen könnte, jeweils Vorschlag):

- Dynamische Hinweise: Statt nur der drei festen Hinweise könnte eine KI auf die konkrete falsche Antwort eingehen und einen zusätzlichen, individuell passenden Denkanstoß geben. Das gestufte Grundsystem aus Band 5 bliebe als verlässliche Basis erhalten.
- Auswertung freier Antworten: Bei offenen `text-input`-Rätseln (Band 3) könnte KI helfen, sinngemäß richtige, aber unterschiedlich formulierte englische Antworten als korrekt zu erkennen, statt nur exakte Wortübereinstimmung zu prüfen.
- Unterstützung beim Erstellen von Inhalten: Lehrkräfte könnten sich beim Lehrer-Editor (Abschnitt 6) von KI Entwürfe für Rätsel, Hinweise oder Dialoge vorschlagen lassen, die sie anschließend prüfen und anpassen. Das beschleunigt die Arbeit, ersetzt aber nicht die redaktionelle Kontrolle.
- Sprachliche Differenzierung: KI könnte auf Wunsch Erklärungen für schwieriges Vokabular liefern (ergänzend zu den Tooltips aus Band 5, Abschnitt 9.4) oder einen Text vereinfachen, um schwächere Lernende zu unterstützen.

Grenzen (wo Vorsicht geboten ist):

- Verlässlichkeit und Fehler: KI kann falsche oder irreführende Antworten geben. Gerade in einem Spiel, das Medienkompetenz und das Erkennen von Falschinformationen lehrt, wäre eine KI, die selbst Unsinn erzeugt, ein Widerspruch. Deshalb müssen die Kern-Inhalte (richtige Antworten, feste Hinweise) immer von Menschen geschrieben und geprüft sein.
- Datenschutz: Schülerantworten an einen externen KI-Dienst zu senden, wirft Datenschutzfragen auf, besonders bei Minderjährigen und in Schulnetzwerken. Eine KI-Funktion muss datenschutzkonform sein und darf idealerweise abschaltbar bleiben.
- Abhängigkeit und Kosten: KI-Dienste brauchen meist eine Internetverbindung und verursachen Kosten. Die Grundversion des Spiels ist bewusst als einfache, statische Website ohne solche Abhängigkeiten geplant (Band 5). KI darf daher nur eine optionale Zusatzstufe sein, nie eine Voraussetzung zum Spielen.
- Pädagogische Kontrolle: Das Spiel soll bestimmte Dinge bewusst lehren. Eine frei formulierende KI könnte vom Lernziel abweichen oder unangemessen antworten, besonders beim sensiblen Thema Mental Health (Band 1). Solche Bereiche gehören fest in menschlich verfasste, geprüfte Inhalte.

Empfehlung: KI zunächst nur an unkritischen Stellen und optional einsetzen (z. B. als zusätzliche, klar gekennzeichnete Hinweis-Ebene), immer abschaltbar, und die verlässliche Grundfunktion des Spiels ohne jede KI erhalten. So bleiben die Chancen nutzbar, ohne die Grenzen zu ignorieren.

## 8. Neue Achievements

Achievements sind wie Missionen austauschbare Daten (Band 5, Abschnitt 8). Ein neues Achievement ist einfach ein weiterer Eintrag in `achievements.json` und, falls es an eine bestimmte Mission gebunden ist, ein zusätzlicher Eintrag im Feld `achievementHooks` der betreffenden Mission. Die Engine muss dafür nicht verändert werden, solange die Auslösebedingung zu den bereits vorgesehenen Prüfstellen passt. Nur eine völlig neuartige Bedingung würde eine einmalige Ergänzung der Prüffunktion `checkAchievements` erfordern.

Vorschläge für zusätzliche Achievements (im Datenformat aus Band 5):

- „Speed Runner": eine Mission besonders schnell abgeschlossen (setzt eine Zeitmessung voraus, Vorschlag).
- „Comeback": nach einer falschen Antwort dasselbe Rätsel ohne Hinweis richtig gelöst.
- „Full Signal": alle regulären Missionen abgeschlossen (Vervollständigung der Grundreihe).
- „Curious Mind": alle optionalen Zusatzrätsel gelöst (passend zu den optionalen Rätseln aus Band 5, Abschnitt 9.2).
- „Event Agent": an einem Seasonal Event teilgenommen (Abschnitt 3 dieses Bandes).
- Theme-spezifische Erfolge bei neuen Themen, z. B. „Greenwash Buster" beim Klima-Modul oder „Bot Spotter" bei einer Bot-Mission.

Ein Beispieleintrag im gewohnten Format (Vorschlag):

```json
{
  "id": "comeback",
  "title": "Comeback",
  "description": "Solve a puzzle correctly on your own right after getting it wrong.",
  "icon": "comeback.svg",
  "secret": false
}
```

Wie in Band 6 vorgesehen, können einzelne Achievements geheim sein (`"secret": true`) und passen dann zu den Easter Eggs. So bleibt der Sammelanreiz aus Band 1 erhalten und lässt sich beliebig erweitern, ohne die Engine zu verändern.

## 9. Neue Rätsel

Die Rätselbibliothek in Band 3 lässt sich erweitern. Hier ist die Trennung besonders wichtig: Ein neues Rätsel desselben Typs ist reiner JSON-Inhalt und braucht keinerlei Programmierung. Ein völlig neuer Rätseltyp dagegen erfordert eine einmalige Ergänzung der Engine, weil sie lernen muss, wie dieser Typ angezeigt und geprüft wird (in `renderPuzzle` und `checkAnswer`, siehe Band 5, Abschnitt 10.2). Danach kann die Engine beliebig viele Rätsel dieses neuen Typs allein aus den Daten verarbeiten.

Vorschläge für neue Rätseltypen, die zur Bibliothek in Band 3 passen würden:

- „Matching" (Zuordnung): Begriffe mit Definitionen verbinden, z. B. Medien-Fachbegriffe mit ihren englischen Erklärungen. Gut für Vokabeltraining.
- „Fill-in-the-blank" (Lückentext): einzelne Wörter in einem englischen Text ergänzen. Trainiert Leseverstehen und Vokabular zugleich.
- „Timeline" (Zeitstrahl): Ereignisse oder Schritte in die richtige Reihenfolge bringen, z. B. wie eine Fake-News-Kampagne abläuft.
- „Highlight" (Textmarkierung): in einem englischen Text die manipulativen oder verdächtigen Stellen markieren. Verbindet genaues Lesen mit Medienkompetenz.
- „Slider/Estimate" (Schätzung): eine Zahl oder einen Anteil auf einer Skala einstellen, z. B. „Wie viel Prozent ...?". Gut für Statistik-Kompetenz, besonders bei Themen wie Climate Change.

Für jeden dieser Typen legt Band 3 fest, welche JSON-Felder er braucht (analog zu `options`/`correctIndex` bei Multiple Choice). Wird ein neuer Typ in die Engine aufgenommen, sollte er die immer gleichen Grundfelder aus Band 5 mitbringen (`id`, `type`, `prompt`, `points`, `feedback`, drei `hints`), damit das restliche System (Punkte, Hinweise, Achievements) ohne Anpassung weiter funktioniert. So wächst die Rätselbibliothek kontrolliert, während der Kern stabil bleibt.

## 10. Community-Ideen

Dieser Abschnitt ist die Sammelstelle für Ideen von außen, also von Kolleginnen und Kollegen, von Schülerinnen und Schülern und von anderen Nutzenden. Weil das Spiel modular ist, lassen sich gute Vorschläge oft direkt als neues Modul umsetzen, ohne den Kern zu verändern. Das macht die Community zu einer echten Quelle für Wachstum.

So kann der Rücklauf organisiert werden (Vorschlag):

- Ideen sammeln und danach einordnen: Handelt es sich um eine neue Mission (Abschnitt 1), ein neues Thema (Abschnitt 2), ein Seasonal Event (Abschnitt 3), ein Achievement (Abschnitt 8) oder einen neuen Rätseltyp (Abschnitt 9)? Diese Zuordnung zeigt sofort, ob nur neue Daten nötig sind oder eine seltene Engine-Ergänzung.
- Schüler-Feedback gezielt nutzen: Gerade die Zielgruppe erkennt schnell, welche Missionen fesseln und welche zu leicht oder zu schwer sind. Solche Rückmeldungen fließen in die Feinabstimmung über `config.json` (Punktegrenzen, Hinweiskosten) und in die Überarbeitung einzelner Rätsel ein, beides ohne Programmierung.
- Lehrkräfte als Autorinnen und Autoren: Sobald der Lehrer-Editor (Abschnitt 6) existiert, können Lehrkräfte eigene Missionen beisteuern und teilen. So entsteht mit der Zeit eine gemeinsame Sammlung von Missionen zu vielen Themen, alle auf derselben Engine.
- Qualität sichern: Community-Beiträge werden vor der Aufnahme geprüft, vor allem auf sprachliche Richtigkeit (B2, Band 6), auf passende Dialogstile und darauf, dass sensible Themen sorgfältig behandelt sind (Band 1).

Sammelraster für neue Ideen (Vorschlag, damit nichts verloren geht): kurze Beschreibung der Idee, vorgeschlagene Kategorie (Mission/Thema/Event/Achievement/Rätsel), von wem die Idee stammt, und die Einschätzung, ob sie mit reinen Daten oder mit einer Engine-Ergänzung umsetzbar ist. Dieses Raster macht sichtbar, was am schnellsten realisierbar ist, und hält den roten Faden des ganzen Bandes fest: Das meiste wächst als Modul, der Kern bleibt gleich.
