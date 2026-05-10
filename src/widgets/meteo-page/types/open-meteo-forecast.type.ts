export interface OpenMeteoForecastResponse {
    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        uv_index_max: number[];
        sunrise: string[];
        sunset: string[];
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        apparent_temperature: number[];
        relative_humidity_2m: number[];
        surface_pressure: number[];
        uv_index: number[];
        precipitation_probability: number[];
        wind_speed_10m: number[];
        wind_direction_10m: number[];
    };
}
