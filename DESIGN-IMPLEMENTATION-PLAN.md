# yourIntelligent: Figma fidelity and design implementation plan

November 9, 2026 | Implementation baseline; first pass uploaded

Implementation update: the sidebar redesign is now in source and uploaded to both development scripts. The standalone Docs test renders the new Select, sample Preview and prepared Feedback screens. See [verification evidence](docs/design-refresh/README.md). The specifications below record the intended baseline; remaining acceptance includes the redesigned live Gemini loop, full per-state comparisons, manual reduced-motion/zoom checks and updated versioned release assets. Figma itself has not been edited.

Goal: bring the working Docs sidebar to the current Margin / Cut light design, shorten task copy, and add restrained motion. Complete this pass before resuming branding/OAuth verification. The core Gemini revision loop already works; this is a focused presentation and interaction pass, not a new application architecture.

Implements [DESIGN-PLAN.md](DESIGN-PLAN.md) and [PRODUCT-PLAN.md](PRODUCT-PLAN.md). Delivery status remains in [ORCHESTRATOR-PLAN.md](ORCHESTRATOR-PLAN.md).

## 1. Reference contract

Inspected the live Figma canvas, all 13 Margin / Cut journey frames, and the light showcase on November 9. The canvas also contains older Open Margin/wireframe alternatives and a dark showcase. Those are not release references. Figma shows prepared examples; actual feedback and writing will vary.

**Confirmed by the founder: journey composition + light-showcase controls.** Use pale-blue arrows on charcoal, readable control boundaries, and at least 44px interaction targets. Do not silently switch to the journey's blue arrow chips, faint control borders, 34px Finish target, or 10px essential labels.

| Reference | Node | Use |
|---|---|---|
| [Journey overview](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12659) | `5:12659` | Sequence and boundaries |
| [Select](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12692) | `5:12692` | First-use composition |
| [Preview and focus](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12716) | `5:12716` | Passage, lenses, optional context, send |
| [Reading](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12758) | `5:12758` | Explicit pending state |
| [First reading](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12780) | `5:12780` | Question, focus, observation, actions |
| [Write and refresh](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12810) | `5:12810` | Retained question while writing |
| [Revision preview](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12835) | `5:12835` | Refreshed passage, retained focus, explicit second send |
| [Second reading](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12865) | `5:12865` | Same feedback system, current passage |
| Setup; redirect; redirected reading | `5:12895`, `5:12928`, `5:12962` | Key field and student redirection |
| Request recovery; selection recovery; finish | `5:12992`, `5:13022`, `5:13044` | Distinct recoverable/exit states |
| [Light showcase](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=11-3291) | `11:3291` | Semantic colors, fonts, control states and geometry |
| [Docs context](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-13068) | `5:13068` | Host context; inspect during host validation |

"Exact" means matching the approved composition, component geometry, typography, and colors with a fixed synthetic fixture. Concise copy changes line breaks and screen heights, so first establish the revised copy/layout baseline; compare against that baseline rather than promising identical pixels to contradictory original screens. Live text must wrap and grow naturally.

Before implementation, reconcile the affected Figma frames with the confirmed controls and proposed copy. Preserve original frames as history; use a clearly named implementation-baseline copy. This plan does not edit Figma. Record every intentional exception in the comparison sheet; no undocumented approximations.

## 2. Preserve the product contract

- Product name: **yourIntelligent**. Margin / Cut is the design concept, not an app rename.
- Light only. Keep Docs as the writing surface.
- Capture and refresh are local. Only an explicit Gemini action sends the shown passage, focus and optional context.
- No per-send confirmation modal. No automatic retry, background reading, direct edits or replacement assignment prose.
- One question and one grounded observation. Exact evidence quotation is optional and subordinate.
- Second reading uses only the refreshed passage; no comparison, improvement score or old-draft inference.
- Custom focus, skip, disagreement and Finish remain available. The student never has to answer to continue.
- Keys remain in session memory. Sample mode is labeled and makes no provider call.
- Leave the functioning capture/provider adapters and request protections intact.

## 3. Visual specification

