import {afterEach,describe,expect,it,vi} from 'vitest';
import {capturePassage,onOpen} from './main';
afterEach(()=>vi.unstubAllGlobals());
function host(range:unknown){
 const writes=vi.fn();
 vi.stubGlobal('DocumentApp',{ElementType:{TEXT:'TEXT',TABLE_CELL:'TABLE_CELL'},getActiveDocument:()=>({getSelection:()=>range}),getUi:()=>({createAddonMenu:()=>({addItem:()=>({addToUi:writes})})})});
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
 it('opens with menu registration only and no document read',()=>{
 const menu=vi.fn();vi.stubGlobal('DocumentApp',{getUi:()=>({createAddonMenu:()=>({addItem:()=>({addToUi:menu})})})});
 onOpen();expect(menu).toHaveBeenCalledOnce();
 });
});
