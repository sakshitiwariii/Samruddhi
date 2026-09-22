# For My Teteriki 💗

A personal birthday scrapbook site for **Samruddhi** — static React + Vite, ready for Vercel/Netlify/GitHub Pages.

## Run locally

```bash
cd DSamruddhi
npm install
npm run dev
```

Build: `npm run build` → deploy the `dist` folder.

## Customize content (no component edits needed)

| What | File |
|------|------|
| Photos | Add files to `public/images/`, list in `src/data/memories.js` |
| Videos | `public/videos/` + `src/data/videos.js` |
| Timeline | `src/data/timeline.js` |
| Awards | `src/data/awards.js` |
| “Open when…” letters | `src/data/openWhen.js` |
| Secret letter & jar notes | `src/data/messages.js` |
| Personality cards | `src/data/personality.js` |
| Music | `public/music/our-song.mp3` + `src/data/music.js` |

## Your photos

Six friendship photos are already copied into `public/images/` and wired in `memories.js`. Add more by copying the pattern in that file.

## HEIC images

Browsers often cannot display `.HEIC` directly. Convert to `.jpg` or `.png` (Photos app → Export, or an online converter) before placing in `public/images/`.
