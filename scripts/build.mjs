import { build } from 'esbuild';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
const bound = process.argv.includes('--bound');
const outDir = bound ? 'dist-bound' : 'dist';
await mkdir(outDir, { recursive: true });
const ui = await build({
  entryPoints: ['src/sidebar/main.ts'], bundle: true, outfile: 'sidebar.js',
  write: false, minify: true, supported: { 'template-literal': false },
  loader: { '.woff2': 'dataurl', '.woff': 'dataurl' }
});
const script = ui.outputFiles.find(f => f.path.endsWith('.js')).text;
const css = ui.outputFiles.find(f => f.path.endsWith('.css')).text;
await writeFile(`${outDir}/Sidebar.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body><main id="app"></main><script>${script}</script></body></html>`);
// Native top-level functions are the Apps Script callable interface. Internal
// functions end in underscore so google.script.run cannot invoke them directly.
await build({
  entryPoints: [bound ? 'src/server/entry-bound.ts' : 'src/server/entry.ts'],
  bundle: true, format: 'esm', treeShaking: false,
  banner: { js: '/** @OnlyCurrentDoc */' }, outfile: `${outDir}/Code.js`
});
await writeFile(`${outDir}/appsscript.json`, JSON.stringify({
  timeZone: 'America/Los_Angeles', runtimeVersion: 'V8', oauthScopes: [
    'https://www.googleapis.com/auth/documents.currentonly',
    'https://www.googleapis.com/auth/script.container.ui'
  ]
}, null, 2));
await mkdir(`${outDir}/licenses`, { recursive: true });
for (const font of ['dm-sans', 'roboto', 'ibm-plex-mono']) {
  await copyFile(`node_modules/@fontsource/${font}/LICENSE`, `${outDir}/licenses/${font}.txt`);
}
