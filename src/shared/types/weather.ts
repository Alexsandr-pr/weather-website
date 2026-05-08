export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "thunderstorm"
  | "snow"
  | "fog"
  | "windy";

export type MoonPhase =
  | "new"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "full"
  | "waning-gibbous"
  | "last-quarter"
  | "waning-crescent";

export interface CityInfo {
  slug: string;
  name: string;
  nameLocative?: string;
  wilaya: string;
  region?: string;
  locality?: string;
  district?: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  conditionLabel: string;
  summary: string;
  high: number;
  low: number;
}

export interface WeatherDetails {
  windSpeed: number;
  windDirection: string;
  humidity: number;
  pressure: number;
  uvIndex: number;
  uvLabel: string;
  aqi: number;
  aqiLabel: string;
  visibility: number;
  sunrise: string;
  sunset: string;
  moonPhase: MoonPhase;
  moonPhaseLabel: string;
}

export interface HourlyForecastItem {
  time: string;
  hour: number;
  condition: WeatherCondition;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  windDirectionDeg: number;
  isNow?: boolean;
}

export interface DailyForecastItem {
  dayName: string;
  dayShort: string;
  date: string;
  isoDate: string;
  condition: WeatherCondition;
  conditionLabel: string;
  high: number;
  low: number;
  precipitation: number;
  windSpeed: number;
  isToday?: boolean;
}

export interface PrayerTime {
  name: string;
  time: string;
  isNext?: boolean;
}

export interface NearbyCity {
  slug: string;
  name: string;
}

export interface CityWeatherData {
  city: CityInfo;
  current: CurrentWeather;
  details: WeatherDetails;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  prayers: PrayerTime[];
  nearby: NearbyCity[];
}
