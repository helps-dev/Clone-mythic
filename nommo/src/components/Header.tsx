import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Moon, Sun, Menu, Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NAV: { label: string; to: string }[] = [
  { label: "Wellspring", to: "/" },
  { label: "Vessel", to: "/forge" },
  { label: "Tide", to: "/forge" },
  { label: "🜄 Star", to: "/token" },
  { label: "Depths", to: "/dao" },
  { label: "Council", to: "/dao" },
  { label: "$NOMO", to: "/token" },
  { label: "Codex", to: "/docs" },
];

export default function Header() {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !dark;
    setDark(next);
    root.classList.toggle("dark", next);
    root.classList.toggle("light", !next);
  }

  const linkClass = (active: boolean) =>
    "px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] font-display transition-colors border-b " +
    (active
      ? "text-foreground border-accent"
      : "text-muted-foreground border-transparent hover:text-foreground hover:border-border");

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-xl bg-background/80 border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/nommo-glyph.svg"
              alt="NOMMO"
              className="h-9 w-9 drop-shadow-[0_0_12px_rgba(95,224,216,0.55)]"
              width={36}
              height={36}
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold tracking-[0.35em] text-base">NOMMO</span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground mt-0.5">
                Ancestral Water Protocol
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0">
            {NAV.map((n, i) => (
              <NavLink key={i} to={n.to} end={n.to === "/"} className={({ isActive }) => linkClass(isActive)}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              title={dark ? "Dark mode" : "Light mode"}
              onClick={toggleTheme}
              className="inline-flex items-center justify-center border border-border/60 hover:border-accent/70 transition h-9 w-9"
            >
              {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <div className="hidden sm:block">
              <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
                  const connected = mounted && account && chain;
                  return (
                    <button
                      onClick={connected ? openAccountModal : openConnectModal}
                      className="water-btn inline-flex items-center gap-2 rounded-none border transition font-display tracking-[0.18em] uppercase h-10 px-5 text-xs"
                    >
                      <Wallet className="h-3.5 w-3.5" />
                      {connected ? account.displayName : "Connect Wallet"}
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            <button
              className="lg:hidden p-2 border border-border/60 hover:bg-secondary/60"
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Beta sub-bar */}
      <div className="border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-1.5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.35em] font-display text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span>Beta Tide</span>
          <span className="text-accent/50">·</span>
          <span className="hidden sm:inline">Protocol in Descent</span>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-b border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col">
            {NAV.map((n, i) => (
              <NavLink
                key={i}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                className="py-2 text-[12px] uppercase tracking-[0.25em] font-display text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </NavLink>
            ))}
            <div className="pt-3 sm:hidden">
              <ConnectButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
