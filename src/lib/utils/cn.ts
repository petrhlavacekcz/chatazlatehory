import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Spojí clsx (podmíněné třídy) a tailwind-merge (řeší konflikty Tailwind utility).
 * Jediný způsob, jak skládat třídy v komponentách.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
