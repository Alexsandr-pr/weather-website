import { formatHourTime } from "@/shared/utils/dateFormatters";
import { WeatherCodeIcon } from "@/shared/ui/icons";
import type { DailyWeather, HourlyWeather } from "@/widgets/meteo-page/types";
import { formatSignedRoundedTemp } from "@/widgets/meteo-page/ui/utils/active-day-hourly";
import { getDayPresentation } from "@/widgets/meteo-page/ui/utils/day-presentation";

interface MobileHeroCardProps {
    cityName: string;
    day: DailyWeather;
    isToday: boolean;
    isNowActive: boolean;
    activeHour: HourlyWeather;
    isNight: boolean;
}

export function MobileHeroCard({
    cityName,
    day,
    isToday,
    isNowActive,
    activeHour,
    isNight,
}: MobileHeroCardProps) {
    const { dayName, dayNum, monthName } = getDayPresentation(day.date);

    return (
        <div
            className={`relative overflow-hidden rounded-2xl px-4 py-4 text-white shadow-lg ${isNight
                ? "bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900"
                : "bg-gradient-to-br from-sky-500 via-blue-500 to-blue-600"
                }`}
        >
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-4 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                        {isToday ? cityName : `${dayName} ${dayNum} ${monthName}`}
                    </p>
                    <p className="mt-0.5 text-xs text-white/70">
                        {isToday && isNowActive ? "Maintenant" : formatHourTime(activeHour.time)}
                    </p>
                    <p className="mt-2 text-5xl font-bold tabular-nums leading-none">
                        {formatSignedRoundedTemp(activeHour.temperature)}
                    </p>
                </div>
                <WeatherCodeIcon
                    code={day.weatherCode}
                    isNight={isNight}
                    className="h-24 w-24 shrink-0 drop-shadow-lg"
                />
            </div>
        </div>
    );
}
