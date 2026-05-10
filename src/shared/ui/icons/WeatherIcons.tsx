import { useId, type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function BaseSvg({
    children,
    className = "h-8 w-8",
    ...rest
}: IconProps & { children: React.ReactNode }) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            {children}
        </svg>
    );
}

function IconDefs({ id }: { id: string }) {
    return (
        <defs>
            <radialGradient id={`${id}-sun-disc`} cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#FFFAD9" />
                <stop offset="55%" stopColor="#FFD23F" />
                <stop offset="100%" stopColor="#F08A1C" />
            </radialGradient>
            <radialGradient id={`${id}-sun-glow`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE27A" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#FFB547" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#FFB547" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${id}-ray`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFEB80" />
                <stop offset="100%" stopColor="#FF9F1C" />
            </linearGradient>

            <radialGradient id={`${id}-moon`} cx="32%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#FFFAEC" />
                <stop offset="55%" stopColor="#FBE6B0" />
                <stop offset="100%" stopColor="#C9A55C" />
            </radialGradient>
            <radialGradient id={`${id}-moon-glow`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F2EAD3" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#F2EAD3" stopOpacity="0" />
            </radialGradient>

            <linearGradient id={`${id}-cloud-day`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#EAF1FB" />
                <stop offset="100%" stopColor="#B7C8E0" />
            </linearGradient>
            <linearGradient id={`${id}-cloud-storm`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#8DA0BB" />
                <stop offset="55%" stopColor="#677994" />
                <stop offset="100%" stopColor="#3D4A60" />
            </linearGradient>
            <linearGradient id={`${id}-cloud-snow`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E5EDF6" />
                <stop offset="100%" stopColor="#A8BFD8" />
            </linearGradient>

            <linearGradient id={`${id}-drop`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#9CDDFF" />
                <stop offset="55%" stopColor="#3DA0F0" />
                <stop offset="100%" stopColor="#0E60BF" />
            </linearGradient>
            <linearGradient id={`${id}-drop-freeze`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#C9F4FF" />
                <stop offset="55%" stopColor="#3FD3E6" />
                <stop offset="100%" stopColor="#0F7E8F" />
            </linearGradient>
            <radialGradient id={`${id}-drop-shine`} cx="35%" cy="30%" r="40%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <linearGradient id={`${id}-flake`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#A8D7F0" />
            </linearGradient>

            <linearGradient id={`${id}-bolt`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFF176" />
                <stop offset="50%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#E65100" />
            </linearGradient>

            <radialGradient id={`${id}-hail`} cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#DDF0F9" />
                <stop offset="100%" stopColor="#7AB7E8" />
            </radialGradient>

            <linearGradient id={`${id}-fog`} x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#B7C8E0" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#7E94B3" />
                <stop offset="100%" stopColor="#B7C8E0" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id={`${id}-fog-night`} x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#64748B" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#64748B" stopOpacity="0.25" />
            </linearGradient>

            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow
                    dx="0"
                    dy="1.2"
                    stdDeviation="1"
                    floodColor="#1E293B"
                    floodOpacity="0.28"
                />
            </filter>
        </defs>
    );
}

function Sun({
    id,
    cx = 32,
    cy = 32,
    r = 12,
    rays = true,
}: {
    id: string;
    cx?: number;
    cy?: number;
    r?: number;
    rays?: boolean;
}) {
    const rayInner = r + 2;
    const rayOuter = r + 8;
    const rayHalf = 1.6;
    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={r + 11}
                fill={`url(#${id}-sun-glow)`}
            />
            {rays && (
                <g filter={`url(#${id}-glow)`}>
                    {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i * 45 * Math.PI) / 180;
                        const sx = cx + Math.cos(angle) * rayInner;
                        const sy = cy + Math.sin(angle) * rayInner;
                        const ex = cx + Math.cos(angle) * rayOuter;
                        const ey = cy + Math.sin(angle) * rayOuter;
                        const px = -Math.sin(angle) * rayHalf;
                        const py = Math.cos(angle) * rayHalf;
                        return (
                            <path
                                key={i}
                                d={`M${sx + px} ${sy + py} L${ex} ${ey} L${sx - px} ${sy - py} Z`}
                                fill={`url(#${id}-ray)`}
                            />
                        );
                    })}
                </g>
            )}
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={`url(#${id}-sun-disc)`}
                stroke="#F08A1C"
                strokeWidth="0.6"
                strokeOpacity="0.4"
            />
            <ellipse
                cx={cx - r * 0.35}
                cy={cy - r * 0.45}
                rx={r * 0.45}
                ry={r * 0.28}
                fill="#FFFFFF"
                opacity="0.55"
            />
        </g>
    );
}

function Moon({
    id,
    cx = 32,
    cy = 32,
    r = 14,
}: {
    id: string;
    cx?: number;
    cy?: number;
    r?: number;
}) {
    return (
        <g>
            <circle cx={cx} cy={cy} r={r + 9} fill={`url(#${id}-moon-glow)`} />
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={`url(#${id}-moon)`}
                stroke="#B89253"
                strokeWidth="0.6"
                strokeOpacity="0.5"
            />
            <ellipse
                cx={cx + r * 0.45}
                cy={cy + r * 0.25}
                rx={r * 0.55}
                ry={r * 0.7}
                fill="#9C7B3C"
                opacity="0.22"
            />
            <circle cx={cx - r * 0.25} cy={cy - r * 0.35} r={r * 0.13} fill="#9C7B3C" opacity="0.45" />
            <circle cx={cx + r * 0.1} cy={cy + r * 0.05} r={r * 0.18} fill="#9C7B3C" opacity="0.35" />
            <circle cx={cx - r * 0.4} cy={cy + r * 0.3} r={r * 0.1} fill="#9C7B3C" opacity="0.4" />
            <ellipse
                cx={cx - r * 0.35}
                cy={cy - r * 0.45}
                rx={r * 0.4}
                ry={r * 0.22}
                fill="#FFFFFF"
                opacity="0.5"
            />
        </g>
    );
}

function Stars({ items }: { items: Array<{ x: number; y: number; r?: number }> }) {
    return (
        <g fill="#FFE27A">
            {items.map((s, i) => (
                <g key={i}>
                    <circle cx={s.x} cy={s.y} r={s.r ?? 1.2} />
                    <g
                        stroke="#FFE27A"
                        strokeWidth="0.6"
                        strokeLinecap="round"
                        opacity="0.7"
                    >
                        <line x1={s.x - 2.5} y1={s.y} x2={s.x + 2.5} y2={s.y} />
                        <line x1={s.x} y1={s.y - 2.5} x2={s.x} y2={s.y + 2.5} />
                    </g>
                </g>
            ))}
        </g>
    );
}

const CLOUD_BODY =
    "M19 42c-5.3 0-9.5-3.8-9.5-8.8s4.2-8.8 9.5-8.8c1 0 2 .2 3 .5 1.7-4.7 6.2-7.7 11.5-7.7 7 0 12.5 5.3 12.5 11.7 0 .5 0 1-.1 1.5C50.4 30.8 53 33.6 53 37.3c0 4.9-4.2 8.8-9.5 8.8H19z";

const CLOUD_BODY_HIGHLIGHT =
    "M22 28c-1.6 0-3 .6-4 1.5 1-3.5 4.5-6 8.5-6 1.6 0 3 .4 4.4 1.1-2.5 .4-5.7 1.7-8.9 3.4z";

/** Couche large et basse (Stratocumulus) — silhouette distincte du cumulus. */
const CLOUD_LAYER_WIDE =
    "M6 44C6 34 16 28 28 30C34 24 46 25 56 32C60 36 58 44 50 46C38 49 22 49 12 45C8.5 44 6 44.5 6 44z";

const CLOUD_LAYER_WIDE_HIGHLIGHT =
    "M12 34c-1.1 0-2 .35-2.7.9.7-2 3.2-3.6 6.2-3.2 3.6 0 8.2 2.4 10.2 5.4-1.8-3.4-6.4-5.6-13.7-3.2z";

function Cloud({
    id,
    variant = "day",
    transform,
    opacity = 1,
    shape = "cumulus",
}: {
    id: string;
    variant?: "day" | "storm" | "snow";
    transform?: string;
    opacity?: number;
    /** cumulus — forme standard ; layerWide — nuage bas et horizontal pour le ciel couvert */
    shape?: "cumulus" | "layerWide";
}) {
    const bodyPath = shape === "layerWide" ? CLOUD_LAYER_WIDE : CLOUD_BODY;
    const highlightPath =
        shape === "layerWide" ? CLOUD_LAYER_WIDE_HIGHLIGHT : CLOUD_BODY_HIGHLIGHT;
    const highlightOpacity =
        shape === "layerWide"
            ? variant === "storm"
                ? 0.12
                : 0.38
            : variant === "storm"
              ? 0.18
              : 0.55;
    const fill =
        variant === "storm"
            ? `url(#${id}-cloud-storm)`
            : variant === "snow"
                ? `url(#${id}-cloud-snow)`
                : `url(#${id}-cloud-day)`;
    const stroke =
        variant === "storm"
            ? "#3D4A60"
            : variant === "snow"
                ? "#94A8C2"
                : "#A6BAD3";
    return (
        <g opacity={opacity} transform={transform} filter={`url(#${id}-shadow)`}>
            <path d={bodyPath} fill={fill} stroke={stroke} strokeWidth="1" />
            <path
                d={highlightPath}
                fill="#FFFFFF"
                opacity={highlightOpacity}
            />
        </g>
    );
}

function RainDrop({
    id,
    x,
    y,
    size = 1,
    freezing = false,
}: {
    id: string;
    x: number;
    y: number;
    size?: number;
    freezing?: boolean;
}) {
    const w = 2.4 * size;
    const h = 5.6 * size;
    const fill = freezing ? `url(#${id}-drop-freeze)` : `url(#${id}-drop)`;
    const stroke = freezing ? "#0F7E8F" : "#0E60BF";
    return (
        <g>
            <path
                d={`M${x} ${y} C${x + w} ${y + h * 0.55} ${x + w} ${y + h} ${x} ${y + h} C${x - w} ${y + h} ${x - w} ${y + h * 0.55} ${x} ${y}Z`}
                fill={fill}
                stroke={stroke}
                strokeWidth="0.5"
                strokeOpacity="0.5"
            />
            <ellipse
                cx={x - w * 0.35}
                cy={y + h * 0.55}
                rx={w * 0.35}
                ry={h * 0.18}
                fill="#FFFFFF"
                opacity="0.7"
            />
        </g>
    );
}

function Streak({
    id,
    x,
    y,
    h = 6,
    freezing = false,
}: {
    id: string;
    x: number;
    y: number;
    h?: number;
    freezing?: boolean;
}) {
    const fill = freezing ? `url(#${id}-drop-freeze)` : `url(#${id}-drop)`;
    return (
        <path
            d={`M${x} ${y} l-${h * 0.3} ${h} q.4 1.2 ${h * 0.3 + 0.6} 1.1 q1.4 -.1 ${h * 0.3 + 0.4} -1.1 Z`}
            fill={fill}
            stroke={freezing ? "#0F7E8F" : "#0E60BF"}
            strokeWidth="0.4"
            strokeOpacity="0.4"
        />
    );
}

function Snowflake({
    id,
    x,
    y,
    size = 4,
}: {
    id: string;
    x: number;
    y: number;
    size?: number;
}) {
    const arms = 6;
    const r = size;
    const branch = r * 0.45;
    return (
        <g
            stroke={`url(#${id}-flake)`}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            filter={`url(#${id}-glow)`}
        >
            {Array.from({ length: arms }).map((_, i) => {
                const a = (i * 60 * Math.PI) / 180;
                const ex = x + Math.cos(a) * r;
                const ey = y + Math.sin(a) * r;
                const bx1 = x + Math.cos(a) * r * 0.6 + Math.cos(a + Math.PI / 3) * branch;
                const by1 = y + Math.sin(a) * r * 0.6 + Math.sin(a + Math.PI / 3) * branch;
                const bx2 = x + Math.cos(a) * r * 0.6 + Math.cos(a - Math.PI / 3) * branch;
                const by2 = y + Math.sin(a) * r * 0.6 + Math.sin(a - Math.PI / 3) * branch;
                return (
                    <g key={i}>
                        <line x1={x} y1={y} x2={ex} y2={ey} />
                        <line
                            x1={x + Math.cos(a) * r * 0.6}
                            y1={y + Math.sin(a) * r * 0.6}
                            x2={bx1}
                            y2={by1}
                        />
                        <line
                            x1={x + Math.cos(a) * r * 0.6}
                            y1={y + Math.sin(a) * r * 0.6}
                            x2={bx2}
                            y2={by2}
                        />
                    </g>
                );
            })}
            <circle cx={x} cy={y} r={r * 0.16} fill="#FFFFFF" stroke="none" />
        </g>
    );
}

function Grain({
    x,
    y,
    color = "#7AB7E8",
}: {
    x: number;
    y: number;
    color?: string;
}) {
    return (
        <g>
            <circle cx={x} cy={y} r="1.4" fill={color} />
            <circle cx={x - 0.4} cy={y - 0.4} r="0.5" fill="#FFFFFF" opacity="0.8" />
        </g>
    );
}

function HailBall({
    id,
    x,
    y,
    r = 2.6,
}: {
    id: string;
    x: number;
    y: number;
    r?: number;
}) {
    return (
        <g>
            <circle
                cx={x}
                cy={y}
                r={r}
                fill={`url(#${id}-hail)`}
                stroke="#5C9BD5"
                strokeWidth="0.6"
            />
            <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.3} fill="#FFFFFF" opacity="0.85" />
        </g>
    );
}

function Lightning({
    id,
    x = 30,
    y = 38,
    scale = 1,
}: {
    id: string;
    x?: number;
    y?: number;
    scale?: number;
}) {
    const s = scale;
    return (
        <g filter={`url(#${id}-glow)`}>
            <path
                d={`M${x} ${y} L${x - 7 * s} ${y + 12 * s} L${x - 1 * s} ${y + 12 * s} L${x - 5 * s} ${y + 22 * s} L${x + 11 * s} ${y + 6 * s} L${x + 4 * s} ${y + 6 * s} L${x + 9 * s} ${y - 1 * s} Z`}
                fill={`url(#${id}-bolt)`}
                stroke="#B45309"
                strokeWidth="0.7"
                strokeLinejoin="round"
            />
            <path
                d={`M${x - 0.5 * s} ${y + 1 * s} L${x - 6 * s} ${y + 11 * s} L${x - 2 * s} ${y + 11 * s}`}
                fill="none"
                stroke="#FFF8DC"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.7"
            />
        </g>
    );
}

function FogLines({ id, variant = "day" }: { id: string; variant?: "day" | "night" }) {
    const strokeUrl = variant === "night" ? `url(#${id}-fog-night)` : `url(#${id}-fog)`;
    const opacity = variant === "night" ? 0.92 : 1;
    return (
        <g strokeLinecap="round" opacity={opacity}>
            <path
                d="M8 44 q8 -3 16 0 q8 3 16 0 q8 -3 16 0"
                stroke={strokeUrl}
                strokeWidth="3"
                fill="none"
            />
            <path
                d="M10 51 q8 -3 16 0 q8 3 16 0 q6 -2 12 0"
                stroke={strokeUrl}
                strokeWidth="3"
                fill="none"
            />
            <path
                d="M14 58 q8 -3 16 0 q8 3 16 0"
                stroke={strokeUrl}
                strokeWidth="3"
                fill="none"
            />
        </g>
    );
}

export function ClearDayIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Sun id={id} cx={32} cy={32} r={13} />
        </BaseSvg>
    );
}

export function ClearNightIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Stars
                items={[
                    { x: 14, y: 18, r: 1.4 },
                    { x: 52, y: 14, r: 1.6 },
                    { x: 50, y: 42, r: 1.2 },
                    { x: 16, y: 46, r: 1 },
                ]}
            />
            <Moon id={id} cx={34} cy={32} r={14} />
        </BaseSvg>
    );
}

