import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './styles.css';
import type {Feedback,RevisionRequest,RevisionResult} from '../shared/revision';
declare const __AION_TEST__:boolean;
const provider=__AION_TEST__?'Aion Labs (test)':'Gemini';
type Runner={withSuccessHandler(fn:(r:any)=>void):Runner;withFailureHandler(fn:(error:{message?:string})=>void):Runner;capturePassage():void;requestRevision(request:RevisionRequest,key:string):void};
declare const google:{script:{run:Runner;host:{close():void}}};
const app=document.querySelector<HTMLElement>('#app')!;
const sample='During our group discussion, I stayed quiet because I thought everyone else understood the reading. Later, someone asked the same question I had. I learned that participation matters.';
const lenses=[['clarity','Find the thread','Clarity and connections'],['depth','Go a layer deeper','Meaning behind the moment'],['voice','Keep it me','Voice and intention'],['custom','My own focus','Bring your own question']];
let stage='start',passage='',focus='depth',custom='',context='',key='',sampleMode=false,version=0,error='',busy=false;
let requestGeneration=0,liveBusy=false,feedback:Feedback|null=null,feedbackVersion=0;
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
function button(label:string,action:string,primary=false){return `<button data-action="${action}" class="${primary?'primary':''}">${label}</button>`;}
function updatePending(){
 const status=app.querySelector<HTMLElement>('[role=status]');
 if(status)status.textContent=liveBusy?'Reading your captured passage…':busy?'Capturing selection…':'';
 const read=app.querySelector<HTMLButtonElement>('[data-action=read]');
 if(read&&!sampleMode)read.disabled=liveBusy||busy;
 app.querySelectorAll<HTMLButtonElement>('[data-action=capture],[data-action=refresh]').forEach(b=>b.disabled=busy);
}
function focusContent(){
 const target=app.querySelector<HTMLElement>('[role=alert]')||app.querySelector<HTMLElement>('h1');
 target?.setAttribute('tabindex','-1');target?.focus();
}
function render(moveFocus=false){
 app.innerHTML=`<header><span class="brand">yourIntelligent</span><button class="quiet" data-action="finish">Finish</button></header><div role="status" aria-live="polite">${liveBusy?'Reading your captured passage…':busy?'Capturing selection…':''}</div>${error?`<p class="error" role="alert">${escape(error)}</p>`:''}`;
 let html='';
 if(stage==='start')html=`<p class="meta">LOCAL PREVIEW · ${key?'KEY SET':'NO KEY SET'}</p><h1>Start with<br>your words.</h1><p>Select plain text in Docs — capture it here to preview before anything is sent.</p>${button('Use selected passage','capture',true)}<p class="meta">Local preview only. No full-document capture.</p>${button('Try sample','sample')}${button('Key & privacy','key')}`;
 if(stage==='preview')html=`<p class="meta">${sampleMode?'SAMPLE · ':''}PASSAGE ${version} / NOT SENT</p><h1>Your passage.</h1><div class="passage">${escape(passage)}</div>${button('Change passage','capture')}<fieldset><legend>Choose a focus</legend>${lenses.map(([id,title,desc])=>`<label class="lens"><input type="radio" name="focus" value="${id}" ${focus===id?'checked':''}>${title}<small>${desc}</small></label>`).join('')}</fieldset><label class="field" for="custom">My own focus (optional)</label><textarea id="custom" maxlength="500">${escape(custom)}</textarea><details><summary>Add course context — optional</summary><textarea id="context" aria-label="Course context" maxlength="2000">${escape(context)}</textarea></details>${sampleMode?'<p class="notice">Prepared sample feedback. No AI request or API key is used.</p>':'<p class="notice">Sends only this passage, your focus and added context to the configured provider. Charges and provider terms apply.</p>'}${button(sampleMode?'Read sample feedback':`Ask ${provider}`,'read',true)}${button('Key & privacy','key')}`;
 if(stage==='feedback'&&sampleMode){
 const feedback=focus==='clarity'?['The final lesson is broader than the incident you describe.','How does this moment connect to the lesson you name?']:focus==='voice'?['“I stayed quiet” gives a direct account of your choice.','What do you want a reader to understand about that choice?']:['You describe someone voicing the question you had kept to yourself.','What changed in how you understood the room?'];
 html=`<p class="meta">PREPARED SAMPLE / PASSAGE ${version}</p><h1>${feedback[1]}</h1><p>${feedback[0]}</p>${button('Write in Docs','write',true)}${button('Change focus','preview')}${button('Skip question','write')}${button('That’s not what I meant','redirect')}<p class="meta">This example does not follow live edits.</p>`;
 }
 if(stage==='feedback'&&!sampleMode&&feedback)html=`<p class="meta">${escape(provider.toUpperCase())} / PASSAGE ${feedbackVersion}</p><h1>${escape(feedback.question)}</h1><p>${escape(feedback.observation)}</p>${feedback.evidenceQuote?`<blockquote>${escape(feedback.evidenceQuote)}</blockquote>`:''}${button('Write in Docs','write',true)}${button('Change focus','preview')}${button('Skip question','write')}${button('That’s not what I meant','redirect')}<p class="meta">One reading of captured passage ${feedbackVersion}. It does not follow live edits.</p>`;
 if(stage==='write')html=`<p class="meta">${sampleMode?'SAMPLE WALKTHROUGH':'WRITE IN DOCS'}</p><h1>Make it yours.</h1><p>Revise in your document, then select your revised passage and refresh.</p>${sampleMode?`<label class="field" for="revision">Practice passage (local sample only)</label><textarea id="revision">${escape(passage)}</textarea>`:''}${button('Refresh selected passage','refresh',true)}<p>Refresh updates the local preview without sending. Your next reading assesses only the refreshed passage.</p>${button('Change focus','preview')}`;
 if(stage==='redirect')html=`<h1>What should I notice?</h1><label class="field" for="direction">Your direction</label><textarea id="direction" maxlength="500">${escape(custom)}</textarea>${button('Use my focus','direction',true)}${button('Back to feedback','feedback')}`;
 if(stage==='key')html=`<h1>Revise with AI.<br>Keep it yours.</h1><label class="field" for="key">Your ${provider} API key</label><input id="key" maxlength="512" type="password" autocomplete="off" spellcheck="false" value="${escape(key)}">${button('Show / hide key','show')}<p>Held only in this sidebar session. Never saved by the app.</p><p>Selected text and context go to ${provider}. Your account pays for any usage. ${__AION_TEST__?'Development test: use synthetic text only. Aion processing follows its own terms; Gemini data settings do not apply.':'Unpaid Gemini services may use content for improvement and human review. Avoid sensitive or personal information.'}</p><a href="${__AION_TEST__?'https://www.aionlabs.ai/docs/':'https://ai.google.dev/gemini-api/terms'}" target="_blank" rel="noopener">Provider information</a>${button('Use key for this session','saveKey',true)}${button('Forget key','forget')}${button('Back to passage','back')}`;
 if(stage==='finish')html=`<h1>Leave it here.</h1><p>Closing clears the app’s session key and working context. Provider-held data is separate.</p>${button('Close sidebar','close',true)}${button('Another passage','start')}${button('Forget key','forget')}`;
 app.insertAdjacentHTML('beforeend',html);
 updatePending();
 if(__AION_TEST__)app.insertAdjacentHTML('afterbegin','<p class=notice>Aion Labs development test · synthetic writing only</p>');
 app.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.addEventListener('click',()=>void act(b.dataset.action!)));
 app.querySelectorAll<HTMLInputElement>('[name=focus]').forEach(r=>r.onchange=()=>{focus=r.value;requestGeneration++;feedback=null;});
 app.querySelector<HTMLTextAreaElement>('#custom')?.addEventListener('input',e=>{custom=(e.target as HTMLTextAreaElement).value;requestGeneration++;});
 app.querySelector<HTMLTextAreaElement>('#context')?.addEventListener('input',e=>{context=(e.target as HTMLTextAreaElement).value;requestGeneration++;});
 if(moveFocus)focusContent();
}
async function capture(){if(busy)return; if(typeof google==='undefined'){error='Open this build in Google Docs to capture text, or try the local sample.';render();return;}
 requestGeneration++;feedback=null;busy=true;render();const generation=requestGeneration;
 google.script.run.withSuccessHandler(r=>{busy=false;if(requestGeneration!==generation){updatePending();return;}if(r.ok&&r.text){passage=r.text;sampleMode=false;version++;stage='preview';error='';}else error=r.message||'Select plain text and try again.';render(true);}).withFailureHandler((failure)=>{busy=false;if(requestGeneration!==generation){updatePending();return;}const message=failure?.message||'';error=/function.*not found|script function/i.test(message)?'Capture function unavailable. Reopen the add-on after updating the test deployment.':/authoriz|permission/i.test(message)?'Google authorization is required. Reopen the add-on to authorize document access.':'Capture did not finish. Keep writing and try again.';render(true);}).capturePassage();}
