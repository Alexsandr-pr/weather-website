export interface CityListItem {
  slug: string;
  name: string;
  wilaya: string;
  country: string;
}

export const ALGERIA_CITIES: CityListItem[] = [
  { slug: "alger", name: "Alger", wilaya: "Wilaya d'Alger", country: "Algerie" },
  { slug: "oran", name: "Oran", wilaya: "Wilaya d'Oran", country: "Algerie" },
  { slug: "constantine", name: "Constantine", wilaya: "Wilaya de Constantine", country: "Algerie" },
  { slug: "annaba", name: "Annaba", wilaya: "Wilaya d'Annaba", country: "Algerie" },
  { slug: "blida", name: "Blida", wilaya: "Wilaya de Blida", country: "Algerie" },
  { slug: "setif", name: "Setif", wilaya: "Wilaya de Setif", country: "Algerie" },
  { slug: "bejaia", name: "Bejaia", wilaya: "Wilaya de Bejaia", country: "Algerie" },
  { slug: "tizi-ouzou", name: "Tizi Ouzou", wilaya: "Wilaya de Tizi Ouzou", country: "Algerie" },
  { slug: "tlemcen", name: "Tlemcen", wilaya: "Wilaya de Tlemcen", country: "Algerie" },
  { slug: "skikda", name: "Skikda", wilaya: "Wilaya de Skikda", country: "Algerie" },
  { slug: "batna", name: "Batna", wilaya: "Wilaya de Batna", country: "Algerie" },
  { slug: "biskra", name: "Biskra", wilaya: "Wilaya de Biskra", country: "Algerie" },
  { slug: "djelfa", name: "Djelfa", wilaya: "Wilaya de Djelfa", country: "Algerie" },
  { slug: "boumerdes", name: "Boumerdes", wilaya: "Wilaya de Boumerdes", country: "Algerie" },
  { slug: "tipaza", name: "Tipaza", wilaya: "Wilaya de Tipaza", country: "Algerie" },
  { slug: "medea", name: "Medea", wilaya: "Wilaya de Medea", country: "Algerie" },
];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function searchCities(query: string, limit = 8): CityListItem[] {
  const q = normalize(query);
  if (!q) return [];

  const starts: CityListItem[] = [];
  const includes: CityListItem[] = [];

  for (const city of ALGERIA_CITIES) {
    const byName = normalize(city.name);
    const haystack = normalize(`${city.name} ${city.wilaya}`);
    if (byName.startsWith(q) || haystack.startsWith(q)) {
      starts.push(city);
    } else if (haystack.includes(q)) {
      includes.push(city);
    }
  }

  return [...starts, ...includes].slice(0, limit);
}

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
