import type { PrayerTime, CityInfo } from "@/data/mockWeather";
import { MosqueIcon, SunriseIcon } from "@/components/icons/UiIcons";

interface PrayerTimesCardProps {
    prayers: PrayerTime[];
    city: CityInfo;
    sunrise: string;
}

export function PrayerTimesCard({ prayers, city, sunrise }: PrayerTimesCardProps) {
    const mainPrayers = prayers.filter((p) => p.name !== "Восход");
    const nextPrayer = prayers.find((p) => p.isNext);

    return (
        <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-[0_0_7px_0_rgba(0,0,0,.27)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    
                        <MosqueIcon className="h-10 w-10" />
                   
                    <div className="leading-tight">
                        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                            Время намаза
                        </h2>
                        <p className="text-xs text-slate-500">
                            {city.name}, {city.country}
                        </p>
                    </div>
                </div>
                {nextPrayer && (
                    <div className="text-right">
                        <p className="text-[10px] mb-2 uppercase tracking-wide leading-none text-blue-600">
                            Следующий
                        </p>
                        <p className="mt-0.5 text-xs font-semibold leading-none text-blue-900 tabular-nums">
                            {nextPrayer.name} · {nextPrayer.time}
                        </p>
                    </div>
                )}
            </div>

            <ul role="list" className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {mainPrayers.map((prayer) => (
                    <li
                        key={prayer.name}
                        className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-center transition ${prayer.isNext
                            ? "border-transparent scale-105 z-10 relative text-blue-900 shadow-[0_0_7px_0_rgba(0,0,0,.27)] "
                            : "border-slate-100 bg-white text-slate-700"
                            }`}
                    >
                        <span
                            className={`text-[11px] font-medium uppercase tracking-wide ${prayer.isNext ? "text-blue-700" : "text-slate-500"
                                }`}
                        >
                            {prayer.name}
                        </span>
                        <span className="text-lg font-semibold tabular-nums">
                            {prayer.time}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-3 max-w-[320px] flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-1.5">
                <div className="flex items-center gap-2 text-slate-700">
                    <SunriseIcon className="h-7 w-7 text-amber-500" />
                    <span className="text-sm font-medium">Восход солнца</span>
                </div>
                <span className="text-sm font-semibold tabular-nums text-slate-900">
                    {sunrise}
                </span>
            </div>
        </section>
    );
}
