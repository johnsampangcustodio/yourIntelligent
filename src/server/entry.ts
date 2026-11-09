import { requestRevision_ } from './revision';
import * as app from './main';
function onOpen(){app.onOpen_();}
function onInstall(){app.onInstall_();}
function showSidebar(){app.showSidebar_();}
function capturePassage(){return app.capturePassage_();}
function authorizeAccess(){return app.authorizeAccess_();}

function requestRevision(request:unknown,key:unknown){return requestRevision_(request,key);}
