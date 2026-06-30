/**
 * Generate cinematic 3D sci-fi alien character images for NEXUS.
 *
 * Primary backend: Pollinations.ai (FREE, no API key, FLUX model).
 * Fallback: OpenRouter (OPENROUTER_API_KEY) if Pollinations fails.
 *
 * Output: public/aliens/<name>.png
 *
 * Run:
 *   node scripts/generate-aliens.mjs            # all
 *   node scripts/generate-aliens.mjs zephyr     # subset
 */
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "aliens");

async function loadEnv() {
  for (const file of [".env", "../nommo/.env"]) {
    try {
      const txt = await readFile(join(ROOT, file), "utf8");
      for (const line of txt.split("\n")) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
      }
    } catch {
      /* ignore */
    }
  }
}

// Shared cinematic style — hyper-photorealistic creature photography.
const STYLE =
  "hyperrealistic cinematic creature photograph, shot on Hasselblad, 85mm portrait lens, professional " +
  "studio lighting, photorealistic skin with realistic pores subsurface scattering and moisture, " +
  "intricate practical-effects prosthetic detail like a high-budget sci-fi film (Arrival, District 9, Dune), " +
  "a lifelike humanoid alien, elegant elongated cranium, large deep expressive glossy eyes with realistic " +
  "wet reflections, subtle veins and skin texture, faint bioluminescent glow beneath translucent skin, " +
  "refined practical alien makeup and animatronic realism, dramatic cinematic rim lighting, volumetric haze, " +
  "shallow depth of field bokeh, ultra sharp focus on face, 8k, photographic, hyper detailed, award-winning";

const NEG =
  "cartoon, illustration, anime, cgi plastic, 3d render look, painting, drawing, low quality, blurry, " +
  "deformed, extra eyes, text, watermark, signature, logo, ugly, flat lighting";

const ALIENS = {
  zephyr: {
    w: 832, h: 1216,
    prompt: `cinematic close-up portrait photograph of a lifelike humanoid alien "Navigator", smooth silver-teal skin with subtle scales, a streamlined aerodynamic head crest and delicate translucent sensory fins, faint teal bioluminescence glowing softly beneath the skin, calm wise eyes glowing subtle teal, dark moody studio background. ${STYLE}`,
  },
  nova: {
    w: 832, h: 1216,
    prompt: `cinematic close-up portrait photograph of a lifelike humanoid alien "Guardian", powerful presence, deep violet-grey skin with realistic texture, a broad crystalline head ridge, faint violet bioluminescence under translucent skin, intense protective glowing violet eyes, dark moody studio background. ${STYLE}`,
  },
  echo: {
    w: 832, h: 1216,
    prompt: `cinematic close-up portrait photograph of a lifelike humanoid alien "Oracle", serene mystical expression, smooth rose-grey skin, slender luminous antenna-fins, faint rose-magenta bioluminescence beneath translucent skin, eyes glowing softly with insight, dark moody studio background. ${STYLE}`,
  },
  vox: {
    w: 832, h: 1216,
    prompt: `cinematic close-up portrait photograph of a lifelike humanoid alien "Architect", intelligent focused expression, warm gold-grey skin with fine geometric ridge patterns on the cranium, faint amber bioluminescence beneath translucent skin, clever glowing amber eyes, dark moody studio background. ${STYLE}`,
  },
  hero: {
    w: 1024, h: 1216,
    prompt: `epic cinematic close-up portrait photograph of a supreme regal humanoid alien being, an advanced ancient intelligence, perfectly symmetrical face, elegant elongated cranium with an ornate subtle crest, realistic translucent skin with delicate dual teal-and-violet bioluminescent veins glowing softly beneath, profound deep glowing eyes, majestic and serene, dramatic cinematic lighting, dark deep-space studio background. ${STYLE}`,
  },
};

async function genPollinations(prompt, w, h, seed) {
  const enc = encodeURIComponent(`${prompt}. Avoid: ${NEG}`);
  const url = `https://image.pollinations.ai/prompt/${enc}?width=${w}&height=${h}&model=flux&nologo=true&enhance=true&seed=${seed}`;
  const res = await fetch(url, { headers: { "User-Agent": "nexus-gen/1.0" } });
  if (!res.ok) throw new Error(`pollinations ${res.status}: ${(await res.text()).slice(0, 120)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error("pollinations: image too small / empty");
  return buf;
}

async function main() {
  await loadEnv();
  await mkdir(OUT_DIR, { recursive: true });

  const requested = process.argv.slice(2);
  const names = requested.length ? requested : Object.keys(ALIENS);

  let seed = 7;
  for (const name of names) {
    const c = ALIENS[name];
    if (!c) {
      console.warn(`skip unknown alien: ${name}`);
      continue;
    }
    process.stdout.write(`Generating ${name} (this can take 20-40s) … `);
    try {
      const buf = await genPollinations(c.prompt, c.w, c.h, seed++);
      await writeFile(join(OUT_DIR, `${name}.png`), buf);
      console.log(`saved (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.log("FAILED");
      console.error("  " + e.message);
    }
  }
  console.log("\nDone. Restart the dev server if running.");
}

main();