export function MainlyClearDayIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Sun id={id} cx={20} cy={22} r={9} />
            <Cloud id={id} variant="day" transform="translate(8 8) scale(0.85)" opacity={0.95} />
        </BaseSvg>
    );
}

export function MainlyClearNightIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Stars items={[{ x: 50, y: 14 }, { x: 14, y: 16 }]} />
            <Moon id={id} cx={20} cy={22} r={10} />
            <Cloud id={id} variant="day" transform="translate(8 8) scale(0.85)" opacity={0.95} />
        </BaseSvg>
    );
}

export function PartlyCloudyDayIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Sun id={id} cx={20} cy={20} r={8} />
            <Cloud id={id} variant="day" />
        </BaseSvg>
    );
}

export function PartlyCloudyNightIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Stars items={[{ x: 50, y: 12 }]} />
            <Moon id={id} cx={20} cy={20} r={10} />
            <Cloud id={id} variant="day" />
        </BaseSvg>
    );
}

/** Couvert de jour : grande couche basse + cumulus principal + petit relief. */
export function OvercastDayIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Cloud
                id={id}
                variant="day"
                shape="layerWide"
                transform="translate(0 5)"
                opacity={0.52}
            />
            <Cloud
                id={id}
                variant="day"
                shape="cumulus"
                transform="translate(-9 -1) scale(0.96)"
                opacity={0.88}
            />
            <Cloud
                id={id}
                variant="day"
                shape="cumulus"
                transform="translate(24 -11) scale(0.48)"
                opacity={0.7}
            />
        </BaseSvg>
    );
}

