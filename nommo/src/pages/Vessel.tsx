import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Droplets } from "lucide-react";
import { VESSELS, VESSEL_LIST, type VesselVariant } from "../data/vessels";
import { VesselArt } from "../components/Art";
import { Divider } from "../components/ui";

function isVariant(v: string | undefined): v is VesselVariant {
  return v === "warden" || v === "oracle" || v === "weaver" || v === "diver";
}

export default function Vessel() {
  const { variant } = useParams<{ variant: string }>();

  if (!isVariant(variant)) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-32 text-center">
        <Divider />
        <h1 className="mt-6 font-display font-bold text-4xl tracking-wide">Unknown Vessel</h1>
        <p className="mt-4 text-muted-foreground font-body italic">This ancestor has not yet surfaced.</p>
        <Link to="/" className="water-btn mt-8 inline-flex h-11 items-center gap-2 border px-6 text-xs uppercase tracking-[0.3em] font-display">
          <ArrowLeft className="h-4 w-4" /> Return to the Wellspring
        </Link>
      </section>
    );
  }

  const v = VESSELS[variant];
  const others = VESSEL_LIST.filter((o) => o.variant !== variant);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 star-grid opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-display text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-3.5 w-3.5" /> All Vessels
          </Link>

          <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
            {/* Portrait */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-full bg-accent/15 blur-3xl animate-aurora" />
              <div className="char-frame relative aspect-[3/4] w-full rounded-sm">
                <VesselArt variant={v.variant} className="absolute inset-0 w-full h-full object-cover z-0" />
                <span className="absolute top-2 left-2 h-3 w-3 border-t border-l border-accent/70 z-10" />
                <span className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent/70 z-10" />
                <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent/70 z-10" />
                <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/70 z-10" />
              </div>
            </div>

            {/* Identity */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-display">{v.element}</span>
              <h1 className="mt-3 font-display font-bold text-5xl sm:text-7xl tracking-wide">{v.name}</h1>
              <p className="mt-2 text-xl text-muted-foreground font-body italic">{v.title}</p>
              <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed">{v.lore[0]}</p>
              <Link
                to="/forge"
                className="water-btn mt-8 inline-flex h-12 items-center gap-2 border px-7 text-xs uppercase tracking-[0.3em] font-display transition"
              >
                <Droplets className="h-4 w-4" /> Awaken this Vessel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats + Abilities */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Attributes</span>
            <div className="mt-6 space-y-5">
              {v.stats.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm font-body">
                    <span>{s.label}</span>
                    <span className="font-mono text-muted-foreground">{s.value}</span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-secondary/60 overflow-hidden">
                    <div className="h-full" style={{ width: `${s.value}%`, background: "linear-gradient(90deg,#7af7ee,#3a9bd9)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Abilities</span>
            <div className="mt-6 space-y-4">
              {v.abilities.map((a) => (
                <div key={a.name} className="border border-border/60 bg-card p-5 transition hover:border-accent/50">
                  <h3 className="font-display font-semibold tracking-widest uppercase text-sm text-accent">{a.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-body">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lore continued */}
        <div className="mt-12 max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">— Chronicle</span>
          <div className="mt-4 space-y-4 text-muted-foreground font-body text-lg leading-relaxed">
            {v.lore.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Other vessels */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="text-center">
          <Divider />
          <h2 className="mt-6 text-2xl sm:text-3xl font-display font-bold tracking-wide">The other ancestors</h2>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {others.map((o) => (
            <Link key={o.variant} to={`/vessel/${o.variant}`} className="group char-frame aspect-[3/4] rounded-sm block">
              <VesselArt variant={o.variant} className="absolute inset-0 w-full h-full object-cover z-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="font-display font-semibold tracking-widest uppercase text-xs sm:text-sm">{o.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
