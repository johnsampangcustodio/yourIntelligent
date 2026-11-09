# Initial public release package

Status: preparation, not submitted or publicly deployed. Publisher: **John Phillip Custodio**. Student support destination: [LinkedIn](https://www.linkedin.com/in/johnphillipcustodio/). Public personal-account distribution and individual installation are the intended audience.

## Listing copy

Name: **yourIntelligent**

Short description: **A revision partner for student reflections: choose a passage, get one observation and one question, and write the revision yourself. Bring your own Gemini API key.**

Detailed description source: [public product/setup page](public/README.md). Links to prepare: [privacy](public/PRIVACY.md), [terms](public/TERMS.md), [support](public/SUPPORT.md). Source files generate the public Pages site; the deployed URLs below returned HTTP 200. Before submission, confirm policy wording still matches the release build.

## Configuration to inspect before publication

1. Verify the standalone Apps Script project's associated Cloud project; switch to a suitable standard project if required. Preserve ownership under the founder account.
2. Configure Google Auth platform branding as yourIntelligent, external audience, confirmed publisher and OAuth user-support email **jpcustodio220@gmail.com**, approved by the founder after the console rejected the external Tuta address. Developer/project contact remains **jpsc@tuta.io**; LinkedIn remains the student-facing support destination.
3. Match these exact manifest scopes in the OAuth and Marketplace configurations:
   - `https://www.googleapis.com/auth/documents.currentonly`
   - `https://www.googleapis.com/auth/script.container.ui`
   - `https://www.googleapis.com/auth/script.external_request`
4. Inspect the actual scope classification and complete OAuth verification if required. Marketplace review is separate. Do not claim approval from a successful developer test.
5. Enable/configure the Marketplace SDK for the Docs Editor add-on, public distribution and individual installs. The user has selected public distribution; inspect the concrete settings before saving the visibility choice because Google documents that it cannot later be changed.
6. Check current account/project prerequisites. Google's OAuth guide lists billing enablement; the founder's developer-spending budget is $0. Inspect the real setup and explain any payment/account requirement before activating a billable service. BYOK does not prove the publisher's setup is complete.

## Assets and reviewer walkthrough

Prepare actual app icons at 32×32 and 128×128, a 220×140 listing card, and at least one real Docs integration screenshot (recommended 1280×800). Preserve the light Margin / Cut design concept; do not imply Google endorsement. Use synthetic writing and no visible keys. Icons (32/48/96/128px plus vector/master) and the 220×140 card are produced under docs/listing-assets. The icon, banner and real 1280×800 Docs integration screenshot have been uploaded to the saved listing draft. The screenshot shows clearly labeled prepared feedback and synthetic writing; it is not evidence of a live response or public installation.

Reviewer sequence: install → authorize → open through Extensions → capture synthetic plain text → inspect preview → choose focus → enter reviewer-owned Gemini key → explicit reading → write manually → local refresh → second explicit reading → skip/redirect/finish. Disclose the BYOK requirement before review. Do not embed a publisher-owned test credential in the app, repository or listing. Determine the review team's permitted credential/testing arrangement before submission if requested.

## Technical gate still open

| Check | Current evidence / next action |
|---|---|
| Core integration | Founder confirmed both Gemini readings in bound preview, then capture + one Gemini reading in standalone Editor add-on test |
| Selection edge cases | Founder confirmed exact formatted text runs, Unicode and two-paragraph capture in hardened standalone build. Active tabs, empty/oversize and unsupported selections remain open |
| Coaching quality | Evaluate synthetic examples across clarity/depth/voice/custom, misleading directions and rewrite requests; founder happy-path success is not corpus coverage |
| Usability | Keyboard navigation, 300px sidebar, zoom, long content, status/error announcements and focus recovery remain to be checked in host |
| Resilience | Nonce expiry/capacity/lock-failure, unknown-outcome and operator-pause tests pass; complete relevant real-host failure checks |
| Cross-document isolation | Verify a second document does not receive stale feedback as a reading of new text |
| Public pages | GitHub Pages live; all four URLs verified. Publisher and email confirmed; final listing/policy consistency review remains |
| Distribution | Install through public route from a second personal Google account, then complete the full loop and uninstall/reinstall |

## Version, recovery and evidence

Keep the current development branch separate from a frozen release candidate. Run `npm ci` and `npm run check`, then build the standard Gemini artifact. Record commit SHA, model `gemini-3.8-flash`, prompt text from `src/shared/revision.ts`, generated manifest, Apps Script version and deployed listing version together. Apps Script version **1** is recorded as a review candidate, not a public release. See docs/RELEASE-CANDIDATE.json for its description, application source reference and local artifact hashes.

To restore a previous release, check out its recorded commit, rebuild, upload to the standalone target and select the recorded/replacement version using the actual Marketplace configuration. Verify the current Google update path before changing the listing. A user can always stop requests by closing the sidebar; an operator-wide provider pause is now implemented through the `PROVIDER_PAUSED` script property. See docs/HARDENING-RESULTS.md for activation and in-flight limitations.

## Official requirements checked November 9, 2026

- [Publishing process](https://developers.google.com/workspace/marketplace/how-to-publish)
- [OAuth, scopes, contact fields and project setup](https://developers.google.com/workspace/marketplace/configure-oauth-consent-screen)
- [Listing copy, graphics and required support links](https://developers.google.com/workspace/marketplace/create-listing)

Recheck the actual console at submission. This document records preparation, not approval or compliance certification.

## Website publication configuration

Founder selected GitHub Pages at no cost. The repository is public and the Pages settings are available. `npm run build:site` builds a safelisted four-page static website into tracked `site/` with bundled fonts and no browser JavaScript. Source text remains in docs/public. A dedicated `codex/public-pages` subtree branch publishes only the website output at its root. Do not publish the repository root or raw research. Build and local navigation checks pass. GitHub Pages deployment completed successfully, and all four public pages, stylesheet and bundled-font sample returned HTTP 200. Desktop rendering and a 375px layout check were performed; the narrow layout had no horizontal overflow.

Update flow: edit source text/design, run `npm run build:site`, review generated output, commit on the development branch, run `git subtree split --prefix site -b <temporary-codex-branch>` (or split to an SHA), and push that website-only commit to `codex/public-pages`. Never force-push unrelated application history or include credentials in the site.

### Verified public URLs - November 9, 2026

- Product/setup: https://johnsampangcustodio.github.io/yourIntelligent/
- Privacy: https://johnsampangcustodio.github.io/yourIntelligent/privacy.html
- Terms: https://johnsampangcustodio.github.io/yourIntelligent/terms.html
- Support: https://johnsampangcustodio.github.io/yourIntelligent/support.html

Pages source: `codex/public-pages` at `85aadc3f3fe5821640f090b77fa93db25b2c244e`, root folder. [Successful Pages run](https://github.com/johnsampangcustodio/yourIntelligent/actions/runs/42588194160). OAuth support email is now `jpcustodio220@gmail.com`; project/developer contact `jpsc@tuta.io` is saved in Google Cloud. No paid plan or billable service was enabled. The GitHub connector needs reauthentication and gh CLI is unauthenticated; publication used the existing signed-in browser plus the working Git remote.

## Publisher setup inspection - November 9, 2026

The Apps Script standalone project now uses **GCP Standard: 49660377294**. Google Cloud initially blocked console access pending owner 2-step verification; the founder enabled it and console access was rechecked successfully. Created a dedicated standard project named **yourIntelligent**, project ID **yourintelligent-publisher**, project number **49660377294**, under the owning account. No billing account or paid service was activated by the agent.

The dedicated project is **linked** to Apps Script. Google Auth Platform configuration is **created**. Its initial support-email dropdown only offers the owning Gmail address or a managed Google Group (none exist). Founder initially selected jpsc@tuta.io, which the dropdown does not accept directly, then explicitly approved jpcustodio220@gmail.com for OAuth support. App name yourIntelligent, External/testing audience, Gmail support and Tuta project-contact fields are filled in the new project. The founder approved acceptance conditional on free setup. The User Data Policy was accepted and OAuth creation succeeded with no price, payment or billing step presented. Retain Tuta for developer/privacy contact and LinkedIn for student app support.

Before linking the new project, complete OAuth setup. Google documents that switching from a default project deletes the default project, cannot be reversed to that default, and requires previous users to reauthorize. Prepare the new configuration first, explain the concrete switch and obtain the required confirmation before that irreversible change. OAuth policy acceptance and configuration creation are complete. The project switch is complete; verification and Marketplace submission remain unstarted.

References: [Apps Script Cloud project types and switch effects](https://developers.google.com/apps-script/guides/cloud-platform-projects); [OAuth support email](https://support.google.com/cloud/answer/10311615#user-support-email).

### Saved OAuth configuration

- App name: yourIntelligent
- User support email: jpcustodio220@gmail.com (explicit founder approval)
- Audience: External; initial testing mode
- Developer/project notification email: jpsc@tuta.io
- Required agreement: Google API Services User Data Policy; accepted after explicit founder approval conditioned on free setup
- OAuth configuration creation: succeeded; Apps Script linked; no public submission

The icon/banner source and validated PNGs are in docs/listing-assets. Console screenshots remain local and ignored by Git. No application behavior changed in this asset/setup slice, so the prior 28 passing application tests were not rerun merely for documentation/graphics.

Policy review before submission: compare the actual scope classification and provider configuration with the [Workspace developer policy's Limited Use section](https://developers.google.com/workspace/workspace-api-user-data-developer-policy#limited-use). That section restricts general model training for data derived from Sensitive/Restricted scopes. Unpaid Gemini terms permit product/model improvement; `store:false` alone does not resolve that distinction. Applicability to the exact current-document scope and the appropriate provider account arrangement must be verified before release; no blanket compliance or free-tier suitability claim is made here.

### Saved branding/scopes and staged linkage - November 9, 2026

Saved the verified product, privacy and terms URLs plus authorized domain `johnsampangcustodio.github.io`. The console accepted the domain entry; ownership verification for public review is not claimed. Saved exactly the three scopes from dist/appsscript.json. Console classification: `documents.currentonly` non-sensitive; `script.container.ui` and `script.external_request` sensitive; no restricted scopes. This is an observed configuration classification, not an OAuth approval.

Added only the owner account as a test user; audience remains External and publishing status Testing. No extra OAuth client was manually created: Apps Script linkage is the next step. No billing account, paid service or production publication was activated.

Founder delegated the staged switch decision after the exact effects were disclosed. Clicked Set project and verified **GCP Standard / Project Number 49660377294** in Apps Script settings. Prior authorizations require renewal. Reauthorization/test acceptance after the switch is pending. Private console proof is ignored under docs/local-console/.

### Marketplace SDK enablement handoff

Opened the official **Google Workspace Marketplace SDK** library entry, service `appsmarket-component.googleapis.com`, in yourintelligent-publisher. The Enable button is available; no payment/billing step is displayed. The product page explicitly states use agrees to **Google APIs Terms of Service** and **Google Apps Marketplace SDK** terms. Those are additional agreements beyond the already accepted User Data Policy; specific approval was obtained before enabling. The founder subsequently approved those terms conditional on no cost. SDK enablement succeeded with no payment/billing prompt; service status is Enabled.

Official setup: https://developers.google.com/workspace/marketplace/enable-configure-sdk

After SDK enablement, prepare the Editor add-on integration using the standalone script ID and a recorded release version (not the bound preview). Current consumer account supports public publishing; use individual installation as planned. Complete a fresh synthetic standalone capture/reading after reauthorization, then address the remaining release gates. No paid service or production release was activated in the project-switch slice.

### SDK enabled and configuration staged - November 9, 2026

Founder confirmed capture plus a Gemini reading worked again after the Cloud-project switch. Enabled the Marketplace SDK after explicit agreement approval. Created immutable Apps Script version **1** with description `0.1.0 review candidate; app 56dc992; Gemini; not a public release`. No new app code was written or deployed in this slice.

Prepared SDK App Configuration: Public visibility, Individual + Admin Install, **Docs add-on** only, standalone script ID and version 1. Removed default userinfo.email and userinfo.profile entries; only the three manifest scopes remain. Developer name, LinkedIn website, jpsc@tuta.io and product URL are filled. The two sensitive scopes are labeled Unverified.

**Save Draft was attempted but rejected because Trader Status is mandatory.** The dropdown offers only Trader and Non-trader, despite the documentation describing an unspecified state. No classification was inferred. Await founder declaration. Configuration remains staged in the browser, not saved, and no listing was submitted. No payment/billing step occurred.

### Non-trader configuration and listing saved - November 9, 2026

Founder explicitly declared Non-trader. App Configuration saved successfully and persisted after reload: Public, Individual + Admin Install, Docs add-on version 1, confirmed developer/contact URLs. The SDK restores userinfo.email/profile defaults automatically, in addition to all three app scopes; the earlier intent to remove them did not persist. The runtime manifest still requests only the three app scopes and contains no profile/email-read operation.

Store listing saved successfully (Draft saved notification and disabled Save Draft): English name/163-character short description/1840-character detailed description; Free of charge app with BYOK provider charges disclosed; Academic Resources; all regions; four icon sizes, card banner, real 1280×800 Docs screenshot; terms/privacy/setup/support/help/LinkedIn report links and post-install tip. Exact UI copy exported to docs/LISTING-COPY.json. No Submit for Review action was taken.

The screenshot uses a separately created private copy with synthetic visible text, preserving the original document. Founder authorized the demo-copy sidebar; the screenshot shows prepared sample feedback, no API key, and no invented UI. Temporary viewport override was reset.

OAuth moved from Testing to In production for the already selected public audience, to expose verification prerequisites. This is not verified access or a published Marketplace listing; the unverified 100-user cap remains. Verification Center requires verified/published branding before sensitive-scope review. Uploaded the matching 128px logo, saved branding, and started the automated Verify branding check (UI estimate up to five minutes); outcome: homepage ownership was not registered; see ownership resolution below.

A policy-fit question remains before review: Workspace guidance prohibits general-model training on Workspace user data; unpaid Gemini terms can allow model improvement. Asked founder whether to require non-training Gemini data terms at key setup or leave submission pending while free-tier applicability is clarified. No account-tier verification or new usage constraint has been implemented yet, and no compliance assertion has been submitted. Relevant sources: https://support.google.com/cloud/answer/13463817 and https://ai.google.dev/gemini-api/terms .

### Homepage ownership and submission hold - November 9, 2026

Automated branding checks returned one concrete issue: the homepage website was not registered to the owner. The UI instructs verifying ownership, then waiting **24 hours** before retrying so Google systems can update. Registered the exact product homepage as a URL-prefix property in Search Console under the project owner. Downloaded Google’s public HTML verification file, added it to the safelisted site build and Pages output, and deployed website commit `87f4bdfede3155d17ba7c2e68aa66aef3881cbd8`. The public file returned HTTP 200 with the exact expected contents. Search Console then explicitly reported **Ownership verified**, method HTML file. Keep this file in all future deployments. This proves the URL-prefix property; OAuth branding has not yet been retried or approved.

Founder chose **keep submission pending while free-tier use is clarified**. Both Marketplace submission and sensitive-scope verification remain unsubmitted; no non-training-account restriction or billing requirement was implemented. The provider-policy inquiry is prepared in docs/PROVIDER-POLICY-QUESTION.md and has not been sent. Google’s [Marketplace support page](https://developers.google.com/workspace/marketplace/support) points to the [official Workspace Developers forum](https://discuss.google.dev/c/google-workspace/20) for questions; its email specialist route is described for Workspace administrators, which has not been established for this personal account. Obtain specific authorization before posting the inquiry. Community replies are not automatically policy-team approval.
