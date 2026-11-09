import { selectedText, SelectionError, type Segment } from '../shared/selection';
export function onOpen_() { DocumentApp.getUi().createAddonMenu().addItem('Open yourIntelligent', 'showSidebar').addToUi(); }
export function onInstall_() { onOpen_(); }
export function showSidebar_() { ScriptApp.requireAllScopes(ScriptApp.AuthMode.FULL); DocumentApp.getActiveDocument().getId(); DocumentApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('yourIntelligent')); }
export function capturePassage_() {
 try {
  const doc = DocumentApp.getActiveDocument();
  const range = doc.getSelection();
  if (!range) return {ok:false, message:'Select a plain-text passage in Docs first.'};
  const blocks: string[] = [];
  const parts: Segment[] = [];
  for (const r of range.getRangeElements()) {
   const element = r.getElement();
   let ancestor = element.getParent();
   while (ancestor) { if (ancestor.getType() === DocumentApp.ElementType.TABLE_CELL) throw new Error('Unsupported selection'); ancestor = ancestor.getParent(); }
   const type=element.getType();
   const isText=type===DocumentApp.ElementType.TEXT;
   if(!isText && (r.isPartial() || (type!==DocumentApp.ElementType.PARAGRAPH && type!==DocumentApp.ElementType.LIST_ITEM))) throw new Error('Unsupported selection');
   const blockElement=isText?element.getParent():element;
   // Apps Script can return different wrapper objects for one paragraph.
   // Structural child-index paths keep text runs in that paragraph together.
   const path:number[]=[];let node=blockElement;let parent=node.getParent();
   while(parent){path.unshift(parent.getChildIndex(node));node=parent;parent=node.getParent();}
   const blockKey=path.join('/');
   let block=blocks.indexOf(blockKey);if(block===-1){block=blocks.length;blocks.push(blockKey);}
   const nodes: GoogleAppsScript.Document.Text[]=[];
   if(isText) nodes.push(element.asText());
   else {
    const container=type===DocumentApp.ElementType.PARAGRAPH?element.asParagraph():element.asListItem();
    for(let i=0;i<container.getNumChildren();i++){
     const child=container.getChild(i);
     if(child.getType()!==DocumentApp.ElementType.TEXT)throw new Error('Unsupported selection');
     nodes.push(child.asText());
    }
   }
   if(!nodes.length)parts.push({text:'',start:0,end:-1,block});
   for(const node of nodes){const text=node.getText();parts.push({text,block,start:isText&&r.isPartial()?r.getStartOffset():0,end:isText&&r.isPartial()?r.getEndOffsetInclusive():text.length-1});}
  }
  return {ok:true,text:selectedText(parts)};
 } catch(error) { return {ok:false,message:error instanceof SelectionError?error.message:'Could not capture this selection. Select plain text outside tables and try again.'}; }
}

/** Run from the Apps Script editor to request only the existing manifest scopes. */
export function authorizeAccess_() {
 ScriptApp.requireAllScopes(ScriptApp.AuthMode.FULL);
 return { authorized: true };
}
