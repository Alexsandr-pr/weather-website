interface CountrySeoBlockProps {
  country: string;
  siteName: string;
}

export function CountrySeoBlock({ country, siteName }: CountrySeoBlockProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-slate-500 sm:text-xl">
          Meteo dans toutes les regions d&apos;{country}, previsions meteo par {siteName}
        </h2>
    </section>
  );
}
