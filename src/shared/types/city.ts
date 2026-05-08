export interface CityListItem {
  slug: string;
  name: string;
  nameLocative?: string;
  wilaya: string;
  region: string;
  locality?: string;
  district?: string;
  lat: number;
  lon: number;
}