/** Couvert de nuit : meme composition (couche + cumulus) en ton orage, lune et etoiles derriere. */
export function OvercastNightIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Stars
                items={[
                    { x: 14, y: 17, r: 1.1 },
                    { x: 52, y: 13, r: 1.3 },
                    { x: 18, y: 48, r: 1 },
                ]}
            />
            <Moon id={id} cx={38} cy={28} r={11} />
            <Cloud
                id={id}
                variant="storm"
                shape="layerWide"
                transform="translate(0 4)"
                opacity={0.58}
            />
            <Cloud
                id={id}
                variant="storm"
                shape="cumulus"
                transform="translate(-9 -2) scale(0.96)"
                opacity={0.88}
            />
            <Cloud
                id={id}
                variant="storm"
                shape="cumulus"
                transform="translate(24 -12) scale(0.48)"
                opacity={0.72}
            />
        </BaseSvg>
    );
}

/** Brouillard / brume — jour : nuage clair + trainee gris-bleu lumineuses. */
export function FogDayIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Cloud id={id} variant="day" shape="layerWide" transform="translate(-2 -4) scale(0.94)" opacity={0.45} />
            <Cloud id={id} variant="day" transform="translate(0 -10)" opacity={0.88} />
            <FogLines id={id} variant="day" />
        </BaseSvg>
    );
}

