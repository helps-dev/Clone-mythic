import { useState } from "react";
import CharacterPortrait from "./CharacterPortrait";

type Variant = "warden" | "oracle" | "weaver" | "diver";

/**
 * Renders the generated PNG character if present (public/characters/<variant>.png),
 * otherwise falls back to the hand-drawn SVG portrait.
 */
export function VesselArt({ variant, className = "" }: { variant: Variant; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <CharacterPortrait variant={variant} className={className} />;
  return (
    <img
      src={`/characters/${variant}.png`}
      alt={`${variant} vessel`}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

/**
 * The primordial ancestor: prefers a generated PNG, falls back to the SVG illustration.
 */
export function Ancestor({ className = "", alt = "Nommo ancestor" }: { className?: string; alt?: string }) {
  const [src, setSrc] = useState("/characters/nommo-ancestor.png");
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        if (src.endsWith(".png")) setSrc("/characters/nommo-ancestor.svg");
      }}
    />
  );
}
