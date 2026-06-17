<script lang="ts">
	import { cabin } from '$lib/content/cabin';
	import { galleryImages } from '$lib/content/gallery';

	// Pro About split používáme bezpečnou, atraktivní fotku.
	// Hero (exteriér dusk cabin) je verified dramatický — ideální pro About storytelling.
	const aboutImage = galleryImages[0];
</script>

<!--
	About — split sekce. Text vlevo, fotka vpravo.
	Tracked label, light serif headline, hodně prostoru.
-->
<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
			<!-- Text -->
			<div class="order-1">
				<p class="label text-[var(--color-accent-text)]">{cabin.area}</p>
				<h2 class="mt-7 font-serif font-light leading-[1.05] text-[var(--color-foreground)]" style="font-size: clamp(2.25rem, 5vw, 3.75rem);">
					Místo, kde se<br />zastaví čas
				</h2>
				<div class="mt-8 max-w-md space-y-5 font-sans text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
					{#each cabin.about as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>
				<div class="mt-10">
					<a
						href="/o-chate/"
						class="group inline-flex items-center gap-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
					>
						Více o chatě
						<span class="inline-block h-px w-10 bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] group-hover:w-16"></span>
					</a>
				</div>
			</div>

			<!-- Fotka s floating stat -->
			<div class="relative order-2 lg:pl-8">
				<div class="overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-hover)]">
					<img
						src={aboutImage.src}
						alt={aboutImage.alt}
						loading="lazy"
						class="aspect-[4/5] w-full object-cover"
					/>
				</div>
				<div class="absolute -bottom-8 -left-4 rounded-[var(--radius-md)] bg-[var(--color-dark)] px-8 py-6 shadow-[var(--shadow-hover)] sm:-left-8 lg:-left-12">
					<p class="font-serif text-5xl font-light text-[var(--color-accent)]">{cabin.capacity.guests}</p>
					<p class="label mt-2 text-[var(--color-dark-foreground)]/65">hostů kapacita</p>
				</div>
			</div>
		</div>
	</div>
</section>
