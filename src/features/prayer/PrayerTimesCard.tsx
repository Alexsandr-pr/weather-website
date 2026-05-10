import { MosqueIcon, SunriseIcon } from "@/shared/ui/icons";
import type { CityListItem } from "@/shared/types/city";

import { getPrayerTimesForCity } from "./services/getPrayerTimes";

interface PrayerTimesCardProps {
    city: CityListItem;
    isoDate?: string;
}

export async function PrayerTimesCard({ city, isoDate }: PrayerTimesCardProps) {
    const prayerData = await getPrayerTimesForCity(city, isoDate);

    if (!prayerData) return null;

    const { prayers, sunrise } = prayerData;
    const mainPrayers = prayers.filter((p) => p.name !== "Lever du soleil");

    const locationLabel = `${city.name}, ${city.wilaya_name}`;

    return (
        <section
            className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_0_7px_0_rgba(0,0,0,.27)] sm:p-4 lg:rounded-xl lg:p-6"
            aria-labelledby="prayer-times-heading"
            aria-describedby="prayer-times-location"
        >
            <div className="mb-3 flex min-w-0 items-center gap-2 sm:mb-4 sm:gap-3">
                <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 sm:h-11 sm:w-11"
                    aria-hidden
                >
                    <MosqueIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div className="min-w-0 leading-tight">
                    <h2
                        id="prayer-times-heading"
                        className="truncate text-sm font-semibold text-slate-900 sm:text-base lg:text-lg"
                    >
                        Horaires de prieres
                    </h2>
                    <p
                        id="prayer-times-location"
                        className="truncate text-[11px] text-slate-500 sm:text-xs"
                        title={locationLabel}
                    >
                        {city.name}, {city.wilaya_name}
                    </p>
                </div>
            </div>

            <ul
                role="list"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5"
                aria-label={`Horaires de prière à ${locationLabel}`}
            >
                {mainPrayers.map((prayer) => (
                    <li
                        key={prayer.name}
                        className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-white px-2 py-2.5 text-center text-slate-700 transition sm:px-3 sm:py-3"
                        aria-label={`${prayer.name}, ${prayer.time}`}
                    >
                        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-[11px]">
                            {prayer.name}
                        </span>
                        <span className="text-base font-semibold tabular-nums sm:text-lg">
                            {prayer.time}
                        </span>
                    </li>
                ))}
            </ul>

            <div
                className="mt-3 flex w-full items-center justify-between rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2 sm:max-w-[320px] sm:px-4"
                role="group"
                aria-label={`Lever du soleil, ${sunrise}`}
            >
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
