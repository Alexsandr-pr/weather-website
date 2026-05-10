/**
 * TTL Data Cache pour Open-Meteo / air-quality selon la taille de la commune.
 */
export const REVALIDATE_BY_TIER: Record<number, number> = {
    1: 3600, // 1 hour — capitales wilaya et grands centres
    2: 10800, // 3 hours — villes secondaires, sièges de daïra, zones touristiques
    3: 21600, // 6 hours — petites communes et zones rurales
};

/** TTL par niveau ; passer le tier résolu (`resolveEffectiveTier`) ou une valeur explicite. */
export function getWeatherRevalidateSecondsForTier(tier?: number): number {
    const t = tier ?? 3;
    return REVALIDATE_BY_TIER[t] ?? REVALIDATE_BY_TIER[3];
}
