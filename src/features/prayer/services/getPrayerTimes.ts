import { cache } from "react";

import type { CityListItem } from "@/shared/types/city";
import type { PrayerTime } from "@/shared/types/weather";

import { buildPrayerTimes } from "../utils/buildPrayerTimes";
import { fetchPrayerTimings } from "./aladhanApi";

interface PrayerTimesResult {
    prayers: PrayerTime[];
    sunrise: string;
    timezone: string;
}

function toPrayerDate(isoDate?: string): Date {
    if (!isoDate) return new Date();
    return new Date(`${isoDate}T00:00:00`);
}

export const getPrayerTimesForCity = cache(
    async function getPrayerTimesForCity(
        city: CityListItem,
        isoDate?: string,
    ): Promise<PrayerTimesResult | null> {
        try {
            const response = await fetchPrayerTimings(
                city.lat,
                city.lon,
                toPrayerDate(isoDate),
            );
            const { timings, meta } = response.data;
            const prayers = buildPrayerTimes(timings);
            const sunrise = timings.Sunrise.split(" ")[0];

            return { prayers, sunrise, timezone: meta.timezone };
        } catch (error) {
            console.error("[prayer] failed to load timings", error);
            return null;
        }
    },
);
