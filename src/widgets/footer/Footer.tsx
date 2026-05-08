import { Logo } from "@/shared/ui/logo";

export function Footer() {
    
    const year = new Date().getFullYear();

    return (
        <footer className="mt-12 border-t border-slate-200 bg-white/70">
            <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Logo />
                    <p className="text-xs text-slate-500 sm:text-sm">
                        © {year} imeteoalgerie.com. Tous droits reserves.
                    </p>
                </div>
            </div>
        </footer>
    );
}
