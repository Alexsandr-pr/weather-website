import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MeteoCityView } from "@/components/weather/MeteoCityView";
import { CountrySeoBlock } from "@/components/weather/CountrySeoBlock";
import { WeeklyCitiesBlock } from "@/components/weather/WeeklyCitiesBlock";
import { PrayerTimesCard } from "@/components/weather/PrayerTimesCard";
import { formatFrenchDate, getCityWeather } from "@/data/mockWeather";

const CITY_SLUG = "alger";

export default function AlgerMeteoPage() {
    const data = getCityWeather(CITY_SLUG);
    if (!data) {
        notFound();
    }

    const formattedDate = formatFrenchDate(new Date());

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="mx-auto w-full max-w-7xl flex-1 px-3 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 sm:gap-10">
                    <MeteoCityView data={data} formattedDate={formattedDate} />
                    <PrayerTimesCard
                        prayers={data.prayers}
                        city={data.city}
                        sunrise={data.details.sunrise}
                    />
                </div>
            </main>

            <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-8 px-3 sm:gap-10 sm:px-6 lg:px-8">
                <WeeklyCitiesBlock cities={data.nearby} country={data.city.country} />
                <CountrySeoBlock country={data.city.country} siteName="imeteoalgerie.com" />
            </div>

            <Footer />
        </div>
    );
}
