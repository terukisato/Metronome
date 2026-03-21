# メトロノーム / Metronome

A feature-rich metronome PWA with colour themes, pendulum styles, click sounds, font options, and Japanese language support.

## ✨ Features

- 🎵 Multiple click sounds (Click, Beep, Wood, Hi-Hat, Rimshot, Clave, Bell, Ping)
- 🎨 12 colour themes (Classical, Neon, Sakura, Slate, Ember, Forest, Kintsugi, Midnight, Rose, Arctic, Obsidian)
- 🕰️ 8 pendulum styles (Classic, Diamond, Orb, Arrow, Flame, Hexagon, Minimal, Ghost)
- 🔤 11 font styles
- 🇯🇵 Japanese language mode (with Hokkaido dialect tempo names)
- ⏱️ Tap tempo button
- 🎼 13 time signatures
- 📱 Installable on Android as a PWA

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it anything (e.g. `metronome`)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload the files

1. On the new repo page, click **uploading an existing file**
2. Drag and drop **all files** from this folder:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `.nojekyll`
3. Click **Commit changes**

### Step 3 — Enable GitHub Pages

1. Go to your repo **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main` and folder to `/ (root)`
5. Click **Save**

Your app will be live at:
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```
(Takes ~1 minute to deploy)

---

## 📱 Install on Android

1. Open the live GitHub Pages URL in **Chrome for Android**
2. Tap the **⋮ menu** (three dots, top right)
3. Tap **"Add to Home Screen"**
4. Tap **Add**

The metronome installs as a standalone app — no browser bar, works offline.

---

## 📁 File structure

```
metronome/
├── index.html      ← Main app
├── manifest.json   ← PWA install config
├── sw.js           ← Service worker (offline support)
├── icon-192.png    ← App icon (home screen)
├── icon-512.png    ← App icon (splash screen)
├── .nojekyll       ← Tells GitHub Pages not to process files
└── README.md       ← This file
```
