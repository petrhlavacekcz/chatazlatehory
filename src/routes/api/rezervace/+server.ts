import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { inquirySchema } from '$lib/utils/forms';

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: 'Neplatný formát dat.' }, { status: 400 });
	}

	const parsed = inquirySchema.safeParse(body);
	if (!parsed.success) {
		return json({ ok: false, error: 'Neplatná data formuláře.' }, { status: 422 });
	}

	const { name, email, phone, dateFrom, dateTo, guests, message } = parsed.data;

	try {
		await db.execute({
			sql: `INSERT INTO reservations (name, email, phone, date_from, date_to, guests, message)
			      VALUES (?, ?, ?, ?, ?, ?, ?)`,
			args: [name, email, phone ?? null, dateFrom, dateTo, guests ?? null, message ?? null]
		});
	} catch (err) {
		console.error('[rezervace] DB error:', err);
		return json({ ok: false, error: 'Chyba při ukládání.' }, { status: 500 });
	}

	return json({ ok: true });
};
