# Conference Quest

A retro game-style Power Apps code app for the PPCC 2026 session notes (Vite + React + TypeScript). Rebuilt from the Claude Design prototype "Conference Quest"; content comes from `../data` and `../docs` at build time.

## Run and deploy

```bash
npm install
npm run dev        # local preview (Vite), plays fully outside Power Apps
npx eslint src
npm run build      # prebuild resizes key slides into src/assets/slides (scripts/prepare-assets.ps1)
npx --no-install pa app push --non-interactive -s 0415d2f0-66d8-f111-a05c-001dd80fdbaa
```

Bump `src/version.ts` (shown in the corner) and `package.json` on every deploy.

## Controls

Click/tap, or arrow keys + Enter/Z (A) and Esc/X (B).

Details, IDs, decisions and lessons: [memory-bank.md](memory-bank.md).
