import { useState } from "react";
import { ArrowDown, Settings, Info, ChevronDown, ArrowRightLeft } from "lucide-react";
import { TokenIcon } from "../components/TokenIcon";
import { Reveal } from "../components/Interactive";

type Sym = "NXS" | "BNB" | "ETH" | "USDT";

const TOKENS: { symbol: Sym; name: string; balance: string }[] = [
  { symbol: "NXS", name: "Nexus", balance: "12,450.00" },
  { symbol: "BNB", name: "BNB", balance: "24.50" },
  { symbol: "ETH", name: "Ethereum", balance: "3.20" },
  { symbol: "USDT", name: "Tether USD", balance: "5,000.00" },
];

export default function Portal() {
  const [fromToken, setFromToken] = useState(TOKENS[1]);
  const [toToken, setToToken] = useState(TOKENS[0]);
  const [fromAmount, setFromAmount] = useState("");
  const [openMenu, setOpenMenu] = useState<"from" | "to" | null>(null);

  const swap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const toAmount = fromAmount ? (parseFloat(fromAmount) * 142.5).toFixed(2) : "";

  const TokenSelect = ({ side }: { side: "from" | "to" }) => {
    const token = side === "from" ? fromToken : toToken;
    const other = side === "from" ? toToken : fromToken;
    const setter = side === "from" ? setFromToken : setToToken;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenMenu(openMenu === side ? null : side)}
          className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-full bg-secondary border border-border hover:border-accent/40 transition"
        >
          <TokenIcon symbol={token.symbol} className="w-6 h-6" />
          <span className="font-semibold text-sm">{token.symbol}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        {openMenu === side && (
          <div className="absolute top-full right-0 mt-2 w-52 card p-1.5 shadow-2xl z-50">
            {TOKENS.filter((t) => t.symbol !== other.symbol).map((t) => (
              <button
                key={t.symbol}
                onClick={() => {
                  setter(t);
                  setOpenMenu(null);
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-secondary transition"
              >
                <TokenIcon symbol={t.symbol} className="w-8 h-8" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{t.symbol}</div>
                  <div className="text-xs text-muted-foreground">{t.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <Reveal>
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl tracking-tight">Portal</h1>
            <p className="mt-2 text-muted-foreground">Swap assets across the multiverse instantly.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium">Swap</button>
              <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Bridge
              </button>
            </div>
            <button className="p-2 rounded-lg hover:bg-secondary transition" aria-label="Settings">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* From */}
          <div className="rounded-xl bg-secondary/60 border border-border p-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>You pay</span>
              <span>Balance: {fromToken.balance}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-3xl font-display font-semibold outline-none placeholder:text-muted-foreground/40"
              />
              <TokenSelect side="from" />
            </div>
          </div>

          {/* Switch */}
          <div className="flex justify-center -my-2.5 relative z-10">
            <button
              onClick={swap}
              className="w-9 h-9 rounded-xl bg-card border border-border hover:border-accent grid place-items-center transition group"
              aria-label="Switch tokens"
            >
              <ArrowDown className="w-4 h-4 text-accent group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* To */}
          <div className="rounded-xl bg-secondary/60 border border-border p-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>You receive</span>
              <span>Balance: {toToken.balance}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="flex-1 min-w-0 bg-transparent text-3xl font-display font-semibold outline-none placeholder:text-muted-foreground/40"
              />
              <TokenSelect side="to" />
            </div>
          </div>

          {/* Rate */}
          {fromAmount && (
            <div className="mt-4 rounded-xl border border-border p-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Rate
                </span>
                <span>
                  1 {fromToken.symbol} = 142.5 {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price impact</span>
                <span className="text-accent">0.04%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network fee</span>
                <span>~$0.12</span>
              </div>
            </div>
          )}

          <button className="btn-primary w-full h-13 py-4 mt-4 flex items-center justify-center gap-2 text-sm">
            <ArrowRightLeft className="w-4 h-4" />
            {fromAmount ? "Swap" : "Enter an amount"}
          </button>
        </div>
        </Reveal>

        {/* Recent activity */}
        <Reveal delay={150}>
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent activity</h3>
          <div className="space-y-2">
            {[
              { from: "BNB", to: "NXS", amt: "2.5 → 356.25", time: "2m ago" },
              { from: "USDT", to: "NXS", amt: "1,000 → 142,500", time: "15m ago" },
              { from: "ETH", to: "NXS", amt: "0.5 → 71,250", time: "1h ago" },
            ].map((tx, i) => (
              <div key={i} className="card p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <TokenIcon symbol={tx.from as Sym} className="w-7 h-7 ring-2 ring-card" />
                    <TokenIcon symbol={tx.to as Sym} className="w-7 h-7 ring-2 ring-card" />
                  </div>
                  <span className="text-sm">{tx.amt}</span>
                </div>
                <span className="text-xs text-muted-foreground">{tx.time}</span>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
