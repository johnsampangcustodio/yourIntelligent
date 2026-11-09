# yourIntelligent

A student-directed revision partner for Google Docs. Students write all assignment prose.

## Current build

Local sample journey, Apps Script selection adapter, and live-request implementation. Gemini is the release provider; a separate Aion Labs build is for synthetic tests only. **The founder confirmed the full synthetic revision loop with both Aion (test-only) and Gemini in the bound preview, including refreshed-only second reading. Standalone installation and public deployment remain unverified.** Sample feedback is explicitly prepared, never a substitute for a failed live request.

## Develop

Use Node 22 or newer. Run `npm ci`, then `npm run dev`. Open the localhost URL printed by Vite. The UI is the real 300px sidebar, with a local sample practice passage. Capture works only inside Docs.

`npm run check` runs strict typechecking, selection/journey tests, and builds `dist/Code.js`, `dist/Sidebar.html`, and `dist/appsscript.json`.

## Test inside Docs

1. Run `npm run clasp -- login` to authorize your Google account locally. Never commit authorization files.
2. Create or select an Apps Script development project; configure `.clasp.json` with its scriptId and `rootDir: "dist"`. The file is ignored by Git.
3. Run `npm run build`, then `npm run clasp -- push` after confirming the target project.
4. Configure an Editor add-on test deployment for a synthetic Google Doc. Open the add-on menu, select a plain-text passage, and capture it.
5. Check partial text, Unicode, multiple paragraphs, active tabs, empty selection, and unsupported/table selections in the real host. No document writes are exposed.

The manifest requests current-document, sidebar UI and outbound network access. Existing testers must authorize the added network scope. Current-document permission is broader than read-only; the adapter implementation provides no write operations.

## Delivery

See [ORCHESTRATOR-PLAN.md](ORCHESTRATOR-PLAN.md). Account authorization and actual host checks remain necessary. No real Docs or model integration checks have been claimed from local tests.

## Verified development preview

Exact selected-paragraph capture was confirmed by the founder in a private browser using the document-bound development preview. The in-app browser still rejects calls, and standalone Editor add-on installation is not yet verified. No public deployment or live Gemini is claimed.

`npm run build:bound` creates the same UI/adapter with a development-only custom menu in `dist-bound/`. An ignored `.clasp.bound.json` targets the synthetic test document's bound script. Upload that target with `npm run clasp -- -P <absolute-path-to-.clasp.bound.json> push --force`. The normal `npm run build` and original `.clasp.json` remain the standalone Editor add-on target. Keep the two targets distinct.

If project consent needs verification, run `authorizeAccess` from the Apps Script editor. It checks the existing manifest scopes without reading assignment text. See [capture diagnosis](docs/CAPTURE-DIAGNOSIS.md) for actual experiments and unresolved environment restrictions.

## Provider test build

Run `npm run build:aion-test` to build the bound Aion preview, then upload with the ignored bound clasp configuration described above. Aion builds are rejected without `--bound`. Normal builds use Gemini. Enter an actual API key through the masked session field, never chat. The endpoint URL is not a credential. Provider charges/quota and terms apply.

Refresh only captures locally. The next explicit send assesses only the refreshed passage. See [live provider checklist](docs/LIVE-PROVIDER-CHECKLIST.md) for manual acceptance, data handling and outstanding release checks.
