import { ALGERIA_CITIES } from "@/shared/constants/cities";
import type { CityListItem } from "@/shared/types/city";
import { normalize } from "./normalize";

export function searchCities(query: string, limit = 8): CityListItem[] {
    const q = normalize(query);
    if (!q) return [];

    const starts: CityListItem[] = [];
    const includes: CityListItem[] = [];

    for (const city of ALGERIA_CITIES) {
        const byName = normalize(city.name);
        const haystack = normalize(`${city.name} ${city.wilaya_name}`);
        if (byName.startsWith(q) || haystack.startsWith(q)) {
            starts.push(city);
        } else if (haystack.includes(q)) {
            includes.push(city);
        }
    } 

    return [...starts, ...includes].slice(0, limit);
}
