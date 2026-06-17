<script lang="ts">
	import { trips } from '$lib/content/okoli';
	import Icon from '@iconify/svelte';

	const previewTrips = trips.slice(0, 3);
</script>

<section class="bg-[var(--color-surface)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mb-14 flex flex-wrap items-end justify-between gap-6">
			<div class="max-w-2xl">
				<p class="label text-[var(--color-accent-text)]">Okolí</p>
				<h2
					class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
					style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
				>
					Co podniknout,<br />když vyrazíte
				</h2>
			</div>
			<a
				href="/okoli/"
				class="group inline-flex items-center gap-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
			>
				Všechny tipy
				<span
					class="inline-block h-px w-10 bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] group-hover:w-16"
				></span>
			</a>
		</div>

		<div class="grid grid-cols-1 gap-5 md:grid-cols-3">
			{#each previewTrips as trip (trip.id)}
				<a
					href={trip.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex flex-col rounded-[var(--radius-lg)] bg-[var(--color-background)] p-9 ring-1 ring-[var(--color-border)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:shadow-[var(--shadow-hover)] hover:ring-[var(--color-accent)]/40"
				>
					<div class="flex items-center justify-between">
						<Icon icon={trip.icon} class="h-7 w-7 text-[var(--color-accent)]" aria-hidden="true" />
						<span class="label !text-[0.6rem] text-[var(--color-muted)]">{trip.distance}</span>
					</div>
					<h3 class="mt-8 font-serif text-2xl font-light text-[var(--color-foreground)]">
						{trip.title}
					</h3>
					<p class="mt-3 flex-1 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
						{trip.description}
					</p>
					<span
						class="mt-6 inline-flex items-center gap-2 font-sans text-sm text-[var(--color-accent)] transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
					>
						Dozvědět se více
						<Icon icon="tabler:arrow-up-right" class="h-4 w-4" />
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
