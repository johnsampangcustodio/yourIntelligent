import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './styles.css';
import type { Feedback, RevisionRequest, RevisionResult } from '../shared/revision';

declare const __AION_TEST__: boolean;
const provider = __AION_TEST__ ? 'Aion Labs (test)' : 'Gemini';
type Runner = { withSuccessHandler(fn: (r: any) => void): Runner; withFailureHandler(fn: (error: { message?: string }) => void): Runner; capturePassage(): void; requestRevision(request: RevisionRequest, key: string): void };
declare const google: { script: { run: Runner; host: { close(): void } } };
type Stage = 'start' | 'preview' | 'pending' | 'feedback' | 'write' | 'redirect' | 'key' | 'finish';
const app = document.querySelector<HTMLElement>('#app')!;
const sample = 'During our group discussion, I stayed quiet because I thought everyone else understood the reading. Later, someone asked the same question I had. I learned that participation matters.';
const lenses = [
  ['clarity', 'Find the thread', 'Connect your ideas.'],
  ['depth', 'Go a layer deeper', 'Explore the meaning.'],
  ['voice', 'Keep it me', 'Keep your voice.'],
  ['custom', 'My own focus', 'Choose what matters.']
];
let stage: Stage = 'start', passage = '', focus = 'depth', custom = '', context = '', key = '';
let sampleMode = false, version = 0, revisedPreview = false, choosingFocus = false, contextOpen = false;
let error = '', errorKind: '' | 'selection' | 'request' = '', errorCode = '', busy = false;
let requestGeneration = 0, liveBusy = false, feedback: Feedback | null = null, feedbackVersion = 0, feedbackFocus = 'depth';
let pendingVersion = 0, pendingFocus = 'depth';
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const focusTitle = (id = focus) => lenses.find(l => l[0] === id)![1];
function button(label: string, action: string, kind = 'secondary') {
  return `<button type="button" data-action="${action}" class="button button--${kind}"><span>${escape(label)}</span>${kind === 'primary' ? '<span class="button__arrow" aria-hidden="true">→</span>' : ''}</button>`;
}
const pair = (...buttons: string[]) => `<div class="action-pair">${buttons.join('')}</div>`;
const divider = '<hr class="divider">';
const helper = (text: string) => `<p class="helper">${escape(text)}</p>`;
function hero(title: string, status: string, rule = false, compact = false) {
  return `<section class="hero${compact ? ' hero--compact' : ''}"><p class="eyebrow"><span class="margin-mark" aria-hidden="true"></span>${escape(status)}</p><h1${rule ? ' class="ruled-title"' : ''}>${title}</h1></section>`;
}
const keyLink = () => button('Key & privacy', 'key', 'text');
const sendSummary = () => helper(sampleMode ? 'Prepared sample. No key or AI request.' : `Sends this passage, focus and any context to ${provider}.`);
function passageCard(card = false) {
  return `<section class="passage-zone${card ? ' passage-zone--card' : ''}" aria-label="Captured passage"><div class="passage-meta"><span>Passage ${version}</span><span class="status-pill">${sampleMode ? 'Sample · ' : ''}Not sent</span></div><div class="passage">${escape(passage)}</div></section>`;
}
function lensChoices() {
  return `<fieldset class="lenses"><legend>Choose a focus</legend>${lenses.map(([id, title, desc]) => `<label class="lens"><input type="radio" name="focus" value="${id}" ${focus === id ? 'checked' : ''}><span class="lens__copy"><span class="lens__title">${title}</span><span class="lens__description">${desc}</span></span></label>`).join('')}</fieldset><div id="custom-field" ${focus === 'custom' ? '' : 'hidden'}><label class="field" for="custom">My own focus</label><textarea id="custom" maxlength="500" placeholder="What would you like the reader to notice?">${escape(custom)}</textarea></div>`;
}
function courseContext() {
  return `<details class="context" ${contextOpen ? 'open' : ''}><summary>Course context (optional)<span aria-hidden="true" class="disclosure-mark">+</span></summary><label class="sr-only" for="context">Course context (optional)</label><textarea id="context" maxlength="2000" placeholder="Add the assignment or a little context.">${escape(context)}</textarea></details>`;
}
function currentFocus(id = focus) {
  return `<div class="current-focus"><p class="eyebrow">Focus</p><p>${escape(focusTitle(id))}</p></div>`;
}
function updatePending() {
  const status = app.querySelector<HTMLElement>('#live-status')!;
  const message = liveBusy ? `Reading Passage ${pendingVersion}. You can keep writing in Docs.` : busy ? 'Capturing selection…' : '';
  if (status.textContent !== message) status.textContent = message;
  app.querySelectorAll<HTMLButtonElement>('[data-action=read]').forEach(b => b.disabled = liveBusy || busy);
  app.querySelectorAll<HTMLButtonElement>('[data-action=capture],[data-action=refresh]').forEach(b => b.disabled = busy);
}
function saveDrafts() {
  const value = (id: string) => app.querySelector<HTMLTextAreaElement>(`#${id}`)?.value;
  custom = value('custom') ?? value('direction') ?? custom;
  context = value('context') ?? context;
}
function focusContent() {
  const target = app.querySelector<HTMLElement>('[role=alert]') || app.querySelector<HTMLElement>('h1');
  target?.setAttribute('tabindex', '-1'); target?.focus();
}
function feedbackView() {
  if (!feedback) return '';
  return `${hero(escape(feedback.question), `${sampleMode ? 'Prepared sample' : provider} / Passage ${feedbackVersion}`)}<section class="task-content${revisedPreview ? '' : ' task-content--tinted'}">${currentFocus(feedbackFocus)}<p class="observation">${escape(feedback.observation)}</p>${feedback.evidenceQuote ? `<blockquote>${escape(feedback.evidenceQuote)}</blockquote>` : ''}${divider}${button('Write in Docs', 'write', 'primary')}${pair(button('Change focus', 'chooseFocus'), button('Skip question', 'write'))}${button('That’s not what I meant', 'redirect')}${helper(sampleMode ? 'Prepared example. Not based on your edits.' : `Reading of Passage ${feedbackVersion}. Not live edits.`)}</section>`;
}
function recoveryView() {
  const selection = errorKind === 'selection';
  const keyProblem = ['INVALID_KEY', 'KEY_REQUIRED'].includes(errorCode);
  const retry = !['INVALID_KEY', 'KEY_REQUIRED', 'PROVIDER_LIMIT', 'MODEL_UNAVAILABLE', 'SERVICE_PAUSED', 'REQUEST_IN_PROGRESS'].includes(errorCode);
  return `${hero(selection ? 'Couldn’t read<br>that selection.' : 'That didn’t<br>finish.', selection ? 'Not sent' : `Request incomplete · Passage ${pendingVersion}`, true)}<section class="task-content"><p class="recovery-message" role="alert">${escape(error)}</p>${selection ? `${button('Use selected passage', 'capture', 'primary')}${helper('Preview only. Nothing sent.')}` : `${currentFocus(pendingFocus)}${retry ? `${sendSummary()}${button('Try again', 'read', 'primary')}` : keyProblem ? button('Edit key', 'key', 'primary') : ''}`}${divider}${pair(keyLink(), button('Keep writing', 'write'))}</section>`;
}
function render(moveFocus = false) {
  // Keep the shell/live region stable when the view changes.
  if (!app.querySelector('#view')) app.innerHTML = `<header class="app-header"><span class="brand">yourIntelligent</span>${button('Finish', 'finish', 'finish')}</header><div id="live-status" class="sr-only" role="status" aria-live="polite"></div><div id="view"></div>`;
  let html = '';
  if (errorKind) html = recoveryView();
  else if (stage === 'start') html = `<section class="hero"><p class="status-pill status-pill--dot">Not sent · ${key ? 'key set' : 'no key set'}</p><h1 class="ruled-title">Start with<br>your words.</h1><p class="hero__description">Select a passage in Docs. Preview it here before sending.</p></section><section class="task-content">${button('Use selected passage', 'capture', 'primary')}${helper('Preview only. Nothing sent.')}${divider}${pair(button('Try sample', 'sample'), button('Key & privacy', 'key'))}</section>`;
  else if (stage === 'preview') {
    const compact = revisedPreview && !choosingFocus;
    html = `<section class="task-content task-content--tinted"><h1 class="sr-only">${compact ? 'Review your revision' : 'Choose your focus'}</h1>${passageCard(compact)}${compact ? `${helper(feedbackVersion ? `Earlier feedback is for Passage ${feedbackVersion}.` : 'Only this refreshed passage will be read.')}<div><p class="eyebrow">Current focus</p><div class="lens lens--summary"><span class="selected-mark" aria-hidden="true">●</span><span class="lens__copy"><span class="lens__title">${escape(focusTitle())}</span><span class="lens__description">${escape(focus === 'custom' ? custom : lenses.find(l => l[0] === focus)![2])}</span></span></div></div>` : `${button('Change passage', 'capture')}${divider}${lensChoices()}${courseContext()}`}${divider}${sendSummary()}${button(sampleMode ? 'Read sample feedback' : `Ask ${provider}${compact ? ' again' : ''}`, 'read', 'primary')}${compact ? `${button('Refresh preview (local)', 'refresh')}${pair(button('Change focus', 'chooseFocus'), button('Keep writing', 'write'))}` : keyLink()}</section>`;
  }
  else if (stage === 'pending') html = `${hero(`${escape(provider)} is<br>reading.`, `Sent / Passage ${pendingVersion}`, true)}<section class="task-content">${currentFocus(pendingFocus)}<p>You can keep writing in Docs.</p>${button('Back to writing', 'write', 'primary')}${helper(`This reading is for Passage ${pendingVersion}, not live edits.`)}</section>`;
  else if (stage === 'feedback') html = feedbackView();
  else if (stage === 'write') html = `${hero(feedback ? escape(feedback.question) : 'Make it yours.', sampleMode ? 'Sample walkthrough' : 'Write in Docs', false, true)}<section class="task-content">${feedback ? `<p class="eyebrow">Reading / Passage ${feedbackVersion}</p>` : ''}<p>Revise in Docs. Select your revision, then refresh.</p>${sampleMode ? `<div><label class="field" for="revision">Practice passage (local sample)</label><textarea id="revision" class="practice-passage">${escape(passage)}</textarea></div>` : ''}${button('Refresh selected passage', 'refresh', 'primary')}${helper('Refresh previews your selection. It doesn’t send it.')}${liveBusy ? `<p class="helper" data-reading-wait>Passage ${pendingVersion} is still being read.</p>` : feedback && feedbackVersion === version ? button('View reading', 'feedback') : ''}${pair(button('Change focus', 'chooseFocus'), button('Finish', 'finish', 'text'))}</section>`;
  else if (stage === 'redirect') html = `${hero('What should I<br>notice?', `Passage ${version} / Not sent again`)}<section class="task-content"><div><label class="field" for="direction">My own focus</label><textarea id="direction" maxlength="500" placeholder="Tell the reader what matters to you.">${escape(custom)}</textarea></div>${courseContext()}${sendSummary()}${button('Review passage', 'direction', 'primary')}${pair(button('Back to feedback', 'feedback'), button('Skip & write', 'write'))}</section>`;
  else if (stage === 'key') html = `${hero('Revise with AI.<br>Keep it yours.', key ? 'Session key set' : 'Key not set')}<section class="task-content"><p>AI offers a reading. You make the changes.</p><div><label class="field" for="key">Your ${provider} API key</label><div class="key-field"><input id="key" maxlength="512" type="password" autocomplete="off" spellcheck="false" value="${escape(key)}"><button type="button" class="key-reveal" data-action="show" aria-label="Show API key" aria-pressed="false">Show</button></div>${helper('Kept only for this sidebar session.')}</div>${divider}<p>Your passage, focus and context go to ${provider}. Your account pays for any usage.</p><p class="helper">${__AION_TEST__ ? 'Development test: synthetic text only. Aion’s own terms apply.' : 'Unpaid Gemini may use submissions for improvement and human review. Avoid sensitive or personal information.'}</p><a class="provider-link" href="${__AION_TEST__ ? 'https://www.aionlabs.ai/docs/' : 'https://ai.google.dev/gemini-api/terms'}" target="_blank" rel="noopener">Provider terms <span aria-hidden="true">↗</span></a>${button('Use key for this session', 'saveKey', 'primary')}${pair(button('Back to passage', 'back'), button('Forget key', 'forget'))}${button('Try sample', 'sample', 'text')}</section>`;
  else if (stage === 'finish') html = `${hero('Leave it <br>here.', 'Finish for now', true)}<section class="task-content"><p>Closing clears this session’s key and context. It doesn’t delete data sent to ${escape(provider)}.</p>${button('Close sidebar', 'close', 'primary')}${pair(button('Another passage', 'start'), button('Forget key', 'forget'))}${helper('Your writing stays in Docs.')}</section>`;
  const view = app.querySelector<HTMLElement>('#view')!;
  const previousState = view.dataset.state;
  view.dataset.state = errorKind || stage;
  view.innerHTML = `${__AION_TEST__ ? '<p class="test-banner">Aion Labs test · synthetic writing only</p>' : ''}${error && !errorKind ? `<p class="field-error" role="alert">${escape(error)}</p>` : ''}${html}`;
  view.classList.toggle('state-enter', moveFocus && !error && previousState !== view.dataset.state);
  updatePending();
  app.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(b => b.onclick = () => void act(b.dataset.action!));
  app.querySelectorAll<HTMLInputElement>('[name=focus]').forEach(r => r.onchange = () => {
    focus = r.value; requestGeneration++; feedback = null;
    const field = app.querySelector<HTMLElement>('#custom-field')!;
    field.hidden = focus !== 'custom';
    if (!field.hidden) app.querySelector<HTMLTextAreaElement>('#custom')?.focus();
  });
  for (const id of ['custom', 'context', 'direction']) app.querySelector<HTMLTextAreaElement>(`#${id}`)?.addEventListener('input', () => { saveDrafts(); requestGeneration++; });
  app.querySelector<HTMLDetailsElement>('.context')?.addEventListener('toggle', e => { contextOpen = (e.target as HTMLDetailsElement).open; });
  if (moveFocus) focusContent();
}

