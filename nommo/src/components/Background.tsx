export default function Background() {
  const bubbles = Array.from({ length: 26 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    size: 2 + (i % 5),
    duration: `${11 + (i % 7) * 2}s`,
    delay: `${i * 0.5}s`,
  }));

  // distant twinkling stars
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    top: `${(i * 29) % 100}%`,
    size: i % 7 === 0 ? 2.5 : 1.5,
    duration: `${2 + (i % 5)}s`,
    delay: `${(i % 9) * 0.4}s`,
  }));

  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r1 = 250;
    const r2 = i % 2 === 0 ? 295 : 275;
    return [300 + Math.cos(a) * r1, 300 + Math.sin(a) * r1, 300 + Math.cos(a) * r2, 300 + Math.sin(a) * r2];
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* deep base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 50% -20%, #0a2b38 0%, #061721 38%, #03070d 72%, #02050a 100%)",
        }}
      />

      {/* drifting nebula clouds */}
      <div
        className="absolute inset-0 animate-nebula"
        style={{
          background:
            "radial-gradient(900px 600px at 22% 18%, rgba(95,224,216,0.18), transparent 60%)," +
            "radial-gradient(1000px 700px at 82% 30%, rgba(58,155,217,0.16), transparent 62%)," +
            "radial-gradient(800px 700px at 60% 85%, rgba(150,110,255,0.12), transparent 60%)",
        }}
      />

      {/* twinkling distant stars */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: "0 0 6px rgba(180,240,255,0.8)",
              animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* god rays from the Sirius star above */}
      <div className="absolute inset-0 godrays animate-godray" />

      {/* bright Sirius star */}
      <div className="absolute left-1/2 top-[-4%] -translate-x-1/2 animate-float">
        <div
          className="h-24 w-24 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,255,251,0.95), rgba(95,224,216,0.35) 45%, transparent 70%)" }}
        />
      </div>

      {/* caustic shimmer */}
      <div className="absolute inset-0 caustics opacity-60" />

      <div className="absolute inset-0 star-grid opacity-20" />

      {/* large rotating cosmic sigil */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmin] h-[150vmin] opacity-[0.10] animate-spin-slow">
        <svg viewBox="0 0 600 600" className="w-full h-full text-accent">
          <defs>
            <radialGradient id="nb-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="78%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="none" stroke="url(#nb-fade)" strokeWidth="0.7">
            <circle cx="300" cy="300" r="290" />
            <circle cx="300" cy="300" r="250" strokeDasharray="2 8" />
            <circle cx="300" cy="300" r="205" />
            <circle cx="300" cy="300" r="150" strokeDasharray="1 10" />
            {spokes.map((s, i) => (
              <line key={i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
            ))}
          </g>
        </svg>
      </div>

      {/* counter-rotating Sirius star + rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vmin] h-[88vmin] opacity-[0.12] animate-spin-reverse">
        <svg viewBox="0 0 400 400" className="w-full h-full text-accent-2">
          <g fill="none" stroke="currentColor" strokeWidth="0.9">
            <path d="M200 40 L214 186 L360 200 L214 214 L200 360 L186 214 L40 200 L186 186 Z" />
            <circle cx="200" cy="200" r="120" strokeDasharray="5 9" />
            <circle cx="200" cy="200" r="160" />
          </g>
        </svg>
      </div>

      {/* aurora sweep */}
      <div className="absolute inset-0 animate-aurora-sweep">
        <div
          className="absolute -left-1/2 top-0 h-full w-[200%]"
          style={{
            background:
              "linear-gradient(105deg, transparent 36%, color-mix(in oklab, var(--accent) 8%, transparent) 50%, transparent 64%)",
          }}
        />
      </div>

      {/* rising glowing bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              left: b.left,
              bottom: "-12px",
              width: `${b.size}px`,
              height: `${b.size}px`,
              background: "radial-gradient(circle at 30% 30%, rgba(234,255,251,0.95), rgba(95,224,216,0.4))",
              boxShadow: "0 0 8px rgba(95,224,216,0.5)",
              animation: `bubble-rise ${b.duration} linear ${b.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* deep vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, color-mix(in oklab, var(--background) 82%, transparent) 100%)",
        }}
      />

      {/* layered abyssal-floor waves */}
      <svg className="absolute bottom-0 left-0 w-full text-accent-2/10" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 150 C 240 90, 480 200, 720 150 S 1200 90, 1440 150 L1440 220 L0 220 Z" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full text-accent/10" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 120 C 300 70, 560 180, 820 120 S 1240 70, 1440 120 L1440 200 L0 200 Z" />
      </svg>
    </div>
  );
}
