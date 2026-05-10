import { ALGERIA_CITIES } from "@/shared/constants/cities";
import { getRegionLabelForWilayaName } from "@/shared/constants/region-by-wilaya";
import type { CityListItem } from "@/shared/types/city";
import { getMeteoCityKey } from "@/shared/utils/meteoCityPath";

export { getCityByMeteoSlugs } from "@/shared/utils/meteoCityPath";

/** Other communes in the same daïra (same wilaya, same `daira_name`). */
export function getCitiesInSameDaira(current: CityListItem): CityListItem[] {
  const selfKey = getMeteoCityKey(current);
  return ALGERIA_CITIES.filter(
    (other) =>
      getMeteoCityKey(other) !== selfKey &&
      other.wilaya_code === current.wilaya_code &&
      other.daira_name === current.daira_name,
  );
}

/** Other communes in the same wilaya (same wilaya code). */
export function getCitiesInSameWilaya(current: CityListItem): CityListItem[] {
  const selfKey = getMeteoCityKey(current);
  return ALGERIA_CITIES.filter(
    (other) =>
      getMeteoCityKey(other) !== selfKey &&
      other.wilaya_code === current.wilaya_code,
  );
}

/** Same macro-region, but wilayas other than the current city’s. */
export function getCitiesInSameRegionOtherWilayas(
  current: CityListItem,
): CityListItem[] {
  const region = getRegionLabelForWilayaName(current.wilaya_name);
  if (!region) return [];

  const selfKey = getMeteoCityKey(current);

  return ALGERIA_CITIES.filter((other) => {
    if (getMeteoCityKey(other) === selfKey) return false;
    if (other.wilaya_code === current.wilaya_code) return false;
    return getRegionLabelForWilayaName(other.wilaya_name) === region;
  });
}

export function getCitiesInSameRegion(current: CityListItem): CityListItem[] {
  const region = getRegionLabelForWilayaName(current.wilaya_name);
  if (!region) return [];

  const selfKey = getMeteoCityKey(current);

  return ALGERIA_CITIES.filter((other) => {
    if (getMeteoCityKey(other) === selfKey) return false;
    return getRegionLabelForWilayaName(other.wilaya_name) === region;
  });
}
