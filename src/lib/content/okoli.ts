/**
 * Tipy na výlety v okolí Zlatých Hor — použito na Home (preview) i Okolí (plný seznam).
 * Vzdálenost a externí odkazy dle Stitch briefu.
 */
import type { Trip } from './types';

export const trips: Trip[] = [
	{
		id: 'biskupska-kupa',
		icon: 'tabler:mountain',
		title: 'Biskupská kupa',
		description:
			'Nejvyšší vrch Zlatohorské vrchoviny. Z rozhledny dohlédnete na Jeseníky i Kralický Sněžník.',
		distance: '6 km',
		href: 'https://cs.wikipedia.org/wiki/Biskupsk%C3%A1_kupa'
	},
	{
		id: 'rejviz',
		icon: 'tabler:trees',
		title: 'Rejvíz',
		description:
			'Nejvýše položená obec Jeseníků. Po dřevěném chodníku projdete tajemné rašeliniště národní rezervace.',
		distance: '12 km',
		href: 'https://cs.wikipedia.org/wiki/Rejv%C3%ADz'
	},
	{
		id: 'pricna',
		icon: 'tabler:ski-jumping',
		title: 'Ski areál Příčná',
		description:
			'Lyžování přímo ve Zlatých Horách, pár minut od chaty. Sjezdovky pro rodiny i mírně pokročilé.',
		distance: '3 km',
		href: 'https://www.ceskehory.cz/ski-areal/zlate-hory-pricna.html'
	},
	{
		id: 'cervenohorske-sedlo',
		icon: 'tabler:ski-jumping',
		title: 'Červenohorské sedlo',
		description:
			'Jeden z nejznámějších areálů Jeseníků. Široké sjezdovky a upravené běžecké tratě.',
		distance: '28 km',
		href: 'https://cs.wikipedia.org/wiki/%C4%8Cervenohorsk%C3%A9_sedlo'
	},
	{
		id: 'cyklotrasy',
		icon: 'tabler:bike',
		title: 'Cyklotrasy Jeseníky',
		description:
			'Stovky kilometrů značených tras — od poklidných údolí po náročné výjezdy do kopců.',
		distance: 'od 0 km',
		href: 'https://www.ceskehory.cz/jeseniky/cyklotrasy.html'
	},
	{
		id: 'mestske-muzeum',
		icon: 'tabler:building-monument',
		title: 'Městské muzeum',
		description: 'Hornická historie Zlatých Hor a prohlídka starých zlatých štol.',
		distance: '2 km',
		href: 'https://zlatehory.cz/mestske-muzeum/os-13876'
	}
];
