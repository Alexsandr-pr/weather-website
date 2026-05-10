import { CityListItem } from "@/shared/types/city";

export function buildAddressLine(city: CityListItem): string {
    const parts = [
        city.wilaya,
        city.locality ?? city.nameLocative ?? city.name,
        'Algerie',
    ].filter(Boolean) as string[];

    return parts.join(", ");
}
