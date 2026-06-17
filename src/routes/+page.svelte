<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import VideoAtmosphere from '$lib/components/sections/VideoAtmosphere.svelte';
	import GalleryPreview from '$lib/components/sections/GalleryPreview.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Amenities from '$lib/components/sections/Amenities.svelte';
	import TripsPreview from '$lib/components/sections/TripsPreview.svelte';
	import PricingPreview from '$lib/components/sections/PricingPreview.svelte';
	import CallToAction from '$lib/components/sections/CallToAction.svelte';
</script>

<svelte:head>
	<title>Chata Zlaté Hory · Klid, komfort a příroda v Jeseníkách</title>
	<meta
		name="description"
		content="Pronájem dřevěné horské chaty v areálu Bohemaland ve Zlatých Horách. Klid, komfort a příroda Jeseníků — kapacita 8 hostů, sauna, krb, zahrada."
	/>
</svelte:head>

<!-- Story flow: hero → o chatě → video atmosféra → galerie → prožitek → vybavení → okolí → ceník → CTA -->
<Hero />
<About />
<VideoAtmosphere />
<GalleryPreview />
<Experience />
<Amenities />
<TripsPreview />
<PricingPreview />
<CallToAction />
