
import { PrayerTimesCard } from "@/features/prayer";
import { Cities } from "@/features/cities";
import Link from "next/link";
import { buildAddressLine } from "@/shared/utils/buildAddressLine";
import { MeteoCityView } from "@/widgets/meteo-page/ui/MeteoCityView";
import { getWeather } from "./api/getWeather";
import { getCityBySlug } from "@/shared/utils/citiesByRegion";
import { notFound } from "next/navigation";

interface MeteoPageProps {
    slug?: string;
}

export async function MeteoPage({ slug = "alger" }: MeteoPageProps) {
   
    const city = getCityBySlug(slug);

    if (!city) {
        notFound();
    }

    const weatherData = await getWeather({ lat: city.lat, lon: city.lon });

    if (weatherData.length === 0) {
        notFound();
    }

    return (
        <>
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
                                        <span className="text-slate-500">Meteo a</span> {city.nameLocative ?? city.name}
                                    </h1>
                                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:mt-2 sm:text-sm lg:text-base">
                                        {buildAddressLine(city)}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <MeteoCityView weatherData={weatherData} cityName={city.name} />
                    </div>
                    <PrayerTimesCard slug={slug} />
                </div>
            </main>

            <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-8 px-3 sm:gap-10 sm:px-6 lg:px-8">
                <Cities slug={slug} />

                <section>
                    <h2 className="text-sm font-medium text-slate-500 sm:text-base lg:text-lg">
                        <Link href="/" className="text-blue-600 hover:text-blue-700">Meteo</Link> dans toutes les regions d&apos;Algerie, previsions meteo par imeteoalgerie.com
                    </h2>
                </section>
            </div>
        </>
    );
}
