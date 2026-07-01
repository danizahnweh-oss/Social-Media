# Band 4 – Website & UX Design

Zweck dieses Bandes: festhalten, wie jede Seite aussieht und sich anfühlt. Praktisch ein Figma in Textform. Gehört zum festen Kern der Engine.

Für jede Seite wird beschrieben: Aufgabe der Seite, wichtigste Elemente, Anordnung (Layout in Worten), was bei Interaktion passiert, dazu passende englische Beispiel-Beschriftungen (British English, B2). Die englischen Texte sind Vorschläge und können angepasst werden, solange sie zum Kanon aus Band 6 passen. Konkrete Farbwerte, Schriftvorschläge und Grundregeln sind gebündelt in Abschnitt „10. UI-/UX-Regeln". Die Punkte- und Hinweis-Logik selbst steht in Band 5; hier geht es nur um die Darstellung.

Grundhaltung des Designs: Cyberpunk und Neon auf einem sehr dunklen, fast schwarzen Hintergrund. Alles wirkt wie ein geheimer Kanal der Resistance, in den man sich einloggt. Neon-Türkis und Magenta sind die freundlichen, aktiven Farben; Neon-Rot ist ausschließlich Warnung und Gefahr. Überschriften und alle Nachrichten von ALGO nutzen eine Monospace-/Glitch-Schrift. Animationen sind dezent und dürfen nie vom Lernen ablenken. Sound ist immer abschaltbar (Klassenraum).

## 1. Landing Page

