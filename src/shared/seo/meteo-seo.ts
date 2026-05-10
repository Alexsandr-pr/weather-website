import { resolveEffectiveTier } from "@/shared/constants/region-by-wilaya";
import { FRENCH_DAYS } from "@/shared/constants/french-calendar";
import type { CityCacheTier, CityListItem } from "@/shared/types/city";
import {
  buildMeteoPathFromSlugs,
  getCityByMeteoSlugs,
} from "@/shared/utils/meteoCityPath";

const WEEKDAY_BY_SLUG = new Map(
    FRENCH_DAYS.map((day) => [day.toLowerCase(), day]),
);

export interface MeteoPageSeo {
    city: CityListItem | undefined;
    /** Effective tier: JSON overrides `tier`, otherwise `getTier`. Undefined if city not found. */
    tier: CityCacheTier | undefined;
    cityName: string;
    weekdayLabel: string | undefined;
    isDailyPage: boolean;
    canonicalPath: string;
    title: string;
    description: string;
}

export function getMeteoPageSeo(
    wilayaSlug: string,
    citySlug: string,
    forecastDay?: string[],
): MeteoPageSeo {
    const city = getCityByMeteoSlugs(wilayaSlug, citySlug);
    const cityName = city?.name ?? citySlug;
    const tier = city ? resolveEffectiveTier(city) : undefined;

    const forecastDaySlug = forecastDay?.[0]?.toLowerCase();

    const weekdayLabel = forecastDaySlug
        ? WEEKDAY_BY_SLUG.get(forecastDaySlug) ?? forecastDaySlug
        : undefined;

    const isDailyPage = Boolean(weekdayLabel);

    const title = isDailyPage
        ? `Météo et horaires de prière à ${cityName} ${weekdayLabel}`
        : `Météo et horaires de prière à ${cityName} aujourd’hui`;

    const description = isDailyPage
        ? `Prévisions météo à ${cityName} pour ${weekdayLabel}: température, pluie, vent, UV, qualité de l’air, lever et coucher du soleil, avec horaires de prière.`
        : `Prévisions météo à ${cityName} aujourd’hui et sur 7 jours: température, pluie, vent, UV, qualité de l’air, lever et coucher du soleil, avec horaires de prière quotidiennes.`;

    const canonicalPath = buildMeteoPathFromSlugs(
        wilayaSlug,
        citySlug,
        isDailyPage ? forecastDaySlug : undefined,
    );

    return {
        city: city ?? undefined,
        tier,
        cityName,
        weekdayLabel,
        isDailyPage,
        canonicalPath,
        title,
        description,
    };
}