| Element | Implementation target |
|---|---|
| Host width | 300px reference, 16px region padding, 268px content width; use available host width without horizontal overflow |
| Header | 56px at default text size; 16px left and 8px right inset; compact wordmark and outlined Finish; grow if zoom/text requires |
| Surface structure | White shell, near-white heading/task zones exactly where the journey places them; avoid one undifferentiated white stack |
| Text | Charcoal `#202124`, secondary graphite `#3c4043`, helper slate `#5f6368` |
| Surfaces | White `#ffffff`, near-white `#f8f9fa`, unavailable mist `#edf0f2` |
| Accents | Blue `#1a73e8` for rules, links and focus; pale blue `#e8f0fe` for status surface and arrows on charcoal |
| Borders | `#dadce0` for passive dividers; `#5f6368` for essential control boundaries |
| Heading | DM Sans 500, 28/34px, -0.2px tracking; 22/28px retained question in writing state |
| Wordmark / lens title | DM Sans 500, 20px wordmark; 16/22px lens titles |
| Body / control | Roboto 400 body, 500 action labels; 14/20px body, 14/20px buttons |
| Helper / metadata | Readable 12/16–18px; Roboto for journey status labels, IBM Plex Mono where passage/system metadata calls for it; no blanket mono styling |
| Spacing | Named 4, 8, 12, 16, 20, 24px steps; retain measured 10/14px component insets where required |
| Primary | Charcoal pill, white label, pale-blue arrow; showcase baseline 44px minimum, 16px horizontal inset, 12px internal gap; expand for wrapping |
| Secondary | Outlined pill; two equal columns with 8px gap, stacked when text/zoom requires |
| Lens | 24px radius; 14px horizontal/12px vertical inset; native radio; charcoal selected surface and white text; readable selected indicator |
| Input | 4px radius, persistent label, slate boundary; masked key with adjacent Show/Hide action |
| Focus | Immediate 2px visible outline, 3px offset; pale-blue treatment against charcoal; no clipping |
| Decoration | Blue margin rules and small attribution marks only where shown; no added gradients, shadows, illustrations or glass effects |

The journey's 28px outer frame radius belongs to the canvas presentation. Google Docs owns the actual panel edge; do not put a clipped rounded phone-shaped frame inside it. Strip external frame captions such as "04 / First reading" from runtime UI.

Bundle the existing font assets. Confirm actual loaded weight and optical sizing before adjusting spacing to compensate for a font mismatch. Do not substitute Google Sans or add a component library to imitate the reference.

## 4. Screen-by-screen changes

These gaps come from source inspection versus live Figma. The deployed sidebar has not been visually re-audited during this planning slice.

| State | Current implementation gap | Planned result |
|---|---|---|
| Select | Plain metadata and heading; no hero/status construction; secondary buttons stacked | Shaded hero, blue margin rule, small truthful key/send status, capture CTA, paired sample/privacy actions |
| Preview | Extra "Your passage." heading, always-visible custom textarea, long notice, flat metadata | Passage/version and Not sent pill first; exact text with blue rule; lens stack; custom field only when selected; collapsed optional context; concise send summary |
| Pending | Only status text above existing screen | Dedicated Reading composition with submitted passage number and focus; navigation back to writing; Finish available; no new send while pending |
| Feedback | Focus omitted; actions all full-width; generic footer | Question heading zone, chosen focus, observation, optional exact quote, divider, primary action, paired alternatives, full-width disagreement action |
| Writing | Generic "Make it yours" replaces the question | Keep the actual question at 22/28px, passage attribution, short revision instruction, local refresh CTA |
| Revision preview | Reuses initial all-lens preview | Distinct refreshed-passage card, Not sent, compact current-focus card; Ask Gemini again, refresh and writing alternatives; Change focus opens the lens choices |
| Second / redirected reading | Generic feedback rendering | Reuse the feedback component with correct passage/focus; render no before/after claim |
| Key setup | Long paragraphs, separate full-width show button, unclear visual grouping | Figma hero, labeled masked field with Show/Hide, session helper, concise provider facts, link, session action; sample route clearly marked |
| Redirect | Sparse generic form | Question-led shaded hero, custom-focus field, optional context; return to exact-passage preview before explicit send |
| Request failure | Generic inline alert for every error | Journey recovery layout with cause-specific message/action; keep inline validation for a bad field; retain current request context |
| Selection failure | Generic alert above unrelated state | Selection-recovery composition with useful capture action and writing exit; no full-document fallback |
| Finish | Plain heading and stacked controls | Margin-rule hero, short session consequence, Close sidebar, paired Another passage / Forget key |

