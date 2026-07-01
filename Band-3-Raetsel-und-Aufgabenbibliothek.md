# Band 3 – Rätsel- und Aufgabenbibliothek

Zweck dieses Bandes: eine Sammlung aller Spielmechaniken, unabhängig von der einzelnen Mission. So lassen sich Rätsel später austauschen, ohne die Story zu ändern. Eine Mission (Band 2) verweist einfach auf einen Rätseltyp aus dieser Bibliothek.

Für jeden Rätseltyp beschreibt dieser Band: Was ist die Idee? Wie wird es bedient? Welche Lernziele passen dazu (Medienkompetenz und Englisch)? Ein konkretes Beispiel mit englischem B2-Beispieltext. Zu welchen Missionen es besonders passt. Technische Hinweise (Verweis auf Band 5). Und wie das dreistufige Hinweissystem hier greift.

Zwei Grundregeln gelten für alle Rätseltypen. Erstens das Engine-Prinzip: Jeder Typ ist ein wiederverwendbarer Baustein. Missionen (Band 2) rufen einen Baustein auf und füllen ihn mit ihren Inhalten, statt eine neue Mechanik zu bauen. Zweitens das gestufte Hinweissystem (Band 1, Abschnitt 8): Zu jedem Rätsel gibt es drei Hinweisstufen. Stufe 1 ist ein leiser Denkanstoß, Stufe 2 eine konkretere Hilfe, Stufe 3 nennt die Lösung oder einen sehr großen Teil davon. Jede Stufe kostet Punkte, die technische Logik dazu steht in Band 5. Alle englischen Beispieltexte sind auf B2-Niveau in British English und, wo frei erfunden, als (Vorschlag) markiert.

## 1. Drag-and-Drop-Rätsel

Idee: Der Spieler ordnet Elemente durch Ziehen und Ablegen in die richtige Reihenfolge, in Kategorien oder auf Zielfelder. Dieser Typ eignet sich überall dort, wo etwas sortiert, zugeordnet oder rekonstruiert werden muss. Er ist visuell, schnell erfassbar und funktioniert gut als Einstieg in eine Mission.

Bedienung: Der Spieler greift ein Kärtchen (Text, Bild oder Symbol) mit der Maus oder per Touch, zieht es an die gewünschte Stelle und lässt es los. Zielzonen leuchten beim Überfahren neon auf. Ein Klick auf „Confirm" prüft die Anordnung. Falsch platzierte Elemente werden kurz rot markiert und springen zurück, richtige rasten mit einem Signalton ein.

Passende Lernziele: Medienkompetenz – Abläufe verstehen (etwa wie ein Algorithmus Inhalte auswählt und gewichtet) oder Merkmale kategorisieren (echt/gefälscht, sicher/riskant). Englisch – Wortschatz zuordnen, Kollokationen bilden, Satzteile zu korrekten Sätzen ordnen (Syntax), Reihenfolgen mit Signalwörtern erfassen (first, then, finally).

Konkretes Beispiel (Vorschlag): „ALGO's Recipe. Drag the five steps into the order the algorithm actually follows to fill your feed." Karten: „Track what you watch and how long", „Guess what will keep you scrolling", „Rank posts by predicted attention", „Show the most addictive posts first", „Learn from your reaction and repeat." Der Spieler stellt die Endlosschleife her; die letzte Karte macht sichtbar, dass es ein Kreislauf ist.

Passende Missionen (Band 2): besonders Mission 1 (Algorithm) zum Rekonstruieren der Empfehlungslogik; außerdem Mission 6 (Digital Footprint) zum Sortieren von Datenspuren nach Risiko und Mission 4 (Echo Chambers) zum Zuordnen von Inhalten zu Filterblasen.

Technische Hinweise: Standardisierte Drag-and-Drop-Komponente mit definierten Karten- und Zielobjekten, Snap-Verhalten und Zustandsprüfung. Muss auch per Touch und per Tastatur bedienbar sein (Barrierefreiheit). Details zur Komponente und zur Antwortprüfung stehen in Band 5.

