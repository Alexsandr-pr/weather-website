import Link from "next/link";
import { BRAND_NAME } from "@/shared/constants/brand";

function WeatherNotFoundIllustration() {
    return (
        <svg
            viewBox="0 0 520 360"
            role="img"
            aria-labelledby="not-found-title"
            className="mx-auto h-auto w-full max-w-md"
        >
            <title id="not-found-title">Illustration météo pour une page introuvable</title>
            <defs>
                <linearGradient id="sunGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="cloudGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dbeafe" />
                </linearGradient>
                <linearGradient id="screenGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#eff6ff" />
                    <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
            </defs>

            <circle cx="380" cy="88" r="46" fill="url(#sunGradient)" opacity="0.95" />
            <g stroke="#f59e0b" strokeLinecap="round" strokeWidth="7" opacity="0.65">
                <path d="M380 22v-14" />
                <path d="M380 168v-14" />
                <path d="M314 88h-14" />
                <path d="M460 88h-14" />
                <path d="m333 41-10-10" />
                <path d="m437 145-10-10" />
                <path d="m427 41 10-10" />
                <path d="m323 145 10-10" />
            </g>

            <ellipse cx="260" cy="306" rx="178" ry="18" fill="#bfdbfe" opacity="0.45" />

            <g transform="translate(122 86)">
                <rect
                    x="42"
                    y="70"
                    width="236"
                    height="150"
                    rx="28"
                    fill="url(#screenGradient)"
                    stroke="#2563eb"
                    strokeWidth="6"
                />
                <path d="M110 242h100" stroke="#2563eb" strokeLinecap="round" strokeWidth="8" />
                <path d="M160 220v22" stroke="#2563eb" strokeLinecap="round" strokeWidth="8" />
                <text
                    x="160"
                    y="160"
                    fill="#1d4ed8"
                    fontFamily="Arial, sans-serif"
                    fontSize="58"
                    fontWeight="700"
                    textAnchor="middle"
                >
                    404
                </text>
                <path
                    d="M95 72c9-31 38-53 72-53 29 0 55 16 68 40 5-2 11-3 17-3 30 0 54 24 54 54s-24 54-54 54H88c-33 0-60-27-60-60s27-60 60-60c2 0 5 0 7 1Z"
                    fill="url(#cloudGradient)"
                    stroke="#93c5fd"
                    strokeWidth="6"
                />
                <g stroke="#3b82f6" strokeLinecap="round" strokeWidth="7">
                    <path d="M90 190v18" />
                    <path d="M126 200v18" />
                    <path d="M232 190v18" />
                    <path d="M268 200v18" />
                </g>
            </g>
        </svg>
    );
}

export default function NotFound() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                <section className="order-2 text-center lg:order-1 lg:text-left">
                    <p className="text-sm font-medium text-accent-contrast">
                        {BRAND_NAME}
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                        Page introuvable
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-secondary sm:text-lg">
                        La page que vous recherchez n&apos;existe pas, a été déplacée ou
                        l&apos;adresse saisie contient une erreur.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary-inverse shadow-sm transition hover:bg-accent-strong"
                        >
                            Retour à l&apos;accueil
                        </Link>
                        <Link
                            href="/meteo/alger/alger-centre"
                            className="inline-flex items-center justify-center rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-secondary-strong transition hover:border-accent hover:text-accent-contrast"
                        >
                            Voir la météo d&apos;Alger Centre
                        </Link>
                    </div>
                </section>

                <div className="order-1 lg:order-2">
                    <WeatherNotFoundIllustration />
                </div>
            </div>
        </main>
    );
}
