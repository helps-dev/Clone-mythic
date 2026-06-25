import { useState, useRef, useEffect, useCallback } from "react";
import CharacterPortrait from "./CharacterPortrait";

type Variant = "warden" | "oracle" | "weaver" | "diver";

/**
 * Check if WebP version exists by trying to load it
 */
function useWebPFallback(basePath: string, extension: string = ".png") {
  const [src, setSrc] = useState(`${basePath}.webp`);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    if (src.endsWith(".webp")) {
      setSrc(`${basePath}${extension}`);
    }
  }, [src, basePath, extension]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { src, isLoading, handleError, handleLoad };
}

/**
 * Parallax hook for smooth scroll-based movement
 */
export function useParallax(speed: number = 0.1, enabled: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = elementCenter - viewportCenter;
            setOffset(distanceFromCenter * speed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, enabled]);

  return { ref, offset };
}

/**
 * Mouse-based parallax for hero sections - creates depth effect
 */
export function useMouseParallax(intensity: number = 0.02, enabled: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetRef.current = {
        x: (e.clientX - centerX) * intensity,
        y: (e.clientY - centerY) * intensity,
      };
    };

    // Smooth interpolation
    const animate = () => {
      const easing = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * easing;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * easing;
      
      setPosition({
        x: Math.round(currentRef.current.x * 100) / 100,
        y: Math.round(currentRef.current.y * 100) / 100,
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, enabled]);

  return { ref, position };
}

/**
 * Renders the generated character image with WebP preference + lazy loading.
 * Falls back: WebP → PNG → SVG portrait
 */
export function VesselArt({
  variant,
  className = "",
  lazy = true,
  parallax = false,
  parallaxSpeed = 0.05,
}: {
  variant: Variant;
  className?: string;
  lazy?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
}) {
  const [failed, setFailed] = useState(false);
  const { src, isLoading, handleError, handleLoad } = useWebPFallback(`/characters/${variant}`, ".png");
  const { ref, offset } = useParallax(parallaxSpeed, parallax);

  if (failed) return <CharacterPortrait variant={variant} className={className} />;

  const imgStyle = parallax ? { transform: `translateY(${offset}px)` } : undefined;

  return (
    <div ref={ref} className={`relative ${parallax ? "overflow-hidden" : ""}`}>
      {isLoading && (
        <div className={`absolute inset-0 bg-card/50 animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={`${variant} vessel`}
        className={`${className} transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={imgStyle}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onError={() => {
          if (src.endsWith(".png")) {
            setFailed(true);
          } else {
            handleError();
          }
        }}
        onLoad={handleLoad}
      />
    </div>
  );
}

/**
 * The primordial ancestor: prefers WebP → PNG → SVG with lazy loading + optional parallax.
 */
export function Ancestor({
  className = "",
  alt = "Nommo ancestor",
  lazy = false,
  parallax = false,
  parallaxSpeed = 0.08,
  mouseParallax = false,
  mouseIntensity = 0.02,
}: {
  className?: string;
  alt?: string;
  lazy?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
  mouseParallax?: boolean;
  mouseIntensity?: number;
}) {
  const [src, setSrc] = useState("/characters/nommo-ancestor.webp");
  const [isLoading, setIsLoading] = useState(true);
  const { ref: scrollRef, offset } = useParallax(parallaxSpeed, parallax);
  const { ref: mouseRef, position } = useMouseParallax(mouseIntensity, mouseParallax);

  const combinedRef = (node: HTMLDivElement | null) => {
    if (parallax) (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (mouseParallax) (mouseRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const getTransform = () => {
    const transforms: string[] = [];
    if (parallax) transforms.push(`translateY(${offset}px)`);
    if (mouseParallax) transforms.push(`translate3d(${position.x}px, ${position.y}px, 0)`);
    if (transforms.length === 0) return undefined;
    return transforms.join(" ");
  };

  const imgStyle: React.CSSProperties = {
    transform: getTransform(),
    willChange: (parallax || mouseParallax) ? "transform" : undefined,
    transition: mouseParallax ? "none" : undefined,
  };

  return (
    <div 
      ref={combinedRef} 
      className={`relative ${(parallax || mouseParallax) ? "overflow-hidden" : ""}`}
    >
      {isLoading && (
        <div className={`absolute inset-0 bg-card/30 animate-pulse rounded-full ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={imgStyle}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (src.endsWith(".webp")) {
            setSrc("/characters/nommo-ancestor.png");
          } else if (src.endsWith(".png")) {
            setSrc("/characters/nommo-ancestor.svg");
          }
        }}
      />
    </div>
  );
}

/**
 * Optimized image component with WebP support, lazy loading, and blur placeholder
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  lazy = true,
  aspectRatio,
}: {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  aspectRatio?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(() => {
    // Try WebP version first if it's a PNG
    if (src.endsWith(".png")) {
      return src.replace(".png", ".webp");
    }
    return src;
  });

  return (
    <div
      className={`relative ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-card/30 animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (currentSrc.endsWith(".webp")) {
            setCurrentSrc(src); // Fallback to original
          }
        }}
      />
    </div>
  );
}