Aufgabe der Seite: den ersten Eindruck setzen und Stimmung aufbauen, bevor irgendetwas erklärt wird. Die spielende Person soll in Sekunden spüren: Hier ist etwas nicht in Ordnung, hier beginnt ein Thriller. Die Seite hat genau ein Ziel, nämlich den Einstieg ins Spiel (den „Start"-Klick), und lenkt von diesem Ziel mit nichts ab.

Wichtigste Elemente: ein großer Titel-Schriftzug des Spiels in Glitch-Schrift, ein kurzer atmosphärischer Untertitel (der Leitsatz „See through the feed."), ein einziger großer Start-Button, ein dezenter Ton-/Sound-Schalter oben rechts sowie eine kleine, unauffällige Fußzeile mit Sprach-Hinweis und Impressum/Datenschutz-Platzhalter.

Layout in Worten: Der Hintergrund ist sehr dunkel und lebt leicht, etwa durch langsam driftende Neon-Linien oder ein schwaches Raster, das an einen Datenstrom erinnert. In der oberen Bildschirmmitte prangt der Titel, zum Beispiel `PULSE // ACCESS DENIED` oder der Projekt-Titel in großer Glitch-Type. Direkt darunter, kleiner, der Untertitel: `See through the feed.` In der vertikalen Mitte, gut sichtbar zentriert, sitzt der Start-Button. Oben rechts, klein, das Ton-Symbol. Ganz unten eine schmale Fußzeile. Es gibt bewusst kein Menü und keine Sidebar auf dieser Seite, damit der Fokus ganz auf dem Einstieg liegt.

Interaktionen: Beim Laden flackert der Titel einmal kurz im Glitch-Stil und beruhigt sich dann. Fährt man mit der Maus über den Start-Button, verstärkt sich sein Neon-Rand (Glow) und ein leiser Signalton ertönt (falls Sound an). Ein Klick auf den Start-Button leitet mit einem kurzen „Verbindungsaufbau"-Übergang (siehe Abschnitt 8) zur Login- / Agent-Creation-Seite. Ein Klick auf den Ton-Schalter schaltet den gesamten Spielsound global an oder aus; der Zustand bleibt für die ganze Sitzung erhalten. Als optionales Easter Egg (siehe Band 6) kann für einen Sekundenbruchteil eine „echte" ALGO-Zeile durch den Titel glitchen, etwa `I see you.`, die aber sofort wieder verschwindet.

Englische Beispiel-Beschriftungen: Start-Button `ENTER THE FEED` (Alternative: `BEGIN` oder `CONNECT`). Sound-Schalter `Sound: On / Off`. Fußzeile `A Resistance training simulation · English (B2)`.

## 2. Login / Agent Creation

Aufgabe der Seite: die spielende Person aus der Rolle „normale Nutzerin" in die Rolle „Agent der Resistance" holen. Hier legt sie ihren Codename und ein einfaches Agenten-Profil an. Diese Seite erklärt zugleich narrativ, warum überhaupt ein Login nötig ist: Die Resistance kommuniziert nur über einen verschlüsselten Kanal (the Backchannel, Band 6).

Wichtigste Elemente: eine kurze Story-Einleitung als eingehende Nachricht der Resistance (Chat-Optik), ein Eingabefeld für den Codename, eine kompakte Avatar-/Symbol-Auswahl (ein paar vorgegebene Neon-Icons, keine freie Bild-Uploads), optional die Klassen-/Gruppenkennung, die die Lehrkraft bereitstellt (für das Leaderboard), sowie ein Bestätigungs-Button. Dazu ein sehr kurzer, kindgerechter Datenschutz-Hinweis, dass kein echter Name nötig ist.

Layout in Worten: Links (auf schmaleren Geräten oben) läuft ein Chat-Fenster, in dem die Resistance – geführt von Cipher – zeilenweise eintippt, mit sichtbarer Tipp-Animation. Rechts (bzw. darunter) liegt das eigentliche Formular: zuerst das Codename-Feld, darunter die Icon-Reihe zur Auswahl, darunter das Feld für die Klassenkennung, ganz unten der Bestätigungs-Button. Das Ganze sitzt in einer dunklen „Terminal"-Box mit türkisem Rahmen. Der Hintergrund bleibt der ruhige, dunkle Datenstrom der Landing Page.

Interaktionen: Die Resistance-Nachricht baut sich Zeile für Zeile mit Tipp-Animation auf (überspringbar per Klick). Das Codename-Feld gibt sofort Rückmeldung: Ist der Name leer oder zu kurz, bleibt der Button gedämpft/gesperrt; sobald ein gültiger Codename steht, leuchtet der Button in Türkis auf. Ein Klick auf ein Avatar-Icon markiert es mit einem Neon-Ring. Beim Bestätigen erscheint eine kurze „Identität wird angelegt"-Animation, dann eine Willkommens-Zeile mit dem gewählten Codename (`Welcome, Agent <Codename>.`) und ein weicher Übergang zum Mission Hub. Der Fortschritt (Agentenprofil) wird an dieser Stelle erstmals gespeichert (Speicherlogik in Band 5). Kommt die Person später zurück, erkennt das Spiel den bestehenden Agenten und überspringt die Neuanlage („Continue as Agent <Codename>").

Englische Beispiel-Beschriftungen: Chat-Intro (Cipher) `We spotted an anomaly in your feed. That's why we found you. Pick a codename — never your real one.` Feld-Label `Choose your codename`. Platzhalter `e.g. Nightjar`. Icon-Bereich `Select your signal`. Klassenfeld `Class code (from your teacher)`. Button `CREATE AGENT` bzw. bei Rückkehr `RESUME MISSION`. Datenschutz-Zeile `No real names. This stays inside the simulation.`

## 3. Mission Hub

Aufgabe der Seite: die Zentrale des Spiels. Von hier aus wählt die spielende Person Missionen aus, sieht ihren Fortschritt durch die Geschichte und behält Punkte, Rang und Achievements im Blick. Der Hub ist der Ort, zu dem man nach jeder Mission zurückkehrt (Gameplay-Loop, Band 1).

Wichtigste Elemente: eine Missions-Landkarte oder Missions-Liste mit allen zehn Missionen und ihrem Zustand (gesperrt, verfügbar, abgeschlossen), die dauerhafte Sidebar (siehe Abschnitt 5), ein Fortschrittsbalken über die gesamte Kampagne, ein Zugang zum Klassen-Leaderboard sowie eine kurze Statusmeldung der Resistance („Was ist als Nächstes zu tun?").

Layout in Worten: Links liegt die dauerhafte Sidebar mit Agentenprofil, Navigation und Punktestand. Die Mitte füllt die Missions-Übersicht: Vorgeschlagen wird eine vertikale bzw. leicht gewundene „Pfad"-Darstellung von unten (Mission 1) nach oben (Mission 10, der Final Boss in the Core), sodass sichtbarer Aufstieg entsteht; jede Mission ist ein Knoten (Kachel) auf diesem Pfad, verbunden durch leuchtende Linien. Alternativ funktioniert dasselbe als schlichtes Kachel-Raster, falls der Pfad technisch zu aufwendig ist. Oben in der Mitte ein Kampagnen-Fortschrittsbalken samt Kapitel-Titel. Oben rechts ein Button/Reiter zum Leaderboard. Über oder neben dem Pfad eine schmale Statuszeile der Resistance.

Zustände der Missionsknoten (visuell klar unterschieden, Details der Farben in Abschnitt 10):
- Gesperrt: abgedunkelt, ausgegraut, mit Schloss-Symbol; nicht anklickbar, Cursor zeigt „nicht erlaubt". Tooltip erklärt, was zuerst zu tun ist.
- Verfügbar: voll eingefärbt, leuchtender Türkis-Rand, leichte Puls-Animation, die die aktuell freigeschaltete Mission besonders hervorhebt („hier weiter").
- Abgeschlossen: mit Häkchen und/oder erreichter Sternebewertung; ruhiger, in gedämpftem Türkis, weiterhin anklickbar (zum Wiederholen/Nachlesen).

Interaktionen: Ein Klick auf einen verfügbaren Missionsknoten öffnet zunächst eine kleine Missions-Vorschau (Titel, Thema, geschätzte Dauer, mögliche Punkte, ggf. verknüpftes Achievement) mit einem `START`-Button; von dort geht es zur Missionsseite. Ein Klick auf eine abgeschlossene Mission bietet „Wiederholen" oder „Zusammenfassung ansehen". Ein Klick auf einen gesperrten Knoten löst nur eine kurze Fehler-/Sperr-Animation (leichtes Rütteln, roter Aufblitz) und einen erklärenden Tooltip aus. Beim Betreten des Hubs nach Abschluss einer Mission spielt eine „Freischalt"-Animation: Die nächste Mission wechselt sichtbar von gesperrt zu verfügbar, die Verbindungslinie leuchtet auf. Ein Klick auf das Leaderboard öffnet dessen Ansicht (siehe unten).

Leaderboard (im Hub verortet): Das Klassen-Leaderboard ist über einen eigenen Reiter/Button im Hub erreichbar und zeigt die Rangliste innerhalb der Klasse nach Punkten. Dargestellt werden Rang, Codename und Punktzahl; der eigene Eintrag ist hervorgehoben (Neon-Rahmen), auch wenn er weiter unten steht, damit man sich immer wiederfindet. Es werden nur Codenames gezeigt, keine echten Namen. Wichtig: Die Lehrkraft kann das Leaderboard komplett abschalten (Detail Band 5/7). Ist es abgeschaltet, verschwindet der Reiter ganz bzw. zeigt einen ruhigen Hinweis `Leaderboard disabled by your teacher.`, damit niemand entmutigt wird.

Englische Beispiel-Beschriftungen: Seitentitel `MISSION HUB`. Fortschritt `Campaign progress: 4 / 10`. Statuszeile (Resistance) `New mission unlocked: Fake News. Ready when you are.` Mission-Vorschau-Button `START MISSION`. Gesperrt-Tooltip `Complete the previous mission to unlock this.` Leaderboard-Reiter `CLASS LEADERBOARD`. Leaderboard-Spalten `Rank · Agent · Points`.

## 4. Missionsseiten

Aufgabe der Seite: der eigentliche Spielort, an dem gerätselt wird. Weil das Spiel eine Engine ist, ist der Aufbau für alle zehn Missionen gleich; nur Thema, Story-Text und die konkreten Rätsel (aus der Rätselbibliothek, Band 3) wechseln. Dieser einheitliche Rahmen macht das Spiel wiedererkennbar und später leicht erweiterbar.

Ablaufphasen einer Missionsseite (folgen dem Gameplay-Loop aus Band 1):
1. Briefing: kurze Story-Einleitung durch die Resistance – worum geht es, was ist das Ziel der Mission.
2. Rätselphase: ein oder mehrere Rätsel nacheinander, mit sofortigem Feedback pro Antwort.
3. Debriefing: kurzer Abschluss – Story-Fortschritt, Punktevergabe, evtl. Achievement, dann zurück zum Hub.

Wichtigste Elemente: der Missions-Kopf (Missionsnummer, Titel, Thema-Icon), das Story-/Dialogfenster (Chat-Optik für Resistance und ALGO), der zentrale Rätsel-Bereich (wechselt je nach Rätseltyp), eine Fortschrittsanzeige innerhalb der Mission (z. B. „Puzzle 2 of 3"), der Hinweis-Button mit den drei Stufen, die Punkteanzeige, ein Vokabel-/Tooltip-Helfer für schwieriges Englisch sowie die dauerhafte Sidebar.

Layout in Worten: Oben ein schmaler Missions-Kopf mit Nummer und Titel, links weiterhin die Sidebar. Die Mitte ist zweigeteilt: Ein Story-/Dialogstreifen (meist oben oder links) zeigt, wer gerade spricht – Nachrichten der Resistance erscheinen in einer Farbe/Ausrichtung, Nachrichten von ALGO deutlich anders (Glitch-Schrift, kühles Leuchten), sodass man sofort weiß, wem man (nicht) trauen darf. Darunter bzw. daneben liegt der große Rätsel-Bereich, der je nach Aufgabentyp anders aussieht (z. B. Text mit Multiple-Choice, ein Bildvergleich für Deepfakes, ein Audio-Player mit Fragen für Hörverstehen, ein Zuordnungs-Rätsel). Unter dem Rätsel-Bereich sitzt die Aktionsleiste: links der Hinweis-Button, rechts der Absende-/Weiter-Button. Der aktuelle Punktestand ist oben rechts oder in der Sidebar immer sichtbar. Schwierige englische Wörter sind im Text dezent markiert (gepunktete Unterstreichung); ein Klick öffnet einen kleinen Tooltip mit einfacher englischer Erklärung.

Interaktionen: Die Briefing-Zeilen tippen sich mit Animation ein (überspringbar). Im Rätsel gibt jede Antwort sofortiges Feedback: Bei richtig grüner/türkiser Aufblitz und ein positiver Signalton; bei falsch ein kurzer roter Aufblitz mit sanftem Rütteln, aber ohne bestrafendes Drama – man darf es weiter versuchen bzw. bekommt die Möglichkeit, einen Hinweis zu nehmen. Der Hinweis-Button öffnet das gestufte Hinweissystem: Stufe 1 kleiner Denkanstoß, Stufe 2 konkretere Hilfe, Stufe 3 Lösung; vor jeder Stufe wird angezeigt, wie viele Punkte sie kostet, mit Bestätigung (`Reveal hint (−25 pts)?`), damit niemand versehentlich Punkte verliert. Die genaue Punkte- und Hinweislogik steht in Band 5. Nach dem letzten Rätsel folgt automatisch das Debriefing mit einer Punkte-Zusammenfassung und ggf. einem Achievement-Pop-up, dann ein `RETURN TO HUB`-Button. Der Fortschritt wird nach jedem gelösten Rätsel gespeichert, sodass jederzeit pausiert werden kann (Band 5). An passenden Stellen kann ALGO manipulativ „dazwischenfunken" (z. B. eine falsche Hilfe anbieten), was Teil des Rätsels ist.

Englische Beispiel-Beschriftungen: Missions-Kopf `MISSION 02 · FAKE NEWS`. Briefing (Resistance) `Two headlines. One is a lie built to make you angry. Find it.` ALGO-Einwurf (Glitch) `You can trust this source. I promise.` Rätsel-Fortschritt `Puzzle 2 of 3`. Hinweis-Button `HINT`. Hinweis-Bestätigung `Reveal hint 1 of 3 (−25 pts)?`. Absende-Button `SUBMIT`, Weiter-Button `NEXT`, Abschluss `RETURN TO HUB`. Feedback richtig `Correct. Signal clean.` Feedback falsch `Not quite. Look again.` Tooltip-Beispiel `manipulate = to control or influence someone unfairly`.

## 5. Sidebar

Aufgabe der Seite bzw. des Bereichs: die dauerhafte Steuer- und Statuszentrale, die auf (fast) allen Innen-Seiten sichtbar bleibt. Sie beantwortet jederzeit drei Fragen: Wer bin ich, wo bin ich, wie stehe ich da. So findet man sich immer zurecht, ohne die Story-Seiten mit Bedienelementen zu überladen.

Wichtigste Elemente (von oben nach unten): Agenten-Profil (gewähltes Icon plus Codename), Haupt-Navigation (Hub, Missionen, Achievements, Leaderboard), aktueller Punktestand mit kompakter Anzeige, ein Kampagnen-Fortschritts-Mini (z. B. 4/10) und ganz unten die Einstellungen (Sound an/aus, ggf. Hilfe/Impressum) sowie ein Ein-/Ausklapp-Knopf.

Layout in Worten: Die Sidebar liegt am linken Bildschirmrand als schmale, dunkle Säule mit türkisem Trennstrich zum Inhalt. Ganz oben das Agentenprofil, darunter die Navigations-Icons mit kurzen Labels, in der Mitte der Punktestand als hervorgehobenes Element, darunter der Mini-Fortschritt, unten die Einstellungen. Der gerade aktive Menüpunkt ist deutlich hervorgehoben (Türkis-Balken/Glow). Auf schmalen Geräten klappt die Sidebar zu einem Symbol-Menü zusammen oder verschwindet hinter einem „Burger"-Knopf (siehe Abschnitt 9).

Interaktionen: Ein Klick auf einen Navigationspunkt wechselt die Seite und hebt den neuen Punkt hervor. Der Punktestand animiert kurz auf, wenn sich die Punktzahl ändert (Zähler läuft hoch, siehe Abschnitt 8). Der Sound-Schalter schaltet global stumm. Der Ein-/Ausklapp-Knopf reduziert die Sidebar auf reine Icons, um mehr Platz für das Rätsel zu schaffen; dieser Zustand bleibt gespeichert. Während einer laufenden Rätselphase kann die Navigation dezent gedämpft sein, damit man nicht versehentlich mitten im Rätsel wegklickt (mit Nachfrage `Leave mission? Progress is saved.`).

Englische Beispiel-Beschriftungen: Profil `AGENT NIGHTJAR`. Navigation `Hub · Missions · Achievements · Leaderboard`. Punkte `Points: 320`. Fortschritt `Progress 4/10`. Einstellungen `Sound · Help`. Verlassen-Nachfrage `Leave mission? Your progress is saved.`

## 6. Punktesystem-Anzeige

Aufgabe der Seite bzw. des Bereichs: den Punktestand jederzeit klar, motivierend und ohne Ablenkung zeigen. Die Anzeige macht sichtbar, dass sich Anstrengung lohnt und dass Hinweise etwas kosten. Die Logik dahinter (wie viele Punkte wofür) steht in Band 5; hier geht es nur um Darstellung und Rückmeldung.

Wichtigste Elemente: die zentrale Punktzahl (numerisch, gut lesbar), eine kurze Rang-/Stufenbezeichnung (Vorschlag: Agenten-Level, das sich aus Punkten ergibt), sowie situative Punkte-Rückmeldungen als kleine aufsteigende Zahlen („+20") direkt beim Ereignis. Optional ein schmaler Fortschrittsbalken bis zum nächsten Level.

Layout in Worten: Der dauerhafte Punktestand lebt in der Sidebar (Abschnitt 5) und zusätzlich oben rechts auf der Missionsseite, damit er beim Rätseln im Blick bleibt. Die Zahl steht groß, darunter oder daneben klein der aktuelle Agenten-Rang und ein optionaler Level-Balken. Punkte-Rückmeldungen erscheinen genau dort, wo das Ereignis passiert (z. B. am gelösten Rätsel), und schweben kurz nach oben, bevor sie verblassen.

Interaktionen: Bei einem richtigen Rätsel steigt der Zähler animiert hoch, begleitet von einem `+X`-Element in Türkis und einem positiven Signalton. Kostet ein Hinweis Punkte, erscheint ein `−X` in gedämpftem Rot und der Zähler zählt sichtbar herunter – ehrlich, aber ohne Drama. Erreicht die Punktzahl eine Level-Schwelle, füllt sich der Balken, ein kurzes Level-Up-Pop-up bestätigt den neuen Rang (siehe Abschnitt 8). Die Darstellung ist rein informativ; man kann sie nicht anklicken außer als Weg zur Achievement-/Leaderboard-Ansicht.

Rang-/Level-Vorschlag (Vorschlag, Werte in Band 5): eine kleine Aufstiegsreihe passend zur Fiktion, z. B. `Rookie → Operative → Analyst → Cipherbreaker → Ghost`. So wird die reine Zahl zusätzlich in eine Rollen-Identität übersetzt.

Englische Beispiel-Beschriftungen: `Points: 320` · Rang `Rank: Operative` · Level-Balken `Next rank in 80 pts`. Punkte-Feedback `+20`, `−25`. Level-Up `Rank up: Analyst`.

## 7. Achievement-Seite

Aufgabe der Seite: alle besonderen Erfolge an einem Ort sammeln und den Sammelanreiz sichtbar machen. Die Seite zeigt, was man schon geschafft hat und was noch offen ist, und motiviert zu genauem, sorgfältigem Spielen (z. B. Missionen ohne Hinweis).

Wichtigste Elemente: ein Raster aus Achievement-Karten (Badges), jede mit Icon, Titel, kurzer Beschreibung und Zustand (erreicht / offen / geheim), eine Zähler-Zeile oben („7 of 20 unlocked"), sowie Filter/Sortierung (alle, erreicht, offen). Geheime Achievements (Band 6, Easter Eggs) erscheinen zunächst nur als „???"-Karte.

Layout in Worten: Links die Sidebar, oben ein Seitentitel und der Fortschrittszähler, in der Mitte das Karten-Raster (mehrere Karten pro Reihe, umbrechend je nach Bildschirmbreite). Erreichte Badges leuchten voll in Neon-Türkis/Magenta; offene sind ausgegraut mit dezenter Kontur; geheime zeigen ein Fragezeichen und einen vagen Teaser. Ein optionaler Fortschrittsbalken oben visualisiert die Sammelquote.

Interaktionen: Ein Klick oder Hover auf eine Karte öffnet Details – bei erreichten Badges Titel, Beschreibung und Datum/Mission des Erhalts; bei offenen die Bedingung (sofern kein Geheimnis); bei geheimen nur einen Hinweis („Something only the most attentive agents will find."). Wird ein Achievement neu freigeschaltet, erscheint an dieser Stelle beim nächsten Besuch ein „neu"-Marker, und die Karte hatte zuvor bereits ein Pop-up ausgelöst (Abschnitt 8). Ein Klick auf einen Filter blendet entsprechende Karten ein/aus.

Achievement-Beispiele (Vorschläge, Bedingungen final in Band 5): `Clear Signal – Complete a mission with no hints.` · `Lie Detector – Spot every fake in one mission.` · `Deepfake Buster – Correctly flag all altered images.` · `Backchannel Regular – Return and continue on a second day.` · geheim `??? – Notice the anomaly before anyone tells you.`

Englische Beispiel-Beschriftungen: Seitentitel `ACHIEVEMENTS`. Zähler `Unlocked: 7 / 20`. Filter `All · Unlocked · Locked`. Karten-Zustand offen `Locked`, erreicht `Unlocked`, geheim `???`.

## 8. Pop-ups und Animationen

Aufgabe des Bereichs: festlegen, wann und wie kurze Einblendungen und Bewegungen erscheinen. Ziel ist eine lebendige, „hackerhafte" Atmosphäre, die trotzdem ruhig genug bleibt, um das Lernen nicht zu stören. Grundregel: Animationen sind dezent, kurz und überspringbar; nichts blockiert dauerhaft, und alles funktioniert auch mit reduzierter Bewegung (siehe Abschnitt 10).

Arten von Pop-ups:
- Erfolgs-Pop-up: nach abgeschlossener Mission, mit erreichten Punkten, ggf. Sternebewertung und Freischalt-Hinweis. Türkis/Magenta, positiver Ton.
- Achievement-Pop-up: wenn ein Badge freigeschaltet wird, mit Icon und Titel, kurz und feierlich, dann automatisch ausblendend.
- Level-Up-Pop-up: beim Erreichen eines neuen Rangs (Abschnitt 6).
- Hinweis-Bestätigung: kleines modales Fenster vor jedem kostenpflichtigen Hinweis (`Reveal hint (−25 pts)?`) mit Ja/Nein.
- Story-Pop-up: für wichtige narrative Momente (z. B. ALGO greift ein), meist als Chat-Einblendung, bei Schlüsselszenen als größere Einblendung.
- Warn-/Fehler-Pop-up: sparsam, nur bei echten Problemen (Verbindung/Speichern), in Neon-Rot mit klarem Text.
- System-Nachfrage: z. B. „Mission verlassen? Fortschritt ist gespeichert."

Animationen:
- Glitch/Flacker: sparsam auf Überschriften und speziell bei ALGO-Nachrichten, um ihn unheimlich wirken zu lassen.
- Tipp-Animation: Dialogzeilen der Resistance und von ALGO bauen sich wie getippt auf; überspringbar per Klick.
- Seitenübergänge: sanftes Ein-/Ausblenden bzw. ein kurzer „Verbindungsaufbau"-Übergang zwischen großen Bereichen.
- Punkte-Zähler: hochlaufende Zahl mit kleinem `+X`/`−X` beim Ereignis (Abschnitt 6).
- Freischalt-Animation im Hub: Wechsel eines Missionsknotens von gesperrt zu verfügbar, Linie leuchtet auf.
- Feedback-Puls: kurzer türkiser Aufblitz bei richtig, kurzer roter Aufblitz mit leichtem Rütteln bei falsch.
- Hintergrund: leichtes, langsames Driften des Neon-Rasters/Datenstroms; nie hektisch.

Interaktionen: Pop-ups lassen sich schließen (X, `CONTINUE`-Button oder Klick daneben, außer bei echten Bestätigungen, die eine bewusste Wahl brauchen). Kein Pop-up erscheint mehrfach hintereinander; mehrere Belohnungen werden zu einer Abfolge gebündelt (erst Erfolg, dann Achievement, dann Level-Up), damit es nicht überfrachtet wirkt. Alle Sound-Effekte dieser Ereignisse folgen dem globalen Sound-Schalter.

Englische Beispiel-Beschriftungen: Erfolg `MISSION COMPLETE · +80 pts · Next mission unlocked`. Achievement `Achievement unlocked: Clear Signal`. Level-Up `Rank up: Analyst`. Fehler `Connection lost. Your progress is saved. Retrying…`. Bestätigungen `CONTINUE`, `Yes / No`.

## 9. Responsives Design

Aufgabe des Bereichs: sicherstellen, dass das Spiel auf den Geräten läuft, die im Unterricht realistisch vorkommen – vor allem Laptops und Tablets, mit Handy als sinnvoller Reserve. Da einzeln am eigenen Gerät gespielt wird (Band 1), muss die Bedienung auf jeder Größe zuverlässig funktionieren.

Ziel-Geräte und Priorität:
- Laptop/Desktop (Pflicht, primäres Layout): volle Ansicht mit dauerhafter Sidebar links und breitem Rätsel-Bereich.
- Tablet (Pflicht): Sidebar kann schmaler werden oder auf Icons schrumpfen; Rätsel-Bereich bleibt zentral; Bedienelemente sind groß genug für Touch.
- Handy (unterstützt, sekundär): einspaltiges Layout; die Sidebar wird zu einem einklappbaren Menü (Burger-Icon), Story- und Rätsel-Bereich stapeln sich untereinander.

Layout-Verhalten in Worten: Das Grundprinzip ist „stapeln statt quetschen". Auf breiten Bildschirmen liegen Sidebar, Story und Rätsel nebeneinander. Wird der Bildschirm schmaler, wandert zuerst die Sidebar in ein Symbol-/Burger-Menü, dann rücken Story-Streifen und Rätsel-Bereich untereinander. Der Missions-Pfad im Hub wird auf kleinen Geräten zu einer klaren vertikalen Liste. Schriftgrößen, Buttons und Abstände skalieren mit, sodass Text lesbar und Touch-Ziele groß genug bleiben (Mindestgrößen in Abschnitt 10). Aufwändige Effekte (starkes Glitchen, viele Hintergrund-Partikel) werden auf schwächeren Geräten automatisch reduziert.

Pflicht vs. optional: Pflicht sind lesbare Texte, bedienbare Rätsel, funktionierende Navigation, sichtbarer Punktestand und Speicherbarkeit auf Laptop und Tablet. Optional bzw. „nice to have" sind der geschwungene Missions-Pfad (darf zur Liste vereinfacht werden), aufwendige Partikel-/Glitch-Effekte und Sound. Kein Rätseltyp darf eine bestimmte Bildschirmgröße oder Maus zwingend voraussetzen; alternativ muss es eine Touch-taugliche Bedienung geben (z. B. Antippen statt Ziehen, oder große Zielflächen bei Zuordnungs-Rätseln).

Interaktionen: Auf Touch-Geräten ersetzen Tippen und einfache Wischgesten das Hovern; Hover-Tooltips (z. B. Vokabelhilfe) öffnen sich per Tipp. Das Burger-Menü öffnet die Navigation als Overlay; ein Tipp daneben schließt es wieder. Querformat wird auf Tablets bevorzugt empfohlen, Hochformat funktioniert aber ebenfalls.

Englische Beispiel-Beschriftungen: Burger-Menü-Label (für Screenreader) `Open menu`. Hinweis bei sehr kleinem Bildschirm (optional) `For the best experience, use a tablet or laptop.`

## 10. UI-/UX-Regeln

Aufgabe des Bereichs: die konkreten Design-Werte und Grundregeln bündeln, damit alle Seiten einheitlich aussehen und sich gleich bedienen lassen. Die Werte verfeinern die Vorschläge aus Band 1. Alle Hex-Werte und Namen sind Vorschläge und dürfen angepasst werden.

Farbpalette (Vorschlag):
- Hintergrund sehr dunkel: `#0A0E14` (fast schwarz, leicht bläulich) als Grundfläche.
- Hintergrund-Ebene 2 (Karten/Boxen): `#121826` (etwas heller, für abgesetzte Flächen).
- Neon-Türkis (Primär-Akzent, aktiv/positiv): `#00F5D4`.
- Magenta (Sekundär-Akzent, Highlights, ALGO-Kühle): `#FF2E97`.
- Neon-Rot (nur Warnung/Gefahr/Fehler): `#FF3B3B`.
- Erfolg/richtig (kann Türkis nutzen oder eigenes Grün): `#39FF14` (sparsam).
- Text primär: `#E6F1FF` (helles, leicht kühles Weiß) auf dunklem Grund.
- Text sekundär/gedämpft: `#7A8AA0`.
- Gesperrt/deaktiviert: `#3A4152` (entsättigt, matt).

Farbregeln für Zustände (wichtig, überall gleich):
- Aktiv/verfügbar: Neon-Türkis-Rahmen oder -Glow, voller Kontrast, ggf. leichte Puls-Animation beim aktuell wichtigsten Element.
- Erledigt/abgeschlossen: gedämpftes Türkis mit Häkchen; ruhig, weiterhin anklickbar.
- Gesperrt/deaktiviert: Farbe `#3A4152`, reduzierte Deckkraft, Schloss-Symbol, kein Hover-Glow, Cursor „nicht erlaubt".
- Warnung/Fehler/Gefahr: Neon-Rot, sparsam, immer mit klarem Text (nie nur Farbe).
- ALGO-Elemente: kühles Magenta/Weiß mit Glitch, deutlich anders als die freundlichen Resistance-Türkis-Elemente, damit Vertrauen und Misstrauen visuell trennbar sind.

Schrift (Vorschlag):
- Überschriften und ALGO-Nachrichten: eine markante Monospace-/Techno-Schrift, z. B. `Share Tech Mono`, `Space Mono` oder `JetBrains Mono` (frei/Open-Source). Für starke Glitch-Titel optional eine Display-Schrift wie `Orbitron`, aber sparsam.
- Fließtext/Aufgaben: eine sehr gut lesbare, technisch wirkende Sans-Serif, z. B. `Inter`, `IBM Plex Sans` oder `Rajdhani`. Lesbarkeit hat bei Aufgaben immer Vorrang vor Stil.
- Größen (Vorschlag): Fließtext mind. 16 px, Aufgabentexte eher 18 px, Überschriften klar größer (H1 ~32–40 px, H2 ~24–28 px). Zeilenhöhe für Fließtext ~1.5 für gute Lesbarkeit.

Abstände und Raster (Vorschlag):
- Ein einfaches 8-px-Raster: Abstände als Vielfache von 8 (8/16/24/32). Standard-Innenabstand von Karten/Boxen 24 px.
- Maximale Textbreite für Lesbarkeit begrenzen (ca. 70–75 Zeichen), damit lange B2-Texte nicht über die ganze Breite laufen.
- Klare visuelle Trennung zwischen Story-Streifen und Rätsel-Bereich (Abstand oder dünne Trennlinie in Türkis).

Buttons und ihre Zustände:
- Standard-Button: dunkle Fläche mit Türkis-Rahmen und türkisem Text; Ecken leicht abgerundet (Vorschlag 6–8 px Radius).
- Hover/Fokus: verstärkter Neon-Glow, minimal heller; deutlicher Fokus-Rahmen für Tastatur-Bedienung.
- Aktiv/gedrückt: kurz eingedrückt/heller Aufblitz.
- Deaktiviert: gedämpft `#3A4152`, kein Glow, Cursor „nicht erlaubt", nicht klickbar (z. B. Submit ohne Antwort, Hinweis wenn keine Punkte).
- Gefahr-/Warn-Button (selten): Neon-Roter Rahmen.
- Touch-Ziele mindestens ca. 44×44 px groß (Tablet/Handy).

Bedienbarkeits- und Konsistenz-Grundregeln:
- Feedback ist immer sofort und klar: richtig/falsch, Punkte rauf/runter, was als Nächstes zu tun ist.
- Farbe nie als einziges Signal: Zustände immer zusätzlich durch Symbol/Text kennzeichnen (Schloss, Häkchen, Warntext), auch wegen Farbfehlsichtigkeit.
- Kontrast beachten: heller Text auf sehr dunklem Grund, damit lange Lesetexte nicht anstrengen; reines Neon nicht für Fließtext verwenden.
- Sound ist überall global abschaltbar; der Schalterzustand gilt für die ganze Sitzung.
- „Reduzierte Bewegung" respektieren: Wenn das Gerät weniger Animation wünscht (System-Einstellung) oder in einem Ruhe-Modus, werden Glitch- und Flacker-Effekte deutlich reduziert.
- Tastatur-Bedienbarkeit: alle Buttons und Rätsel-Antworten sind mit Tab erreichbar und haben einen sichtbaren Fokus-Rahmen.
- Einheitliche Sprache: alle UI-Texte in British English, B2; Eigennamen exakt wie in Band 6 (PULSE, ALGO, the Resistance, the Feed, the Core, the Backchannel).
- Speichern läuft unsichtbar im Hintergrund nach jedem Rätsel; nur bei Problemen erscheint ein Warn-Pop-up. Die Speicherlogik selbst steht in Band 5.
- Konsistenz vor Kreativität: gleiche Elemente sehen überall gleich aus (ein Hinweis-Button, ein Submit-Button, eine Art Pop-up), damit die Bedienung nach der ersten Mission sitzt.
