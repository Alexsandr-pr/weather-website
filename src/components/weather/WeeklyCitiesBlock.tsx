import Link from "next/link";
import type { NearbyCity } from "@/data/mockWeather";

interface WeeklyCitiesBlockProps {
  cities: NearbyCity[];
  country: string;
}

export function WeeklyCitiesBlock({ cities, country }: WeeklyCitiesBlockProps) {
  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
     
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Meteo de la semaine dans d&apos;autres villes d&apos;{country}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/meteo/${city.slug}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Meteo a {city.name}
            </Link>
          ))}
        </div>
     
    </section>
  );
}
