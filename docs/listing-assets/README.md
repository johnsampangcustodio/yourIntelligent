# Listing graphics

Original yourIntelligent mark: a lowercase y with a small blue margin dash. Charcoal, near-white and blue follow Margin / Cut. This is a proposed listing identity; it does not reproduce Google's logo or imply affiliation.

| File | Purpose |
|---|---|
| icon.svg | Editable vector source |
| icon-32.png, icon-128.png | Required Marketplace icon sizes |
| icon-48.png, icon-96.png | Extra icon sizes if requested by an integration |
| icon-512.png | Review/preview master |
| card-220x140.png | Marketplace application card banner |

Built with `python scripts/build-listing-assets.py` using Pillow and fonttools. The banner uses the project's bundled DM Sans font; its license is under `site/assets/dm-sans-LICENSE.txt`. Generated PNG dimensions were checked and the 128px icon/banner visually reviewed.

These graphics are not product screenshots. The full-bleed Docs screenshot is now docs-prepared-sample-1280x800.jpg. It shows the actual sidebar in a separately copied, private document whose visible body was replaced with synthetic text. The displayed feedback is explicitly labeled Prepared sample; it is not claimed to be a live model response. No key is visible. The image was captured directly at 1280×800 with no image editing, padding or overlays. The bound-preview menu is visible; this demonstrates the real host UI rather than public installation. Keep this distinction in the case study. Do not present localhost or invented UI as live integration evidence.

## Redesigned launch set — November 9, 2026

| Order | File | What it shows |
|---|---|---|
| 1 | docs-prepared-sample-1280x800.jpg | Current question-led feedback, focus, observation and student actions; replaces the old flat-sidebar screenshot |
| 2 | docs-select-1280x800.jpg | Current first-use design, local-preview boundary, sample/privacy actions |
| 3 | docs-revision-preview-1280x800.jpg | A revised local sample marked Passage 2 / Not sent, current focus and explicit next action |

All three are direct 1280×800 JPEG browser captures with square corners and no overlays, padding or image manipulation. They use the updated bound script in the existing synthetic listing-demo copy. The third image demonstrates the sample practice path: its local practice passage was changed; the Docs body remains the initial synthetic example. It does not claim real selected-text capture or a live second reading. No credentials or original student/founder writing appear. File dimensions and format were inspected without editing images.

The prior icon/banner designs already use the current scheme; no new logo or identity change is introduced by this packaging pass.

All three current screenshots were uploaded in the order above and saved to the Marketplace listing draft. Google returned Draft saved; Save Draft became disabled. The App Configuration was separately saved with Apps Script version 2. The Submit for Review button was not used. Private console evidence remains ignored under docs/local-console/.

Official requirements checked November 9, 2026: [Marketplace listing assets](https://developers.google.com/workspace/marketplace/create-listing).
