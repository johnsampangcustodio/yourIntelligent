# Margin / Cut implementation evidence

November 9, 2026. These are rendered screenshots of the implemented sidebar, not Figma exports. All captured app content is synthetic. Prepared feedback is explicitly labeled and is not a live Gemini result.

- `01-select.jpg`, `02-preview.jpg`, `04-reading.jpg`, `05-writing.jpg`, `06-revision-preview.jpg`, `redirect.jpg`, `key-setup.jpg`: local browser at 300 CSS px; sample loop, revised Unicode/multiline passage, redirection and empty key setup.
- `docs-sidebar-reading.jpg`: updated standalone Editor add-on running through its saved Latest Code test in Google Docs. Cropped to the sidebar to exclude the document's writing; no document text was captured or sent to a provider for this check.

Compared with the current Margin / Cut journey and light showcase: same font families/weights, region structure, 16px insets, charcoal actions, restrained blue accents, rounded lenses, exact passage preview and question-led feedback. Approved differences include readable control borders, 44px minimum targets, pale-blue arrows, shorter copy, and no rounded outer imitation of the Docs host panel. This is a visual inspection, not a pixel-difference audit of all 13 states.

Checked locally: no horizontal overflow at 300px in preview; visible buttons at least 44px; custom-focus reveal without replacing the context field; sample revision preserves paragraph breaks and Café 😀; refresh enters a distinct Not sent preview. CSS supports instant reduced-motion states. OS reduced-motion and browser zoom have not been manually exercised in this slice.

Validation: 31 automated tests, strict typecheck, standalone and bound builds. New tests cover a pending reading becoming available without moving writing focus, dropping an old response after refresh, and custom/context preservation. Existing tests retain explicit refreshed-only payload, session exit and capture failure coverage.

Uploaded both standalone development and original bound-preview scripts. Actual host Select → sample Preview → prepared Feedback rendering verified. No new live provider request, public release or Marketplace/OAuth submission. Existing versioned review candidate and listing screenshot are still the previous design; update them after founder review and the redesigned live loop.
