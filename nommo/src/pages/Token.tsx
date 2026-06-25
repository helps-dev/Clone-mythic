import { useState } from "react";
import { useWalletClient } from "wagmi";
import { Copy, Check, PlusCircle } from "lucide-react";
import { PageHeader } from "../components/ui";
import Sigil from "../components/Sigil";

// Placeholder $NOMO contract address (replace with the real one when deployed).
const NOMO_ADDRESS = "0x4E0A7b2cF9b3D81aA0Ee6c5cF3b16d2a8C1f90Ab";
const TOKEN = { symbol: "NOMO", decimals: 18 };

const DISTRIBUTION: [string, number][] = [
  ["Community & Tides", 40],
  ["Treasury / Council", 25],
  ["Core Vessels", 18],
  ["Liquidity Current", 12],
  ["Oracles & Allies", 5],
];

const UTILITY = ["Vessel Summoning", "Governance", "Wellspring Access", "Staking Rites", "Skill Inscription", "Shoal Treasury"];

export default function Token() {
  const { data: walletClient } = useWalletClient();
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(NOMO_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function addToWallet() {
    if (!walletClient) return;
    try {
      await walletClient.watchAsset({
        type: "ERC20",
        options: { address: NOMO_ADDRESS, symbol: TOKEN.symbol, decimals: TOKEN.decimals },
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      /* user rejected */
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="— Sirian Star"
        title={<span className="text-aurora">$NOMO</span>}
        intro="The protocol's economic current for a BNB Smart Chain-native civilization. Powers vessel summoning, secures the council, and rewards meaningful contribution."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative grid place-items-center order-2 lg:order-1">
            <div className="absolute inset-6 rounded-full bg-accent/15 blur-3xl animate-aurora" />
            <div
              className="absolute inset-2 rounded-full opacity-70 animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(122,247,238,0.7), rgba(58,155,217,0.15), rgba(185,139,255,0.6), rgba(122,247,238,0.7))",
                maskImage: "radial-gradient(closest-side, transparent 95%, black 96%)",
                WebkitMaskImage: "radial-gradient(closest-side, transparent 95%, black 96%)",
              }}
            />
            <div className="relative w-full max-w-sm aspect-square rounded-full nommo-frame bg-background/60 p-8 animate-float">
              <Sigil className="w-full h-full" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Contract · BNB Smart Chain</span>
            <div className="mt-3 flex items-center gap-2 border border-border/60 bg-card px-4 py-3">
              <code className="text-xs sm:text-sm font-mono break-all flex-1">{NOMO_ADDRESS}</code>
              <button onClick={copy} aria-label="Copy address" className="shrink-0 border border-border/60 p-2 hover:border-accent/70 transition">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <button
              onClick={addToWallet}
              disabled={!walletClient}
              className="water-btn mt-5 inline-flex h-11 items-center gap-2 border px-6 text-xs uppercase tracking-[0.3em] font-display transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <PlusCircle className="h-4 w-4" /> {added ? "Added ✦" : "Add $NOMO to Wallet"}
            </button>
            {!walletClient && <p className="mt-2 text-xs text-muted-foreground font-body italic">Connect a wallet to import the token.</p>}

            <div className="mt-10 grid grid-cols-2 gap-px bg-border/60 border border-border/60">
              {UTILITY.map((u) => (
                <div key={u} className="bg-background px-4 py-3 text-xs uppercase tracking-[0.2em] font-display text-muted-foreground">
                  {u}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Tokenomics</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-wide">Distribution of the Star</h2>
          </div>
          <div className="mt-10 max-w-3xl mx-auto space-y-5">
            {DISTRIBUTION.map(([label, pct]) => (
              <div key={label}>
                <div className="flex justify-between text-sm font-body">
                  <span>{label}</span>
                  <span className="font-mono text-muted-foreground">{pct}%</span>
                </div>
                <div className="mt-2 h-2 w-full bg-secondary/60 overflow-hidden">
                  <div className="h-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#7af7ee,#b98bff)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
