import type { PrayerTime } from "@/shared/types/weather";
import type { AladhanTimings } from "../types/aladhan";

const PRAYER_LABELS: Array<{ key: keyof AladhanTimings; label: string }> = [
  { key: "Fajr", label: "Fajr" },
  { key: "Sunrise", label: "Lever du soleil" },
  { key: "Dhuhr", label: "Dhuhr" },
  { key: "Asr", label: "Asr" },
  { key: "Maghrib", label: "Maghrib" },
  { key: "Isha", label: "Isha" },
];

function cleanTime(value: string): string {
  return value.split(" ")[0];
}

export function buildPrayerTimes(timings: AladhanTimings): PrayerTime[] {
  return PRAYER_LABELS.map(({ key, label }) => ({
    name: label,
    time: cleanTime(timings[key]),
  }));
}
