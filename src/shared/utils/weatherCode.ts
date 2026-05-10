const WEATHER_CODE_LABELS: Record<number, string> = {
    0: "Ensoleille",
    1: "Generalement clair",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine legere",
    53: "Bruine moderee",
    55: "Bruine dense",
    56: "Bruine verglacante legere",
    57: "Bruine verglacante dense",
    61: "Pluie legere",
    63: "Pluie moderee",
    65: "Pluie forte",
    66: "Pluie verglacante legere",
    67: "Pluie verglacante forte",
    71: "Neige legere",
    73: "Neige moderee",
    75: "Neige forte",
    77: "Grains de neige",
    80: "Averses legeres",
    81: "Averses moderees",
    82: "Averses violentes",
    85: "Averses de neige legeres",
    86: "Averses de neige fortes",
    95: "Orage",
    96: "Orage avec grele legere",
    99: "Orage avec grele forte",
};

export function getWeatherCodeLabel(code: number): string {
    return WEATHER_CODE_LABELS[code] ?? "Conditions inconnues";
}

export function isNightWeatherCode(code: number, isNight: boolean): boolean {
    return isNight && (code === 0 || code === 1 || code === 2);
}
