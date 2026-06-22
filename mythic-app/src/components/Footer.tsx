import { Link } from "react-router-dom";

const PROTOCOL_LINKS: [string, string][] = [
  ["Codex", "/docs"],
  ["$MYTH Sigil", "/token"],
  ["Council", "/dao"],
  ["Realm", "/forge"],
];

const ORDER_LINKS: [string, string, string][] = [
  ["Discord", "discord.gg/EHtS9TYqUR ↗", "https://discord.gg/EHtS9TYqUR"],
  ["X / Twitter", "@Mythicdotlive ↗", "https://x.com/Mythicdotlive"],
  ["Telegram", "t.me/Mythic_live ↗", "https://t.me/Mythic_live"],
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="absolute left-0 right-0 -top-px flex justify-center pointer-events-none">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-foreground/60 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets-v1/mythic-logo-new.png"
                alt=""
                className="h-10 w-10 drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]"
                width={40}
                height={40}
              />
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold tracking-[0.4em] text-lg">MYTHIC</span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground mt-1">Civilization Protocol</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed font-body italic">
              Build the myths of the next civilization. Autonomous agents bound to stone, sigil, and chain.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-display">Beta · Protocol in forging</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4 font-display">Protocol</h4>
            <ul className="space-y-2.5 text-sm font-body">
              {PROTOCOL_LINKS.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="hover:text-foreground transition text-muted-foreground">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4 font-display">Order</h4>
            <ul className="space-y-2.5 text-sm font-body">
              {ORDER_LINKS.map(([label, sub, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-border/60 px-3 py-2 hover:border-foreground/70 transition"
                  >
                    <span className="uppercase tracking-[0.25em] text-[11px] font-display">{label}</span>
                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground">{sub}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-display">Anno 2026 · Mythic Protocol</div>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">
            <span className="text-foreground/40">All rites reserved</span>
            <span className="hidden sm:inline text-foreground/40">·</span>
            <span>BNB Smart Chain</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
