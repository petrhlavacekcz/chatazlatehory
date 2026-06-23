import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	try {
		const result = await getDb().execute({
			sql: `SELECT date_from, date_to, status
			      FROM reservations
			      WHERE status IN ('pending', 'approved')
			        AND date_to >= date('now')
			      ORDER BY date_from`,
			args: []
		});
		return json(
			result.rows.map((r) => ({
				from: r.date_from as string,
				to: r.date_to as string,
				status: r.status as 'approved' | 'pending'
			}))
		);
	} catch {
		return json([]);
	}
};
