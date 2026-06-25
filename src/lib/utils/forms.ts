import { z } from 'zod';
import { cabin } from '$lib/content/cabin';

/**
 * Sdílená Zod schémata pro formuláře.
 * Parse, Don't Validate (AGENTS.md) — schema je zdrojem typů.
 * Validace běží na klientovi (SSG web bez server-side actions).
 * Odeslání: TODO napojit na Resend / form service při nasazení.
 */

export const inquirySchema = z.object({
	name: z.string().min(2, 'Jméno je příliš krátké'),
	email: z.string().email('Neplatný e-mail'),
	phone: z.string().optional(),
	dateFrom: z.string().min(1, 'Vyberte datum příjezdu'),
	dateTo: z.string().min(1, 'Vyberte datum odjezdu'),
	guests: z.preprocess(
		(v) => {
			if (v === '' || v === null || v === undefined) return undefined;
			const n = Number(v);
			return isNaN(n) ? undefined : n;
		},
		z
			.number()
			.int()
			.min(1)
			.max(cabin.capacity.guests, `Maximálně ${cabin.capacity.guests} hostů`)
			.optional()
	),
	message: z.string().max(2000).optional()
});

export const contactSchema = z.object({
	name: z.string().min(2, 'Jméno je příliš krátké'),
	email: z.string().email('Neplatný e-mail'),
	message: z.string().min(5, 'Zpráva je příliš krátká').max(2000)
});

export type InquiryValues = z.infer<typeof inquirySchema>;
export type ContactValues = z.infer<typeof contactSchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Odešle data na serverless endpoint.
 * TODO: při nasazení napojit na Resend / Cloudflare Worker / Vercel Edge Function.
 * Endpoint přijímá JSON, odesílá e-mail majiteli (cabin.manager.email).
 */
export async function submitInquiry(data: InquiryValues): Promise<{ ok: boolean }> {
	try {
		const res = await fetch('/api/rezervace', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		return { ok: res.ok };
	} catch {
		return { ok: false };
	}
}

export async function submitContact(data: ContactValues): Promise<{ ok: boolean }> {
	// TODO: před deployem napojit na Web3Forms / Formspree / Resend.
	// Endpoint odesílá potvrzení na cabin.manager.email (tom.pavela@seznam.cz).
	console.info('[contact] TODO: odeslat e-mail', data);
	await new Promise((r) => setTimeout(r, 600));
	return { ok: true };
}
