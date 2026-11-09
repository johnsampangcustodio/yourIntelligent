import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {marked} from 'marked';
import {JSDOM} from 'jsdom';

// Only these publisher-controlled documents become public website pages.
const pages=[['README.md','index.html','yourIntelligent'],['PRIVACY.md','privacy.html','Privacy'],['TERMS.md','terms.html','Terms'],['SUPPORT.md','support.html','Support']];
const base='https://johnsampangcustodio.github.io/yourIntelligent/';
await mkdir('site/assets',{recursive:true});
const fonts=[['dm-sans','500'],['roboto','400'],['roboto','500'],['ibm-plex-mono','400']];
for(const [font,weight] of fonts)await copyFile(`node_modules/@fontsource/${font}/files/${font}-latin-${weight}-normal.woff2`,`site/assets/${font}-${weight}.woff2`);
for(const font of new Set(fonts.map(([font])=>font)))await copyFile(`node_modules/@fontsource/${font}/LICENSE`,`site/assets/${font}-LICENSE.txt`);
await copyFile('assets/site.css','site/assets/site.css');
await writeFile('site/.nojekyll','');
const nav=(file)=>[['index.html','How it works'],['privacy.html','Privacy'],['terms.html','Terms'],['support.html','Support']].map(([href,label])=>`<a href="${href}"${file===href?' aria-current="page"':''}>${label}</a>`).join('');
for(const [source,file,title] of pages){
 let md=await readFile(`docs/public/${source}`,'utf8');
 for(const [from,to] of pages)md=md.replaceAll(`](${from})`, `](${to})`);
 const home=file==='index.html';
 if(home)md=md.replace(/^# yourIntelligent\s+Start with your words\. Revise with a reader in the margin\.\s*/,'');
 const hero=home?`<section class="intro" aria-labelledby="intro-title"><div><p class="status">In development · Google Docs add-on</p><h1 id="intro-title">Start with<br>your words.</h1><p class="lead">A reader in the margin.<br>The revision is yours.</p><a class="action" href="#guide">See how it works <span aria-hidden="true">↘</span></a></div><figure class="example"><figcaption>Illustrative coaching example</figcaption><div class="draft"><p>I stayed quiet because I thought everyone else understood the reading. Later, someone asked the same question I had.</p></div><aside aria-label="Example feedback"><p class="focus">Go a layer deeper</p><h2>What changed in how you understood the room?</h2><p>You describe someone voicing the question you had kept to yourself.</p><p class="byline">You choose what happens next.</p></aside></figure></section>`:'';
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Student-directed revision for personal essays and course reflections. One observation, one question. You write the revision."><title>${title}${home?'':' — yourIntelligent'}</title><link rel="canonical" href="${base}${home?'':file}"><link rel="stylesheet" href="assets/site.css"><meta name="color-scheme" content="light"></head><body><a class="skip" href="#main">Skip to content</a><header><a class="brand" href="index.html">yourIntelligent<span aria-hidden="true">—</span></a><nav aria-label="Main">${nav(file)}</nav></header><main id="main">${hero}<article id="guide" class="prose${home?' home-guide':''}">${marked.parse(md)}</article></main><footer><p>yourIntelligent · John Phillip Custodio</p><p>Independent project. Public add-on installation is not available yet.</p><nav aria-label="Footer">${nav(file)}</nav><p><a href="https://www.linkedin.com/in/johnphillipcustodio/">Contact on LinkedIn</a> · <a href="mailto:jpsc@tuta.io">jpsc@tuta.io</a></p></footer></body></html>`;
 await writeFile(`site/${file}`,html);
}
// Validate the generated site's own navigation and assets before publishing.
const {access}=await import('node:fs/promises');
for(const [,file] of pages){
 const doc=new JSDOM(await readFile(`site/${file}`,'utf8')).window.document;
 if(doc.querySelectorAll('h1').length!==1)throw new Error(`Expected one main heading: ${file}`);
 for(const el of doc.querySelectorAll('[href],[src]')){
  const target=el.getAttribute('href')??el.getAttribute('src');
  if(!target||/^(https?:|mailto:)/.test(target))continue;
  const [path,fragment]=target.split('#');
  if(path)await access(`site/${path}`);
  else if(fragment&&!doc.getElementById(fragment))throw new Error(`Missing anchor ${target} in ${file}`);
 }
}
console.log('Built and checked four static pages. No browser JavaScript or external font requests.');
