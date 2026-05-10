import { formatHourTime, getHourNum } from "@/shared/utils/dateFormatters";
import { getWeatherCodeLabel } from "@/shared/utils/weatherCode";
import { MoonPhaseIcon, ThermometerIcon, WeatherCodeIcon } from "@/shared/ui/icons";
import type { DailyWeather, HourlyWeather } from "@/widgets/meteo-page/types";
import { formatSignedRoundedTemp } from "@/widgets/meteo-page/ui/utils/active-day-hourly";
import { getDayPresentation } from "@/widgets/meteo-page/ui/utils/day-presentation";
import { getMoonSummary } from "@/widgets/meteo-page/ui/utils/moon-summary";

interface DesktopSidebarProps {
    cityName: string;
    day: DailyWeather;
    showCurrentSummary: boolean;
    currentHour: HourlyWeather;
    isNightHour: (hour: number) => boolean;
}

export function DesktopSidebar({
    cityName,
    day,
    showCurrentSummary,
    currentHour,
    isNightHour,
}: DesktopSidebarProps) {
    const { dayName, dayNum, monthName } = getDayPresentation(day.date);
    const sunrise = formatHourTime(day.sunrise);
    const sunset = formatHourTime(day.sunset);
    const { moonValue, moonIllumination, moonPhaseLabel } = getMoonSummary(day.date);
    const currentHourNum = getHourNum(currentHour.time);
    const isCurrentNight = isNightHour(currentHourNum);
    const weatherConditionLabel = `${getWeatherCodeLabel(day.weatherCode)}${isCurrentNight ? " (nuit)" : ""}`;
    const tempLabel = formatSignedRoundedTemp(currentHour.temperature);

    return (
        <aside className="hidden w-[200px] min-h-[400px] shrink-0 flex-col self-stretch lg:flex">
            {showCurrentSummary ? (
                <div className="flex flex-col items-center gap-2 pt-2 pb-4 text-center text-slate-900">
                    <p className="text-sm font-semibold tabular-nums text-slate-700">
                        {cityName}: {formatHourTime(currentHour.time)}
                    </p>
                    <div className="flex w-full items-center justify-center">
                        <span
                            role="img"
                            className="inline-flex shrink-0"
                            aria-label={`Thermometre, ${tempLabel} Celsius`}
                            title={`Thermometre — ${tempLabel}C`}
                        >
                            <ThermometerIcon
                                temperature={Math.round(currentHour.temperature)}
                                className="h-24 w-12"
                            />
                        </span>
                        <span
                            role="img"
                            className="inline-flex"
                            aria-label={`Meteo : ${weatherConditionLabel}`}
                            title={weatherConditionLabel}
                        >
                            <WeatherCodeIcon
                                code={day.weatherCode}
                                isNight={isCurrentNight}
                                className="h-36 w-36"
                            />
                        </span>
                    </div>
                    <p className="text-3xl font-bold tabular-nums text-slate-900">
                        {formatSignedRoundedTemp(currentHour.temperature)}C
                    </p>
                </div>
            ) : (
                <div className="leading-tight gap-2.5 py-12 flex flex-col items-center text-slate-900">
                    <p className="text-base font-medium uppercase">{dayName}</p>
                    <p className="text-6xl font-medium tabular-nums">{dayNum}</p>
                    <p className="text-base font-medium uppercase">{monthName}</p>
                </div>
            )}
            <div className="mt-auto">
                <div className="mt-3 border-t border-slate-100 pt-3 text-sm">
                    <p className="grid grid-cols-2 text-slate-600">
                        Lever
                        <span className="ml-1 text-right font-medium tabular-nums text-slate-900">{sunrise}</span>
                    </p>
                    <p className="mt-1 grid grid-cols-2 text-slate-600">
                        Coucher
                        <span className="ml-1 text-right font-medium tabular-nums text-slate-900">{sunset}</span>
                    </p>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <span
                        role="img"
                        className="inline-flex shrink-0"
                        aria-label={`Phase lunaire : ${moonPhaseLabel}, ${moonIllumination} pour cent illuminee`}
                        title={`${moonPhaseLabel} — ${moonIllumination}% illuminee`}
                    >
                        <MoonPhaseIcon value={moonValue} className="h-9 w-9" />
                    </span>
                    <div className="leading-tight">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">
                            Phase lunaire
                        </p>
                        <p className="text-sm font-semibold text-slate-900">{moonPhaseLabel}</p>
                        <p className="text-[10px] tabular-nums text-slate-500">{moonIllumination}% illuminee</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
