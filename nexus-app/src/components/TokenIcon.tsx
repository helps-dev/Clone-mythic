import { LogoMark } from "./Logo";

type TokenSymbol = "NXS" | "BNB" | "ETH" | "USDT";

const COLORS: Record<Exclude<TokenSymbol, "NXS">, { bg: string; fg: string }> = {
  BNB: { bg: "#f3ba2f", fg: "#1a1a1a" },
  ETH: { bg: "#627eea", fg: "#fff" },
  USDT: { bg: "#26a17b", fg: "#fff" },
};

export function TokenIcon({ symbol, className = "w-7 h-7" }: { symbol: TokenSymbol; className?: string }) {
  if (symbol === "NXS") {
    return (
      <span className={`inline-grid place-items-center rounded-full bg-secondary border border-border ${className}`}>
        <LogoMark className="w-[70%] h-[70%]" />
      </span>
    );
  }

  const c = COLORS[symbol];

  if (symbol === "BNB") {
    return (
      <span className={`inline-grid place-items-center rounded-full ${className}`} style={{ background: c.bg }}>
        <svg viewBox="0 0 24 24" className="w-[60%] h-[60%]" fill={c.fg}>
          <path d="M12 2l2.6 2.6L9.2 10 6.6 7.4 12 2zm5.4 5.4L20 10l-2.6 2.6L14.8 10l2.6-2.6zM12 12.8l2.6 2.6L12 18l-2.6-2.6L12 12.8zM6.6 7.4L9.2 10l-2.6 2.6L4 10l2.6-2.6zM12 7.4L14.6 10 12 12.6 9.4 10 12 7.4z" />
        </svg>
      </span>
    );
  }

  if (symbol === "ETH") {
    return (
      <span className={`inline-grid place-items-center rounded-full ${className}`} style={{ background: c.bg }}>
        <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill={c.fg}>
          <path d="M12 2L5 12.2l7 4.1 7-4.1L12 2zm0 16.3l-7-4.1L12 22l7-7.8-7 4.1z" opacity="0.9" />
        </svg>
      </span>
    );
  }

  // USDT
  return (
    <span className={`inline-grid place-items-center rounded-full ${className}`} style={{ background: c.bg }}>
      <svg viewBox="0 0 24 24" className="w-[60%] h-[60%]" fill={c.fg}>
        <path d="M13.3 10.6V9.2h3.2V7H7.5v2.2h3.2v1.4c-2.6.1-4.6.6-4.6 1.2s2 1.1 4.6 1.2v4.4h2.6V13c2.6-.1 4.6-.6 4.6-1.2s-2-1.1-4.6-1.2zm0 1.9c-.1 0-.6.1-1.3.1-.6 0-1 0-1.3-.1-2.2-.1-3.8-.5-3.8-.9s1.6-.8 3.8-.9v1.5c.3 0 .8.1 1.3.1.6 0 1 0 1.3-.1V10.7c2.2.1 3.8.5 3.8.9s-1.6.8-3.8.9z" />
      </svg>
    </span>
  );
}
