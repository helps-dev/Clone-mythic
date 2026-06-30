import { useEffect, useRef } from "react";

/**
 * Subtle, premium animated backdrop:
 * - Soft drifting starfield (low density, low opacity)
 * - Gentle gradient orbs
 * - Faint grid that fades toward edges
 * Designed to sit behind content without competing with it.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: { x: number; y: number; z: number; r: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 18000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 0.6 + 0.2,
        r: Math.random() * 1.2 + 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.y -= s.z * 0.15;
        if (s.y < -2) {
          s.y = canvas.height + 2;
          s.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${s.z * 0.5})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.7 }} />

      {/* Gradient orbs */}
      <div
        className="glow-orb animate-pulse-soft"
        style={{ top: "-10%", left: "10%", width: "500px", height: "500px", background: "#34e0c4" }}
      />
      <div
        className="glow-orb animate-pulse-soft"
        style={{ top: "30%", right: "-5%", width: "450px", height: "450px", background: "#8b7cff", animationDelay: "2s" }}
      />
      <div
        className="glow-orb"
        style={{ bottom: "-15%", left: "30%", width: "600px", height: "400px", background: "#34e0c4", opacity: 0.2 }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-fade" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 0%, transparent 50%, rgba(6,8,16,0.8) 100%)" }}
      />
    </div>
  );
}
