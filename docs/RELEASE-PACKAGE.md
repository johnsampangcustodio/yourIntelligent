# Initial public release package

Status: preparation, not submitted or publicly deployed. Publisher: **John Phillip Custodio**. Student support destination: [LinkedIn](https://www.linkedin.com/in/johnphillipcustodio/). Public personal-account distribution and individual installation are the intended audience.

## Listing copy

Name: **yourIntelligent**

Short description: **A revision partner for student reflections: choose a passage, get one observation and one question, and write the revision yourself. Bring your own Gemini API key.**

Detailed description source: [public product/setup page](public/README.md). Links to prepare: [privacy](public/PRIVACY.md), [terms](public/TERMS.md), [support](public/SUPPORT.md). These are reviewable source files, not verified hosted policy URLs. Do not submit until actual public URLs work and policy wording matches the release build.

## Configuration to inspect before publication

1. Verify the standalone Apps Script project's associated Cloud project; switch to a suitable standard project if required. Preserve ownership under the founder account.
2. Configure Google Auth platform branding as yourIntelligent, external audience, confirmed publisher and support/contact email **jpsc@tuta.io**, confirmed by the founder for these fields. LinkedIn remains the student-facing support destination.
3. Match these exact manifest scopes in the OAuth and Marketplace configurations:
   - `https://www.googleapis.com/auth/documents.currentonly`
   - `https://www.googleapis.com/auth/script.container.ui`
   - `https://www.googleapis.com/auth/script.external_request`
4. Inspect the actual scope classification and complete OAuth verification if required. Marketplace review is separate. Do not claim approval from a successful developer test.
5. Enable/configure the Marketplace SDK for the Docs Editor add-on, public distribution and individual installs. The user has selected public distribution; inspect the concrete settings before saving the visibility choice because Google documents that it cannot later be changed.
6. Check current account/project prerequisites. Google's OAuth guide lists billing enablement; the founder's developer-spending budget is $0. Inspect the real setup and explain any payment/account requirement before activating a billable service. BYOK does not prove the publisher's setup is complete.

## Assets and reviewer walkthrough

Prepare actual app icons at 32×32 and 128×128, a 220×140 listing card, and at least one real Docs integration screenshot (recommended 1280×800). Preserve the light Margin / Cut design concept; do not imply Google endorsement. Use synthetic writing and no visible keys. Assets are not yet produced or approved.

Reviewer sequence: install → authorize → open through Extensions → capture synthetic plain text → inspect preview → choose focus → enter reviewer-owned Gemini key → explicit reading → write manually → local refresh → second explicit reading → skip/redirect/finish. Disclose the BYOK requirement before review. Do not embed a publisher-owned test credential in the app, repository or listing. Determine the review team's permitted credential/testing arrangement before submission if requested.

## Technical gate still open

| Check | Current evidence / next action |
|---|---|
| Core integration | Founder confirmed both Gemini readings in bound preview, then capture + one Gemini reading in standalone Editor add-on test |
| Selection edge cases | Test partial Unicode, multiple paragraphs, active tabs, empty selection and unsupported/table/image selections in real Docs |
| Coaching quality | Evaluate synthetic examples across clarity/depth/voice/custom, misleading directions and rewrite requests; founder happy-path success is not corpus coverage |
| Usability | Keyboard navigation, 300px sidebar, zoom, long content, status/error announcements and focus recovery remain to be checked in host |
| Resilience | Extend nonce expiry/capacity/lock-failure tests and complete relevant real-host failure checks |
| Cross-document isolation | Verify a second document does not receive stale feedback as a reading of new text |
| Public pages | Select and verify hosting; confirm identity/contact and current provider terms wording |
| Distribution | Install through public route from a second personal Google account, then complete the full loop and uninstall/reinstall |

## Version, recovery and evidence

Keep the current development branch separate from a frozen release candidate. Run `npm ci` and `npm run check`, then build the standard Gemini artifact. Record commit SHA, model `gemini-3.8-flash`, prompt text from `src/shared/revision.ts`, generated manifest, Apps Script version and deployed listing version together. No release version is recorded yet.

To restore a previous release, check out its recorded commit, rebuild, upload to the standalone target and select the recorded/replacement version using the actual Marketplace configuration. Verify the current Google update path before changing the listing. A user can always stop requests by closing the sidebar; an operator-wide provider pause is not currently implemented and remains part of hardening.

## Official requirements checked November 9, 2026

- [Publishing process](https://developers.google.com/workspace/marketplace/how-to-publish)
- [OAuth, scopes, contact fields and project setup](https://developers.google.com/workspace/marketplace/configure-oauth-consent-screen)
- [Listing copy, graphics and required support links](https://developers.google.com/workspace/marketplace/create-listing)

Recheck the actual console at submission. This document records preparation, not approval or compliance certification.

## Website publication configuration

Founder selected GitHub Pages at no cost. The repository is public and the Pages settings are available. `npm run build:site` builds a safelisted four-page static website into tracked `site/` with bundled fonts and no browser JavaScript. Source text remains in docs/public. A dedicated `codex/public-pages` subtree branch publishes only the website output at its root. Do not publish the repository root or raw research. Build and local navigation checks pass; live deployment verification is still pending at this point.

Update flow: edit source text/design, run `npm run build:site`, review generated output, commit on the development branch, run `git subtree split --prefix site -b <temporary-codex-branch>` (or split to an SHA), and push that website-only commit to `codex/public-pages`. Never force-push unrelated application history or include credentials in the site.
