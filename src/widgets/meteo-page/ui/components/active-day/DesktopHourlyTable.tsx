import { formatHourTime, getHourNum } from "@/shared/utils/dateFormatters";
import { getWeatherCodeLabel } from "@/shared/utils/weatherCode";
import { formatWindCellAccessibility } from "@/shared/utils/windDirection";
import { WeatherCodeIcon } from "@/shared/ui/icons";
import type { DailyWeather } from "@/widgets/meteo-page/types";
import { useDesktopHourlyTableModel } from "@/widgets/meteo-page/ui/hooks/useDesktopHourlyTableModel";
import { WindDirectionIcon } from "./WindDirectionIcon";

interface DesktopHourlyTableProps {
    day: DailyWeather;
    nowIndex: number;
    isNightHour: (hour: number) => boolean;
}

function buildHourCellClass(
    idx: number,
    hourColCls: string,
    dividerCls: (idx: number) => string,
    nowCellCls: (idx: number) => string,
    baseClass = "",
): string {
    return `${baseClass} ${hourColCls} ${dividerCls(idx)} ${nowCellCls(idx)}`.trim();
}

const TdLeft = ({ children }: { children: React.ReactNode }) => {
    return (
        <td className="sticky left-0 whitespace-nowrap text-right z-10 bg-white px-2 py-0 text-center font-semibold text-slate-500 md:px-2 md:py-2">
            {children}
        </td>
    );
};

interface HourCellProps {
    idx: number;
    hourColCls: string;
    dividerCls: (idx: number) => string;
    nowCellCls: (idx: number) => string;
    baseClass?: string;
    children: React.ReactNode;
    cellAriaLabel?: string;
    cellTooltip?: string;
}

function ThHourCell({
    idx,
    hourColCls,
    dividerCls,
    nowCellCls,
    baseClass,
    children,
    cellAriaLabel,
    cellTooltip,
}: HourCellProps) {
    const resolvedBaseClass = baseClass ?? "whitespace-nowrap px-3 py-1";
    return (
        <th
            className={buildHourCellClass(
                idx,
                hourColCls,
                dividerCls,
                nowCellCls,
                resolvedBaseClass,
            )}
            {...(cellAriaLabel ? { "aria-label": cellAriaLabel } : {})}
            {...(cellTooltip ? { title: cellTooltip } : {})}
        >
            {children}
        </th>
    );
}

function TdHourCell({
    idx,
    hourColCls,
    dividerCls,
    nowCellCls,
    baseClass,
    children,
    cellAriaLabel,
    cellTooltip,
}: HourCellProps) {
    const resolvedBaseClass = baseClass ?? "whitespace-nowrap px-3 py-2 font-medium text-slate-900";
    return (
        <td
            className={buildHourCellClass(
                idx,
                hourColCls,
                dividerCls,
                nowCellCls,
                resolvedBaseClass,
            )}
            {...(cellAriaLabel ? { "aria-label": cellAriaLabel } : {})}
            {...(cellTooltip ? { title: cellTooltip } : {})}
        >
            {children}
        </td>
    );
}

