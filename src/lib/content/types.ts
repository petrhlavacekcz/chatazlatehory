/**
 * Typy sdílené napříč obsahem chaty.
 * Content as data (AGENTS.md): každý editovatelný text/seznam je typovaný objekt,
 * ne hardcoded v .svelte.
 */

export type IconName =
	| 'tabler:mountain'
	| 'tabler:trees'
	| 'tabler:ski-jumping'
	| 'tabler:bike'
	| 'tabler:fish'
	| 'tabler:building-monument'
	| 'tabler:map-pin'
	| 'tabler:bed'
	| 'tabler:bath'
	| 'tabler:device-tv'
	| 'tabler:wifi'
	| 'tabler:barbecue'
	| 'tabler:flame'
	| 'tabler:parking'
	| 'tabler:garden-cart'
	| 'tabler:snowflake'
	| 'tabler:utensils'
	| 'tabler:wash-machine'
	| 'tabler:sofa'
	| 'tabler:coffee';

export interface Amenity {
	icon: IconName;
	title: string;
	description: string;
}

export interface PriceTier {
	id: string;
	label: string;
	period: string;
	amount: number;
	note?: string;
	highlight?: boolean;
}

export interface Trip {
	id: string;
	icon: IconName;
	title: string;
	description: string;
	distance: string;
	href: string;
}

export interface NavItem {
	href: string;
	label: string;
}
