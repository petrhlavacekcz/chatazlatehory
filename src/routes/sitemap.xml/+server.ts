import type { RequestHandler } from './$types';

// Dynamický sitemap.xml — všechny stránky webu.
// Statické web, prerenderovaný — SvelteKit vygeneruje /sitemap.xml.
export const prerender = true;

const baseUrl = 'https://chatazlatehory.cz'; // TODO: doplnit reálnou doménu při nasazení

const routes = [
	{ path: '/', priority: '1.0', changefreq: 'monthly' },
	{ path: '/o-chate/', priority: '0.9', changefreq: 'monthly' },
	{ path: '/galerie/', priority: '0.8', changefreq: 'monthly' },
	{ path: '/okoli/', priority: '0.7', changefreq: 'monthly' },
	{ path: '/kontakt/', priority: '0.7', changefreq: 'monthly' }
];

export const GET: RequestHandler = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
