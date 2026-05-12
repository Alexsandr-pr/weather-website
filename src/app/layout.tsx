import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND_NAME, BRAND_URL } from "@/shared/constants/brand";
import { JsonLd } from "@/shared/seo/JsonLd";
import { buildSiteJsonLd } from "@/shared/seo/schema/siteGraph";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export const viewport: Viewport = {
    themeColor: "#ffffff",
    width: "device-width",
    initialScale: 1
};
export const metadata: Metadata = {
    metadataBase: new URL(BRAND_URL),
    title: {
        default: `${BRAND_NAME} — météo en Algérie, 7 jours et horaires de prière`,
        template: `%s | ${BRAND_NAME}`,
    },
    description:
        "Météo en Algérie : prévisions détaillées pour aujourd’hui et sur 7 jours pour Alger, Oran, Constantine, Annaba et les principales villes du pays (températures, conditions, prévisions locales). Consultez aussi les horaires de prière (fajr, dhuhr, asr, maghreb, icha) par ville.",
    keywords: [
        "météo Algérie",
        "prévisions météo Algérie",
        "météo Alger",
        "météo 7 jours",
        "temps aujourd’hui Algérie",
        "villes algériennes",
        "horaires de prière",
        "salat Algérie",
        "heures de prière",
    ],
    openGraph: {
        type: "website",
        locale: "fr_DZ",
        siteName: BRAND_NAME,
        title: "Météo en Algérie — aujourd’hui et 7 jours, horaires de prière par ville",
        description:
            "Prévisions météo pour l’Algérie sur aujourd’hui et sept jours, et horaires des prières pour les grandes villes et communes.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Météo Algérie — 7 jours et horaires de prière",
        description:
            "Prévisions météo jour par jour dans les villes d’Algérie et horaires de prière islamiques.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${inter.variable} font-sans antialiased`}>
                <JsonLd data={buildSiteJsonLd()} />
                <div className="flex min-h-screen flex-col">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
