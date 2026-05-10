import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/shared/constants/brand";
import { ALGERIA_CITIES } from "@/shared/constants/cities";
import { FRENCH_DAYS } from "@/shared/constants/french-calendar";
import {
    buildMeteoPathFromSlugs,
    getMeteoCityPathSlugs,
} from "@/shared/utils/meteoCityPath";

const FRENCH_WEEKDAY_SLUGS = FRENCH_DAYS.map((d) => d.toLowerCase());

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    const entries: MetadataRoute.Sitemap = [
        {
            url: BRAND_URL,
            lastModified,
            changeFrequency: "daily",
            priority: 1,
        },
    ];

    for (const city of ALGERIA_CITIES) {
        const { wilayaSlug, citySlug } = getMeteoCityPathSlugs(city);
        const basePath = buildMeteoPathFromSlugs(wilayaSlug, citySlug);
        entries.push({
            url: `${BRAND_URL}${basePath}`,
            lastModified,
            changeFrequency: "hourly",
            priority: 0.9,
        });

        for (const daySlug of FRENCH_WEEKDAY_SLUGS) {
            const dayPath = buildMeteoPathFromSlugs(wilayaSlug, citySlug, daySlug);
            entries.push({
                url: `${BRAND_URL}${dayPath}`,
                lastModified,
                changeFrequency: "hourly",
                priority: 0.8,
            });
        }
    }

    return entries;
}
