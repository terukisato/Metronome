# メトロノーム / Metronome

A browser-based metronome built with HTML, CSS, and JavaScript. No frameworks, no external dependencies. Works offline and installs as a PWA on Android.

The interface is a minimal floor pedal named **SOUZU** (printed above the footswitches in thin, widely spaced capitals, in the style of the Ibanez Pentatone wordmark) and inspired by the Neural DSP Quad Cortex: a matte powder-coated enclosure, a clean display (tempo, beat dots, time signature and a status row), a slim fader, and black brushed-metal controls. BEATS and NOTE are knobs with a printed tick scale and a pointer line; ACCENT, the presets and TAP are push switches whose thin ring lights blue with a soft glow when they're on; A440 and START are black metallic stomp switches. The bottom half of the enclosure is printed in white with a minimal Japanese-print scene: a clump of bamboo with brush-stroke leaves, soft leaf shadows and a few ink splashes, with a large grainy moon rising off the right-hand edge. Two alternative artworks are included (`bamboo-line.svg`, an outline-drawn bamboo forest, and `bamboo.svg`, a suisaiga watercolour forest); swap the file name in the `.stage-art` rule to use one.
---

## Controls

| Control | Description |
|---------|-------------|
| A440 stomp switch (left) | Press to play a 440Hz tuning tone (A), press again to stop |
| START stomp switch (right) | Start / Stop (the beat dots on the screen show it's running) |
| TAP (next to the presets) | Tap tempo — tap at least twice; pausing over 2 seconds starts a fresh count |
| Fader | Adjust tempo smoothly (20–240 BPM) |
| BEATS knob | Beats per bar (2–16) |
| NOTE knob | Note value (2, 4, 8, 16) |
| Beat dots (on the screen) | Tap a dot to accent that beat; tap again to remove it. Accented beats show a blue ring and fill blue when they play. Arrow keys move between dots, Enter/Space toggles |
| ACCENT switch | Turns the accent pattern on/off (accenting a beat while it's off turns it back on) |
| Preset 1 / 2 / 3 | Press to load; hold ~½ s (or Shift+Enter) to save the current tempo, time signature and accent pattern. The ring is faintly tinted when a preset is saved, fully coloured when it's loaded, and drops back when you change something |
| ☰ | Open settings (language, click sound and other options) |

**Encoders:** drag around the rim to turn, drag the centre cap up/down, scroll the mouse wheel, or Tab to a knob and use the arrow keys.

**Keyboard:** `Space` = tap tempo · `Enter` = start/stop · `↑↓` = BPM ±1

**Screen status row** (bottom of the display):

| Left | Right |
|------|-------|
| Loaded preset (`P1`–`P3`, or `P–` when none / after a change) and the current click sound | Bar counter (`BAR 12`) and elapsed practice time (`02:14`). Both reset when you press START and freeze when you stop; tempo changes while playing don't reset them |

---

## Click Sounds (9)

Blip (default), Click, Beep, Wood, Hi-Hat, Rimshot, Clave, Bell, Ping

---

## Time Signatures

Any combination of 2–16 beats over a 2, 4, 8 or 16 note value, e.g. 2/4, 3/4, 4/4, 5/4, 6/8, 7/8, 9/8, 12/8, 13/8, 2/2, 12/16. The beat count sets how many clicks are in a bar (by default the first is accented; tap the beat dots to accent any beats, e.g. beats 1, 3 and 5 for 7/8 counted 2+2+3); the full signature is shown on the screen under the tempo.

---

## Settings

The settings panel (☰) is styled as a small matching enclosure: the pedal's matte finish, engraved dividers, and the same blue status rings to show the selected sound and which toggles are on.

**Language** — EN / 日本語

**Click Sound** — select from 9 sounds

**Other**
- Light Mode — switches to a bright theme for daylight use
- Flash — background flashes on each beat
- Vibrate — phone vibrates on each beat (Android)
- Watch Vibration — vibrates any watch running companion software that exposes the standard BLE "Immediate Alert" service (not limited to one brand), via Web Bluetooth

**Tutorial** — replays the first-run walkthrough of the pedal.

**About** — opens a page with the app name, a short description, the designer and developer (Teruki Sato) and the version. Close it with ✕, Esc or by tapping outside it.

All settings (BPM, time signature, click sound, volume, language, light/dark mode, flash and vibrate toggles) are remembered between visits using `localStorage`. Watch vibration always starts off, since Web Bluetooth requires picking the device again each session.

---

## Language

Choose English or Japanese (日本語) with the LANGUAGE selector at the top of the settings panel. All UI elements translate, and switching language doesn't move anything on the pedal. English text uses Jost, the same face as the SOUZU wordmark.

---

## Accessibility

- Play/Stop, volume, and nudge buttons have descriptive labels for screen readers.
- BPM changes from the nudge buttons, tap tempo, and arrow keys are announced to screen readers.
- Click sounds are a keyboard-operable radio group (Tab to focus, Enter/Space to select).
- Keyboard shortcuts (Space, Enter, ↑/↓) are suppressed while a form control (the time-signature dropdown, a toggle, a button) has focus, so they don't fight with native control behavior.

---

## First run

The first time the app opens, a short tutorial walks through the pedal one part at a time: a spotlight with a blue edge highlights each control while the rest dims, and a card explains what it does. It covers the screen (and accenting beats), the tempo fader, the BEATS and NOTE knobs, ACCENT, the presets, TAP, A440, START and the settings button.

Use **NEXT** / **BACK** (or the ← → keys) to move through it, **SKIP** or Esc to leave, and **DONE** at the end. It only appears once (tracked via `localStorage`); replay it any time from **Settings → TUTORIAL**. It's translated along with the rest of the app.

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
├── bamboo-moon.svg ← Pedal artwork: bamboo and moon
├── bamboo-line.svg ← Alternative artwork (outline bamboo forest)
├── bamboo.svg     ← Alternative artwork (watercolour bamboo forest)
├── sw.js          ← Service worker (offline)
├── icon-192.png   ← App icon
├── icon-512.png   ← Splash icon
├── .nojekyll      ← GitHub Pages config
└── README.md
```
