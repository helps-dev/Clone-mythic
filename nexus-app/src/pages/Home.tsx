import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Zap,
  Globe,
  Layers,
  Lock,
  Activity,
  Cpu,
  Boxes,
} from "lucide-react";
import { AlienPortrait, PortalRings } from "../components/AlienArt";
import { LogoMark } from "../components/Logo";
import { Reveal, TiltCard } from "../components/Interactive";
import { useCountUp, useMouseParallax } from "../hooks/useInteractive";

const STATS = [
  { value: "$2.4B", label: "Total Value Locked" },
  { value: "847K", label: "Active Wallets" },
  { value: "12", label: "Chains Connected" },
  { value: "99.99%", label: "Uptime" },
];

const FEATURES = [
  { icon: Layers, title: "Cross-Chain Bridge", desc: "Move assets seamlessly across 12 chains with sub-second finality and institutional-grade security." },
  { icon: Zap, title: "Quantum Staking", desc: "Earn competitive yields through optimized liquidity pools with auto-compounding rewards." },
  { icon: Shield, title: "Audited Security", desc: "Triple-audited smart contracts with formal verification and a $2M bug bounty program." },
  { icon: Globe, title: "Decentralized Governance", desc: "Token holders steer the protocol through transparent, on-chain voting and proposals." },
  { icon: Cpu, title: "Smart Routing", desc: "Intelligent order routing finds the best price across all connected liquidity sources." },
  { icon: Activity, title: "Real-Time Oracles", desc: "Chainlink-powered price feeds ensure accurate, manipulation-resistant data on every trade." },
];

const ALIENS = [
  { variant: "teal" as const, name: "Zephyr", role: "The Navigator", trait: "Cross-chain routing" },
  { variant: "violet" as const, name: "Nova", role: "The Guardian", trait: "Protocol security" },
  { variant: "rose" as const, name: "Echo", role: "The Oracle", trait: "Data integrity" },
  { variant: "amber" as const, name: "Vox", role: "The Architect", trait: "Smart contracts" },
];

const PARTNERS = ["BNB Chain", "Chainlink", "PancakeSwap", "MetaMask", "Trust Wallet", "Binance", "Arweave", "The Graph"];

const ROADMAP = [
  { phase: "Q1", title: "Genesis", status: "done", items: ["Protocol launch", "Token generation", "Initial pools"] },
  { phase: "Q2", title: "Expansion", status: "active", items: ["Multi-chain bridge", "Staking V2", "Mobile app"] },
  { phase: "Q3", title: "Evolution", status: "next", items: ["DAO governance", "NFT vaults", "AI routing"] },
  { phase: "Q4", title: "Scale", status: "next", items: ["L2 integration", "Institutional API", "Global expansion"] },
];