Hinweis-Möglichkeiten: Stufe 1 hebt die erste korrekte Karte dezent hervor („Start with what ALGO collects before it can do anything else."). Stufe 2 fixiert zwei bereits richtig liegende Karten. Stufe 3 ordnet alle Karten bis auf eine und lässt den Spieler den letzten Schritt selbst setzen.

## 2. Escape-Rätsel

Idee: Ein klassisches „Ausbruch"-Rätsel im digitalen Raum. Der Spieler muss aus einer gesperrten Umgebung heraus (etwa einem gekaperten Account, einer verschlüsselten Kammer im Core), indem er mehrere kleinere Rätsel nacheinander löst, die Hinweise für ein Schloss liefern. Dieser Typ verbindet mehrere Mechaniken zu einer kleinen Kette und erzeugt Thriller-Spannung, oft mit sichtbarem Countdown.

Bedienung: Der Spieler untersucht eine Szene, klickt auf interaktive Objekte (ein gesperrtes Fenster, eine Notiz, ein Terminal), sammelt Fund­stücke in einem Inventar und kombiniert sie. Am Ende gibt er einen Code oder ein Passwort ein, um „auszubrechen". Ein optionaler Timer erhöht den Druck, blockiert aber nie dauerhaft (Band 5 regelt, dass ablaufende Zeit nur Punkte kostet, nicht den Fortschritt).

Passende Lernziele: Medienkompetenz – mehrere Indizien verknüpfen, aus Teilinformationen ein Gesamtbild bauen, unter Zeitdruck ruhig prüfen statt raten. Englisch – detailliertes Leseverstehen (Hinweise stecken in englischen Notizen und Systemmeldungen), Anweisungen verstehen und ausführen, themenbezogenes Vokabular im Kontext.

Konkretes Beispiel (Vorschlag): „Locked Out. ALGO has frozen your account. Read the three system logs, find the recovery word hidden in them, and type it to break out." Log 1: „Access denied. Too many honest questions detected." Log 2: „Reminder: users who verify facts are marked as unstable." Log 3: „Recovery hint: the thing ALGO fears is the first letter of each warning above." Lösung: das Wort ergibt sich aus Anfangsbuchstaben (Vorschlag: „TRUTH"), das der Spieler ins Recovery-Feld tippt.

Passende Missionen: besonders Mission 10 (Final Boss) im Core als große Rätselkette; als kompakte Variante auch als Einstieg oder Finale einzelner Missionen, etwa Mission 8 (Privacy), wenn ein Account gesichert werden muss.

Technische Hinweise: Szenen-Container mit anklickbaren Hotspots, Inventar-System, Kombinationslogik und einem Code-Schloss als Abschluss. Optionaler Countdown als Punktemodifikator, nicht als harte Sperre. Speicherung des Zwischenstands nötig (Band 5), da Escape-Rätsel länger dauern.

Hinweis-Möglichkeiten: Stufe 1 lenkt den Blick auf das nächste relevante Objekt („One of the logs tells you where to look next."). Stufe 2 erklärt, wie die gefundenen Teile zusammengehören („Take the first letter of each warning."). Stufe 3 nennt die Lösung bzw. den Code direkt.

## 3. Logikrätsel

Idee: Reine Denkaufgaben, bei denen der Spieler durch logisches Schließen, Ausschlussverfahren oder Mustererkennung zu einer eindeutigen Antwort kommt. Dazu gehören Gitterrätsel (wer/was gehört zusammen), Zahlen- und Symbolfolgen, Wahr/Falsch-Ketten und Bedingungslogik. Sie schulen genaues, systematisches Denken – die Grundhaltung gegen vorschnelles Glauben.

Bedienung: Je nach Untertyp füllt der Spieler ein Raster aus (Häkchen/Kreuze setzen), wählt aus mehreren Optionen, ergänzt eine Folge oder verknüpft Aussagen. Eingaben werden bei „Check" geprüft; bei Gitterrätseln kann eine laufende Konsistenzprüfung frühe Widersprüche markieren (optional, Band 5).

Passende Lernziele: Medienkompetenz – Argumente auf Konsistenz prüfen, Behauptungen gegeneinander abwägen, manipulative Scheinlogik entlarven. Englisch – konditionale und logische Sprachmittel verstehen und anwenden (if … then, unless, because, therefore, whereas), präzises Leseverstehen von Bedingungen.

Konkretes Beispiel (Vorschlag): „Who is telling the truth? Three accounts posted about the same event. Only one is reliable. Use the clues to decide." Clues: „If an account shares a source, it is usually reliable." „The account posting in all caps shares no source." „Exactly one account both stays calm and links a source." Aussagen dreier Accounts sind gegeben; der Spieler markiert den verlässlichen. Die Lösung folgt eindeutig aus den Bedingungen.

Passende Missionen: besonders Mission 2 (Fake News) zum Abwägen von Glaubwürdigkeit; außerdem Mission 4 (Echo Chambers) für Bedingungslogik zu Filterblasen und als kurze Denkpause in jeder Mission.

Technische Hinweise: Vorlagen für Gitterrätsel, Multiple-Choice und Folgen. Für Gitter eine Lösungs- und Konsistenzprüfung. Klare Trennung von Aufgabendaten und Anzeige, damit Missionen eigene Logikrätsel einspeisen können (Band 5).

Hinweis-Möglichkeiten: Stufe 1 zeigt, welche Regel man zuerst anwenden sollte („Start with the clue about the source."). Stufe 2 markiert eine sicher ausschließbare Option. Stufe 3 nennt die richtige Antwort mit einer Ein-Satz-Begründung.

## 4. Bild- und Videoanalyse

Idee: Der Spieler untersucht ein Bild oder ein kurzes Video und entscheidet, ob und wie es manipuliert wurde. Er markiert verdächtige Stellen, vergleicht Original und Fälschung oder benennt Manipulationstechniken. Kern der Medienkompetenz: nichts glauben, nur weil man es sieht.

Bedienung: Der Spieler kann zoomen, ein Bild mit einem Zweit­bild überblenden (Slider), verdächtige Bereiche mit einem Rahmen markieren („Tag the fake") oder aus einer Liste die passende Manipulationsart wählen. Bei Videos gibt es Play/Pause und Einzelbild-Schritte. Nach „Analyse abschließen" folgt sofortiges Feedback, welche Auffälligkeiten korrekt erkannt wurden.

Passende Lernziele: Medienkompetenz – manipulierte Bilder und Deepfakes erkennen (Artefakte, unstimmiges Licht, seltsame Ränder, unnatürliche Bewegung), Manipulationsarten benennen, Quellen hinterfragen. Englisch – Fachvokabular der Bildanalyse (edited, cropped, staged, misleading caption, deepfake, artefact), präzise Beschreibungen auf Englisch verstehen und formulieren.

Konkretes Beispiel (Vorschlag): „Spot the deepfake. This clip shows a well-known figure saying something shocking. Mark two signs that the video is not real." Der Spieler markiert etwa unnatürliches Blinzeln und einen flackernden Mundrand und wählt aus einer Liste: „lip movement does not match the audio". Feedback erklärt kurz jeden echten Fund.

Passende Missionen: besonders Mission 3 (Deepfakes) und Mission 2 (Fake News, manipulierte Bilder). Auch als Baustein in Mission 5 (Influencer), wenn geschönte oder inszenierte Bilder entlarvt werden.

Technische Hinweise: Bildbetrachter mit Zoom, Overlay-Slider und markierbaren Zonen (Hotspot-Koordinaten für die Auswertung). Video-Player mit Einzelbild-Steuerung. Medien komprimiert und barrierefrei (Alternativtext, Untertitel), damit die Analyse fair bleibt (Band 5, auch Barrierefreiheit).

Hinweis-Möglichkeiten: Stufe 1 grenzt den Bereich ein („Look closely at the face, especially the eyes and mouth."). Stufe 2 nennt die Art der Auffälligkeit, ohne die genaue Stelle zu verraten. Stufe 3 markiert die verdächtigen Zonen selbst und benennt die Technik.

## 5. Fake-Chat-Simulationen

Idee: Der Spieler nimmt an einem simulierten Chat teil – mit ALGO, einem manipulativen „Freund", einem Fake-Support oder einem Betrüger. Er muss erkennen, wann er manipuliert wird, und angemessen reagieren. Der Chat läuft in vertrauter Messenger-Optik und wirkt dadurch realistisch.

Bedienung: Nachrichten erscheinen mit Tipp-Animation nacheinander. Der Spieler antwortet, indem er aus vorgegebenen Antwortoptionen wählt (Multiple-Choice-Dialog) oder in offenen Varianten kurze eigene Antworten tippt (Band 5 prüft Schlüsselwörter). Jede Wahl verzweigt den Verlauf leicht; riskante Antworten zeigen sofort die Folge (etwa preisgegebene Daten), sichere Antworten führen weiter.

Passende Lernziele: Medienkompetenz – Manipulationsmuster im Gespräch erkennen (Dringlichkeit, Schmeichelei, Druck, falsche Autorität), Grenzen setzen, keine sensiblen Daten preisgeben, auf Cyberbullying angemessen reagieren und Hilfe benennen. Englisch – dialogisches Sprachhandeln, höfliches und bestimmtes Ablehnen (No, thanks. / I'd rather not share that.), Register erkennen, Redewendungen im Chat verstehen.

Konkretes Beispiel (Vorschlag): ALGO schreibt: „Hi Agent. I noticed you seem tired. I can unlock a special feed just for you — I only need your location to make it perfect." Antwortoptionen: (a) „Sure, here it is." (b) „Why do you need my exact location?" (c) „No. I don't share my location." Wählt der Spieler (a), zeigt der Chat, wie ALGO die Daten sofort nutzt; (b) und (c) werden gelobt und decken den Trick auf.

Passende Missionen: besonders Mission 7 (Cyberbullying), Mission 8 (Privacy) und Mission 5 (Influencer); ALGO selbst nutzt diesen Baustein in fast jeder Mission für kurze manipulative Zwischenrufe.

Technische Hinweise: Chat-Komponente mit Nachrichten-Warteschlange, Tipp-Indikator, Antwortoptionen und einfacher Verzweigungslogik (Dialogbaum). Optional Schlüsselwort-Auswertung für freie Eingaben. Zwei klar getrennte Stimmen (ALGO höflich-glatt, Resistance locker), siehe Band 6. Details in Band 5.

Hinweis-Möglichkeiten: Stufe 1 richtet die Aufmerksamkeit auf die Absicht hinter der Nachricht („What does ALGO actually want from you here?"). Stufe 2 schließt eine klar falsche Antwortoption sichtbar aus. Stufe 3 empfiehlt die sichere Antwort und begründet sie kurz.

## 6. Social-Media-Feeds

Idee: Der Spieler bekommt einen realistisch gestalteten Feed voller Posts und muss darin gezielt handeln: Fake News herausfiltern, gesponserte Inhalte erkennen, manipulative Muster markieren oder den Feed nach Glaubwürdigkeit sortieren. Der Feed ist die Kernumgebung von PULSE und damit der authentischste Schauplatz.

Bedienung: Der Spieler scrollt durch die Posts wie in einer echten App. Je nach Aufgabe tippt er auf einen Post, um ihn zu „flaggen", vergibt Bewertungen (reliable/unreliable), blendet Posts aus oder öffnet Detailansichten mit Quelle und Kommentaren. Ein Aufgaben-Banner oben nennt das Ziel („Flag every misleading post."). „Submit" wertet aus.

Passende Lernziele: Medienkompetenz – Fake News und Clickbait erkennen, Werbung von Inhalt unterscheiden (Sponsored/#ad), Echokammern und emotionale Trigger durchschauen, den eigenen Feed kritisch lesen. Englisch – überfliegendes und selektives Leseverstehen (skimming/scanning), Schlagzeilen- und Werbesprache verstehen, Nuancen zwischen sachlich und reißerisch erkennen.

Konkretes Beispiel (Vorschlag): Aufgaben-Banner: „Your feed is flooded. Flag the three posts designed to make you angry rather than inform you." Beispiel-Post: „SHOCKING: They don't want YOU to know this ONE truth — share before it's deleted!!!" Weitere Posts mischen sachliche Meldungen mit Clickbait und einem als „Sponsored" markierten Beitrag. Der Spieler flaggt die Wut-Trigger; Feedback erklärt die Merkmale (all caps, urgency, no source).

Passende Missionen: besonders Mission 2 (Fake News), Mission 4 (Echo Chambers) und Mission 5 (Influencer); als Grundkulisse passt der Feed praktisch überall und eröffnet oft eine Mission.

Technische Hinweise: Feed-Komponente mit wiederverwendbaren Post-Karten (Autor, Text, Bild, Badge für Sponsored, Kommentaranzahl), Flag-/Bewertungs-Interaktion und Auswertung markierter Posts. Inhalte als austauschbare Datensätze, damit Missionen eigene Feeds bestücken (Band 5).

Hinweis-Möglichkeiten: Stufe 1 nennt die Merkmale, auf die man achten soll („Watch for capital letters and urgent wording."). Stufe 2 grenzt den Bereich ein („Two of the three are near the top."). Stufe 3 markiert die gesuchten Posts direkt.

## 7. Investigation Boards

Idee: Ein digitales Ermittler-Board („Pinnwand mit Fäden"): Hinweise, Screenshots, Profile und Notizen liegen verteilt, und der Spieler verbindet zusammengehörige Elemente mit Linien, um einen verborgenen Zusammenhang aufzudecken – etwa wer hinter einer Fake-Kampagne steckt oder wie Daten von A nach B fließen. Dieser Typ belohnt vernetztes Denken über mehrere Informationen hinweg.

Bedienung: Der Spieler zieht Karten auf der Fläche zurecht und zieht Verbindungslinien zwischen zusammengehörigen Karten (Klick auf Karte A, dann auf Karte B). Er kann Karten öffnen, um Details zu lesen. Sind alle richtigen Verbindungen gesetzt (und keine falschen), schaltet „Reveal" das Ergebnis frei.

Passende Lernziele: Medienkompetenz – Quellen und Akteure verknüpfen, Muster hinter verstreuten Informationen erkennen, Behauptung von Beleg trennen, digitale Spuren nachverfolgen. Englisch – Informationen aus mehreren kurzen Texten entnehmen und in Beziehung setzen (Leseverstehen über Textgrenzen hinweg), Fachvokabular (source, evidence, link, pattern, motive).

Konkretes Beispiel (Vorschlag): „The Campaign. Six accounts spread the same false story. Connect the ones that are actually the same person behind different names. Use the clues on each card." Karten zeigen etwa gleiche Schreibfehler, identische Posting-Zeiten und dasselbe Profilbild leicht bearbeitet. Der Spieler verbindet die drei zusammengehörigen Accounts; „Reveal" zeigt: eine Person, drei Fake-Profile.

Passende Missionen: besonders Mission 2 (Fake News) und Mission 6 (Digital Footprint) zum Nachverfolgen von Datenspuren; als Zwischenschritt auch in Mission 10 (Final Boss), um ALGOs Netz sichtbar zu machen.

Technische Hinweise: Board-Fläche mit frei platzierbaren Karten, Verbindungslinien (gültige Kantenpaare hinterlegt) und Auswertung von richtigen/falschen Verbindungen. Karten mit ausklappbaren Details. Zoom/Verschieben der Fläche, auch für Touch. Details in Band 5.

Hinweis-Möglichkeiten: Stufe 1 nennt das Verbindungsprinzip („Look for accounts that make the same spelling mistake."). Stufe 2 hebt zwei sicher zusammengehörige Karten hervor. Stufe 3 zeigt eine korrekte Verbindung fertig gezogen und lässt den Rest offen.

## 8. Audio- und Listening-Aufgaben

Idee: Der Spieler hört einen englischen Audioclip – eine abgefangene Sprachnachricht, einen Podcast-Ausschnitt, eine ALGO-Durchsage oder ein manipuliertes „Voice-Deepfake" – und beantwortet Fragen dazu oder erkennt Auffälligkeiten. Dieser Typ trainiert gezielt das Hörverstehen und passt zum Thriller (abgehörte Kanäle, geheime Botschaften).

Bedienung: Der Spieler startet den Clip (Play/Pause, begrenzte Anzahl an Wiederholungen als Punktefaktor möglich) und beantwortet parallel Fragen: Multiple-Choice, Lückentext zum Mithören (gap-fill) oder Wahr/Falsch. Bei Deepfake-Audio markiert er die Stelle, an der die Stimme unnatürlich wirkt. Untertitel sind auf Wunsch zuschaltbar (Barrierefreiheit), reduzieren aber ggf. die Punkte.

Passende Lernziele: Medienkompetenz – auch gefälschte Audios kritisch prüfen (Voice Cloning), Kernaussage von Nebensache trennen, Tonfall als Manipulationsmittel erkennen. Englisch – Hörverstehen auf B2 (Hauptaussagen, Details, Stimmung), Umgang mit natürlichem Sprechtempo und Aussprache, gehörtes Vokabular sichern (gap-fill).

Konkretes Beispiel (Vorschlag): „Intercepted message. Listen to this recording from the Backchannel and answer the questions." Transkript-Auszug (nur als Referenz, nicht sichtbar): „Agent, don't log in tonight. ALGO changed the login screen to capture your recovery code. Wait for our signal." Fragen: „What should the agent NOT do tonight?" / Gap-fill: „ALGO changed the ______ screen." / „Who will send a signal?" Der Spieler beantwortet nach dem Hören.

Passende Missionen: besonders Mission 3 (Deepfakes) für Voice-Fakes und Mission 8 (Privacy); als Story-Träger überall dort, wo die Resistance über den Backchannel spricht, und als bewusster Hörverstehens-Block in der Doppelstunde.

Technische Hinweise: Audio-Player mit Play/Pause, optionaler Wiederholungsbegrenzung und zuschaltbaren Untertiteln/Transkript. Fragetypen (MC, Gap-fill, True/False) als wiederverwendbare Auswertungsbausteine. Audiodateien komprimiert und im Klassenraum per Kopfhörer nutzbar; Sound abschaltbar (Band 1/5).

Hinweis-Möglichkeiten: Stufe 1 nennt, worauf beim nächsten Hören zu achten ist („Listen for what the agent must avoid."). Stufe 2 gibt die Antwort auf die schwerste Teilfrage vor oder liefert das Transkript des kritischen Satzes. Stufe 3 blendet das vollständige Transkript ein und markiert die Antwortstellen.

## 9. Final-Code-Systeme

Idee: Ein Abschluss-Mechanismus, der eine Mission (oder das ganze Spiel) krönt: Der Spieler muss aus zuvor gelösten Teilrätseln einen finalen Code, ein Passwort oder eine Sequenz zusammensetzen und eingeben, um etwas freizuschalten – eine Tür im Core, einen entsperrten Account, ALGOs Abschaltung. Final-Code-Systeme bündeln, was vorher erarbeitet wurde, und erzeugen ein starkes Erfolgserlebnis.

Bedienung: Der Spieler sammelt über die Mission hinweg Code-Fragmente (Zahlen, Buchstaben, Symbole), die einzelne Rätsel als Belohnung ausgeben. Am Ende trägt er sie in ein Eingabefeld, ein Ziffernschloss oder eine Reihenfolge-Maske ein und bestätigt. Richtige Eingabe löst eine Erfolgs-Sequenz aus (Animation, Sound, Story-Fortschritt); falsche Eingabe gibt gezieltes Feedback, welcher Teil noch nicht stimmt.

Passende Lernziele: Medienkompetenz – Teilergebnisse zu einer Gesamtlösung zusammenführen, Sorgfalt und Genauigkeit, das große Ganze im Blick behalten. Englisch – Anweisungen zur Code-Bildung genau lesen und ausführen, Zahlen/Buchstaben auf Englisch verarbeiten, ggf. eine kurze englische Passphrase korrekt bilden (Rechtschreibung, Wortstellung).

Konkretes Beispiel (Vorschlag): „Shutdown sequence. Each mission gave you one word. Enter them in the right order to expose ALGO." Gesammelte Wörter (Vorschlag): SEE / THROUGH / THE / FEED. Der Spieler tippt die Passphrase „See through the feed" (der Leitsatz aus Band 1) ins Core-Terminal; bei korrekter Eingabe startet das Enden-System (Band 6, Abschnitt 10).

Passende Missionen: das Herzstück von Mission 10 (Final Boss); in kleiner Form auch als Abschluss einzelner Missionen, wenn mehrere Teilrätsel zu einem Missions-Code führen.

Technische Hinweise: Sammel-/Inventarlogik für Code-Fragmente über eine Mission oder das ganze Spiel hinweg (enge Kopplung an das Speichersystem, Band 5), plus eine Eingabe-/Prüfkomponente (Feld, Ziffernschloss oder Sequenz). Teil-Feedback statt reinem Richtig/Falsch. Anbindung an das Enden-System bei der Schlussmission.

Hinweis-Möglichkeiten: Stufe 1 erinnert daran, wo die Fragmente herkommen („Each solved puzzle handed you one piece — check your inventory."). Stufe 2 gibt die richtige Reihenfolge oder das Bildungsprinzip vor. Stufe 3 nennt den Code bzw. die Passphrase vollständig.

## 10. Alternative Rätselvarianten

Dieser Abschnitt beschreibt Varianten und Mischformen der bisherigen Bausteine sowie Differenzierung nach oben und unten. Ziel ist, mit wenigen Grundmechaniken viele unterschiedliche Aufgaben zu bauen und jede Lerngruppe passend zu fordern.

Mischformen und Varianten: Die Bausteine lassen sich kombinieren. Ein Feed (6), in dem verdächtige Posts nicht nur geflaggt, sondern per Drag-and-Drop (1) in „reliable/unreliable/sponsored" einsortiert werden. Ein Escape-Rätsel (2), dessen letztes Schloss ein Final-Code-System (9) ist. Ein Investigation Board (7), das erst freigeschaltet wird, nachdem eine Audio-Aufgabe (8) den entscheidenden Hinweis geliefert hat. Eine Bildanalyse (4), deren Ergebnis in einer Fake-Chat-Simulation (5) angewandt werden muss, wenn ALGO das manipulierte Bild als „echt" verkaufen will. Weitere kleine Formate als Vorschlag: Hotspot-Suche (verdächtige Details in einem statischen Screenshot antippen), Zeitleisten-Ordnen (Ereignisse einer Fake-Kampagne chronologisch sortieren, eng verwandt mit Typ 1), Vokabel-Matching (englische Begriffe und Definitionen paaren, ideal als Aufwärmer) und Highlight-im-Text (in einem englischen Artikel manipulative Formulierungen markieren, verwandt mit Typ 4 und 6).

Differenzierung leichter (Vorschlag): weniger Elemente (etwa vier statt acht Posts), Multiple-Choice statt freier Eingabe, deutlichere Merkmale, unbegrenzte Audio-Wiederholungen, dauerhaft sichtbare Untertitel, ein kostenloser erster Hinweis, kein oder ein sehr großzügiger Timer, kürzere englische Texte mit einfacherem Vokabular und mehr Tooltips für Fachbegriffe.

Differenzierung schwerer (Vorschlag): mehr und ähnlichere Ablenker (schwerer zu unterscheiden), freie statt vorgegebener Antworten, knapper Timer mit stärkerem Punktebonus, begrenzte Audio-Wiederholungen ohne Untertitel, längere und dichtere englische Texte, mehrstufige Ketten (mehr Teilrätsel bis zum Final-Code) und ein Bonusziel für fehlerfreies Lösen (Achievement, Band 1, Abschnitt 8).

Steuerung über die Engine: Weil alle Varianten dieselben Grundbausteine nutzen, lässt sich die Schwierigkeit über Parameter regeln (Anzahl Elemente, Timer an/aus, Antwortmodus, Hinweiskosten, Untertitel) statt über neue Programmierung. Wie diese Parameter gesetzt und pro Mission oder pro Lerngruppe gespeichert werden, steht in Band 5; welche Einstellung zu welcher Mission empfohlen wird, ergänzt Band 2.
