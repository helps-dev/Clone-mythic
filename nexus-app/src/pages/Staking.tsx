import { useState } from "react";
import { Zap, Lock, Clock, TrendingUp, Gift, Shield } from "lucide-react";
import { Reveal, TiltCard } from "../components/Interactive";
import { useCountUp } from "../hooks/useInteractive";

const POOLS = [
  { name: "Quantum Pool", apy: "142%", tvl: "$12.4M", lock: "30 days", min: "100 NXS", accent: "#34e0c4", icon: Zap, rewards: "NXS + Bonus NFT" },
  { name: "Void Vault", apy: "89%", tvl: "$45.2M", lock: "7 days", min: "50 NXS", accent: "#8b7cff", icon: Lock, rewards: "NXS" },
  { name: "Nebula Nexus", apy: "256%", tvl: "$3.8M", lock: "90 days", min: "500 NXS", accent: "#ff6fae", icon: Shield, rewards: "NXS + Voting Power" },
];

const USER_STAKES = [
  { pool: "Quantum Pool", amount: "5,000 NXS", earned: "712.5 NXS", unlock: "18 days" },
  { pool: "Void Vault", amount: "2,500 NXS", earned: "89.2 NXS", unlock: "Unlocked" },
];

export default function Staking() {
  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10">
            <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">Staking</h1>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Lock your assets in optimized pools and earn competitive, auto-compounding yields.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Staked", value: "$61.4M", icon: Lock },
            { label: "Stakers", value: "24,892", icon: TrendingUp },
            { label: "Rewards Paid", value: "$8.2M", icon: Gift },
            { label: "Avg APY", value: "162%", icon: Zap },
          ].map(({ label, value, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 70}>
              <StatCard label={label} value={value} Icon={Icon} />
            </Reveal>
          ))}
        </div>

        {/* Pools */}
        <Reveal>
          <h2 className="font-display font-semibold text-xl mb-5">Available Pools</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {POOLS.map((pool, i) => {
            const Icon = pool.icon;
            const isOpen = selected === pool.name;
            return (
              <Reveal key={pool.name} delay={i * 90}>
                <TiltCard
                  intensity={5}
                  className={`card overflow-hidden h-full ${isOpen ? "border-accent/40" : ""}`}
                >
                <div className="h-1" style={{ background: pool.accent }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl grid place-items-center"
                      style={{ background: `${pool.accent}1a`, border: `1px solid ${pool.accent}33` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: pool.accent }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold">{pool.name}</h3>
                      <p className="text-xs text-muted-foreground">{pool.rewards}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <Row label="APY" value={<span className="font-display font-bold text-lg" style={{ color: pool.accent }}>{pool.apy}</span>} />
                    <Row label="TVL" value={pool.tvl} />
                    <Row label="Lock period" value={<span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pool.lock}</span>} />
                    <Row label="Min stake" value={pool.min} />
                  </div>

                  {isOpen ? (
                    <div className="mt-5 pt-5 border-t border-border">
                      <label className="text-xs text-muted-foreground block mb-2">Amount to stake</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1 min-w-0 bg-secondary rounded-lg px-3 py-2.5 font-display outline-none border border-transparent focus:border-accent/40"
                        />
                        <button className="px-3 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition">
                          MAX
                        </button>
                      </div>
                      <button className="btn-primary w-full h-11 mt-3 text-sm">Stake Now</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelected(pool.name)}
                      className="btn-ghost w-full h-11 mt-5 text-sm"
                    >
                      Select Pool
                    </button>
                  )}
                </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* User stakes */}
        <Reveal>
          <h2 className="font-display font-semibold text-xl mb-5">Your Stakes</h2>
        </Reveal>
        <Reveal>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left font-medium px-6 py-4">Pool</th>
                  <th className="text-left font-medium px-6 py-4">Staked</th>
                  <th className="text-left font-medium px-6 py-4">Earned</th>
                  <th className="text-left font-medium px-6 py-4">Unlock</th>
                  <th className="text-right font-medium px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {USER_STAKES.map((s, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2.5 font-medium">
                        <Shield className="w-4 h-4 text-accent" />
                        {s.pool}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-display">{s.amount}</td>
                    <td className="px-6 py-4 text-accent font-display">+{s.earned}</td>
                    <td className="px-6 py-4">
                      <span className={s.unlock === "Unlocked" ? "text-accent" : "text-muted-foreground"}>
                        {s.unlock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                          s.unlock === "Unlocked"
                            ? "btn-primary"
                            : "bg-secondary text-muted-foreground cursor-not-allowed"
                        }`}
                        disabled={s.unlock !== "Unlocked"}
                      >
                        {s.unlock === "Unlocked" ? "Claim" : "Locked"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCard({ label, value, Icon }: { label: string; value: string; Icon: typeof Lock }) {
  const { ref, display } = useCountUp<HTMLDivElement>(value);
  return (
    <div className="card p-5">
      <Icon className="w-5 h-5 text-accent mb-3" />
      <div ref={ref} className="font-display text-2xl font-bold">{display}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
