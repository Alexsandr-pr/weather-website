import Link from "next/link";
import type { CityListItem } from "@/shared/types/city";
import { getRegionLabelForWilayaName } from "@/shared/constants/region-by-wilaya";
import {
    getCitiesInSameDaira,
    getCitiesInSameRegionOtherWilayas,
    getCitiesInSameWilaya,
} from "@/shared/utils/citiesByRegion";
import {
    buildMeteoCityBasePath,
    getMeteoCityKey,
} from "@/shared/utils/meteoCityPath";

const MAX_LINKS_PER_BLOCK = 16;

interface CitiesProps {
    currentCity: CityListItem;
}

function sortByName(cities: CityListItem[]): CityListItem[] {
    return [...cities].sort((a, b) =>
        a.name.localeCompare(b.name, "fr", { sensitivity: "base" }),
    );
}

function CityChips({ cities }: { cities: CityListItem[] }) {
    return (
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-2.5">
            {cities.map((city) => (
                <Link
                    key={getMeteoCityKey(city)}
                    href={buildMeteoCityBasePath(city)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 sm:text-sm"
                >
                    Météo à {city.name}
                </Link>
            ))}
        </div>
    );
}

export function Cities({ currentCity }: CitiesProps) {
    const regionLabel =
        getRegionLabelForWilayaName(currentCity.wilaya_name) ??
        currentCity.wilaya_name;

    const allDairaSorted = sortByName(getCitiesInSameDaira(currentCity));
    const dairaKeys = new Set(allDairaSorted.map((c) => getMeteoCityKey(c)));
    const dairaCities = allDairaSorted.slice(0, MAX_LINKS_PER_BLOCK);

    const wilayaOtherDaira = sortByName(
        getCitiesInSameWilaya(currentCity).filter(
            (c) => !dairaKeys.has(getMeteoCityKey(c)),
        ),
    ).slice(0, MAX_LINKS_PER_BLOCK);

    const regionOtherWilayas = sortByName(
        getCitiesInSameRegionOtherWilayas(currentCity),
    ).slice(0, MAX_LINKS_PER_BLOCK);

    const hasAny =
        dairaCities.length > 0 ||
        wilayaOtherDaira.length > 0 ||
        regionOtherWilayas.length > 0;

    if (!hasAny) return null;

    return (
        <section className="flex flex-col gap-8 sm:gap-10">
            <header>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">
                    Autres villes à explorer
                </h2>
            </header>

            {dairaCities.length > 0 ? (
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                        Même daïra ({currentCity.daira_name})
                    </h3>
                    <CityChips cities={dairaCities} />
                </div>
            ) : null}

            {wilayaOtherDaira.length > 0 ? (
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                        Autres communes de la wilaya {currentCity.wilaya_name}
                    </h3>
                    <CityChips cities={wilayaOtherDaira} />
                </div>
            ) : null}

            {regionOtherWilayas.length > 0 ? (
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                        Autres wilayas de la région {regionLabel}
                    </h3>
                    <CityChips cities={regionOtherWilayas} />
                </div>
            ) : null}
        </section>
    );
}
