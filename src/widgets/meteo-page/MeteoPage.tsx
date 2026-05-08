import { notFound } from "next/navigation";
import { PrayerTimesCard } from "@/features/prayer";
import { getCityWeather } from "@/shared/data/mockWeather";
import { formatFrenchDate } from "@/shared/utils/frenchDate";
import { Cities } from "@/features/cities";

interface MeteoPageProps {
    slug?: string;
}

export function MeteoPage({ slug = "alger" }: MeteoPageProps) {
    const data = getCityWeather("alger");

    if (!data) {
        notFound();
    }

    const formattedDate = formatFrenchDate(new Date());

    return (
        <>
            <main className="mx-auto mt-10 w-full max-w-7xl flex-1 px-3 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 sm:gap-10">
                    {/* <MeteoCityView data={data} formattedDate={formattedDate} /> */}
                    <PrayerTimesCard slug={slug} />
                </div>
            </main>

            <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-8 px-3 sm:gap-10 sm:px-6 lg:px-8">
                <Cities slug={slug} />

                <section>
                    <h2 className="text-sm font-medium text-slate-500 sm:text-base lg:text-lg">
                        Meteo dans toutes les regions d&apos;Algerie, previsions meteo par imeteoalgerie.com
                    </h2>
                </section>
            </div>
        </>
    );
}
