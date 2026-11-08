# yourIntelligent: product ideation, version 0.1

Date: November 7, 2026

## Decisions from the founder

- Initial audience: college/university students writing course reflections and personal essays.
- AI role: ask questions and give feedback. Students write all prose.
- Initial delivery concept: a Google Docs extension. The integration approach remains to be investigated.
- Desired experience: ownership, creative confidence, safety to explore, and enjoyment while writing with AI.
- Experience direction confirmed later: a playful writing partner that helps students explore their ideas.
- Eventual deliverables confirmed later: a product/design case study and a working Google Docs extension intended for deployment. See [PRODUCT-PLAN.md](PRODUCT-PLAN.md) for the current product and design plan.
- Latest scope: revision of existing student writing in English and other courses requiring personal reflection; solo project, ASAP. The current product plan supersedes the broader idea-development scenarios below for the first release.

This is a discovery brief. The concepts and expected benefits below are hypotheses, not validated customer findings. No interviews, competitor analysis, research replication, or integration feasibility tests have been conducted for this brief. A subsequent review of the two supplied papers and lecture notes is documented in [UX-RESEARCH-SYNTHESIS.md](UX-RESEARCH-SYNTHESIS.md); it separates source findings from proposed applications to university writing.

## Product hypothesis and pitch

**yourIntelligent is a Google Docs extension that helps students develop writing they feel proud to own through thoughtful questions, playful exploration, and feedback grounded in their own ideas. Students write every sentence.**

Short pitch: **Your ideas. Your words. Help thinking them through.**

Here, ownership means felt authorship, agency, and the ability to explain one's writing. The pitch does not make a legal ownership claim.

The central hypothesis: students will value assistance that makes their own thinking more visible and consequential throughout writing, even when assistance that generates prose is available elsewhere.

## Problem framing

The founder's notes describe a possible gap: students can invest effort in prompting an AI yet feel detached from the resulting work. Starting with their own idea may help, but the subsequent interaction may still transfer too much creative direction to the system.

Working problem statement: **Students who want help developing an essay or reflection may struggle to get useful AI support while retaining responsibility for its ideas, reasoning, and expression.**

How might we help students make progress through their own observations and decisions, while making the effects of those contributions visible?

Assumptions to challenge:

- This problem is frequent and important enough for students to change their workflow.
- Students experience the loss of ownership described in the notes; this will vary by student and writing task.
- Specific, responsive questions help more than a generic checklist.
- Students will tolerate some additional reflection when the payoff is clear.
- Fun means curiosity and discovery for this audience; points and streaks may have little value.
- Google Docs is where enough of the target students already write.
- A constrained coaching tool offers value beyond a student asking an existing chatbot to act as a tutor.

The claims in the founder's notes about loneliness, mood, helping AI, and first contribution have no attached sources yet. Obtain the studies and check participants, tasks, interventions, and limitations before using them as evidence. Reduced loneliness is outside the initial product promise.

## Jobs to be done: hypotheses to investigate

| Dimension | Student progress sought | Possible pain | Desired gain |
|---|---|---|---|
| Functional | Turn an observation or position into a clear essay or reflection | Unsure what to develop, how to connect ideas, or where reasoning is weak | An actionable next writing move |
| Emotional | Feel capable of developing and revising an idea | Dependence on feedback; discomfort sharing rough thinking | Confidence based on a visible improvement they made |
| Social | Submit and discuss work that represents their understanding | Difficulty explaining a polished argument | Ability to explain and stand behind the piece |

These are proposed jobs, not interview findings. Investigate their importance using recent writing experiences and actual drafts, rather than asking only whether students like the product idea.

## Opportunity and solution exploration

Candidate outcome: increase students' felt authorship and ability to explain their writing while preserving useful progress and an acceptable workload. Establish a baseline during discovery before setting a product target.

All opportunity statements below are unvalidated. All AI output is limited to questions, feedback, and descriptions of observed changes; it supplies no essay prose, replacement sentences, thesis wording, or finished outlines.

