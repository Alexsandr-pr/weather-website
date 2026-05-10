/** Fuseau côté client: l'Algérie n'observe pas l'heure d'été (UTC+1). */
const ALGIERS_OFFSET = "+01:00";

export function quantitativeCelsius(value: number) {
    return {
        "@type": "QuantitativeValue" as const,
        value: Math.round(value * 10) / 10,
        unitCode: "CEL",
        unitText: "°C",
    };
}

/** `isoDate` YYYY-MM-DD, `hhmm` HH:mm (heure locale pour la ville). */
export function localDateTimeWithAlgiersOffset(isoDate: string, hhmm: string) {
    return `${isoDate}T${hhmm}:00${ALGIERS_OFFSET}`;
}

export function dayBoundsIso(isoDate: string) {
    return {
        validFrom: `${isoDate}T00:00:00${ALGIERS_OFFSET}`,
        validThrough: `${isoDate}T23:59:59${ALGIERS_OFFSET}`,
    };
}
