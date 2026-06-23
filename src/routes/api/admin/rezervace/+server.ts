import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { ADMIN_PASSWORD } from '$env/static/private';

function checkAuth(request: Request): boolean {
	const auth = request.headers.get('authorization') ?? '';
	return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export const GET: RequestHandler = async ({ request, url }) => {
	if (!checkAuth(request)) return json({ error: 'Unauthorized' }, { status: 401 });

	const status = url.searchParams.get('status') ?? 'all';
	const sql =
		status === 'all'
			? 'SELECT * FROM reservations ORDER BY created_at DESC'
			: 'SELECT * FROM reservations WHERE status = ? ORDER BY created_at DESC';
	const args = status === 'all' ? [] : [status];

	const result = await db.execute({ sql, args });
	return json(result.rows);
};

export const PATCH: RequestHandler = async ({ request }) => {
	if (!checkAuth(request)) return json({ error: 'Unauthorized' }, { status: 401 });

	const { id, status, note } = await request.json();
	if (!id) return json({ error: 'Chybí id' }, { status: 400 });

	await db.execute({
		sql: 'UPDATE reservations SET status = COALESCE(?, status), note = COALESCE(?, note) WHERE id = ?',
		args: [status ?? null, note ?? null, id]
	});

	return json({ ok: true });
};
