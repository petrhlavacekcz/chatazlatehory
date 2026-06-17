<script lang="ts">
	import Icon from '@iconify/svelte';
	import { galleryImages, galleryCategories } from '$lib/content/gallery';
	import { cn } from '$lib/utils/cn';
	import { cabin } from '$lib/content/cabin';

	let activeCategory = $state<(typeof galleryCategories)[number]['id']>('all');

	const filteredImages = $derived(
		activeCategory === 'all'
			? galleryImages
			: galleryImages.filter((img) => img.category === activeCategory)
	);

	let lightboxSrc = $state<string | null>(null);
	let lightboxAlt = $state<string>('');

	function openLightbox(src: string, alt: string) {
		lightboxSrc = src;
		lightboxAlt = alt;
	}

	function closeLightbox() {
		lightboxSrc = null;
	}
</script>

<svelte:head>
	<title>Fotogalerie · {cabin.name}</title>
	<meta name="description" content="Fotogalerie chaty — exteriér, interiér, areál i okolní krajina Jeseníků." />
</svelte:head>

<section class="border-b border-[var(--color-border)] bg-[var(--color-background)] pt-12 pb-16 md:pb-20">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<p class="label text-[var(--color-accent-text)]">Galerie</p>
		<h1 class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]" style="font-size: clamp(2.25rem, 6vw, 3.75rem);">
			Fotky chaty a okolí
		</h1>
	</div>
</section>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<!-- Filtr -->
		<div class="mb-10 flex flex-wrap gap-2">
			{#each galleryCategories as category (category.id)}
				<button
					onclick={() => (activeCategory = category.id)}
					class={cn(
						'rounded-full px-4 py-2 font-sans text-sm transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)]',
						activeCategory === category.id
							? 'bg-[var(--color-dark)] text-[var(--color-dark-foreground)]'
							: 'bg-[var(--color-surface)] text-[var(--color-muted)] ring-1 ring-[var(--color-border)] hover:text-[var(--color-foreground)] hover:ring-[var(--color-accent)]'
					)}
					aria-pressed={activeCategory === category.id}
				>
					{category.label}
				</button>
			{/each}
		</div>

		<div class="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
			{#each filteredImages as image (image.src)}
				<button
					onclick={() => openLightbox(image.src, image.alt)}
					class="group block w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]"
					aria-label={`Zvětšit: ${image.alt}`}
				>
					<img
						src={image.src}
						alt={image.alt}
						loading="lazy"
						class="w-full object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-105"
					/>
				</button>
			{/each}
		</div>

		{#if filteredImages.length === 0}
			<p class="py-12 text-center font-sans text-[var(--color-muted)]">V této kategorii zatím nejsou fotky.</p>
		{/if}
	</div>
</section>

{#if lightboxSrc}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-dark-deep)]/95 p-4 backdrop-blur-sm"
		onclick={closeLightbox}
		onkeydown={(e) => e.key === 'Escape' && closeLightbox()}
		role="dialog"
		aria-modal="true"
		aria-label="Náhled fotografie"
		tabindex="0"
	>
		<button
			class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-dark-foreground)]/80 hover:text-[var(--color-accent)]"
			onclick={closeLightbox}
			aria-label="Zavřít"
		>
			<Icon icon="tabler:x" class="h-6 w-6" />
		</button>
		<img
			src={lightboxSrc}
			alt={lightboxAlt}
			class="max-h-[90vh] max-w-full rounded-[var(--radius-md)] object-contain shadow-[var(--shadow-hover)]"
		/>
		<p class="absolute bottom-6 left-0 right-0 px-6 text-center font-sans text-sm text-[var(--color-dark-foreground)]/70">
			{lightboxAlt}
		</p>
	</div>
{/if}
