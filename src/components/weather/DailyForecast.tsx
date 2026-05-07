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
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Prevision sur {items.length} jours
                </h2>
            </div>

            <div className="-mx-4 sm:-mx-6">
                <ul role="list" className="flex px-4 sm:px-6">
                    {items.map((day, index) => {
                        const [dayNum, ...monthParts] = day.date.split(" ");
                        const monthName = monthParts.join(" ");
                        const isActive = day.isoDate === activeIsoDate;

                        return (
                            <li
                                key={`${day.isoDate}-${index}`}
                                className={`flex min-w-[110px] flex-1 flex-col items-center gap-3 rounded-t-xl border bg-white p-1 py-3 text-center transition ${isActive
                                    ? "relative z-20 -mt-1.5 after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-10 after:bg-white after:z-10 border-slate-200 border-b-white bg-white pt-4 shadow-[0_0_7px_0_rgba(0,0,0,.27)]"
                                    : "border-slate-100"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => onDaySelect(day.isoDate)}
                                    className="flex w-full cursor-pointer flex-col items-center gap-3 relative z-20"
                                >
                                    <div className="flex flex-col items-center leading-tight">
                                        <span className={`text-base font-medium ${isActive ? "text-blue-700" : "text-slate-900"}`}>
                                            {day.dayName}
                                        </span>
                                        <time dateTime={day.isoDate} className="mt-1 flex flex-col items-center leading-none">
                                            <span className="text-2xl tabular-nums text-slate-900">
                                                {dayNum}
                                            </span>
                                            <span className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
                                                {monthName}
                                            </span>
                                        </time>
                                    </div>

                                    <WeatherConditionIcon
                                        condition={day.condition}
                                        className="h-16 w-16"
                                    />

                                    <div className="flex items-center gap-3 leading-none">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[11px] font-normal uppercase tracking-wide text-slate-500">
                                                min.
                                            </span>
                                            <span className="text-lg font-medium text-slate-900">
                                                {day.low > 0 ? "+" : ""}
                                                {day.low}°
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[11px] font-normal uppercase tracking-wide text-slate-500">
                                                max.
                                            </span>
                                            <span className="text-lg font-medium text-slate-900">
                                                {day.high > 0 ? "+" : ""}
                                                {day.high}°
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="relative z-10 rounded-xl border  border-slate-200 bg-white p-3 shadow-[0_0_7px_0_rgba(0,0,0,.27)]">
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
