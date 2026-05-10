import Link from "next/link";
import { WeatherCodeIcon } from "@/shared/ui/icons";
import {
    ForecastDayView,
    formatSignedTemperature,
} from "@/widgets/meteo-page/ui/utils/forecast-day";

interface DesktopForecastDayCardProps {
    item: ForecastDayView;
}

export function DesktopForecastDayCard({ item }: DesktopForecastDayCardProps) {
    return (
        <li
            className={`flex min-w-[96px] flex-1 flex-col items-center gap-3 rounded-t-xl border bg-white py-3 text-center transition xl:min-w-[110px] ${item.isActive
                ? "relative z-20 -mt-1.5 border-slate-200 border-b-white bg-white pt-4 shadow-[0_0_7px_0_rgba(0,0,0,.27)] after:absolute after:-bottom-3 after:left-0 after:z-10 after:h-10 after:w-full after:bg-white after:content-['']"
                : "border-slate-100"
                }`}
        >
            <Link
                href={item.href}
                scroll={false}
                className="relative z-20 flex w-full cursor-pointer flex-col items-center gap-1.5 xl:gap-3"
            >
                <div className="flex flex-col items-center leading-tight">
                    <span
                        className={`text-sm font-medium xl:text-base ${item.isActive ? "text-blue-700" : "text-slate-900"
                            }`}
                    >
                        {item.dayName}
                    </span>
                    <time
                        dateTime={item.date}
                        className="mt-1 flex flex-col items-center leading-none"
                    >
                        <span className="text-2xl tabular-nums text-slate-900">
                            {item.dayNum}
                        </span>
                        <span className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
                            {item.monthName}
                        </span>
                    </time>
                </div>

                <WeatherCodeIcon
                    code={item.weatherCode}
                    className="h-10 w-10 xl:h-16 xl:w-16"
                />

                <div className="flex items-center gap-2 leading-none xl:gap-3">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-normal uppercase tracking-wide text-slate-500 xl:text-[11px]">
                            min.
                        </span>
                        <span className="text-sm font-medium text-slate-900 xl:text-lg">
                            <span className="tabular-nums">{formatSignedTemperature(item.low)}</span>
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-normal uppercase tracking-wide text-slate-500 xl:text-[11px]">
                            max.
                        </span>
                        <span className="text-sm font-medium text-slate-900 xl:text-lg">
                            <span className="tabular-nums">{formatSignedTemperature(item.high)}</span>
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}
