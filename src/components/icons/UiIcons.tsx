import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WindIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M3 9h11a3 3 0 1 0-3-3" />
      <path d="M3 13h15a3 3 0 1 1-3 3" />
      <path d="M3 17h7" />
    </svg>
  );
}

export function HumidityIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" />
    </svg>
  );
}

export function PressureIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12l4-3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function UvIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4" />
    </svg>
  );
}

export function AqiIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M3 12h6a3 3 0 1 0 0-6" />
      <path d="M3 17h12a3 3 0 1 1 0 6" />
      <path d="M3 7h3" />
    </svg>
  );
}

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

export function SunsetIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M3 18h18" />
      <path d="M5 14a7 7 0 0 1 14 0" />
      <path d="M12 9V4M5 7l1.5 1.5M19 7l-1.5 1.5" />
      <path d="M9 21l3-3 3 3" />
    </svg>
  );
}

export function MoonPhaseIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z" />
    </svg>
  );
}

export function VisibilityIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
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

export function MapPinIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M12 21s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="8" r="2.5" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function DropletIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...baseProps} {...props}>
      <path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" />
    </svg>
  );
}
