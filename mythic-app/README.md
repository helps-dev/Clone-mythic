# MYTHIC — React Clone (Vite + React + Tailwind v4 + Web3)

A faithful, framework-based clone of the MYTHIC landing page, built with the
same stack as the original (Vite + React + Tailwind v4) plus real wallet
connectivity to BNB Smart Chain.

## Stack
- **Vite 6** + **React 18** + **TypeScript**
- **React Router 7** for multi-page routing
- **Tailwind CSS v4** (`@tailwindcss/vite`) with the original design tokens
- **lucide-react** icons (same icon set as the source)
- **wagmi + viem + RainbowKit** for real Web3 wallet connection (MetaMask,
  Trust Wallet, WalletConnect, etc.) on **BNB Smart Chain** (mainnet `56`,
  testnet `97`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Web3 setup (Connect Wallet)
The "Connect Wallet" button uses RainbowKit + wagmi. WalletConnect-based
wallets require a free project id:

1. Create one at https://cloud.reown.com
2. Copy `.env.example` to `.env`
3. Set `VITE_WC_PROJECT_ID=your_id`

Injected wallets like MetaMask work even without the id; WalletConnect QR and
mobile wallets need it. Configure chains in `src/wagmi.ts`.

## Project structure
```
src/
  main.tsx              # providers: Wagmi, React Query, RainbowKit, Router
  App.tsx               # route definitions
  wagmi.ts              # chain + wallet config (BNB Smart Chain)
  index.css             # Tailwind v4 + original design tokens & animations
  components/
    Layout.tsx           # Background + Header + <Outlet/> + Footer + scroll reset
    Background.tsx        # video bg, rotating sigils, aurora sweep, embers
    Header.tsx           # nav (router links), theme toggle, ConnectButton
    Footer.tsx           # footer with router links
    ui.tsx               # shared Divider + PageHeader
  pages/
    Home.tsx             # landing page (all home sections)
    Forge.tsx            # Agent Creator — wallet-gated agent summoning
    Docs.tsx             # Codex — docs with sidebar navigation
    Dao.tsx              # Council — proposals + wallet-gated voting
    Token.tsx            # $MYTH — contract, watchAsset, tokenomics
public/
  assets-v1/             # original images + looping videos
```

## Routes
| Path      | Page          | Web3 |
|-----------|---------------|------|
| `/`       | Home / Sanctum | Connect Wallet |
| `/forge`  | Agent Creator  | Requires wallet to forge an agent |
| `/docs`   | Codex          | — |
| `/dao`    | Council        | Requires wallet to vote on proposals |
| `/token`  | $MYTH          | `watchAsset` to add token to wallet |

## Notes
- Design tokens, fonts (Cinzel / Cormorant Garamond / JetBrains Mono), and
  background animations are reproduced from the original site's CSS.
- Assets and content belong to MYTHIC; this is a study/replica.
- The original is a multi-page SPA. This clone implements the home page;
  nav items scroll to in-page sections.
