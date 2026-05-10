import type { HourlyWeather } from "@/widgets/meteo-page/types";
import { buildMobileMetricItems } from "@/widgets/meteo-page/ui/utils/mobile-metrics";
import { WindDirectionIcon } from "./WindDirectionIcon";

interface MobileMetricsGridProps {
    hour: HourlyWeather;
}

export function MobileMetricsGrid({ hour }: MobileMetricsGridProps) {
    const items = buildMobileMetricItems(hour);

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
                                <WindDirectionIcon deg={m.iconRotation} />
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
