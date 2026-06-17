<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
	import { cn } from '$lib/utils/cn';

	type Props = {
		/** Mist surface (sage-tinted) pro sekce, které potřebují oddělit od pure white. */
		tone?: 'white' | 'mist';
		/** Vypne horní/bottom padding — např. když sekce přímo navazuje na jinou. */
		flush?: boolean;
		id?: string;
		class?: string;
		children: Snippet;
	};

	let { tone = 'white', flush = false, id, class: klass, children }: Props = $props();

	const tones = {
		white: 'bg-background',
		mist: 'bg-surface'
	};

	// Vary spacing for rhythm (DESIGN.md §Layout). Generous separations, tight groupings.
	const padding = $derived(flush ? '' : 'py-[var(--spacing-section)]');
</script>

<section {id} class={cn(tones[tone], padding, klass)}>
	<Container>
		{@render children()}
	</Container>
</section>
