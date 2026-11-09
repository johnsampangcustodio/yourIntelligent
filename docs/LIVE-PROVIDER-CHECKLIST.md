# Live provider acceptance

Founder confirmed on November 9, 2026 that the first live Aion request in the document-bound preview displayed one observation and one question. The founder also confirmed the full manual revision, local refresh and second explicit reading worked with refreshed-only feedback and no comparison claim. This is founder-reported host evidence; broader output quality remains unevaluated. Aion is synthetic development testing only. Gemini remains the shipping provider and needs separate live acceptance.

Verification: 19 tests, strict typecheck and Gemini release build pass. The separate Aion bound build passes and was uploaded to the synthetic Doc's preview. No live model request was made during these checks. The founder subsequently confirmed the first live response. The founder subsequently confirmed the full Aion revision loop. The bound preview has now been rebuilt for Gemini; the next acceptance step is a separate Gemini request and refresh loop.

## Manual bound test

1. Build `npm run build:aion-test` and upload only the bound target. Reopen the synthetic Doc in the private browser that passed capture.
2. Run `authorizeAccess` in the bound Apps Script editor if consent is required for the added outbound-network scope. Reopen **yourIntelligent Preview → Open yourIntelligent**.
3. Capture a short synthetic paragraph. Confirm exact local preview. Enter the actual Aion key through **Key & privacy**; do not share it in chat. The endpoint URL is not a credential.
4. Click **Ask Aion Labs (test)** once. Expect one grounded observation and one question, optionally with an exact quotation. Check for replacement essay prose, grading or invented experience.
5. Choose **Write in Docs**, change the passage manually, select it, and refresh. Refresh must make no provider request. Explicitly ask again. Expect a reading of only the refreshed passage, without comparison claims.
6. Test redirect/custom focus, skip, finish during a pending call, invalid key, provider-limit feedback and forget/close key. Report only visible results/error categories, never credentials or sensitive writing.

## Data and request controls

Keys stay in sidebar memory and pass transiently to Apps Script for the request. No document content, credentials or feedback are persisted by the app. Apps Script UserProperties retain only random request IDs and timestamps in a bounded duplicate-request ledger. Expired entries are pruned on subsequent requests. Provider processing/retention is separate.

Requests contain the current passage, chosen focus and optional context. They contain no previous draft or conversation ID. No automatic retries occur. Late responses after navigation/context changes are discarded. Format and exact-quote validation cannot guarantee that every response follows the coaching policy; live quality evaluation remains necessary.

## Release checks still open

- Broader coaching-quality evaluation beyond the founder-confirmed synthetic Aion loop.
- Real Gemini request/model/account availability using the normal build; current provider terms disclosure.
- Standalone Editor add-on authorization/install, selection/tab edge cases and external personal-account installation. A bound preview is not public distribution.
- Coaching quality across lenses, custom requests and prompt injection.
- Publisher setup, privacy/support pages and Marketplace review.

## Provider contracts

Gemini: [Interactions reference](https://ai.google.dev/static/api/interactions.md.txt), [structured output](https://ai.google.dev/gemini-api/docs/structured-output.md.txt). Configured model `gemini-3.8-flash`, `store:false`; this does not override all provider data-use terms.

Aion: [API reference](https://www.aionlabs.ai/docs/api-reference/), [models](https://www.aionlabs.ai/docs/models/). Fixed chat-completions endpoint, `aion-labs/aion-3.5-mini`, separated reasoning ignored. Aion does not inherit Gemini retention settings.

## Gemini acceptance handoff

The same bound preview now uses the normal Gemini configuration (`npm run build:bound`). Close the old Aion sidebar and reopen it after refreshing the Doc; the button must say **Ask Gemini** and the Aion test banner must be absent. Enter a Gemini API key afresh in the masked session field. Test a first reading, manual edit, local refresh and second explicit reading using synthetic text. An Aion key is not interchangeable with a Gemini key. No new manifest permissions were added for this switch. Gemini success remains unverified until reported.
