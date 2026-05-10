"use client";

import type { DailyWeather } from "@/widgets/meteo-page/types";
import { DesktopHourlyTable } from "@/widgets/meteo-page/ui/components/active-day/DesktopHourlyTable";
import { DesktopSidebar } from "@/widgets/meteo-page/ui/components/active-day/DesktopSidebar";
import { MobileHeroCard } from "@/widgets/meteo-page/ui/components/active-day/MobileHeroCard";
import { MobileHourScroller } from "@/widgets/meteo-page/ui/components/active-day/MobileHourScroller";
import { MobileMetricsGrid } from "@/widgets/meteo-page/ui/components/active-day/MobileMetricsGrid";
import { MobileSunMoonRow } from "@/widgets/meteo-page/ui/components/active-day/MobileSunMoonRow";
import { useActiveHourState } from "@/widgets/meteo-page/ui/hooks/useActiveHourState";

interface ActiveDayHourlyForecastProps {
    cityName: string;
    day: DailyWeather;
    isTodayRoute: boolean;
}

export function ActiveDayHourlyForecast({
    cityName,
    day,
    isTodayRoute,
}: ActiveDayHourlyForecastProps) {
    const {
        hours,
        nowIndex,
        activeHourIndex,
        setActiveHourIndex,
        activeHour,
        activeHourNum,
        isNowActive,
        isToday,
        isNightHour,
    } = useActiveHourState(day);
    const sidebarHour = nowIndex >= 0 ? hours[nowIndex] : activeHour;

    return (
        <div className="relative z-10 mt-3 rounded-2xl bg-transparent sm:mt-4 lg:mt-0 lg:rounded-2xl  lg:border lg:border-slate-200 lg:border-t-0 lg:bg-white lg:p-3 lg:shadow-[0_0_7px_0_rgba(0,0,0,.27)]">
            <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
                {/* MOBILE / TABLET LAYOUT */}
                <div className="flex flex-col gap-4 lg:hidden">
                    <MobileHeroCard
                        cityName={cityName}
                        day={day}
                        isToday={isToday}
                        isNowActive={isNowActive}
                        activeHour={activeHour}
                        isNight={isNightHour(activeHourNum)}
                    />

                    <MobileHourScroller
                        hours={hours}
                        weatherCode={day.weatherCode}
                        activeIndex={activeHourIndex}
                        nowIndex={nowIndex}
                        onSelect={setActiveHourIndex}
                        isNightHour={isNightHour}
                    />

                    <MobileMetricsGrid hour={activeHour} />

                    <MobileSunMoonRow day={day} />
                </div>

                {/* DESKTOP LAYOUT */}
                <DesktopSidebar
                    cityName={cityName}
                    day={day}
                    showCurrentSummary={isTodayRoute}
                    currentHour={sidebarHour}
                    isNightHour={isNightHour}
                />

                <DesktopHourlyTable
                    day={day}
                    nowIndex={nowIndex}
                    isNightHour={isNightHour}
                />
            </div>
        </div>
    );
}
