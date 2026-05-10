import { getPrayerTimesForCity, PrayerTimesCard } from "@/features/prayer";
import { Cities } from "@/features/cities";
import Link from "next/link";
import { BRAND_URL } from "@/shared/constants/brand";
import { ALGERIA_CITIES } from "@/shared/constants/cities";
import { JsonLd } from "@/shared/seo/JsonLd";
import { getMeteoPageSeo } from "@/shared/seo/meteo-seo";
import { buildMeteoCityJsonLd } from "@/shared/seo/schema/meteoCityGraph";
import { buildAddressLine } from "@/shared/utils/buildAddressLine";
import {
    buildMeteoCityBasePath,
    getCityByMeteoSlugs,
    getMeteoCityPathSlugs,
} from "@/shared/utils/meteoCityPath";
import { MeteoCityView } from "@/widgets/meteo-page/ui/MeteoCityView";
import { getWeather } from "./api/getWeather";
import { resolveEffectiveTier } from "@/shared/constants/region-by-wilaya";
import { getWeatherRevalidateSecondsForTier } from "@/shared/constants/weather-cache-tier";
import { notFound, redirect } from "next/navigation";
import { getFrenchWeekdaySlug } from "@/shared/utils/dateFormatters";

const FORECAST_DAYS = 7;

interface MeteoPageProps {
    wilayaSlug?: string;
    citySlug?: string;
    /** Segment d'URL pour les jours 2–7 (ex. lundi, mardi) — absent pour aujourd'hui */
    forecastDaySlug?: string;
}

function resolveCity(wilayaSlug?: string, citySlug?: string) {
    if (wilayaSlug && citySlug) {
        return getCityByMeteoSlugs(wilayaSlug, citySlug);
    }
    return ALGERIA_CITIES[0];
}

export async function MeteoPage({
    wilayaSlug,
    citySlug,
    forecastDaySlug,
}: MeteoPageProps) {
    const city = resolveCity(wilayaSlug, citySlug);

    if (!city) {
        notFound();
    }

    const { wilayaSlug: wSlug, citySlug: cSlug } = getMeteoCityPathSlugs(city);
    const meteoBasePath = buildMeteoCityBasePath(city);

    const weatherData = await getWeather({
        lat: city.lat,
        lon: city.lon,
        revalidateSeconds: getWeatherRevalidateSecondsForTier(
            resolveEffectiveTier(city),
        ),
    });

    if (weatherData.length === 0) {
        notFound();
    }

    const visibleDaily = weatherData.slice(0, FORECAST_DAYS);
    let activeDayIndex = 0;

    if (forecastDaySlug) {
        const normalized = decodeURIComponent(forecastDaySlug).toLowerCase();
        const todaySlug = getFrenchWeekdaySlug(visibleDaily[0].date);

        if (normalized === todaySlug) {
            redirect(meteoBasePath);
        }

        const idx = visibleDaily.findIndex(
            (d, i) => i > 0 && getFrenchWeekdaySlug(d.date) === normalized,
        );

        if (idx === -1) {
            notFound();
        }

        activeDayIndex = idx;
    }

    const activeDay = visibleDaily[activeDayIndex];

    const forecastDayForSeo = forecastDaySlug ? [forecastDaySlug] : undefined;

    const seo = getMeteoPageSeo(wSlug, cSlug, forecastDayForSeo);

    const prayerForLd = await getPrayerTimesForCity(city, activeDay.date);

    const jsonLd = buildMeteoCityJsonLd({
        seo,
        city,
        canonicalUrl: new URL(seo.canonicalPath, BRAND_URL).toString(),
        meteoBasePath,
        visibleDaily,
        activeDay,
        prayer: prayerForLd
            ? {
                prayers: prayerForLd.prayers,
                sunrise: prayerForLd.sunrise,
            }
            : null,
    });

    return (
        <>
            <JsonLd data={jsonLd} />
            <main className="mx-auto mt-10 w-full max-w-7xl flex-1 px-3 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 sm:gap-10">
                    <div className="">
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
                                        <span className="text-slate-500">Meteo a</span> {city.name}
                                    </h1>
                                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:mt-2 sm:text-sm lg:text-base">
                                        {buildAddressLine(city)}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <MeteoCityView
                            weatherData={weatherData}
                            cityName={city.name}
                            meteoBasePath={meteoBasePath}
                            activeDayIndex={activeDayIndex}
                            isTodayRoute={!forecastDaySlug}
                        />
                    </div>
                    <PrayerTimesCard city={city} isoDate={activeDay.date} />
                </div>
            </main>

            <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-8 px-3 sm:gap-10 sm:px-6 lg:px-8">
                <Cities currentCity={city} />

                <section>
                    <h2 className="text-sm font-medium text-slate-500 sm:text-base lg:text-lg">
                        <Link href="/" className="text-blue-600 hover:text-blue-700">Meteo</Link> dans toutes les regions d&apos;Algerie, previsions meteo par imeteoalgerie.com
                    </h2>
                </section>
            </div>
        </>
    );
}
