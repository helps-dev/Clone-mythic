import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Users, FileText, Vote } from "lucide-react";
import { Reveal } from "../components/Interactive";
import { useCountUp } from "../hooks/useInteractive";

const PROPOSALS = [
  { id: "NXP-042", title: "Increase Quantum Pool APY to 180%", status: "active", category: "Treasury", votesFor: 2_450_000, votesAgainst: 890_000, total: 3_340_000, quorum: 5_000_000, ends: "2 days", desc: "Increase the Quantum Pool APY from 142% to 180% to attract more stakers and grow protocol TVL." },
  { id: "NXP-041", title: "Launch Cross-Galaxy Bridge Phase 1", status: "active", category: "Development", votesFor: 4_120_000, votesAgainst: 320_000, total: 4_440_000, quorum: 5_000_000, ends: "5 days", desc: "Begin development of the Cross-Galaxy Bridge connecting NEXUS to Ethereum and Solana." },
  { id: "NXP-040", title: "Community Marketing Fund Allocation", status: "passed", category: "Marketing", votesFor: 6_200_000, votesAgainst: 800_000, total: 7_000_000, quorum: 5_000_000, ends: "Ended", desc: "Allocate 500,000 NXS from treasury for community-driven marketing initiatives." },
  { id: "NXP-039", title: "Implement Fee Reduction Protocol", status: "rejected", category: "Protocol", votesFor: 1_800_000, votesAgainst: 4_200_000, total: 6_000_000, quorum: 5_000_000, ends: "Ended", desc: "Reduce swap fees from 0.3% to 0.1% to increase trading volume." },
];

type Filter = "all" | "active" | "passed" | "rejected";

export default function Governance() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = PROPOSALS.filter((p) => filter === "all" || p.status === filter);

  const statusStyle = (s: string) =>
    s === "active"
      ? "bg-accent/15 text-accent"
      : s === "passed"
      ? "bg-emerald-500/15 text-emerald-400"
      : "bg-rose-500/15 text-rose-400";

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10">
            <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">Governance</h1>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Shape the protocol's future. Your voting power directly influences every decision.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active", value: "2", icon: FileText },
            { label: "Voters", value: "18,492", icon: Users },
            { label: "Passed", value: "38", icon: CheckCircle2 },
            { label: "Your Power", value: "12,450", icon: Vote },
          ].map(({ label, value, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 70}>
              <StatCard label={label} value={value} Icon={Icon} />
            </Reveal>
          ))}
        </div>

        {/* Filters */}
        <Reveal>
        <div className="flex gap-2 mb-6">
          {(["all", "active", "passed", "rejected"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                filter === f ? "bg-accent/10 text-accent border border-accent/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        </Reveal>

        {/* Proposals */}
        <div className="space-y-4">
          {filtered.map((p, idx) => {
            const forPct = (p.votesFor / p.total) * 100;
            const againstPct = (p.votesAgainst / p.total) * 100;
            const isOpen = open === p.id;
            return (
              <Reveal key={p.id} delay={idx * 70}>
              <div className={`card overflow-hidden transition-colors hover:border-accent/30 ${isOpen ? "border-accent/30" : ""}`}>
                <div className="p-6 cursor-pointer" onClick={() => setOpen(isOpen ? null : p.id)}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyle(p.status)}`}>
                          {p.status}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                      <Clock className="w-4 h-4" /> {p.ends}
                    </span>
                  </div>

                  {/* Vote bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-emerald-400">{forPct.toFixed(1)}% For</span>
                      <span className="text-rose-400">{againstPct.toFixed(1)}% Against</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${forPct}%` }} />
                      <div className="h-full bg-rose-500" style={{ width: `${againstPct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{(p.votesFor / 1e6).toFixed(2)}M NXS</span>
                      <span>Quorum {((p.total / p.quorum) * 100).toFixed(0)}%</span>
                      <span>{(p.votesAgainst / 1e6).toFixed(2)}M NXS</span>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-border">
                    <p className="text-sm text-muted-foreground my-4">{p.desc}</p>
                    {p.status === "active" && (
                      <div className="flex gap-3">
                        <button className="btn-ghost flex-1 h-11 text-sm border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> For
                        </button>
                        <button className="btn-ghost flex-1 h-11 text-sm border-rose-500/40 text-rose-400 hover:bg-rose-500/10 flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4" /> Against
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* Create CTA */}
        <Reveal>
        <div className="card p-8 text-center mt-10">
          <h3 className="font-display font-bold text-xl">Have a proposal?</h3>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            Hold at least 10,000 NXS to submit a governance proposal and shape the protocol.
          </p>
          <button className="btn-primary h-11 px-6 text-sm mt-5">Create Proposal</button>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCard({ label, value, Icon }: { label: string; value: string; Icon: typeof Vote }) {
  const { ref, display } = useCountUp<HTMLDivElement>(value);
  return (
    <div className="card p-5">
      <Icon className="w-5 h-5 text-accent mb-3" />
      <div ref={ref} className="font-display text-2xl font-bold">{display}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
