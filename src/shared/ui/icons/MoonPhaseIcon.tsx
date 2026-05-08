import { useId, type SVGProps } from "react";
import type { MoonPhase } from "@/shared/types/weather";

type MoonPhaseIconProps = SVGProps<SVGSVGElement> & {
    phase: MoonPhase;
    className?: string;
};

const PHASE_VALUE: Record<MoonPhase, number> = {
    "new": 0,
    "waxing-crescent": 0.125,
    "first-quarter": 0.25,
    "waxing-gibbous": 0.375,
    "full": 0.5,
    "waning-gibbous": 0.625,
    "last-quarter": 0.75,
    "waning-crescent": 0.875,
};

export function MoonPhaseIcon({
    phase,
    className = "h-6 w-6",
    ...props
}: MoonPhaseIconProps) {
    const value = PHASE_VALUE[phase];
    const cx = 32;
    const cy = 32;
    const r = 28;
    const angle = value * 2 * Math.PI;
    const rx = Math.abs(r * Math.cos(angle));
    const isWaxing = value < 0.5;
    const outerSweep = isWaxing ? 1 : 0;
    const innerSweep =
        value < 0.25 || value > 0.75 ? outerSweep : 1 - outerSweep;

    const litPath =
        value === 0
            ? ""
            : value === 0.5
                ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
                : `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${innerSweep} ${cx} ${cy - r}`;

    const reactId = useId();
    const darkId = `moon-dark-${phase}-${reactId}`;
    const lightId = `moon-light-${phase}-${reactId}`;

    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...props}>
            <defs>
                <radialGradient id={darkId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0F172A" />
                </radialGradient>
                <radialGradient id={lightId} cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="100%" stopColor="#FBBF24" />
                </radialGradient>
            </defs>
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={`url(#${darkId})`}
                stroke="#94A3B8"
                strokeWidth="1"
            />
            {litPath && <path d={litPath} fill={`url(#${lightId})`} />}
        </svg>
    );
}
