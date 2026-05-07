import type { HourlyForecastItem, MoonPhase } from "@/data/mockWeather";
import { WeatherConditionIcon } from "@/components/icons/WeatherIcons";
import { ThermometerIcon } from "@/components/icons/ThermometerIcon";
import { MoonPhaseIcon } from "@/components/icons/MoonPhaseIcon";

interface ActiveDayHourlyForecastProps {
    cityName: string;
    dayName: string;
    dayDate: string;
    sunrise: string;
    sunset: string;
    moonPhase: MoonPhase;
    moonPhaseLabel: string;
    uvIndex: number;
    baseFeelsLike: number;
    basePressure: number;
    baseHumidity: number;
    baseAqi: number;
    selectedHourly: HourlyForecastItem[];
}

export function ActiveDayHourlyForecast({
    cityName,
    dayName,
    dayDate,
    sunrise,
    sunset,
    moonPhase,
    moonPhaseLabel,
    uvIndex,
    baseFeelsLike,
    basePressure,
    baseHumidity,
    baseAqi,
    selectedHourly,
}: ActiveDayHourlyForecastProps) {
    const [dayNum, ...monthParts] = dayDate.split(" ");
    const monthName = monthParts.join(" ");

    const sunriseHour = parseInt(sunrise.split(":")[0] ?? "6", 10);
    const sunsetHour = parseInt(sunset.split(":")[0] ?? "20", 10);
    const isNightHour = (hour: number) => hour < sunriseHour || hour >= sunsetHour;

    const getPartOfDay = (hour: number): string => {
        if (hour < 6) return "Nuit";
        if (hour < 12) return "Matin";
        if (hour < 18) return "Jour";
        return "Soir";
    };

    const partOfDayGroups: { label: string; count: number }[] = [];
    selectedHourly.forEach((h) => {
        const label = getPartOfDay(h.hour);
        const last = partOfDayGroups[partOfDayGroups.length - 1];
        if (last && last.label === label) {
            last.count += 1;
        } else {
            partOfDayGroups.push({ label, count: 1 });
        }
    });

    const groupStartIndices = new Set<number>();
    {
        let acc = 0;
        partOfDayGroups.forEach((g, gi) => {
            if (gi > 0) groupStartIndices.add(acc);
            acc += g.count;
        });
    }
    const dividerCls = (idx: number) =>
        groupStartIndices.has(idx) ? "border-l border-slate-200" : "";

    const nowIndex = selectedHourly.findIndex((h) => h.isNow);
    const nowHour = nowIndex >= 0 ? selectedHourly[nowIndex] : null;
    const nowTimeCellCls = (idx: number) =>
        idx === nowIndex ? "!bg-blue-200 text-blue-950" : "";
    const nowDataCellCls = (idx: number) =>
        idx === nowIndex ? "!bg-blue-100 text-blue-900" : "";
    const hourColCls = "w-[56px] min-w-[56px] max-w-[56px] md:w-[64px] md:min-w-[64px] md:max-w-[64px]";

    return (
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
            <aside className="flex w-full shrink-0 flex-col gap-3 lg:min-h-[400px] lg:w-[200px] lg:gap-0 lg:self-stretch">
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 lg:flex-col lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 lg:pt-2 lg:pb-4 lg:text-center">
                    {nowHour ? (
                        <>
                            <div className="flex shrink-0 items-center lg:w-full lg:justify-center">
                                <ThermometerIcon
                                    temperature={nowHour.temperature}
                                    className="h-16 w-8 shrink-0 lg:h-24 lg:w-12"
                                />
                                <WeatherConditionIcon
                                    condition={nowHour.condition}
                                    isNight={isNightHour(nowHour.hour)}
                                    className="h-20 w-20 lg:h-36 lg:w-36"
                                />
                            </div>
                            <div className="min-w-0 flex-1 lg:flex-none">
                                <p className="text-xs font-semibold tabular-nums text-slate-700 lg:text-sm">
                                    {cityName}: {nowHour.time}
                                </p>
                                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900 lg:mt-0 lg:text-3xl">
                                    {nowHour.temperature > 0 ? "+" : ""}
                                    {nowHour.temperature}°C
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-1 flex-col items-start leading-tight lg:flex-none lg:items-center lg:gap-2.5 lg:py-12">
                            <p className="text-sm font-medium uppercase text-slate-900 lg:text-base">
                                {dayName}
                            </p>
                            <p className="text-4xl font-medium tabular-nums text-slate-900 lg:text-6xl">
                                {dayNum}
                            </p>
                            <p className="text-xs font-medium uppercase text-slate-500 lg:text-base lg:text-slate-900">
                                {monthName}
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3 lg:mt-auto lg:grid-cols-1 lg:gap-0">
                    <div className="rounded-xl border border-slate-100 bg-white p-3 text-xs lg:rounded-none lg:border-0 lg:border-t lg:border-slate-100 lg:bg-transparent lg:p-0 lg:pt-3 lg:text-sm">
                        <p className="grid grid-cols-2 text-slate-600">
                            Lever
                            <span className="text-right font-medium tabular-nums text-slate-900">{sunrise}</span>
                        </p>
                        <p className="mt-1 grid grid-cols-2 text-slate-600">
                            Coucher
                            <span className="text-right font-medium tabular-nums text-slate-900">{sunset}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 lg:mt-3 lg:gap-3">
                        <MoonPhaseIcon phase={moonPhase} className="h-8 w-8 shrink-0 lg:h-9 lg:w-9" />
                        <div className="min-w-0 leading-tight">
                            <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                Phase lunaire
                            </p>
                            <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
                                {moonPhaseLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="-mx-3 overflow-x-auto sm:-mx-4 lg:mx-0 lg:flex-1">
                <table className="min-w-full border-separate border-spacing-0 text-center text-[11px] md:text-xs">
                    <thead>
                        <tr>
                            <th className="sticky left-0 z-10 bg-white px-3 py-2" />
                            {partOfDayGroups.map((group, idx) => (
                                <th
                                    key={`part-${idx}`}
                                    colSpan={group.count}
                                    className={`whitespace-nowrap px-3 h-9 py-1 text-center text-sm font-semibold text-slate-700 ${idx > 0 ? "border-l border-slate-200" : ""}`}
                                >
                                    {group.label}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className="sticky left-0 z-10 bg-white px-3 py-2 text-center font-medium text-slate-600" />
                            {selectedHourly.map((hour, idx) => (
                                <th
                                    key={`time-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap bg-slate-50 px-3 py-1 font-medium text-slate-500 ${hourColCls} ${dividerCls(idx)} ${nowTimeCellCls(idx)}`}
                                >
                                    {hour.time}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className="sticky left-0 z-10 bg-white px-3 py-2" />
                            {selectedHourly.map((hour, idx) => (
                                <th
                                    key={`icon-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap px-3 py-1 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    <WeatherConditionIcon
                                        condition={hour.condition}
                                        isNight={isNightHour(hour.hour)}
                                        className="mx-auto h-7 w-7"
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TdLeft>
                                Temperature, <br className="block lg:hidden"/>°C
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`temp-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap text-sm md:text-lg h-8 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {hour.temperature > 0 ? "+" : ""}
                                    {hour.temperature}°
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Ressenti
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`feel-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap h-8 py-1.5 font-medium text-slate-500 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {hour.temperature >= 0 ? "+" : ""}
                                    {hour.temperature + (baseFeelsLike - selectedHourly[0].temperature)}°
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Pression, mm
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`pressure-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap bg-slate-50 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {Math.round(basePressure * 0.750062)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Humidite, %
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`humidity-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {Math.max(0, Math.min(100, baseHumidity + Math.round((hour.precipitation - 20) / 4)))}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                UV Index
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`uv-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap bg-slate-50 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {Math.max(0, Math.round(uvIndex - Math.abs(12 - hour.hour) / 3))}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Vent, m/s
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`wind-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap h-8 py-0.5 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    <div className="flex items-center justify-center gap-1 leading-tight">
                                        <span className="grid min-w-5 min-h-5 w-5 place-items-center rounded-full bg-white shadow-sm">
                                            <svg
                                                viewBox="0 0 16 16"
                                                className="h-3.5 w-3.5 text-slate-600"
                                                style={{ transform: `rotate(${hour.windDirectionDeg}deg)` }}
                                                aria-hidden="true"
                                            >
                                                <path d="M2 8 H12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                <path d="M9 5 L12 8 L9 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span>{(hour.windSpeed / 3.6).toFixed(1)}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Qualite de l&apos;air <br className="block lg:hidden"/>(AQI)
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`aqi-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap bg-slate-50  px-2 md:px-3 py md:py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {Math.max(1, Math.round(baseAqi + (hour.precipitation - 20) / 10))}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Probabilite de <br className="block lg:hidden"/>precipitations, %
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`precip-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap h-8 py-0.5 md:py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {hour.precipitation == 0 ? "-" : hour.precipitation}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}


const TdLeft = ({ children }: { children: React.ReactNode }) => {
    return (
        <td className="sticky left-0 whitespace-nowrap text-right z-10 bg-white px-2 md:px-2 py-0 md:py-2 text-center font-semibold text-slate-500">
            {children}
        </td>
    );
};
