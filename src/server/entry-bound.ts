// Development-only host. Public distribution still uses the Editor add-on entry.
import { showSidebar_, capturePassage_, authorizeAccess_ } from './main';
function onOpen(){DocumentApp.getUi().createMenu('yourIntelligent Preview').addItem('Open yourIntelligent','showSidebar').addToUi();}
function showSidebar(){showSidebar_();}
function capturePassage(){return capturePassage_();}
function authorizeAccess(){return authorizeAccess_();}
