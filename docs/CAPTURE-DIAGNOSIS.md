# Capture authorization diagnosis — November 8, 2026

## Reproduction and isolation

In the saved real Editor add-on test, select synthetic text and click Use selected passage. The RPC fails before returning content; Apps Script lists a zero-duration failed execution. Menu onOpen/showSidebar calls succeed.

A temporary capturePassage implementation returning a fixed JSON object, without document reads or Server delegation, also failed. Reopening the sidebar after a fresh page load produced the app's classified authorization error. This rules out selection extraction and return serialization as the cause of this observed failure. The probe was removed and the real capture implementation restored/uploaded.

Ranked hypotheses: exposed-function/build failure, stale test/authorization context, multi-login/account context. The fixed top-level probe failed with authorization, moving the authorization/account context ahead of adapter/build logic.

The current browser uses the secondary Google login (authuser=1). Google documents multi-login as unsupported for Apps Script/add-ons and recommends a private window with only the owning account signed in. This is a plausible cause, not a confirmed fix. Founder reports that a single-account private-window retest still produced the authorization error. Multi-login alone is therefore insufficient to explain the failure.

Reference: https://developers.google.com/apps-script/guides/support/troubleshooting#issues-multiple

## Changes and evidence

- Project renamed to yourIntelligent; new Docs Extensions menu displays that name.
- Added safe failure classification for authorization vs unavailable function vs generic transport errors.
- Nine local tests pass, including the authorization-message regression; raw failure details do not appear in UI.
- Real capture/Unicode/multi-paragraph checks remain pending until authorization succeeds.
- No keys or student content logged; only synthetic text used.

Next: single-account real-host retest; if it still fails, inspect saved test authorization state and verify an enabled test before changing the adapter.

Follow-up: saved original test displayed Enabled=False (Installed for current user / AuthMode.None). Prepared an additional Latest Code test with Installed and Enabled (AuthMode.Limited). Document picker requires founder handoff; enabled-context retest pending.

Founder reports Installed and Enabled retest also failed with authorization. Added authorizeAccess(), calling ScriptApp.requireAllScopes(AuthMode.FULL), for an editor-run consent check using existing manifest scopes only. Founder run/result pending. No confirmed root-cause fix yet. Do not report multi-login or Enabled=False as the established cause.

Continuation: authorizeAccess completed successfully (observed editor log). showSidebar now checks requireAllScopes and active document ID before rendering, and succeeds; sidebar capture still fails. Adding a build-preserved @OnlyCurrentDoc annotation also did not fix capture. Next controlled test uses a fresh top-level RPC name captureSelectedPassage, keeping adapter logic identical. Nine tests passed with a single threads worker after an unrelated worker-start timeout. New build upload failed because clasp credentials became invalid; login refresh initiated, pending founder completion. Do not infer the new endpoint passed or reached Google.

## Confirmed follow-up results

- Founder reports the minimal connection probe succeeds in a private browser when bound directly to the synthetic Doc. The original standalone probe was rejected there.
- Real bundled app in that bound context was initially rejected. A direct unbundled capture function reached the server and returned “Select plain text only.” This exposed full-paragraph RangeElements being rejected by the adapter.
- Replaced the IIFE/global-object server dispatcher with plain top-level Apps Script entry functions and private underscore implementation functions. Added support for text-only complete paragraphs/list items and retained rejection of mixed/table content. No scope expansion.
- Founder then confirmed the corrected build displays the exact selected paragraph in that same private browser. This is user-reported real-host evidence, not an automated assertion or universal platform guarantee.
- The in-app browser continues to return authorization errors even with the corrected bound build. Its remaining failure is documented separately. The exact low-level cause of that browser rejection remains unconfirmed.
- Ten local tests pass. Typechecking and both builds are checked. Standalone Editor add-on retesting and additional live Unicode/partial/tab cases remain outstanding.

Temporary probe code is retained only under debug/bound-probe as a clearly disposable reproducer; it is not in the app menu/build. The direct hand-written adapter probe was replaced by the real shared adapter. Build scripts now produce separate dist and dist-bound targets. Do not claim public deployment or a fully verified standalone integration from the bound-preview result.
