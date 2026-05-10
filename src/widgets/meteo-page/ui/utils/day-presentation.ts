import { formatDayMonth, getFrenchDayName } from "@/shared/utils/dateFormatters";

export function getDayPresentation(isoDate: string) {
    const dayName = getFrenchDayName(isoDate);
    const [dayNum, ...monthParts] = formatDayMonth(isoDate).split(" ");

    return {
        dayName,
        dayNum,
        monthName: monthParts.join(" "),
    };
}