/** Brouillard de nuit : couche plus sombre + brume slate + lune diffuse. */
export function FogNightIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Stars
                items={[
                    { x: 12, y: 44, r: 0.9 },
                    { x: 54, y: 16, r: 1.15 },
                    { x: 50, y: 40, r: 0.8 },
                ]}
            />
            <Moon id={id} cx={36} cy={22} r={9} />
            <Cloud id={id} variant="storm" shape="layerWide" transform="translate(-3 -6) scale(0.96)" opacity={0.4} />
            <Cloud id={id} variant="storm" transform="translate(1 -11)" opacity={0.72} />
            <FogLines id={id} variant="night" />
        </BaseSvg>
    );
}

/** Givre/brume glaciale — jour */
export function RimeFogDayIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Cloud id={id} variant="snow" shape="layerWide" transform="translate(-2 -4) scale(0.94)" opacity={0.42} />
            <Cloud id={id} variant="snow" transform="translate(0 -10)" opacity={0.86} />
            <FogLines id={id} variant="day" />
            <g fill="#22D3EE">
                <circle cx="20" cy="60" r="0.9" />
                <circle cx="32" cy="62" r="0.9" />
                <circle cx="44" cy="60" r="0.9" />
            </g>
        </BaseSvg>
    );
}

/** Givre/brume glaciale — nuit */
export function RimeFogNightIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Stars
                items={[
                    { x: 14, y: 42, r: 0.85 },
                    { x: 52, y: 14, r: 1.2 },
                    { x: 22, y: 18, r: 0.95 },
                ]}
            />
            <Moon id={id} cx={38} cy={22} r={8} />
            <Cloud id={id} variant="snow" shape="layerWide" transform="translate(-3 -6) scale(0.96)" opacity={0.4} />
            <Cloud id={id} variant="snow" transform="translate(1 -11)" opacity={0.7} />
            <FogLines id={id} variant="night" />
            <g fill="#67E8F9">
                <circle cx="20" cy="60" r="0.9" />
                <circle cx="32" cy="62" r="0.9" />
                <circle cx="44" cy="60" r="0.9" />
            </g>
        </BaseSvg>
    );
}

