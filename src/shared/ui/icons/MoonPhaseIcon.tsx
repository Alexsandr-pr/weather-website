import { useId, type SVGProps } from "react";
import type { MoonPhase } from "@/shared/types/weather";

type MoonPhaseIconProps = SVGProps<SVGSVGElement> & {
    phase?: MoonPhase;
    value?: number;
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
    value,
    className = "h-6 w-6",
    ...props
}: MoonPhaseIconProps) {
    const v = ((value ?? PHASE_VALUE[phase ?? "new"]) % 1 + 1) % 1;
    const cx = 32;
    const cy = 32;
    const r = 28;
    const angle = v * 2 * Math.PI;
    const rx = Math.abs(r * Math.cos(angle));
    const isWaxing = v < 0.5;
    const outerSweep = isWaxing ? 1 : 0;
    const innerSweep =
        v < 0.25 || v > 0.75 ? outerSweep : 1 - outerSweep;

    const litPath =
        v < 0.005 || v > 0.995
            ? ""
            : Math.abs(v - 0.5) < 0.005
                ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
                : `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${innerSweep} ${cx} ${cy - r}`;

    const reactId = useId();
    const darkId = `moon-dark-${reactId}`;
    const lightId = `moon-light-${reactId}`;
    const glowId = `moon-glow-${reactId}`;

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
                <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx={cx} cy={cy} r={r + 3} fill={`url(#${glowId})`} />
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
