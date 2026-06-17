/**
 * Formátování ceny a data — jediný zdroj pro lokalizaci (DESIGN.md: žádné inline format).
 */

const czCurrency = new Intl.NumberFormat('cs-CZ', {
	style: 'currency',
	currency: 'CZK',
	maximumFractionDigits: 0
});

/** 4500 → „4 500 Kč" */
export function formatPrice(amount: number): string {
	return czCurrency.format(amount);
}

const czDate = new Intl.DateTimeFormat('cs-CZ', {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

/** Date → „17. června 2026" */
export function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return czDate.format(d);
}
