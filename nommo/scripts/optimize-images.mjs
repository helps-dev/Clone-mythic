/**
 * Convert PNG character images to WebP for faster loading.
 *
 * Requires: sharp (npm install --save-dev sharp)
 * Run:      node scripts/optimize-images.mjs
 */
import { readdir, stat } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const CHAR_DIR = join(__dirname, "..", "public", "characters");

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("sharp not installed. Run: npm install --save-dev sharp");
    process.exit(1);
  }

  const files = await readdir(CHAR_DIR);
  const pngs = files.filter((f) => f.endsWith(".png"));

  if (pngs.length === 0) {
    console.log("No PNG files found in", CHAR_DIR);
    return;
  }

  console.log(`Converting ${pngs.length} PNG(s) to WebP...\n`);

  for (const f of pngs) {
    const src = join(CHAR_DIR, f);
    const dst = join(CHAR_DIR, basename(f, ".png") + ".webp");

    const before = (await stat(src)).size;
    await sharp(src).webp({ quality: 82 }).toFile(dst);
    const after = (await stat(dst)).size;

    const ratio = ((1 - after / before) * 100).toFixed(0);
    console.log(
      `${f} (${(before / 1024).toFixed(0)} KB) → ${basename(dst)} (${(after / 1024).toFixed(0)} KB)  -${ratio}%`
    );
  }

  console.log("\nDone. The Art component auto-prefers WebP when available.");
}

main();
