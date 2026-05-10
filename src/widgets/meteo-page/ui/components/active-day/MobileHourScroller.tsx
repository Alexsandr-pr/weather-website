import { useEffect, useRef } from "react";
import { formatHourTime, getHourNum } from "@/shared/utils/dateFormatters";
import { WeatherCodeIcon } from "@/shared/ui/icons";
import type { HourlyWeather } from "@/widgets/meteo-page/types";
import { formatSignedRoundedTemp } from "@/widgets/meteo-page/ui/utils/active-day-hourly";

interface MobileHourScrollerProps {
    hours: HourlyWeather[];
    weatherCode: number;
    activeIndex: number;
    nowIndex: number;
    onSelect: (idx: number) => void;
    isNightHour: (hour: number) => boolean;
}

export function MobileHourScroller({
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
                                {formatSignedRoundedTemp(hour.temperature)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