| Opportunity | Solution hypothesis | Cheap experiment |
|---|---|---|
| I have an idea but do not know how to develop it | **Curious reader:** ask one question about a particular claim or observation in the student's own text | Compare a specific question with a generic development checklist |
| I have an idea but do not know how to develop it | **Experience explorer:** invite the student to recall an example, contradiction, or concrete detail | Observe whether the response produces a student-written addition they consider useful |
| I have an idea but do not know how to develop it | **Connection finder:** point to two student-written passages and ask how they relate | Test whether students can articulate and write their own connection |
| I lose control of the direction while getting help | **Choose the help:** student requests clarification, challenge, or reflection | Compare chosen feedback with automatically selected feedback |
| I lose control of the direction while getting help | **Question the feedback:** student can disagree, redirect, or request another question | Observe whether students meaningfully redirect the coach and revise on their own terms |
| I lose control of the direction while getting help | **Protect my intent:** student states an intended meaning; feedback checks for drift and asks about it | Test whether students identify and resolve a genuine mismatch |
| I cannot see what my contribution changed | **Contribution replay:** connect a student-stated decision to the passage they changed | Compare a factual replay with no replay after the same coaching flow |
| I cannot see what my contribution changed | **Explain my choice:** invite the student to describe a consequential revision in their own words | Check whether this feels useful or repetitive |
| I cannot see what my contribution changed | **Return to my starting point:** show the initial idea beside the current writing and invite reflection | Test whether students recognize development, including changes of mind |

## Provisional first concept

Start with **Curious reader**, give the student control over the type of help, and test **Contribution replay** separately afterward.

Rationale: the core question is whether responsive feedback produces a useful writing move. A replay cannot compensate for unhelpful coaching. A small conversation prototype can test that core without building the Google Docs integration.

The student's own starting text comes before topic-specific AI suggestions. They can start with a fragment, question, uncertainty, rough paragraph, or voice-dictated observation; there is no minimum word requirement. An empty document offers a neutral invitation to record a thought, rather than an AI-generated topic or argument.

Example: a student writes, "Our group chat made it easier to coordinate, but I felt less involved."

1. The student chooses **Explore my idea**.
2. The AI asks, "Can you recall a moment when coordination became easier but you felt less involved?"
3. The student recalls an incident and writes it into the reflection themselves.
4. Feedback points to the passage and asks, "What changed between being informed and being involved?"
5. The student develops, rejects, or changes that distinction and writes the next passage.
6. If enabled in a later experiment, a replay accurately links the student's observation and revision: "You added the group-chat incident after exploring what involvement meant to you."

The system must allow the student to reject its interpretation. It should not present an inferred mental process as a fact.

## Making it fun and safe to explore

- Optional lenses such as **Curious reader**, **Friendly skeptic**, and **Zoom into a moment** change the question style. The student selects whether to use them.
- One question at a time, followed by room to write. Avoid an endless interview.
- Feedback refers to a specific passage and a possible next action, without grading the student or assigning a creativity score.
- The student can skip, dismiss, disagree, stop, or write independently at any point.
- No reward for accepting advice. A thoughtful rejection is a valid exercise of agency.
- Make specific observations about real changes; avoid automatic praise or pretending the AI needs the student emotionally.
- Support changes of mind. Ownership includes revising one's position.

Whether these choices improve enjoyment or willingness to share rough work remains to be tested.

## First Proof of Life probe

**Question:** Does one question grounded in a student's draft help them make a useful revision with more agency than generic feedback?

**Risk:** Coaching may feel like more work without a meaningful improvement.

**Prototype:** A disposable text editor and manually facilitated coaching panel. Disclose human facilitation. No Google Docs integration is needed for this test.

**Participants:** Start with 6-8 students from one defined education level and writing context. Select that context before recruitment; include students with different confidence levels. Use a practice task for which the coaching is permitted.

**Comparison:** Each student completes two short, comparable writing tasks. Both conditions begin with student text and provide no generated prose. One condition gives generic development feedback; the other asks a question tied to the student's text. Alternate condition order and task assignment to reduce order and topic effects. Keep available time and feedback opportunities comparable. This isolates contextual coaching, rather than simultaneously changing drafting behavior and feedback.

**Signals:**

- Before and after: self-report on a 1-7 scale for "This writing expresses my thinking" and "I decided how to develop this piece."
- Student can explain a consequential revision and why they made it.
- Whether the student actually changes the text, and whether they find that change useful.
- Frustration, skipped questions, elapsed time, and whether questions interrupt writing flow.
- Writing quality reviewed against the same task criteria without revealing the condition where practical.
- Which approach they choose for another comparable task, with a reason.

