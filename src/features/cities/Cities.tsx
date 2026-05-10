import Link from "next/link";
import type { CityListItem } from "@/shared/types/city";
import { getRegionLabelForWilayaName } from "@/shared/constants/region-by-wilaya";
import { getCitiesInSameRegion } from "@/shared/utils/citiesByRegion";
import {
    buildMeteoCityBasePath,
    getMeteoCityKey,
} from "@/shared/utils/meteoCityPath";

interface CitiesProps {
    currentCity: CityListItem;
}

export function Cities({ currentCity }: CitiesProps) {
    const cities = getCitiesInSameRegion(currentCity);

    const regionLabel =
        getRegionLabelForWilayaName(currentCity.wilaya_name) ??
        currentCity.wilaya_name;

    if (cities.length === 0) return null;

    return (
        <section>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">
                Meteo de la semaine dans d&apos;autres villes de la region {regionLabel}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-2.5">
                {cities.map((city) => (
                    <Link
                        key={getMeteoCityKey(city)}
                        href={buildMeteoCityBasePath(city)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 sm:text-sm"
                    >
                        Meteo a {city.name}
                    </Link>
                ))}
            </div>
        </section>
    );
}
