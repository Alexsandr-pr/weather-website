import { normalize } from "./normalize";

export function highlightMatch(text: string, query: string): Array<{ text: string; match: boolean }> {
    const source = normalize(text);
    const q = normalize(query);
    if (!q) return [{ text, match: false }];
    const idx = source.indexOf(q);
    if (idx < 0) return [{ text, match: false }];

    return [
        { text: text.slice(0, idx), match: false },
        { text: text.slice(idx, idx + q.length), match: true },
        { text: text.slice(idx + q.length), match: false },
    ];
}
