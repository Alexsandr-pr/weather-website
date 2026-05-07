import Link from "next/link";
import { PartlyCloudyIcon } from "@/components/icons/WeatherIcons";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 rounded-2xl px-1 py-1"
    >
    
        <PartlyCloudyIcon className="h-12 w-12" />
      
      <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        iMeteoAlgerie.com
      </span>
    </Link>
  );
}
