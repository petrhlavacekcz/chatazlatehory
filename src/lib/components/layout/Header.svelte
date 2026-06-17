<script lang="ts">
	import { page } from '$app/state';
	import { navItems } from '$lib/content/nav';
	import { cabin } from '$lib/content/cabin';
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';

	let { mobileOpen = $bindable(false), transparent = false }: { mobileOpen?: boolean; transparent?: boolean } = $props();

	const isActive = (href: string) => {
		const current = page.url.pathname.replace(/\/$/, '');
		const target = href.replace(/\/$/, '');
		if (target === '') return current === '';
		return current === target || current.startsWith(target + '/');
	};

	// Scroll-aware: transparent header se po scrollu (>80px) přepne na solid.
	// Jen na Home, kde je transparent režim — ostatní stránky jsou solid vždy.
	let scrolled = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 80;
	}

	// Solid když: (non-home) NEBO (home a scrollované)
	const solid = $derived(!transparent || scrolled);

	const logoColor = $derived(solid ? 'text-[var(--color-foreground)]' : 'text-[var(--color-dark-foreground)]');
	const subColor = $derived(solid ? 'text-[var(--color-muted)]' : 'text-[var(--color-dark-foreground)]/55');
	const navItemColor = $derived(
		solid ? 'text-[var(--color-muted)]' : 'text-[var(--color-dark-foreground)]/85'
	);
	const navItemHover = $derived(
		solid ? 'hover:text-[var(--color-foreground)]' : 'hover:text-[var(--color-dark-foreground)]'
	);
</script>

<svelte:window onscroll={onScroll} />

<header
	class={cn(
		'left-0 right-0 top-0 z-50 transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)]',
		solid ? 'sticky bg-[var(--color-background)]/95 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md' : 'absolute'
	)}
>
	<div class="mx-auto grid h-20 max-w-7xl grid-cols-3 items-center px-[var(--spacing-container)]">
		<!-- Logo (left) -->
		<a href="/" class="flex flex-col leading-none">
			<span class={cn('font-serif text-lg font-light tracking-tight transition-colors', logoColor)}>
				{cabin.name}
			</span>
			<span class={cn('label !text-[0.6rem] !tracking-[0.2em] mt-0.5', subColor)}>
				{cabin.area}
			</span>
		</a>

		<!-- Center nav (desktop) -->
		<nav class="hidden items-center justify-center gap-10 lg:flex" aria-label="Hlavní navigace">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class={cn(
						'label !tracking-[0.18em] transition-colors duration-[var(--duration-base)]',
						isActive(item.href) ? 'text-[var(--color-accent)]' : cn(navItemColor, navItemHover)
					)}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- CTA (right, desktop) -->
		<div class="hidden justify-end md:flex">
			<a
				href="/rezervace/"
				class="rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-sans text-sm font-medium text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)]"
			>
				Rezervovat
			</a>
		</div>

		<!-- Mobile toggle (right) -->
		<button
			class={cn('col-start-3 inline-flex h-10 w-10 justify-self-end items-center justify-center md:hidden', logoColor)}
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label={mobileOpen ? 'Zavřít menu' : 'Otevřít menu'}
			aria-expanded={mobileOpen}
		>
			<Icon icon={mobileOpen ? 'tabler:x' : 'tabler:menu-2'} class="h-6 w-6" />
		</button>
	</div>

	<!-- Mobile nav -->
	{#if mobileOpen}
		<nav
			class={cn(
				'md:hidden',
				solid ? 'border-t border-[var(--color-border)] bg-[var(--color-background)]' : 'bg-[var(--color-dark-deep)]'
			)}
			aria-label="Mobilní navigace"
		>
			<div class="space-y-1 px-[var(--spacing-container)] py-4">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						class={cn(
							'block px-3 py-3 font-sans text-base transition-colors',
							isActive(item.href)
								? 'text-[var(--color-accent)]'
								: solid
									? 'text-[var(--color-muted)] hover:bg-[var(--color-surface)]'
									: 'text-[var(--color-dark-foreground)]/80 hover:bg-[var(--color-dark-foreground)]/10'
						)}
					>
						{item.label}
					</a>
				{/each}
				<a
					href="/rezervace/"
					onclick={() => (mobileOpen = false)}
					class="mt-2 block rounded-full bg-[var(--color-accent)] px-3 py-3 text-center font-sans font-medium text-[var(--color-accent-foreground)]"
				>
					Rezervovat
				</a>
			</div>
		</nav>
	{/if}
</header>
