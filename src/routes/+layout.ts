// Prerender většiny webu (SSG dle AGENTS.md).
// Výjimky: stránky s form actions (rezervace, kontakt) — ty nelze prerenderovat,
// běží jako dynamické (při nasazení edge/serverless funkce).
// adapter-static s fallback to zvládne: statické stránky + dynamické formuláře.
export const prerender = 'auto';
export const trailingSlash = 'always';
