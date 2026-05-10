export interface OpenMeteoAirQualityResponse {
    hourly: {
        time: string[];
        us_aqi: number[];
    };
}
