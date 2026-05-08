import { SiteLogo } from "@/components/layout/SiteLogo";
import { CitySearch } from "@/components/layout/CitySearch";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-default/70 bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="mx-auto flex w-full max-w-7xl py-2  flex-col gap-3 px-3 md:flex-row md:items-center sm:px-6 lg:px-8">
        <SiteLogo />
        <div className="w-full md:ml-auto md:max-w-md lg:max-w-lg">
          <CitySearch />
        </div>
      </div>
    </header>
  );
}
