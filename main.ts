import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry program for the news-image-20261119 bounty.
// The image is a pre-rendered newspaper collage that sums up the
// world news of Thursday 19 November 2026. This program copies it
// to the output directory the grader provides, byte for byte.

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  console.error("entry.png not found next to main.ts");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed intact before reporting success.
const { statSync } = await import("node:fs");
if (statSync(source).size !== statSync(target).size) {
  console.error("copied file size does not match entry.png");
  process.exit(1);
}

console.log("wrote " + target);
