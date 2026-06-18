<script lang="ts">
	import { amenities } from '$lib/content/amenities';
	import AmenityList from './AmenityList.svelte';
</script>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mb-16 max-w-2xl">
			<p class="label text-[var(--color-accent-text)]">Vybavení</p>
			<h2
				class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
				style="font-size: clamp(2.25rem, 5vw, 3.75rem);"
			>
				Vše pro klidný pobyt
			</h2>
		</div>

		<AmenityList items={amenities} columns={4} />
	</div>
</section>
