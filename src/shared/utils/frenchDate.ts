import { FRENCH_DAYS, FRENCH_MONTHS } from "@/shared/constants/frenchCalendar";

export function formatFrenchDate(date: Date): string {
  const dayName = FRENCH_DAYS[date.getDay()];
  const day = date.getDate();
  const month = FRENCH_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName} ${day} ${month} ${year}`;
}
