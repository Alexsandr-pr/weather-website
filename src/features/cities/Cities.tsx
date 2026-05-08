import Link from "next/link";
import { getCityBySlug, getCitiesInSameRegion } from "@/shared/utils/citiesByRegion";

interface CitiesProps {
    slug: string;
}

export function Cities({ slug }: CitiesProps) {
    const current = getCityBySlug(slug);
    const cities = getCitiesInSameRegion(slug);

    if (!current || cities.length === 0) return null;

    return (
        <section>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">
                Meteo de la semaine dans d&apos;autres villes de la region {current.region}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-2.5">
                {cities.map((city) => (
                    <Link
                        key={city.slug}
                        href={`/meteo/${city.slug}`}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 sm:text-sm"
                    >
                        Meteo a {city.name}
                    </Link>
                ))}
            </div>
        </section>
    );
}
