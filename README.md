# iMeteo Algérie

French-language weather and prayer times for cities in Algeria (Next.js + Open-Meteo + Al-Adhan).

## Prerequisites

- **Node.js** 20+ (recommended)
- **npm** (or pnpm/yarn)

## Setup

```bash
npm install
```

No `.env` file is required for local development: forecast data uses [Open-Meteo](https://open-meteo.com/), prayer times use the public Aladhan API.

### Scripts

| Command     | Description                    |
| ----------- | ------------------------------ |
| `npm run dev`   | Dev server ([Turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)) |
| `npm run build` | Production build               |
| `npm run start` | Run production build locally  |
| `npm run lint`  | ESLint                         |

Dev: [http://localhost:3000](http://localhost:3000)

## How to add new cities

City list lives in a single JSON file and is imported as typed data.

1. Open **`src/shared/data/cities/algeria.json`** (array of objects).

2. Append a new object with these fields (see `CityListItem` in `src/shared/types/city.ts`):

   | Field           | Description |
   | --------------- | ----------- |
   | `name`          | Official commune name (used in UI and for slug generation). |
   | `lat` / `lon`   | WGS84 coordinates (decimal degrees). |
   | `wilaya_code`   | Two-digit wilaya code as a string, e.g. `"16"`, `"01"`. |
   | `wilaya_name`   | Wilaya label (must match keys used elsewhere, e.g. `REGION_BY_WILAYA` in `src/shared/constants/region-by-wilaya.ts` when applicable). |
   | `daira_name`    | Daïra name (used for tier heuristics: same as `name` → tier 2 by default). |
   | `tier` *(optional)* | `1`, `2`, or `3`. **Overrides** automatic tier (see below). Omit to use automatic rules. |

3. **URLs** are not hand-written: they are derived with `slugify` (French locale) from `wilaya_name` and `name`:

   `/meteo/<wilayaSlug>/<citySlug>`

   Example: wilaya `Tizi Ouzou` + city `Ain El Hammam` → `/meteo/tizi-ouzou/ain-el-hammam`.

4. **Automatic cache tier** (when `tier` is omitted) is computed in `src/shared/constants/region-by-wilaya.ts`:

   - **1** — large centres (fixed list, e.g. Alger, Oran, Constantine, …).
   - **2** — `name === daira_name` (typical daïra seat).
   - **3** — other communes.

5. Re-run **`npm run build`** (or let CI run it) so the sitemap and static assumptions pick up new entries.

6. **Duplicates:** two communes with the same `name` in the same wilaya would produce the same slugs — avoid duplicate pairs; use distinct official names or adjust the slug logic only if you have a real naming collision.

## Project layout (short)

- `src/app` — App Router pages (`/`, `/meteo/[wilayaSlug]/[citySlug]/...`).
- `src/shared/data/cities/algeria.json` — city catalogue.
- `src/widgets/meteo-page` — weather UI and Open-Meteo client (in-memory TTL cache, no Next `fetch` revalidate for forecasts).

---

Production URL is configured in `src/shared/constants/brand.ts` (`BRAND_URL`).
