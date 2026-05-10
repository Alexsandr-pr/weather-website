import {
    getMoonIlluminationPercent,
    getMoonPhase,
    getMoonPhaseLabel,
    getMoonPhaseValue,
} from "@/shared/utils/moonPhase";

export function getMoonSummary(isoDate: string) {
    const moonPhase = getMoonPhase(isoDate);

    return {
        moonValue: getMoonPhaseValue(isoDate),
        moonIllumination: getMoonIlluminationPercent(isoDate),
        moonPhaseLabel: getMoonPhaseLabel(moonPhase),
    };
}
