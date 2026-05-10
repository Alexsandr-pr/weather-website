import { CityListItem } from "@/shared/types/city";

export function buildAddressLine(city: CityListItem): string {
    const parts = [
        city.name,
        city.wilaya_name !== city.name
            ? city.wilaya_name
            : undefined,
        "Algérie",
    ].filter(Boolean);

    return parts.join(", ");
}