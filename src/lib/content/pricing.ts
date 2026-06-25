/**
 * Ceník — sezónní rozlišení, dotaz + ceník (ne booking systém).
 * Všechny částky jsou v CZK, formátují se přes formatPrice().
 */
import type { PriceTier } from './types';

export const pricing: PriceTier[] = [
	{
		id: 'per-night',
		label: 'Cena za noc',
		period: 'za celou chatu, ne za osobu',
		amount: 2500,
		note: 'Při delším pobytu individuální sleva po dohodě',
		highlight: true
	}
];

export const pricingNotes = [
	'V ceně je úklid, ložní prádlo, ručníky i energie.',
	'Vratná kauce 4 000 Kč — vrací se při předání chaty v pořádku.',
	'Mazlíčci po domluvě, příplatek 300 Kč za noc.',
	'Žádné skryté poplatky — uvedená cena je konečná.'
];
