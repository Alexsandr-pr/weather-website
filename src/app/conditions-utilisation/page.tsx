import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_NAME, BRAND_URL } from "@/shared/constants/brand";

export const metadata: Metadata = {
    title: "Conditions d'utilisation",
    description:
        `Conditions d'utilisation de ${BRAND_NAME} : règles d'accès au site, limites des informations météo et responsabilités.`,
    alternates: {
        canonical: "/conditions-utilisation",
    },
    openGraph: {
        title: `Conditions d'utilisation | ${BRAND_NAME}`,
        description:
            "Règles applicables à l'utilisation du site iMeteo Algérie.",
        url: `${BRAND_URL}/conditions-utilisation`,
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
        title: "1. Acceptation des conditions",
        paragraphs: [
            `En consultant ${BRAND_NAME}, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous devez cesser d'utiliser le site.`,
            "Ces conditions peuvent être mises à jour afin de tenir compte de l'évolution du site, des services utilisés ou des obligations légales.",
        ],
    },
    {
        title: "2. Objet du site",
        paragraphs: [
            `${BRAND_NAME} fournit des prévisions météo, des informations de qualité de l'air et des horaires de prière pour les villes d'Algérie.`,
            "Les informations sont proposées à titre indicatif et ne remplacent pas les alertes officielles, les consignes des autorités ou les services spécialisés.",
        ],
    },
    {
        title: "3. Disponibilité et exactitude des informations",
        paragraphs: [
            "Nous faisons nos meilleurs efforts pour afficher des informations utiles et à jour, mais nous ne garantissons pas l'exactitude permanente, l'exhaustivité ou la disponibilité continue du service.",
            "Les données météo, la qualité de l'air et les horaires de prière peuvent dépendre de services externes, de caches techniques ou de paramètres de calcul.",
        ],
    },
    {
        title: "4. Utilisation autorisée",
        paragraphs: [
            "Vous vous engagez à utiliser le site de manière normale, légale et respectueuse de son fonctionnement.",
            "Il est interdit de tenter de perturber le site, d'accéder à des zones non autorisées, d'automatiser des requêtes abusives ou de réutiliser le contenu d'une manière qui porterait atteinte au service.",
        ],
    },
    {
        title: "5. Propriété intellectuelle",
        paragraphs: [
            "Les textes, éléments graphiques, interfaces, logos et contenus propres au site sont protégés par les droits applicables.",
            "Toute reproduction, adaptation ou redistribution non autorisée de ces éléments est interdite, sauf autorisation préalable ou exception prévue par la loi.",
        ],
    },
    {
        title: "6. Liens et services tiers",
        paragraphs: [
            "Le site peut utiliser ou mentionner des services tiers, notamment pour les prévisions météo, la qualité de l'air et les horaires de prière.",
            "Nous ne contrôlons pas ces services tiers et ne sommes pas responsables de leur disponibilité, de leurs contenus ou de leurs propres conditions d'utilisation.",
        ],
    },
    {
        title: "7. Responsabilité",
        paragraphs: [
            "L'utilisation des informations affichées sur le site se fait sous votre responsabilité. Avant toute décision importante liée à la météo, vérifiez les informations auprès de sources officielles.",
            "Dans les limites autorisées par la loi, le site ne pourra pas être tenu responsable des dommages directs ou indirects liés à l'utilisation ou à l'indisponibilité du service.",
        ],
    },
    {
        title: "8. Contact et mise à jour",
        paragraphs: [
            "Pour toute question concernant ces conditions, contactez l'éditeur du site par les moyens de contact officiels associés à imeteoalgerie.com.",
            "Dernière mise à jour : 12 mai 2026.",
        ],
    },
];

export default function TermsOfUsePage() {
    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-3 py-10 sm:px-6 sm:py-14 lg:px-8">
            <article>
                <header className="mb-10">
                    <p className="text-sm font-medium text-accent-contrast">
                        {BRAND_NAME}
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                        Conditions d&apos;utilisation
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
                        Ces conditions définissent les règles d&apos;accès et d&apos;utilisation
                        du site.
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
                        Vous pouvez également consulter notre{" "}
                        <Link
                            href="/politique-de-confidentialite"
                            className="font-medium text-accent-strong hover:text-accent-contrast"
                        >
                            politique de confidentialité
                        </Link>
                        .
                    </p>
                </div>
            </article>
        </main>
    );
}
