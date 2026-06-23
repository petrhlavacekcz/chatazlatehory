<script lang="ts">
	import { cabin } from '$lib/content/cabin';
	import { amenities } from '$lib/content/amenities';
	import { galleryImages } from '$lib/content/gallery';
	import AmenityList from '$lib/components/sections/AmenityList.svelte';
	import Icon from '@iconify/svelte';

	// Reprezentativní výběr fotek — ne duplikát celé galerie.
	// Detailní prohlídka patří do /galerie/, tady jen ochutnávka interiéru.
	const aboutImages = galleryImages.filter((img) => img.category === 'interior').slice(0, 6);
</script>

<svelte:head>
	<title>O chatě · {cabin.name}</title>
	<meta
		name="description"
		content={`Podrobnosti o chatě ${cabin.name} v areálu ${cabin.area} — kapacita, dispozice, vybavení, areál a majitel.`}
	/>
</svelte:head>

<!-- Header sekce -->
<section class="border-b border-[var(--color-border)] bg-[var(--color-background)] pb-16 md:pb-20">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<p class="label text-[var(--color-accent-text)]">O chatě</p>
		<h1
			class="mt-6 max-w-3xl font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
			style="font-size: clamp(2.25rem, 6vw, 3.75rem);"
		>
			{cabin.name} v areálu {cabin.area}
		</h1>
	</div>
</section>

<!-- Příběh + dispozice -->
<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
			<div
				class="space-y-5 font-sans text-base leading-relaxed text-[var(--color-muted)] md:text-lg"
			>
				{#each cabin.aboutExtended as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
			<aside
				class="rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-8 ring-1 ring-[var(--color-border)] md:self-start"
			>
				<h2 class="label text-[var(--color-accent-text)]">Dispozice</h2>
				<dl class="mt-6 space-y-4">
					{#each cabin.disposition as row (row.label)}
						<div
							class="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-4 last:border-0 last:pb-0"
						>
							<dt class="font-sans text-sm text-[var(--color-muted)]">{row.label}</dt>
							<dd
								class="text-right font-serif text-base font-normal text-[var(--color-foreground)]"
							>
								{row.value}
							</dd>
						</div>
					{/each}
				</dl>
			</aside>
		</div>
	</div>
</section>

<!-- Fotky interiéru (ochutnávka, plná galerie samostatně) -->
<section class="bg-[var(--color-surface)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
			<h2
				class="max-w-2xl font-serif font-light leading-[1.1] text-[var(--color-foreground)]"
				style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
			>
				Podívejte se dovnitř
			</h2>
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
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each aboutImages as image (image.src)}
				<div
					class="overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-background)] shadow-[var(--shadow-soft)]"
				>
					<picture>
						<source type="image/avif" srcset={image.src} />
						<img
							src={image.src.replace('.avif', '.webp')}
							alt={image.alt}
							loading="lazy"
							class="aspect-[4/3] w-full object-cover"
						/>
					</picture>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Vybavení (sdílená komponenta = stejný pattern jako Home) -->
<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="mb-16 max-w-2xl">
			<p class="label text-[var(--color-accent-text)]">Vybavení</p>
			<h2
				class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
				style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
			>
				Vše pro klidný pobyt
			</h2>
		</div>

		<AmenityList items={amenities} columns={2} />

		<div class="mt-12">
			<a
				href="/#rezervace"
				class="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 font-sans text-sm font-medium tracking-wide text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-hover)]"
			>
				Rezervovat termín
			</a>
		</div>
	</div>
</section>

<!-- Majitel -->
<section
	class="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--spacing-section)]"
>
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
			<div>
				<p class="label text-[var(--color-accent-text)]">Majitel</p>
				<h2
					class="mt-6 font-serif font-light leading-[1.1] text-[var(--color-foreground)]"
					style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
				>
					{cabin.manager.name}
				</h2>
				<p class="mt-2 font-sans text-sm text-[var(--color-muted)]">{cabin.manager.role}</p>
			</div>
			<div class="space-y-6">
				<p class="font-sans text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
					{cabin.manager.bio}
				</p>
				<dl class="flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--color-border)] pt-6">
					<div class="flex items-center gap-3">
						<Icon
							icon="tabler:phone"
							class="h-5 w-5 text-[var(--color-accent)]"
							aria-hidden="true"
						/>
						<a
							href={`tel:${cabin.manager.phone.replace(/\s/g, '')}`}
							class="font-sans text-base text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
						>
							{cabin.manager.phone}
						</a>
					</div>
					<div class="flex items-center gap-3">
						<Icon
							icon="tabler:mail"
							class="h-5 w-5 text-[var(--color-accent)]"
							aria-hidden="true"
						/>
						<a
							href={`mailto:${cabin.manager.email}`}
							class="font-sans text-base text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
						>
							{cabin.manager.email}
						</a>
					</div>
				</dl>
			</div>
		</div>
	</div>
</section>
