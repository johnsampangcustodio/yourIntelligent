# OAuth review package

November 9, 2026 | Marketplace review submitted; OAuth submission incomplete

The founder authorized publishing at no cost. Google Marketplace returned **Review submitted** for the version-2 listing. The publisher project's Billing page states **This project has no billing account** and **This project is not linked to a billing account**. No payment method, billing account, paid assessment or paid service was activated.

## What is still needed

The branding recheck returned the existing homepage-registration finding. Choosing the additional-review route opened a combined verification form. It requires scope justification, a demo video and a homepage-appeal reason. The Data Access form rejects Save while the required **YouTube link** is blank. The scope text below is entered in the browser but not saved; no OAuth/branding appeal submission is claimed.

The video is a Google-required submission artifact, not a newly requested user-testing round. The current form explicitly asks for YouTube. Google's broader help also discusses accessible Drive/other links when replying to reviewers, but that does not remove this form's required field.

## Scope justification — ready to paste (899 characters)

yourIntelligent is a Google Docs Editor add-on for students revising their own writing. documents.currentonly limits selection capture to the document where the add-on runs; it does not enumerate Drive files. script.container.ui is needed to display the HTML sidebar using HtmlService/DocumentApp.getUi().showSidebar and let students preview selected text, choose a focus and read feedback. script.external_request is needed for Apps Script UrlFetchApp to call the fixed Gemini API endpoint only after the student explicitly sends the previewed passage, focus and optional context with their session-only API key. Capture/refresh alone makes no external call. The second reading sends only the refreshed passage, not a prior draft. The app exposes no document-editing operation and does not persist writing, feedback or keys. No broader Docs/Drive, email, contact or restricted scopes are requested.

This justification describes the three runtime/OAuth scopes. Marketplace's automatic email/profile defaults remain recorded separately in the release metadata.

## Homepage appeal explanation — prepared, not submitted

The application homepage is https://johnsampangcustodio.github.io/yourIntelligent/. I verified ownership of this exact URL-prefix property in Google Search Console using the HTML-file method under the project owner's account. Search Console reported Ownership verified. The public verification file is https://johnsampangcustodio.github.io/yourIntelligent/google8133eefb59483b16.html and is preserved in the deployed website. The homepage identifies yourIntelligent and links directly to the submitted privacy policy. The automated recheck still reports that the homepage is not registered to me. Please review the existing URL-prefix ownership evidence. The property is a GitHub Pages project path; I am not claiming ownership of github.io or another publisher's site.

The form's appeal-reason dropdown has not yet been selected. Choose the option that accurately describes existing verification; do not claim a propagation delay has elapsed unless it has. Google previously instructed allowing 24 hours after ownership verification.

## Short recording guide

Use a screen recorder already available to you. A concise recording of about 2–3 minutes should cover this flow; length is a suggested format, not a Google requirement. Record the actual standalone add-on and synthetic text. Do not substitute a slideshow of prepared feedback for the live scope demonstration.

1. Open the standalone Apps Script project's saved Editor add-on test, using Latest Code, and execute it. Open **Extensions → yourIntelligent → Open yourIntelligent** in the test Doc. Use the owning account; do not use the separate Preview menu for this recording.
2. Show the actual authorization flow, including the unverified-app screen if it appears and the complete English-language consent screen with its permission details expanded. Complete authorization yourself. Keep passwords, verification codes and recovery information out of the recording. If authorization was already granted and consent is skipped, remove only this app's existing access in your Google Account's third-party connections, then rerun the saved test and authorize again; that revokes the app grant, not the document.
3. Use this synthetic passage: **During our group discussion, I stayed quiet because I thought everyone else understood the reading. Later, someone asked the same question I had.** Select it in Docs and click **Use selected passage**. Show the exact preview and **Not sent** state. This demonstrates current-document capture.
4. Show the sidebar's focus choices and choose **Go a layer deeper**. This demonstrates the embedded HTML sidebar.
5. Pause recording before entering your Gemini API key. Enter it in the masked Key & privacy field without using Show. Resume after returning to the passage. Use available free provider quota; do not enable billing for the demo. If no free quota is available, stop and tell me.
6. Click **Ask Gemini** and show the actual observation/question. Explain: **Only an explicit request sends the previewed passage, focus and any added context to Gemini.** This demonstrates external-request scope usage. Do not call the prepared sample a live response.
7. Click **Write in Docs**, revise a sentence yourself, select it, and refresh. Show the new **Not sent** preview. Explain: **Refresh stays local. Another reading requires another send and uses only the refreshed passage.** End with **Finish → Close sidebar**.
8. Upload the recording to your YouTube account as **Unlisted**, with no paid promotion or paid service. Title suggestion: **yourIntelligent — OAuth scope demonstration**. Check that the video is accessible to reviewers without special access. Provide its URL; do not send credentials or the API key.

Suggested short narration: **yourIntelligent helps university students revise reflections. Students supply the writing, choose what the reader should notice, and make their own changes. The add-on reads selected text from the current document, displays its controls in a Docs sidebar, and contacts Gemini only when the student explicitly asks for a reading.**

## Resume from the ready draft

1. Enter the video URL beside the prepared justification in Google Auth Platform → Data Access; save.
2. Return to the homepage-issue additional-review flow. Add the factual appeal explanation and select the appropriate reason.
3. Review the combined form and submit if it introduces no payment, new legal agreement or unsupported attestation.
4. Record the actual OAuth submission status. Marketplace review is already submitted; do not submit a duplicate or cancel it merely to repeat a check.

## Cost evidence and official references

- [Marketplace overview](https://developers.google.com/workspace/marketplace/overview): Google states there is no Marketplace listing fee.
- [Google OAuth FAQ](https://support.google.com/cloud/answer/13463817?hl=en): Google distinguishes third-party assessment charges from Google fees; it says projects without restricted scopes do not require that assessment. The current console lists no restricted scopes. No assessor was contacted.
- [Demo-video guidance](https://support.google.com/cloud/answer/13804565?hl=en): show the consent flow and the features using the requested permissions, with English consent-screen language.
- [Homepage guidance](https://support.google.com/cloud/answer/13807376?hl=en): ownership must be verifiable; submit the accurate existing evidence rather than claiming approval.

Private console screenshots remain ignored under docs/local-console/. This package contains no key or private document content. Gemini account charges remain separate from publisher/Marketplace costs.
