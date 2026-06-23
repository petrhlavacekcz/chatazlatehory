/**
 * Galerie fotek — typovaný seznam s kategoriemi.
 * Fotky ve static/img/gallery/ (AVIF, landscape, optimalizované z assets/Final/).
 *
 * Kategorie (sjednocené dle požadavku):
 * - `exterior` — exteriér chaty + areál Bohemaland + okolní krajina (vše venku)
 * - `interior` — interiér chaty (obývák, kuchyň, jídelna, ložnice)
 *
 * Koupelna/toaleta (fotky 10-13) je VYŘAZENA z galerie — není atraktivní pro prezentaci.
 *
 * Alt text je část hlasu brandu (DESIGN.md / brand.md):
 * popisuje co je na fotce, ne „fotka chaty".
 *
 * POZNÁMKA: Popisky jsou odhadované z dostupné analýzy. Pro přesnější popisky
 * doporučuji projít a upravit ručně — viz TODO komentáře u nejistých položek.
 */

export interface GalleryImage {
	src: string;
	alt: string;
	category: 'exterior' | 'interior';
}

const img = (name: string) => `/img/gallery/${name}.avif`;

export const galleryImages: GalleryImage[] = [
	// ── Exteriér chaty (venku — budova, zahrada, krajina) ──────
	{
		src: img('1'),
		alt: 'Dřevěná chata v podvečerním světle, osvětlená okna, les v pozadí',
		category: 'exterior'
	},
	{
		src: img('2'),
		alt: 'Pohled na chatu ze zahrady, terasa s venkovním posezením',
		category: 'exterior'
	},
	{ src: img('3'), alt: 'Zimní detail chaty se sněhem na střeše', category: 'exterior' },
	{ src: img('4'), alt: 'Celkový pohled na chatu se sněhem, zimní den', category: 'exterior' },
	{
		src: img('5'),
		alt: 'Chata v zimní krajině, sníh na střeše a okolních stromech',
		category: 'exterior'
	},
	{ src: img('6'), alt: 'Vstup do chaty se sněhem v popředí', category: 'exterior' },
	{ src: img('7'), alt: 'Detail exteriéru chaty', category: 'exterior' },
	{ src: img('8'), alt: 'Hlavní vchod do chaty, dřevěné schody a veranda', category: 'exterior' },
	{ src: img('9'), alt: 'Pohled na chatu zvenčí', category: 'exterior' },

	// ── Interiér (vnitřní prostory — bez koupelny) ────────────
	// POZNÁMKA: Fotky 10-13 jsou koupelna/toaleta — VYŘAZENO.
	// Interiérové fotky začínají od 14. Popisky jsou odhadnuté — uprav ručně.
	{ src: img('14'), alt: 'Interiér chaty — útulný prostor s teplým světlem', category: 'interior' },
	{ src: img('16'), alt: 'Interiér chaty — obytný prostor', category: 'interior' },
	{ src: img('17'), alt: 'Interiér chaty', category: 'interior' },
	{ src: img('18'), alt: 'Interiér chaty', category: 'interior' },
	{ src: img('19'), alt: 'Interiér chaty', category: 'interior' },

	// ── Exteriér — areál a krajina (pokračování) ──────────────
	{ src: img('20'), alt: 'Zahrada chaty s venkovním posezením', category: 'exterior' },
	{ src: img('21'), alt: 'Areál chaty', category: 'exterior' },
	{ src: img('22'), alt: 'Okolí chaty', category: 'exterior' },
	{ src: img('23'), alt: 'Exteriér — areál Bohemaland', category: 'exterior' },
	{ src: img('24'), alt: 'Pohled na areál chaty', category: 'exterior' },
	{ src: img('25'), alt: 'Parkoviště a přístup k chatě', category: 'exterior' },
	{ src: img('26'), alt: 'Okolí chaty', category: 'exterior' },
	{ src: img('27'), alt: 'Areál chaty', category: 'exterior' },
	{ src: img('28'), alt: 'Exteriér — krajina kolem chaty', category: 'exterior' },
	{ src: img('29'), alt: 'Pohled do krajiny od chaty', category: 'exterior' },
	{ src: img('30'), alt: 'Terasa chaty v letním večeru', category: 'exterior' },

	// ── Interiér (pokračování) ────────────────────────────────
	{ src: img('31'), alt: 'Interiér chaty', category: 'interior' },
	{ src: img('32'), alt: 'Interiér chaty', category: 'interior' },
	{ src: img('33'), alt: 'Interiér chaty', category: 'interior' },
	{ src: img('34'), alt: 'Interiér chaty', category: 'interior' },

	// ── Krajina a příroda (exterior) ──────────────────────────
	{ src: img('35'), alt: 'Lesní cesta vedoucí k chatě', category: 'exterior' },
	{ src: img('36'), alt: 'Příroda v okolí chaty', category: 'exterior' },
	{ src: img('37'), alt: 'Krajina Jeseníků', category: 'exterior' },
	{ src: img('38'), alt: 'Okolní příroda', category: 'exterior' },
	{ src: img('39'), alt: 'Výhled do krajiny', category: 'exterior' },
	{ src: img('40'), alt: 'Výhled na vrcholky Jeseníků od chaty', category: 'exterior' },
	{ src: img('41'), alt: 'Krajina v okolí', category: 'exterior' },
	{ src: img('42'), alt: 'Příroda Jeseníků', category: 'exterior' },

	// ── Interiér (pokračování) ────────────────────────────────
	{ src: img('43'), alt: 'Interiér chaty', category: 'interior' },
	{ src: img('44'), alt: 'Interiér chaty', category: 'interior' },

	// ── Krajina (exterior) ────────────────────────────────────
	{ src: img('45'), alt: 'Zimní krajina Zlatých Hor, zasněžené louky', category: 'exterior' },
	{ src: img('46'), alt: 'Krajina v okolí chaty', category: 'exterior' },
	{ src: img('47'), alt: 'Pohled do přírody od chaty', category: 'exterior' }
];

/** Hlavní hero fotka — exteriér chaty v podvečerním světle (1.avif, dramatický). */
export const heroImage = galleryImages[0];

/** Preview pro homepage galerii — mix exterior/interior napříč sadou. */
export const galleryPreview: GalleryImage[] = [
	galleryImages[0], // exterior — dusk cabin
	galleryImages[9], // interior
	galleryImages[14], // exterior — garden
	galleryImages[19], // exterior — area
	galleryImages[30] // exterior — landscape
];

export const galleryCategories = [
	{ id: 'all', label: 'Vše' },
	{ id: 'exterior', label: 'Exteriér' },
	{ id: 'interior', label: 'Interiér' }
] as const;
