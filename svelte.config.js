import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Static site generation (SSG) — dotaz + ceník, bez DB.
		// Viz AGENTS.md: architektura by neměla blokovat pozdější přidání booking systému,
		// ale tato fáze je statická. Formulář odesílá přes fetch na serverless endpoint
		// (Resend / edge function), nepoužívá SvelteKit form actions (ty vyžadují server).
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false
		}),
		// Prerender vše statického; chyby 404 řeš jako nekritické.
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignoruj chybějící assety (favicon atd.) — nekritické.
				if (path.includes('favicon') || path.includes('.svg')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
