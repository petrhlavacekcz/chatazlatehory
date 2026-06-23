import adapterAuto from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto: statické stránky zůstanou pre-renderované,
		// API routes (/api/*) a /admin/ poběží jako serverless funkce.
		// Deployment: Vercel (free tier) — detekuje SvelteKit automaticky.
		adapter: adapterAuto(),
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path.includes('favicon') || path.includes('.svg')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
