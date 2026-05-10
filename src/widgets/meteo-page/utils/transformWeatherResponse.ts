import type {
    DailyWeather,
    OpenMeteoAirQualityResponse,
    OpenMeteoForecastResponse,
} from "../types";

export function transformWeatherResponse(
    weather: OpenMeteoForecastResponse,
    airQuality: OpenMeteoAirQualityResponse,
): DailyWeather[] {
    const days: Record<string, DailyWeather> = {};

    weather.daily.time.forEach((date, index) => {
        days[date] = {
            date,
            weatherCode: weather.daily.weather_code[index],
            maxTemperature: weather.daily.temperature_2m_max[index],
            minTemperature: weather.daily.temperature_2m_min[index],
            uvIndexMax: weather.daily.uv_index_max[index],
            sunrise: weather.daily.sunrise[index],
            sunset: weather.daily.sunset[index],
            hours: [],
        };
    });

    weather.hourly.time.forEach((time, index) => {
        const date = time.split("T")[0];
        const day = days[date];
        if (!day) return;

        day.hours.push({
            time,
            temperature: weather.hourly.temperature_2m[index],
            feelsLike: weather.hourly.apparent_temperature[index],
            humidity: weather.hourly.relative_humidity_2m[index],
            pressure: weather.hourly.surface_pressure[index],
            uvIndex: weather.hourly.uv_index[index],
            precipitationProbability:
                weather.hourly.precipitation_probability[index],
            windSpeed: weather.hourly.wind_speed_10m[index],
            windDirection: weather.hourly.wind_direction_10m[index],
            aqi: airQuality.hourly.us_aqi[index],
        });
    });

    return Object.values(days);
}
