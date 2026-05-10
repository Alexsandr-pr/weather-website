import { getHourNum } from "@/shared/utils/dateFormatters";
import type { HourlyWeather } from "@/widgets/meteo-page/types";

export function getPartOfDay(hour: number): string {
    if (hour < 6) return "Nuit";
    if (hour < 12) return "Matin";
    if (hour < 18) return "Jour";
    return "Soir";
}

export function buildPartOfDayGroups(hours: HourlyWeather[]): Array<{ label: string; count: number }> {
    const groups: { label: string; count: number }[] = [];

    hours.forEach((hour) => {
        const label = getPartOfDay(getHourNum(hour.time));
        const last = groups[groups.length - 1];

        if (last && last.label === label) {
            last.count += 1;
            return;
        }

        groups.push({ label, count: 1 });
    });

    return groups;
}

export function buildGroupStartIndices(
    groups: Array<{ label: string; count: number }>,
): Set<number> {
    const result = new Set<number>();
    let acc = 0;

    groups.forEach((group, index) => {
        if (index > 0) result.add(acc);
        acc += group.count;
    });

    return result;
}

export function formatSignedRoundedTemp(value: number): string {
    const rounded = Math.round(value);
    return `${rounded > 0 ? "+" : ""}${rounded}°`;
}
