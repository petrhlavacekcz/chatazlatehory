/**
 * Vybavení chaty — typováno, editovatelné na jednom místě.
 * Použito na Home (preview) i O chatě (plný seznam).
 */
import type { Amenity } from './types';

export const amenities: Amenity[] = [
	{
		icon: 'tabler:flame',
		title: 'Krb',
		description: 'Praskající oheň pro tiché podvečery. Dřevo je připravené.'
	},
	{
		icon: 'tabler:tools-kitchen',
		title: 'Plně vybavená kuchyň',
		description: 'Všechno na vaření — od pánví po rychlovarnou konvici.'
	},
	{
		icon: 'tabler:wifi',
		title: 'Wi-Fi',
		description: 'Rychlé připojení, když potřebujete zůstat ve spojení.'
	},
	{
		icon: 'tabler:grill',
		title: 'Zahrada a gril',
		description: 'Soukromá zahrada s grilem pro letní večery venku.'
	},
	{
		icon: 'tabler:parking',
		title: 'Parkování',
		description: 'Vlastní parkoviště přímo u chaty.'
	},
	{
		icon: 'tabler:snowflake',
		title: 'Vytápění',
		description: 'Teplo v celé chatě, příjemné i v nejtužší zimě.'
	},
	{
		icon: 'tabler:wash-machine',
		title: 'Pračka',
		description: 'Pračka pro delší pobyty. Ložní prádlo a ručníky v ceně.'
	},
	{
		icon: 'tabler:bath',
		title: 'Koupelna',
		description: 'Sprchový kout a ručníky v ceně pobytu.'
	}
];
