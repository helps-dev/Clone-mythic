# NOMMO — Ancestral Water Protocol

A landing site styled after the MYTHIC layout, but themed around the **Nommo**
philosophy from Dogon (Mali) cosmology: amphibious ancestral beings descended
from **Sirius**, carriers of **the Word**, who seeded the world from the cosmic
egg. Built with the same stack and structure as `mythic-app`, with original
aquatic-cosmic visuals (no copied assets — all SVG/CSS).

## Stack
- **Vite 6** + **React 18** + **TypeScript**
- **React Router 7** for multi-page routing
- **Tailwind CSS v4** (`@tailwindcss/vite`) with a custom abyssal/Sirius theme
- **lucide-react** icons
- **wagmi + viem + RainbowKit** for real Web3 wallet connection on **BNB Smart Chain**

## Getting started
```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # type-check + production build
npm run preview
```

## Web3 setup
1. Create a free WalletConnect project id at https://cloud.reown.com
2. Copy `.env.example` to `.env`
3. Set `VITE_WC_PROJECT_ID=your_id`

Injected wallets (MetaMask) work without it; WalletConnect/mobile needs it.

## Theme & philosophy mapping
| MYTHIC            | NOMMO                          |
|-------------------|--------------------------------|
| Forge an Agent    | Awaken a Vessel                |
| Sovereign minds   | Ancestral minds (from Sirius)  |
| Reputation asset  | Reputation **current**         |
| Guilds            | **Shoals** (schools)           |
| $MYTH sigil       | **$NOMO** Sirian star          |
| Monochrome stone  | Aquatic teal + Sirius-blue     |
| Video background  | Animated SVG/CSS (sigil, bubbles, waves) |

## Routes
| Path     | Page             | Web3 |
|----------|------------------|------|
| `/`      | Wellspring (home) | Connect Wallet |
| `/forge` | Vessel Creator    | Wallet-gated awakening |
| `/docs`  | Codex             | — |
| `/dao`   | Council / Depths  | Wallet-gated voting |
| `/token` | $NOMO Star        | `watchAsset` add token |

## Notes
- All artwork is generated (SVG/CSS): the brand glyph, the animated Sirius
  sigil, the cosmic background, rising bubbles, and the abyssal wave.
- Content is original lore inspired by Dogon cosmology, not copied text.

## Realistic character images (optional)
The site ships with hand-drawn SVG characters that work offline. To replace them
with **photorealistic** generated art, configure an image backend and run the
generator — the site auto-uses the PNGs and falls back to SVG if absent.

1. Configure one backend (env vars):
   - **9Router:** `NINEROUTER_URL` (+ `NINEROUTER_KEY` if auth). Optional `NINEROUTER_IMAGE_MODEL`.
   - **OpenAI:** `OPENAI_API_KEY`. Optional `OPENAI_IMAGE_MODEL` (default `gpt-image-1`).
2. Generate:
   ```bash
   node scripts/generate-characters.mjs            # all 5
   node scripts/generate-characters.mjs oracle     # just one
   ```
3. Output lands in `public/characters/*.png` (ancestor, warden, oracle, weaver, diver).
4. Restart the dev server.

The prompts (a Dogon/Sirius amphibious "Nommo" being) live in `scripts/generate-characters.mjs`.
