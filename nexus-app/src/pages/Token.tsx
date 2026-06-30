import { Link } from "react-router-dom";
import { TrendingUp, Users, Zap, Shield, Globe, Lock, ArrowRight, Copy, ExternalLink } from "lucide-react";
import { LogoMark } from "../components/Logo";
import { Reveal, TiltCard } from "../components/Interactive";
import { useCountUp } from "../hooks/useInteractive";

const STATS = [
  { label: "Price", value: "$0.0847", change: "+12.4%", up: true },
  { label: "Market Cap", value: "$84.7M", change: "+8.2%", up: true },
  { label: "24h Volume", value: "$12.4M", change: "-3.1%", up: false },
  { label: "Circulating", value: "1B NXS", change: "", up: true },
];

const TOKENOMICS = [
  { label: "Community & Staking", percent: 40, color: "#34e0c4" },
  { label: "Development", percent: 20, color: "#8b7cff" },
  { label: "Team & Advisors", percent: 15, color: "#ff6fae" },
  { label: "Marketing", percent: 10, color: "#ffc24b" },
  { label: "Liquidity", percent: 10, color: "#4ade80" },
  { label: "Reserve", percent: 5, color: "#60a5fa" },
];

const UTILITY = [
  { icon: Zap, title: "Staking Rewards", desc: "Earn up to 256% APY across optimized quantum pools." },
  { icon: Shield, title: "Governance", desc: "Vote on proposals and steer the protocol's direction." },
  { icon: Globe, title: "Fee Discounts", desc: "Reduced trading fees when paying with NXS." },
  { icon: Lock, title: "Premium Access", desc: "Unlock exclusive pools and early feature access." },
];

const EXCHANGES = [
  { name: "PancakeSwap", type: "DEX" },
  { name: "MEXC", type: "CEX" },
  { name: "Gate.io", type: "CEX" },
  { name: "BitMart", type: "CEX" },
];

function DonutChart() {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-44 h-44 -rotate-90">
      {TOKENOMICS.map((t) => {
        const len = (t.percent / 100) * circ;
        const seg = (
          <circle
            key={t.label}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={t.color}
            strokeWidth="12"
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-offset}
            opacity="0.9"
          />
        );
        offset += len;
        return seg;
      })}
    </svg>
  );
}

export default function Token() {
  const copy = () => navigator.clipboard.writeText("0x1234567890abcdef1234567890abcdef12345678");

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl glass grid place-items-center animate-float">
            <LogoMark className="w-9 h-9" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-display font-bold text-4xl tracking-tight">$NXS</h1>
            <p className="text-muted-foreground">The native token of the NEXUS protocol</p>
          </div>
        </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, change, up }, i) => (
            <Reveal key={label} delay={i * 70}>
              <PriceStat label={label} value={value} change={change} up={up} />
            </Reveal>
          ))}
        </div>

        {/* Contract */}
        <Reveal>
        <div className="card p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Contract Address</div>
            <div className="text-xs text-muted-foreground">BNB Smart Chain · BEP-20</div>
          </div>
          <div className="flex items-center gap-2">
            <code className="px-3 py-2 rounded-lg bg-secondary font-mono text-sm">0x1234...5678</code>
            <button onClick={copy} className="p-2 rounded-lg hover:bg-secondary transition" aria-label="Copy">
              <Copy className="w-4 h-4 text-muted-foreground hover:text-accent" />
            </button>
            <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-secondary transition" aria-label="Explorer">
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-accent" />
            </a>
          </div>
        </div>
        </Reveal>

        {/* Tokenomics + Utility */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Reveal>
          <TiltCard intensity={4} className="card p-6 h-full">
            <h3 className="font-display font-semibold text-lg mb-6">Tokenomics</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <DonutChart />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display font-bold text-lg">10B</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Supply</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2 w-full">
                {TOKENOMICS.map((t) => (
                  <div key={t.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                      {t.label}
                    </span>
                    <span className="font-mono text-muted-foreground">{t.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
          </Reveal>

          <Reveal delay={100}>
          <TiltCard intensity={4} className="card p-6 h-full">
            <h3 className="font-display font-semibold text-lg mb-6">Token Utility</h3>
            <div className="space-y-3">
              {UTILITY.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/50 transition">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
          </Reveal>
        </div>

        {/* Exchanges */}
        <Reveal>
        <div className="card p-6 mb-8">
          <h3 className="font-display font-semibold text-lg mb-5">Where to Buy</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EXCHANGES.map(({ name, type }) => (
              <a key={name} href="#" className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-transparent hover:border-accent/30 hover:bg-secondary transition">
                <div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-xs text-muted-foreground">{type}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
        </Reveal>

        {/* CTA cards */}
        <Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          <Link to="/staking" className="card card-hover p-6 group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg">Stake Your NXS</h3>
                <p className="text-sm text-muted-foreground mt-1">Earn up to 256% APY</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-accent/10 grid place-items-center group-hover:bg-accent/20 transition">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
          </Link>
          <Link to="/governance" className="card card-hover p-6 group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg">Governance</h3>
                <p className="text-sm text-muted-foreground mt-1">Vote and shape the future</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#8b7cff]/10 grid place-items-center group-hover:bg-[#8b7cff]/20 transition">
                <Users className="w-5 h-5 text-[#8b7cff]" />
              </div>
            </div>
          </Link>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceStat({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  const { ref, display } = useCountUp<HTMLDivElement>(value);
  return (
    <div className="card p-5">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div ref={ref} className="font-display text-2xl font-bold">{display}</div>
      {change && <div className={`text-sm mt-0.5 ${up ? "text-emerald-400" : "text-rose-400"}`}>{change}</div>}
    </div>
  );
}
