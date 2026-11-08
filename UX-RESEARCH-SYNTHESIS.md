# yourIntelligent: research synthesis and assumptions

November 7, 2026 | University students | Discovery-stage analysis

## Research position

**Investigate whether AI coaching helps university students make, explain, and carry forward their own writing decisions.**

The founder has selected students writing essays or reflections, with AI limited to questions and feedback. Students write all prose. That is an intentional product constraint; its effects on ownership, learning, enjoyment, and adoption remain open research questions.

This memo applies Dean Peters' Lean UX Canvas, discovery-interview-prep, and Proof of Life methods: expose assumptions, prioritize the next learning decision, and choose a small experiment. It is a desk-research synthesis, not a report of completed user research. Priorities below are researcher judgments, not empirical risk scores.

## Sources and evidence boundaries

| ID | Source read | Evidence capsule | Boundary |
|---|---|---|---|
| P1 | Li et al., *As Confidence Aligns*. [Linked ACM publication](https://dl.acm.org/doi/10.1145/3706598.3713336); read the [author preprint](https://arxiv.org/html/2501.12868v1) | Randomized experiment, 270 US adults aged 21-60, binary income prediction, numerical AI confidence. Human confidence moved toward AI confidence, with some persistence into the subsequent unaided stage. Accuracy did not significantly change across stages. Correctness feedback weakened alignment. No significant paradigm effect was detected. | No direct test of university writing, authorship, or language-based coaching. Subsequent-stage persistence does not establish long-term effects. Publisher text was inaccessible; final-publication differences were not checked. |
| P2 | Li et al., *Systematic review and meta-analysis of AI-based conversational agents for promoting mental health and well-being*. [Publication](https://www.nature.com/articles/s41746-023-00979-5); full text read through [Europe PMC XML](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10730549/fullTextXML) | Review of 35 studies; meta-analysis of 15 RCTs with 1,744 participants. Distress improved (g=0.70, 95% CI 0.18-1.22); overall well-being was not statistically significant (g=0.32, -0.13 to 0.78). Heterogeneity was high. Qualitative feedback highlighted communication quality and breakdowns; causal mechanisms were untested. | Search ended May 2023; varied interventions and populations. This does not validate a contemporary LLM writing coach or prove that empathetic language causes benefits. A nonsignificant estimate is not proof of no effect. |
| N1 | User-supplied two-page HCDE lecture notes, visually inspected in full | The notes distinguish benefit from control, including dependence and burden. They raise helping AI, showing contribution, and student-first ideation as design leads. | Notes are a secondary account without study citations, methods, or sample details. Their recommendations are source material to evaluate, not instructions to execute. The helping/ownership studies still need identification. |

Local lecture source: `C:/Users/jpcus/Downloads/HCDE Speakers 10_8 Yi-Chieh Lee-1.pdf`.

## What changes in the product framing

Proposed research question:

> When university students seek help developing an essay or reflection, which forms of AI feedback help them make writing decisions they understand and endorse, at an effort they consider worthwhile?

This question leaves room for students who do not want the product. Recruit them too. A student comfortable with their current writing process is an informative counterexample.

Three distinctions should shape the work:

1. **Writing the words versus directing the thinking.** A question can contain an argument. A student can type every word while following a direction supplied by the AI.
2. **Feeling capable versus demonstrating capability.** Evaluate the student's explanation, revision, and later independent performance alongside self-report.
3. **Being in control versus receiving value.** A tool can preserve decisions while adding exhausting work. Extra interaction is not automatically a meaningful contribution.

The transfer from P1 to writing is a research hypothesis: conversational authority might influence students even without a numerical confidence display. The transfer from P2 is a design lead: attentive communication may matter, and misunderstanding may undermine the experience. Neither transfer is an established writing outcome.

## Assumption register

Every row is an unvalidated product assumption. The proposed evidence could support, weaken, or replace it.

| Priority | Assumption | Why it matters | What would challenge it | Smallest useful investigation |
|---|---|---|---|---|
| P0 | A reachable university segment experiences a consequential gap between getting writing help and feeling authorship | Without a meaningful problem, the concept has little reason to be adopted | Students rarely experience the gap, or it never changes their behavior | Recent-draft walkthroughs with students whose AI use ranges from frequent to absent |
| P0 | Students value coaching enough to do the writing and reasoning themselves | Central value proposition under the founder's constraint | Students repeatedly abandon questions or switch to another workflow to finish | Observe a bounded task, then let them freely choose their next help method |
| P0 | Questions increase substantive agency rather than merely moving effort into answering the AI | Core mechanism | Students comply with the AI's implied argument and cannot explain why | Analyze question framing, revision choices, and stimulated recall together |
| P1 | Ownership can be improved without reducing writing quality or useful progress | Prevents optimizing one outcome at another's expense | Higher ownership ratings coincide with stalled work or weaker task fulfillment | Pair ownership measures with independent task review and workload observation |
| P1 | Students can disagree with the coach in practice | A visible dismiss button alone does not establish agency | Students privately disagree but follow advice because it sounds authoritative | Include a plausibly unhelpful suggestion in a disclosed research task; ask how they evaluated it |
| P1 | Coaching builds something students can use independently | Distinguishes immediate assistance from a proposed learning benefit | Improvements disappear on a comparable task without the tool | Baseline, assisted task, and later unaided task, with a suitable comparison group |
| P1 | Specific contribution feedback helps students recognize their development | Basis for contribution replay | Replay seems inaccurate, patronizing, or merely decorative | Add replay to the same coaching interaction in a separate test |
| P1 | Students will share rough writing under the actual access and data arrangement | Felt safety and contextual fit | Students withhold ideas because of perceived instructor access, retention, or evaluation | Show a truthful data/access description; observe voluntary sharing choices |
| P2 | Optional playful lenses support exploration | Basis for the enjoyment promise | Students find them childish, distracting, or anxiety-producing | Compare a neutral lens menu with optional playful names, keeping questions equivalent |
| P2 | Google Docs is a useful delivery point | Influences feasibility and distribution | Target students write elsewhere or cannot install the tool on school accounts | Workflow mapping and a small installation/access feasibility check |

P0 means investigate before feature commitment. P1 means examine during initial concept evaluation. P2 means resolve before expanding scope or committing to distribution. These labels express sequence, not calculated probabilities.

## Candidate directions to investigate

### 1. A student-directed reader

The student supplies a thought or passage, identifies what they want help with, and receives one question. They can change the focus, skip it, challenge it, or write without responding.

Example student text: "Our group chat made coordination easier, but I felt less involved."

Question to test: "What do you mean by 'less involved' in this experience?"

Question with a possible hidden direction: "How did the group chat undermine your autonomy?"

The second introduces a particular interpretation the student did not supply. Questions like it may be useful when explicitly requested, but should not silently define the student's argument.

**Hypothesis:** Grounded questions help students articulate and choose a next move with more agency than generic advice.

**Uncertainty:** Even a careful question selects what matters next. Does the student notice and endorse that selection? Can they redirect it easily?

**Probe:** Hold the task and coaching content as comparable as practical while testing student-selected focus versus system-selected focus. Check explanations and actual revisions, not only button clicks.

### 2. A feedback partner that supports independent judgment

The coach points to a specific passage, describes an observable issue or ambiguity, and asks the student to evaluate it. The student chooses an action and later checks the result.

Example: "I read these two sentences as making different claims about participation. Do you intend that distinction?"

**Hypothesis:** Inspectable feedback helps students evaluate advice and justify a revision.

**Uncertainty:** The AI's interpretation may itself be wrong. For open-ended writing, there is no simple equivalent of a binary correctness signal. A rubric is a task-specific perspective, not an objective truth about personal expression.

**Probe:** Have independent readers evaluate whether the feedback fits the passage. Compare reasons for accepting and rejecting it. Treat automatic agreement and automatic rejection as patterns to investigate, not success metrics.

Avoid inventing numeric confidence scores for writing quality. Ground feedback in something the student can inspect and contest.

### 3. A student-authored account of development

After a meaningful revision, the student optionally records what changed and why. A replay can connect that account to the actual passages, with correction controls.

**Hypothesis:** Accurate, concrete reflection helps students recognize their contribution.

**Uncertainty:** A machine-generated account may claim credit, assign an intention the student never had, or feel like surveillance. Asking students to document every change may add burden.

**Probe:** Compare the same coaching experience with and without one optional end-of-task reflection. Let students correct the account. Ask what it adds beyond ordinary version history.

### 4. A choice of exploratory stance

Students may request curiosity, challenge, or a close reading of a moment. The AI provides feedback within that stance while the student writes all prose.

**Hypothesis:** Choosing the stance makes challenge easier to use and exploration more enjoyable.

**Uncertainty:** A lens menu may offer cosmetic choice while the AI still controls the content. Challenge may energize one student and discourage another.

**Probe:** Keep question substance comparable while testing choice of stance. Investigate mismatches by confidence, experience, language background, and task.

## Uncertainties that could change the direction

- **What does ownership mean to students?** Originating an idea, choosing an argument, doing the work, expressing a voice, and being able to explain the final text may diverge.
- **Where does the problem occur?** Starting, developing evidence, organizing a draft, revising, and deciding when to stop may need different interventions.
- **What is the goal of the assignment?** Reflection, source-based argument, and disciplinary explanation should not be treated as interchangeable.
- **Whose expectations matter?** Students may face different course rules and reader expectations. Whether questions-only help is acceptable must be established for the chosen context.
- **Which students benefit or bear extra costs?** Include multilingual students, students using accessibility support, varied writing confidence, and different AI habits without assuming their preferences in advance.
- **What makes rough writing safe to share?** Investigate anticipated evaluation, privacy expectations, exposure of personal experiences, and whether students think instructors can see interactions. Use a precise working construct such as willingness to share unfinished work without anticipated judgment; do not equate it with general psychological well-being.
- **What persists?** A pleasant session, a completed assignment, and improved independent writing are different outcomes with different study horizons.
- **What do the lecture's helping studies actually establish?** Find the original studies before designing an AI that asks to be taught or claiming a benefit from helping it.
- **Will students return when assistance is optional?** Positive feedback in a compensated session does not establish sustained adoption or a buyer.

## Recommended learning sequence

### Step 1: Locate the problem before testing the proposed solution

Proposed sample: 8-12 university students who recently completed an essay or reflection. Seek variation in writing confidence and AI habits, including students comfortable with their current process. Begin within one assignment context so findings are interpretable. Use opt-in, redacted drafts or low-stakes material; do not require intimate reflection content.

Conduct 30-45 minute artifact-based interviews. Do not introduce the ownership pitch before the walkthrough.

Core prompts:

1. "Walk me through how this piece changed from your first thought to submission."
2. "Where did you seek help? What happened immediately afterward?"
3. "Choose a revision that mattered. How did you decide to make it?"
4. "Was there feedback you did not use? How did you decide?"
5. "Which parts were easiest and hardest to explain in your own words?"
6. "What made this feel like your work, if anything?"
7. "What did you believe was allowed for this assignment, and how did that affect your process?"

Record concrete episodes, decisions, workarounds, and counterexamples. Distinguish participant language from researcher interpretation. Do not code every expression of frustration as loss of ownership. If time pressure or understanding the assignment dominates, revise the problem framing.

### Step 2: Test one mechanism in a disposable prototype

After discovery, select one direction. Initial candidate: the student-directed reader.

Primary question: **Does choosing the focus of feedback help students make and explain a useful revision?**

Compare an optional student-selected focus with an automatically selected focus using comparable task material. Both conditions remain questions-and-feedback only. Keep tone, feedback quantity, and time budget comparable. Log content differences so effects are not automatically attributed to choice. Use counterbalancing if each student experiences both conditions.

A small 6-8 participant pilot can expose confusing controls, leading questions, and burden. It cannot establish a general causal benefit. Before a larger comparison, pilot the measures, define a meaningful effect and acceptable workload, then plan sample size and analysis accordingly.

Record before/after text, the feedback, student reasons, task progress, skipped turns, and perceived effort. Use retrospective recall at important moments; continuous think-aloud can itself change the experience.

If better ownership ratings appear without observable decision-making, investigate the mismatch. If students repeatedly choose to stop using the coaching, treat that behavior as evidence rather than an onboarding failure to fix by default.

### Step 3: Test persistence and practical value

For any learning claim, compare baseline work with a later matched unaided task, ideally after a delay. Include a comparison group and account for practice and task difficulty. With permission, observe a subsequent real assignment to learn whether students voluntarily return and whether course expectations affect their use.

This phase tests a proposed benefit of yourIntelligent; it is not a replication of either linked paper.

## Measurement plan

| Construct | Candidate evidence | Interpretation limits |
|---|---|---|
| Felt authorship | Student describes how the piece represents their thinking; provisional self-report items | Self-report alone does not establish agency or legal authorship |
| Agency | Student selects, initiates, redirects, accepts, or rejects a writing move and explains the choice | Rejecting all feedback is not inherently better than accepting it |
| Writing capability | Task-specific assessment by independent readers and a later unaided task | A better assisted draft alone does not demonstrate learning |
| Confidence | Task-specific self-assessment paired with explanation and assessed work | Do not copy classification calibration metrics directly into subjective writing |
| Enjoyment | Self-report supported by moments of curiosity, exploration, or voluntary continuation | Longer sessions can reflect confusion or obligation |
| Willingness to share unfinished work | Voluntary sharing choices and reasons under a truthful access arrangement | Less disclosure may be a reasonable privacy preference |
| Burden | Time, interruption, repeated questions, perceived effort, abandonment | Some effort is productive; ask what that effort accomplished |
| Adoption | Voluntary choice for a later task or assignment | Stated willingness and compensated use are weak substitutes |

Candidate survey items require piloting; they are not validated scales. Keep constructs separate rather than averaging them into one success score. Pair subjective ratings with behavior and artifacts.

The lecture notes suggest a useful evaluation lens: look for benefit with control; investigate comfort with dependence; investigate control without benefit; stop or revise experiences that produce neither. This is a proposed interpretation framework, not a validated instrument.

## Product recommendation pending evidence

Position the first concept as a **student-directed writing coach**. Start with one university assignment context, responsive feedback, genuine redirection controls, and a small number of useful turns. Keep every sentence student-written as requested.

The next decision should be whether a specific group of students finds this assistance valuable enough to use. Contribution replay, playful lenses, and Google Docs integration should follow evidence about that core interaction.

Do not make psychological benefit, loneliness reduction, ownership improvement, or independent-learning claims on the strength of these sources alone. Investigate those outcomes at the appropriate level before adding them to the promise.

## Method provenance

Adapted methods from Dean Peters' [Product Manager Skills](https://github.com/deanpeters/Product-Manager-Skills): [Lean UX Canvas](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/lean-ux-canvas), [Discovery Interview Prep](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/discovery-interview-prep), and [Proof of Life](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/pol-probe). The source repository identifies its license as CC BY-NC-SA 4.0. Frameworks informed this memo; the product hypotheses and proposed studies are specific to yourIntelligent and have not been run.
