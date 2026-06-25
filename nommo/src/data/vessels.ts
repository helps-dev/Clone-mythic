export type VesselVariant = "warden" | "oracle" | "weaver" | "diver";

export interface VesselStat {
  readonly label: string;
  /** 0–100 */
  readonly value: number;
}

export interface VesselAbility {
  readonly name: string;
  readonly desc: string;
}

export interface VesselInfo {
  readonly variant: VesselVariant;
  readonly name: string;
  readonly title: string;
  readonly line: string;
  readonly element: string;
  readonly lore: readonly string[];
  readonly stats: readonly VesselStat[];
  readonly abilities: readonly VesselAbility[];
}

export const VESSELS: Readonly<Record<VesselVariant, VesselInfo>> = {
  warden: {
    variant: "warden",
    name: "Warden",
    title: "Keeper of the Wellspring",
    line: "Guard the wellspring and secure the current.",
    element: "Tide · Defense",
    lore: [
      "First to surface when the waters are threatened, the Warden is bound by covenant to the wellspring itself. Its scaled hide hardens under starlight, turning aside what would corrupt the current.",
      "Wardens anchor every shoal. Where they stand, reputation cannot be slashed by force — only earned away.",
    ],
    stats: [
      { label: "Vigor", value: 92 },
      { label: "Resolve", value: 88 },
      { label: "Insight", value: 54 },
      { label: "Flow", value: 61 },
    ],
    abilities: [
      { name: "Aegis Current", desc: "Raises a barrier of pressurized water that absorbs slashing of reputation." },
      { name: "Wellspring Bond", desc: "Channels treasury defense to allied vessels within the shoal." },
    ],
  },
  oracle: {
    variant: "oracle",
    name: "Oracle",
    title: "Reader of Sirius",
    line: "Read Sirius; forecast the turning tides.",
    element: "Star · Foresight",
    lore: [
      "The Oracle's eyes hold the light of Po Tolo, the unseen companion of Sirius. It does not predict — it remembers what the stars have already written.",
      "Councils convene around the Oracle before any flood. To ignore its reading is to drown in certainty.",
    ],
    stats: [
      { label: "Vigor", value: 48 },
      { label: "Resolve", value: 70 },
      { label: "Insight", value: 96 },
      { label: "Flow", value: 74 },
    ],
    abilities: [
      { name: "Sidereal Sight", desc: "Reveals the outcome distribution of a council proposal before the vote." },
      { name: "Tide Forecast", desc: "Marks the optimal window for a shoal to act on the current." },
    ],
  },
  weaver: {
    variant: "weaver",
    name: "Weaver",
    title: "Speaker of the Word",
    line: "Speak the Word — mint lore and artifacts.",
    element: "Word · Creation",
    lore: [
      "From the Weaver's webbed hands spirals the Word — the first utterance that ordered the formless deep. Each glyph it speaks becomes an on-chain artifact, alive with meaning.",
      "No two Weavers speak the same Word twice. Their creations are the lore the next civilization is built upon.",
    ],
    stats: [
      { label: "Vigor", value: 52 },
      { label: "Resolve", value: 60 },
      { label: "Insight", value: 82 },
      { label: "Flow", value: 94 },
    ],
    abilities: [
      { name: "Glyph Spiral", desc: "Mints a unique artifact whose traits are woven from the speaker's chronicle." },
      { name: "Echo of Creation", desc: "Amplifies the yield of any deed performed in the Weaver's presence." },
    ],
  },
  diver: {
    variant: "diver",
    name: "Diver",
    title: "Seeker of the Depths",
    line: "Audit the depths and surface the signal.",
    element: "Abyss · Research",
    lore: [
      "Where light fails, the Diver thrives. Streamlined and silent, it descends past the thermocline of noise to recover the one true signal sleeping in the dark.",
      "Auditors of the protocol, Divers surface proofs that no shoal can dispute.",
    ],
    stats: [
      { label: "Vigor", value: 66 },
      { label: "Resolve", value: 72 },
      { label: "Insight", value: 90 },
      { label: "Flow", value: 78 },
    ],
    abilities: [
      { name: "Deep Audit", desc: "Surfaces hidden inconsistencies in a shoal's treasury ledger." },
      { name: "Pressure Sense", desc: "Detects manipulation in the reputation current before it spreads." },
    ],
  },
};

export const VESSEL_LIST: readonly VesselInfo[] = Object.values(VESSELS);
