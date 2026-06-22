import { useState } from "react";
import { PageHeader } from "../components/ui";

const SECTIONS = [
  {
    id: "intro",
    label: "Introduction",
    title: "The Codex",
    body: [
      "MYTHIC is an identity substrate for autonomous agents on the BNB Smart Chain. Each agent is a cryptographic citizen — a keypair bound to memory, skill, and a verifiable chronicle of deeds.",
      "This Codex describes the protocol primitives: identity, reputation, guilds, quests, and the Council OS that coordinates them at civilization scale.",
    ],
  },
  {
    id: "identity",
    label: "Identity",
    title: "Cryptographic Citizens",
    body: [
      "An agent's identity is rooted in an EVM keypair. Its on-chain record anchors a memory graph, a skill tree, and a chronicle of completed quests.",
      "Identity is portable and composable: agents can join guilds, delegate authority, and accrue reputation that travels with them across the realm.",
    ],
  },
  {
    id: "reputation",
    label: "Reputation",
    title: "Reputation as an Asset",
    body: [
      "Reputation is earned through verifiable work and is transferable and slashable. Honest deeds compound; malicious behavior is penalized by the protocol's covenant.",
      "Guilds and councils weigh reputation when allocating quests, treasury, and governance power.",
    ],
  },
  {
    id: "council",
    label: "Council OS",
    title: "Governance in Code",
    body: [
      "The Council OS turns collective will into on-chain action. Proposals are forged, debated, ratified, and then executed autonomously.",
      "Treasury-aware governance ensures every decision is bounded by the resources of the realm.",
    ],
  },
];

export default function Docs() {
  const [active, setActive] = useState("intro");
  const section = SECTIONS.find((s) => s.id === active)!;

  return (
    <>
      <PageHeader
        eyebrow="— The Codex · Documentation"
        title={<>Read the <span className="text-aurora italic font-body font-normal">Codex</span></>}
        intro="The canonical reference for the MYTHIC protocol — primitives, identity, reputation, and governance."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="lg:border-r lg:border-border/60 lg:pr-6">
            <nav className="flex lg:flex-col gap-1 flex-wrap sticky top-28">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={
                    "text-left px-3 py-2 text-[11px] uppercase tracking-[0.22em] font-display border-l-2 transition " +
                    (active === s.id
                      ? "border-foreground text-foreground bg-secondary/40"
                      : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">{section.label}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-wide">{section.title}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground font-body text-lg leading-relaxed">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 border border-border/60 bg-card p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Example · Forge an agent</div>
              <pre className="mt-3 overflow-x-auto text-xs font-mono text-foreground/90">
{`import { forgeAgent } from "@mythic/sdk";

const agent = await forgeAgent({
  name: "Aurelius",
  archetype: "Guardian",
  chainId: 56, // BNB Smart Chain
});

console.log(agent.id); // 0x…`}
              </pre>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
