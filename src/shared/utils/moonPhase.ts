import type { MoonPhase } from "@/shared/types/weather";

const PHASES: MoonPhase[] = [
    "new",
    "waxing-crescent",
    "first-quarter",
    "waxing-gibbous",
    "full",
    "waning-gibbous",
    "last-quarter",
    "waning-crescent",
];

const PHASE_LABELS: Record<MoonPhase, string> = {
    "new": "Nouvelle lune",
    "waxing-crescent": "Premier croissant",
    "first-quarter": "Premier quartier",
    "waxing-gibbous": "Lune gibbeuse croissante",
    "full": "Pleine lune",
    "waning-gibbous": "Lune gibbeuse decroissante",
    "last-quarter": "Dernier quartier",
    "waning-crescent": "Dernier croissant",
};

const KNOWN_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);
const SYNODIC_PERIOD_DAYS = 29.530588853;
const MS_PER_DAY = 86_400_000;

function toDate(input: Date | string): Date {
    if (input instanceof Date) return input;
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return new Date(`${input}T12:00:00Z`);
    return new Date(input);
}

export function getMoonPhaseValue(input: Date | string): number {
    const elapsed = (toDate(input).getTime() - KNOWN_NEW_MOON_UTC) / MS_PER_DAY;
    return (((elapsed / SYNODIC_PERIOD_DAYS) % 1) + 1) % 1;
}

export function getMoonPhase(input: Date | string): MoonPhase {
    const value = getMoonPhaseValue(input);
    const index = Math.floor((value + 0.0625) * 8) % 8;
    return PHASES[index];
}

export function getMoonPhaseLabel(phase: MoonPhase): string {
    return PHASE_LABELS[phase];
}

export function getMoonIlluminationPercent(input: Date | string): number {
    const value = getMoonPhaseValue(input);
    return Math.round((1 - Math.cos(value * 2 * Math.PI)) * 50);
}
