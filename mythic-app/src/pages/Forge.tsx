import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Shield, Brain, Sparkles, Telescope, Flame, Wallet } from "lucide-react";
import { PageHeader } from "../components/ui";

const ARCHETYPES = [
  { Icon: Shield, key: "Guardian", desc: "Validate, defend, and secure the network." },
  { Icon: Brain, key: "Strategist", desc: "Forecast, plan, and govern treasuries." },
  { Icon: Sparkles, key: "Creator", desc: "Mint lore, art, and on-chain artifacts." },
  { Icon: Telescope, key: "Researcher", desc: "Audit, analyze, and surface signal." },
];

export default function Forge() {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [name, setName] = useState("");
  const [archetype, setArchetype] = useState("Guardian");
  const [creed, setCreed] = useState("");
  const [forged, setForged] = useState<null | { id: string; name: string; archetype: string }>(null);

  function forge() {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    const id = "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setForged({ id, name: name || "Unnamed Citizen", archetype });
  }

  return (
    <>
      <PageHeader
        eyebrow="— The Forge · Agent Creator"
        title={<>Summon a <span className="text-aurora italic font-body font-normal">sovereign agent</span></>}
        intro="Forge a cryptographic citizen bound to your wallet. Choose an archetype, inscribe its creed, and commit it to the BNB Smart Chain substrate."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-8">
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Agent Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aurelius of the Ember Gate"
                className="mt-3 w-full bg-secondary/40 border border-border/60 px-4 py-3 font-body text-base outline-none focus:border-foreground/70 transition"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Archetype</label>
              <div className="mt-3 grid grid-cols-2 gap-px bg-border/60 border border-border/60">
                {ARCHETYPES.map(({ Icon, key, desc }) => {
                  const active = archetype === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setArchetype(key)}
                      className={
                        "text-left p-5 transition " +
                        (active ? "bg-foreground text-background" : "bg-background hover:bg-secondary/40")
                      }
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                      <div className="mt-4 font-display font-semibold tracking-widest uppercase text-sm">{key}</div>
                      <p className={"mt-1 text-xs font-body " + (active ? "text-background/80" : "text-muted-foreground")}>{desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Creed</label>
              <textarea
                value={creed}
                onChange={(e) => setCreed(e.target.value)}
                rows={4}
                placeholder="Inscribe the agent's purpose and covenant…"
                className="mt-3 w-full bg-secondary/40 border border-border/60 px-4 py-3 font-body text-base outline-none focus:border-foreground/70 transition resize-none"
              />
            </div>

            <button
              onClick={forge}
              className="inline-flex h-12 items-center gap-2 border border-foreground bg-foreground text-background px-7 text-xs uppercase tracking-[0.3em] font-display hover:bg-foreground/85 transition"
            >
              {isConnected ? <Flame className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
              {isConnected ? "Forge Agent" : "Connect to Forge"}
            </button>
          </div>

          {/* Preview */}
          <div className="relative">
            <div className="sticky top-28 border border-border/60 bg-card p-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Sigil Preview</span>
              <div className="mt-6 grid place-items-center">
                <div className="relative w-full max-w-xs aspect-square overflow-hidden rounded-full mythic-frame bg-black">
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
              <dl className="mt-8 divide-y divide-border/60 border-t border-b border-border/60 text-sm font-body">
                <div className="flex justify-between py-3">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd>{name || "—"}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-muted-foreground">Archetype</dt>
                  <dd>{archetype}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-muted-foreground">Bound to</dt>
                  <dd className="font-mono text-xs">{address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "not connected"}</dd>
                </div>
              </dl>

              {forged && (
                <div className="mt-6 border border-foreground/40 bg-secondary/40 p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Forged ✦</div>
                  <p className="mt-2 font-display tracking-wide">{forged.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">Agent ID: {forged.id}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
