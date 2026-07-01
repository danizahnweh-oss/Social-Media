# Handoff-Paket – Social Media Escape Game

Dieses Paket enthält alles, was ein Coding-Agent (Claude Code, Codex) oder eine Entwicklerin braucht, um das Spiel zu bauen. Der Spielinhalt und die Assets sind fertig; gebaut werden muss nur noch der Programmcode (HTML/CSS/JS).

## Was hier drin ist

- `BUILD.md` — die Bau-Anleitung. Hier anfangen. Beschreibt Technik, Datenmodell, alle neun interaktiven Rätseltypen, Kern-Verhalten und Fertig-Kriterien.
- `data/config.json` — globale Einstellungen (Punktegrenzen der Enden, Hinweiskosten, Ränge, Leaderboard an/aus).
- `data/achievements.json` — die Erfolge.
- `data/missions/01…10.json` — die zehn Missionen als fertige Daten, mit visuellen/interaktiven Rätseln (Hotspot, Fake-Chat, Feed-Markierung, Sortieren, Kategorisieren, Audio, Auswahl, Texteingabe).
- `assets/img/` — Logo, Neon-Hintergrund, 10 Missions-Icons, 6 Avatare, Rätsel-Grafiken (SVG).
- `assets/audio/` — Sound-Effekte und ein Hintergrund-Loop (WAV).

## Wichtig

- Die Grafiken und Töne sind stilisierte Platzhalter im Neon-Look. Sie lassen sich später durch bessere Assets ersetzen, ohne den Code zu ändern (gleiche Dateinamen behalten). Fotorealistische Bilder oder echte Sprachaufnahmen sind bewusst nicht enthalten; jedes Rätsel ist allein aus den Texten lösbar.
- Die ausführlichen Design-Grundlagen stehen in den acht Bänden im übergeordneten Projektordner. Bei Detailfragen dort nachschlagen (Optik: Band 4, Technik: Band 5, Welt/Ton: Band 6, Rätselinhalte: Band 2).

## So gibst du es weiter

Öffne den Coding-Agenten im Ordner `Social Media Escape Game` und gib als Auftrag sinngemäß: „Baue das Spiel gemäß `handoff/BUILD.md`. Nutze die vorhandenen Dateien in `handoff/data/` und `handoff/assets/` unverändert. Erzeuge `index.html`, `css/style.css` und die JS-Dateien."
