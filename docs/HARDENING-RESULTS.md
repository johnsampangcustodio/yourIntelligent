# Hardening slice — November 9, 2026

## Changes

- Delayed capture results are discarded after navigation or context changes, rather than reopening passage preview over key entry. Stale completions update only pending state, preserving unsaved inputs and keyboard focus.
- Starting another passage clears the previous passage, direction, course context and feedback. The session key remains available until forgotten/closed, as described in the app.
- Paragraph grouping uses structural child-index paths instead of host-wrapper object identity. Multiple text runs in one paragraph stay together; different paragraphs retain line breaks.
- App-generated selection errors preserve actionable empty/length guidance without exposing raw host errors.
- Preview has a focusable heading; completed capture/feedback and validation errors receive focus. Links and disclosure controls have visible keyboard focus. Long unbroken text and evidence quotations wrap within the sidebar.
- Request IDs must be strings. Nonce expiry/capacity, lock contention and uncertain outcomes have additional tests.
- An operator can pause new AI requests with a script property. Capture, local preview and normal Docs editing remain available.

## Verification

Strict typecheck, all **28 tests**, and the Gemini release build pass. The Gemini bound build also succeeds. New deterministic tests cover fresh paragraph wrappers, paragraph boundaries, unsupported/table selection, actionable size errors, delayed capture during key entry, context reset, validation focus, ledger expiry/capacity/lock behavior, uncertain-outcome duplicate suppression and operator pause.

Browser check used the local prepared sample, with no live model call. The sidebar measured 300px with no horizontal overflow, including a 1,000-character unbroken string. Visible buttons measured 44px high. Heading focus and Tab to Change passage were observed. This is a limited keyboard/layout check, not a complete accessibility audit or screen-reader certification. Screenshot: [local prepared sample](hardening-sidebar.jpg).

## Host check needed after this upload

Use the standalone Editor add-on test with Latest Code in the private browser that previously passed. Capture synthetic text only; do not send to Gemini for this check.

1. Select a phrase containing an accented character and emoji; preview must match exactly.
2. Select a paragraph with both regular and bold text, then two consecutive paragraphs. Preserve text order, spaces and paragraph boundaries.
3. Try text inside a table and a passage over 6,000 characters. Expect an unsupported-selection message and a shorter-passage message respectively, with no full-document fallback.

Active document tabs, cross-document isolation, zoom/screen-reader checks, the broader synthetic coaching corpus, listing graphics and public installation remain open. Prior founder-confirmed live success is not retroactively claimed as acceptance of changed capture code.

## Operator pause and recovery

In the intended standalone Apps Script project's **Project Settings → Script properties**, set `PROVIDER_PAUSED` to the exact string `true` to reject new AI reading requests. Delete it or set it to `false` to resume. This setting is project-wide, not a student preference, and stores no user content. In-flight provider calls cannot be canceled by this flag and may consume quota.

The pause is checked on the server before nonce creation and provider access. The UI shows a controlled paused message. No pause flag was enabled during this slice. There is no new OAuth scope. Keep development-bound and standalone properties separate; pausing one does not pause the other.