interface DrizzleProps extends IconProps {
    intensity?: "light" | "moderate" | "dense";
    freezing?: boolean;
}

export function DrizzleIcon({ intensity = "light", freezing = false, ...rest }: DrizzleProps) {
    const id = useId();
    const drops =
        intensity === "light"
            ? [{ x: 24, y: 48 }, { x: 38, y: 48 }]
            : intensity === "moderate"
                ? [{ x: 20, y: 48 }, { x: 32, y: 50 }, { x: 44, y: 48 }]
                : [
                    { x: 18, y: 48 },
                    { x: 26, y: 50 },
                    { x: 34, y: 48 },
                    { x: 42, y: 50 },
                    { x: 50, y: 48 },
                ];
    return (
        <BaseSvg {...rest}>
            <IconDefs id={id} />
            <Cloud id={id} variant="storm" transform="translate(0 -2)" />
            {drops.map((d, i) => (
                <Streak key={i} id={id} x={d.x} y={d.y} h={5} freezing={freezing} />
            ))}
        </BaseSvg>
    );
}

interface RainProps extends IconProps {
    intensity?: "light" | "moderate" | "heavy";
    freezing?: boolean;
}

export function RainIcon({ intensity = "moderate", freezing = false, ...rest }: RainProps) {
    const id = useId();
    const drops =
        intensity === "light"
            ? [{ x: 26, y: 48 }, { x: 40, y: 48 }]
            : intensity === "moderate"
                ? [{ x: 22, y: 48 }, { x: 32, y: 50 }, { x: 42, y: 48 }]
                : [
                    { x: 18, y: 48 },
                    { x: 26, y: 50 },
                    { x: 34, y: 48 },
                    { x: 42, y: 50 },
                    { x: 50, y: 48 },
                ];
    const dropSize = intensity === "heavy" ? 1.15 : 1;
    return (
        <BaseSvg {...rest}>
            <IconDefs id={id} />
            <Cloud id={id} variant="storm" transform="translate(0 -2)" />
            {drops.map((d, i) => (
                <RainDrop key={i} id={id} x={d.x} y={d.y} size={dropSize} freezing={freezing} />
            ))}
        </BaseSvg>
    );
}