**Proposed decision rule, to agree before testing:** Continue if at least 5 of 8 students prefer contextual coaching, can identify a useful revision it helped them make, and report at least as much agency as with generic feedback. Rework the interaction if several describe it as an interrogation or produce no useful revision. Treat inconclusive results as inconclusive. Small-sample results guide design; they do not establish a general psychological effect.

**Timeline:** One day to prepare, two days for sessions, one day to synthesize. Founder is the provisional owner. After synthesis, retire the prototype and retain only the agreed research records and learning summary. Do not promote disposable test code into the product by default.

**Separate follow-up test:** Add or remove contribution replay while keeping coaching constant. This tests whether showing impact adds value beyond the questions themselves.

## Candidate minimum product, after evidence supports it

One writing task and a small loop:

1. Student supplies their own starting thought or selects their own passage.
2. Student requests a kind of help.
3. AI provides one grounded question or piece of feedback.
4. Student writes or revises and can request another round.

Include clear skip/stop controls and handling for unhelpful questions. Enforce the no-generated-prose boundary even if asked to write the assignment. Offer feedback on the student's attempt instead. Test this boundary explicitly during prototype evaluation.

Contribution replay is a candidate addition only if its separate test supports it. Full drafting, automatic rewrites, grades, plagiarism detection, social feeds, and streaks are outside the initial concept.

## What product ideation should address next

| Stage | Decision to make | Deliverable / relevant installed skill |
|---|---|---|
| 1. Narrow the student context | Education level, essay versus reflection, trigger, and permitted help | Proto-persona and a specific jobs-to-be-done hypothesis |
| 2. Validate the problem | When detachment happens and what students currently do about it | Discovery interview plan and evidence log / discovery-interview-prep |
| 3. Inspect the research | Which findings support which interaction mechanisms | Source matrix with limitations and open assumptions |
| 4. Compare alternatives | Why a student would switch from their existing workflow or a chatbot coach | Competitive research snapshot and positioning hypothesis |
| 5. Test the interaction | Whether responsive questions help enough to justify their effort | Proof of Life probe and observed results / pol-probe |
| 6. Check delivery feasibility | Appropriate Google Docs integration, document access, feedback placement, data flow, and school-device installation constraints | A short technical spike; verify current platform documentation at that stage |
| 7. Define the viable product | One task, essential behavior, boundaries, and success measures | Lean UX canvas, user story map, and a concise PRD |
| 8. Establish the business path | Student versus institution as buyer; access to first users; willingness to pay | Positioning, buyer interviews, and acquisition hypothesis |
| 9. Plan the pilot | What evidence warrants expanding beyond the first context | Outcome-based roadmap with continue/change/stop decisions |

Problem interviews should focus on a recent essay or reflection: where the student got stuck, what help they sought, how their draft changed, and how they felt about submitting and explaining it. Avoid leading with the pitch.

Later research should include educators' expectations and students who rely on accessibility or language support. A product constraint that seems helpful for ownership can affect students differently. These perspectives are missing from the current founder-only brief.

## Open questions

- Which education level and assignment type should the first test focus on?
- Is this primarily a research project, a portfolio prototype, or a product intended for a paid launch?
- Which studies underpin the initial notes?
- Who can provide access to students and to the relevant assignment expectations?
- What time, budget, and implementation capacity are available?
- Is Google Docs a firm requirement or a preferred eventual home?

## Skills and provenance

Applied methods: Jobs to Be Done, Opportunity Solution Tree, and Proof of Life testing from Dean Peters' [Product Manager Skills](https://github.com/deanpeters/Product-Manager-Skills). This brief adapts those methods to the founder's context; it does not represent validated output from a completed discovery workshop.

All 77 repository skill directories were installed into `C:/Users/jpcus/.codex/skills/` and their `SKILL.md` files checked for presence on November 7, 2026. Repository tree recorded during verification: `cfcb697f14b8891d8b3ec43c16c3547df3e70e13`. Source skill files were installed without changes. The repository identifies its license as CC BY-NC-SA 4.0; see its [license](https://github.com/deanpeters/Product-Manager-Skills/blob/main/LICENSE).
