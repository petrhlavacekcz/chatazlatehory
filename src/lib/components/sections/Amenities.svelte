<script lang="ts">
	import { amenities } from '$lib/content/amenities';
	import Icon from '@iconify/svelte';
</script>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mb-16 max-w-2xl">
			<p class="label text-[var(--color-accent-text)]">Vybavení</p>
			<h2
				class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
				style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
			>
				Vše pro klidný pobyt
			</h2>
		</div>

		<dl class="grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
			{#each amenities as amenity (amenity.title)}
				<div class="group">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)] transition-all duration-[var(--duration-base)] group-hover:ring-[var(--color-accent)]"
					>
						<Icon
							icon={amenity.icon}
							class="h-5 w-5 text-[var(--color-accent)]"
							aria-hidden="true"
						/>
					</div>
					<dt class="mt-6 font-serif text-lg font-normal text-[var(--color-foreground)]">
						{amenity.title}
					</dt>
					<dd class="mt-2 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
						{amenity.description}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
