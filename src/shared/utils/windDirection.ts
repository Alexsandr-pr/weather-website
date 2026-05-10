const CARDINALS_FR_8 = [
    "nord",
    "nord-est",
    "est",
    "sud-est",
    "sud",
    "sud-ouest",
    "ouest",
    "nord-ouest",
] as const;

/** Angle meteorologique en degres (0 = nord, sens horaire). Huit directions, libelle en francais. */
export function windDirectionDegToFrenchCardinal8(deg: number): string {
    const normalized = ((deg % 360) + 360) % 360;
    const idx = Math.round(normalized / 45) % 8;
    return CARDINALS_FR_8[idx]!;
}

export function formatWindCellAccessibility(params: {
    directionDeg: number;
    speedMs: string;
}): { ariaLabel: string; title: string } {
    const cardinal = windDirectionDegToFrenchCardinal8(params.directionDeg);
    const rounded = Math.round(params.directionDeg);
    const summary = `Vent du ${cardinal}, ${params.speedMs} m/s`;
    return {
        ariaLabel: summary,
        title: `${summary} (${rounded}°)`,
    };
}
