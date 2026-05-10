import { MoonPhaseIcon } from "@/shared/ui/icons";
import { formatHourTime } from "@/shared/utils/dateFormatters";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import { getMoonSummary } from "@/widgets/meteo-page/ui/utils/moon-summary";

interface MobileSunMoonRowProps {
    day: DailyWeather;
}

export function MobileSunMoonRow({ day }: MobileSunMoonRowProps) {
    const sunrise = formatHourTime(day.sunrise);
    const sunset = formatHourTime(day.sunset);
    const { moonValue, moonIllumination, moonPhaseLabel } = getMoonSummary(day.date);

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
