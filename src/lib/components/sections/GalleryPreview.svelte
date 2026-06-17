<script lang="ts">
	import { galleryPreview } from '$lib/content/gallery';
	import { cn } from '$lib/utils/cn';
</script>

<section class="bg-[var(--color-surface)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mb-14 flex flex-wrap items-end justify-between gap-6">
			<div>
				<p class="label text-[var(--color-accent-text)]">Galerie</p>
				<h2
					class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
					style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
				>
					Podívejte se,<br />jaké to tu je
				</h2>
			</div>
			<a
				href="/galerie/"
				class="group inline-flex items-center gap-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
			>
				Celá galerie
				<span
					class="inline-block h-px w-10 bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] group-hover:w-16"
				></span>
			</a>
		</div>

		<!-- Editorial: velká fotka vlevo, 2x2 grid vpravo -->
		<div class="grid gap-4 md:grid-cols-2">
			<a href="/galerie/" class="group relative overflow-hidden rounded-[var(--radius-lg)]">
				<img
					src={galleryPreview[0].src}
					alt={galleryPreview[0].alt}
					loading="eager"
					class="aspect-[4/3] w-full object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-105 md:aspect-[4/5]"
				/>
			</a>
			<div class="grid grid-cols-2 gap-4">
				{#each galleryPreview.slice(1, 5) as image (image.src)}
					<a href="/galerie/" class="group relative overflow-hidden rounded-[var(--radius-lg)]">
						<img
							src={image.src}
							alt={image.alt}
							loading="lazy"
							class="aspect-square w-full object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-105"
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