interface SnowProps extends IconProps {
    intensity?: "light" | "moderate" | "heavy";
}

export function SnowIcon({ intensity = "moderate", ...rest }: SnowProps) {
    const id = useId();
    const flakes =
        intensity === "light"
            ? [{ x: 24, y: 52 }, { x: 40, y: 52 }]
            : intensity === "moderate"
                ? [{ x: 20, y: 52 }, { x: 32, y: 56 }, { x: 44, y: 52 }]
                : [
                    { x: 16, y: 52 },
                    { x: 26, y: 56 },
                    { x: 34, y: 52 },
                    { x: 42, y: 56 },
                    { x: 50, y: 52 },
                ];
    return (
        <BaseSvg {...rest}>
            <IconDefs id={id} />
            <Cloud id={id} variant="snow" transform="translate(0 -2)" />
            {flakes.map((f, i) => (
                <Snowflake key={i} id={id} x={f.x} y={f.y} size={3.4} />
            ))}
        </BaseSvg>
    );
}

export function SnowGrainsIcon(props: IconProps) {
    const id = useId();
    return (
        <BaseSvg {...props}>
            <IconDefs id={id} />
            <Cloud id={id} variant="snow" transform="translate(0 -2)" />
            <Grain x={20} y={50} />
            <Grain x={26} y={54} />
            <Grain x={32} y={50} />
            <Grain x={38} y={54} />
            <Grain x={44} y={50} />
            <Grain x={24} y={58} />
            <Grain x={36} y={58} />
            <Grain x={48} y={58} />
        </BaseSvg>
    );
}

