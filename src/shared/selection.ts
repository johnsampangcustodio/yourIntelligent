export type Segment = { text: string; start: number; end: number; block: number };
export function selectedText(parts: Segment[]): string {
 if (!parts.length) throw new Error('Select a plain-text passage in Docs first.');
 let previous = -1;
 const text = parts.map(p => {
  if (p.start < 0 || p.end < p.start || p.end >= p.text.length) throw new Error('Select plain text and try again.');
  const value = (previous !== -1 && previous !== p.block ? '\n' : '') + p.text.slice(p.start, p.end + 1);
  previous = p.block; return value;
 }).join('');
 if (!text.trim()) throw new Error('Select a passage containing some words.');
 if (text.length > 6000) throw new Error('Choose a shorter passage (up to 6,000 characters).');
 return text;
}
