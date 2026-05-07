import type { CityInfo, CurrentWeather } from "@/data/mockWeather";

export type ForecastRange = 7 | 10;

interface WeatherHeroProps {
    city: CityInfo;
    current: CurrentWeather;
    formattedDate: string;
    forecastRange?: ForecastRange;
    onForecastRangeChange?: (range: ForecastRange) => void;
}

function buildAddressLine(city: CityInfo): string {
    const parts = [
        city.region ?? city.wilaya,
        city.locality,
        city.district ? `(${city.district})` : null,
        city.country,
    ].filter(Boolean) as string[];

    return parts.join(", ");
}

const RANGES: ForecastRange[] = [7, 10];

export function WeatherHero({
    city,
    forecastRange = 7,
    onForecastRangeChange,
}: WeatherHeroProps) {
    const heroName = city.nameLocative ?? city.name;
    const addressLine = buildAddressLine(city);

    return (
        <section
            aria-labelledby="weather-hero-title"
            className="relative overflow-hidden text-slate-900 mb-4 sm:mb-6"
        >
            <div className="relative flex flex-col  gap-3 sm:gap-4 sm:flex-row sm:items-end justify-between lg:gap-6">
                <div className="min-w-0">
                    <h1
                        id="weather-hero-title"
                        className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl"
                    >
                        <span className="text-slate-500">Meteo a</span> {heroName}
                    </h1>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:mt-2 sm:text-sm lg:text-base">
                        {addressLine}
                    </p>
                </div>

                <div
                    role="tablist"
                    aria-label="Periode de prevision"
                    className="inline-flex w-full shrink-0 items-stretch gap-1 self-start rounded-full bg-blue-100 p-1 backdrop-blur sm:w-auto sm:items-end sm:self-end bg-blue-200"
                >
                    {RANGES.map((range) => {
                        const isActive = range === forecastRange;
                        return (
                            <button
                                key={range}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => onForecastRangeChange?.(range)}
                                className={`flex-1 rounded-full px-4 py-1.5 text-xs font-semibold transition hover:cursor-pointer sm:flex-none sm:text-sm ${isActive
                                    ? "bg-white text-blue-700 shadow-sm"
                                    : "text-slate-700 lg:text-slate-900"
                                    }`}
                            >
                                {range} jours
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
