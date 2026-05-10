import type { CityCacheTier, CityListItem } from "../types/city";

export const REGION_BY_WILAYA: Record<string, string> = {
    Adrar: 'Sahara',
    Chlef: 'Centre',
    Laghouat: 'Hauts Plateaux',
    'Oum El Bouaghi': 'Est',
    Batna: 'Est',
    Bejaia: 'Kabylie',
    Biskra: 'Sahara',
    Bechar: 'Sahara',
    Blida: 'Centre',
    Bouira: 'Kabylie',
    Tamanrasset: 'Sahara',
    Tebessa: 'Est',
    Tlemcen: 'Ouest',
    Tiaret: 'Hauts Plateaux',
    'Tizi Ouzou': 'Kabylie',
    Alger: 'Centre',
    Djelfa: 'Hauts Plateaux',
    Jijel: 'Kabylie',
    Setif: 'Est',
    Saida: 'Ouest',
    Skikda: 'Est',
    'Sidi Bel Abbes': 'Ouest',
    Annaba: 'Est',
    Guelma: 'Est',
    Constantine: 'Est',
    Medea: 'Centre',
    Mostaganem: 'Ouest',
    "M'Sila": 'Hauts Plateaux',
    Mascara: 'Ouest',
    Ouargla: 'Sahara',
    Oran: 'Ouest',
    'El Bayadh': 'Hauts Plateaux',
    Illizi: 'Sahara',
    'Bordj Bou Arreridj': 'Hauts Plateaux',
    Boumerdes: 'Centre',
    'El Tarf': 'Est',
    Tindouf: 'Sahara',
    Tissemsilt: 'Hauts Plateaux',
    'El Oued': 'Sahara',
    Khenchela: 'Est',
    'Souk Ahras': 'Est',
    Tipaza: 'Centre',
    Mila: 'Est',
    'Ain Defla': 'Centre',
    Naama: 'Hauts Plateaux',
    'Ain Temouchent': 'Ouest',
    Ghardaia: 'Sahara',
    Relizane: 'Ouest',
    Timimoun: 'Sahara',
    'Bordj Badji Mokhtar': 'Sahara',
    'Ouled Djellal': 'Sahara',
    'Beni Abbes': 'Sahara',
    'In Salah': 'Sahara',
    'In Guezzam': 'Sahara',
    Touggourt: 'Sahara',
    Djanet: 'Sahara',
    "El M'ghair": 'Sahara',
    'El Menia': 'Sahara',
};

export function getRegionLabelForWilayaName(wilayaName: string): string | undefined {
    return REGION_BY_WILAYA[wilayaName];
}


const TIER_1_CITY_NAMES = new Set([
    "Alger",
    "Oran",
    "Constantine",
    "Annaba",
    "Blida",
    "Batna",
    "Setif",
    "Djelfa",
    "Tlemcen",
    "Bejaia",
    "Sidi Bel Abbes",
    "Biskra",
    "Tizi Ouzou",
    "Skikda",
    "Tebessa",
    "El Oued",
    "Mostaganem",
    "Ouargla",
    "Bordj Bou Arreridj",
    "Chlef",
    "Medea",
    "Relizane",
    "Mascara",
    "Jijel",
    "Souk Ahras",
    "Saida",
    "Guelma",
    "Ghardaia",
    "Laghouat",
    "Ain Temouchent",
    "Tipaza",
    "Khenchela",
    "M'Sila",
    "Tiaret",
    "Boumerdes",
    "Bouira"
]);

export function getTier(city: CityListItem): CityCacheTier {
    if (TIER_1_CITY_NAMES.has(city.name)) {
        return 1;
    }

    if (city.name === city.daira_name) {
        return 2;
    }

    return 3;
}

/** Explicit `tier` in JSON wins; otherwise derived via `getTier`. */
export function resolveEffectiveTier(city: CityListItem): CityCacheTier {
    if (city.tier != null) {
        return city.tier;
    }
    return getTier(city);
}
