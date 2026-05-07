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
    const hourColCls = "w-[64px] min-w-[64px] max-w-[64px]";

    return (
        <div className="w-full flex gap-6">
            <div className="flex w-[200px] min-h-[400px] shrink-0 flex-col rounded-xl self-stretch">
                {nowHour ? (
                    <div className="flex flex-col items-center gap-2 pt-2 pb-4 text-center text-slate-900">
                        <p className="text-sm font-semibold tabular-nums text-slate-700">
                            {cityName}: {nowHour.time}
                        </p>
                        <div className="flex w-full items-center justify-center">
                            <ThermometerIcon
                                temperature={nowHour.temperature}
                                className="h-24 w-12 shrink-0"
                            />
                            <WeatherConditionIcon
                                condition={nowHour.condition}
                                isNight={isNightHour(nowHour.hour)}
                                className="h-36 w-36"
                            />
                        </div>
                        <p className="text-3xl font-bold tabular-nums text-slate-900">
                            {nowHour.temperature > 0 ? "+" : ""}
                            {nowHour.temperature}°C
                        </p>
                    </div>
                ) : (
                    <div className="leading-tight gap-2.5 py-12 flex flex-col items-center text-slate-900">
                        <p className="text-base font-medium uppercase">{dayName}</p>
                        <p className=" text-6xl font-medium tabular-nums">
                            {dayNum}
                        </p>
                        <p className="text-base font-medium uppercase">
                            {monthName}
                        </p>
                    </div>
                )}
                <div className="mt-auto">
                    <div className="mt-3 border-t border-slate-100 pt-3 text-sm">
                        <p className="text-slate-600 grid grid-cols-2">
                            Lever
                            <span className="ml-1 font-medium text-slate-900 text-right tabular-nums">{sunrise}</span>
                        </p>
                        <p className="mt-1 text-slate-600 grid grid-cols-2">
                            Coucher
                            <span className="ml-1 font-medium text-slate-900 text-right tabular-nums">{sunset}</span>
                        </p>
                    </div>

                    <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                        <MoonPhaseIcon phase={moonPhase} className="h-9 w-9 shrink-0" />
                        <div className="leading-tight">
                            <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                Phase lunaire
                            </p>
                            <p className="text-sm font-semibold text-slate-900">
                                {moonPhaseLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-center text-xs">
                    <thead>
                        <tr>
                            <th className="sticky left-0 z-10 bg-white px-3 py-2" />
                            {partOfDayGroups.map((group, idx) => (
                                <th
                                    key={`part-${idx}`}
                                    colSpan={group.count}
                                    className={`whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700 ${idx > 0 ? "border-l border-slate-200" : ""}`}
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
                                    className={`whitespace-nowrap border-b border-slate-100 px-3 py-1 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
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
                                Temperature, degC
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`temp-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap border-b text-lg border-slate-100 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
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
                                    className={`whitespace-nowrap border-b border-slate-100 px-3 py-2 font-medium text-slate-500 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
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
                                    className={`whitespace-nowrap bg-slate-50 border-b border-slate-100 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
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
                                    className={`whitespace-nowrap border-b border-slate-100 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
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
                                    className={`whitespace-nowrap border-b border-slate-100 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
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
                                    className={`whitespace-nowrap bg-slate-50 border-b border-slate-100 px-2 py-1 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    <div className="flex items-center gap-1 leading-tight">
                                        <span className="grid h-5 w-5 place-items-center rounded-full bg-white shadow-sm">
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
                                Qualite de l&apos;air (AQI)
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`aqi-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap bg-slate-50 border-b border-slate-100 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {Math.max(1, Math.round(baseAqi + (hour.precipitation - 20) / 10))}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <TdLeft>
                                Probabilite de precipitations, %
                            </TdLeft>
                            {selectedHourly.map((hour, idx) => (
                                <td
                                    key={`precip-${hour.hour}-${idx}`}
                                    className={`whitespace-nowrap border-b border-slate-100 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                >
                                    {hour.precipitation}
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
        <td className="sticky left-0 whitespace-nowrap text-right z-10 bg-white px-3 py-2 text-center font-semibold text-slate-500">
            {children}
        </td>
    );
};