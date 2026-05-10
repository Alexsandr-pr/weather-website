import type { DailyWeather } from "@/widgets/meteo-page/types";
import { DailyForecast } from "./DailyForecast";

interface MeteoCityViewProps {
    weatherData: DailyWeather[];
    cityName: string;
    meteoBasePath: string;
    activeDayIndex: number;
    isTodayRoute: boolean;
}

const FORECAST_DAYS = 7;

export function MeteoCityView({
    weatherData,
    cityName,
    meteoBasePath,
    activeDayIndex,
    isTodayRoute,
}: MeteoCityViewProps) {
    
    const visibleDaily = weatherData.slice(0, FORECAST_DAYS);

    const safeIndex = Math.min(
        Math.max(activeDayIndex, 0),
        visibleDaily.length - 1,
    );
    const activeDay = visibleDaily[safeIndex];

    return (
        <DailyForecast
            cityName={cityName}
            meteoBasePath={meteoBasePath}
            items={visibleDaily}
            activeDay={activeDay}
            isTodayRoute={isTodayRoute}
        />
    );
}
