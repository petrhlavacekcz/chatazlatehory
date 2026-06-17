<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	type Props = {
		variant?: 'primary' | 'accent' | 'ghost' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		class?: string;
		children: Snippet;
	} & (HTMLButtonAttributes | HTMLAnchorAttributes);

	let { variant = 'primary', size = 'md', href, class: klass, children, ...rest }: Props = $props();

	// DESIGN.md: single solid barva (gradient text = ban). Ghost-card pattern (border + široký shadow) = ban.
	// Hover lift ≤8px blur. Focus ring v brand accent.
	const base =
		'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';

	const variants = {
		// Deep Sage fill, bílý text (sat mid-luminance → Helmholtz-Kohlrausch)
		primary:
			'bg-primary text-primary-foreground rounded-full hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-hover)]',
		// Warm Clay fill — pro sekundární CTA highlight
		accent:
			'bg-accent text-accent-foreground rounded-full hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-hover)]',
		// Ghost — jen text, podtržení na hover
		ghost: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
		// Outline — hairline border, ink text
		outline:
			'rounded-full border border-border text-foreground hover:border-primary hover:text-primary'
	};

	const sizes = {
		sm: 'h-9 px-4 text-sm',
		md: 'h-11 px-6 text-sm',
		lg: 'h-12 px-8 text-base'
	};

	const classes = $derived(cn(base, variants[variant], sizes[size], klass));
</script>

{#if href}
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button class={classes} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