function readLive(){
 if(liveBusy)return;
 if(!key){stage='key';error='Enter your API key before requesting a reading.';render(true);return;}
 if(typeof google==='undefined'){error='Live requests run inside the Google Docs sidebar. Local preview makes no model calls.';render();return;}
 if(focus==='custom'&&!custom.trim()){error='Tell the reader what you want to focus on.';render(true);return;}
 const generation=++requestGeneration;
 const request:RevisionRequest={id:crypto.randomUUID(),createdAt:Date.now(),passage,focus:focus as RevisionRequest['focus'],customFocus:custom,context};
 const capturedVersion=version;liveBusy=true;render();
 google.script.run.withSuccessHandler((result:RevisionResult)=>{
  liveBusy=false;if(generation!==requestGeneration){updatePending();return;}
  if(result.id!==request.id){error='The response did not match this request.';render();return;}
  if(result.ok){feedback=result.feedback;feedbackVersion=capturedVersion;stage='feedback';}
  else error=({KEY_REQUIRED:'Enter a valid key for this provider.',SERVICE_PAUSED:'AI readings are temporarily paused. You can still preview passages and keep writing.',INVALID_KEY:'The provider rejected this key. Check the key and account permissions.',PROVIDER_LIMIT:'Your usage or request limit was reached. Check your provider account.',MODEL_UNAVAILABLE:'This model is unavailable for the configured account.',INVALID_OUTPUT:'The response did not meet the coaching format. Keep writing or explicitly try again.',REQUEST_ALREADY_USED:'This request was already submitted. No duplicate call was sent.',REQUEST_IN_PROGRESS:'Another request is being submitted. Wait a moment before trying again.',UNKNOWN_OUTCOME:'The request did not finish here; it may still consume provider quota. No automatic retry was sent.'} as Record<string,string>)[result.code]||'The request could not be completed. Keep writing or try again deliberately.';
  render(true);
 }).withFailureHandler(()=>{liveBusy=false;if(generation!==requestGeneration){updatePending();return;}error='The request did not finish here. It may still be processing; no automatic retry was sent.';render(true);}).requestRevision(request,key);
}
async function act(a:string){error='';if(['key','finish','start','sample','direction','preview'].includes(a))requestGeneration++;
 if(a==='capture'){await capture();return;}
 if(a==='sample'){sampleMode=true;passage=sample;version++;stage='preview';}
 else if(a==='read'){if(!sampleMode){readLive();return;}stage='feedback';}
 else if(a==='refresh'){if(sampleMode){passage=app.querySelector<HTMLTextAreaElement>('#revision')!.value;version++;stage='preview';}else {await capture();return;}}
 else if(a==='direction'){custom=app.querySelector<HTMLTextAreaElement>('#direction')!.value;focus='custom';stage='preview';}
 else if(a==='saveKey'){const value=app.querySelector<HTMLInputElement>('#key')!.value.trim();if(value.length<10||value.length>512||/https?:|\s/i.test(value)){error='Enter an API key, not an API address.';render(true);return;}key=value;requestGeneration++;stage=passage?'preview':'start';}
 else if(a==='show'){const input=app.querySelector<HTMLInputElement>('#key')!;input.type=input.type==='password'?'text':'password';return;}
 else if(a==='forget'){key='';requestGeneration++;stage='key';}
 else if(a==='back')stage=passage?'preview':'start';
 else if(a==='close'){key='';passage='';custom='';context='';version++;requestGeneration++;if(typeof google!=='undefined'){google.script.host.close();return;}stage='start';}
 else {stage=a; if(a==='finish'||a==='start'){version++;requestGeneration++;}if(a==='start'){passage='';custom='';context='';feedback=null;sampleMode=false;}}
 render(true);
}
render();
