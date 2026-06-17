<script lang="ts">
	import { pricing, pricingNotes } from '$lib/content/pricing';
	import { formatPrice } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils/cn';
</script>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mb-16 max-w-2xl">
			<p class="label text-[var(--color-accent-text)]">Ceník</p>
			<h2 class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]" style="font-size: clamp(2.25rem, 5vw, 3.5rem);">
				Jednoduché ceny,<br />bez překvapení
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-5 md:grid-cols-3">
			{#each pricing as tier (tier.id)}
				<div
					class={cn(
						'flex flex-col rounded-[var(--radius-lg)] p-9 transition-all',
						tier.highlight
							? 'bg-[var(--color-dark)] shadow-[var(--shadow-hover)]'
							: 'bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]'
					)}
				>
					{#if tier.highlight}
						<span class="mb-6 inline-flex w-fit rounded-full bg-[var(--color-accent)] px-3 py-1 label !text-[0.6rem] text-[var(--color-accent-foreground)]">
							Nejčastější
						</span>
					{/if}
					<h3 class={cn('label', tier.highlight ? 'text-[var(--color-dark-foreground)]/60' : 'text-[var(--color-muted)]')}>
						{tier.label}
					</h3>
					<div class="mt-5 flex items-baseline gap-1">
						<span class={cn('font-serif text-5xl font-light', tier.highlight ? 'text-[var(--color-dark-foreground)]' : 'text-[var(--color-foreground)]')}>
							{formatPrice(tier.amount)}
						</span>
					</div>
					<p class={cn('mt-3 font-sans text-sm', tier.highlight ? 'text-[var(--color-dark-foreground)]/55' : 'text-[var(--color-muted)]')}>
						{tier.period}
					</p>
					{#if tier.note}
						<p class={cn('mt-1 font-sans text-xs', tier.highlight ? 'text-[var(--color-dark-foreground)]/40' : 'text-[var(--color-muted)]/80')}>
							{tier.note}
						</p>
					{/if}
				</div>
			{/each}
		</div>

		{#if pricingNotes.length}
			<div class="mt-12 grid gap-3 border-t border-[var(--color-border)] pt-10 sm:grid-cols-2">
				{#each pricingNotes as note (note)}
					<p class="flex items-start gap-2 font-sans text-sm text-[var(--color-muted)]">
						<Icon icon="tabler:check" class="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
						{note}
					</p>
				{/each}
			</div>
		{/if}

		<div class="mt-12">
			<a
				href="/rezervace/"
				class="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 font-sans text-sm font-medium tracking-wide text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)]"
			>
				Odeslat rezervační dotaz
			</a>
		</div>
	</div>
</section>
