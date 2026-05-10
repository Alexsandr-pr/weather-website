import { BRAND_URL } from "@/shared/constants/brand";
import { buildAddressLine } from "@/shared/utils/buildAddressLine";
import { getWeatherCodeLabel } from "@/shared/utils/weatherCode";
import type { MeteoPageSeo } from "@/shared/seo/meteo-seo";
import type { CityListItem } from "@/shared/types/city";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import {
    dayBoundsIso,
    localDateTimeWithAlgiersOffset,
    quantitativeCelsius,
} from "./helpers";

const WEB_SITE_ID = `${BRAND_URL}/#website`;

/**
 * Use `CreativeWork`, not `WeatherForecast`: many validators (e.g. Yandex) do not
 * whitelist WeatherForecast, so ListItem.item and @type fail.
 * Forecast-specific fields remain as on a CreativeWork (Google accepts extensions).
 */
const FORECAST_DAY_TYPE = "https://schema.org/CreativeWork";

interface PrayerTimesPayload {
    prayers: { name: string; time: string }[];
    sunrise: string;
}

function averageNumber(values: number[]): number | null {
    if (values.length === 0) return null;
    const sum = values.reduce((a, v) => a + v, 0);
    return Math.round((sum / values.length) * 10) / 10;
}

function buildWeatherForecastNode(
    day: DailyWeather,
    placeId: string,
    index: number,
    baseUrl: string,
) {
    const fragment = index === 0 ? "weather-day" : `weather-day-${index}`;
    const { validFrom, validThrough } = dayBoundsIso(day.date);
    const condition = getWeatherCodeLabel(day.weatherCode);
    const windAvg = averageNumber(day.hours.map((h) => h.windSpeed));
    const humidityAvg = averageNumber(day.hours.map((h) => h.humidity));
    const pressureAvg = averageNumber(day.hours.map((h) => h.pressure));

    const node: Record<string, unknown> = {
        "@type": FORECAST_DAY_TYPE,
        "@id": `${baseUrl}#${fragment}`,
        name: `Prévisions du ${day.date} — ${condition}`,
        description: `${condition}. Température max. ${Math.round(day.maxTemperature)} °C, min. ${Math.round(day.minTemperature)} °C. Source des données météo: Open-Meteo.`,
        // CreativeWork temporal scope (strict vocab) — avoids unrecognized WeatherForecast-only props.
        temporalCoverage: `${validFrom}/${validThrough}`,
        highTemperature: quantitativeCelsius(day.maxTemperature),
        lowTemperature: quantitativeCelsius(day.minTemperature),
        spatialCoverage: { "@id": placeId },
    };

    if (windAvg != null) {
        node.windSpeed = {
            "@type": "QuantitativeValue",
            value: windAvg,
            unitCode: "KMH",
            unitText: "km/h",
        };
    }

    const additional: { "@type": string; name: string; value: string | number }[] =
        [];

    additional.push({
        "@type": "PropertyValue",
        name: "Indice UV maximal",
        value: day.uvIndexMax,
    });

    if (humidityAvg != null) {
        additional.push({
            "@type": "PropertyValue",
            name: "Humidité relative moyenne (%)",
            value: humidityAvg,
        });
    }

    if (pressureAvg != null) {
        additional.push({
            "@type": "PropertyValue",
            name: "Pression au niveau du sol moyenne (hPa)",
            value: pressureAvg,
        });
    }

    if (additional.length > 0) {
        node.additionalProperty = additional;
    }

    return node;
}

export function buildMeteoCityJsonLd(options: {
    seo: MeteoPageSeo;
    city: CityListItem;
    canonicalUrl: string;
    meteoBasePath: string;
    visibleDaily: DailyWeather[];
    activeDay: DailyWeather;
    prayer: PrayerTimesPayload | null;
}) {
    const { seo, canonicalUrl, meteoBasePath, visibleDaily, activeDay, prayer, city } =
        options;

    const webpageId = `${canonicalUrl}#webpage`;
    const placeId = `${canonicalUrl}#place`;
    const breadcrumbId = `${canonicalUrl}#breadcrumb`;
    const weeklyId = `${canonicalUrl}#weekly-forecast`;

    const geo = {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lon,
    };

    const addressLine = buildAddressLine(city);

    const place: Record<string, unknown> = {
        "@type": "Place",
        "@id": placeId,
        name: city.name,
        description: addressLine,
        geo,
        address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: city.wilaya_name,
            addressCountry: "DZ",
        },
    };

    const breadcrumbItems: Record<string, unknown>[] = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: BRAND_URL,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: `Météo ${seo.cityName}`,
            item: `${BRAND_URL}${meteoBasePath}`,
        },
    ];

    if (seo.isDailyPage && seo.weekdayLabel) {
        breadcrumbItems.push({
            "@type": "ListItem",
            position: 3,
            name: seo.weekdayLabel,
        });
    }

    const forecastNodes = visibleDaily.map((day, index) =>
        buildWeatherForecastNode(day, placeId, index, canonicalUrl),
    );

    const graph: Record<string, unknown>[] = [
        {
            "@type": "WebPage",
            "@id": webpageId,
            url: canonicalUrl,
            name: seo.title,
            description: seo.description,
            isPartOf: { "@id": WEB_SITE_ID },
            about: { "@id": placeId },
            mainEntity: { "@id": weeklyId },
            breadcrumb: { "@id": breadcrumbId },
        },
        {
            "@type": "BreadcrumbList",
            "@id": breadcrumbId,
            itemListElement: breadcrumbItems,
        },
        place,
        ...forecastNodes,
        {
            "@type": "ItemList",
            "@id": weeklyId,
            name: `Prévisions sur ${visibleDaily.length} jours — ${city.name}`,
            description: `Prévisions journalières pour ${seo.cityName}: températures et conditions attendues.`,
            numberOfItems: visibleDaily.length,
            itemListElement: visibleDaily.map((_, index) => {
                const fragment =
                    index === 0 ? "weather-day" : `weather-day-${index}`;
                return {
                    "@type": "ListItem",
                    position: index + 1,
                    /** URL form — many validators reject bare `{ "@id" }` for ListItem.item. */
                    item: `${canonicalUrl}#${fragment}`,
                };
            }),
        },
    ];

    if (prayer) {
        const prayerParentId = `${canonicalUrl}#prayer-times`;
        const subEvents = prayer.prayers.map((p, i) => {
            const startDate = localDateTimeWithAlgiersOffset(
                activeDay.date,
                p.time,
            );
            return {
                "@type": "Event",
                "@id": `${canonicalUrl}#prayer-${i}`,
                name: p.name,
                startDate,
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                location: { "@id": placeId },
            };
        });

        graph.push({
            "@type": "Event",
            "@id": prayerParentId,
            name: `Horaires de prière — ${city.name}`,
            description: `Horaires des prières musulmanes et lever du soleil pour ${seo.cityName} (${activeDay.date}). Source: Aladhan API.`,
            startDate: localDateTimeWithAlgiersOffset(
                activeDay.date,
                prayer.prayers[0]?.time ?? "00:00",
            ),
            subEvent: subEvents.map((_, i) => ({
                "@id": `${canonicalUrl}#prayer-${i}`,
            })),
            location: { "@id": placeId },
        });

        graph.push(...subEvents);

        const webpage = graph[0] as Record<string, unknown>;
        webpage.mentions = { "@id": prayerParentId };
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}
