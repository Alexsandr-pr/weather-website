interface WindDirectionIconProps {
    deg: number;
    className?: string;
}

export function WindDirectionIcon({ deg, className }: WindDirectionIconProps) {
    return (
        <svg
            viewBox="0 0 16 16"
            className={className ?? "h-3.5 w-3.5 text-slate-600"}
            style={{ transform: `rotate(${deg}deg)` }}
            aria-hidden="true"
        >
            <path d="M2 8 H12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9 5 L12 8 L9 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
