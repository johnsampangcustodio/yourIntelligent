# Free-tier policy clarification — not sent

November 9, 2026. Founder chose to keep submission pending while free-tier use is clarified. Do not submit Marketplace or OAuth sensitive-scope review, add a paid-account requirement, enable billing, or assert compliance based on an assumption.

## What the sources establish

- Google's [Workspace developer policy](https://developers.google.com/workspace/workspace-api-user-data-developer-policy#limited-use) and [verification FAQ](https://support.google.com/cloud/answer/13463817) restrict general/foundation-model training on Workspace user data and distinguish user-directed AI features from broader model use.
- [Gemini API terms](https://ai.google.dev/gemini-api/terms) permit product/model improvement and human review under unpaid-service data terms. Paid-service data terms differ, and the current terms describe regional exceptions. `store:false` disables interaction storage through the API; it is not a universal data-use opt-out.
- The live Cloud configuration classifies `documents.currentonly` as non-sensitive and `script.container.ui` / `script.external_request` as sensitive. This classification alone is not an approval of a transfer or provider arrangement.

These sources identify the issue. They do not explicitly approve this app's exact BYOK/free-tier arrangement. Do not turn that absence into either a guarantee of compliance or a claim that every possible free Gemini arrangement is prohibited.

## Draft question for Google's official policy/verification support

Subject: Clarification: Docs Editor add-on using student-owned Gemini API keys and unpaid-service data terms

We are preparing yourIntelligent, a Google Docs Editor add-on for university writing revision. It captures only explicitly selected plain text, shows an exact local preview, and sends that text to Gemini only when the student requests a reading. Students supply their own Gemini Developer API keys; the publisher does not pool requests or provide a shared credential.

The Apps Script manifest requests only:

- `https://www.googleapis.com/auth/documents.currentonly`
- `https://www.googleapis.com/auth/script.container.ui`
- `https://www.googleapis.com/auth/script.external_request`

The Gemini request uses `store:false` and no conversation continuation. The app does not persist document text, keys or feedback; it retains bounded random request IDs and timestamps for duplicate suppression. Students write revisions themselves; the app exposes no document-write operation. Unpaid-service data handling is disclosed in the key-setup UI and public privacy page.

We understand that Workspace data cannot be used for general-model training, while Gemini's unpaid-service terms can allow product/model improvement. For this exact current-document/BYOK arrangement:

1. Is sending selected Docs text using a student-owned Gemini key governed by unpaid-service data terms permitted under Workspace/Google API user-data policy?
2. Does the answer depend on the data being obtained through `documents.currentonly`, the user's region or the Gemini project's data-processing/billing arrangement?
3. If the arrangement is not permitted, what provider data terms and evidence would be needed for an inference-only writing-feedback feature? Would a per-session user confirmation be sufficient evidence, or is technical verification or a publisher-controlled processor arrangement required?
4. Are any additional in-product consent or privacy disclosures required beyond the exact passage preview, explicit Send and provider-data-use explanation?

We are holding both review submissions until this is clarified. The product/setup/privacy pages are available at https://johnsampangcustodio.github.io/yourIntelligent/ . No API key or student writing is included in this inquiry.

## Sending boundary

This is a prepared draft, not an inquiry already sent. Google’s [official Marketplace support page](https://developers.google.com/workspace/marketplace/support) points to the [Workspace Developers forum](https://discuss.google.dev/c/google-workspace/20) for questions. Its specialist email route is described for Workspace administrators, which has not been established for the founder’s personal account. A public forum inquiry is a possible no-cost route; distinguish community advice from an identified Google policy-team response. Obtain explicit founder authorization before sending it; routine publishing authorization does not itself authorize an outbound support message. Contact to use if authorized: jpsc@tuta.io. Do not include credentials, real writing, account security codes or a private document link.

## Status and next decision

Record the actual official response and distinguish it from our inference. Then decide whether to keep the existing BYOK arrangement, require an eligible non-training arrangement, constrain availability, or change architecture. The current candidate remains a developer-tested prototype and an unsubmitted listing draft.

If public posting is authorized, post only the subject and inquiry body above. Exclude the Sending boundary/Status notes, private email addresses and project/document IDs. Public information included: app name, product website, three OAuth scope strings and the described request/data flow. No credentials or real student writing.

### Outreach owner confirmed

Founder explicitly chose to keep this inquiry as a draft and handle outreach personally. No forum post, email or support message was sent by the agent. Resume review preparation only after the founder brings back the clarification or gives a new instruction; preserve the submission hold in the meantime.
