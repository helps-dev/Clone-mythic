const RUNE_LINES = [
  [520, 300, 590, 300],
  [512.504, 356.94, 580.118, 375.058],
  [490.526, 410, 551.147, 445],
  [455.563, 455.563, 505.061, 505.061],
  [410, 490.526, 445, 551.147],
  [356.94, 512.504, 375.058, 580.118],
  [300, 520, 300, 590],
  [243.06, 512.504, 224.942, 580.118],
  [190, 490.526, 155, 551.147],
  [144.437, 455.563, 94.939, 505.061],
  [109.474, 410, 48.853, 445],
  [87.496, 356.94, 19.882, 375.058],
  [80, 300, 10, 300],
  [87.496, 243.06, 19.882, 224.942],
  [109.474, 190, 48.853, 155],
  [144.437, 144.437, 94.939, 94.939],
  [190, 109.474, 155, 48.853],
  [243.06, 87.496, 224.942, 19.882],
  [300, 80, 300, 10],
  [356.94, 87.496, 375.058, 19.882],
  [410, 109.474, 445, 48.853],
  [455.563, 144.437, 505.061, 94.939],
  [490.526, 190, 551.147, 155],
  [512.504, 243.06, 580.118, 224.942],
];

export default function Background() {
  const embers = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 47) % 100}%`,
    bottom: `${-(i % 4) * 8}px`,
    duration: `${10 + (i % 6) * 2}s`,
    delay: `${i * 0.7}s`,
  }));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <video
        src="/assets-v1/mythic-bg-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 grayscale"
      />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 rune-grid opacity-25" />

      {/* Large rotating sigil */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmin] h-[140vmin] opacity-[0.10] animate-spin-slow">
        <svg viewBox="0 0 600 600" className="w-full h-full text-foreground">
          <defs>
            <radialGradient id="mb-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="80%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="none" stroke="url(#mb-fade)" strokeWidth="0.6">
            <circle cx="300" cy="300" r="290" />
            <circle cx="300" cy="300" r="260" strokeDasharray="2 6" />
            <circle cx="300" cy="300" r="220" />
            <circle cx="300" cy="300" r="180" strokeDasharray="1 12" />
            {RUNE_LINES.map((l, i) => (
              <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
            ))}
          </g>
        </svg>
      </div>

      {/* Counter-rotating triangles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] opacity-[0.14] animate-spin-reverse">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground">
            <polygon points="200,20 380,330 20,330" />
            <polygon points="200,380 20,70 380,70" />
            <circle cx="200" cy="200" r="120" strokeDasharray="6 8" />
          </g>
        </svg>
      </div>

      {/* Aurora sweep */}
      <div className="absolute inset-0 animate-aurora-sweep">
        <div
          className="absolute -left-1/2 top-0 h-full w-[200%]"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, color-mix(in oklab, var(--foreground) 5%, transparent) 50%, transparent 65%)",
          }}
        />
      </div>

      {/* Drifting embers */}
      <div className="absolute inset-0">
        {embers.map((e, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-foreground/40"
            style={{
              left: e.left,
              bottom: e.bottom,
              animation: `ember-drift ${e.duration} linear ${e.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, color-mix(in oklab, var(--background) 72%, transparent) 100%)",
        }}
      />
    </div>
  );
}
