"use client";

import { useEffect, useState } from "react";
import { currentIsoHour } from "@/shared/utils/dateFormatters";

export function useCurrentIsoHour(): string {
    const [nowIso, setNowIso] = useState<string>("");

    useEffect(() => {
        setNowIso(currentIsoHour());
        const id = setInterval(() => setNowIso(currentIsoHour()), 60_000);
        return () => clearInterval(id);
    }, []);

    return nowIso;
}
