import { ALGERIA_CITIES } from "@/shared/constants/cities";
import { getRegionLabelForWilayaName } from "@/shared/constants/region-by-wilaya";
import type { CityListItem } from "@/shared/types/city";
import { getMeteoCityKey } from "@/shared/utils/meteoCityPath";

export { getCityByMeteoSlugs } from "@/shared/utils/meteoCityPath";

export function getCitiesInSameRegion(current: CityListItem): CityListItem[] {
  const region = getRegionLabelForWilayaName(current.wilaya_name);
  if (!region) return [];

  const selfKey = getMeteoCityKey(current);

  return ALGERIA_CITIES.filter((other) => {
    if (getMeteoCityKey(other) === selfKey) return false;
    return getRegionLabelForWilayaName(other.wilaya_name) === region;
  });
}
