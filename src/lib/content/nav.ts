/**
 * Struktura navigace — jediný zdroj pravdy pro header i footer.
 * Záměrně redukovaná: Rezervace/Ceník je řešena tlačítkem CTA v headeru,
 * ne jako další položka v menu. Méně položek = více prostoru = luxury feel.
 */
import type { NavItem } from './types';

/** Primární navigace v headeru — redukovaná (4 položky). */
export const navItems: NavItem[] = [
	{ href: '/o-chate/', label: 'O chatě' },
	{ href: '/galerie/', label: 'Galerie' },
	{ href: '/okoli/', label: 'Okolí' },
	{ href: '/kontakt/', label: 'Kontakt' }
];

/** Kompletní seznam pro footer (včetně Ceník/Rezervace). */
export const footerNavItems: NavItem[] = [
	{ href: '/o-chate/', label: 'O chatě' },
	{ href: '/galerie/', label: 'Galerie' },
	{ href: '/okoli/', label: 'Okolí' },
	{ href: '/rezervace/', label: 'Ceník' },
	{ href: '/kontakt/', label: 'Kontakt' }
];
