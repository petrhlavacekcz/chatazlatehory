/**
 * Ceník — sezónní rozlišení, dotaz + ceník (ne booking systém).
 * Všechny částky jsou v CZK, formátují se přes formatPrice().
 */
import type { PriceTier } from './types';

export const pricing: PriceTier[] = [
	{
		id: 'low-season-weekday',
		label: 'Mimosezóna · noc',
		period: 'neděle–čtvrtek',
		amount: 3500,
		note: 'listopad–březen (mimo svátky)'
	},
	{
		id: 'low-season-weekend',
		label: 'Mimosezóna · víkend',
		period: 'pátek–neděle',
		amount: 4500,
		note: 'min. 2 noci',
		highlight: true
	},
	{
		id: 'high-season',
		label: 'Hlavní sezóna · noc',
		period: 'červen–září, svátky',
		amount: 5500,
		note: 'min. 3 noci o svátcích'
	}
];

export const pricingNotes = [
	'Cena zahrnuje úklid, ložní prádlo, ručníky a energie.',
	'Kauce 3 000 Kč vratná při předání chaty v pořádku.',
	'Zvířata po domluvě, příplatek 300 Kč/noc.',
	'Příplatek za správu a rezervaci je zahrnut v ceně.'
];
