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
			'Nejvyšší vrchol Zlatohorské vrchoviny s rozhlednou a výhledem na Jeseníky i Kralický Sněžník.',
		distance: '6 km',
		href: 'https://cs.wikipedia.org/wiki/Biskupsk%C3%A1_kupa'
	},
	{
		id: 'rejviz',
		icon: 'tabler:trees',
		title: 'Rejvíz',
		description:
			'Najvýše položená obec v Jeseníkách a rašeliniště — národní přírodní rezervace s dřevěným povalovým chodníkem.',
		distance: '12 km',
		href: 'https://cs.wikipedia.org/wiki/Rejv%C3%ADz_(Vrbno_pod_Pradd%C4%9Bdem)'
	},
	{
		id: 'pricna',
		icon: 'tabler:ski-jumping',
		title: 'Ski areál Příčná',
		description: 'Zimní lyžařský areál přímo ve Zlatých Horách — sjezdovky pro rodiny i mírně pokročilé.',
		distance: '3 km',
		href: 'https://www.zlatehory.cz/cs/tourism/basic/3043-skiareal-pricna'
	},
	{
		id: 'cervenohorske-sedlo',
		icon: 'tabler:ski-jumping',
		title: 'Červenohorské sedlo',
		description: 'Jeden z nejznámějších lyžařských areálů Jeseníků s širokými sjezdovkami a běžeckými tratěmi.',
		distance: '28 km',
		href: 'https://cs.wikipedia.org/wiki/%C4%8Cervenohorsk%C3%A9_sedlo'
	},
	{
		id: 'cyklotrasy',
		icon: 'tabler:bike',
		title: 'Cyklotrasy Jeseníky',
		description: 'Stovky kilometů značených cyklotras — od rodinných údolních linek po náročné vrcholové výstupy.',
		distance: 'od 0 km',
		href: 'https://www.jeseniky.net/cyklotrasy'
	},
	{
		id: 'muzeum-zlata',
		icon: 'tabler:building-monument',
		title: 'Muzeum zlata',
		description: 'Expozice o hornické historii Zlatých Hor s možností prohlídky starých štol.',
		distance: '2 km',
		href: 'https://www.zlatehory.cz/cs/tourism/basic/25-muzeum-zlata'
	}
];
