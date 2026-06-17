<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Props = {
		size?: 'default' | 'narrow' | 'wide';
		class?: string;
		children: Snippet;
	};

	let { size = 'default', class: klass, children }: Props = $props();

	const sizes = {
		// Fluid container padding (clamp) — AGENTS.md spacing-container token
		default: 'mx-auto max-w-6xl px-[var(--spacing-container)]',
		narrow: 'mx-auto max-w-3xl px-[var(--spacing-container)]',
		wide: 'mx-auto max-w-[min(100%,90rem)] px-[var(--spacing-container)]'
	};
</script>

<div class={cn(sizes[size], klass)}>
	{@render children()}
</div>
