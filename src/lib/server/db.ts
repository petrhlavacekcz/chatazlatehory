import { createClient, type Client } from '@libsql/client';
import { env } from '$env/dynamic/private';

let _db: Client | null = null;

export function getDb(): Client {
	if (!_db) {
		const url = env.TURSO_DATABASE_URL;
		if (!url) {
			throw new Error('TURSO_DATABASE_URL není nastavena.');
		}
		_db = createClient({
			url,
			authToken: env.TURSO_AUTH_TOKEN
		});
	}
	return _db;
}

export async function initDb() {
	await getDb().execute(`
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
