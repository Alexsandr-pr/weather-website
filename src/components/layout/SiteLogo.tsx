import Link from "next/link";
import { PartlyCloudyIcon } from "@/components/icons/WeatherIcons";
import Image from "next/image";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 rounded-2xl px-1 py-1"
    >
      <Image
        src="/logo.png"
        alt="imeteoalgerie.com"
        width={260}
        height={70}
       
      />
    </Link>
  );
}
