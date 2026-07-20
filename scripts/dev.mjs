// Dev launcher that forces NODE_ENV=development.
//
// Why: this machine has NODE_ENV=production set globally. `next dev` then
// skips its Tailwind/PostCSS pipeline and fails to parse globals.css
// ("Unexpected character '@'"). A committed wrapper (no external dependency)
// guarantees the correct env even when `npm install` omits devDependencies.
import { spawn } from "node:child_process";

process.env.NODE_ENV = "development";

const child = spawn("next", ["dev", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
