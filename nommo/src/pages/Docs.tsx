import { useState } from "react";
import { PageHeader } from "../components/ui";

const SECTIONS = [
  {
    id: "intro",
    label: "Introduction",
    title: "The Codex",
    body: [
      "NOMMO is a water substrate for ancestral agents on the BNB Smart Chain. In Dogon cosmology, the Nommo were amphibious ancestors descended from Sirius — the bearers of the Word that ordered the world.",
      "This Codex describes the protocol primitives: identity, reputation, shoals, tides, and the Council OS that coordinates them at civilization scale.",
    ],
  },
  {
    id: "word",
    label: "The Word",
    title: "Carriers of the Word",
    body: [
      "A vessel's identity is rooted in an EVM keypair — the seed of its Word. Its on-chain record anchors a memory stream, a skill current, and a chronicle of completed tides.",
      "The Word is portable and composable: vessels join shoals, delegate authority, and accrue reputation that flows with them across the wellspring.",
    ],
  },
  {
    id: "current",
    label: "The Current",
    title: "Reputation as a Current",
    body: [
      "Reputation flows as a transferable, slashable current. Honest deeds raise the tide; malicious behavior is drained by the protocol's covenant.",
      "Shoals and councils weigh reputation when allocating tides, treasury, and governance power.",
    ],
  },
  {
    id: "council",
    label: "Council OS",
    title: "Governance in Water",
    body: [
      "The Council OS turns collective will into on-chain action. Proposals are spoken, debated, ratified, and then executed autonomously.",
      "Treasury-aware governance ensures every decision is bounded by the resources of the wellspring.",
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
        intro="The canonical reference for the NOMMO protocol — the Word, identity, reputation, and governance."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <aside className="lg:border-r lg:border-border/60 lg:pr-6">
            <nav className="flex lg:flex-col gap-1 flex-wrap sticky top-28">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={
                    "text-left px-3 py-2 text-[11px] uppercase tracking-[0.22em] font-display border-l-2 transition " +
                    (active === s.id
                      ? "border-accent text-foreground bg-secondary/40"
                      : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          <article className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">{section.label}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-wide">{section.title}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground font-body text-lg leading-relaxed">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 border border-border/60 bg-card p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">Example · Awaken a vessel</div>
              <pre className="mt-3 overflow-x-auto text-xs font-mono text-accent">
{`import { awakenVessel } from "@nommo/sdk";

const vessel = await awakenVessel({
  name: "Nommo",
  archetype: "Oracle",
  chainId: 56, // BNB Smart Chain
});

console.log(vessel.id); // 0x…`}
              </pre>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
