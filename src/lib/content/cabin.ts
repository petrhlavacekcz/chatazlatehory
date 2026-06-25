/**
 * Základní informace o chatě — kontaktní údaje majitele, lokalita, kapacita.
 */

export const cabin = {
	name: 'Chata Zlaté Hory',
	area: 'Bohemaland',
	location: {
		city: 'Zlaté Hory',
		region: 'Jeseníky',
		address: 'Bohemaland, Zlaté Hory, Česká republika',
		mapUrl:
			'https://mapy.com/cs/zakladni?source=base&id=1993207&ds=1&x=17.3926659&y=50.2449648&z=17'
	},
	tagline: 'Klid, komfort a příroda ve Zlatých Horách',
	checkIn: '14:00',
	checkOut: '11:00',
	capacity: {
		guests: 12,
		bedrooms: 3,
		bathrooms: 1,
		wc: 2
	},
	manager: {
		role: 'Majitel chaty',
		name: 'Tomáš Pavela',
		phone: '+420 777 340 956',
		email: 'tom.pavela@seznam.cz',
		bio: 'Chata je naším rodinným útočištěm už léta. Postupně jsme ji upravili tak, aby si tu každý odpočinul stejně jako my — ať přijede na víkend, nebo na celý týden. Rád vám poradím s výlety i s tím, kde v okolí najdete to nejhezčí.'
	},
	about: [
		'Dřevěná horská chata v srdci Zlatých Hor, obklopená lesy Jeseníků. Místo, kde se na chvíli zastaví čas — ráno vás probudí světlo mezi korunami stromů, večer praská oheň v krbu.',
		'Tady nemusíte nic. Chata je postavená pro lidi, kteří si přijeli odpočinout — bez programu, bez hluku, bez spěchu.'
	],
	/**
	 * Rozšířený popis pro stránku O chatě. Na homepage se ukazuje kratší
	 * teaser (`about`), zde je plný příběh chaty a areálu.
	 */
	aboutExtended: [
		'Dřevěná horská chata v srdci Zlatých Hor, obklopená lesy Jeseníků. Místo, kde se na chvíli zastaví čas — ráno vás probudí světlo mezi korunami stromů, večer praská oheň v krbu.',
		'Interiér je prostý a laděný do teplých tónů. Obývací pokoj s krbem je středobodem večerů, otevřená kuchyně zve ke společnému vaření a z terasy se dá sledovat, jak nad lesy padá tma.',
		'Chata stojí v areálu Bohemaland — soukromém koutu na okraji města, kam nedolehne ruch, ale kam dojedete autem až ke dveřím. Kolem je zahrada s grilem a posezením, vlastní parkoviště a hned za plotem les a turistické trasy.',
		'Žádný program tu není potřeba. Ideální pro rodiny, partu přátel i páry — přijeďte si odpočinout bez spěchu a bez hluku. A když přece jen vyrazíte, Jeseníky mají co nabídnout: od sjezdovek na Příčné a Červenohorském sedle po turistické stezky s výhledy do kraje.'
	],
	highlights: [
		{ value: '12', label: 'hostů' },
		{ value: '3', label: 'ložnice' },
		{ value: '1', label: 'koupelna' },
		{ value: '2', label: 'WC' },
		{ value: '520 m', label: 'n. m.' }
	],
	/**
	 * Dispozice — jediný zdroj pravdy pro tabulku na O chatě.
	 * Hodnoty se odvozují z capacity, ne hardcoded v .svelte.
	 */
	disposition: [
		{ label: 'Kapacita', value: '12 hostů' },
		{ label: 'Ložnice', value: '3 pokoje' },
		{ label: 'Koupelna', value: '1 se sprchovým koutem' },
		{ label: 'WC', value: '2 samostatné' },
		{ label: 'Poloha', value: 'Zlaté Hory – Bohemaland' },
		{ label: 'Nadmořská výška', value: 'cca 520 m n. m.' }
	]
} as const;
