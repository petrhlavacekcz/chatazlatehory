<script lang="ts">
	// Video sekce — distill. Žádné další obsahové proměnné nepotřebujeme.
</script>

<!--
	Video sekce — distill. Video JE moment, text je jen nádech.
	Jeden tracked label + jeden krátký light serif řádek, vlevo dole.
	Žádný subheadline, žádný popis — ať video dýchá.
-->
<section class="relative flex min-h-[85svh] items-end overflow-hidden bg-[var(--color-dark-deep)]">
	<video
		class="absolute inset-0 h-full w-full object-cover"
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
	<div class="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-deep)]/80 via-transparent to-transparent"></div>

	<div class="relative mx-auto w-full max-w-7xl px-[var(--spacing-container)] pb-16 pt-32 md:pb-24">
		<div class="max-w-xl">
			<p class="label text-[var(--color-accent)]">Atmosféra</p>
			<p class="mt-5 font-serif font-light leading-[1.05] text-[var(--color-dark-foreground)]" style="font-size: clamp(2rem, 5vw, 3.5rem);">
				Cítit to ticho
			</p>
		</div>
	</div>
</section>
