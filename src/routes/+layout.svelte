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
</script>

<svelte:head>
	<title>{cabin.name} · {cabin.tagline}</title>
	<meta name="description" content={`${cabin.about[0].slice(0, 155)}`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${cabin.name} · ${cabin.tagline}`} />
	<meta property="og:locale" content="cs_CZ" />
	<meta property="og:image" content="/img/gallery/1.avif" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "LodgingBusiness",
			"name": "{cabin.name}",
			"description": "{cabin.about[0]}",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "{cabin.location.city}",
				"addressRegion": "{cabin.location.region}",
				"addressCountry": "CZ"
			},
			"occupancy": {
				"@type": "QuantitativeValue",
				"maxValue": {cabin.capacity.guests}
			}
		}
	</script>
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<Header bind:mobileOpen transparent={isHome} />
	<main class="flex-1 pt-20" class:pt-0={isHome}>
		{@render children()}
	</main>
	<Footer />
</div>
