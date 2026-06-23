/**
 * Inicializuje tabulku reservations v Turso DB.
 * Spustit jednou po vytvoření DB: bun run db:init
 * Vyžaduje TURSO_DATABASE_URL a TURSO_AUTH_TOKEN v .env
 */
import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';

const env = Object.fromEntries(
	readFileSync('.env', 'utf-8')
		.split('\n')
		.filter((l) => l.includes('='))
		.map((l) => l.split('=').map((s) => s.trim()))
);

const db = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

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

console.log('✓ Tabulka reservations vytvořena (nebo již existuje)');
db.close();
