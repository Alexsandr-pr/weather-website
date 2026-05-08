export function normalize(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s'-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}