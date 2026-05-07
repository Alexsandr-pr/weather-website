import type { SVGProps } from "react";

type ThermometerProps = SVGProps<SVGSVGElement> & {
    className?: string;
    temperature: number;
    minTemp?: number;
    maxTemp?: number;
};

export function ThermometerIcon({
    className = "h-32 w-12",
    temperature,
    minTemp = -40,
    maxTemp = 40,
    ...props
}: ThermometerProps) {
    const tubeTopY = 14;
    const tubeBottomY = 156;
    const tubeHeight = tubeBottomY - tubeTopY;

    const clamped = Math.max(minTemp, Math.min(maxTemp, temperature));
    const fillRatio = (clamped - minTemp) / (maxTemp - minTemp);
    const fillTopY = tubeBottomY - tubeHeight * fillRatio;

    const isHot = temperature >= 0;
    const fillTopColor = isHot ? "#F87171" : "#60A5FA";
    const fillBottomColor = isHot ? "#DC2626" : "#2563EB";

    const ticks = [40, 20, 0, -20, -40];

    return (
        <svg
            viewBox="0 0 80 200"
            className={className}
            aria-hidden="true"
            {...props}
        >
            <defs>
                <linearGradient id="therm-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={fillTopColor} />
                    <stop offset="100%" stopColor={fillBottomColor} />
                </linearGradient>
                <linearGradient id="therm-tube" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
                <radialGradient id="therm-bulb" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor={fillTopColor} />
                    <stop offset="100%" stopColor={fillBottomColor} />
                </radialGradient>
            </defs>

            <rect
                x="22"
                y={tubeTopY}
                width="14"
                height={tubeHeight + 4}
                rx="7"
                fill="url(#therm-tube)"
                stroke="#94A3B8"
                strokeWidth="1.2"
            />

            <rect
                x="24"
                y={fillTopY}
                width="10"
                height={tubeBottomY - fillTopY + 6}
                rx="5"
                fill="url(#therm-fill)"
            />

            <circle
                cx="29"
                cy="172"
                r="14"
                fill="url(#therm-bulb)"
                stroke="#94A3B8"
                strokeWidth="1.2"
            />
            <circle cx="25" cy="168" r="3" fill="#FFFFFF" opacity="0.5" />

            <g
                fontSize="11"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fill="#475569"
                fontWeight="600"
            >
                {ticks.map((t) => {
                    const ratio = (t - minTemp) / (maxTemp - minTemp);
                    const y = tubeBottomY - tubeHeight * ratio;
                    const isMajor = t === 0 || Math.abs(t) === 40;
                    return (
                        <g key={t}>
                            <line
                                x1="38"
                                y1={y}
                                x2={isMajor ? 46 : 43}
                                y2={y}
                                stroke="#94A3B8"
                                strokeWidth="1.2"
                            />
                            <text x="50" y={y + 4} textAnchor="start">
                                {t > 0 ? `+${t}` : t}
                            </text>
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}
