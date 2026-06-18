<script lang="ts" module>
	import type { Amenity } from '$lib/content/types';

	export type AmenityListColumns = 2 | 4;
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils/cn';

	let {
		items,
		columns = 4,
		class: klass
	}: { items: Amenity[]; columns?: AmenityListColumns; class?: string } = $props();

	// DESIGN.md §5 / The No-Ghost-Grid Rule: nahá ikona + serif titul (light 300),
	// bez badge/karty. Stejný pattern na Home preview i O chatě — jediný zdroj pravdy.
	const cols = $derived(columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2');
</script>

<dl class={cn('grid grid-cols-1 gap-x-16 gap-y-10', cols, klass)}>
	{#each items as amenity (amenity.title)}
		<div class="group">
			<Icon
				icon={amenity.icon}
				class="h-8 w-8 text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-luxe)] group-hover:text-[var(--color-accent-hover)]"
				aria-hidden="true"
			/>
			<dt
				class="mt-6 font-serif text-2xl font-light leading-tight text-[var(--color-foreground)]"
				style="letter-spacing: -0.015em; text-wrap: balance;"
			>
				{amenity.title}
			</dt>
			<dd class="mt-3 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
				{amenity.description}
			</dd>
		</div>
	{/each}
</dl>
