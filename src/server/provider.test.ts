import {it,expect} from 'vitest';
import {providerRequest_,callProvider_} from './provider';
import {validateRequest_,validateFeedback_,prompt_,type RevisionRequest} from '../shared/revision';
const request:RevisionRequest={id:'fixture-request-00001',createdAt:1,passage:'I mistook silence for agreement.',focus:'depth',context:'Reflect on an assumption.',customFocus:''};
const feedback={observation:'You name an assumption.',question:'What challenged it?',evidenceQuote:'silence'};
it('keeps the credential in headers and only sends current-passage context',()=>{
 for(const aion of [false,true]){
  const r=providerRequest_(request,'fixture-not-a-real-key',aion);
  expect(r.url).not.toContain('fixture-not-a-real-key');
  expect(JSON.stringify(r.body)).not.toContain('fixture-not-a-real-key');
  expect(prompt_(request)).not.toContain(request.id);
 }
 expect(providerRequest_(request,'fixture-not-a-real-key',false).body).toMatchObject({store:false});
 expect(()=>validateRequest_({...request,previousPassage:'old passage'})).toThrow('INVALID_REQUEST');
});
it('rejects fabricated evidence and malformed coaching output',()=>{
 expect(()=>validateFeedback_({...feedback,evidenceQuote:'invented'},request.passage)).toThrow();
 expect(()=>validateFeedback_({...feedback,rewrite:'essay prose'},request.passage)).toThrow();
});
it('reads Gemini model output without exposing thought content',()=>{
 const result=callProvider_(request,'fixture-key',()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify({status:'completed',steps:[{type:'thought',content:'private reasoning'},{type:'model_output',content:[{type:'text',text:JSON.stringify(feedback)}]}]})}),false);
 expect(result).toEqual(feedback);
});
it('reads Aion content but never its reasoning field',()=>{
 const result=callProvider_(request,'fixture-key',()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify({choices:[{finish_reason:'stop',message:{reasoning:'private reasoning',content:JSON.stringify(feedback)}}]})}),true);
 expect(result).toEqual(feedback);
});
it('does not expose provider errors or retry a failed request',()=>{
 let calls=0;
 expect(()=>callProvider_(request,'fixture-key',()=>{calls++;return {getResponseCode:()=>429,getContentText:()=> 'credential and content must never be surfaced'};},true)).toThrow('PROVIDER_LIMIT');
 expect(calls).toBe(1);
 expect(()=>callProvider_(request,'fixture-key',()=>{throw new Error('raw transport details');},true)).toThrow('UNKNOWN_OUTCOME');
});
