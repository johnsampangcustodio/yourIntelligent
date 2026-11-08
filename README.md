# yourIntelligent

A student-directed revision partner for Google Docs. Students write all assignment prose.

## Current build

Local sample journey and Apps Script selection adapter. **Live Gemini feedback and public deployment are not implemented yet.** Sample feedback is explicitly prepared, never a substitute for a failed live request.

## Develop

Use Node 22 or newer. Run `npm ci`, then `npm run dev`. Open the localhost URL printed by Vite. The UI is the real 300px sidebar, with a local sample practice passage. Capture works only inside Docs.

`npm run check` runs strict typechecking, selection/journey tests, and builds `dist/Code.js`, `dist/Sidebar.html`, and `dist/appsscript.json`.

## Test inside Docs

1. Run `npm run clasp -- login` to authorize your Google account locally. Never commit authorization files.
2. Create or select an Apps Script development project; configure `.clasp.json` with its scriptId and `rootDir: "dist"`. The file is ignored by Git.
3. Run `npm run build`, then `npm run clasp -- push` after confirming the target project.
4. Configure an Editor add-on test deployment for a synthetic Google Doc. Open the add-on menu, select a plain-text passage, and capture it.
5. Check partial text, Unicode, multiple paragraphs, active tabs, empty selection, and unsupported/table selections in the real host. No document writes are exposed.

The current manifest requests current-document and sidebar UI access only. Network/provider scope will be added with the live adapter. Current-document permission is broader than read-only; the adapter implementation provides no write operations.

## Delivery

See [ORCHESTRATOR-PLAN.md](ORCHESTRATOR-PLAN.md). Account authorization and actual host checks remain necessary. No real Docs or model integration checks have been claimed from local tests.
