import { redirect } from '@sveltejs/kit';

// Rezervace nyní žije jako sekce na homepage (#rezervace).
// Stará URL /rezervace/ trvale přesměrovává na kotvu.
export const prerender = false;

export function load() {
	throw redirect(308, '/#rezervace');
}
