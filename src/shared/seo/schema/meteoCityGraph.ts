import { BRAND_URL } from "@/shared/constants/brand";
import { buildAddressLine } from "@/shared/utils/buildAddressLine";
import { getWeatherCodeLabel } from "@/shared/utils/weatherCode";
import type { MeteoPageSeo } from "@/shared/seo/meteo-seo";
import type { CityListItem } from "@/shared/types/city";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import {
    dayBoundsIso,
    localDateTimeWithAlgiersOffset,
} from "./helpers";

const WEB_SITE_ID = `${BRAND_URL}/#website`;

/**
 * Day blocks use `CreativeWork` only, metrics in `additionalProperty` — avoids validators
 * inferring `WeatherForecast` from `highTemperature` / `place` / `ItemList.item`.
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

function forecastDayFragment(index: number): string {
    return index === 0 ? "weather-day" : `weather-day-${index}`;
}

function buildForecastDayNode(
    day: DailyWeather,
    placeId: string,
    index: number,
    baseUrl: string,
) {
    const fragment = forecastDayFragment(index);
    const { validFrom, validThrough } = dayBoundsIso(day.date);
    const condition = getWeatherCodeLabel(day.weatherCode);
    const windAvg = averageNumber(day.hours.map((h) => h.windSpeed));
    const humidityAvg = averageNumber(day.hours.map((h) => h.humidity));
    const pressureAvg = averageNumber(day.hours.map((h) => h.pressure));

    const additional: Record<string, unknown>[] = [
        {
            "@type": "PropertyValue",
            name: "Température maximale",
            value: Math.round(day.maxTemperature * 10) / 10,
            unitText: "°C",
        },
        {
            "@type": "PropertyValue",
            name: "Température minimale",
            value: Math.round(day.minTemperature * 10) / 10,
            unitText: "°C",
        },
    ];

    if (windAvg != null) {
        additional.push({
            "@type": "PropertyValue",
            name: "Vent moyen (km/h)",
            value: windAvg,
        });
    }

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

    const node: Record<string, unknown> = {
        "@type": FORECAST_DAY_TYPE,
        "@id": `${baseUrl}#${fragment}`,
        name: `Prévisions du ${day.date} — ${condition}`,
        description: `${condition}. Température max. ${Math.round(day.maxTemperature)} °C, min. ${Math.round(day.minTemperature)} °C. Source des données météo: Open-Meteo.`,
        temporalCoverage: `${validFrom}/${validThrough}`,
        spatialCoverage: { "@id": placeId },
        additionalProperty: additional,
    };

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
        buildForecastDayNode(day, placeId, index, canonicalUrl),
    );

    const hasPart = visibleDaily.map((_, index) => ({
        "@id": `${canonicalUrl}#${forecastDayFragment(index)}`,
    }));

    const graph: Record<string, unknown>[] = [
        {
            "@type": "WebPage",
            "@id": webpageId,
            url: canonicalUrl,
            name: seo.title,
            description: seo.description,
            isPartOf: { "@id": WEB_SITE_ID },
            about: { "@id": placeId },
            /** No ItemList — strict validators choke on ListItem.item for forecast nodes. */
            mainEntity: { "@id": placeId },
            hasPart,
            breadcrumb: { "@id": breadcrumbId },
        },
        {
            "@type": "BreadcrumbList",
            "@id": breadcrumbId,
            itemListElement: breadcrumbItems,
        },
        place,
        ...forecastNodes,
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
