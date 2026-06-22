import type { ReactNode } from "react";

type Variant = "warden" | "oracle" | "weaver" | "diver";

const THEME: Record<Variant, { a: string; b: string; deep: string; emblem: ReactNode; crest: ReactNode }> = {
  warden: {
    a: "#9fe9ff",
    b: "#3a9bd9",
    deep: "#13335f",
    // broad horned crest
    crest: (
      <path d="M150 70 q-26 -34 -54 -30 q18 12 22 34 q-30 -8 -48 6 q24 4 38 22 M150 70 q26 -34 54 -30 q-18 12 -22 34 q30 -8 48 6 q-24 4 -38 22"
        fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    ),
    // shield emblem
    emblem: <path d="M150 150 l24 8 v18 q0 22 -24 32 q-24 -10 -24 -32 v-18 Z" fill="#eafffb" opacity="0.9" />,
  },
  oracle: {
    a: "#d8c4ff",
    b: "#8a6fe0",
    deep: "#2a2160",
    crest: (
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M150 78 l0 -44" />
        <path d="M124 60 q26 -18 52 0" />
      </g>
    ),
    emblem: <path d="M150 138 l8 24 l24 8 l-24 8 l-8 24 l-8 -24 l-24 -8 l24 -8 Z" fill="#f3edff" opacity="0.95" />,
  },
  weaver: {
    a: "#ffe9a8",
    b: "#e3c46a",
    deep: "#5a4416",
    crest: (
      <path d="M120 64 q30 -30 60 0 q-12 18 -30 14 q-18 4 -30 -14 Z" fill="currentColor" opacity="0.85" />
    ),
    emblem: (
      <path d="M150 150 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0 M150 150 m-11 0 a11 11 0 1 1 22 0"
        fill="none" stroke="#fff7e0" strokeWidth="4" />
    ),
  },
  diver: {
    a: "#8ff5ea",
    b: "#2fb8ac",
    deep: "#0c4a44",
    crest: (
      <path d="M150 72 q-22 -30 -8 -44 q10 16 8 30 q-2 -14 8 -30 q14 14 -8 44 Z" fill="currentColor" opacity="0.9" />
    ),
    emblem: <path d="M150 130 q16 22 0 44 q-16 -22 0 -44 Z" fill="#e6fffb" opacity="0.95" />,
  },
};

export default function CharacterPortrait({ variant, className = "" }: { variant: Variant; className?: string }) {
  const t = THEME[variant];
  const uid = variant;
  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label={`${variant} vessel`}>
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor={t.deep} />
          <stop offset="70%" stopColor="#05121a" />
          <stop offset="100%" stopColor="#03070d" />
        </radialGradient>
        <linearGradient id={`skin-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.a} />
          <stop offset="100%" stopColor={t.b} />
        </linearGradient>
      </defs>

      <rect width="300" height="300" fill={`url(#bg-${uid})`} />
      <circle cx="150" cy="150" r="140" fill="none" stroke={t.b} strokeWidth="1.2" opacity="0.45" />
      <circle cx="150" cy="150" r="130" fill="none" stroke={t.a} strokeWidth="0.8" strokeDasharray="2 8" opacity="0.5" />

      {/* glow */}
      <circle cx="150" cy="135" r="92" fill={t.b} opacity="0.16" />

      {/* crest / headdress */}
      <g style={{ color: t.a }}>{t.crest}</g>

      {/* head */}
      <ellipse cx="150" cy="120" rx="40" ry="46" fill={`url(#skin-${uid})`} />
      {/* cheek fins */}
      <path d="M112 116 q-26 -6 -34 -26 q30 2 42 18 Z" fill={`url(#skin-${uid})`} opacity="0.8" />
      <path d="M188 116 q26 -6 34 -26 q-30 2 -42 18 Z" fill={`url(#skin-${uid})`} opacity="0.8" />
      {/* eyes */}
      <ellipse cx="136" cy="118" rx="6" ry="7" fill="#03121a" />
      <ellipse cx="164" cy="118" rx="6" ry="7" fill="#03121a" />
      <circle cx="138" cy="116" r="1.8" fill="#eafffb" />
      <circle cx="166" cy="116" r="1.8" fill="#eafffb" />
      {/* gills */}
      <g stroke={t.deep} strokeWidth="2.2" fill="none" opacity="0.7">
        <path d="M116 132 q-12 6 -3 18" />
        <path d="M184 132 q12 6 3 18" />
      </g>

      {/* shoulders / torso */}
      <path d="M96 196 q54 -40 108 0 q12 40 6 70 l-120 0 q-6 -30 6 -70 Z" fill={`url(#skin-${uid})`} />
      {/* scale lines */}
      <g stroke={t.a} strokeWidth="1" fill="none" opacity="0.4">
        <path d="M120 210 q30 16 60 0" />
        <path d="M114 230 q36 18 72 0" />
        <path d="M112 250 q38 18 76 0" />
      </g>

      {/* emblem */}
      {t.emblem}
    </svg>
  );
}
