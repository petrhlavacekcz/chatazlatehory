<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	type Props = {
		class?: string;
		children: Snippet;
	};

	let { class: klass, children }: Props = $props();
</script>

<!--
	Eyebrow — SINGLE záměrný brand kicker.
	DESIGN.md The No-Eyebrow Rule: žádné „O NÁS / CENÍK / GALERIE" nad každou sekcí.
	Používat maximálně jednou na stránce jako záměrný úvod, nikoliv jako grammar.
-->
<p class={cn('text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground', klass)}>
	{@render children()}
</p>
