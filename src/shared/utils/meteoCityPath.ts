import slugify from "slugify";

import { ALGERIA_CITIES } from "@/shared/constants/cities";
import type { CityListItem } from "@/shared/types/city";

export function meteoUrlSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: "fr" });
}

export function getMeteoCityPathSlugs(city: CityListItem) {
  return {
    wilayaSlug: meteoUrlSlug(city.wilaya_name),
    citySlug: meteoUrlSlug(city.name),
  };
}

/** Optional forecast-day segment for `[[...forecastDay]]` (e.g. dimanche). */
export function buildMeteoPathFromSlugs(
  wilayaSlug: string,
  citySlug: string,
  forecastDaySlug?: string,
): string {
  const base = `/meteo/${wilayaSlug}/${citySlug}`;
  const day = forecastDaySlug?.toLowerCase();
  if (!day) return base;
  return `${base}/${day}`;
}

export function buildMeteoCityBasePath(city: CityListItem): string {
  const { wilayaSlug, citySlug } = getMeteoCityPathSlugs(city);
  return buildMeteoPathFromSlugs(wilayaSlug, citySlug);
}

export function getCityByMeteoSlugs(
  wilayaSlug: string,
  citySlug: string,
): CityListItem | undefined {
  const w = wilayaSlug.toLowerCase();
  const c = citySlug.toLowerCase();
  return ALGERIA_CITIES.find((city) => {
    const s = getMeteoCityPathSlugs(city);
    return s.wilayaSlug === w && s.citySlug === c;
  });
}

export function getMeteoCityKey(city: CityListItem): string {
  const { wilayaSlug, citySlug } = getMeteoCityPathSlugs(city);
  return `${wilayaSlug}/${citySlug}`;
}