function Stat({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp<HTMLDivElement>(value);
  return (
    <div className="text-center">
      <div ref={ref} className="font-display text-3xl sm:text-4xl font-bold text-foreground">
        {display}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Home() {
  const hero = useMouseParallax<HTMLDivElement>();

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        ref={hero.ref}
        onMouseMove={hero.onMove}
        onMouseLeave={hero.onLeave}
        className="relative pt-20 pb-28 sm:pt-28 sm:pb-36 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: copy */}
            <div className="text-center lg:text-left">
              <Reveal>
                <div className="pill text-accent border-accent/20 bg-accent/5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Live on BNB Chain
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                  The DeFi protocol
                  <br />
                  <span className="text-gradient">from beyond.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  NEXUS unifies liquidity across the multiverse of blockchains. Bridge, stake, and
                  govern through an interface engineered by an intelligence beyond our own.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link to="/portal" className="btn-primary inline-flex h-12 items-center gap-2 px-7 text-sm">
                    Launch App <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#features" className="btn-ghost inline-flex h-12 items-center gap-2 px-7 text-sm">
                    Explore Protocol
                  </a>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-xs text-muted-foreground">
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Triple Audited</span>
                  <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-accent" /> Non-Custodial</span>
                  <span className="flex items-center gap-2"><Boxes className="w-4 h-4 text-accent" /> Open Source</span>
                </div>
              </Reveal>
            </div>

            {/* Right: alien visual with mouse parallax */}
            <div className="relative flex justify-center items-center">
              <div
                className="relative w-[320px] h-[320px] sm:w-[460px] sm:h-[460px]"
                style={{
                  transform: `translate(${hero.pos.x * 14}px, ${hero.pos.y * 14}px)`,
                  transition: "transform 0.25s ease-out",
                }}
              >
                <PortalRings
                  className="absolute inset-0 w-full h-full animate-rotate-slow"
                  style={{
                    transform: `translate(${hero.pos.x * -20}px, ${hero.pos.y * -20}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                />
                <div
                  className="absolute inset-[12%] rounded-full blur-3xl opacity-50"
                  style={{ background: "radial-gradient(circle, #34e0c4 0%, #8b7cff 60%, transparent 75%)" }}
                />
                <div className="absolute inset-[10%] rounded-full overflow-hidden border border-accent/20 animate-float">
                  <AlienPortrait name="hero" variant="teal" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTNERS MARQUEE ============ */}
      <section className="py-12 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
          Powered by industry leaders
        </p>
        <div className="relative">
          <div className="marquee-track gap-12">
            {[...PARTNERS, ...PARTNERS].map((name, i) => (
              <span key={i} className="font-display text-lg font-medium text-muted-foreground/50 hover:text-accent transition-colors whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <span className="text-sm font-medium text-accent">Capabilities</span>
              <h2 className="mt-3 font-display font-bold text-3xl sm:text-5xl tracking-tight">
                Everything DeFi should be.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A complete suite of financial primitives, engineered for performance, security, and
                an experience that feels effortless.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <TiltCard className="card card-accent p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center mb-5">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE COLLECTIVE ============ */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-sm font-medium text-accent">The Collective</span>
              <h2 className="mt-3 font-display font-bold text-3xl sm:text-5xl tracking-tight">
                Guided by the Architects.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Four intelligences, each governing a pillar of the protocol — security, routing,
                data, and design.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {ALIENS.map(({ variant, name, role, trait }, i) => (
              <Reveal key={name} delay={i * 90}>
                <TiltCard intensity={6} className="card group overflow-hidden h-full">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <AlienPortrait
                      name={name.toLowerCase()}
                      variant={variant}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-70" />
                  </div>
                  <div className="p-5 border-t border-border">
                    <h3 className="font-display font-bold text-lg">{name}</h3>
                    <p className="text-sm text-accent">{role}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{trait}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="card p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              <div className="glow-orb" style={{ top: "-20%", right: "0%", width: "400px", height: "400px", background: "#8b7cff", opacity: 0.15 }} />
              <div className="grid lg:grid-cols-2 gap-12 items-center relative">
                <div>
                  <span className="text-sm font-medium text-accent">How it works</span>
                  <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
                    Three steps to the multiverse.
                  </h2>
                  <div className="mt-8 space-y-6">
                    {[
                      { n: "01", t: "Connect your wallet", d: "Link any Web3 wallet in seconds. Non-custodial, always in your control." },
                      { n: "02", t: "Bridge or swap", d: "Move assets across chains or trade instantly with best-price routing." },
                      { n: "03", t: "Stake & govern", d: "Put assets to work earning yield and vote on the protocol's future." },
                    ].map(({ n, t, d }) => (
                      <div key={n} className="flex gap-4 group">
                        <span className="font-display font-bold text-accent text-lg shrink-0 transition-transform group-hover:scale-125">{n}</span>
                        <div>
                          <h4 className="font-semibold">{t}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/portal" className="btn-primary inline-flex h-11 items-center gap-2 px-6 text-sm mt-9">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="relative flex justify-center">
                  <div className="relative w-72 h-72">
                    <div className="absolute inset-0 rounded-full border border-border animate-rotate-slow" />
                    <div className="absolute inset-8 rounded-full border border-accent/20" />
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="w-28 h-28 rounded-2xl glass grid place-items-center animate-float">
                        <LogoMark className="w-14 h-14" />
                      </div>
                    </div>
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_16px_rgba(52,224,196,0.6)]" />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8b7cff] shadow-[0_0_16px_rgba(139,124,255,0.6)]" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ ROADMAP ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <span className="text-sm font-medium text-accent">Roadmap</span>
              <h2 className="mt-3 font-display font-bold text-3xl sm:text-5xl tracking-tight">
                Charting the course.
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROADMAP.map(({ phase, title, status, items }, i) => (
              <Reveal key={phase} delay={i * 80}>
                <div className={`card p-6 h-full transition-colors hover:border-accent/30 ${status === "active" ? "border-accent/30" : ""}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-2xl text-muted-foreground/40">{phase}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      status === "done" ? "bg-accent/15 text-accent" : status === "active" ? "bg-[#8b7cff]/15 text-[#a99fff]" : "bg-secondary text-muted-foreground"
                    }`}>
                      {status === "done" ? "Complete" : status === "active" ? "In Progress" : "Planned"}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-4">{title}</h3>
                  <ul className="space-y-2.5">
                    {items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="card p-10 sm:p-16 text-center relative overflow-hidden">
              <div className="glow-orb animate-pulse-soft" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "300px", background: "#34e0c4", opacity: 0.18 }} />
              <div className="relative">
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">
                  Join the <span className="text-gradient">collective.</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
                  Become part of a community building the financial layer for an interconnected
                  universe. Early participants earn enhanced rewards.
                </p>
                <div className="mt-9 flex flex-wrap gap-3 justify-center">
                  <Link to="/staking" className="btn-primary inline-flex h-12 items-center gap-2 px-7 text-sm">
                    Start Earning <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex h-12 items-center gap-2 px-7 text-sm">
                    Join Discord <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
