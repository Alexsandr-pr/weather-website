import type { AladhanResponse } from "../types/aladhan";

const ALADHAN_BASE = "https://api.aladhan.com/v1";
const ALGERIA_METHOD = 19;
const REVALIDATE_SECONDS = 60 * 60 * 24;

function formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

export async function fetchPrayerTimings(
    lat: number,
    lon: number,
    date: Date = new Date(),
): Promise<AladhanResponse> {
    const url = new URL(`${ALADHAN_BASE}/timings/${formatDate(date)}`);
    
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("method", String(ALGERIA_METHOD));

    const res = await fetch(url.toString(), {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
        throw new Error(`AlAdhan API error: ${res.status}`);
    }

    return res.json();
}