Behavior details to resolve during implementation:

- An in-flight request stays attached to its submitted snapshot. "Back to writing" must not falsely imply cancellation. A later response must not pull the student out of writing. Retain it for an explicit view only if the same snapshot is still valid; after refresh or changed request inputs, stale results stay suppressed. Test this explicitly.
- Return from Key & privacy to the requesting preview without sending automatically. No validation call merely to save the key.
- Redirect's primary action remains **Review passage**, followed by **Ask Gemini** on the preview. This preserves the working two-step behavior rather than copying the frame's direct-send variant.
- Keep the old question visible while writing, but never present it as feedback on the refreshed passage. Refreshed preview labels the new passage Not sent.
- Finish is reachable from writing, pending and recovery. Changing screens never waits for an animation.
- Keep privacy/key access reachable in the compact shell without adding another large button to every task screen. Check header fit; use a quiet utility link in the appropriate action region.

## 5. Concise copy baseline

Recommendations for approval in the implementation baseline; not yet applied to source or Figma. Keep warm editorial headings where they orient the student. Cut repeated explanations rather than reducing font size.

| Location | Current or Figma wording | Proposed wording |
|---|---|---|
| Select helper | "Select plain text in Docs — capture it here to preview before anything is sent." | "Select a passage in Docs. Preview it here before sending." |
| Capture action | "Use selected passage" | Keep: **Use selected passage** |
| Capture helper | "Local preview only. No full-document capture." | "Preview only. Nothing sent." |
| Preview heading | "Your passage." | Remove; use **Passage 1** and **Not sent** |
| Clarity description | "Clarity and connections" | "Connect your ideas." |
| Depth description | "Meaning behind the moment" | "Explore the meaning." |
| Voice description | "Voice and intention" | "Keep your voice." |
| Custom description | "Bring your own question" | "Choose what matters." |
| Optional context | "Add course context — optional" | **Course context (optional)** |
| Send helper | "Sends only this passage, your focus and added context to the configured provider. Charges and provider terms apply." | "Sends this passage, focus and any context to Gemini." Keep usage/terms facts in key setup. |
| Send action | "Ask Gemini" | Keep: **Ask Gemini**; refreshed preview: **Ask Gemini again** |
| Pending | "Reading your captured passage…" | **Gemini is reading.** / "Passage 1 · Sent" |
| Feedback footer | "One reading of captured passage 1. It does not follow live edits." | "Reading of Passage 1. Not live edits." |
| Writing instruction | "Revise in your document, then select your revised passage and refresh." | "Revise in Docs. Select your revision, then refresh." |
| Refresh helper | Two sentences explaining local refresh and second reading | "Refresh previews your selection. It doesn’t send it." |
| Refresh action | "Refresh selected passage" | Keep; clarity outweighs a shorter vague label |
| Refreshed preview | "Earlier feedback still belongs to Passage 1." | "Earlier feedback is for Passage 1." |
| Redirect heading | "What should I notice?" | Keep |
| Redirect primary | "Use my focus" | **Review passage**; this action navigates, not sends |
| Disagreement | "That’s not what I meant" | Keep; the student can contest interpretation |
| Show key | "Show / hide key" | **Show** / **Hide**, with accessible label identifying the key |
| Session helper | "Held only in this sidebar session. Never saved by the app." | "Kept only for this sidebar session." |
| Key primary | "Use key for this session" | Keep |
| Sample helper | "Prepared sample feedback. No AI request or API key is used." | "Prepared sample. No key or AI request." |
| Selection error | "Selection unreadable" | **Couldn’t read that selection.** / "Select plain text in Docs and try again." |
| Incomplete request | "That didn’t finish." | Keep, followed by the specific recovery |
| Finish helper | "Closing clears the app’s session key and working context. Provider-held data is separate." | "Closing clears this session’s key and context. It doesn’t delete data sent to Gemini." |

Keep key setup's account-usage, provider-processing and session-storage facts accurate. Do not turn an app storage statement into a promise about Gemini. Concision is not permission to change the meaning of those disclosures. This design pass does not investigate or resolve provider policy compatibility.

