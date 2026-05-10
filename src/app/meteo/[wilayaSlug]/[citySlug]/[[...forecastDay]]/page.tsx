import type { Metadata } from "next";
import { BRAND_NAME } from "@/shared/constants/brand";
import { getMeteoPageSeo } from "@/shared/seo/meteo-seo";
import { MeteoPage } from "@/widgets/meteo-page";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        wilayaSlug: string;
        citySlug: string;
        forecastDay?: string[];
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { wilayaSlug, citySlug, forecastDay } = await params;

    const seo = getMeteoPageSeo(wilayaSlug, citySlug, forecastDay);

    const title = seo.title;
    const description = seo.description;

    const weekdayLower = seo.weekdayLabel?.toLowerCase();

    const keywordSuffix = weekdayLower
        ? [
            `météo ${seo.cityName} ${weekdayLower}`,
            `prévisions météo ${seo.cityName} ${weekdayLower}`,
            `température ${seo.cityName} ${weekdayLower}`,
            `horaires de prière ${seo.cityName} ${weekdayLower}`,
        ]
        : [
            `météo ${seo.cityName} aujourd’hui`,
            `météo ${seo.cityName} 7 jours`,
            `horaires de prière ${seo.cityName}`,
        ];

    const keywords = [
        "météo Algérie",
        "prévisions météo Algérie",

        `météo ${seo.cityName}`,
        `prévisions météo ${seo.cityName}`,

        ...keywordSuffix,

        `température ${seo.cityName}`,
        `vent ${seo.cityName}`,
        `pluie ${seo.cityName}`,
        `UV ${seo.cityName}`,
        `qualité de l’air ${seo.cityName}`,

        "horaires de prière",
        "fajr",
        "dhuhr",
        "asr",
        "maghreb",
        "icha",
    ];

    return {
        title,
        description,

        keywords,

        alternates: {
            canonical: seo.canonicalPath,
        },

        category: "weather",

        openGraph: {
            type: "website",
            locale: "fr_DZ",
            siteName: BRAND_NAME,

            url: seo.canonicalPath,

            title,
            description,
        },

        twitter: {
            card: "summary_large_image",

            title,
            description,
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { wilayaSlug, citySlug, forecastDay } = await params;

    if (forecastDay && forecastDay.length > 1) {
        notFound();
    }

    const forecastDaySlug = forecastDay?.[0];

    return (
        <MeteoPage
            wilayaSlug={wilayaSlug}
            citySlug={citySlug}
            forecastDaySlug={forecastDaySlug}
        />
    );
}
