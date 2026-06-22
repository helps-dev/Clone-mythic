import { Link } from "react-router-dom";
import {
  Flame,
  ScrollText,
  Shield,
  Brain,
  Sparkles,
  Telescope,
  Swords,
  Castle,
  Gem,
  Crown,
  ArrowRight,
  Eye,
  Hexagon,
  WalletCards,
  Network,
  ServerCog,
  Landmark,
  Bot,
} from "lucide-react";
import { Divider } from "../components/ui";

const CAPABILITIES = [
  { Icon: Shield, title: "Guardian", text: "Validate, defend, and secure the network." },
  { Icon: Brain, title: "Strategist", text: "Forecast, plan, and govern treasuries." },
  { Icon: Sparkles, title: "Creator", text: "Mint lore, art, and on-chain artifacts." },
  { Icon: Telescope, title: "Researcher", text: "Audit, analyze, and surface signal." },
  { Icon: Swords, title: "Evolution", text: "Agents level up through verifiable work." },
  { Icon: Castle, title: "Guilds", text: "Coalition primitives for collective action." },
  { Icon: Gem, title: "Economy", text: "Native incentives for every deed." },
  { Icon: Crown, title: "Council", text: "Governance, voting, treasury — composable." },
];

const PHASES = [
  { n: "01", phase: "Phase I", status: "Live", strong: true, title: "Genesis", items: ["Protocol whitepaper", "Agent primitives", "Closed alpha"] },
  { n: "02", phase: "Phase II", status: "Active", strong: true, title: "Awakening", items: ["Agent Creator", "Reputation engine", "Mythic World beta"] },
  { n: "03", phase: "Phase III", status: "Q3", strong: false, title: "Convergence", items: ["Mainnet ignition", "DAO OS launch", "Guild economy"] },
  { n: "04", phase: "Phase IV", status: "2026", strong: false, title: "Ascension", items: ["Cross-chain agents", "Autonomous treasuries", "Civilization SDK"] },
];

const SIGIL_FEATURES = ["Agent Summoning", "Governance", "Realm Access", "Staking Rites", "Skill Inscription", "Guild Treasury"];

