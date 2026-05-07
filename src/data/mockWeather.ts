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
  wilaya: string;
  temperature: number;
  condition: WeatherCondition;
  distanceKm: number;
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

export const mockAlgerWeather: CityWeatherData = {
  city: {
    slug: "alger",
    name: "Алжир",
    nameLocative: "Алжире",
    wilaya: "Вилайя Алжир",
    region: "Вилайя Алжир",
    locality: "г Алжир",
    district: "городской округ",
    country: "Алжир",
    countryCode: "DZ",
    latitude: 36.7538,
    longitude: 3.0588,
  },
  current: {
    temperature: 24,
    feelsLike: 26,
    condition: "partly-cloudy",
    conditionLabel: "Переменная облачность",
    summary:
      "Мягкая и комфортная погода с периодической облачностью. Легкий ветер со стороны Средиземного моря и умеренная влажность.",
    high: 27,
    low: 18,
  },
  details: {
    windSpeed: 14,
    windDirection: "Северо-запад",
    humidity: 62,
    pressure: 1015,
    uvIndex: 6,
    uvLabel: "Высокий",
    aqi: 42,
    aqiLabel: "Хорошее",
    visibility: 10,
    sunrise: "06:42",
    sunset: "19:18",
    moonPhase: "waxing-gibbous",
    moonPhaseLabel: "Растущая луна",
  },
  hourly: [
    { time: "00:00", hour: 0, condition: "rain", temperature: 19, precipitation: 70, windSpeed: 12, windDirectionDeg: 320 },
    { time: "01:00", hour: 1, condition: "rain", temperature: 18, precipitation: 55, windSpeed: 12, windDirectionDeg: 320 },
    { time: "02:00", hour: 2, condition: "cloudy", temperature: 18, precipitation: 25, windSpeed: 10, windDirectionDeg: 310 },
    { time: "03:00", hour: 3, condition: "cloudy", temperature: 18, precipitation: 15, windSpeed: 9, windDirectionDeg: 300 },
    { time: "04:00", hour: 4, condition: "cloudy", temperature: 17, precipitation: 10, windSpeed: 8, windDirectionDeg: 290 },
    { time: "05:00", hour: 5, condition: "partly-cloudy", temperature: 17, precipitation: 5, windSpeed: 8, windDirectionDeg: 280 },
    { time: "06:00", hour: 6, condition: "partly-cloudy", temperature: 18, precipitation: 0, windSpeed: 9, windDirectionDeg: 270 },
    { time: "07:00", hour: 7, condition: "clear", temperature: 19, precipitation: 0, windSpeed: 10, windDirectionDeg: 260 },
    { time: "08:00", hour: 8, condition: "clear", temperature: 21, precipitation: 0, windSpeed: 11, windDirectionDeg: 250 },
    { time: "09:00", hour: 9, condition: "clear", temperature: 22, precipitation: 0, windSpeed: 12, windDirectionDeg: 240 },
    { time: "10:00", hour: 10, condition: "clear", temperature: 23, precipitation: 0, windSpeed: 13, windDirectionDeg: 230 },
    { time: "11:00", hour: 11, condition: "partly-cloudy", temperature: 24, precipitation: 0, windSpeed: 14, windDirectionDeg: 210 },
    { time: "12:00", hour: 12, condition: "partly-cloudy", temperature: 25, precipitation: 5, windSpeed: 14, windDirectionDeg: 200 },
    { time: "13:00", hour: 13, condition: "partly-cloudy", temperature: 24, precipitation: 5, windSpeed: 14, windDirectionDeg: 190, isNow: true },
    { time: "14:00", hour: 14, condition: "partly-cloudy", temperature: 25, precipitation: 5, windSpeed: 15, windDirectionDeg: 200 },
    { time: "15:00", hour: 15, condition: "clear", temperature: 26, precipitation: 0, windSpeed: 16, windDirectionDeg: 220 },
    { time: "16:00", hour: 16, condition: "clear", temperature: 27, precipitation: 0, windSpeed: 16, windDirectionDeg: 240 },
    { time: "17:00", hour: 17, condition: "clear", temperature: 26, precipitation: 0, windSpeed: 15, windDirectionDeg: 260 },
    { time: "18:00", hour: 18, condition: "partly-cloudy", temperature: 25, precipitation: 0, windSpeed: 13, windDirectionDeg: 280 },
    { time: "19:00", hour: 19, condition: "partly-cloudy", temperature: 23, precipitation: 0, windSpeed: 12, windDirectionDeg: 300 },
    { time: "20:00", hour: 20, condition: "cloudy", temperature: 22, precipitation: 10, windSpeed: 11, windDirectionDeg: 310 },
    { time: "21:00", hour: 21, condition: "cloudy", temperature: 21, precipitation: 15, windSpeed: 10, windDirectionDeg: 320 },
    { time: "22:00", hour: 22, condition: "cloudy", temperature: 20, precipitation: 20, windSpeed: 9, windDirectionDeg: 330 },
    { time: "23:00", hour: 23, condition: "rain", temperature: 19, precipitation: 60, windSpeed: 11, windDirectionDeg: 340 },
  ],
  daily: [
    {
      dayName: "Среда",
      dayShort: "Ср",
      date: "06 мая",
      isoDate: "2026-05-06",
      condition: "partly-cloudy",
      conditionLabel: "Переменная облачность",
      high: 27,
      low: 18,
      precipitation: 20,
      windSpeed: 14,
      isToday: true,
    },
    {
      dayName: "Четверг",
      dayShort: "Чт",
      date: "07 мая",
      isoDate: "2026-05-07",
      condition: "rain",
      conditionLabel: "Небольшой дождь",
      high: 23,
      low: 16,
      precipitation: 65,
      windSpeed: 18,
    },
    {
      dayName: "Пятница",
      dayShort: "Пт",
      date: "08 мая",
      isoDate: "2026-05-08",
      condition: "cloudy",
      conditionLabel: "Облачно",
      high: 22,
      low: 15,
      precipitation: 30,
      windSpeed: 16,
    },
    {
      dayName: "Суббота",
      dayShort: "Сб",
      date: "09 мая",
      isoDate: "2026-05-09",
      condition: "partly-cloudy",
      conditionLabel: "Переменная облачность",
      high: 24,
      low: 16,
      precipitation: 10,
      windSpeed: 12,
    },
    {
      dayName: "Воскресенье",
      dayShort: "Вс",
      date: "10 мая",
      isoDate: "2026-05-10",
      condition: "clear",
      conditionLabel: "Солнечно",
      high: 26,
      low: 17,
      precipitation: 0,
      windSpeed: 10,
    },
    {
      dayName: "Понедельник",
      dayShort: "Пн",
      date: "11 мая",
      isoDate: "2026-05-11",
      condition: "clear",
      conditionLabel: "Солнечно",
      high: 28,
      low: 19,
      precipitation: 0,
      windSpeed: 11,
    },
    {
      dayName: "Вторник",
      dayShort: "Вт",
      date: "12 мая",
      isoDate: "2026-05-12",
      condition: "partly-cloudy",
      conditionLabel: "Переменная облачность",
      high: 27,
      low: 19,
      precipitation: 5,
      windSpeed: 13,
    },
    {
      dayName: "Среда",
      dayShort: "Ср",
      date: "13 мая",
      isoDate: "2026-05-13",
      condition: "cloudy",
      conditionLabel: "Облачно",
      high: 25,
      low: 18,
      precipitation: 15,
      windSpeed: 14,
    },
    {
      dayName: "Четверг",
      dayShort: "Чт",
      date: "14 мая",
      isoDate: "2026-05-14",
      condition: "rain",
      conditionLabel: "Небольшой дождь",
      high: 22,
      low: 16,
      precipitation: 55,
      windSpeed: 17,
    },
    {
      dayName: "Пятница",
      dayShort: "Пт",
      date: "15 мая",
      isoDate: "2026-05-15",
      condition: "partly-cloudy",
      conditionLabel: "Переменная облачность",
      high: 24,
      low: 17,
      precipitation: 10,
      windSpeed: 12,
    },
  ],
  prayers: [
    { name: "Fajr", time: "04:38" },
    { name: "Восход", time: "06:12" },
    { name: "Dhuhr", time: "12:48" },
    { name: "Asr", time: "16:32", isNext: true },
    { name: "Maghrib", time: "19:18" },
    { name: "Isha", time: "20:42" },
  ],
  nearby: [
    { slug: "blida", name: "Блида", wilaya: "Вилайя Блида", temperature: 25, condition: "partly-cloudy", distanceKm: 47 },
    { slug: "boumerdes", name: "Бумердес", wilaya: "Вилайя Бумердес", temperature: 23, condition: "partly-cloudy", distanceKm: 50 },
    { slug: "tipaza", name: "Типаза", wilaya: "Вилайя Типаза", temperature: 22, condition: "clear", distanceKm: 68 },
    { slug: "medea", name: "Медеа", wilaya: "Вилайя Медеа", temperature: 20, condition: "cloudy", distanceKm: 88 },
    { slug: "tizi-ouzou", name: "Тизи-Узу", wilaya: "Вилайя Тизи-Узу", temperature: 21, condition: "partly-cloudy", distanceKm: 100 },
    { slug: "bejaia", name: "Беджая", wilaya: "Вилайя Беджая", temperature: 22, condition: "clear", distanceKm: 220 },
    { slug: "oran", name: "Оран", wilaya: "Вилайя Оран", temperature: 24, condition: "clear", distanceKm: 432 },
    { slug: "constantine", name: "Константина", wilaya: "Вилайя Константина", temperature: 19, condition: "cloudy", distanceKm: 431 },
  ],
};

export function getCityWeather(slug: string): CityWeatherData | null {
  if (slug.toLowerCase() === "alger") {
    return mockAlgerWeather;
  }
  return null;
}

export const RUSSIAN_DAYS = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const RUSSIAN_MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function formatRussianDate(date: Date): string {
  const dayName = RUSSIAN_DAYS[date.getDay()];
  const day = date.getDate();
  const month = RUSSIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName} ${day} ${month} ${year}`;
}
