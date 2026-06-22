import { useState } from "react";
import { useWalletClient } from "wagmi";
import { Copy, Check, PlusCircle } from "lucide-react";
import { PageHeader } from "../components/ui";

// Placeholder $MYTH contract address (replace with the real one when deployed).
const MYTH_ADDRESS = "0x1d2F0Da169ceb9fC7B3144628dB156f3F6c60dBE";
const TOKEN = { symbol: "MYTH", decimals: 18 };

const DISTRIBUTION: [string, number][] = [
  ["Community & Airdrops", 40],
  ["Treasury / DAO", 25],
  ["Core Contributors", 18],
  ["Liquidity", 12],
  ["Advisors", 5],
];

const UTILITY = [
  "Agent Summoning",
  "Governance",
  "Realm Access",
  "Staking Rites",
  "Skill Inscription",
  "Guild Treasury",
];

export default function Token() {
  const { data: walletClient } = useWalletClient();
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(MYTH_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function addToWallet() {
    if (!walletClient) return;
    try {
      await walletClient.watchAsset({
        type: "ERC20",
        options: {
          address: MYTH_ADDRESS,
          symbol: TOKEN.symbol,
          decimals: TOKEN.decimals,
        },
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
        eyebrow="— Native Sigil"
        title={<span className="text-aurora">$MYTH</span>}
        intro="The protocol's economic primitive for a BNB Smart Chain-native civilization. Powers agent summoning, secures the council, and rewards meaningful contribution."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Coin */}
          <div className="relative grid place-items-center order-2 lg:order-1">
            <div className="absolute inset-10 rounded-full bg-foreground/10 blur-3xl animate-aurora" />
            <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-full mythic-frame bg-black">
              <video src="/assets-v1/mythic-coin-spin-v3.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover bg-black" />
            </div>
          </div>

          {/* Contract + actions */}
          <div className="order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Contract · BNB Smart Chain</span>
            <div className="mt-3 flex items-center gap-2 border border-border/60 bg-card px-4 py-3">
              <code className="text-xs sm:text-sm font-mono break-all flex-1">{MYTH_ADDRESS}</code>
              <button onClick={copy} aria-label="Copy address" className="shrink-0 border border-border/60 p-2 hover:border-foreground/70 transition">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <button
              onClick={addToWallet}
              disabled={!walletClient}
              className="mt-5 inline-flex h-11 items-center gap-2 border border-foreground bg-foreground text-background px-6 text-xs uppercase tracking-[0.3em] font-display hover:bg-foreground/85 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <PlusCircle className="h-4 w-4" /> {added ? "Added ✦" : "Add $MYTH to Wallet"}
            </button>
            {!walletClient && (
              <p className="mt-2 text-xs text-muted-foreground font-body italic">Connect a wallet to import the token.</p>
            )}

            <div className="mt-10 grid grid-cols-2 gap-px bg-border/60 border border-border/60">
              {UTILITY.map((u) => (
                <div key={u} className="bg-background px-4 py-3 text-xs uppercase tracking-[0.2em] font-display text-muted-foreground">
                  {u}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Tokenomics</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-wide">Distribution of the Sigil</h2>
          </div>
          <div className="mt-10 max-w-3xl mx-auto space-y-5">
            {DISTRIBUTION.map(([label, pct]) => (
              <div key={label}>
                <div className="flex justify-between text-sm font-body">
                  <span>{label}</span>
                  <span className="font-mono text-muted-foreground">{pct}%</span>
                </div>
                <div className="mt-2 h-2 w-full bg-secondary/60 overflow-hidden">
                  <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
