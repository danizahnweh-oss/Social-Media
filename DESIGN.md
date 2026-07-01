# Design

## Summary

PULSE Resistance is a dark, cyberpunk product UI for a classroom escape game. The interface should feel like a live backchannel, not a school worksheet: sharp panels, readable mission text, neon feedback, visible state, and game-like progression.

## Palette

- Background: `#0A0E14`
- Secondary background: `#0E1420`
- Panel: `#121826`
- Raised panel: `#172033`
- Primary accent: `#00F5D4`
- Secondary accent: `#FF2E97`
- Error and danger: `#FF4A5F`
- Success: `#39FF88`
- Warning and hints: `#FFD166`
- Primary text: `#E6F1FF`
- Muted text: `#A9B7CA`
- Disabled text: `#65748C`

## Typography

- UI and reading text: `Rajdhani`, `IBM Plex Sans`, `Segoe UI`, system sans.
- Headings, ALGO messages and system chips: `Share Tech Mono`, `JetBrains Mono`, `Cascadia Code`, Consolas, monospace.
- Body text stays at 16 px or larger. Puzzle prompts use a larger reading size and line height around 1.55.

## Components

- Primary buttons use filled cyan with dark text for strong contrast.
- Secondary buttons use dark surfaces with cyan borders.
- Cards and panels use a consistent 10 px radius.
- Mission nodes have three states: locked, available, complete.
- Puzzle answers are buttons wherever possible, with `aria-pressed` on selectable states.
- Hotspots are absolute-positioned buttons over the mission image.
- Audio puzzles always show transcript text.

## Layout

- Landing: two-column hero on desktop, single column on small screens.
- Game shell: persistent left sidebar on desktop, stacked shell on tablets and phones.
- Hub: mission grid plus Resistance status panel.
- Mission screen: story panel beside puzzle area on desktop, stacked on smaller screens.

## Motion

Motion is limited to signal ambience, button feedback, scanner bars and state changes. All motion respects `prefers-reduced-motion`.
