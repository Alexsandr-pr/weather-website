import Link from "next/link";
import Image from "next/image";

export function SiteLogo() {
  return (
    <Link
      href="/"
    >
      <Image
        src="/logo.png"
        alt="imeteoalgerie.com"
        width={260}
        height={70}
        className="w-auto h-12 lg:h-[60px]"
        priority
      />
    </Link>
  );
}
