# メトロノーム / Metronome

A browser-based metronome built with HTML, CSS, and JavaScript. No frameworks, no external dependencies. Works offline and installs as a PWA on Android.

---

## Controls

| Control | Description |
|---------|-------------|
| ▶ / ■ | Start / Stop |
| TAP | Tap tempo |
| BPM slider | Adjust tempo smoothly |
| −10 −5 −1 +1 +5 +10 | Nudge BPM |
| Time signature | Dropdown with 13 options |
| Volume | Collapsible slider |
| JP / EN | Toggle language |
| ☰ | Open settings |

**Keyboard:** `Space` = tap tempo · `Enter` = start/stop · `↑↓` = BPM ±1

---

## Click Sounds (9)

Blip (default), Click, Beep, Wood, Hi-Hat, Rimshot, Clave, Bell, Ping

---

## Time Signatures (13)

| Group | Options |
|-------|---------|
| Simple | 2/4, 3/4, 4/4 |
| Compound | 6/8, 9/8, 12/8 |
| Odd | 5/4, 7/8, 11/8, 13/8 |
| Asymmetric | 5/8, 8/8, 10/8 |

---

## Colour Themes (10)

Classical · Neon · Sakura · Slate · Ember · Forest · Kintsugi · Midnight · Rose · Arctic

---

## Settings

**Click Sound** — select from 9 sounds

**Colour Theme** — select from 10 themes

**Pendulum Style** — Classic, Diamond, Orb, Arrow, Flame, Hexagon, Minimal, Ghost

**Other**
- Flash — background flashes on each beat
- Vibrate — phone vibrates on each beat (Android)
- Watch Vibration — vibrates paired smart watch via Web Bluetooth

---

## Language

Toggle between English and Japanese (日本語) with the JP/EN button. All UI elements and tempo names translate.

---

## Install on Android

1. Deploy to GitHub Pages (see below)
2. Open in Chrome → ⋮ → Add to Home Screen

---

## Deploy to GitHub Pages

1. Create a public GitHub repository
2. Upload all files from the zip
3. Go to **Settings → Pages** → source: `main` branch, root folder
4. Live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## Files

```
├── index.html     ← App
├── manifest.json  ← PWA config
├── sw.js          ← Service worker (offline)
├── icon-192.png   ← App icon
├── icon-512.png   ← Splash icon
├── .nojekyll      ← GitHub Pages config
└── README.md
```
