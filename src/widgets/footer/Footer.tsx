import Link from "next/link";
import { Logo } from "@/shared/ui/logo";

const footerLinks = [
    { href: "/", label: "Accueil" },
    { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
    { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-12 border-t border-slate-200">
            <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="flex justify-start">
                    <Logo />
                </div>
                <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500 sm:text-sm">
                        © {year} imeteoalgerie.com. Tous droits reserves.
                    </p>
                    <nav
                        aria-label="Liens de pied de page"
                        className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 sm:justify-end"
                    >
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="underline-offset-4 transition hover:text-slate-900 hover:underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
