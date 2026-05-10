import { HourlyWeather } from "./hourly-weather.type";

export type DailyWeather = {
    date: string;
    weatherCode: number;
    maxTemperature: number;
    minTemperature: number;
    uvIndexMax: number;
    sunrise: string;
    sunset: string;
    hours: HourlyWeather[];
};
