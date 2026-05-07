import type { SVGProps } from "react";
import type { WeatherCondition, MoonPhase } from "@/data/mockWeather";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function SunIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE27A" />
          <stop offset="100%" stopColor="#FFB547" />
        </radialGradient>
      </defs>
      <g stroke="#F4A93A" strokeWidth="2.4" strokeLinecap="round">
        <line x1="32" y1="6" x2="32" y2="12" />
        <line x1="32" y1="52" x2="32" y2="58" />
        <line x1="6" y1="32" x2="12" y2="32" />
        <line x1="52" y1="32" x2="58" y2="32" />
        <line x1="13" y1="13" x2="17" y2="17" />
        <line x1="47" y1="47" x2="51" y2="51" />
        <line x1="13" y1="51" x2="17" y2="47" />
        <line x1="47" y1="17" x2="51" y2="13" />
      </g>
      <circle cx="32" cy="32" r="13" fill="url(#sun-grad)" />
    </svg>
  );
}

export function PartlyCloudyIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="pc-sun-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE27A" />
          <stop offset="100%" stopColor="#FFB547" />
        </radialGradient>
        <linearGradient id="pc-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D6E5F5" />
        </linearGradient>
      </defs>
      <g stroke="#F4A93A" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="6" x2="22" y2="10" />
        <line x1="6" y1="22" x2="10" y2="22" />
        <line x1="9" y1="9" x2="12" y2="12" />
        <line x1="35" y1="9" x2="32" y2="12" />
      </g>
      <circle cx="22" cy="22" r="9" fill="url(#pc-sun-grad)" />
      <path
        d="M20 46c-5 0-9-3.6-9-8.5S15 29 20 29c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C49 35.4 51 38 51 41.5c0 4.7-4 8.5-9 8.5H20z"
        fill="url(#pc-cloud-grad)"
        stroke="#B8CCE0"
        strokeWidth="1"
      />
    </svg>
  );
}

export function CloudyIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="cloudy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C8D8EA" />
        </linearGradient>
      </defs>
      <path
        d="M16 44c-5 0-9-3.6-9-8.5S11 27 16 27c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C45 33.4 47 36 47 39.5c0 4.7-4 8.5-9 8.5H16z"
        fill="#E0EAF5"
        stroke="#B8CCE0"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M22 50c-5 0-9-3.6-9-8.5S17 33 22 33c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C51 39.4 53 42 53 45.5c0 4.7-4 8.5-9 8.5H22z"
        fill="url(#cloudy-grad)"
        stroke="#A6BED5"
        strokeWidth="1"
      />
    </svg>
  );
}

export function RainIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="rain-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D6E5F5" />
          <stop offset="100%" stopColor="#9DB6CF" />
        </linearGradient>
      </defs>
      <path
        d="M20 38c-5 0-9-3.6-9-8.5S15 21 20 21c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C49 27.4 51 30 51 33.5c0 4.7-4 8.5-9 8.5H20z"
        fill="url(#rain-cloud-grad)"
        stroke="#7E9CB8"
        strokeWidth="1"
      />
      <g fill="#4A90D9">
        <path d="M22 46l-3 8c-.3 1 .2 2 1.2 2.2 1 .2 2-.3 2.3-1.3l2.5-7.5c.3-1-.3-2-1.3-2.2-.7-.2-1.4.2-1.7.8z" />
        <path d="M32 46l-3 8c-.3 1 .2 2 1.2 2.2 1 .2 2-.3 2.3-1.3l2.5-7.5c.3-1-.3-2-1.3-2.2-.7-.2-1.4.2-1.7.8z" />
        <path d="M42 46l-3 8c-.3 1 .2 2 1.2 2.2 1 .2 2-.3 2.3-1.3l2.5-7.5c.3-1-.3-2-1.3-2.2-.7-.2-1.4.2-1.7.8z" />
      </g>
    </svg>
  );
}

export function ThunderstormIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <path
        d="M20 38c-5 0-9-3.6-9-8.5S15 21 20 21c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C49 27.4 51 30 51 33.5c0 4.7-4 8.5-9 8.5H20z"
        fill="#9DB6CF"
        stroke="#6A87A4"
        strokeWidth="1"
      />
      <path
        d="M30 42 L24 54 L30 54 L26 62 L40 48 L34 48 L38 42 Z"
        fill="#FFC93C"
        stroke="#E5A82F"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SnowIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <path
        d="M20 38c-5 0-9-3.6-9-8.5S15 21 20 21c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C49 27.4 51 30 51 33.5c0 4.7-4 8.5-9 8.5H20z"
        fill="#E0EAF5"
        stroke="#A6BED5"
        strokeWidth="1"
      />
      <g fill="#7AB7E8">
        <circle cx="22" cy="50" r="2.5" />
        <circle cx="32" cy="54" r="2.5" />
        <circle cx="42" cy="50" r="2.5" />
      </g>
    </svg>
  );
}

