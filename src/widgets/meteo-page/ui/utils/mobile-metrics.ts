import type { HourlyWeather } from "@/widgets/meteo-page/types";

export interface MobileMetricItem {
    label: string;
    value: string;
    hint: string;
    iconRotation?: number;
}

export function buildMobileMetricItems(hour: HourlyWeather): MobileMetricItem[] {
    const feelsLike = Math.round(hour.feelsLike);
    const pressureMm = Math.round(hour.pressure * 0.750062);
    const humidity = Math.round(hour.humidity);
    const uv = Math.round(hour.uvIndex);
    const aqi = Math.round(hour.aqi ?? 0);
    const windMs = (hour.windSpeed / 3.6).toFixed(1);
    const precipitation = Math.round(hour.precipitationProbability);

    return [
        { label: "Ressenti", value: `${feelsLike >= 0 ? "+" : ""}${feelsLike}°`, hint: "comme" },
        { label: "Vent", value: `${windMs}`, hint: "m/s", iconRotation: hour.windDirection },
        { label: "Humidite", value: `${humidity}`, hint: "%" },
        { label: "Pression", value: `${pressureMm}`, hint: "mm Hg" },
        { label: "UV Index", value: `${uv}`, hint: uv >= 8 ? "tres haut" : uv >= 6 ? "haut" : uv >= 3 ? "moyen" : "bas" },
        { label: "AQI", value: `${aqi}`, hint: aqi <= 50 ? "bon" : aqi <= 100 ? "moyen" : "mauvais" },
        { label: "Precipitations", value: precipitation === 0 ? "0" : `${precipitation}`, hint: "%" },
    ];
}
