<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { page } from '$app/state';
	import { cabin } from '$lib/content/cabin';

	let { children } = $props();

	let mobileOpen = $state(false);

	// Transparent header jen na Home (má hero); ostatní stránky mají solid header.
	const isHome = $derived(page.url.pathname === '/');

	// Absolutní URL pro Open Graph / canonical (social sharing vyžaduje plnou URL).
	const origin = $derived(page.url.origin);
	const canonicalUrl = $derived(page.url.href);

	// schema.org structured data — LodgingBusiness
	const lodgingSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'LodgingBusiness',
		name: cabin.name,
		description: cabin.about[0],
		url: canonicalUrl,
		image: `${origin}/img/gallery/1.webp`,
		telephone: cabin.manager.phone,
		address: {
			'@type': 'PostalAddress',
			addressLocality: cabin.location.city,
			addressRegion: cabin.location.region,
			addressCountry: 'CZ'
		},
		occupancy: {
			'@type': 'QuantitativeValue',
			maxValue: cabin.capacity.guests
		}
	});
</script>

<svelte:head>
	<title>{cabin.name} · {cabin.tagline}</title>
	<meta name="description" content={`${cabin.about[0].slice(0, 155)}`} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph — absolutní URL pro social sharing -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${cabin.name} · ${cabin.tagline}`} />
	<meta property="og:locale" content="cs_CZ" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={`${origin}/img/gallery/1.webp`} />
	<meta property="og:image:alt" content={cabin.tagline} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${cabin.name} · ${cabin.tagline}`} />
	<meta name="twitter:image" content={`${origin}/img/gallery/1.webp`} />

	<!-- schema.org structured data — LodgingBusiness -->
	<!-- prettier-ignore -->
	<script type="application/ld+json">
{JSON.stringify(lodgingSchema)}
	</script>
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<!-- Skip-to-content: klávesnicoví uživatelé přeskočí menu (WCAG 2.4.1) -->
	<a
		href="#main"
		class="sr-only z-[60] rounded-full bg-[var(--color-accent)] px-5 py-2 font-sans text-sm font-medium text-[var(--color-accent-foreground)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
	>
		Přeskočit na obsah
	</a>

	<Header bind:mobileOpen transparent={isHome} />
	<main id="main" class="flex-1" class:pt-20={!isHome}>
		{@render children()}
	</main>
	<Footer />
</div>
