"use client";

import { CloseIcon, MapPinIcon, SearchIcon } from "@/shared/ui/icons";
import { highlightMatch } from "./utils/highlightMatch";
import { useSearch } from "./hooks";

export function Search() {
    const {
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
    } = useSearch();

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
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    spellCheck={false}
                    className="h-10 w-full rounded-full border border-border-default bg-surface pl-9 pr-9 text-sm text-primary shadow-sm outline-none transition placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent/20 sm:h-11 sm:text-[15px]"
                />
                {query && (
                    <button
                        type="button"
                        aria-label="Effacer"
                        onClick={clearQuery}
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
                                        className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition ${active ? "bg-accent-soft text-accent-contrast" : "text-primary hover:bg-surface-soft"
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
                                                {city.wilaya} - {city.region}
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
