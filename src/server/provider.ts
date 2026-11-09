import { instructions_,prompt_,validateFeedback_,type RevisionRequest,type Feedback } from '../shared/revision';
declare const __AION_TEST__:boolean;
export type Http_=(url:string,options:GoogleAppsScript.URL_Fetch.URLFetchRequestOptions)=>{getResponseCode():number;getContentText():string};
export function providerRequest_(r:RevisionRequest,key:string,aion:boolean):{url:string;headers:Record<string,string>;body:object}{
 const schema={type:'object',properties:{observation:{type:'string'},question:{type:'string'},evidenceQuote:{type:['string','null']}},required:['observation','question','evidenceQuote'],additionalProperties:false};
 return aion?{url:'https://api.aionlabs.ai/v1/chat/completions',headers:{Authorization:'Bearer '+key},body:{model:'aion-labs/aion-3.5-mini',messages:[{role:'system',content:instructions_},{role:'user',content:prompt_(r)}],max_tokens:4096,reasoning_effort:'low',reasoning_split:true,stream:false}}:
 {url:'https://generativelanguage.googleapis.com/v1beta/interactions',headers:{'x-goog-api-key':key,'Api-Revision':'2026-05-20'},body:{model:'gemini-3.8-flash',input:prompt_(r),system_instruction:instructions_,store:false,generation_config:{max_output_tokens:2048,thinking_level:'low'},response_format:{type:'text',mime_type:'application/json',schema}}};
}
export function readProvider_(body:any,aion:boolean):string {
 if(aion){if(body?.choices?.[0]?.finish_reason!=='stop'||typeof body.choices[0]?.message?.content!=='string')throw new Error('INVALID_OUTPUT');return body.choices[0].message.content;}
 if(body?.status!=='completed'||!Array.isArray(body.steps))throw new Error('INVALID_OUTPUT');
 const output=body.steps.filter((s:any)=>s.type==='model_output').slice(-1)[0];
 if(!Array.isArray(output?.content)||output.content.some((c:any)=>c.type!=='text'))throw new Error('INVALID_OUTPUT');
 return output.content.map((c:any)=>c.text).join('');
}
export function callProvider_(r:RevisionRequest,key:string,fetch:Http_,aion:boolean):Feedback {
 const request=providerRequest_(r,key,aion);
 let response;try{response=fetch(request.url,{method:'post',contentType:'application/json',headers:request.headers,payload:JSON.stringify(request.body),muteHttpExceptions:true,followRedirects:false,...{timeoutSeconds:60}});}catch{throw new Error('UNKNOWN_OUTCOME');}
 const status=response.getResponseCode();
 if(status===401||status===403)throw new Error('INVALID_KEY');
 if(status===429)throw new Error('PROVIDER_LIMIT');
 if(status===400||status===404)throw new Error('MODEL_UNAVAILABLE');
 if(status<200||status>=300)throw new Error('PROVIDER_ERROR');
 const raw=response.getContentText();if(raw.length>100000)throw new Error('INVALID_OUTPUT');
 try{return validateFeedback_(JSON.parse(readProvider_(JSON.parse(raw),aion).trim().replace(/^```json\s*|\s*```$/g,'')),r.passage);}catch{throw new Error('INVALID_OUTPUT');}
}
export function configuredProvider_(){return __AION_TEST__;}
