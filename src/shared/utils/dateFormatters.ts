import { FRENCH_DAYS, FRENCH_MONTHS } from "@/shared/constants/french-calendar";

const DAY_SHORTS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export function getFrenchDayName(isoDate: string): string {
    return FRENCH_DAYS[new Date(`${isoDate}T00:00:00`).getDay()];
}

export function getFrenchDayShort(isoDate: string): string {
    return DAY_SHORTS[new Date(`${isoDate}T00:00:00`).getDay()];
}

export function formatDayMonth(isoDate: string): string {
    const date = new Date(`${isoDate}T00:00:00`);
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} ${FRENCH_MONTHS[date.getMonth()]}`;
}

export function formatHourTime(isoDateTime: string): string {
    return isoDateTime.split("T")[1]?.slice(0, 5) ?? "00:00";
}

export function getHourNum(isoDateTime: string): number {
    return Number(isoDateTime.split("T")[1]?.slice(0, 2) ?? "0");
}

export function todayIso(): string {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export function currentIsoHour(): string {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:00`;
}
