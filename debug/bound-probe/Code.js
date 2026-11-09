/** @OnlyCurrentDoc */
function onOpen(){DocumentApp.getUi().createMenu('yourIntelligent Probe').addItem('Open connection probe','showProbe').addToUi();}
function showProbe(){DocumentApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('Probe').setTitle('Bound connection probe'));}
function ping(){return 'Connection succeeded';}
