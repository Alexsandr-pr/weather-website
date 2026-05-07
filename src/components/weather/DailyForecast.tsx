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

            {/* MOBILE / TABLET: horizontal scroll cards */}
            <div className="-mx-3 sm:-mx-6 lg:hidden">
                <ul
                    role="list"
                    className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-1 sm:gap-2.5 sm:px-6"
                >
                    {items.map((day, index) => {
                        const [dayNum, ...monthParts] = day.date.split(" ");
                        const monthName = monthParts.join(" ");
                        const isActive = day.isoDate === activeIsoDate;

                        return (
                            <li
                                key={`${day.isoDate}-${index}`}
                                className={`min-w-[88px] shrink-0 rounded-2xl transition sm:min-w-[100px] ${isActive
                                    ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-md"
                                    : "border border-slate-100 bg-white text-slate-900"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => onDaySelect(day.isoDate)}
                                    className="flex w-full cursor-pointer flex-col items-center gap-2 px-2 py-3 sm:gap-2.5 sm:py-3.5"
                                >
                                    <div className="flex flex-col items-center leading-tight">
                                        <span
                                            className={`text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${isActive ? "text-white/90" : "text-slate-500"
                                                }`}
                                        >
                                            {day.dayName}
                                        </span>
                                        <time
                                            dateTime={day.isoDate}
                                            className="mt-0.5 flex flex-col items-center leading-none"
                                        >
                                            <span
                                                className={`text-xl tabular-nums sm:text-2xl ${isActive ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {dayNum}
                                            </span>
                                            <span
                                                className={`mt-0.5 text-[10px] uppercase tracking-wide sm:text-[11px] ${isActive ? "text-white/80" : "text-slate-500"
                                                    }`}
                                            >
                                                {monthName}
                                            </span>
                                        </time>
                                    </div>

                                    <WeatherConditionIcon
                                        condition={day.condition}
                                        className="h-10 w-10 sm:h-12 sm:w-12"
                                    />

                                    <div className="flex items-center gap-2 leading-none">
                                        <span
                                            className={`text-xs font-medium sm:text-sm ${isActive ? "text-white/85" : "text-slate-500"
                                                }`}
                                        >
                                            {day.low > 0 ? "+" : ""}
                                            <span className="tabular-nums">{day.low}</span>°
                                        </span>
                                        <span
                                            className={`text-sm font-bold sm:text-base ${isActive ? "text-white" : "text-slate-900"
                                                }`}
                                        >
                                            {day.high > 0 ? "+" : ""}
                                            <span className="tabular-nums">{day.high}</span>°
                                        </span>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* DESKTOP: row of attached tabs */}
            <div className="hidden lg:block">
                <ul role="list" className="flex">
                    {items.map((day, index) => {
                        const [dayNum, ...monthParts] = day.date.split(" ");
                        const monthName = monthParts.join(" ");
                        const isActive = day.isoDate === activeIsoDate;

                        return (
                            <li
                                key={`${day.isoDate}-${index}`}
                                className={`flex min-w-[96px] flex-1 flex-col items-center gap-3 rounded-t-xl border bg-white py-3 text-center transition xl:min-w-[110px] ${isActive
                                    ? "relative z-20 -mt-1.5 border-slate-200 border-b-white bg-white pt-4 shadow-[0_0_7px_0_rgba(0,0,0,.27)] after:absolute after:-bottom-3 after:left-0 after:z-10 after:h-10 after:w-full after:bg-white after:content-['']"
                                    : "border-slate-100"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => onDaySelect(day.isoDate)}
                                    className="relative z-20 flex w-full cursor-pointer flex-col items-center gap-1.5 xl:gap-3"
                                >
                                    <div className="flex flex-col items-center leading-tight">
                                        <span
                                            className={`text-sm font-medium xl:text-base ${isActive ? "text-blue-700" : "text-slate-900"
                                                }`}
                                        >
                                            {day.dayName}
                                        </span>
                                        <time
                                            dateTime={day.isoDate}
                                            className="mt-1 flex flex-col items-center leading-none"
                                        >
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
                                        className="h-10 w-10 xl:h-16 xl:w-16"
                                    />

                                    <div className="flex items-center gap-2 leading-none xl:gap-3">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] font-normal uppercase tracking-wide text-slate-500 xl:text-[11px]">
                                                min.
                                            </span>
                                            <span className="text-sm font-medium text-slate-900 xl:text-lg">
                                                {day.low > 0 ? "+" : ""}
                                                <span className="tabular-nums">{day.low}</span>°
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] font-normal uppercase tracking-wide text-slate-500 xl:text-[11px]">
                                                max.
                                            </span>
                                            <span className="text-sm font-medium text-slate-900 xl:text-lg">
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

            <div className="relative z-10 mt-3 rounded-2xl bg-transparent sm:mt-4 lg:mt-0 lg:rounded-2xl lg:rounded-t-none lg:border lg:border-slate-200 lg:border-t-0 lg:bg-white lg:p-3 lg:shadow-[0_0_7px_0_rgba(0,0,0,.27)]">
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
