# メトロノーム / Metronome

A browser-based metronome with adjustable BPM, multiple click sounds, colour themes, pendulum visualiser, and Japanese language support. Installable as a PWA on Android.

---

## Features

**Tempo control**
- BPM range: 20–240
- Large BPM display with tempo name (Larghissimo → Prestissimo)
- BPM slider for smooth adjustment
- Nudge buttons: −10, −5, −1, +1, +5, +10
- Tap tempo — tap the TAP button or press Space to set BPM by feel

**Click sounds (9)**
Blip, Click, Beep, Wood, Hi-Hat, Rimshot, Clave, Bell, Ping — all synthesised in-browser via the Web Audio API

**Time signatures (13)**
Simple: 2/4, 3/4, 4/4, 5/4
Compound: 6/8, 9/8, 12/8
Odd: 7/8, 11/8, 13/8
Asymmetric: 5/8, 8/8, 10/8

**Beat indicator**
Visual dots light up on each beat, with the accent beat highlighted. Dots shrink and stay on one line for large beat counts (11, 13).

**Colour themes (10)**
Classical, Neon, Sakura, Slate, Ember, Forest, Kintsugi, Midnight, Rose, Arctic

**Pendulum visualiser**
Optional animated pendulum with 8 styles: Classic, Diamond, Orb, Arrow, Flame, Hexagon, Minimal, Ghost. Swing speed syncs to BPM automatically.

**Keyboard shortcuts**

| Key | Action |
|-----|--------|
| `Space` | Tap tempo |
| `Enter` | Start / Stop |
| `↑` | BPM +1 |
| `↓` | BPM −1 |

**Responsive layout**
- Portrait: full-featured vertical layout
- Landscape: two-column layout with screen left, controls right

---

## Settings

**Click Sound** — choose from 9 synthesised sounds; Blip is the default

**Colour Theme** — 10 themes switchable at any time

**Pendulum Style** — 8 visual styles for the pendulum arm

**Other**
- **Flash** — background flashes on each beat
- **Vibrate** — phone vibrates on each beat (Android only)
- **Watch Vibration** — vibrates a paired smart watch on each beat via Web Bluetooth

---

## Language support

Full UI translation between English and Japanese (日本語). Toggle with the JP/EN button. Tempo names use Hokkaido dialect in Japanese mode.

---

## Running the app

**Standalone:** open `index.html` in any modern browser — no server needed.

**As a PWA (Android install):**
1. Deploy to GitHub Pages (see below)
2. Open the URL in Chrome for Android
3. Tap ⋮ menu → "Add to Home Screen"
4. The app installs as a standalone app, works offline

---

## Deploy to GitHub Pages

**Step 1 — Create a repository**
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**, name it (e.g. `metronome`), set to **Public**
3. Click **Create repository**

**Step 2 — Upload files**
1. Click **uploading an existing file**
2. Drag and drop all files from the zip:
   `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `.nojekyll`
3. Click **Commit changes**

**Step 3 — Enable GitHub Pages**
1. Go to **Settings → Pages**
2. Set source to **Deploy from a branch**, branch `main`, folder `/ (root)`
3. Click **Save**

Your app will be live at:
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

---

## File structure

```
metronome/
├── index.html       ← Main app (self-contained)
├── manifest.json    ← PWA install config
├── sw.js            ← Service worker (offline caching)
├── icon-192.png     ← Home screen icon
├── icon-512.png     ← Splash screen icon
├── .nojekyll        ← Prevents GitHub Pages Jekyll processing
└── README.md        ← This file
```

---

## Technical notes

- All audio synthesised client-side via the Web Audio API — no external sound files
- A dynamics compressor is applied to the master output to prevent clipping
- Pendulum animation speed syncs to BPM on every play/stop cycle
- Phone vibration uses the Web Vibration API (Android Chrome only)
- Watch vibration uses Web Bluetooth GATT to send commands to a paired watch
- CSS custom properties handle all theming, updated at runtime
- Fonts loaded from Google Fonts (Rajdhani, DM Mono, Noto Serif JP)
