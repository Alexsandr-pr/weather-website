import type { DailyWeather } from "@/widgets/meteo-page/types";
import { ActiveDayHourlyForecast } from "@/widgets/meteo-page/ui/ActiveDayHourlyForecast";
import { DesktopForecastDayCard } from "@/widgets/meteo-page/ui/components/DesktopForecastDayCard";
import { MobileForecastDayCard } from "@/widgets/meteo-page/ui/components/MobileForecastDayCard";
import { buildForecastDayView } from "@/widgets/meteo-page/ui/utils/forecast-day";

interface DailyForecastProps {
    cityName: string;
    meteoBasePath: string;
    items: DailyWeather[];
    activeDay: DailyWeather;
    isTodayRoute: boolean;
}

export function DailyForecast({
    cityName,
    meteoBasePath,
    items,
    activeDay,
    isTodayRoute,
}: DailyForecastProps) {
    const activeDate = activeDay.date;
    const forecastDays = items.map((day, index) =>
        buildForecastDayView(day, index, meteoBasePath, activeDate),
    );

    return (
        <section>
            <div className="mb-3 flex items-center justify-between sm:mb-4">
                <h2 className="text-sm font-semibold text-slate-900 sm:text-base lg:text-lg">
                    Prevision sur {items.length} jours
                </h2>
            </div>

            {/* MOBILE / TABLET: horizontal scroll cards */}
            <div className="-mx-3 sm:-mx-6 lg:hidden">
                <ul
                    role="list"
                    className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-1 sm:gap-2.5 sm:px-6"
                >
                    {forecastDays.map((item) => (
                        <MobileForecastDayCard key={item.key} item={item} />
                    ))}
                </ul>
            </div>

            {/* DESKTOP: row of attached tabs */}
            <div className="hidden lg:block">
                <ul role="list" className="flex">
                    {forecastDays.map((item) => (
                        <DesktopForecastDayCard key={item.key} item={item} />
                    ))}
                </ul>
            </div>

            <ActiveDayHourlyForecast
                cityName={cityName}
                day={activeDay}
                isTodayRoute={isTodayRoute}
            />
        </section>
    );
}
