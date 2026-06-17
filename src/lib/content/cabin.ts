/**
 * Základní informace o chatě — kontaktní údaje správce, lokalita, kapacita.
 */

export const cabin = {
	name: 'Chata Zlaté Hory',
	area: 'Bohemaland',
	location: {
		city: 'Zlaté Hory',
		region: 'Jeseníky',
		address: 'Bohemaland, Zlaté Hory, Česká republika'
	},
	tagline: 'Klid, komfort a příroda ve Zlatých Horách',
	capacity: {
		guests: 8,
		bedrooms: 3,
		bathrooms: 2
	},
	manager: {
		role: 'Správce chaty',
		name: 'Pavel',
		phone: '+420 000 000 000', // TODO doplnit reálné číslo správce
		email: 'spravce@chatazlatehory.cz' // TODO doplnit reálný e-mail
	},
	about: [
		'Dřevěná horská chata v srdci Zlatých Hor, obklopená lesy Jeseníků. Místo, kam se na chvíli zastaví čas — ráno vás probudí světlo přes koruny stromů, večer praská oheň v krbu.',
		'Po večerech tady nemusíte nic dělat. A právě to je ten point. Chata je postavená pro lidi, kteří chtějí odpočívat — bez programu, bez hluku, bez spěchu.'
	],
	highlights: [
		{ value: '8', label: 'hostů' },
		{ value: '3', label: 'ložnice' },
		{ value: '2', label: 'koupelny' },
		{ value: '1200 m', label: 'n. m.' }
	]
} as const;
