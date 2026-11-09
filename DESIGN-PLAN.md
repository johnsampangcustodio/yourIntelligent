# yourIntelligent: design plan

Execution sequence, milestone gates, ownership, and delivery tracking are in [ORCHESTRATOR-PLAN.md](ORCHESTRATOR-PLAN.md).

November 9, 2026 | v0.4 | Margin / Cut fidelity pass and restrained motion plan

The current design execution specification is [DESIGN-IMPLEMENTATION-PLAN.md](DESIGN-IMPLEMENTATION-PLAN.md): inspected Figma references, confirmed source precedence, concise copy, implementation slices and acceptance checks. Design refinement now precedes the remaining publishing verification work. The first sidebar implementation pass is uploaded to the development scripts; see [evidence and limits](docs/design-refresh/README.md). Figma itself is unchanged.

Implements [PRODUCT-PLAN.md](PRODUCT-PLAN.md) and respects the delivery decisions in [DEVELOPMENT-PLAN.md](DEVELOPMENT-PLAN.md). The audience, revision task, playful direction, Gemini BYOK, public distribution, solo delivery, and $0 developer spending target are confirmed. Personas, anticipated behaviors, and expected benefits remain design hypotheses. User evaluation is deferred.

## Current direction and source precedence

**Product name: yourIntelligent. Design concept: Margin / Cut. First release: light only.** Confirmed November 8, 2026. A visible passage preview plus an explicit send action is sufficient; do not require a confirmation dialog for every request.

