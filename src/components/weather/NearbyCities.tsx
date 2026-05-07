import Link from "next/link";
import type { NearbyCity } from "@/data/mockWeather";
import { WeatherConditionIcon } from "@/components/icons/WeatherIcons";
import { ChevronRightIcon, MapPinIcon } from "@/components/icons/UiIcons";

interface NearbyCitiesProps {
  cities: NearbyCity[];
  currentCityName: string;
}

export function NearbyCities({ cities, currentCityName }: NearbyCitiesProps) {
  return (
    <section
      aria-labelledby="nearby-cities-title"
      className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="nearby-cities-title"
          className="text-base font-semibold text-slate-900 sm:text-lg"
        >
          Ближайшие города к {currentCityName}
        </h2>
        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Все города
          <ChevronRightIcon className="h-3 w-3" />
        </Link>
      </div>

      <ul role="list" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/meteo/${city.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-50">
                <WeatherConditionIcon
                  condition={city.condition}
                  className="h-7 w-7"
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                    Погода в {city.name}
                  </p>
                  <span className="text-base font-semibold text-slate-900">
                    {city.temperature}°
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPinIcon className="h-3 w-3" />
                  <span className="truncate">{city.wilaya}</span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0">{city.distanceKm} km</span>
                </div>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
