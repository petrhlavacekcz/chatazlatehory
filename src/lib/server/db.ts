import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export const db = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

export async function initDb() {
	await db.execute(`
		CREATE TABLE IF NOT EXISTS reservations (
			id        TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
			name      TEXT NOT NULL,
			email     TEXT NOT NULL,
			phone     TEXT,
			date_from TEXT NOT NULL,
			date_to   TEXT NOT NULL,
			guests    INTEGER,
			message   TEXT,
			status    TEXT NOT NULL DEFAULT 'pending',
			note      TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now'))
		)
	`);
}
