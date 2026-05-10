import type { DailyWeather } from "@/widgets/meteo-page/types";
import {
    formatDayMonth,
    getFrenchDayName,
    getFrenchWeekdaySlug,
} from "@/shared/utils/dateFormatters";

export interface ForecastDayView {
    key: string;
    date: string;
    dayName: string;
    dayNum: string;
    monthName: string;
    href: string;
    isActive: boolean;
    weatherCode: number;
    high: number;
    low: number;
}

export function formatSignedTemperature(value: number): string {
    return `${value > 0 ? "+" : ""}${value}°`;
}

export function buildForecastDayView(
    day: DailyWeather,
    index: number,
    meteoBasePath: string,
    activeDate: string,
): ForecastDayView {
    const [dayNum, ...monthParts] = formatDayMonth(day.date).split(" ");
    const monthName = monthParts.join(" ");
    const href =
        index === 0
            ? meteoBasePath
            : `${meteoBasePath}/${getFrenchWeekdaySlug(day.date)}`;

    return {
        key: `${day.date}-${index}`,
        date: day.date,
        dayName: getFrenchDayName(day.date),
        dayNum,
        monthName,
        href,
        isActive: day.date === activeDate,
        weatherCode: day.weatherCode,
        high: Math.round(day.maxTemperature),
        low: Math.round(day.minTemperature),
    };
}
