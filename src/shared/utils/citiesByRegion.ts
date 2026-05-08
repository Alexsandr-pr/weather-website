import { ALGERIA_CITIES } from "@/shared/constants/cities";
import type { CityListItem } from "@/shared/types/city";

export function getCityBySlug(slug: string): CityListItem | undefined {
  return ALGERIA_CITIES.find((city) => city.slug === slug);
}

export function getCitiesInSameRegion(slug: string): CityListItem[] {
  const current = getCityBySlug(slug);
  if (!current) return [];

  return ALGERIA_CITIES.filter(
    (city) => city.region === current.region && city.slug !== current.slug,
  );
}