For recovery, write one cause and one viable next action: rejected key → edit key; usage limit → check account; unreadable selection → select plain text; uncertain outcome → explain it may still have processed and never retry automatically. Do not give every failure the same Try again button.

Dynamic AI text needs a separate treatment: aim for a single observation sentence and a single question, using the existing schema. Suggested prompt targets are 15–35 words for the observation and 8–20 for the question. These are editorial targets, not truncation rules or validated performance claims. Never clip a student's passage, evidence or model sentence to fake a screenshot match. Tighten provider instructions only in a separately verified change; preserve current-passage-only coaching constraints and safe output rendering.

## 6. Motion specification

This is a deliberate update to DESIGN-PLAN v0.3 and the light showcase's original no-motion annotation. All resting states must retain the approved design. Motion explains a change of state, not progress, achievement or a need to comply with AI.

Use plain CSS and, only where useful, the Web Animations API. No new animation dependency.

| Moment | Motion | Duration | Purpose / boundary |
|---|---|---|---|
| Button hover | Subtle token-based background/border change; no moving label | 120ms | Indicate interactivity without altering layout |
| Button press | Optional inner arrow shift of at most 2px; keep hit area fixed | 100ms | Acknowledge deliberate action; no scale/bounce |
| Focus choice | Background/border transition; selected text and radio semantics update immediately | 140ms | Confirm the student's chosen lens; no card-height animation |
| New major state | One content-region fade with at most 4px upward movement; shell remains still | 180ms | Maintain continuity through preview, feedback and writing |
| Capture / refresh succeeds | One brief opacity entrance on the new preview/status | 160ms | Signal that local capture finished; never imply a model request |
| Optional context / custom input | Open layout immediately; fade newly revealed content, without moving focus | 120ms | Explain disclosure without animated height or clipping |
| Pending request | Static "Gemini is reading" with real status announcement | None | No looping dots, fake percentages, shimmer or minimum waiting time |
| Error, focus, privacy consequence | Immediate visible state; no shake or delayed text | None | Keep recovery and consequences legible |
| Finish / close | Immediate navigation/close | None | Never slow the exit |

Use `--motion-feedback: 120ms`, `--motion-selection: 140ms`, `--motion-capture: 160ms`, `--motion-state: 180ms`, and `--ease-out: cubic-bezier(0.2, 0, 0, 1)` as proposed tokens. Use opacity/transform for entrances. Small control-color transitions are bounded; no animated shadows, filters, panel width/height or per-frame layout measurements.

One transition per user-visible event. Do not animate every paragraph or replay entrances on typing, Show/Hide, stale callbacks or minor renders. Content and controls are available immediately; no timer gates a request or focus. Fast responses skip pending theatrics. Avoid unreadable intermediate label/background combinations during selection changes.

With `prefers-reduced-motion: reduce`, disable these transitions and transforms and reveal states instantly. Keep the same information, keyboard focus and status announcements. No separate preference is needed for version one. All content remains visible if animations fail or are interrupted.

## 7. Engineering approach and slices

Keep TypeScript, native HTML/CSS, Vite preview, esbuild Apps Script packaging and existing fonts. Figma returns React/Tailwind reference code; translate its geometry into the existing stack rather than adding React or Tailwind.

Use small view functions/components for shell, heading zone, status, passage, lens, action row, feedback and recovery. This is a local sidebar refactor. A separate route system, database, design-system package or backend is unnecessary.

| Slice | Work | Completion evidence / next step |
|---|---|---|
| D1 — Baseline and shell | Reconcile Figma copy/control differences; map frame IDs to view states; establish deterministic sample fixtures; readable CSS sections/tokens; header, zones, typography, buttons, status and dividers | Side-by-side 300px screenshots for Select and Preview. Founder review, clarification, then D2 |
| D2 — Complete journey | Implement focus/custom/context, pending, feedback, retained question, distinct revision preview and refreshed-only second reading; shorten copy | Every 01–07 state compared to its baseline; no fabricated old/new comparison; sample and real state paths remain separate. Founder review, then D3 |
| D3 — Setup and recovery | Key form, redirect, cause-specific failures, selection recovery, finish; preserve entered values and exit paths | A–F references covered; keyboard/long-content/zoom checks. Founder review, then D4 |
| D4 — Motion and polish | Apply the bounded motion primitives only after static fidelity is accepted; reduced-motion and focus checks | Short normal/reduced-motion recordings; no replay on typing, stale updates or repeated captures. Founder review, then D5 |
| D5 — Real-host acceptance and assets | Build/upload development version; inspect in real Docs; run capture → read → revise → refresh → read → finish; capture updated synthetic listing/demo images; record case-study decisions | Real-host screenshots and loop evidence; update release-candidate version/assets before returning to publishing verification |

