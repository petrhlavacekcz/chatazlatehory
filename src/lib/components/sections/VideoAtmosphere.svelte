<script lang="ts">
	// Video sekce — distill. Žádné další obsahové proměnné nepotřebujeme.
</script>

<!--
	Video sekce — distill. Video JE moment, text je jen nádech.
	Jeden tracked label + jeden krátký light serif řádek, vlevo dole.
	Žádný subheadline, žádný popis — ať video dýchá.

	Mobil: video je 100% šířky, výška podle 16:9 formátu (žádné oříznutí).
	Desktop (md+): immersive režim — sekce 85svh, video object-cover cropuje.
-->
<section
	class="relative flex items-end overflow-hidden bg-[var(--color-dark-deep)] md:min-h-[85svh]"
>
	<video
		class="relative block aspect-video w-full object-cover object-center md:absolute md:inset-0 md:h-full md:w-full md:aspect-auto"
		poster="/img/gallery/1.avif"
		autoplay
		muted
		loop
		playsinline
		preload="metadata"
		aria-label="Atmosféra chaty Zlaté Hory"
	>
		<source src="/video/cabin-atmosphere.mp4" type="video/mp4" />
	</video>

	<!-- Jemný gradient zespodu pro čitelnost textu -->
	<div
		class="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-deep)]/80 via-transparent to-transparent"
	></div>

	<div
		class="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-[var(--spacing-container)] pb-10 md:relative md:pt-32 md:pb-24"
	>
		<div class="max-w-xl">
			<p class="label text-[var(--color-accent)]">Atmosféra</p>
			<p
				class="mt-5 font-serif font-light leading-[1.05] text-[var(--color-dark-foreground)]"
				style="font-size: clamp(2rem, 5vw, 3.5rem);"
			>
				Cítit to ticho
			</p>
		</div>
	</div>
</section>
