"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { CityListItem } from "@/shared/types/city";
import { searchCities } from "../utils/searchCities";

interface UseSearchOptions {
    limit?: number;
}

export function useSearch({ limit = 8 }: UseSearchOptions = {}) {
    const router = useRouter();
    const listId = useId();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const results = useMemo<CityListItem[]>(() => searchCities(query, limit), [query, limit]);
    const hasResults = results.length > 0;
    const show = open && query.trim().length > 0;

    useEffect(() => {
        if (!open) return;
        const onDocClick = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    useEffect(() => {
        setActiveIndex(hasResults ? 0 : -1);
    }, [query, hasResults]);

    useEffect(() => {
        if (!listRef.current || activeIndex < 0) return;
        const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
        el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    const goToCity = (city: CityListItem) => {
        setOpen(false);
        setQuery("");
        setActiveIndex(-1);
        inputRef.current?.blur();
        router.push(`/meteo/${city.slug}`);
    };

    const clearQuery = () => {
        setQuery("");
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setOpen(true);
    };

    const onFocus = () => {
        if (query.trim()) setOpen(true);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!open) setOpen(true);
            if (!hasResults) return;
            setActiveIndex((prev) => (prev + 1) % results.length);
            return;
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!hasResults) return;
            setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
            return;
        }
        if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
            event.preventDefault();
            goToCity(results[activeIndex]);
            return;
        }
        if (event.key === "Escape") {
            setOpen(false);
            inputRef.current?.blur();
        }
    };

    return {
        listId,
        wrapperRef,
        inputRef,
        listRef,
        query,
        activeIndex,
        setActiveIndex,
        results,
        hasResults,
        show,
        goToCity,
        clearQuery,
        onChange,
        onFocus,
        onKeyDown,
    };
}