Primary implementation files:

- `assets/design-tokens.css`: canonical palette/type/spacing/component tokens and proposed motion tokens.
- `src/sidebar/styles.css`: replace global one-line rules with scoped component/zone styles; source all repeated values from tokens.
- `src/sidebar/main.ts`: view composition and copy; narrowly extend view state for pending and refreshed preview; preserve existing asynchronous protections.
- `src/shared/revision.ts`: only if a separate, justified prompt-concision change is needed.
- `DESIGN-PLAN.md`, this plan and `CASE-STUDY.md`: decisions, comparisons and evidence; no invented user-testing results.

Use stable shell and live-status regions. Avoid rebuilding the entire DOM on input or transient status changes; protect textarea values, focus and selection. Retain request-generation guards, duplicate prevention, safe text escaping and session-only credentials. Render previous-question context without adding the old passage to the provider payload.

At the end of each completed slice: show the relevant comparison evidence, say what changed and what remains, ask one material clarification, and name the next slice. No repeated approval questions about settled product behavior.

## 8. Acceptance criteria

**Visual fidelity**

- Compare exported Figma targets and runtime captures at the same CSS width, sample content, state, font readiness and browser scale. Freeze motion at rest for comparison.
- For approved fixed fixtures, match color/font/weight/line-height/radius exactly and investigate more than 2px discrepancy at key edges/insets. Document platform font rasterization differences rather than changing the design to chase them.
- Compare shell, hero, passage, lens, action and helper regions separately. Use overlays to find misalignment; do not hide differences with a single similarity score.
- All 13 journey states have a baseline and a runtime capture, including errors and sample labels. Dynamic long questions and passages must reflow without clipping.
- No unexpected horizontal scrolling at actual host width, short-height viewport or 200% zoom. Paired actions stack when needed. Header and focus rings remain usable.
- Exact student's text, line breaks and Unicode survive preview; passage display does not become a content-editing operation.

**Interaction and accessibility**

- One dominant action per state; essential context near the action. All labels describe their real effect.
- At least 44px targets; labeled inputs; native radio keyboard behavior; visible selected state beyond color; immediate visible focus.
- Heading focus after deliberate navigation; field-level errors near fields; persistent polite status region; actionable failures announced once without duplicate alerts.
- Redirection, custom focus and optional context preserve entered values. Navigation away from pending never resurrects a stale result or sends another request.
- Reduced motion is instant and complete. No animation delays focus, document editing, key forgetting or close.
- In real Docs, "Write in Docs" honestly describes the transition. Do not claim the host editor received keyboard focus unless observed.

**Regression and delivery**

- Run `npm run check` after app changes; add focused tests only for changed state/async behaviors, not every CSS rule or exact prose string.
- Recheck current-passage-only payload, explicit sends, no duplicate retries, stale-response suppression, exact capture and session cleanup after structural changes.
- No secrets in fixtures, recordings, commits or screenshots; synthetic text only for listing/case-study evidence.
- After host acceptance, prepare a new versioned release candidate. Version 1 is the earlier build, not evidence of this redesign.
- Public pages/listing imagery get a small alignment pass after the sidebar is settled. Branding/OAuth/Marketplace work remains pending until the founder returns to it.

## 9. Evidence and limits

Applied skills: Figma design-to-code (inspect exact nodes and reuse native stack/tokens), balise-ux-writing (task-based concise copy, correct action/consent/recovery meaning), animation-systems (purposeful motion, reusable durations/easing, performance and reduced motion).

Inspected source: current design/product plans, sidebar TS/CSS, design tokens, shared request/feedback schema and package dependencies. Inspected live Figma: page inventory, journey overview, all 13 state contexts/screenshots, light showcase. Did not modify Figma or application source, replay a Gemini request, deploy a redesign, run a new user study or establish improved agency in this planning slice.

Next: D1, producing the first reviewable Select + Preview comparison before expanding through the rest of the journey.
