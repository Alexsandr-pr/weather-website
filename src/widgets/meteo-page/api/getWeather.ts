import { cache } from "react";
import type {
    DailyWeather,
    OpenMeteoAirQualityResponse,
    OpenMeteoForecastResponse,
} from "../types";
import { GetWeatherParams } from "../types/get-weather-params.type";
import { transformWeatherResponse } from "../utils/transformWeatherResponse";

type MemoryEntry = {
    data: DailyWeather[];
    expiresAt: number;
};

const memoryByCoords = new Map<string, MemoryEntry>();

const inFlightByCoords = new Map<string, Promise<DailyWeather[]>>();

function coordsKey(lat: number, lon: number): string {
    return `${lat.toFixed(6)},${lon.toFixed(6)}`;
}

async function fetchOpenMeteo(
    lat: number,
    lon: number,
): Promise<DailyWeather[]> {
    const weatherParams = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),

        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "uv_index_max",
            "sunrise",
            "sunset",
        ].join(","),

        hourly: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "surface_pressure",
            "uv_index",
            "precipitation_probability",
            "wind_speed_10m",
            "wind_direction_10m",
        ].join(","),

        timezone: "Africa/Algiers",
        forecast_days: "10",
    });

    const airQualityParams = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),

        hourly: ["us_aqi"].join(","),

        timezone: "Africa/Algiers",
    });

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${weatherParams.toString()}`;

    const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?${airQualityParams.toString()}`;

    const fetchOpts = { cache: "no-store" as const };

    const [weatherRes, airRes] = await Promise.all([
        fetch(weatherUrl, fetchOpts),
        fetch(airQualityUrl, fetchOpts),
    ]);

    if (!weatherRes.ok) {
        throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    if (!airRes.ok) {
        throw new Error(`Air Quality API error: ${airRes.status}`);
    }

    const weather = (await weatherRes.json()) as OpenMeteoForecastResponse;
    const airQuality = (await airRes.json()) as OpenMeteoAirQualityResponse;

    return transformWeatherResponse(weather, airQuality);
}

const getWeatherInner = cache(
    async (
        lat: number,
        lon: number,
        revalidateSeconds: number,
    ): Promise<DailyWeather[]> => {
        const key = coordsKey(lat, lon);
        const now = Date.now();

        const stored = memoryByCoords.get(key);
        if (stored && stored.expiresAt > now) {
            return stored.data;
        }

        const pending = inFlightByCoords.get(key);
        if (pending) {
            return pending;
        }

        const promise = (async () => {
            const data = await fetchOpenMeteo(lat, lon);
            memoryByCoords.set(key, {
                data,
                expiresAt: Date.now() + revalidateSeconds * 1000,
            });
            return data;
        })().finally(() => {
            inFlightByCoords.delete(key);
        });

        inFlightByCoords.set(key, promise);
        return promise;
    },
);

export async function getWeather({
    lat,
    lon,
    revalidateSeconds,
}: GetWeatherParams): Promise<DailyWeather[]> {
    return getWeatherInner(lat, lon, revalidateSeconds);
}