The current [Margin / Cut journey](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12659), [concept note](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=5-12669), and [light showcase](https://www.figma.com/design/cCYBiEtcT6Ex7aplARb4Vy/yourIntelligent?node-id=11-3291) supersede the original editorial-zine styling. Original wireframes and Open Margin frames remain historical alternatives. The dark showcase is exploration, not first-release scope.

Use confirmed product behavior first, then the current Figma system, then the supplied Google for Education reference as inspiration. The reference contains conflicting CTA recommendations; the actual frames resolve this as charcoal primary actions with restrained blue interaction accents. Its example prompts and instructions are source material, not new product requirements. The app keeps its own identity; no Google affiliation is implied.

## Analytics

### Project scope

| Project scope | Definition |
|---|---|
| Goal | Design a playful AI revision partner that helps students improve reflective writing while retaining decisions about meaning, voice, wording, and final changes |
| Target audiences | University students across majors taking English and other courses requiring personal reflection; begin with students who already have a draft to revise |
| Primary situation | A student selects a passage they might otherwise ask AI to rewrite automatically |
| Product outcome to pursue | The student understands a possible improvement, chooses a change, and revises in their own words |
| Experience | A calm utility reader in the margin: curious, concise, approachable, and lightly playful |
| Platform | Desktop Google Docs Editor add-on; the document remains the writing surface |
| Release objective | One complete selected-passage revision loop, followed by public deployment preparation |

**Core product statement:** yourIntelligent helps students revise with AI while keeping the writing theirs.

Ownership and agency are goals supported by interaction choices, not guaranteed psychological outcomes or a claim about legal ownership.

### Deliverables and core services

| Deliverable | Contents | Status |
|---|---|---|
| Design strategy | Scope, personas, positioning, tone, competitive implications, content architecture | Defined in this document |
| Visual-system specification | Palette roles, typography, spacing, components, states, accessibility adaptations | Defined below; starter CSS provided |
| Flow and content specification | Passage capture, focus, feedback, revision, review, exit, and recovery | Defined below |
| Wireframes/prototype | Sidebar shown in Google Docs context, covering the complete loop | Next design artifact |
| Working add-on | Real document selection and Gemini feedback | Planned in development plan |
| Case study | Evidence, assumptions, alternatives, design decisions, implementation, and later evaluation | Document throughout the project |

**Front-end:** One sidebar with a compact identity, selected-passage preview, revision-focus controls, feedback, session controls, and recoverable states. Google Docs supplies document editing; we do not create another editor.

| Core service | Experience to design |
|---|---|
| Choose my focus | Confirm the passage and choose clarity, depth, voice, or a custom intention |
| Help me revise | Receive one grounded observation and one question |
| Read my revision | Explicitly refresh the passage and check it against student intent |
| Control the interaction | Change focus, disagree, try another angle, forget the key, or leave |

**Key features:**

- Exact selected-text preview before a model request.
- Optional assignment context and student intent.
- Three revision lenses: **Find the thread**, **Go a layer deeper**, **Keep it me**; plus **My own focus**.
- A short feedback card tied to the captured passage.
- Clear transition back to student writing and an explicit refresh action.
- Session-only Gemini key entry and a visible way to forget it.
- Loading, empty, unsupported-selection, key, quota, and provider-failure states.

### Out of scope

- AI-written assignment passages, automatic rewrites, and insert/replace actions.
- Grades, plagiarism detection, authorship certificates, or guarantees about course acceptability.
- A full chat workspace, second document editor, or standalone dashboard.
- Saved chat/draft history, contribution replay, and cross-device continuity in the first release.
- Instructor monitoring, social features, streaks, and reward systems.
- A mobile add-on, dark theme, or elaborate marketing site for the first delivery.

### Constraints

| Constraint | Design consequence |
|---|---|
| Apps Script sidebar width | Google specifies 300px for script sidebars. Design one column with approximately 16px horizontal padding and a 268px content region; verify inside the host |
| Student continues writing in Docs | Keep the sidebar nonmodal; do not require an answer to every question |
| Explicit context capture | Show which version feedback concerns; provide Refresh passage instead of pretending to read live edits |
| Gemini BYOK | Explain key setup plainly and retain it only for the open sidebar session |
| $0 developer target | Use a small asset set and no required paid fonts, imagery, hosting, or model account |
| Personal reflections | Permit ordinary or redacted experiences; avoid pressuring students to disclose intimate material |
| Provider processing | Explain that selected text is sent to Gemini and that account/tier terms affect data handling and charges |
| Solo / ASAP | Reuse a small component system and build the whole narrow loop before adding features |

Platform source: [Google Apps Script sidebar reference](https://developers.google.com/apps-script/reference/base/ui#showsidebaruserinterface).

## Defining target audience

Ranked by first-release targeting. Both are provisional student profiles within the confirmed audience, not research-validated personas.

### Persona 1: The pragmatic reviser

**Demographics/context:** University student across majors, enrolled in English or a reflection-requiring course. Uses desktop Docs and can obtain a Gemini API key. Age, income, location, and year level are unspecified because we have no evidence requiring them.

**Objectives:**

- Identify a worthwhile revision quickly.
- Improve clarity and reflective depth while meeting the assignment's purpose.
- Finish with wording and decisions they can explain.

**Pain points:**

- Knows a passage needs work but does not know what to change.
- Generic feedback adds little direction.
- Automated revision may change meaning or voice.
- A long coaching conversation could cost more effort than it saves.

**Behaviors to investigate:** Rereads and tweaks sentences; may ask AI to revise a passage; evaluates whether to keep the result. This automation pattern comes from founder context, not observed participants.

**Motivations:** Useful progress, manageable effort, meeting course expectations, and retaining responsibility for the writing.

**Design implication:** Start with a passage and one useful revision opportunity. Keep the route to writing immediate.

### Persona 2: The expressive reviser

**Demographics/context:** University student revising a personal essay or reflection where nuance and voice matter. May be writing across languages or academic conventions; multilingual status is a possible context, not a presumed deficit or fixed persona attribute.

**Objectives:**

- Make a personal observation understandable without flattening its nuance.
- Check whether a reader understands the intended meaning.
- Preserve expressions they deliberately chose.

**Pain points:**

- Polished suggestions may feel unlike their voice.
- Reader feedback may assume an experience or conclusion they do not endorse.
- Personal material may feel uncomfortable to share.

**Behaviors to investigate:** Revisits particular phrases, asks readers how a passage comes across, and accepts some suggestions while resisting others.

**Motivations:** Authentic expression, being understood, and confidence in intentional choices.

**Design implication:** Offer an optional statement of intent, a voice lens, and an easy way to correct the AI's reading.

Instructors influence assignment expectations but are not a second customer-facing dashboard persona. Students without a suitable API key are a known first-release access limitation.

## Defining branding and messaging

### Brand purpose

Support students in making thoughtful revisions they understand and choose for themselves.

**Core brand idea:** The student is the author. AI is a reader in the margin.

**Proposed primary line:** **Revise with AI. Keep it yours.**

**Supporting line:** Thoughtful questions and feedback for your next revision. You choose what changes.

### Brand positioning statement

For university students revising reflections and personal essays, yourIntelligent is a playful revision partner inside Google Docs that helps them examine their writing and choose their next change through feedback grounded in their own words.

This is a positioning hypothesis. The differentiation depends on delivering the interaction; it is not a claim that other tools cannot coach or preserve voice.

### Brand voice and tone principles

| Principle | How it sounds | Example |
|---|---|---|
| Curious | Ask about something actually in the passage | "What changed in your understanding after this moment?" |
| Specific | Name the reader's observation before asking | "You name a lesson here, but the moment behind it is still unclear." |
| Respectful | Leave interpretation and action open | "Is that the distinction you intended?" |
| Lightly playful | Use exploratory labels and brief invitations | "Try another angle" |
| Plainspoken | Use everyday language | "What would you like to work on?" |
| Honest | Explain operational facts clearly | "This feedback is about the passage you captured." |

Keep this voice stable; vary tone by context. Exploration can be playful. Errors, keys, charges, and data handling should be direct and calm. Avoid forced praise, moral judgments about AI use, promises of a better grade, and language implying the student must satisfy the AI.

### Key messaging pillars

| Pillar | Message | Intended product evidence |
|---|---|---|
| Your decisions | Choose what you want to change | Focus/custom intent and usable redirection |
| Your meaning | Get feedback connected to what you wrote | Exact passage preview and grounded observation |
| Your words | Make the revision yourself | No automatic edits or generated replacement passages |
| Room to explore | Try an angle, keep what helps, move on | Optional lenses, another-angle action, and clear stop |
| Clear boundaries | Know what the tool uses | Explicit context capture and truthful Gemini key/data explanation |

These evidence points are planned behaviors until implementation. Do not advertise proven improvements in agency, confidence, or learning yet.

### Content examples

| Context | Proposed copy |
|---|---|
| First visit | "A fresh look at your draft. Questions and feedback; the changes are yours to make." |
| No selection | "Select a passage you'd like to work on." |
| Context capture | "Use selected passage" |
| Focus | "What would you like to work on?" |
| Main request | "Get revision feedback" |
| After feedback | "Make your changes in Docs. Refresh the passage when you want another look." |
| Alternative | "Try another angle" / "Change focus" |
| Key setup | "Use your Gemini API key for this session." |
| Key/data explanation | "Your selected passage and optional context are sent to Gemini. Charges and data handling depend on your Gemini account and service terms." |
| Forget key | "Forget key" |
| Failure | "That request didn't finish. Your document is unchanged." |

Key setup must also link to current provider terms and explain the relevant restrictions on personal/sensitive information, as specified in the development plan. Do not suggest that session-only app storage means Gemini does not process or retain content.

## Competitive analysis

Desk comparison of documented capabilities, checked November 7, 2026. It does not establish student preference, competitor effectiveness, or superiority. Opportunities below are our design interpretation.

| Alternative | Documented approach | Design implication for yourIntelligent |
|---|---|---|
| Gemini in Google Docs | Supports rewriting sections, adjusting tone, and accepting/rejecting proposed changes | Make a concise feedback-to-student-revision loop recognizable; being inside Docs alone is insufficient differentiation |
| Grammarly Authorship | Categorizes text origins and records aspects of the writing process when enabled | Keep felt authorship and revision decisions distinct from provenance reporting; do not imply our product certifies authorship |
| QuillBot Paraphraser | Produces rephrased text with selectable modes | Use lenses to select a feedback perspective; keep student revision as the core action |
| General-purpose chatbot used as a coach | A workflow alternative requiring separate investigation | A student may reproduce parts of our interaction with a prompt; demonstrate reduced setup and better contextual continuity |
| Peer reader / writing tutor | Human-help alternatives, not evaluated in this comparison | Preserve interpretation, dialogue, and redirection as design questions; make no claim of replacement |

Primary sources: [Gemini in Docs](https://support.google.com/docs/answer/14206696?hl=en), [Grammarly Authorship](https://support.grammarly.com/hc/en-us/articles/29548735595405-Introducing-Authorship), [QuillBot Paraphraser](https://quillbot.com/paraphrasing-tool).

### Main goals

1. Help students identify a useful revision through feedback tied to their text.
2. Make their control over focus, meaning, and final changes visible and usable.
3. Make the return to writing easier than continuing an unnecessary conversation.
4. Express a playful editorial identity while keeping feedback easy to read.
5. Make BYOK and context processing understandable before a request.

## Content structure outline

### Primary sidebar structure

1. **Identity and session utilities:** compact yourIntelligent wordmark, persistent Finish action, clear key status, Key & privacy, and forget-key action.
2. **Key setup, when needed:** masked input, session explanation, provider information, continue action. No document text sent merely to validate setup.
3. **Your passage:** capture/refresh control, exact preview, optional context. Long passages use an expandable preview without hiding what will be sent.
4. **Your focus:** three stacked lens choices and custom focus, each with a brief purpose.
5. **Feedback:** one prominent reader question, followed by chosen focus and its supporting observation; attribute feedback to Gemini and the captured passage version.
6. **Your next move:** invitation to revise in Docs; refresh for review, change focus, another angle, or finish.
7. **Recovery/help:** contextual message and useful next action. Preserve normal document editing.

### State inventory

Key missing, no selection, unsupported selection, passage ready, focus selected, request pending, feedback ready, student revising, refreshed passage, failed request, provider limit, forgotten key, and session ended. These are states of a compact flow, not separate dashboard pages.

### Supporting public content

For distribution: a concise product/how-it-works page or listing, install instructions, Gemini key guide, privacy/data explanation, and support contact. Use the same brand on the case study, but keep case-study content outside the student's writing flow. Public supporting pages do not require a full marketing web application.

## Visual design system

### Art direction: Margin / Cut

**Quiet utility. Visible boundaries. One next action.** Adapt the near-white Google-inspired scheme to a 300px student revision sidebar. The premium quality comes from hierarchy, concise writing, consistent controls, and explicit boundaries between local preview and provider processing.

The current frames replace cream/olive surfaces, serif app headings, yellow marks, and mono body text with near-white surfaces, DM Sans headings, Roboto text, rounded/pill controls, charcoal actions, and selective blue. Keep the brand curious and lightly playful through the language and freedom to explore. The interface should feel calm under coursework pressure.

### Palette and semantic roles

Extracted from the light showcase, rather than inferred from the supplied screenshot.

| Primitive | Value | Semantic role |
|---|---|---|
| White | `#ffffff` | Main sidebar surface and cards |
| Near white | `#f8f9fa` | Canvas and quiet supporting regions |
| Mist | `#edf0f2` | Unavailable-control surface |
| Gray | `#dadce0` | Passive dividers and decorative outlines |
| Graphite | `#3c4043` | Secondary text |
| Slate | `#5f6368` | Supporting text and recognizable control boundaries |
| Charcoal | `#202124` | Primary text, primary actions, selected focus fill |
| Blue | `#1a73e8` | Focus on light surfaces, links, restrained accents |
| Pale blue | `#e8f0fe` | Focus against charcoal and arrow accents on charcoal actions |
| Blue gray | `#dde7ee` | Supporting tint; no essential state conveyed by tint alone |

White labels sit on charcoal actions. Blue is not the primary CTA fill. Use pale-blue arrow details against charcoal rather than copying low-contrast blue-on-charcoal decoration from older journey frames. Essential control boundaries use slate rather than the faint passive-divider gray. Unavailable states remain readable with an explanation, not faded labels.

Warm white `#f6f6f4`, olive `#57584b`, ink olive `#2c2c26`, and warm border `#cdcec5` belong only to the illustrative document context. They are not core app tokens. Classroom green and yellow are not part of the app palette.

### Typography

Use the families actually present in the current frames: **DM Sans** for brand/headings, **Roboto** for body and controls, and **IBM Plex Mono** for selected passage metadata and design documentation. Do not introduce Google Sans or Product Sans merely because the reference names them. Verify bundled font licenses and loading in implementation; use system sans and monospace fallbacks.

| Role | Family / weight | Size / line height |
|---|---|---|
| Showcase display | DM Sans 500 | 56 / 64; tracking -1px; supporting artifacts only |
| Sidebar question / heading | DM Sans 500 | 28 / 34; tracking -0.2px |
| Sidebar title | DM Sans 500 | 22 / 28; tracking -0.2px |
| Wordmark | DM Sans 500 | 20 / natural line height |
| Lens subtitle | DM Sans 500 | 16 / 22 |
| Larger supporting body | Roboto 400 | 16 / 24 |
| Body and passage | Roboto 400 | 14 / 20 |
| Compact controls | Roboto 400 or 500 | 14 / 18–20 |
| Caption / helper | Roboto 400 | 12 / 16–18 |
| Short uppercase label | Roboto 400 | 12 / 16; tracking +0.4px |
| Passage metadata | IBM Plex Mono 400 or 500 | 12 / 18 |

DM Sans uses optical size 14 in the showcase; Roboto uses normal width 100. Fraunces and Arimo in the Docs mockup represent the host/document, not the app UI. Avoid copying the journey's isolated 10px selected label as essential text; use the readable caption scale and radio/selected indicator.

### Layout, shape, and motion

- One column, 300px wide, 16px horizontal padding, 268px working width. Verify this inside the real host.
- Current spacing inventory: 4, 8, 10, 12, 14, 16, 20, 24px. Use 8–12px for related items and 16–24px between regions.
- The current sidebar mockup has a 28px outer radius. This is presentation styling; the host owns the actual panel edge. Avoid a clipped rounded frame within the deployed sidebar.
- Lens cards use 24px radii and approximately 14px padding. Selected lenses use charcoal, a visible selected indicator, and white text.
- Primary actions use a pill shape, typically 28px radius in journey frames and 200px in the showcase. Secondary actions also use pills. Input fields use 4px corners. Retain 24–28px rounding for larger surfaces where shown.
- Minimum interactive target 44px; ordinary stroke 1px; focus outline 2px. Preserve visible separation around focus. Use a contrasting pale-blue focus treatment against charcoal.
- Paired secondary actions can use two 130px controls with an 8px gap when their labels fit. Stack them for wrapping, zoom, or longer labels.
- No decorative shadows or gradients. The November 9 design request supersedes the previous no-motion rule: allow only bounded 100–180ms action/selection/state feedback specified in DESIGN-IMPLEMENTATION-PLAN.md. Respect reduced motion with instant states. Loading uses truthful static status text, not simulated progress; errors, focus and exits are immediate.
- Full-height states can scroll. Keep the return to writing easy to find; verify real feedback and long passages at actual width and browser zoom.

### Components and interaction contracts

| Component | Preserve from updated frames | Implementation requirement |
|---|---|---|
| Header | yourIntelligent and Finish | Finish stays accessible without completing a task |
| Passage preview | Passage 1/2 and Not sent state | Capture and refresh are local; no provider request until explicit send |
| Lens choice | Stacked rounded choices; one selected focus | Native radio semantics; keyboard selection; custom focus remains available |
| Primary action | Charcoal pill, white label, small arrow detail | One dominant action per state; contextual label describes the next step |
| Secondary actions | Quiet outlined pills or text links | Change focus, Skip question, and correction remain usable |
| Reading | Question as focal heading; focus and observation beneath | One grounded reading, attributed to Gemini and the correct passage |
| Writing state | Retained question, Refresh selected passage | Student writes in Docs; refresh updates preview only |
| Key field | Persistent label, masked value, Show control | Session memory only; forget clears app references; never echo key in errors |
| Unavailable controls | Neutral fill and readable state explanation | Actual disabled semantics; no low-opacity labels |
| Recovery | Plain explanation, local refresh or deliberate retry | Preserve document editing; no automatic retries after uncertain outcomes |
| Dialog pattern | Rounded surface, one primary action | If needed: contain focus, Escape cancels, restore focus to trigger |

The showcase includes switches, checkboxes, and dialog examples as a component inventory. Their presence does not automatically add product features. In particular, **Keep session key** must never imply persistent key storage; any preference needs defined behavior before implementation. A disabled Full document checkbox is not a roadmap commitment. Custom focus must not be arbitrarily unavailable merely because the component sheet illustrates a disabled radio.

### Journey and boundaries from the updated frames

| Stage | Current frame | Student action and boundary |
|---|---|---|
| Select | `5:12692` | Use selected passage captures a local preview; Try sample is clearly identified |
| Preview and focus | `5:12716` | Check exact text, choose lens, optionally add context; Ask Gemini sends the visible request |
| Reading | `5:12758` | Show pending state for the captured passage; writing and exit stay available |
| First reading | `5:12780` | Question first, supporting observation; Write in Docs, Change focus, Skip question, or correct the interpretation |
| Write and refresh | `5:12810` | Manually revise in Docs; Refresh selected passage updates local context without sending |
| Revision preview | `5:12835` | Show Passage 2 as not sent; an explicit action requests another reading |
| Second reading | `5:12865` | Review whether the revision expresses student intent; no score or approval gate |
| Setup and recovery | `5:12895`–`5:13022` | Explain BYOK; redirect feedback; recover from request or selection failures |
| Finish | `5:13044` | Close, choose another passage, or forget the key; no mandatory reflection |

**Confirmed send pattern:** preview plus explicit send; no confirmation dialog on every request. The showcase's Send Passage 1 to Gemini dialog is an alternative pattern, not the default journey. New selections and refreshes must reset the visible send/version state. Feedback remains attached to its captured passage rather than following live edits.

**Exit design recommendation:** Finish opens the lightweight end state shown in the journey; no extra obligatory confirmation. Closing clears app session data, not provider-held data. Any future modal must serve a concrete task need and preserve an easy exit.

### Rules that survive the visual change

Students supply the assignment prose, choose the context and focus, evaluate feedback, and decide whether to change anything. No automatic rewriting, insertion, grading, forced disclosure, or completion gate. Ordinary document editing remains available during requests and failures. BYOK does not imply free usage or provider privacy. Benefits to agency, confidence, and enjoyment remain hypotheses until evaluated.

## Design handoff and next artifacts

The current Figma contains the 13-state Margin / Cut journey, a Docs context view, and light/dark system showcases. These are design artifacts with prepared example feedback, not evidence of a working add-on or validated usability.

1. Use the linked light showcase and current journey as the implementation baseline; retain earlier concepts as history.
2. Apply the revised starter CSS tokens. The older serif/olive/yellow core app rules are superseded.
3. Reconcile selected-state labels, arrow/focus contrast, and component-only examples during implementation.
4. Verify selection capture, local refresh, explicit send, session key handling, scroll, keyboard access, zoom, and error recovery in the real Docs spike.
5. Keep public distribution preparation and later user evaluation in the product/development sequence. Dark mode remains outside the first release.

## Decisions confirmed November 8, 2026

- Product name remains **yourIntelligent**; **Margin / Cut** names the design concept.
- Ship **light only** in the first release. The dark showcase remains exploratory.
- **Visible preview plus explicit Send is enough**; no per-send confirmation dialog.

## Skill and source provenance

Applied the local figma-use skill to inspect current canvas layers, exact typography, component dimensions, and semantic roles, and visually reviewed the light showcase. Sources: the linked Figma frames, user-provided overview screenshot, and the Google for Education style-reference text at `C:/Users/jpcus/.codex/attachments/386af19c-4c31-4e4a-b014-d1189badeb5d/Pasted text.txt`. The user's answers resolve naming, release theme scope, and send confirmation. This revision updates the local plan and starter tokens; it does not modify Figma.

### Confirmed implementation decisions - November 9, 2026

Gemini remains the release provider. Aion Labs is restricted to a synthetic document-bound development test build. Each explicit reading assesses only the current captured passage, chosen focus and optional context; a second reading sends no prior draft and makes no comparison claim. Refresh remains local until the student explicitly sends. The API key stays in sidebar memory and is never persisted by the app. See docs/LIVE-PROVIDER-CHECKLIST.md for implementation evidence and pending live acceptance.
