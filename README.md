# Social Media Escape Game — Projektdokumentation

Dies ist die zentrale Dokumentation des Projekts. Sie ist aufgebaut wie ein professionelles Game Design Document (GDD) und in acht Bände aufgeteilt. Jeder Band ist eine eigene Datei und kann unabhängig ergänzt werden, ohne dass das Gesamtkonzept umgebaut werden muss.

## Grundidee: eine modulare Lernspiel-Engine

Das Projekt ist nicht als einzelner Escape Room angelegt, sondern als modulare Lernspiel-Engine. Der Kern bleibt immer gleich. Nur die Missionen (die Themen) werden ausgetauscht.

Was zum festen Kern gehört:

- Punktesystem und Fortschritt
- Story-Rahmen und Dialogsystem
- Freischaltungen (welche Mission ist wann verfügbar)
- Mission Hub (die Zentrale, von der aus man Missionen startet)
- Achievement-Logik und Hint-System

Was austauschbar ist (die Module):

- Die einzelnen Missionen mit ihren Rätseln, Texten und Lösungen

Der Vorteil: Wenn die Engine einmal steht, lässt sich praktisch jedes Thema als neues Spiel einsetzen, zum Beispiel Artificial Intelligence, Climate Change, Crime and Punishment, South Africa, Globalisation oder The USA. Man muss nicht jedes Mal ein komplett neues Spiel bauen, sondern nur ein neues Missions-Set schreiben.

Diese Trennung zieht sich durch die ganze Dokumentation. Alles, was "Kern" ist, steht vor allem in Band 5 (Technik) und Band 1 (Vision). Alles, was "Modul" ist, steht in Band 2 (Mission Design) und Band 3 (Rätselbibliothek).

## Die acht Bände im Überblick

| Band | Titel | Zweck | Kern oder Modul |
|------|-------|-------|-----------------|
| 1 | Vision & Game Design | Was ist das Spiel überhaupt? | Kern |
| 2 | Mission Design | Jede Mission vollständig beschrieben | Modul |
| 3 | Rätsel- und Aufgabenbibliothek | Sammlung aller Spielmechaniken | Modul |
| 4 | Website & UX Design | Wie sieht jede Seite aus? | Kern |
| 5 | Technische Dokumentation | Direkt programmierbar (Engine) | Kern |
| 6 | Story Bible | Die Spielwelt konsistent halten | Kern |
| 7 | Lehrerhandbuch | Durchführung im Unterricht | — |
| 8 | Erweiterungen & DLC | Wiederverwendbarkeit, neue Themen | — |

## Dateien

- [Band 1 – Vision & Game Design](Band-1-Vision-und-Game-Design.md)
- [Band 2 – Mission Design](Band-2-Mission-Design.md)
- [Band 3 – Rätsel- und Aufgabenbibliothek](Band-3-Raetsel-und-Aufgabenbibliothek.md)
- [Band 4 – Website & UX Design](Band-4-Website-und-UX-Design.md)
- [Band 5 – Technische Dokumentation](Band-5-Technische-Dokumentation.md)
- [Band 6 – Story Bible](Band-6-Story-Bible.md)
- [Band 7 – Lehrerhandbuch](Band-7-Lehrerhandbuch.md)
- [Band 8 – Erweiterungen & DLC](Band-8-Erweiterungen-und-DLC.md)

## Status

Alle acht Bände sind ausgearbeitet und inhaltlich gefüllt. Band 1 (Vision) und Band 6 (Story Bible) legen die Grundlagen fest; darauf aufbauend wurden Band 2 (Missionen), Band 3 (Rätsel), Band 4 (UX), Band 5 (Technik), Band 7 (Lehrerhandbuch) und Band 8 (Erweiterungen) erstellt. Frei erfundene Details sind überall mit „(Vorschlag)" markiert und können angepasst werden.

## Wie man weiterarbeitet

Am besten ein Band nach dem anderen ausfüllen. Sinnvolle Reihenfolge für den Anfang:

1. Band 1 (Vision) — damit die Richtung klar ist
2. Band 6 (Story Bible) — damit die Welt konsistent bleibt
3. Band 5 (Technik/Engine) — damit der Kern steht
4. Danach Band 2 und 3 (die austauschbaren Module)
