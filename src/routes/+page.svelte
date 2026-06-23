<script lang="ts">
	import { cabin } from '$lib/content/cabin';
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
	<title>{cabin.name} · Klid, komfort a příroda v Jeseníkách</title>
	<meta
		name="description"
		content={`Pronájem dřevěné horské chaty v areálu ${cabin.area} ve Zlatých Horách. Klid, komfort a příroda Jeseníků — kapacita ${cabin.capacity.guests} hostů, krb, zahrada, sprchový kout.`}
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