export function FogIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <path
        d="M20 32c-5 0-9-3.6-9-8.5S15 15 20 15c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C49 21.4 51 24 51 27.5c0 4.7-4 8.5-9 8.5H20z"
        fill="#E0EAF5"
        stroke="#B8CCE0"
        strokeWidth="1"
      />
      <g stroke="#9DB6CF" strokeWidth="3" strokeLinecap="round">
        <line x1="10" y1="44" x2="54" y2="44" />
        <line x1="14" y1="52" x2="50" y2="52" />
      </g>
    </svg>
  );
}

export function WindyIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <g fill="none" stroke="#7AA5C6" strokeWidth="3" strokeLinecap="round">
        <path d="M8 22 H38 a6 6 0 1 0 -6 -6" />
        <path d="M6 34 H46 a6 6 0 1 1 -6 6" />
        <path d="M8 46 H30 a4 4 0 1 0 -4 -4" />
      </g>
    </svg>
  );
}

export function ClearNightIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="moon-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5F7FF" />
          <stop offset="100%" stopColor="#C5CFE8" />
        </radialGradient>
      </defs>
      <path
        d="M44 38a16 16 0 0 1-22-21 16 16 0 1 0 22 21z"
        fill="url(#moon-grad)"
        stroke="#9CA8C7"
        strokeWidth="1"
      />
      <g fill="#FFE27A">
        <circle cx="48" cy="14" r="1.5" />
        <circle cx="54" cy="22" r="1.2" />
        <circle cx="44" cy="22" r="1" />
      </g>
    </svg>
  );
}

export function PartlyCloudyNightIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="pcn-moon-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5F7FF" />
          <stop offset="100%" stopColor="#C5CFE8" />
        </radialGradient>
        <linearGradient id="pcn-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D6E5F5" />
        </linearGradient>
      </defs>
      <path
        d="M30 22a10 10 0 0 1-14-13 10 10 0 1 0 14 13z"
        fill="url(#pcn-moon-grad)"
        stroke="#9CA8C7"
        strokeWidth="1"
      />
      <path
        d="M20 50c-5 0-9-3.6-9-8.5S15 33 20 33c1 0 2 .2 3 .5 1.7-4.5 6-7.5 11-7.5 6.6 0 12 5 12 11 0 .5 0 1-.1 1.5C49 39.4 51 42 51 45.5c0 4.7-4 8.5-9 8.5H20z"
        fill="url(#pcn-cloud-grad)"
        stroke="#B8CCE0"
        strokeWidth="1"
      />
    </svg>
  );
}

const conditionIconMap: Record<WeatherCondition, (p: IconProps) => React.JSX.Element> = {
  clear: SunIcon,
  "partly-cloudy": PartlyCloudyIcon,
  cloudy: CloudyIcon,
  rain: RainIcon,
  thunderstorm: ThunderstormIcon,
  snow: SnowIcon,
  fog: FogIcon,
  windy: WindyIcon,
};

const conditionNightIconMap: Partial<
  Record<WeatherCondition, (p: IconProps) => React.JSX.Element>
> = {
  clear: ClearNightIcon,
  "partly-cloudy": PartlyCloudyNightIcon,
};

export function WeatherConditionIcon({
  condition,
  isNight = false,
  className,
}: {
  condition: WeatherCondition;
  isNight?: boolean;
  className?: string;
}) {
  const Icon =
    (isNight && conditionNightIconMap[condition]) ||
    conditionIconMap[condition] ||
    PartlyCloudyIcon;
  return <Icon className={className} />;
}

export function MoonIcon({
  phase,
  className = "h-6 w-6",
}: {
  phase: MoonPhase;
  className?: string;
}) {
  const fill = "#E5ECF5";
  const dark = "#1F2C45";
  const phaseMap: Record<MoonPhase, React.JSX.Element> = {
    new: <circle cx="32" cy="32" r="22" fill={dark} />,
    "waxing-crescent": (
      <>
        <circle cx="32" cy="32" r="22" fill={fill} />
        <ellipse cx="26" cy="32" rx="20" ry="22" fill={dark} />
      </>
    ),
    "first-quarter": (
      <>
        <circle cx="32" cy="32" r="22" fill={fill} />
        <rect x="10" y="10" width="22" height="44" fill={dark} />
      </>
    ),
    "waxing-gibbous": (
      <>
        <circle cx="32" cy="32" r="22" fill={fill} />
        <ellipse cx="22" cy="32" rx="14" ry="22" fill={dark} />
      </>
    ),
    full: <circle cx="32" cy="32" r="22" fill={fill} />,
    "waning-gibbous": (
      <>
        <circle cx="32" cy="32" r="22" fill={fill} />
        <ellipse cx="42" cy="32" rx="14" ry="22" fill={dark} />
      </>
    ),
    "last-quarter": (
      <>
        <circle cx="32" cy="32" r="22" fill={fill} />
        <rect x="32" y="10" width="22" height="44" fill={dark} />
      </>
    ),
    "waning-crescent": (
      <>
        <circle cx="32" cy="32" r="22" fill={fill} />
        <ellipse cx="38" cy="32" rx="20" ry="22" fill={dark} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {phaseMap[phase]}
    </svg>
  );
}
