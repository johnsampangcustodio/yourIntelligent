# Real Docs integration verification

Status: development project uploaded and Editor add-on test saved/executed. Menu and sidebar verified in real Docs. Remaining capture checks in progress.

Host finding: Apps Script transformed a minified template literal containing an HTTPS link into invalid JavaScript. Bundling with template-literal syntax lowered fixes the real-host blank sidebar; verified by reopening the add-on.

Use only synthetic text. Test document fixture:

    Before the discussion, I thought silence meant agreement.
    A classmate asked my question. Café 😀 became my reminder to check assumptions.

Record actual results below, including browser/account context and build commit. No keys or real student text.

| Check | Expected | Result |
|---|---|---|
| Add-on menu | Sidebar opens without capturing text | Passed: real Docs menu and sidebar verified |
| Empty selection | Actionable message; no whole-document fallback | Pending |
| Partial selection | Exactly the highlighted substring | Pending |
| Emoji and accented text | Exact Unicode retained | Pending |
| Multiple paragraphs | Selected paragraphs with correct boundaries | Pending |
| Sidebar focus | Captured snapshot remains stable | Pending |
| Active document tabs | Reads active selection, never another tab | Pending |
| Tables or mixed image selection | Explicit unsupported message | Pending |
| Refresh | Local preview only; no network/model call | Pending |
| Two documents | No cross-document text shown as new feedback | Pending |
| Document unchanged | Capture performs no writes | Pending |

Create test through Apps Script: Deploy → Test deployments → enable Editor add-on → add test → Latest Code → select synthetic Google Doc → Save test → Execute. Follow authorization prompts if Google requires them. Test-deployment success does not constitute public installation.

Reference: https://developers.google.com/workspace/add-ons/how-tos/testing-editor-addons

Actual host result: sidebar menu, authorization and rendering pass. Capture RPC attempts show zero-duration failed executions and invoke the client failure handler; no selection text has been verified yet. Root cause remains unresolved. Template-literal lowering is a verified rendering fix; putting exported wrappers on separate lines did not resolve capture. Do not mark O-03 done.

Follow-up: founder confirmed exact selected-paragraph capture in the corrected document-bound preview using a private browser. Full-paragraph RangeElements are now supported. In-app calls still fail authorization; standalone test retest remains pending. Keep the pending cases above open rather than inferring success from this one host result.

## Current handoff - November 9, 2026

Founder confirmed the complete synthetic revision loop with both Aion (test-only) and Gemini in the private-browser document-bound preview. This includes local refresh and a second explicit reading of only the refreshed passage. The pending table entries above remain open for standalone/edge-case verification.

The standalone project has been rebuilt with the same native entry points, capture fixes and Gemini request implementation. In the owning account private browser, open the standalone Apps Script project, choose Deploy > Test deployments, select the saved synthetic Doc test configured for Latest Code, and Execute. Open the add-on through **Extensions > yourIntelligent > Open yourIntelligent**, not the bound **yourIntelligent Preview** menu. Grant the requested document/sidebar/network permissions if prompted. Capture synthetic plain text and request one Gemini reading using the masked key field. Record the visible outcome without credentials.

Official test flow: https://developers.google.com/workspace/add-ons/how-tos/testing-editor-addons

### Standalone core path passed - November 9, 2026

Founder confirmed capture and a Gemini reading through the standalone Editor add-on test after the corrected build was uploaded. Prior standalone failures above are historical; core capture/RPC is now confirmed in this test context. Partial/Unicode/multiple-paragraph/tab/unsupported selection cases, full standalone second-reading sequence and external public install remain to be checked individually.

### Updated capture acceptance - November 9, 2026

Founder confirmed exact words, spaces, Café 😀 and paragraph break when capturing two paragraphs with bold text in the hardened standalone build (56dc992). This is founder-reported host evidence for formatted text runs, Unicode and multiple paragraphs. Remaining table/empty/oversize/active-tab cases are still pending.

### Reauthorization gate after publisher linkage

The standalone script was linked to standard publisher project 49660377294 on November 9, 2026. Earlier successful host checks remain evidence for that build, but the new OAuth client requires renewed authorization. Relaunch the saved standalone Editor add-on test, authorize current-document/sidebar/external-request access, then capture synthetic text and request a Gemini reading. Record this as post-switch acceptance only after it actually succeeds. No need to change or share API keys in chat.
