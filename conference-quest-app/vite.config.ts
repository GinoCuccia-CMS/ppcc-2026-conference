import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { powerApps } from "@microsoft/power-apps-vite/plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), powerApps()],
  // The game reads ../data (sessions JSON) and ../docs (summary .docx) from the repo.
  server: { fs: { allow: [".."] } },
});
