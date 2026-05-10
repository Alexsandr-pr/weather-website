import { cache } from "react";
import type {
    DailyWeather,
    OpenMeteoAirQualityResponse,
    OpenMeteoForecastResponse,
} from "../types";
import { GetWeatherParams } from "../types/get-weather-params.type";
import { transformWeatherResponse } from "../utils/transformWeatherResponse";

async function getWeatherImpl({
    lat,
    lon,
    revalidateSeconds,
}: GetWeatherParams): Promise<DailyWeather[]> {
    const weatherParams = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),

        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'uv_index_max',
            'sunrise',
            'sunset'
        ].join(','),

        hourly: [
            // temperature
            'temperature_2m',

            // feels like
            'apparent_temperature',

            // humidity
            'relative_humidity_2m',

            // pressure
            'surface_pressure',

            // uv
            'uv_index',

            // precipitation %
            'precipitation_probability',

            // wind
            'wind_speed_10m',
            'wind_direction_10m',
        ].join(','),

        timezone: 'Africa/Algiers',
        forecast_days: '10',
    });

    const airQualityParams = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),

        hourly: [
            'us_aqi',
        ].join(','),

        timezone: 'Africa/Algiers',
    });

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${weatherParams.toString()}`;

    const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?${airQualityParams.toString()}`;

    const fetchNext = { next: { revalidate: revalidateSeconds } } as const;

    const [weatherRes, airRes] = await Promise.all([
        fetch(weatherUrl, fetchNext),
        fetch(airQualityUrl, fetchNext),
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

export const getWeather = cache(getWeatherImpl);
