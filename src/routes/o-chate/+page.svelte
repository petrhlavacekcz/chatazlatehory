<script lang="ts">
	import { cabin } from '$lib/content/cabin';
	import { amenities } from '$lib/content/amenities';
	import { galleryImages } from '$lib/content/gallery';
	import Icon from '@iconify/svelte';

	const aboutImages = galleryImages.filter(
		(img) => img.category === 'exterior' || img.category === 'interior'
	);
</script>

<svelte:head>
	<title>O chatě · {cabin.name}</title>
	<meta
		name="description"
		content={`Podrobnosti o chatě ${cabin.name} v areálu ${cabin.area} — kapacita, dispozice, vybavení.`}
	/>
</svelte:head>

<!-- Header sekce -->
<section class="border-b border-[var(--color-border)] bg-[var(--color-background)] pb-16 md:pb-20">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<p class="label text-[var(--color-accent-text)]">O chatě</p>
		<h1
			class="mt-5 max-w-3xl font-serif font-light leading-[1.08] text-[var(--color-foreground)]"
			style="font-size: clamp(2.25rem, 6vw, 3.75rem);"
		>
			{cabin.name} v areálu {cabin.area}
		</h1>
	</div>
</section>

<!-- Dispozice + text -->
<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
			<div
				class="space-y-5 font-sans text-base leading-relaxed text-[var(--color-muted)] md:text-lg"
			>
				{#each cabin.about as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
			<aside
				class="rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-8 ring-1 ring-[var(--color-border)]"
			>
				<h2 class="label text-[var(--color-accent-text)]">Dispozice</h2>
				<dl class="mt-6 space-y-5">
					{#each [['Kapacita', `${cabin.capacity.guests} hostů`], ['Ložnice', `${cabin.capacity.bedrooms}`], ['Koupelna', `${cabin.capacity.bathrooms}`], ['WC', `${cabin.capacity.wc}`], ['Lokalita', 'Zlaté Hory – Bohemaland']] as [label, value] (label)}
						<div
							class="flex items-baseline justify-between border-b border-[var(--color-border)] pb-4 last:border-0 last:pb-0"
						>
							<dt class="font-sans text-sm text-[var(--color-muted)]">{label}</dt>
							<dd class="text-right font-serif text-lg font-normal text-[var(--color-foreground)]">
								{value}
							</dd>
						</div>
					{/each}
				</dl>
			</aside>
		</div>
	</div>
</section>

<!-- Fotky -->
<section class="bg-[var(--color-surface)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<h2
			class="mb-10 font-serif font-light text-[var(--color-foreground)]"
			style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
		>
			Podívejte se dovnitř
		</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each aboutImages as image (image.src)}
				<div
					class="overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-background)] shadow-[var(--shadow-soft)]"
				>
					<img
						src={image.src}
						alt={image.alt}
						loading="lazy"
						class="aspect-[4/3] w-full object-cover"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Vybavení -->
<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<h2
			class="mb-12 max-w-2xl font-serif font-light text-[var(--color-foreground)]"
			style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
		>
			Vybavení chaty
		</h2>
		<dl class="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2">
			{#each amenities as amenity (amenity.title)}
				<div class="group flex gap-5">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)] transition-colors group-hover:ring-[var(--color-accent)]"
					>
						<Icon
							icon={amenity.icon}
							class="h-5 w-5 text-[var(--color-accent)]"
							aria-hidden="true"
						/>
					</div>
					<div>
						<dt class="font-serif text-lg font-normal text-[var(--color-foreground)]">
							{amenity.title}
						</dt>
						<dd class="mt-1.5 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
							{amenity.description}
						</dd>
					</div>
				</div>
			{/each}
		</dl>

		<div class="mt-12">
			<a
				href="/rezervace/"
				class="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 font-sans text-sm font-medium tracking-wide text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-hover)]"
			>
				Rezervovat termín
			</a>
		</div>
	</div>
</section>
