"use client";

import { useMemo } from "react";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import {
    buildGroupStartIndices,
    buildPartOfDayGroups,
} from "@/widgets/meteo-page/ui/utils/active-day-hourly";

export function useDesktopHourlyTableModel(day: DailyWeather, nowIndex: number) {
    const hours = day.hours;
    const hourColCls = "w-[56px] min-w-[56px] max-w-[56px] md:w-[64px] md:min-w-[64px] md:max-w-[64px]";
    const partOfDayGroups = useMemo(() => buildPartOfDayGroups(hours), [hours]);
    const groupStartIndices = useMemo(
        () => buildGroupStartIndices(partOfDayGroups),
        [partOfDayGroups],
    );

    const dividerCls = (idx: number) =>
        groupStartIndices.has(idx) ? "border-l border-slate-200" : "";
    const nowTimeCellCls = (idx: number) =>
        idx === nowIndex ? "!bg-blue-200 text-blue-950" : "";
    const nowDataCellCls = (idx: number) =>
        idx === nowIndex ? "!bg-blue-100 text-blue-900" : "";

    return {
        hours,
        hourColCls,
        partOfDayGroups,
        dividerCls,
        nowTimeCellCls,
        nowDataCellCls,
    };
}
