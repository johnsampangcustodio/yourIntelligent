# Privacy — yourIntelligent

Prepared November 9, 2026. Publication draft for the implemented initial version; not a claim that the app is publicly available.

Publisher: John Phillip Custodio. Contact: [LinkedIn](https://www.linkedin.com/in/johnphillipcustodio/).

## What the app handles

The sidebar captures the plain-text passage you select in the active Google Doc. Capture and refresh produce a local preview without a model call. The app does not automatically read the full document or write to it.

Only when you explicitly request a reading does the app send the captured passage, your chosen focus and any added course context through Google Apps Script to the Gemini API. A second reading sends the refreshed passage, with no earlier draft or conversation continuation. Your key is transmitted transiently to Apps Script and to Gemini to authenticate the request.

Your API key, passage, optional context and feedback stay in sidebar-session memory. The app does not intentionally save them to browser storage, Apps Script Properties or its own database. Closing the sidebar clears that session. **Forget key** clears the saved session key; it does not revoke a key at the provider or undo an earlier request.

The app stores random request IDs and timestamps in Google Apps Script user-specific properties to suppress duplicate submissions. The ledger has at most 32 entries. Entries older than ten minutes are removed on a subsequent valid request; if no request follows, the remaining metadata can persist. It contains no document text, key or feedback.

The app includes no advertising, analytics tracker, or content logging. Google runs Docs and Apps Script and may process operational information under its own policies. If you contact the publisher, information you choose to share is handled through the support platform; do not include keys, private writing or document links.

## Provider processing

Gemini processes the text you deliberately send. The app requests `store:false` for its Interactions request. This does not override Google's other data-use or retention terms. Unpaid Gemini services may use submitted content for improvement and human review. Review the [Gemini API terms](https://ai.google.dev/gemini-api/terms) and your account's settings before sending personal information.

The publisher does not sell app data, use document content for advertising or use it to train a publisher-owned model. No teacher dashboard or instructor-sharing feature is implemented.

## Permissions and controls

The add-on requests access to the current document, sidebar UI and outbound network requests. Current-document permission can technically permit editing; this implementation exposes no document-write operation. Outbound access is used for the configured provider request.

You can stop sending, close the sidebar, remove the add-on or revoke its Google authorization. To revoke an API key or request provider-side data handling, use your provider account. For questions about app metadata or privacy, contact the publisher through the support page. Uninstalling is not represented as an automatic deletion of every platform-held record.

## Development tests

A separate synthetic-only development build can use Aion Labs. It is not the shipping provider. That build labels itself as an Aion test, uses an Aion key, and is governed by [Aion's own information and policies](https://www.aionlabs.ai/docs/); Gemini's data settings do not apply to it.
