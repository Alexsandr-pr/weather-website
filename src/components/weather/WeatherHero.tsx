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
            className="relative overflow-hidden text-slate-900 mb-6"
        >
            <div className="relative flex flex-col gap-4 sm:flex-row items-end sm:justify-between sm:gap-6">
                <div className="min-w-0">
                    <h1
                        id="weather-hero-title"
                        className="text-2xl font-semibold tracking-tight sm:text-3xl"
                    >
                        <span className="text-slate-500">Погода в</span> {heroName}
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                        {addressLine}
                    </p>
                </div>

                <div className="">
                    <div
                        role="tablist"
                        aria-label="Период прогноза"
                        className="inline-flex shrink-0 items-end gap-1 self-end rounded-full bg-blue-200 p-1 backdrop-blur"
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
                                    className={`rounded-full  px-4 hover:cursor-pointer py-1.5 text-sm font-semibold transition ${isActive
                                            ? "bg-white text-blue-700 shadow-sm"
                                            : "text-slate-900"
                                        }`}
                                >
                                    {range} дней
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
