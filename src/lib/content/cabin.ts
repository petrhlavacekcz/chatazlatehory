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
		email: 'tom.pavela@seznam.cz'
	},
	about: [
		'Dřevěná horská chata v srdci Zlatých Hor, obklopená lesy Jeseníků. Místo, kam se na chvíli zastaví čas — ráno vás probudí světlo přes koruny stromů, večer praská oheň v krbu.',
		'Po večerech tady nemusíte nic dělat. Chata je postavená pro lidi, kteří chtějí odpočívat — bez programu, bez hluku, bez spěchu.'
	],
	highlights: [
		{ value: '12', label: 'hostů' },
		{ value: '3', label: 'ložnice' },
		{ value: '1', label: 'koupelna' },
		{ value: '2', label: 'WC' },
		{ value: '1200 m', label: 'n. m.' }
	]
} as const;
