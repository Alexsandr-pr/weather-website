import { ALGERIA_CITIES } from "@/shared/constants/cities";
import type { PrayerTime } from "@/shared/types/weather";
import { fetchPrayerTimings } from "./aladhanApi";
import { buildPrayerTimes } from "../utils/buildPrayerTimes";

interface PrayerTimesResult {
    prayers: PrayerTime[];
    sunrise: string;
    timezone: string;
}

export async function getPrayerTimesBySlug(slug: string): Promise<PrayerTimesResult | null> {
    const city = ALGERIA_CITIES.find((c) => c.slug === slug);
    if (!city) return null;

    try {
        const response = await fetchPrayerTimings(city.lat, city.lon);
        const { timings, meta } = response.data;
        const prayers = buildPrayerTimes(timings);
        const sunrise = timings.Sunrise.split(" ")[0];

        return { prayers, sunrise, timezone: meta.timezone };
    } catch (error) {
        console.error("[prayer] failed to load timings", error);
        return null;
    }
}
