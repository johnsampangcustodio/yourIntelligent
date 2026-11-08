import {describe,it,expect} from 'vitest';
import {selectedText} from './selection';
describe('exact selected text',()=>{
 it('preserves UTF-16 selection offsets and paragraph boundaries',()=>expect(selectedText([{text:'A😀B',start:1,end:2,block:0},{text:'café',start:0,end:3,block:1}])).toBe('😀\ncafé'));
 it('joins text fragments in the same paragraph without inventing spacing',()=>expect(selectedText([{text:'hello ',start:0,end:5,block:0},{text:'world',start:0,end:4,block:0}])).toBe('hello world'));
 it('rejects empty and oversized selections',()=>{expect(()=>selectedText([])).toThrow();expect(()=>selectedText([{text:'a'.repeat(6001),start:0,end:6000,block:0}])).toThrow('shorter');});
});
