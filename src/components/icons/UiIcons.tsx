import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SunriseIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M3 18h18" />
      <path d="M6 14a6 6 0 0 1 12 0" />
      <path d="M12 3v4M7.5 6.5l1.8 1.8M16.5 6.5l-1.8 1.8" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MosqueIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M4 21h16" />
      <path d="M6 21V11M18 21V11" />
      <path d="M9 21v-4.5a3 3 0 0 1 6 0V21" />
      <path d="M7.5 11h9a4.5 4.5 0 0 0-9 0Z" />
      <path d="M18 8V3.5" />
      <path d="M16.8 4.7h2.4" />
      <path d="M12 5.2V3" />
    </svg>
  );
}
