import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Check, X } from "lucide-react";
import { PageHeader } from "../components/ui";

type Proposal = {
  id: string;
  title: string;
  desc: string;
  status: "Active" | "Passed" | "Queued";
  forVotes: number;
  against: number;
};

const INITIAL: Proposal[] = [
  { id: "MIP-014", title: "Ratify the Guild Treasury split", desc: "Allocate 12% of protocol fees to active guild treasuries each epoch.", status: "Active", forVotes: 18420, against: 3110 },
  { id: "MIP-013", title: "Slash dormant Guardian agents", desc: "Reduce reputation of Guardians inactive for >90 days by 15%.", status: "Active", forVotes: 9240, against: 8730 },
  { id: "MIP-012", title: "Enable cross-chain agent bridging", desc: "Authorize the Ascension bridge for agent identity portability.", status: "Queued", forVotes: 22110, against: 1980 },
  { id: "MIP-011", title: "Council quorum to 8%", desc: "Lower the minimum quorum for treasury proposals to 8% of staked $MYTH.", status: "Passed", forVotes: 31200, against: 4400 },
];

const TREASURY = [
  ["$42.8M", "Treasury Value"],
  ["8.4M", "$MYTH Staked"],
  ["312", "Voting Guilds"],
  ["67%", "Avg. Quorum"],
];

export default function Dao() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [proposals, setProposals] = useState(INITIAL);
  const [voted, setVoted] = useState<Record<string, "for" | "against">>({});

  function vote(id: string, dir: "for" | "against") {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    if (voted[id]) return;
    setVoted((v) => ({ ...v, [id]: dir }));
    setProposals((ps) =>
      ps.map((p) =>
        p.id === id
          ? { ...p, forVotes: p.forVotes + (dir === "for" ? 1 : 0), against: p.against + (dir === "against" ? 1 : 0) }
          : p
      )
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="— The Council · DAO"
        title={<>Governance carved in <span className="text-aurora italic font-body font-normal">stone</span></>}
        intro="Proposals are forged, debated, and ratified — then executed autonomously by the protocol's covenant. Connect your wallet to cast a vote."
      />

      {/* Treasury stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border/60 divide-x divide-y md:divide-y-0 divide-border/60">
          {TREASURY.map(([num, label]) => (
            <div key={label} className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold">{num}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-display">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Proposals */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 space-y-4">
        {proposals.map((p) => {
          const total = p.forVotes + p.against || 1;
          const pct = Math.round((p.forVotes / total) * 100);
          const myVote = voted[p.id];
          return (
            <div key={p.id} className="border border-border/60 bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">{p.id}</span>
                <span
                  className={
                    "text-[9px] uppercase tracking-[0.3em] px-2 py-0.5 border " +
                    (p.status === "Active"
                      ? "border-foreground text-foreground"
                      : p.status === "Passed"
                      ? "border-border/60 text-muted-foreground"
                      : "border-border/60 text-muted-foreground")
                  }
                >
                  {p.status}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-display font-bold tracking-wide">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body">{p.desc}</p>

              {/* Vote bar */}
              <div className="mt-5 h-2 w-full bg-secondary/60 overflow-hidden">
                <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>For {p.forVotes.toLocaleString()} ({pct}%)</span>
                <span>Against {p.against.toLocaleString()}</span>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => vote(p.id, "for")}
                  disabled={!!myVote || p.status !== "Active"}
                  className={
                    "inline-flex items-center gap-2 h-10 px-5 text-xs uppercase tracking-[0.25em] font-display border transition disabled:opacity-40 disabled:cursor-not-allowed " +
                    (myVote === "for" ? "bg-foreground text-background border-foreground" : "border-foreground/60 hover:border-foreground")
                  }
                >
                  <Check className="h-3.5 w-3.5" /> For
                </button>
                <button
                  onClick={() => vote(p.id, "against")}
                  disabled={!!myVote || p.status !== "Active"}
                  className={
                    "inline-flex items-center gap-2 h-10 px-5 text-xs uppercase tracking-[0.25em] font-display border transition disabled:opacity-40 disabled:cursor-not-allowed " +
                    (myVote === "against" ? "bg-foreground text-background border-foreground" : "border-foreground/60 hover:border-foreground")
                  }
                >
                  <X className="h-3.5 w-3.5" /> Against
                </button>
                {myVote && <span className="self-center text-[11px] text-muted-foreground font-body italic">Vote recorded ✦</span>}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
