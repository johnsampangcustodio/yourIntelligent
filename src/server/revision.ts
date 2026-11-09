import {validateRequest_,type RevisionResult} from '../shared/revision';
import {callProvider_,configuredProvider_} from './provider';
export function requestRevision_(input:unknown,key:unknown):RevisionResult {
 let id='';
 try{
  const r=validateRequest_(input);id=r.id;
  if(typeof key!=='string'||key.length<10||key.length>512||/\s|https?:/i.test(key))throw new Error('KEY_REQUIRED');
  const now=Date.now();if(Math.abs(now-r.createdAt)>300000)throw new Error('INVALID_REQUEST');
  const lock=LockService.getUserLock();if(!lock.tryLock(1000))throw new Error('REQUEST_IN_PROGRESS');
  try{
   const props=PropertiesService.getUserProperties();
   const ledger=JSON.parse(props.getProperty('request-nonces')||'{}') as Record<string,number>;
   for(const nonce of Object.keys(ledger))if(now-ledger[nonce]>600000)delete ledger[nonce];
   if(ledger[id])throw new Error('REQUEST_ALREADY_USED');
   if(Object.keys(ledger).length>=32)throw new Error('PROVIDER_LIMIT');
   ledger[id]=now;props.setProperty('request-nonces',JSON.stringify(ledger));
  }finally{lock.releaseLock();}
  return {ok:true,id,feedback:callProvider_(r,key,(url,options)=>UrlFetchApp.fetch(url,options),configuredProvider_())};
 }catch(error){const code=error instanceof Error?error.message:'';return {ok:false,id,code:['INVALID_REQUEST','KEY_REQUIRED','REQUEST_IN_PROGRESS','REQUEST_ALREADY_USED','INVALID_KEY','PROVIDER_LIMIT','MODEL_UNAVAILABLE','PROVIDER_ERROR','INVALID_OUTPUT','UNKNOWN_OUTCOME'].includes(code)?code:'INTERNAL_ERROR'};}
}
