import { SiteLogo } from "@/components/layout/SiteLogo";

export function Header() {
  return (
    <header className="">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <SiteLogo />
      </div>
    </header>
  );
}
