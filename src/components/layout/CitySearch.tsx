"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, MapPinIcon, SearchIcon } from "@/components/icons/UiIcons";
import { highlightMatch, searchCities, type CityListItem } from "@/data/cities";

export function CitySearch() {
  const router = useRouter();
  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo<CityListItem[]>(() => searchCities(query, 8), [query]);
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

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      role="combobox"
      aria-haspopup="listbox"
      aria-controls={listId}
      aria-expanded={show}
    >
      <div className="relative flex items-center">
        <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-secondary sm:h-5 sm:w-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Rechercher une ville..."
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="h-10 w-full rounded-full border border-border-default bg-surface pl-9 pr-9 text-sm text-primary shadow-sm outline-none transition placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent/20 sm:h-11 sm:text-[15px]"
        />
        {query && (
          <button
            type="button"
            aria-label="Effacer"
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              inputRef.current?.focus();
            }}
            className="absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-secondary transition hover:bg-surface-soft hover:text-secondary-strong"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {show && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border-default bg-surface shadow-[0_14px_34px_rgba(15,23,42,0.10)]">
          {hasResults ? (
            <ul ref={listRef} id={listId} role="listbox" className="max-h-80 overflow-y-auto py-1">
              {results.map((city, index) => {
                const active = index === activeIndex;
                const parts = highlightMatch(city.name, query);
                return (
                  <li
                    key={city.slug}
                    role="option"
                    aria-selected={active}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      goToCity(city);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition ${
                      active ? "bg-accent-soft text-accent-contrast" : "text-primary hover:bg-surface-soft"
                    }`}
                  >
                    <MapPinIcon className={`h-4 w-4 shrink-0 ${active ? "text-accent-strong" : "text-secondary"}`} />
                    <div className="min-w-0 flex-1">
                      <span className="truncate font-medium">
                        {parts.map((part, i) =>
                          part.match ? (
                            <mark key={i} className="bg-transparent font-semibold text-accent-strong">
                              {part.text}
                            </mark>
                          ) : (
                            <span key={i}>{part.text}</span>
                          ),
                        )}
                      </span>
                      <p className="truncate text-xs text-secondary">
                        {city.wilaya} - {city.country}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-secondary">
              Aucune ville trouvee pour <span className="font-medium text-primary">&quot;{query}&quot;</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
