/**
 * Generate realistic NOMMO character images.
 *
 * Backends (auto-detected from env, in priority order):
 *   1) OpenRouter — OPENROUTER_API_KEY   (image via chat completions, e.g. Gemini "Nano Banana")
 *                   optional: OPENROUTER_IMAGE_MODEL (default: google/gemini-2.5-flash-image)
 *   2) 9Router    — NINEROUTER_URL (+ NINEROUTER_KEY)
 *   3) OpenAI     — OPENAI_API_KEY
 *
 * Reads env from process.env and from nommo/.env (auto-loaded).
 *
 * Output: public/characters/<name>.png
 *
 * Run:
 *   node scripts/generate-characters.mjs            # all 5
 *   node scripts/generate-characters.mjs oracle     # subset
 */
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "characters");

// ---- load .env ----
async function loadEnv() {
  try {
    const txt = await readFile(join(ROOT, ".env"), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* no .env */
  }
}

const STYLE =
  "ultra-detailed photorealistic creature concept art of a NOMMO — an ancient amphibious humanoid " +
  "ancestor descended from the star Sirius (Dogon / Mali mythology). Fish-like humanoid with smooth " +
  "iridescent teal-and-deep-blue skin, fine luminous scales, subsurface scattering, wet glistening " +
  "skin, gill slits, elegant fins and a fin crest, webbed hands, large luminous expressive eyes, " +
  "bioluminescent veins. Cinematic studio lighting with dramatic cyan-and-violet rim light, volumetric " +
  "god rays through deep cosmic water, drifting bubbles and glowing plankton, shallow depth of field. " +
  "Symmetrical, centered hero composition. Palette: teal, cyan, deep navy, violet accents, a hint of gold. " +
  "Ethereal, sacred, majestic mood. ArtStation trending, hyperrealistic, 8k, octane render. " +
  "No text, no watermark, no signature, no border.";

const CHARACTERS = {
  "nommo-ancestor": {
    aspect: "3:4",
    prompt: `Full-body majestic hero portrait of the primordial NOMMO ancestor rising from the abyss, arms gracefully raised, lower body a powerful iridescent fish tail with long translucent fins, a radiant Sirius star halo above its head. ${STYLE}`,
  },
  warden: {
    aspect: "1:1",
    prompt: `Front-facing bust portrait of a NOMMO "Warden" — a noble guardian with a broad armored head crest and a glowing shield-sigil on the chest, powerful build, steel-teal skin, stoic and protective gaze. ${STYLE}`,
  },
  oracle: {
    aspect: "1:1",
    prompt: `Front-facing bust portrait of a NOMMO "Oracle" — a serene seer with slender luminous antenna-fins, eyes glowing with starlight, violet-and-blue bioluminescence, a radiant four-point Sirius star floating above. ${STYLE}`,
  },
  weaver: {
    aspect: "1:1",
    prompt: `Front-facing bust portrait of a NOMMO "Weaver" — a graceful creator speaking the Word, flowing golden-teal head crest and tendrils, a glowing spiral glyph of light woven before its webbed hands. ${STYLE}`,
  },
  diver: {
    aspect: "1:1",
    prompt: `Front-facing bust portrait of a NOMMO "Diver" — a sleek deep-sea seeker with streamlined finned crest, cyan and deep-blue skin, a luminous water-droplet emblem on the brow, descending into glowing darkness. ${STYLE}`,
  },
  "cosmic-bg": {
    aspect: "16:9",
    prompt:
      "A breathtaking abyssal cosmic ocean, deep teal-to-black gradient depths, a brilliant distant Sirius " +
      "star casting volumetric god rays downward through dark water, drifting luminescent plankton and bubbles, " +
      "faint glowing sacred-geometry rune circles, nebula-like cosmic dust in violet and cyan, no characters, " +
      "no creatures, atmospheric, cinematic, ultra detailed, 8k, octane render. No text, no watermark.",
  },
};

function dataUrlToBuffer(url) {
  const i = url.indexOf("base64,");
  if (i === -1) throw new Error("not a base64 data url");
  return Buffer.from(url.slice(i + 7), "base64");
}

async function genOpenRouter(prompt, aspect) {
  const model = process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-2.5-flash-image";
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5174",
      "X-Title": "NOMMO Protocol",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
      image_config: { aspect_ratio: aspect, image_size: "2K" },
    }),
  });
  if (!res.ok) throw new Error(`openrouter ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const msg = json.choices?.[0]?.message;
  const img = msg?.images?.[0]?.image_url?.url;
  if (!img) throw new Error("openrouter: no image in response: " + JSON.stringify(json).slice(0, 300));
  return dataUrlToBuffer(img);
}

async function gen9router(prompt) {
  const url = process.env.NINEROUTER_URL.replace(/\/$/, "");
  const model = process.env.NINEROUTER_IMAGE_MODEL || "gemini/gemini-3-pro-image-preview";
  const headers = { "Content-Type": "application/json" };
  if (process.env.NINEROUTER_KEY) headers["Authorization"] = `Bearer ${process.env.NINEROUTER_KEY}`;
  const res = await fetch(`${url}/v1/images/generations?response_format=binary`, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, prompt, size: "1024x1024" }),
  });
  if (!res.ok) throw new Error(`9router ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function genOpenAI(prompt) {
  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, prompt, size: "1024x1024", n: 1 }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${await res.text()}`);
  const d = (await res.json()).data[0];
  if (d.b64_json) return Buffer.from(d.b64_json, "base64");
  if (d.url) return Buffer.from(await (await fetch(d.url)).arrayBuffer());
  throw new Error("openai: no image in response");
}

async function main() {
  await loadEnv();

  let backend, gen;
  if (process.env.OPENROUTER_API_KEY) {
    backend = "openrouter";
    gen = (c) => genOpenRouter(c.prompt, c.aspect);
  } else if (process.env.NINEROUTER_URL) {
    backend = "9router";
    gen = (c) => gen9router(c.prompt);
  } else if (process.env.OPENAI_API_KEY) {
    backend = "openai";
    gen = (c) => genOpenAI(c.prompt);
  } else {
    console.error("\nNo image backend configured. Set OPENROUTER_API_KEY (or NINEROUTER_URL / OPENAI_API_KEY).\n");
    process.exit(1);
  }

  console.log(`Backend: ${backend}`);
  await mkdir(OUT_DIR, { recursive: true });

  const requested = process.argv.slice(2);
  const names = requested.length ? requested : Object.keys(CHARACTERS);

  for (const name of names) {
    const c = CHARACTERS[name];
    if (!c) {
      console.warn(`skip unknown character: ${name}`);
      continue;
    }
    process.stdout.write(`Generating ${name} … `);
    try {
      const buf = await gen(c);
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
