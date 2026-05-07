import type { DailyForecastItem, HourlyForecastItem, MoonPhase } from "@/data/mockWeather";
import { WeatherConditionIcon } from "@/components/icons/WeatherIcons";
import { ActiveDayHourlyForecast } from "@/components/weather/ActiveDayHourlyForecast";

interface DailyForecastProps {
    cityName: string;
    items: DailyForecastItem[];
    activeIsoDate: string;
    onDaySelect: (isoDate: string) => void;
    selectedHourly: HourlyForecastItem[];
    sunrise: string;
    sunset: string;
    moonPhase: MoonPhase;
    moonPhaseLabel: string;
    uvIndex: number;
    baseFeelsLike: number;
    basePressure: number;
    baseHumidity: number;
    baseAqi: number;
}

export function DailyForecast({
    cityName,
    items,
    activeIsoDate,
    onDaySelect,
    selectedHourly,
    sunrise,
    sunset,
    moonPhase,
    moonPhaseLabel,
    uvIndex,
    baseFeelsLike,
    basePressure,
    baseHumidity,
    baseAqi,
}: DailyForecastProps) {
    const activeDay = items.find((day) => day.isoDate === activeIsoDate) ?? items[0];

    return (
        <section>
            <div className="mb-3 flex items-center justify-between sm:mb-4">
                <h2 className="text-sm font-semibold text-slate-900 sm:text-base lg:text-lg">
                    Prevision sur {items.length} jours
                </h2>
            </div>

            <div className="-mx-3 sm:-mx-6 lg:mx-0">
                <ul
                    role="list"
                    className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 pb-1 sm:gap-2 sm:px-6 lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
                >
                    {items.map((day, index) => {
                        const [dayNum, ...monthParts] = day.date.split(" ");
                        const monthName = monthParts.join(" ");
                        const isActive = day.isoDate === activeIsoDate;

                        return (
                            <li
                                key={`${day.isoDate}-${index}`}
                                className={`flex min-w-[84px] shrink-0 flex-col items-center gap-2 rounded-xl border bg-white p-2 text-center transition sm:min-w-[96px] sm:gap-3 sm:p-3 lg:min-w-[96px] lg:flex-1 lg:rounded-t-xl lg:rounded-b-none lg:p-0 lg:py-3 xl:min-w-[110px] ${isActive
                                    ? "relative z-20 border-blue-300 bg-white shadow-[0_0_7px_0_rgba(0,0,0,.27)] lg:-mt-1.5 lg:border-slate-200 lg:border-b-white lg:pt-4 lg:after:content-[''] lg:after:absolute lg:after:-bottom-3 lg:after:left-0 lg:after:w-full lg:after:h-10 lg:after:bg-white lg:after:z-10"
                                    : "border-slate-100"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => onDaySelect(day.isoDate)}
                                    className="relative z-20 flex w-full cursor-pointer flex-col items-center gap-1.5 sm:gap-2 lg:gap-3"
                                >
                                    <div className="flex flex-col items-center leading-tight">
                                        <span className={`text-xs font-medium sm:text-sm lg:text-base ${isActive ? "text-blue-700" : "text-slate-900"}`}>
                                            {day.dayName}
                                        </span>
                                        <time dateTime={day.isoDate} className="mt-0.5 flex flex-col items-center leading-none sm:mt-1">
                                            <span className="text-xl tabular-nums text-slate-900 sm:text-2xl">
                                                {dayNum}
                                            </span>
                                            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500 sm:text-[11px]">
                                                {monthName}
                                            </span>
                                        </time>
                                    </div>

                                    <WeatherConditionIcon
                                        condition={day.condition}
                                        className="h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
                                    />

                                    <div className="flex items-center gap-2 leading-none sm:gap-3 lg:gap-2 xl:gap-3">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] font-normal uppercase tracking-wide text-slate-500 sm:text-[10px] lg:text-[11px]">
                                                min.
                                            </span>
                                            <span className="text-xs font-medium text-slate-900 sm:text-sm lg:text-base xl:text-lg">
                                                {day.low > 0 ? "+" : ""}
                                                <span className="tabular-nums">{day.low}</span>°
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] font-normal uppercase tracking-wide text-slate-500 sm:text-[10px] lg:text-[11px]">
                                                max.
                                            </span>
                                            <span className="text-xs font-medium text-slate-900 sm:text-sm lg:text-base xl:text-lg">
                                                {day.high > 0 ? "+" : ""}
                                                <span className="tabular-nums">{day.high}</span>°
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="relative z-10 mt-3 rounded-xl border border-slate-100 bg-white p-3 shadow-[0_0_7px_0_rgba(0,0,0,.27)] sm:mt-4 sm:p-4 lg:mt-0 lg:rounded-t-none lg:rounded-b-xl lg:border-t-0">
                <ActiveDayHourlyForecast
                    cityName={cityName}
                    dayName={activeDay.dayName}
                    dayDate={activeDay.date}
                    sunrise={sunrise}
                    sunset={sunset}
                    moonPhase={moonPhase}
                    moonPhaseLabel={moonPhaseLabel}
                    uvIndex={uvIndex}
                    baseFeelsLike={baseFeelsLike}
                    basePressure={basePressure}
                    baseHumidity={baseHumidity}
                    baseAqi={baseAqi}
                    selectedHourly={selectedHourly}
                />
            </div>
        </section>
    );
}
