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

            <main className="mx-auto w-full max-w-7xl flex-1 px-0 md:px-6 lg:px-8 ">
                <div className="grid gap-6 grid-cols-1 gap-12">
                    <MeteoCityView data={data} formattedDate={formattedDate} />
                    <PrayerTimesCard
                        prayers={data.prayers}
                        city={data.city}
                        sunrise={data.details.sunrise}
                    />
                </div>

            </main>
            <div className="grid grid-cols-1 gap-12 mt-12">
            <WeeklyCitiesBlock cities={data.nearby} country={data.city.country} />
            <CountrySeoBlock country={data.city.country} siteName="imeteoalgerie.com" />
            </div>
            <Footer />
        </div>
    );
}
