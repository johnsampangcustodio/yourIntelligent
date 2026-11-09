import {afterEach,describe,expect,it,vi} from 'vitest';
import {capturePassage_ as capturePassage,onOpen_ as onOpen} from './main';
afterEach(()=>vi.unstubAllGlobals());
function host(range:unknown){
 const writes=vi.fn();
 vi.stubGlobal('DocumentApp',{ElementType:{TEXT:'TEXT',TABLE_CELL:'TABLE_CELL',PARAGRAPH:'PARAGRAPH',LIST_ITEM:'LIST_ITEM'},getActiveDocument:()=>({getSelection:()=>range}),getUi:()=>({createAddonMenu:()=>({addItem:()=>({addToUi:writes})})})});
 return writes;
}
describe('Docs adapter',()=>{
 it('handles no selection without falling back to document body',()=>{host(null);expect(capturePassage()).toEqual({ok:false,message:expect.stringContaining('Select')});});
 it('extracts only the exact selected range',()=>{
 const parent={getType:()=> 'PARAGRAPH',getParent:()=>null};
 const element={getType:()=> 'TEXT',getParent:()=>parent,asText:()=>({getText:()=> 'before chosen after'})};
 host({getRangeElements:()=>[{getElement:()=>element,isPartial:()=>true,getStartOffset:()=>7,getEndOffsetInclusive:()=>12}]});
 expect(capturePassage()).toEqual({ok:true,text:'chosen'});
 });
 it('rejects mixed selections rather than sending partial context',()=>{
 host({getRangeElements:()=>[{getElement:()=>({getType:()=> 'INLINE_IMAGE'})}]});
 expect(capturePassage().ok).toBe(false);
 });
 it('captures complete paragraphs with text-only children',()=>{
 const text={getType:()=> 'TEXT',asText:()=>({getText:()=> 'A complete paragraph.'})};
 const paragraph={getType:()=> 'PARAGRAPH',getParent:()=>null,asParagraph:()=>({getNumChildren:()=>1,getChild:()=>text})};
 host({getRangeElements:()=>[{getElement:()=>paragraph,isPartial:()=>false}]});
 expect(capturePassage()).toEqual({ok:true,text:'A complete paragraph.'});
 });
 it('opens with menu registration only and no document read',()=>{
 const menu=vi.fn();vi.stubGlobal('DocumentApp',{getUi:()=>({createAddonMenu:()=>({addItem:()=>({addToUi:menu})})})});
 onOpen();expect(menu).toHaveBeenCalledOnce();
 });
 it('keeps separate paragraph wrappers at the same structural path together',()=>{
 const body={getType:()=> 'BODY_SECTION',getParent:()=>null,getChildIndex:()=>3};
 const run=(text:string)=>({getElement:()=>({getType:()=> 'TEXT',getParent:()=>({getType:()=> 'PARAGRAPH',getParent:()=>body}),asText:()=>({getText:()=>text})}),isPartial:()=>false});
 host({getRangeElements:()=>[run('Café '),run('😀')]});
 expect(capturePassage()).toEqual({ok:true,text:'Café 😀'});
 });
 it('keeps different paragraphs separated even with fresh host wrappers',()=>{
 const run=(index:number,text:string)=>({getElement:()=>({getType:()=> 'TEXT',getParent:()=>({getType:()=> 'PARAGRAPH',getParent:()=>({getType:()=> 'BODY_SECTION',getParent:()=>null,getChildIndex:()=>index})}),asText:()=>({getText:()=>text})}),isPartial:()=>false});
 host({getRangeElements:()=>[run(1,'First.'),run(2,'Second.')]});
 expect(capturePassage()).toEqual({ok:true,text:'First.\nSecond.'});
 });
 it('rejects text inside tables and keeps size guidance actionable',()=>{
 const text=(value:string,parent:any)=>({getElement:()=>({getType:()=> 'TEXT',getParent:()=>parent,asText:()=>({getText:()=>value})}),isPartial:()=>false});
 host({getRangeElements:()=>[text('table text',{getType:()=> 'TABLE_CELL'})]});
 expect(capturePassage()).toMatchObject({ok:false,message:expect.stringContaining('outside tables')});
 host({getRangeElements:()=>[text('a'.repeat(6001),{getType:()=> 'PARAGRAPH',getParent:()=>null})]});
 expect(capturePassage()).toMatchObject({ok:false,message:expect.stringContaining('6,000')});
 });
});
