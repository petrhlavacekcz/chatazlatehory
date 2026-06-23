/**
 * Vybavení chaty — typováno, editovatelné na jednom místě.
 * Použito na Home (preview) i O chatě (plný seznam).
 */
import type { Amenity } from './types';

export const amenities: Amenity[] = [
	{
		icon: 'tabler:flame',
		title: 'Krb',
		description: 'Praskající oheň pro podvečerní ticho, dřevo k dispozici.'
	},
	{
		icon: 'tabler:tools-kitchen',
		title: 'Plně vybavená kuchyň',
		description: 'Vše pro vaření — od pánví po rychlovarnou konvici.'
	},
	{
		icon: 'tabler:wifi',
		title: 'Wi-Fi',
		description: 'Rychlé připojení pro ty, co přece jen potřebují zůstat ve spojení.'
	},
	{
		icon: 'tabler:grill',
		title: 'Zahrada a gril',
		description: 'Soukromá zahrada s venkovním grilem pro letní večery.'
	},
	{
		icon: 'tabler:parking',
		title: 'Parkování',
		description: 'Vlastní parkoviště přímo u chaty, bez starostí.'
	},
	{
		icon: 'tabler:snowflake',
		title: 'Vytápění',
		description: 'Plné vytápění celé chaty, příjemné i v nejtužší zimě.'
	},
	{
		icon: 'tabler:wash-machine',
		title: 'Pračka',
		description: 'Pračka pro delší pobyty, ručníky a ložní prádlo v ceně.'
	},
	{
		icon: 'tabler:bath',
		title: 'Koupelna',
		description: 'Sprchový kout, ručníky v ceně pobytu.'
	}
];
