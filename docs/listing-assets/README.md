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

Official requirements checked November 9, 2026: [Marketplace listing assets](https://developers.google.com/workspace/marketplace/create-listing).
