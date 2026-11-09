# yourIntelligent — short demo

[25-second MP4](renders/yourIntelligent-demo.mp4) · 1280×900 · H.264 · 24 fps · silent, captioned · local rendering, $0 paid services.

Five five-second beats: select, choose focus, prepared reading, revise, refresh. Wide shots come from the actual Docs synthetic demo; narrow shots are actual local sidebar renders. Existing screenshots are held on screen with captions and hard cuts. This is a simple screenshot-based product walkthrough, not a continuous screen recording, actual OAuth consent footage or live Gemini evidence. The sample disclosure remains visible throughout. It is not represented as completing Google's OAuth video requirements.

Sources: `assets/`; composition: `index.html`; brief and provenance: `BRIEF.md`, `SOURCE-NOTES.md`. Fonts follow the existing app and their licenses are in the repository's `site/assets/` directory. GSAP is bundled locally. No paid generation, voice, music, cloud renderer or public video upload was used.

Creation used the installed HyperFrames, general-video, CLI/core and media-use skill guidance. Skill refresh stalled during repository cloning and was canceled; the installed source instructions were read directly.

HyperFrames check passed with no errors; warnings concern the intentionally simple flat scene structure and silent presentation. Midpoint frames and a decoded output frame were inspected. FFprobe confirmed exactly 25 seconds, H.264, 1280×900, 24 fps; output size 512,098 bytes.

To rerender in PowerShell, run `npm ci` in this folder, add the directories returned by `node -p "require('ffmpeg-static')"` and `node -p "require('ffprobe-static').path"` to that shell's PATH, then `npm run render -- --quality looks --fps 24 --workers 1 --output renders/yourIntelligent-demo.mp4`. No system PATH or billing settings need changing.
