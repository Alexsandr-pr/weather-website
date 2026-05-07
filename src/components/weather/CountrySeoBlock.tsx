interface CountrySeoBlockProps {
  country: string;
  siteName: string;
}

export function CountrySeoBlock({ country, siteName }: CountrySeoBlockProps) {
  return (
    <section>
      <h2 className="text-sm font-medium text-slate-500 sm:text-base lg:text-lg">
        Meteo dans toutes les regions d&apos;{country}, previsions meteo par {siteName}
      </h2>
    </section>
  );
}