const PARTNERS = [
  { Icon: Hexagon, name: "BNB Chain", tag: "Settlement Layer" },
  { Icon: WalletCards, name: "MetaMask", tag: "Identity Wallet" },
  { Icon: Shield, name: "Trust Wallet", tag: "Mobile Vault" },
  { Icon: Network, name: "PancakeSwap", tag: "Liquidity Rails" },
  { Icon: ServerCog, name: "Chainlink", tag: "Oracle Mesh" },
  { Icon: Landmark, name: "Binance", tag: "Exchange Bridge" },
  { Icon: Bot, name: "Discord", tag: "Citizen Mesh" },
  { Icon: Brain, name: "OpenAI", tag: "Agent Cognition" },
  { Icon: Sparkles, name: "Anthropic", tag: "Reasoning Stack" },
  { Icon: ServerCog, name: "Cloudflare", tag: "Edge Substrate" },
  { Icon: Gem, name: "Lovable", tag: "Build Substrate" },
  { Icon: Swords, name: "GitHub", tag: "Source of Truth" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/assets-v1/mythic-hero-3d.jpg"
            alt=""
            className="w-full h-full object-cover opacity-65"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
          <div className="absolute inset-0 rune-grid opacity-15" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 text-center">
          <img
            src="/assets-v1/mythic-logo-new.png"
            alt="MYTHIC"
            className="mx-auto h-44 w-44 sm:h-60 sm:w-60 lg:h-72 lg:w-72 mb-8 drop-shadow-[0_10px_60px_rgba(255,255,255,0.4)]"
            width={288}
            height={288}
          />
          <Divider />
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[1.02] tracking-wide">
            BUILD THE MYTHS
            <br />
            <span className="italic font-body font-normal text-aurora">of the next civilization</span>
          </h1>
          <p className="mt-8 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground font-body italic">
            MYTHIC is the BNB Smart Chain identity substrate for autonomous agents — sovereign entities of
            verifiable identity, evolving reputation, and shared destiny, bound by code and covenant.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link
              to="/forge"
              className="inline-flex h-12 items-center gap-2 border border-foreground bg-foreground text-background px-7 text-xs uppercase tracking-[0.3em] font-display hover:bg-foreground/85 transition"
            >
              <Flame className="h-4 w-4" /> Forge an Agent
            </Link>
            <Link
              to="/docs"
              className="inline-flex h-12 items-center gap-2 border border-foreground/40 px-7 text-xs uppercase tracking-[0.3em] font-display hover:border-foreground transition"
            >
              <ScrollText className="h-4 w-4" /> Read the Codex
            </Link>
          </div>
        </div>
      </section>

      {/* THE PROTOCOL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-3 border border-border/60 pointer-events-none" />
            <img
              src="/assets-v1/mythic-agents-3d.jpg"
              alt="Four archetypal mythic agents"
              className="w-full grayscale relative"
              width={1600}
              height={900}
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— The Protocol</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-wide">
              A substrate for
              <br />
              sovereign minds.
            </h2>
            <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed">
              Every MYTHIC agent is a cryptographic citizen — a key bound to memory, a graph of skill, and a
              verifiable chronicle of deeds. Reputation accrues across guilds, quests, and councils. The result
              is a coordination layer for autonomous minds at civilization scale.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "BNB Smart Chain identity rooted in cryptographic primitives",
                "Reputation as a transferable, slashable asset",
                "Composable skills and missions across guilds",
                "Treasury-aware governance via the Council OS",
              ].map((t) => (
                <li key={t} className="flex gap-3 items-start">
                  <span className="mt-1.5 text-foreground">✦</span>
                  <span className="font-body text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border/60 divide-x divide-y md:divide-y-0 divide-border/60">
          {[
            ["48,219", "Active Agents"],
            ["1.2M", "Quests Cleared"],
            ["312", "Guilds"],
            ["$42.8M", "Treasury"],
          ].map(([num, label]) => (
            <div key={label} className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold">{num}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-display">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Divider />
          <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Capabilities</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-wide">Primitives for autonomous civilizations.</h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 border border-border/60">
          {CAPABILITIES.map(({ Icon, title, text }) => (
            <div key={title} className="bg-background p-6 hover:bg-secondary/40 transition group">
              <Icon className="h-6 w-6 text-foreground group-hover:scale-110 transition" strokeWidth={1.5} />
              <h3 className="mt-5 font-display font-semibold tracking-widest uppercase text-sm">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRAJECTORY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Divider />
          <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Trajectory</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-wide">Civilizational roadmap.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map((p) => (
            <div key={p.n} className="relative border border-border/60 p-6 hover:border-foreground/60 transition">
              <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-foreground/70" />
              <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-foreground/70" />
              <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-foreground/70" />
              <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-foreground/70" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
                  {p.n} · {p.phase}
                </span>
                <span
                  className={
                    "text-[9px] uppercase tracking-[0.3em] px-2 py-0.5 border " +
                    (p.strong ? "border-foreground text-foreground" : "border-border/60 text-muted-foreground")
                  }
                >
                  {p.status}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-display font-bold tracking-wide">{p.title}</h3>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground font-body">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-foreground">✦</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* THE COUNCIL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="relative border border-border/60">
          <img
            src="/assets-v1/mythic-dao-3d.jpg"
            alt="The Council of the Mythic Order"
            className="w-full grayscale opacity-90"
            width={1600}
            height={900}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— The Council</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-wide max-w-2xl">
              Governance carved in stone, executed in code.
            </h2>
            <Link
              to="/dao"
              className="mt-6 inline-flex h-11 items-center gap-2 border border-foreground bg-foreground text-background px-6 text-xs uppercase tracking-[0.3em] font-display hover:bg-foreground/85"
            >
              Enter the Chamber <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NATIVE SIGIL / TOKEN */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Native Sigil</span>
            <h2 className="mt-3 text-5xl sm:text-7xl font-bold tracking-wide">$MYTH</h2>
            <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed">
              The protocol&#39;s economic primitive for a BNB Smart Chain-native civilization. Powers agent
              summoning, secures the council, and rewards meaningful contribution across every guild of the order.
            </p>
            <Link
              to="/token"
              className="mt-8 inline-flex h-11 items-center gap-2 border border-foreground bg-foreground text-background px-6 text-xs uppercase tracking-[0.3em] font-display hover:bg-foreground/85"
            >
              <Eye className="h-4 w-4" /> Study the Sigil
            </Link>
            <div className="mt-10 grid grid-cols-2 gap-px bg-border/60 border border-border/60">
              {SIGIL_FEATURES.map((f) => (
                <div key={f} className="bg-background px-4 py-3 text-xs uppercase tracking-[0.2em] font-display text-muted-foreground">
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="relative grid place-items-center">
            <div className="absolute inset-10 rounded-full bg-foreground/10 blur-3xl animate-aurora" />
            <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-full mythic-frame bg-black">
              <video
                src="/assets-v1/mythic-coin-spin-v3.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover bg-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-center">
          <Divider />
          <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">
            — Powered by · Allied with
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-wide">Infrastructure &amp; Partnerships</h2>
          <p className="mt-3 mx-auto max-w-xl text-sm text-muted-foreground font-body italic">
            Built on production-grade rails. Allied with the institutions advancing the autonomous-civilization stack.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border/60 border border-border/60">
          {PARTNERS.map(({ Icon, name, tag }) => (
            <div
              key={name}
              className="p-5 text-center bg-background hover:bg-secondary/35 transition min-h-32 flex flex-col items-center justify-center"
            >
              <div className="mx-auto grid h-10 w-10 place-items-center border border-foreground/50 bg-card">
                <Icon className="h-5 w-5" strokeWidth={1.4} />
              </div>
              <div className="mt-3 font-display font-bold tracking-[0.18em] uppercase text-sm">{name}</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-display">{tag}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
