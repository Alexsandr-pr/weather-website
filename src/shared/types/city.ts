export type CityCacheTier = 1 | 2 | 3;

export interface CityListItem {
  name: string;
  lat: number;
  lon: number;
  wilaya_code: string;
  wilaya_name: string;
  daira_name: string;
  /** API data cache freshness tier (see `REVALIDATE_BY_TIER`). */
  tier?: CityCacheTier;
}