interface RainShowersProps extends IconProps {
    intensity?: "slight" | "moderate" | "violent";
}

export function RainShowersIcon({ intensity = "moderate", ...rest }: RainShowersProps) {
    const id = useId();
    const drops =
        intensity === "slight"
            ? [{ x: 28, y: 50 }, { x: 40, y: 50 }]
            : intensity === "moderate"
                ? [{ x: 22, y: 50 }, { x: 32, y: 52 }, { x: 42, y: 50 }]
                : [
                    { x: 18, y: 50 },
                    { x: 26, y: 52 },
                    { x: 34, y: 50 },
                    { x: 42, y: 52 },
                    { x: 50, y: 50 },
                ];
    const dropSize = intensity === "violent" ? 1.2 : 1;
    return (
        <BaseSvg {...rest}>
            <IconDefs id={id} />
            <Sun id={id} cx={48} cy={14} r={7} />
            <Cloud id={id} variant="storm" transform="translate(-2 4)" />
            {drops.map((d, i) => (
                <RainDrop key={i} id={id} x={d.x} y={d.y} size={dropSize} />
            ))}
        </BaseSvg>
    );
}

interface SnowShowersProps extends IconProps {
    intensity?: "slight" | "heavy";
}

export function SnowShowersIcon({ intensity = "slight", ...rest }: SnowShowersProps) {
    const id = useId();
    const flakes =
        intensity === "slight"
            ? [{ x: 26, y: 54 }, { x: 40, y: 54 }]
            : [
                { x: 18, y: 54 },
                { x: 28, y: 58 },
                { x: 36, y: 54 },
                { x: 44, y: 58 },
                { x: 50, y: 54 },
            ];
    return (
        <BaseSvg {...rest}>
            <IconDefs id={id} />
            <Sun id={id} cx={48} cy={14} r={7} />
            <Cloud id={id} variant="snow" transform="translate(-2 4)" />
            {flakes.map((f, i) => (
                <Snowflake key={i} id={id} x={f.x} y={f.y} size={3} />
            ))}
        </BaseSvg>
    );
}

