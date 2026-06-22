/** Animated Sirius sigil — a self-contained replacement for a coin video. */
export default function Sigil({ className = "" }: { className?: string }) {
  return (
    <div className={"relative grid place-items-center " + className}>
      {/* ripples */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-accent/40"
          style={{
            width: "70%",
            height: "70%",
            animation: `ripple 4s ease-out ${i * 1.3}s infinite`,
          }}
        />
      ))}

      <svg viewBox="0 0 200 200" className="relative w-full h-full">
        <defs>
          <radialGradient id="sigil-core" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#eafffb" />
            <stop offset="45%" stopColor="#5fe0d8" />
            <stop offset="100%" stopColor="#2a7fd6" />
          </radialGradient>
          <linearGradient id="sigil-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7af7ee" />
            <stop offset="100%" stopColor="#b98bff" />
          </linearGradient>
        </defs>

        {/* slow rotating outer ring */}
        <g
          style={{ transformOrigin: "100px 100px", animation: "spin 30s linear infinite" }}
          fill="none"
          stroke="url(#sigil-ring)"
        >
          <circle cx="100" cy="100" r="86" strokeWidth="1.2" strokeDasharray="3 7" opacity="0.7" />
          <circle cx="100" cy="100" r="74" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Sirius star */}
        <path
          d="M100 24 L110 90 L176 100 L110 110 L100 176 L90 110 L24 100 L90 90 Z"
          fill="url(#sigil-core)"
        />

        {/* twin water serpents */}
        <path d="M52 140 q24 -20 48 0 t48 0" fill="none" stroke="#7af7ee" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        <path d="M58 154 q21 -16 42 0 t42 0" fill="none" stroke="#3a9bd9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        <circle cx="100" cy="100" r="9" fill="#eafffb" />
      </svg>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
