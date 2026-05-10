export type CityCacheTier = 1 | 2 | 3;

export interface CityListItem {
  name: string;
  lat: number;
  lon: number;
  wilaya_code: string;
  wilaya_name: string;
  daira_name: string;
  /** Niveau de fraîcheur du cache API (voir `REVALIDATE_BY_TIER`). */
  tier?: CityCacheTier;
}
