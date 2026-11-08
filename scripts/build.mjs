import {build} from 'esbuild';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
// Explicit output path lets esbuild identify JS and CSS independently.
const ui=await build({entryPoints:['src/sidebar/main.ts'],bundle:true,outfile:'sidebar.js',write:false,minify:true,supported:{'template-literal':false},loader:{'.woff2':'dataurl','.woff':'dataurl'}});
const script=ui.outputFiles.find(f=>f.path.endsWith('.js')).text;
const css=ui.outputFiles.find(f=>f.path.endsWith('.css')).text;
await writeFile('dist/Sidebar.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body><main id="app"></main><script>${script}</script></body></html>`);
await build({entryPoints:['src/server/main.ts'],bundle:true,format:'iife',globalName:'Server',outfile:'dist/Code.js',footer:{js:'function onOpen(){Server.onOpen();}\nfunction onInstall(){Server.onInstall();}\nfunction showSidebar(){Server.showSidebar();}\nfunction capturePassage(){return Server.capturePassage();}'}});
await writeFile('dist/appsscript.json',JSON.stringify({timeZone:'America/Los_Angeles',runtimeVersion:'V8',oauthScopes:['https://www.googleapis.com/auth/documents.currentonly','https://www.googleapis.com/auth/script.container.ui']},null,2));

await mkdir("dist/licenses",{recursive:true});
for(const font of ["dm-sans","roboto","ibm-plex-mono"]) await copyFile(`node_modules/@fontsource/${font}/LICENSE`,`dist/licenses/${font}.txt`);
