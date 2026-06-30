import { useState } from "react";

/**
 * Premium SVG alien beings — cinematic, layered, "3D"-styled bio-tech entities.
 * Each uses depth gradients, rim lighting, bioluminescent circuitry, and tech armor
 * to approximate a high-end concept-art render.
 */

const PALETTES = {
  teal: { main: "#34e0c4", light: "#9bffe9", deep: "#0a3d36", shadow: "#041f1b" },
  violet: { main: "#8b7cff", light: "#cdc4ff", deep: "#2a2050", shadow: "#150f2e" },
  rose: { main: "#ff6fae", light: "#ffc2dd", deep: "#4a1d33", shadow: "#2a0f1d" },
  amber: { main: "#ffc24b", light: "#ffe3a3", deep: "#4a3712", shadow: "#2a1f0a" },
} as const;

export type AlienVariant = keyof typeof PALETTES;

export function AlienBeing({
  variant = "teal",
  className = "",
}: {
  variant?: AlienVariant;
  className?: string;
}) {
  const p = PALETTES[variant];
  const id = `a-${variant}`;

  return (
    <svg viewBox="0 0 240 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Skin: volumetric shading from top-left light */}
        <radialGradient id={`${id}-skin`} cx="42%" cy="30%" r="75%">
          <stop offset="0%" stopColor={p.light} stopOpacity="0.95" />
          <stop offset="30%" stopColor={p.main} stopOpacity="0.9" />
          <stop offset="65%" stopColor={p.deep} />
          <stop offset="100%" stopColor={p.shadow} />
        </radialGradient>
        {/* Rim light gradient */}
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="240" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor={p.light} stopOpacity="0.9" />
          <stop offset="0.5" stopColor={p.main} stopOpacity="0.2" />
          <stop offset="1" stopColor={p.main} stopOpacity="0.05" />
        </linearGradient>
        {/* Eye */}
        <radialGradient id={`${id}-eye`} cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor={p.light} />
          <stop offset="60%" stopColor={p.main} />
          <stop offset="100%" stopColor={p.shadow} />
        </radialGradient>
        {/* Core glow */}
        <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor={p.light} />
          <stop offset="100%" stopColor={p.main} stopOpacity="0" />
        </radialGradient>
        {/* Armor metallic */}
        <linearGradient id={`${id}-armor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.main} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.shadow} stopOpacity="0.9" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`${id}-blur2`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Ambient back glow */}
      <ellipse cx="120" cy="120" rx="86" ry="104" fill={p.main} opacity="0.14" filter={`url(#${id}-blur)`} />

      {/* ===== Head crest / fins (behind head) ===== */}
      <g opacity="0.85">
        <path d="M120 22 C150 26 168 50 172 86 C160 70 142 58 120 56 Z" fill={`url(#${id}-armor)`} stroke={p.main} strokeWidth="1" />
        <path d="M120 22 C90 26 72 50 68 86 C80 70 98 58 120 56 Z" fill={`url(#${id}-armor)`} stroke={p.main} strokeWidth="1" />
        {/* crest spikes */}
        <path d="M120 18 L120 6 M134 24 L142 12 M106 24 L98 12" stroke={p.light} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* ===== Cranium / head ===== */}
      <path
        d="M120 30
           C92 30 74 56 74 92
           C74 116 84 134 96 150
           C104 160 112 166 120 168
           C128 166 136 160 144 150
           C156 134 166 116 166 92
           C166 56 148 30 120 30 Z"
        fill={`url(#${id}-skin)`}
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.5"
      />

      {/* Forehead tech plate */}
      <path d="M120 40 C104 42 94 58 92 80 L120 86 L148 80 C146 58 136 42 120 40 Z" fill={`url(#${id}-armor)`} opacity="0.6" />
      <path d="M120 44 L120 84" stroke={p.light} strokeWidth="1" opacity="0.5" />
      {/* brow circuit dots */}
      <circle cx="108" cy="70" r="1.5" fill={p.light} />
      <circle cx="132" cy="70" r="1.5" fill={p.light} />
      <circle cx="120" cy="58" r="2" fill={p.light} opacity="0.9" />

      {/* Cheek shading for 3D form */}
      <path d="M88 100 C86 120 92 138 104 150" stroke={p.shadow} strokeWidth="6" strokeLinecap="round" opacity="0.25" filter={`url(#${id}-blur2)`} />
      <path d="M152 100 C154 120 148 138 136 150" stroke={p.shadow} strokeWidth="6" strokeLinecap="round" opacity="0.25" filter={`url(#${id}-blur2)`} />

      {/* Highlight on forehead */}
      <ellipse cx="106" cy="64" rx="10" ry="14" fill={p.light} opacity="0.25" filter={`url(#${id}-blur2)`} />

      {/* ===== Eyes (large almond, expressive) ===== */}
      <g>
        {/* left */}
        <ellipse cx="102" cy="104" rx="16" ry="23" fill="#03060a" transform="rotate(-16 102 104)" />
        <ellipse cx="102" cy="104" rx="11" ry="17" fill={`url(#${id}-eye)`} transform="rotate(-16 102 104)" />
        <ellipse cx="98" cy="96" rx="3.5" ry="5" fill="#ffffff" opacity="0.95" transform="rotate(-16 98 96)" />
        <ellipse cx="105" cy="112" rx="2" ry="3" fill="#ffffff" opacity="0.4" />
        {/* right */}
        <ellipse cx="138" cy="104" rx="16" ry="23" fill="#03060a" transform="rotate(16 138 104)" />
        <ellipse cx="138" cy="104" rx="11" ry="17" fill={`url(#${id}-eye)`} transform="rotate(16 138 104)" />
        <ellipse cx="142" cy="96" rx="3.5" ry="5" fill="#ffffff" opacity="0.95" transform="rotate(16 142 96)" />
        <ellipse cx="135" cy="112" rx="2" ry="3" fill="#ffffff" opacity="0.4" />
      </g>

      {/* Nose / nostril hints */}
      <path d="M116 134 q4 5 8 0" stroke={p.shadow} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Jaw line + mouth seam */}
      <path d="M108 152 q12 8 24 0" stroke={p.shadow} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

      {/* ===== Neck ===== */}
      <path
        d="M104 166 C102 178 98 186 94 196 L146 196 C142 186 138 178 136 166 Z"
        fill={`url(#${id}-skin)`}
        stroke={`url(#${id}-rim)`}
        strokeWidth="1"
      />
      {/* neck rings */}
      <path d="M98 182 q22 6 44 0" stroke={p.main} strokeWidth="1" opacity="0.4" />

      {/* ===== Shoulders / torso armor ===== */}
      <path
        d="M94 196
           C66 204 52 222 48 252
           C46 268 50 286 56 300
           L184 300
           C190 286 194 268 192 252
           C188 222 174 204 146 196 Z"
        fill={`url(#${id}-armor)`}
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.5"
      />
      {/* Shoulder plates */}
      <path d="M94 196 C72 202 58 218 54 244 C70 226 84 216 100 214 Z" fill={`url(#${id}-skin)`} opacity="0.55" />
      <path d="M146 196 C168 202 182 218 186 244 C170 226 156 216 140 214 Z" fill={`url(#${id}-skin)`} opacity="0.55" />

      {/* Chest paneling lines */}
      <path d="M120 200 L120 300" stroke={p.main} strokeWidth="1" opacity="0.3" />
      <path d="M96 220 C92 250 96 280 104 298" stroke={p.main} strokeWidth="0.75" opacity="0.25" />
      <path d="M144 220 C148 250 144 280 136 298" stroke={p.main} strokeWidth="0.75" opacity="0.25" />
      <path d="M104 232 L136 232 M100 252 L140 252" stroke={p.main} strokeWidth="0.75" opacity="0.2" />

      {/* ===== Bioluminescent chest core ===== */}
      <circle cx="120" cy="244" r="26" fill={`url(#${id}-core)`} opacity="0.7">
        <animate attributeName="opacity" values="0.45;0.8;0.45" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="244" r="15" fill={p.deep} stroke={p.main} strokeWidth="1.5" />
      <circle cx="120" cy="244" r="8" fill={`url(#${id}-core)`} />
      <circle cx="120" cy="244" r="3.5" fill="#ffffff" />
      {/* core ring ticks */}
      <g stroke={p.light} strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <path d="M120 224 L120 230" />
        <path d="M120 258 L120 264" />
        <path d="M100 244 L106 244" />
        <path d="M134 244 L140 244" />
      </g>

      {/* Floating energy motes */}
      <g fill={p.light}>
        <circle cx="62" cy="150" r="1.5" opacity="0.7">
          <animate attributeName="cy" values="150;140;150" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="170" r="1.2" opacity="0.6">
          <animate attributeName="cy" values="170;158;170" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="220" r="1" opacity="0.5">
          <animate attributeName="cy" values="220;210;220" dur="4.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

/**
 * Decorative orbital / portal ring system for hero visuals.
 */
export function PortalRings({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 400 400" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ring-grad-1" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34e0c4" stopOpacity="0.6" />
          <stop offset="1" stopColor="#34e0c4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ring-grad-2" x1="400" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b7cff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8b7cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="190" stroke="url(#ring-grad-1)" strokeWidth="1" />
      <circle cx="200" cy="200" r="150" stroke="url(#ring-grad-2)" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="110" stroke="url(#ring-grad-1)" strokeWidth="1" />
      <circle cx="200" cy="10" r="3" fill="#34e0c4" />
      <circle cx="390" cy="200" r="2.5" fill="#8b7cff" />
      <circle cx="200" cy="350" r="2" fill="#34e0c4" opacity="0.7" />
    </svg>
  );
}


/**
 * Image-first portrait: uses a generated render at /aliens/<name>.png when present,
 * otherwise falls back to the premium SVG AlienBeing.
 * Run `node scripts/generate-aliens.mjs` to produce the PNGs.
 */
export function AlienPortrait({
  name,
  variant,
  className = "",
}: {
  name: string;
  variant: AlienVariant;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  if (failed) {
    return <AlienBeing variant={variant} className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      {loading && <div className="absolute inset-0 shimmer rounded-[inherit]" />}
      <img
        src={`/aliens/${name}.png`}
        alt={`${name} — NEXUS architect`}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