async function capture(refresh = false) {
  if (busy) return;
  if (typeof google === 'undefined') { error = 'Open the add-on in Docs to capture text, or try the sample.'; render(true); return; }
  requestGeneration++; busy = true; updatePending(); const generation = requestGeneration;
  google.script.run.withSuccessHandler(r => {
    busy = false;
    if (requestGeneration !== generation) { updatePending(); return; }
    if (r.ok && r.text) {
      passage = r.text; sampleMode = false; version++; revisedPreview = refresh; choosingFocus = false;
      stage = 'preview'; error = ''; errorKind = ''; feedback = null;
    } else { error = r.message || 'Select plain text in Docs and try again.'; errorKind = 'selection'; }
    render(true);
  }).withFailureHandler(failure => {
    busy = false;
    if (requestGeneration !== generation) { updatePending(); return; }
    const message = failure?.message || '';
    error = /function.*not found|script function/i.test(message) ? 'Capture is unavailable. Reopen the updated add-on.' : /authoriz|permission/i.test(message) ? 'Google authorization is required. Reopen the add-on to authorize document access.' : 'Capture didn’t finish. Select plain text in Docs and try again.';
    errorKind = 'selection'; render(true);
  }).capturePassage();
}
function readLive() {
  if (liveBusy || busy) return;
  if (!key) { stage = 'key'; error = 'Enter your API key to request a reading.'; render(true); return; }
  if (typeof google === 'undefined') { error = 'Live readings run inside Docs. Try the sample here.'; render(true); return; }
  if (focus === 'custom' && !custom.trim()) { error = 'Tell the reader what to focus on.'; choosingFocus = true; stage = 'preview'; render(true); return; }
  const generation = ++requestGeneration;
  const request: RevisionRequest = { id: crypto.randomUUID(), createdAt: Date.now(), passage, focus: focus as RevisionRequest['focus'], customFocus: custom, context };
  pendingVersion = version; pendingFocus = focus; liveBusy = true; feedback = null; stage = 'pending'; render(true);
  const failed = (code: string, message: string) => {
    errorCode = code; error = message;
    if (stage === 'pending') { errorKind = 'request'; render(true); }
    else if (stage === 'write') {
      // Replace only the waiting slot; never erase a field or steal writing focus.
      const waiting = app.querySelector<HTMLElement>('[data-reading-wait]');
      if (waiting) { waiting.textContent = message; waiting.setAttribute('role', 'alert'); }
      updatePending();
    } else updatePending();
  };
  google.script.run.withSuccessHandler((result: RevisionResult) => {
    liveBusy = false;
    if (generation !== requestGeneration) { updatePending(); return; }
    if (result.id !== request.id) { failed('INVALID_OUTPUT', 'This response didn’t match the request.'); return; }
    if (result.ok) {
      feedback = result.feedback; feedbackVersion = pendingVersion; feedbackFocus = pendingFocus;
      if (stage === 'pending') { stage = 'feedback'; render(true); }
      else if (stage === 'write') {
        updatePending();
        const waiting = app.querySelector<HTMLElement>('[data-reading-wait]');
        if (waiting) waiting.outerHTML = button('View reading', 'feedback');
        app.querySelector<HTMLButtonElement>('[data-action=feedback]')?.addEventListener('click', () => void act('feedback'));
        app.querySelector<HTMLElement>('#live-status')!.textContent = 'Your reading is ready.';
      } else updatePending();
    } else failed(result.code, ({
      KEY_REQUIRED: 'Enter a valid key for this provider.',
      SERVICE_PAUSED: 'AI readings are paused. You can keep writing in Docs.',
      INVALID_KEY: 'This key was rejected. Check the key and account permissions.',
      PROVIDER_LIMIT: 'Your usage limit was reached. Check your provider account.',
      MODEL_UNAVAILABLE: 'This model is unavailable for your account. Check your provider account.',
      INVALID_OUTPUT: 'The response didn’t match the reading format. You can request another reading.',
      REQUEST_ALREADY_USED: 'This request was already submitted. No duplicate was sent.',
      REQUEST_IN_PROGRESS: 'Another request is being submitted. Wait before trying again.',
      UNKNOWN_OUTCOME: 'The request may still have processed and used quota. No automatic retry was sent.'
    } as Record<string, string>)[result.code] || 'The request couldn’t finish. No automatic retry was sent.');
  }).withFailureHandler(() => {
    liveBusy = false;
    if (generation !== requestGeneration) { updatePending(); return; }
    failed('UNKNOWN_OUTCOME', 'The request may still be processing and use quota. No automatic retry was sent.');
  }).requestRevision(request, key);
}
function sampleReading() {
  const [observation, question] = focus === 'clarity' ? ['The final lesson is broader than the incident you describe.', 'How does this moment connect to the lesson you name?'] : focus === 'voice' ? ['“I stayed quiet” gives a direct account of your choice.', 'What do you want a reader to understand about that choice?'] : ['You describe someone voicing the question you had kept to yourself.', 'What changed in how you understood the room?'];
  feedback = { observation, question, evidenceQuote: null }; feedbackVersion = version; feedbackFocus = focus; stage = 'feedback';
}
async function act(a: string) {
  saveDrafts();
  if (a === 'show') {
    const input = app.querySelector<HTMLInputElement>('#key')!;
    const show = input.type === 'password'; input.type = show ? 'text' : 'password';
    const control = app.querySelector<HTMLButtonElement>('[data-action=show]')!;
    control.textContent = show ? 'Hide' : 'Show'; control.setAttribute('aria-label', show ? 'Hide API key' : 'Show API key'); control.setAttribute('aria-pressed', String(show)); return;
  }
  error = ''; errorKind = ''; errorCode = '';
  if (['key', 'finish', 'start', 'sample', 'direction', 'chooseFocus', 'forget', 'close', 'saveKey'].includes(a)) requestGeneration++;
  if (a === 'capture') { await capture(); return; }
  if (a === 'sample') { sampleMode = true; passage = sample; version++; feedback = null; revisedPreview = false; choosingFocus = false; stage = 'preview'; }
  else if (a === 'read') { if (!sampleMode) { readLive(); return; } sampleReading(); }
  else if (a === 'refresh') {
    if (sampleMode) {
      const next = app.querySelector<HTMLTextAreaElement>('#revision')?.value ?? passage;
      if (!next.trim() || next.length > 6000) { error = 'Use a passage of 1–6,000 characters.'; render(true); return; }
      passage = next; version++; revisedPreview = true; choosingFocus = false; stage = 'preview'; feedback = null;
    } else { await capture(true); return; }
  }
  else if (a === 'direction') { focus = 'custom'; choosingFocus = true; stage = 'preview'; }
  else if (a === 'chooseFocus') { choosingFocus = true; stage = passage ? 'preview' : 'start'; }
  else if (a === 'saveKey') {
    const value = app.querySelector<HTMLInputElement>('#key')!.value.trim();
    if (value.length < 10 || value.length > 512 || /https?:|\s/i.test(value)) { error = 'Enter an API key, not an API address.'; render(true); return; }
    key = value; stage = passage ? 'preview' : 'start';
  }
  else if (a === 'forget') { key = ''; stage = 'key'; }
  else if (a === 'back') stage = passage ? 'preview' : 'start';
  else if (a === 'close' || a === 'start') {
    passage = ''; custom = ''; context = ''; feedback = null; feedbackVersion = 0; version = 0; sampleMode = false; revisedPreview = false; choosingFocus = false; contextOpen = false;
    if (a === 'close') { key = ''; if (typeof google !== 'undefined') { google.script.host.close(); return; } }
    stage = 'start';
  }
  else if (a === 'feedback') { if (feedback) stage = 'feedback'; }
  else if (a === 'write') stage = 'write';
  else if (a === 'redirect') stage = 'redirect';
  else if (a === 'key') stage = 'key';
  else if (a === 'finish') stage = 'finish';
  render(true);
}
render();
