export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34e0c4" />
          <stop offset="1" stopColor="#8b7cff" />
        </linearGradient>
      </defs>
      {/* Hexagonal nexus mark */}
      <path
        d="M20 2L34.6 10.5V27.5L20 36L5.4 27.5V10.5L20 2Z"
        stroke="url(#logo-grad)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* Inner connected nodes */}
      <circle cx="20" cy="11" r="2.5" fill="url(#logo-grad)" />
      <circle cx="28.5" cy="24" r="2.5" fill="url(#logo-grad)" />
      <circle cx="11.5" cy="24" r="2.5" fill="url(#logo-grad)" />
      <path
        d="M20 11L28.5 24M28.5 24L11.5 24M11.5 24L20 11"
        stroke="url(#logo-grad)"
        strokeWidth="1.25"
        opacity="0.8"
      />
      <circle cx="20" cy="20" r="3" fill="url(#logo-grad)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-8 h-8" />
      <span className="font-display font-bold text-lg tracking-wide">
        NEXUS
      </span>
    </div>
  );
}