interface ThunderstormProps extends IconProps {
    hail?: "slight" | "heavy";
}

export function ThunderstormIcon({ hail, ...rest }: ThunderstormProps) {
    const id = useId();
    return (
        <BaseSvg {...rest}>
            <IconDefs id={id} />
            <Cloud id={id} variant="storm" />
            <Lightning id={id} x={30} y={38} scale={1} />
            {hail === "slight" && (
                <>
                    <HailBall id={id} x={20} y={54} />
                    <HailBall id={id} x={44} y={56} />
                </>
            )}
            {hail === "heavy" && (
                <>
                    <HailBall id={id} x={18} y={52} r={2.8} />
                    <HailBall id={id} x={26} y={58} r={2.6} />
                    <HailBall id={id} x={42} y={52} r={2.6} />
                    <HailBall id={id} x={50} y={58} r={2.8} />
                </>
            )}
        </BaseSvg>
    );
}

interface WeatherCodeIconProps extends IconProps {
    code: number;
    isNight?: boolean;
}

export function WeatherCodeIcon({ code, isNight, ...rest }: WeatherCodeIconProps) {
    switch (code) {
        case 0:
            return isNight ? <ClearNightIcon {...rest} /> : <ClearDayIcon {...rest} />;
        case 1:
            return isNight ? <MainlyClearNightIcon {...rest} /> : <MainlyClearDayIcon {...rest} />;
        case 2:
            return isNight ? <PartlyCloudyNightIcon {...rest} /> : <PartlyCloudyDayIcon {...rest} />;
        case 45:
            return isNight ? <FogNightIcon {...rest} /> : <FogDayIcon {...rest} />;
        case 48:
            return isNight ? <RimeFogNightIcon {...rest} /> : <RimeFogDayIcon {...rest} />;
        case 51:
            return <DrizzleIcon intensity="light" {...rest} />;
        case 53:
            return <DrizzleIcon intensity="moderate" {...rest} />;
        case 55:
            return <DrizzleIcon intensity="dense" {...rest} />;
        case 56:
            return <DrizzleIcon intensity="light" freezing {...rest} />;
        case 57:
            return <DrizzleIcon intensity="dense" freezing {...rest} />;
        case 61:
            return <RainIcon intensity="light" {...rest} />;
        case 63:
            return <RainIcon intensity="moderate" {...rest} />;
        case 65:
            return <RainIcon intensity="heavy" {...rest} />;
        case 66:
            return <RainIcon intensity="light" freezing {...rest} />;
        case 67:
            return <RainIcon intensity="heavy" freezing {...rest} />;
        case 71:
            return <SnowIcon intensity="light" {...rest} />;
        case 73:
            return <SnowIcon intensity="moderate" {...rest} />;
        case 75:
            return <SnowIcon intensity="heavy" {...rest} />;
        case 77:
            return <SnowGrainsIcon {...rest} />;
        case 80:
            return <RainShowersIcon intensity="slight" {...rest} />;
        case 81:
            return <RainShowersIcon intensity="moderate" {...rest} />;
        case 82:
            return <RainShowersIcon intensity="violent" {...rest} />;
        case 85:
            return <SnowShowersIcon intensity="slight" {...rest} />;
        case 86:
            return <SnowShowersIcon intensity="heavy" {...rest} />;
        case 95:
            return <ThunderstormIcon {...rest} />;
        case 96:
            return <ThunderstormIcon hail="slight" {...rest} />;
        case 99:
            return <ThunderstormIcon hail="heavy" {...rest} />;
        case 3:
        default:
            return isNight ? (
                <OvercastNightIcon {...rest} />
            ) : (
                <OvercastDayIcon {...rest} />
            );
    }
}
