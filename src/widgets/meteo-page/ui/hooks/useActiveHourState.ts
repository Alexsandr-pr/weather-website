"use client";

import { useEffect, useState } from "react";
import { formatHourTime, getHourNum } from "@/shared/utils/dateFormatters";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import { useCurrentIsoHour } from "./useCurrentIsoHour";

export function useActiveHourState(day: DailyWeather) {
    const hours = day.hours;
    const sunrise = formatHourTime(day.sunrise);
    const sunset = formatHourTime(day.sunset);
    const sunriseHour = parseInt(sunrise.split(":")[0] ?? "6", 10);
    const sunsetHour = parseInt(sunset.split(":")[0] ?? "20", 10);
    const isNightHour = (hour: number) => hour < sunriseHour || hour >= sunsetHour;

    const nowIso = useCurrentIsoHour();
    const nowIndex = hours.findIndex((h) => h.time === nowIso);
    const defaultHourIndex = nowIndex >= 0 ? nowIndex : Math.min(12, hours.length - 1);

    const [activeHourIndex, setActiveHourIndex] = useState<number>(defaultHourIndex);

    useEffect(() => {
        setActiveHourIndex(defaultHourIndex);
    }, [defaultHourIndex, hours]);

    const activeHour = hours[activeHourIndex] ?? hours[0];
    const activeHourNum = getHourNum(activeHour.time);
    const isNowActive = nowIndex === activeHourIndex;
    const isToday = nowIndex >= 0;

    return {
        hours,
        nowIndex,
        activeHourIndex,
        setActiveHourIndex,
        activeHour,
        activeHourNum,
        isNowActive,
        isToday,
        isNightHour,
    };
}
