/**
 * Ceník — sezónní rozlišení, dotaz + ceník (ne booking systém).
 * Všechny částky jsou v CZK, formátují se přes formatPrice().
 */
import type { PriceTier } from './types';

export const pricing: PriceTier[] = [
	{
		id: 'per-night',
		label: 'Cena za noc',
		period: 'celoroční sazba',
		amount: 2500,
		note: 'Při delší obsazenosti individuální sleva po dohodě',
		highlight: true
	}
];

export const pricingNotes = [
	'Cena zahrnuje úklid, ložní prádlo, ručníky a energie.',
	'Vratná kauce 4 000 Kč při předání chaty v pořádku.',
	'Zvířata po domluvě, příplatek 300 Kč/noc.',
	'Příplatek za správu a rezervaci je zahrnut v ceně.'
];
