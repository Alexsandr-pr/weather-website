import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_NAME, BRAND_URL } from "@/shared/constants/brand";

export const metadata: Metadata = {
    title: "Politique de confidentialité",
    description:
        `Politique de confidentialité de ${BRAND_NAME} : données techniques, services météo et horaires de prière utilisés par le site.`,
    alternates: {
        canonical: "/politique-de-confidentialite",
    },
    openGraph: {
        title: `Politique de confidentialité | ${BRAND_NAME}`,
        description:
            "Informations sur les données traitées lors de l'utilisation du site iMeteo Algérie.",
        url: `${BRAND_URL}/politique-de-confidentialite`,
        siteName: BRAND_NAME,
        locale: "fr_DZ",
        type: "article",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const sections = [
    {
        title: "1. Objet de cette politique",
        paragraphs: [
            `${BRAND_NAME} propose des prévisions météo, des informations de qualité de l'air et des horaires de prière pour les villes d'Algérie. Cette page explique quelles données peuvent être traitées lorsque vous consultez le site.`,
            "Le site ne propose pas de compte utilisateur, de formulaire d'inscription ni de paiement en ligne.",
        ],
    },
    {
        title: "2. Données traitées",
        paragraphs: [
            "Lorsque vous naviguez sur le site, des données techniques peuvent être traitées automatiquement par le serveur ou l'hébergeur : adresse IP, type de navigateur, système d'exploitation, pages consultées, date et heure de la visite.",
            "Ces informations sont utilisées pour afficher le site, assurer sa sécurité, diagnostiquer des erreurs techniques et mesurer la disponibilité du service.",
        ],
    },
    {
        title: "3. Recherche de ville et services externes",
        paragraphs: [
            "La recherche de ville sert uniquement à vous diriger vers la page météo correspondante. Elle n'est pas utilisée pour créer un profil personnel.",
            "Pour afficher les prévisions et les horaires de prière, le site interroge des services externes, notamment Open-Meteo pour la météo et la qualité de l'air, ainsi qu'Aladhan pour les horaires de prière. Les requêtes sont basées sur les coordonnées de la ville consultée.",
        ],
    },
    {
        title: "4. Cookies et stockage local",
        paragraphs: [
            "À ce jour, le site n'utilise pas de cookies publicitaires et ne stocke pas de données personnelles dans votre navigateur pour vous suivre d'une visite à l'autre.",
            "Si des outils de mesure d'audience, de publicité ou de personnalisation sont ajoutés ultérieurement, cette politique sera mise à jour avec les informations nécessaires.",
        ],
    },
    {
        title: "5. Durée de conservation",
        paragraphs: [
            "Les données techniques éventuellement conservées dans les journaux serveur le sont pour une durée limitée, nécessaire au fonctionnement, à la sécurité et à la maintenance du site.",
            "Les données météo et les horaires de prière peuvent être mis en cache temporairement afin d'améliorer la rapidité du service.",
        ],
    },
    {
        title: "6. Vos droits",
        paragraphs: [
            "Selon la réglementation applicable, vous pouvez demander l'accès, la rectification ou la suppression de données personnelles vous concernant, ainsi que vous opposer à certains traitements.",
            "Pour exercer ces droits ou poser une question sur cette politique, contactez l'éditeur du site par les moyens de contact officiels associés à imeteoalgerie.com.",
        ],
    },
    {
        title: "7. Mise à jour",
        paragraphs: [
            "Cette politique peut être modifiée pour tenir compte de l'évolution du site, des services utilisés ou des obligations légales.",
            "Dernière mise à jour : 12 mai 2026.",
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-3 py-10 sm:px-6 sm:py-14 lg:px-8">
            <article>
                <header className="mb-10">
                    <p className="text-sm font-medium text-accent-contrast">
                        {BRAND_NAME}
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                        Politique de confidentialité
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
                        Cette politique décrit de façon simple les données pouvant être traitées
                        lors de l&apos;utilisation de notre site météo.
                    </p>
                </header>

                <div className="space-y-8">
                    {sections.map((section) => (
                        <section key={section.title} className="space-y-3">
                            <h2 className="text-lg font-semibold text-primary sm:text-xl">
                                {section.title}
                            </h2>
                            {section.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="text-sm leading-7 text-secondary sm:text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}

                    <p className="text-sm leading-7 text-secondary sm:text-base">
                        Pour revenir aux prévisions météo, consultez la{" "}
                        <Link href="/" className="font-medium text-accent-strong hover:text-accent-contrast">
                            page d&apos;accueil
                        </Link>
                        .
                    </p>
                </div>
            </article>
        </main>
    );
}
