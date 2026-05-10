"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DailyWeather, HourlyWeather } from "@/widgets/meteo-page/types";
import { MoonPhaseIcon, ThermometerIcon, WeatherCodeIcon } from "@/shared/ui/icons";
import {
    currentIsoHour,
    formatDayMonth,
    formatHourTime,
    getFrenchDayName,
    getHourNum,
} from "@/shared/utils/dateFormatters";
import {
    getMoonIlluminationPercent,
    getMoonPhase,
    getMoonPhaseLabel,
    getMoonPhaseValue,
} from "@/shared/utils/moonPhase";

interface ActiveDayHourlyForecastProps {
    cityName: string;
    day: DailyWeather;
}

const getPartOfDay = (hour: number): string => {
    if (hour < 6) return "Nuit";
    if (hour < 12) return "Matin";
    if (hour < 18) return "Jour";
    return "Soir";
};

export function ActiveDayHourlyForecast({
    cityName,
    day,
}: ActiveDayHourlyForecastProps) {
    const hours = day.hours;
    const weatherCode = day.weatherCode;

    const moonPhase = getMoonPhase(day.date);
    const moonValue = getMoonPhaseValue(day.date);
    const moonIllumination = getMoonIlluminationPercent(day.date);
    const moonPhaseLabel = getMoonPhaseLabel(moonPhase);

    const dayName = getFrenchDayName(day.date);
    const [dayNum, ...monthParts] = formatDayMonth(day.date).split(" ");
    const monthName = monthParts.join(" ");

    const sunrise = formatHourTime(day.sunrise);
    const sunset = formatHourTime(day.sunset);
    const sunriseHour = parseInt(sunrise.split(":")[0] ?? "6", 10);
    const sunsetHour = parseInt(sunset.split(":")[0] ?? "20", 10);
    const isNightHour = (hour: number) => hour < sunriseHour || hour >= sunsetHour;

    const [nowIso, setNowIso] = useState<string>("");
    useEffect(() => {
        setNowIso(currentIsoHour());
        const id = setInterval(() => setNowIso(currentIsoHour()), 60_000);
        return () => clearInterval(id);
    }, []);

    const nowIndex = hours.findIndex((h) => h.time === nowIso);
    const defaultHourIndex = nowIndex >= 0 ? nowIndex : Math.min(12, hours.length - 1);

    const [activeHourIndex, setActiveHourIndex] = useState<number>(defaultHourIndex);
    useEffect(() => {
        setActiveHourIndex(defaultHourIndex);
    }, [defaultHourIndex, hours]);

    const activeHour = hours[activeHourIndex] ?? hours[0];
    const activeHourNum = getHourNum(activeHour.time);

    const partOfDayGroups = useMemo(() => {
        const groups: { label: string; count: number }[] = [];
        hours.forEach((h) => {
            const label = getPartOfDay(getHourNum(h.time));
            const last = groups[groups.length - 1];
            if (last && last.label === label) {
                last.count += 1;
            } else {
                groups.push({ label, count: 1 });
            }
        });
        return groups;
    }, [hours]);

    const groupStartIndices = useMemo(() => {
        const set = new Set<number>();
        let acc = 0;
        partOfDayGroups.forEach((g, gi) => {
            if (gi > 0) set.add(acc);
            acc += g.count;
        });
        return set;
    }, [partOfDayGroups]);

    const dividerCls = (idx: number) =>
        groupStartIndices.has(idx) ? "border-l border-slate-200" : "";
    const nowTimeCellCls = (idx: number) =>
        idx === nowIndex ? "!bg-blue-200 text-blue-950" : "";
    const nowDataCellCls = (idx: number) =>
        idx === nowIndex ? "!bg-blue-100 text-blue-900" : "";
    const hourColCls = "w-[56px] min-w-[56px] max-w-[56px] md:w-[64px] md:min-w-[64px] md:max-w-[64px]";

    const isNowActive = nowIndex === activeHourIndex;

    return (
        <div className="relative z-10 mt-3 rounded-2xl bg-transparent sm:mt-4 lg:mt-0 lg:rounded-2xl  lg:border lg:border-slate-200 lg:border-t-0 lg:bg-white lg:p-3 lg:shadow-[0_0_7px_0_rgba(0,0,0,.27)]">
            <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
                {/* MOBILE / TABLET LAYOUT */}
                <div className="flex flex-col gap-4 lg:hidden">
                    <MobileHeroCard
                        cityName={cityName}
                        isToday={nowIndex >= 0}
                        isNowActive={isNowActive}
                        activeHour={activeHour}
                        weatherCode={weatherCode}
                        dayName={dayName}
                        dayNum={dayNum}
                        monthName={monthName}
                        isNight={isNightHour(activeHourNum)}
                    />

                    <MobileHourScroller
                        hours={hours}
                        weatherCode={weatherCode}
                        activeIndex={activeHourIndex}
                        nowIndex={nowIndex}
                        onSelect={setActiveHourIndex}
                        isNightHour={isNightHour}
                    />

                    <MobileMetricsGrid hour={activeHour} />

                    <MobileSunMoonRow
                        sunrise={sunrise}
                        sunset={sunset}
                        moonValue={moonValue}
                        moonIllumination={moonIllumination}
                        moonPhaseLabel={moonPhaseLabel}
                    />
                </div>

                {/* DESKTOP LAYOUT */}
                <aside className="hidden w-[200px] min-h-[400px] shrink-0 flex-col self-stretch lg:flex">
                    {nowIndex >= 0 ? (
                        <div className="flex flex-col items-center gap-2 pt-2 pb-4 text-center text-slate-900">
                            <p className="text-sm font-semibold tabular-nums text-slate-700">
                                {cityName}: {formatHourTime(hours[nowIndex].time)}
                            </p>
                            <div className="flex w-full items-center justify-center">
                                <ThermometerIcon
                                    temperature={Math.round(hours[nowIndex].temperature)}
                                    className="h-24 w-12 shrink-0"
                                />
                                <WeatherCodeIcon
                                    code={weatherCode}
                                    isNight={isNightHour(getHourNum(hours[nowIndex].time))}
                                    className="h-36 w-36"
                                />
                            </div>
                            <p className="text-3xl font-bold tabular-nums text-slate-900">
                                {hours[nowIndex].temperature > 0 ? "+" : ""}
                                {Math.round(hours[nowIndex].temperature)}°C
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
                            <MoonPhaseIcon value={moonValue} className="h-9 w-9 shrink-0" />
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

                <div className="hidden flex-1 overflow-x-auto lg:block">
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
                                {hours.map((hour, idx) => (
                                    <th
                                        key={`time-${hour.time}`}
                                        className={`whitespace-nowrap bg-slate-50 px-3 py-1 font-medium text-slate-500 ${hourColCls} ${dividerCls(idx)} ${nowTimeCellCls(idx)}`}
                                    >
                                        {formatHourTime(hour.time)}
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                <th className="sticky left-0 z-10 bg-white px-3 py-2" />
                                {hours.map((hour, idx) => (
                                    <th
                                        key={`icon-${hour.time}`}
                                        className={`whitespace-nowrap px-3 py-1 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        <WeatherCodeIcon
                                            code={weatherCode}
                                            isNight={isNightHour(getHourNum(hour.time))}
                                            className="mx-auto h-7 w-7"
                                        />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <TdLeft>Temperature, °C</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`temp-${hour.time}`}
                                        className={`whitespace-nowrap text-sm md:text-lg h-8 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {hour.temperature > 0 ? "+" : ""}
                                        {Math.round(hour.temperature)}°
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <TdLeft>Ressenti</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`feel-${hour.time}`}
                                        className={`whitespace-nowrap h-8 py-1.5 font-medium text-slate-500 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {hour.feelsLike >= 0 ? "+" : ""}
                                        {Math.round(hour.feelsLike)}°
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <TdLeft>Pression, mm</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`pressure-${hour.time}`}
                                        className={`whitespace-nowrap bg-slate-50 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {Math.round(hour.pressure * 0.750062)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <TdLeft>Humidite, %</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`humidity-${hour.time}`}
                                        className={`whitespace-nowrap px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {Math.round(hour.humidity)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <TdLeft>UV Index</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`uv-${hour.time}`}
                                        className={`whitespace-nowrap bg-slate-50 px-3 py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {Math.round(hour.uvIndex)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <TdLeft>Vent, m/s</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`wind-${hour.time}`}
                                        className={`whitespace-nowrap h-8 py-0.5 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        <div className="flex items-center justify-center gap-1 leading-tight">
                                            <span className="grid min-w-5 min-h-5 w-5 place-items-center rounded-full bg-white shadow-sm">
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    className="h-3.5 w-3.5 text-slate-600"
                                                    style={{ transform: `rotate(${hour.windDirection}deg)` }}
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
                                <TdLeft>Qualite de l&apos;air (AQI)</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`aqi-${hour.time}`}
                                        className={`whitespace-nowrap bg-slate-50 px-2 md:px-3 py md:py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {Math.round(hour.aqi ?? 0)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <TdLeft>Probabilite de precipitations, %</TdLeft>
                                {hours.map((hour, idx) => (
                                    <td
                                        key={`precip-${hour.time}`}
                                        className={`whitespace-nowrap h-8 py-0.5 md:py-2 font-medium text-slate-900 ${hourColCls} ${dividerCls(idx)} ${nowDataCellCls(idx)}`}
                                    >
                                        {hour.precipitationProbability === 0 ? "-" : Math.round(hour.precipitationProbability)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const TdLeft = ({ children }: { children: React.ReactNode }) => {
    return (
        <td className="sticky left-0 whitespace-nowrap text-right z-10 bg-white px-2 py-0 text-center font-semibold text-slate-500 md:px-2 md:py-2">
            {children}
        </td>
    );
};

interface MobileHeroCardProps {
    cityName: string;
    isToday: boolean;
    isNowActive: boolean;
    activeHour: HourlyWeather;
    weatherCode: number;
    dayName: string;
    dayNum: string;
    monthName: string;
    isNight: boolean;
}

function MobileHeroCard({
    cityName,
    isToday,
    isNowActive,
    activeHour,
    weatherCode,
    dayName,
    dayNum,
    monthName,
    isNight,
}: MobileHeroCardProps) {
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
                        {activeHour.temperature > 0 ? "+" : ""}
                        {Math.round(activeHour.temperature)}°
                    </p>
                </div>
                <WeatherCodeIcon
                    code={weatherCode}
                    isNight={isNight}
                    className="h-24 w-24 shrink-0 drop-shadow-lg"
                />
            </div>
        </div>
    );
}

interface MobileHourScrollerProps {
    hours: HourlyWeather[];
    weatherCode: number;
    activeIndex: number;
    nowIndex: number;
    onSelect: (idx: number) => void;
    isNightHour: (hour: number) => boolean;
}

function MobileHourScroller({
    hours,
    weatherCode,
    activeIndex,
    nowIndex,
    onSelect,
    isNightHour,
}: MobileHourScrollerProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const target = itemRefs.current[activeIndex];
        if (target && scrollRef.current) {
            target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [activeIndex]);

    return (
        <div className="-mx-3 sm:-mx-4">
            <div
                ref={scrollRef}
                className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 sm:gap-2 sm:px-4"
            >
                {hours.map((hour, idx) => {
                    const isActive = idx === activeIndex;
                    const isNow = idx === nowIndex;
                    const hourNum = getHourNum(hour.time);
                    return (
                        <button
                            key={`mh-${hour.time}`}
                            ref={(el) => {
                                itemRefs.current[idx] = el;
                            }}
                            type="button"
                            onClick={() => onSelect(idx)}
                            className={`flex min-w-[58px] shrink-0 cursor-pointer flex-col items-center gap-1.5 rounded-2xl border px-2 py-2.5 transition ${isActive
                                ? "border-blue-500 bg-blue-500 text-white shadow-md"
                                : isNow
                                    ? "border-blue-200 bg-blue-50 text-blue-700"
                                    : "border-slate-100 bg-white text-slate-700"
                                }`}
                        >
                            <span
                                className={`text-[10px] font-semibold uppercase tabular-nums ${isActive ? "text-white/90" : isNow ? "text-blue-700" : "text-slate-500"
                                    }`}
                            >
                                {isNow ? "Maintenant" : formatHourTime(hour.time)}
                            </span>
                            <WeatherCodeIcon
                                code={weatherCode}
                                isNight={isNightHour(hourNum)}
                                className="h-7 w-7"
                            />
                            <span className="text-sm font-semibold tabular-nums">
                                {hour.temperature > 0 ? "+" : ""}
                                {Math.round(hour.temperature)}°
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

interface MobileMetricsGridProps {
    hour: HourlyWeather;
}

function MobileMetricsGrid({ hour }: MobileMetricsGridProps) {
    const feelsLike = Math.round(hour.feelsLike);
    const pressureMm = Math.round(hour.pressure * 0.750062);
    const humidity = Math.round(hour.humidity);
    const uv = Math.round(hour.uvIndex);
    const aqi = Math.round(hour.aqi ?? 0);
    const windMs = (hour.windSpeed / 3.6).toFixed(1);
    const precipitation = Math.round(hour.precipitationProbability);

    const items = [
        {
            label: "Ressenti",
            value: `${feelsLike >= 0 ? "+" : ""}${feelsLike}°`,
            hint: "comme",
        },
        {
            label: "Vent",
            value: `${windMs}`,
            hint: "m/s",
            iconRotation: hour.windDirection,
        },
        {
            label: "Humidite",
            value: `${humidity}`,
            hint: "%",
        },
        {
            label: "Pression",
            value: `${pressureMm}`,
            hint: "mm Hg",
        },
        {
            label: "UV Index",
            value: `${uv}`,
            hint: uv >= 8 ? "tres haut" : uv >= 6 ? "haut" : uv >= 3 ? "moyen" : "bas",
        },
        {
            label: "AQI",
            value: `${aqi}`,
            hint: aqi <= 50 ? "bon" : aqi <= 100 ? "moyen" : "mauvais",
        },
        {
            label: "Precipitations",
            value: precipitation === 0 ? "0" : `${precipitation}`,
            hint: "%",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {items.map((m) => (
                <div
                    key={m.label}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5"
                >
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                        {m.label}
                    </p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                        {m.iconRotation !== undefined && (
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white shadow-sm">
                                <svg
                                    viewBox="0 0 16 16"
                                    className="h-3.5 w-3.5 text-slate-600"
                                    style={{ transform: `rotate(${m.iconRotation}deg)` }}
                                    aria-hidden="true"
                                >
                                    <path d="M2 8 H12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M9 5 L12 8 L9 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        )}
                        <span className="text-lg font-semibold tabular-nums text-slate-900">
                            {m.value}
                        </span>
                        {m.hint && (
                            <span className="text-[11px] font-medium text-slate-500">{m.hint}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

interface MobileSunMoonRowProps {
    sunrise: string;
    sunset: string;
    moonValue: number;
    moonIllumination: number;
    moonPhaseLabel: string;
}

function MobileSunMoonRow({
    sunrise,
    sunset,
    moonValue,
    moonIllumination,
    moonPhaseLabel,
}: MobileSunMoonRowProps) {
    return (
        <div className="grid grid-cols-1 gap-2">
            <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-amber-700">
                    Soleil
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="leading-tight">
                        <p className="text-[11px] text-slate-500">Lever</p>
                        <p className="text-sm font-semibold tabular-nums text-slate-900">{sunrise}</p>
                    </div>
                    <div className="leading-tight text-right">
                        <p className="text-[11px] text-slate-500">Coucher</p>
                        <p className="text-sm font-semibold tabular-nums text-slate-900">{sunset}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <MoonPhaseIcon value={moonValue} className="h-9 w-9 shrink-0" />
                <div className="min-w-0 leading-tight">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                        Phase lunaire
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900">
                        {moonPhaseLabel}
                    </p>
                    <p className="text-[10px] tabular-nums text-slate-500">{moonIllumination}% illuminee</p>
                </div>
            </div>
        </div>
    );
}
