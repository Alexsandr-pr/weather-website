import { BRAND_NAME, BRAND_URL } from "@/shared/constants/brand";

const organizationId = `${BRAND_URL}/#organization`;
const websiteId = `${BRAND_URL}/#website`;

export function buildSiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: BRAND_NAME,
                url: BRAND_URL,
                logo: {
                    "@type": "ImageObject",
                    url: `${BRAND_URL}/favicon.ico`,
                },
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                name: BRAND_NAME,
                url: BRAND_URL,
                inLanguage: "fr-DZ",
                publisher: { "@id": organizationId },
            },
        ],
    };
}
