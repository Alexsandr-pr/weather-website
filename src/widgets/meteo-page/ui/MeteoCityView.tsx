"use client";

import { useState } from "react";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import { DailyForecast } from "./DailyForecast";

interface MeteoCityViewProps {
    weatherData: DailyWeather[];
    cityName: string;
}

const FORECAST_DAYS = 7;

export function MeteoCityView({ weatherData, cityName }: MeteoCityViewProps) {
    const visibleDaily = weatherData.slice(0, FORECAST_DAYS);
    const [activeIndex, setActiveIndex] = useState(0);
    const safeIndex = Math.min(activeIndex, visibleDaily.length - 1);
    const activeDay = visibleDaily[safeIndex];

    const handleDaySelect = (date: string) => {
        const idx = visibleDaily.findIndex((d) => d.date === date);
        if (idx >= 0) setActiveIndex(idx);
    };

    return (
        <DailyForecast
            cityName={cityName}
            items={visibleDaily}
            activeDay={activeDay}
            onDaySelect={handleDaySelect}
        />
    );
}
