import { Link } from "react-router-dom";
import { MessageCircle, FileText, type LucideIcon } from "lucide-react";
import type { FC } from "react";
import { Logo } from "./Logo";

const TwitterIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const SOCIAL: { icon: LucideIcon | FC<{ className?: string }>; href: string; label: string }[] = [
  { icon: TwitterIcon, href: "https://twitter.com/", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg/", label: "Discord" },
  { icon: GithubIcon, href: "https://github.com/", label: "GitHub" },
  { icon: FileText, href: "#", label: "Docs" },
];

const LINKS = {
  Protocol: ["Portal", "Staking", "Governance", "Token"],
  Resources: ["Documentation", "Whitepaper", "Audit Report", "Brand Kit"],
  Company: ["About", "Blog", "Careers", "Contact"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              The intergalactic DeFi protocol unifying liquidity across the multiverse of
              blockchains.
            </p>
            <div className="flex gap-2 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border grid place-items-center text-muted-foreground hover:text-accent hover:border-accent/40 transition"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold mb-4">{heading}</h4>
              <ul className="space-y-3">
                {items.map((item) => {
                  const isRoute = LINKS.Protocol.includes(item);
                  return (
                    <li key={item}>
                      {isRoute ? (
                        <Link
                          to={`/${item.toLowerCase()}`}
                          className="text-sm text-muted-foreground hover:text-accent transition"
                        >
                          {item}
                        </Link>
                      ) : (
                        <a href="#" className="text-sm text-muted-foreground hover:text-accent transition">
                          {item}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-line my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NEXUS Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
