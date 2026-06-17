<script lang="ts">
	import Icon from '@iconify/svelte';
	import { trips } from '$lib/content/okoli';
	import { cabin } from '$lib/content/cabin';
</script>

<svelte:head>
	<title>Okolí a tipy na výlety · {cabin.name}</title>
	<meta name="description" content={`Co dělat v okolí ${cabin.location.city} — turistika, lyžování, cyklotrasy a památky v Jeseníkách.`} />
</svelte:head>

<section class="border-b border-[var(--color-border)] bg-[var(--color-background)] pb-16 md:pb-20">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<p class="label text-[var(--color-accent-text)]">Okolí</p>
		<h1 class="mt-5 max-w-3xl font-serif font-light leading-[1.08] text-[var(--color-foreground)]" style="font-size: clamp(2.25rem, 6vw, 3.75rem);">
			Co podniknout v {cabin.location.region.toLowerCase()}
		</h1>
		<p class="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
			{cabin.location.city} jsou výchozím bodem pro objevování Jeseníků. Od chaty vás dělí kilometry od turistických tras, lyžařských areálů i historických památek.
		</p>
	</div>
</section>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
			{#each trips as trip (trip.id)}
				<a
					href={trip.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex gap-5 rounded-[var(--radius-md)] bg-[var(--color-surface)] p-7 ring-1 ring-[var(--color-border)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:shadow-[var(--shadow-hover)] hover:ring-[var(--color-accent)]/40 md:p-8"
				>
					<Icon icon={trip.icon} class="h-8 w-8 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
					<div class="flex-1">
						<div class="flex items-baseline justify-between gap-4">
							<h2 class="font-serif text-xl font-normal text-[var(--color-foreground)]">{trip.title}</h2>
							<span class="inline-flex shrink-0 items-center gap-1 font-sans text-xs text-[var(--color-muted)]">
								<Icon icon="tabler:map-pin" class="h-3.5 w-3.5" />
								{trip.distance}
							</span>
						</div>
						<p class="mt-2 font-sans text-sm leading-relaxed text-[var(--color-muted)]">{trip.description}</p>
						<span class="mt-4 inline-flex items-center gap-1 font-sans text-sm text-[var(--color-accent)] transition-transform duration-[var(--duration-base)] group-hover:translate-x-1">
							Dozvědět se více
							<Icon icon="tabler:arrow-up-right" class="h-4 w-4" />
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
