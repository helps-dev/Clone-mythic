import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Reveals an element when it scrolls into view. Returns a ref and visibility flag.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Animated number counter that runs once the element enters the viewport.
 * Parses a target string like "$2.4B", "847K", "99.99%" and animates the numeric part.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(target: string, duration = 1800) {
  const ref = useRef<T>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = target.match(/^([^\d-]*)([\d.,]+)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const prefix = match[1];
    const numStr = match[2].replace(/,/g, "");
    const suffix = match[3];
    const end = parseFloat(numStr);
    const decimals = (numStr.split(".")[1] || "").length;

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = end * eased;
        const formatted =
          val.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });
        setDisplay(`${prefix}${formatted}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [target, duration]);

  return { ref, display };
}

/**
 * Tracks normalized mouse position (-1..1) within an element for parallax effects.
 */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPos({ x, y });
  }, []);

  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return { ref, pos, onMove, onLeave };
}
