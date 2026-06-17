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

	let scrolled = $state(false);
	function onScroll() {
		scrolled = window.scrollY > 80;
	}
	const solid = $derived(!transparent || scrolled);

	const logoColor = $derived(solid ? 'text-[var(--color-foreground)]' : 'text-[var(--color-dark-foreground)]');
	const subColor = $derived(solid ? 'text-[var(--color-muted)]' : 'text-[var(--color-dark-foreground)]/55');
	const navItemColor = $derived(solid ? 'text-[var(--color-muted)]' : 'text-[var(--color-dark-foreground)]/85');
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
	<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-[var(--spacing-container)]">
		<!-- Logo (left) — single line na mobile i desktop -->
		<a href="/" class="flex items-baseline gap-2 leading-none">
			<span class={cn('font-serif text-base font-light tracking-tight transition-colors sm:text-lg', logoColor)}>
				{cabin.name}
			</span>
			<span class={cn('label hidden !text-[0.6rem] !tracking-[0.2em] sm:inline', subColor)}>
				{cabin.area}
			</span>
		</a>

		<!-- Center nav (desktop only) -->
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

		<!-- CTA (desktop only) -->
		<a
			href="/rezervace/"
			class="hidden rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-sans text-sm font-medium text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)] md:inline-flex"
		>
			Rezervovat
		</a>

		<!-- Mobile toggle (right) -->
		<button
			class={cn('inline-flex h-10 w-10 items-center justify-center md:hidden', logoColor)}
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
