/**
 * Data cache TTL for Open-Meteo / air-quality responses (tier reflects commune size).
 */
export const REVALIDATE_BY_TIER: Record<number, number> = {
    1: 3600, // 1 hour — wilaya capitals and major centres
    2: 10800, // 3 hours — secondary towns, daïra seats, tourist areas
    3: 21600, // 6 hours — small communes and rural areas
};

/** TTL by tier; pass the resolved tier (`resolveEffectiveTier`) or an explicit value. */
export function getWeatherRevalidateSecondsForTier(tier?: number): number {
    const t = tier ?? 3;
    return REVALIDATE_BY_TIER[t] ?? REVALIDATE_BY_TIER[3];
}
