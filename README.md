# Souzu Metronome

A browser-based metronome built with HTML, CSS, and JavaScript. No frameworks, no external dependencies. Works offline and installs as a PWA on Android.

The interface is a minimal floor pedal named **SOUZU**, a matte powder-coated enclosure, a clean display (tempo, beat dots, time signature and a status row), a slim fader, and black brushed-metal controls. BEATS and NOTE are knobs with a printed tick scale and a pointer line; ACCENT, the presets and TAP are push switches whose thin ring lights blue with a soft glow when they're on; A440 and START are black metallic stomp switches. The bottom half of the enclosure is printed in white with a minimal Japanese-print scene: a clump of bamboo with brush-stroke leaves, soft leaf shadows and a few ink splashes, with a large grainy moon rising off the right-hand edge. Two alternative artworks are included (`bamboo-line.svg`, an outline-drawn bamboo forest, and `bamboo.svg`, a suisaiga watercolour forest); swap the file name in the `.stage-art` rule to use one.

The pedal is horizontal by default: the screen, fader, presets and TAP on the left, and the knobs, the SOUZU name and the footswitches on the right. On a phone held upright, where there isn't room for two columns, it switches to a vertical pedal; turn the phone sideways to get the horizontal one. The whole pedal scales evenly to fit the window: larger on a big screen, smaller on a short one (small phones, or when the browser's address bar takes up room), and never needing to scroll. On a phone it uses all the room it has; on a PC or tablet it fills 85% of the window, leaving some space around it (`LARGE_SCREEN_FILL` in `index.html`). It's the same size in metronome and SEQ mode.

---

## Controls

| Control | Description |
|---------|-------------|
| A440 stomp switch (left) | Press to play a 440Hz tuning tone (A), press again to stop. The LED above it lights blue while the tone plays |
| START stomp switch (right) | Start / Stop. The LED above it lights blue while the metronome runs |
| SEQ switch (between the stomps) | Switches between the metronome and the [sequencer](#sequencer); its ring lights blue in SEQ mode |
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

Beats are scheduled on the Web Audio clock, so they stay exactly in time, and a tempo change while playing takes effect from the next beat without restarting the bar.

---

## Sequencer

The sequencer plays a list of steps, each with its own tempo, time signature and accent pattern, for a set number of bars, so the click can change tempo or meter partway through a song (e.g. 8 bars of 4/4 at 100, then 2 bars of 7/8 at 140).

Press **SEQ** to switch to the sequencer; press it again to go back to the metronome, whose settings are left exactly as they were. In SEQ mode every light on the pedal (switch rings, LEDs, beat dots, the time signature) turns green instead of blue, so it's always clear which mode you're in, and the screen changes:

- **Step strip** (top): one cell per step (up to 16). Tap a step to select it (green ring). **+** adds a copy of the selected step at the end; **−** deletes the selected step.
- **Beat dots, tempo and time signature**: the selected step's. The fader, BEATS, NOTE, ACCENT, the beat dots, TAP and ↑↓ all edit the selected step.
- **− BARS +**: how many bars the selected step lasts (1–99); hold to change quickly.
- **Status row**: `END LOOP` / `END STOP` (tap to switch) sets whether the sequence starts again from step 1 or stops after the last step. On the right, `BAR 3/8` is the bar within the playing step.

START plays from step 1. The playing step is lit green and the selection follows it; the next step blinks through the last bar before it starts. While playing, **NEXT** takes the bars control's place on the screen and shows what the next step changes to: its time signature, plus its tempo if that changes (`NEXT ▸ 7/4 · 140`), or `END` when the sequence stops after this step. Through the last bar before a change it lights up and counts down the beats left (`4`, `3`, `2`, `1`). Edits made while playing take effect from the next bar, and the playing step can't be deleted.

In SEQ mode the three **presets** save and load whole sequences (separately from the metronome presets): hold a preset for ~½ s (or Shift+Enter) to save the current sequence, press it to load. Its ring lights green while that sequence is loaded. The sequence, its presets and whether SEQ mode was on are remembered between visits.

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

**Tutorial** — replays the walkthrough for the mode the pedal is in: the metronome's, or the sequencer's while SEQ mode is on.

**About** — opens a page with the app name, a short description, the designer and developer (Teruki Sato) and the version. Close it with ✕, Esc or by tapping outside it.

**Release notes** — tap the version number at the foot of the settings panel (or on the About page) to see what's new in the current version.

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

The first time the app opens, a short tutorial walks through the pedal one part at a time: a spotlight with a blue edge highlights each control while the rest dims, and a card explains what it does. It covers the screen (and accenting beats), the tempo fader, the BEATS and NOTE knobs, ACCENT, the presets, TAP, A440, START, SEQ and the settings button.

The first time SEQ is switched on, a second tutorial walks through the sequencer: the step strip, setting a step's tempo and time signature, BARS, END, sequence presets, START and how to get back to the metronome.

Use **NEXT** / **BACK** (or the ← → keys) to move through them, **SKIP** or Esc to leave, and **DONE** at the end. Each appears once (tracked via `localStorage`); replay the one for the current mode any time from **Settings → TUTORIAL**. They're translated along with the rest of the app.

---

## Install on Android

1. Open **Chrome** on your Android phone and go to **https://metronome-amber-tau.vercel.app/**
2. Tap the **⋮** menu in the top-right corner.
3. Tap **Install app**. On some phones it's called **Add to Home screen**. If Chrome shows an **Install** banner at the bottom of the screen, you can tap that instead.
4. Confirm with **Install**. The app icon appears on your home screen and in your app drawer.

Once installed, it opens full screen like a normal app, with no browser address bar. After the first launch it also works **offline**, so you can use it in a rehearsal room or on stage without a connection.

**Updates** install themselves: when a new version is published, the app picks it up the next time you open it while online. If it still looks out of date, close the app fully and open it again.

**Tips**
- Turn your phone sideways to get the horizontal pedal.
- **Vibrate** (in Settings) uses the phone's vibration motor and works in Chrome on Android.
- **Watch Vibration** uses Bluetooth, so allow Chrome to use Bluetooth when asked.
- To uninstall, long-press the app icon and choose **Uninstall** (or **Remove**).

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
