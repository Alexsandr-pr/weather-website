import Link from "next/link";
import { WeatherCodeIcon } from "@/shared/ui/icons";
import {
    ForecastDayView,
    formatSignedTemperature,
} from "@/widgets/meteo-page/ui/utils/forecast-day";

interface MobileForecastDayCardProps {
    item: ForecastDayView;
}

export function MobileForecastDayCard({ item }: MobileForecastDayCardProps) {
    return (
        <li
            className={`min-w-[88px] shrink-0 rounded-2xl transition sm:min-w-[100px] ${item.isActive
                ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-md"
                : "border border-slate-100 bg-white text-slate-900"
                }`}
        >
            <Link
                href={item.href}
                scroll={false}
                className="flex w-full cursor-pointer flex-col items-center gap-2 px-2 py-3 sm:gap-2.5 sm:py-3.5"
            >
                <div className="flex flex-col items-center leading-tight">
                    <span
                        className={`text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${item.isActive ? "text-white/90" : "text-slate-500"
                            }`}
                    >
                        {item.dayName}
                    </span>
                    <time
                        dateTime={item.date}
                        className="mt-0.5 flex flex-col items-center leading-none"
                    >
                        <span
                            className={`text-xl tabular-nums sm:text-2xl ${item.isActive ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {item.dayNum}
                        </span>
                        <span
                            className={`mt-0.5 text-[10px] uppercase tracking-wide sm:text-[11px] ${item.isActive ? "text-white/80" : "text-slate-500"
                                }`}
                        >
                            {item.monthName}
                        </span>
                    </time>
                </div>

                <WeatherCodeIcon
                    code={item.weatherCode}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                />

                <div className="flex items-center gap-2 leading-none">
                    <span
                        className={`text-xs font-medium sm:text-sm ${item.isActive ? "text-white/85" : "text-slate-500"
                            }`}
                    >
                        <span className="tabular-nums">{formatSignedTemperature(item.low)}</span>
                    </span>
                    <span
                        className={`text-sm font-bold sm:text-base ${item.isActive ? "text-white" : "text-slate-900"
                            }`}
                    >
                        <span className="tabular-nums">{formatSignedTemperature(item.high)}</span>
                    </span>
                </div>
            </Link>
        </li>
    );
}
