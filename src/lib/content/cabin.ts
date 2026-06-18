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
		bio: 'Chata je naším rodinným útočištěm už léta. Postupně jsme ji upravili tak, aby si každý host odpočinul stejně jako my — ať už přijede na víkend nebo na celý týden. Rád poradím s výlety i s tím, jak chatu vytěžit naplno.'
	},
	about: [
		'Dřevěná horská chata v srdci Zlatých Hor, obklopená lesy Jeseníků. Místo, kam se na chvíli zastaví čas — ráno vás probudí světlo přes koruny stromů, večer praská oheň v krbu.',
		'Po večerech tady nemusíte nic dělat. Chata je postavená pro lidi, kteří chtějí odpočívat — bez programu, bez hluku, bez spěchu.'
	],
	/**
	 * Rozšířený popis pro stránku O chatě. Na homepage se ukazuje kratší
	 * teaser (`about`), zde je plný příběh chaty a areálu.
	 */
	aboutExtended: [
		'Dřevěná horská chata v srdci Zlatých Hor, obklopená lesy Jeseníků. Místo, kam se na chvíli zastaví čas — ráno vás probudí světlo přes koruny stromů, večer praská oheň v krbu.',
		'Prostor chaty je pojednaný prostě a v teplých tónech. Obývací místnost s krbem je středobodem večerů, otevřená kuchyně pozve k společnému vaření a z terasy se dá sledovat, jak nad lesy padá tma. Sauna na patře je odměna za každý den strávený venku.',
		'Chata stojí v areálu Bohemaland — soukromém koutu na okraji města, kam nedosáhne ruch, ale kam dojedete autem až k ke dveřím. Kolem je zahrada s grilem a posezením, vlastní parkoviště a hned za plotem les a turistické trasy.',
		'Není tu potřeba program. Přijet můžete lidem, kteří chtějí odpočívat — bez spěchu, bez hluku, bez nutnosti něco dokazovat. A když přece jen vyrazíte, Jeseníky mají co nabídnout: od sjezdovek po lesní cesty, které končí u výhledu.'
	],
	highlights: [
		{ value: '12', label: 'hostů' },
		{ value: '3', label: 'ložnice' },
		{ value: '1', label: 'koupelna' },
		{ value: '2', label: 'WC' },
		{ value: '1200 m', label: 'n. m.' }
	],
	/**
	 * Dispozice — jediný zdroj pravdy pro tabulku na O chatě.
	 * Hodnoty se odvozují z capacity, ne hardcoded v .svelte.
	 */
	disposition: [
		{ label: 'Kapacita', value: '12 hostů' },
		{ label: 'Ložnice', value: '3 pokoje' },
		{ label: 'Koupelna', value: '1 s vanou' },
		{ label: 'WC', value: '2 samostatné' },
		{ label: 'Poloha', value: 'Zlaté Hory – Bohemaland' },
		{ label: 'Nadmořská výška', value: 'cca 520 m n. m.' }
	]
} as const;