export function DesktopHourlyTable({
    day,
    nowIndex,
    isNightHour,
}: DesktopHourlyTableProps) {
    const {
        hours,
        hourColCls,
        partOfDayGroups,
        dividerCls,
        nowTimeCellCls,
        nowDataCellCls,
    } = useDesktopHourlyTableModel(day, nowIndex);

    const dailyWeatherLabel = getWeatherCodeLabel(day.weatherCode);

    return (
        <div className="hidden flex-1 overflow-x-auto lg:block">
            <table className="min-w-full border-separate border-spacing-0 text-center text-[11px] md:text-xs">
                <thead>
                    <tr>
                        <th className="sticky left-0 z-10 bg-white px-3 py-2" />
                        {partOfDayGroups.map((group, idx) => (
                            <th
                                key={`part-${idx}`}
                                colSpan={group.count}
                                className={`whitespace-nowrap px-3 h-9 py-1 text-center text-sm font-semibold text-slate-700 ${idx > 0 ? "border-l border-slate-200" : ""}`}
                            >
                                {group.label}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="sticky left-0 z-10 bg-white px-3 py-2 text-center font-medium text-slate-600" />
                        {hours.map((hour, idx) => (
                            <ThHourCell
                                key={`time-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowTimeCellCls}
                                baseClass="bg-slate-50 font-medium text-slate-500"
                            >
                                {formatHourTime(hour.time)}
                            </ThHourCell>
                        ))}
                    </tr>
                    <tr>
                        <th className="sticky left-0 z-10 bg-white px-3 py-2" />
                        {hours.map((hour, idx) => {
                            const night = isNightHour(getHourNum(hour.time));
                            const timeLabel = formatHourTime(hour.time);
                            const condition = `${dailyWeatherLabel}${night ? " (nuit)" : ""}`;
                            return (
                                <ThHourCell
                                    key={`icon-${hour.time}`}
                                    idx={idx}
                                    hourColCls={hourColCls}
                                    dividerCls={dividerCls}
                                    nowCellCls={nowDataCellCls}
                                    cellAriaLabel={`${timeLabel}, ${condition}`}
                                    cellTooltip={`${timeLabel} — ${condition}`}
                                >
                                    <WeatherCodeIcon
                                        code={day.weatherCode}
                                        isNight={night}
                                        className="mx-auto h-7 w-7"
                                    />
                                </ThHourCell>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TdLeft>Temperature, °C</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`temp-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                                baseClass="text-sm md:text-lg h-8"
                            >
                                {hour.temperature > 0 ? "+" : ""}
                                {Math.round(hour.temperature)}°
                            </TdHourCell>
                        ))}
                    </tr>
                    <tr>
                        <TdLeft>Ressenti</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`feel-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                                baseClass="h-8 py-1.5 text-slate-500"
                            >
                                {hour.feelsLike >= 0 ? "+" : ""}
                                {Math.round(hour.feelsLike)}°
                            </TdHourCell>
                        ))}
                    </tr>
                    <tr>
                        <TdLeft>Pression, mm</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`pressure-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                                baseClass="bg-slate-50"
                            >
                                {Math.round(hour.pressure * 0.750062)}
                            </TdHourCell>
                        ))}
                    </tr>
                    <tr>
                        <TdLeft>Humidite, %</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`humidity-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                            >
                                {Math.round(hour.humidity)}
                            </TdHourCell>
                        ))}
                    </tr>
                    <tr>
                        <TdLeft>UV Index</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`uv-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                                baseClass="bg-slate-50"
                            >
                                {Math.round(hour.uvIndex)}
                            </TdHourCell>
                        ))}
                    </tr>
                    <tr>
                        <TdLeft>Vent, m/s</TdLeft>
                        {hours.map((hour, idx) => {
                            const speedMs = (hour.windSpeed / 3.6).toFixed(1);
                            const { ariaLabel, title } = formatWindCellAccessibility({
                                directionDeg: hour.windDirection,
                                speedMs,
                            });
                            return (
                                <TdHourCell
                                    key={`wind-${hour.time}`}
                                    idx={idx}
                                    hourColCls={hourColCls}
                                    dividerCls={dividerCls}
                                    nowCellCls={nowDataCellCls}
                                    baseClass="h-8 py-0.5"
                                    cellAriaLabel={ariaLabel}
                                    cellTooltip={title}
                                >
                                    <div className="flex items-center justify-center gap-1 leading-tight">
                                        <span className="grid min-w-5 min-h-5 w-5 place-items-center rounded-full bg-white shadow-sm">
                                            <WindDirectionIcon deg={hour.windDirection} />
                                        </span>
                                        <span>{speedMs}</span>
                                    </div>
                                </TdHourCell>
                            );
                        })}
                    </tr>
                    <tr>
                        <TdLeft>Qualite de l&apos;air (AQI)</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`aqi-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                                baseClass="bg-slate-50 px-2 md:px-3 py md:py-2"
                            >
                                {Math.round(hour.aqi ?? 0)}
                            </TdHourCell>
                        ))}
                    </tr>
                    <tr>
                        <TdLeft>Probabilite de precipitations, %</TdLeft>
                        {hours.map((hour, idx) => (
                            <TdHourCell
                                key={`precip-${hour.time}`}
                                idx={idx}
                                hourColCls={hourColCls}
                                dividerCls={dividerCls}
                                nowCellCls={nowDataCellCls}
                                baseClass="h-8 py-0.5 md:py-2"
                            >
                                {hour.precipitationProbability === 0 ? "-" : Math.round(hour.precipitationProbability)}
                            </TdHourCell>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
