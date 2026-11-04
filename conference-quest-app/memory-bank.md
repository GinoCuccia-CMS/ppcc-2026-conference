# Conference Quest – Memory Bank

## Project

- Path: `C:\Repos\ppcc-2026-conference\conference-quest-app\`
- App name: Conference Quest (Power Apps code app, Vite + React + TypeScript, no Fluent UI)
- Source design: Claude Design project "Conference Quest" (`Conference Quest.dc.html` + `support.js`, zip in Gino's Downloads). Rebuilt here as plain React; `support.js` is not used.
- Data: bundled at build time from `../data/sessions/*.json` and `../data/conference.json` (no Dataverse, no connectors).
- Environment: **CMS default environment (GCC / usgov)** - id `Default-fbdcedc1-70a9-414b-bfa5-c3063fc3395e`, `https://orgcc31b0b6.crm9.dynamics.com/`
- Solution: **PowerPlatformConference2026** - id `44a94f67-dfd7-f111-a05a-001dd811b7f9`
- App id: assigned on first successful push (power.config.json appId is null)
- Maker URL: https://make.gov.powerapps.us/environments/Default-fbdcedc1-70a9-414b-bfa5-c3063fc3395e/solutions/44a94f67-dfd7-f111-a05a-001dd811b7f9
- CLI: grouped `pa` (`@microsoft/power-apps-cli` 1.1.0, dev dependency). Run as `npx --no-install pa …`. Signed in as gino.cuccia@cms.hhs.gov via `pa auth login --cloud usgov`. Default env hostnames need the `Default-` prefix on the env id, and `NODE_USE_SYSTEM_CA=1` for the CMS proxy.

## Decisions

- **508 and CMS/Leidos branding do not apply** – for-fun project (Gino, 2026-11-03). Keep the design's own look.
- Target the Development environment, not Prod (Gino created the PowerPlatformConference solution for it, 2026-11-03).

## Completed Steps

- [x] Prerequisites (Node v22.17.1, Git 2.50.1)
- [x] Scaffold (`npx degit microsoft/PowerAppsCodeApps/templates/vite`, npm install, + `@microsoft/power-apps-cli` 1.1.0 dev, + `@fontsource/nunito`)
- [x] Init (`pa app init --non-interactive -t CodeApp -e cb3e4efb-… -n "Conference Quest"`)
- [x] Baseline deploy 2026-11-03 (`pa app push --non-interactive -s 957df1a7-…`) – proves code apps are enabled in Development
- [x] Build the game (2026-11-03): data loader, decks, sprites, scenes, asset script
- [x] Local test in the Browser pane (2026-11-03): all 11 decks + expo deck (176 slides) fit the board, stars persist across reload, expo unlocked at 11/11 (now always open), restroom/coffee/phone scenes, zoom, phone landscape + portrait hint, no console errors
- [x] Deploy v1.0.0 to Development (2026-11-03) – pushed into PowerPlatformConference
- [x] v1.0.1 (2026-11-03): session 10 renamed "…: Managed Run Apps vs Power Pages"; "MRA" spelled out as "Managed Run App" and the code-app reference removed (Gino: avoid code app vs MRA confusion). Changed in data/sessions/10-…json, scripts/make_data.py, README.
- [x] v1.0.2 built (2026-11-03): `docs/PPCC 2026 Conference Summary.docx` session 7 (= session 10 in the data) reworded the same way – TOC line, heading, and 6 body runs (text-only XML edit; markup otherwise byte-identical; opens in Word). Real code-app mentions (Session 4, comparison caption, docs link) kept. Deployed to Development 2026-11-03.
- [x] v1.0.3 deployed (2026-11-03): **Rob** stands at the end of the hallway (cartoon in a navy suit and striped tie, from Gino's photo; the photo itself isn't in the app). Hover shows 'Say hi to Rob'; click opens the `rob` scene: arms up, spiky gold hair, aura/flames/sparks/lightning, POWER LEVEL MAX, 'BUILD MODE!', dialog 'ROB: We are going to build everything!'. A/B goes back to the hallway. Sprites: `SPRITES.rob` / `SPRITES.robPowered` (`suited()` in sprites.ts); scene `RobPowerUp` in Extras.tsx. Generic anime power-up style, no Dragon Ball Z characters or art copied.
- [x] v1.0.4 deployed (2026-11-03): **expo hall always open** (Gino: don't lock it) – door always lit, 'Expo hall' row always last in the list, finale reworded. Session 11 (Managed Identity and VNet) stays: it comes from Anthony's notes, written from the slides ('Didn't attend; notes are from the slides'), so attendedBy is empty – Gino chose to keep it (2026-11-03).
- [x] Docs + commit (2026-11-03) – README section, app README; push to GitHub only on Gino's OK

## How it's built

- `src/data/conference.ts` – loads `../data/sessions/*.json` + `../data/conference.json` with `import.meta.glob` (eager); `slideUrl()` maps key slides to the resized copies.
- `src/data/deck.ts` – `buildDeck(session)`: title (summary + speakers/date/attended) → Why it matters → one slide per key point (tag = whose notes) → What's new (announcements, 4 per slide) → key slide photos → perspectives → open questions → links → Session complete ★. `buildExpoDeck()`: welcome + stats → 9 themes → recommendations (3 per slide) → key dates (4 per slide) → Thanks for playing.
- `src/game/game.ts` – the design's Component class as a small external store (`useSyncExternalStore` in `useGame.ts`). Screens: welcome, hall, class, expo, restroom, coffee, phone. Stars saved in localStorage `conference-quest.done.v1`.
- `src/game/sprites.ts` – the design's SVG characters as `data:` URIs.
- `src/scenes/` – `common.tsx` (Stage scale-to-fit + portrait hint, DialogBox, Whiteboard with auto-fit text, ZoomOverlay), `Welcome`, `Hallway` (session list shows 6 rows + scroll so the coffee counter stays visible; expo door at the end of the corridor), `Classroom` (+ `ExpoHall`), `Extras` (restroom/coffee/phone).
- Static scenery is the design's own markup injected with `Decor` (`dangerouslySetInnerHTML`, `display: contents`).
- `scripts/prepare-assets.ps1` – resizes key slides to 1280 px JPEGs (System.Drawing) into `src/assets/slides/` (git-ignored); runs automatically as `prebuild`.
- Summary .docx is imported from `../docs` with `?url` (3.6 MB asset).
- Font: `@fontsource/nunito` 600/700/800 (Google Fonts would be blocked by the code-app CSP).

## Local preview

The Browser pane's `preview_start` read the old OneDrive RecipeApp launch.json in this session, so the dev server was started directly:
`node conference-quest-app/node_modules/vite/bin/vite.js conference-quest-app --port 5200 --strictPort` (from the repo root) → http://localhost:5200. A `.claude/launch.json` entry `conference-quest` exists for new sessions opened on this repo.

## Blocker (2026-11-04)

Push to the CMS default environment returns 403 CodeAppOperationNotAllowedInEnvironment. An environment admin must enable Code apps (Power Platform admin center > environment > Settings > Product > Features) before `pa app push` works.

## Open items / to test in the player

- Does the "boring document" download work inside the Power Apps player frame? If not, change that card.
- Sharing with Anthony: Developer environment + guest account + license/PAYG – check before sharing.

## Deploy

```bash
npx eslint src
npm run build
npx --no-install pa app push --non-interactive -s 44a94f67-dfd7-f111-a05a-001dd811b7f9
```

## Lessons learned

- **Hidden Browser pane throttles timers and stops CSS transitions.** Screenshots show half-finished wipes and slow typing; it's not an app bug. For scripted checks, wait on the `.wipe` element's inline `opacity`, not the computed value, and yield with `MessageChannel` instead of `setTimeout`.
- **Slide overflow check:** the scripted walk-through of every deck (`.board-body` scrollHeight vs clientHeight) found 5 long slides. Fixed with the auto-fit in `Whiteboard` (shrinks `--fit` down to 0.7).
- **Hallway list:** 11 rows covered the coffee counter. Fixed by showing 6 rows with scrolling, and the selected row wraps to its full title.
- **Editing the Word summary:** there's no pandoc, LibreOffice or defusedxml on this machine, so the docx skill's merge/validate scripts can't run. Edit text-only inside `<w:t>` runs (check each phrase is in one run), repack with Python `zipfile` keeping entry order, then prove it's text-only (markup identical once text is stripped) and open it read-only in Word via COM.
