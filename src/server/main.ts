import { selectedText, type Segment } from '../shared/selection';
export function onOpen() { DocumentApp.getUi().createAddonMenu().addItem('Open yourIntelligent', 'showSidebar').addToUi(); }
export function onInstall() { onOpen(); }
export function showSidebar() { DocumentApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('yourIntelligent')); }
export function capturePassage() {
 try {
  const doc = DocumentApp.getActiveDocument();
  const range = doc.getSelection();
  if (!range) return {ok:false, message:'Select a plain-text passage in Docs first.'};
  const blocks: GoogleAppsScript.Document.Element[] = [];
  const parts: Segment[] = range.getRangeElements().map(r => {
   const element = r.getElement();
   if (element.getType() !== DocumentApp.ElementType.TEXT) throw new Error('Select plain text only; tables and images are not supported yet.');
   let ancestor = element.getParent();
   while (ancestor) { if (ancestor.getType() === DocumentApp.ElementType.TABLE_CELL) throw new Error('Select text outside a table.'); ancestor = ancestor.getParent(); }
   const parent = element.getParent();
   let block = blocks.indexOf(parent); if (block === -1) {block = blocks.length; blocks.push(parent);}
   const text = element.asText().getText();
   return {text,block,start:r.isPartial()?r.getStartOffset():0,end:r.isPartial()?r.getEndOffsetInclusive():text.length-1};
  });
  return {ok:true,text:selectedText(parts)};
 } catch { return {ok:false,message:'Could not capture this selection. Select plain text outside tables and try again.'}; }
}
