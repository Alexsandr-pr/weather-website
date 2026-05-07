import type { PrayerTime, CityInfo } from "@/data/mockWeather";
import { MosqueIcon, SunriseIcon } from "@/components/icons/UiIcons";

interface PrayerTimesCardProps {
    prayers: PrayerTime[];
    city: CityInfo;
    sunrise: string;
}

export function PrayerTimesCard({ prayers, city, sunrise }: PrayerTimesCardProps) {
    const mainPrayers = prayers.filter((p) => p.name !== "Lever du soleil");
    const nextPrayer = prayers.find((p) => p.isNext);

    return (
        <section className="rounded-xl border border-slate-100 bg-white p-3 shadow-[0_0_7px_0_rgba(0,0,0,.27)] sm:p-4 lg:p-6">
            <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:items-center">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <MosqueIcon className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" />
                    <div className="min-w-0 leading-tight">
                        <h2 className="truncate text-sm font-semibold text-slate-900 sm:text-base lg:text-lg">
                            Horaires de prieres
                        </h2>
                        <p className="truncate text-[11px] text-slate-500 sm:text-xs">
                            {city.name}, {city.country}
                        </p>
                    </div>
                </div>
                {nextPrayer && (
                    <div className="shrink-0 text-right">
                        <p className="mb-1 text-[10px] uppercase leading-none tracking-wide text-blue-600 sm:mb-2">
                            Suivante
                        </p>
                        <p className="text-[11px] font-semibold leading-none tabular-nums text-blue-900 sm:text-xs">
                            {nextPrayer.name} · {nextPrayer.time}
                        </p>
                    </div>
                )}
            </div>

            <ul role="list" className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {mainPrayers.map((prayer) => (
                    <li
                        key={prayer.name}
                        className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-center transition sm:px-3 sm:py-3 ${prayer.isNext
                            ? "relative z-10 scale-105 border-transparent text-blue-900 shadow-[0_0_7px_0_rgba(0,0,0,.27)]"
                            : "border-slate-100 bg-white text-slate-700"
                            }`}
                    >
                        <span
                            className={`text-[10px] font-medium uppercase tracking-wide sm:text-[11px] ${prayer.isNext ? "text-blue-700" : "text-slate-500"
                                }`}
                        >
                            {prayer.name}
                        </span>
                        <span className="text-base font-semibold tabular-nums sm:text-lg">
                            {prayer.time}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-3 flex w-full items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 sm:max-w-[320px] sm:px-4">
                <div className="flex items-center gap-2 text-slate-700">
                    <SunriseIcon className="h-6 w-6 text-amber-500 sm:h-7 sm:w-7" />
                    <span className="text-xs font-medium sm:text-sm">Lever du soleil</span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-slate-900 sm:text-sm">
                    {sunrise}
                </span>
            </div>
        </section>
    );
}
