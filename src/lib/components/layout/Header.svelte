<script lang="ts">
	import { page } from '$app/state';
	import { navItems } from '$lib/content/nav';
	import { cabin } from '$lib/content/cabin';
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';

	let {
		mobileOpen = $bindable(false),
		transparent = false
	}: { mobileOpen?: boolean; transparent?: boolean } = $props();

	const isActive = (href: string) => {
		const current = page.url.pathname.replace(/\/$/, '');
		const target = href.replace(/\/$/, '');
		if (target === '') return current === '';
		return current === target || current.startsWith(target + '/');
	};

	// Scroll-aware: transparent header je světlý text nad tmavým herem.
	// Po scrollu >80px (nebo když není transparent) přepne na solid cream + tmavý text.
	let scrolled = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 80;
	}

	const solid = $derived(!transparent || scrolled);

	const logoColor = $derived(
		solid ? 'text-[var(--color-foreground)]' : 'text-[var(--color-dark-foreground)]'
	);
	const subColor = $derived(
		solid ? 'text-[var(--color-muted)]' : 'text-[var(--color-dark-foreground)]/55'
	);
	const navItemColor = $derived(
		solid ? 'text-[var(--color-muted)]' : 'text-[var(--color-dark-foreground)]/90'
	);
	const navItemHover = $derived(
		solid ? 'hover:text-[var(--color-foreground)]' : 'hover:text-[var(--color-dark-foreground)]'
	);
	const toggleColor = $derived(
		solid ? 'text-[var(--color-foreground)]' : 'text-[var(--color-dark-foreground)]'
	);

	// Lock scroll when mobile menu open
	$effect(() => {
		if (mobileOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window onscroll={onScroll} />

<header
	class={cn(
		'left-0 right-0 top-0 z-50 transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)]',
		mobileOpen
			? 'absolute'
			: solid
				? 'sticky bg-[var(--color-background)]/95 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md'
				: 'absolute'
	)}
>
	<div
		class="mx-auto flex h-20 max-w-7xl items-center justify-between px-[var(--spacing-container)]"
	>
		<!-- Logo (left) — ikona chaty + název -->
		<a href="/" class="flex items-center gap-2.5 leading-none" aria-label="{cabin.name} — domů">
			<Icon
				icon="tabler:building-cottage"
				class={cn(
					'h-6 w-6 shrink-0 transition-colors sm:h-7 sm:w-7',
					mobileOpen ? 'text-[var(--color-dark-foreground)]' : logoColor
				)}
				aria-hidden="true"
			/>
			<span class="flex flex-col">
				<span
					class={cn(
						'font-serif text-base font-light tracking-tight transition-colors sm:text-lg',
						mobileOpen ? 'text-[var(--color-dark-foreground)]' : logoColor
					)}
				>
					{cabin.name}
				</span>
				<span
					class={cn(
						'label !text-[0.6rem] !tracking-[0.2em] transition-colors',
						mobileOpen ? 'text-[var(--color-dark-foreground)]/55' : subColor
					)}
				>
					{cabin.area}
				</span>
			</span>
		</a>

		<!-- Desktop nav + CTA (1024px+) -->
		<div class="hidden items-center gap-10 lg:flex">
			<nav aria-label="Hlavní navigace">
				<ul class="flex items-center gap-10">
					{#each navItems as item (item.href)}
						<li>
							<a
								href={item.href}
								class={cn(
									'label !tracking-[0.18em] transition-colors duration-[var(--duration-base)]',
									isActive(item.href)
										? 'text-[var(--color-accent)]'
										: cn(navItemColor, navItemHover)
								)}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<a
				href="/#rezervace"
				class="rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-sans text-sm font-medium text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)]"
			>
				Rezervovat
			</a>
		</div>

		<!-- Mobile/tablet toggle (do 1023px) -->
		<button
			class={cn(
				'inline-flex h-10 w-10 items-center justify-center transition-colors lg:hidden',
				mobileOpen ? 'text-[var(--color-dark-foreground)]' : toggleColor
			)}
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label={mobileOpen ? 'Zavřít menu' : 'Otevřít menu'}
			aria-expanded={mobileOpen}
		>
			<Icon icon={mobileOpen ? 'tabler:x' : 'tabler:menu-2'} class="h-6 w-6" />
		</button>
	</div>
</header>

<!--
	Full-screen mobilní overlay menu — dramatické espresso pozadí,
	velký serif text, kontakt info dole. Luxury hospitality feel.
	Automaticky otevřené na <1024px (lg breakpoint).
-->
{#if mobileOpen}
	<!-- Scrim + panel: fixed, plnoobrazovkový overlay -->
	<div
		class="fixed inset-0 z-40 bg-[var(--color-dark-deep)] lg:hidden"
		role="dialog"
		aria-modal="true"
		aria-label="Menu"
	>
		<!-- Pozadí s jemnou fotkou pro atmosféru (optional, velmi potlačené) -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-[var(--color-dark)] via-[var(--color-dark-deep)] to-black"
		></div>

		<!-- Obsah menu -->
		<div class="relative flex h-full flex-col px-[var(--spacing-container)] pb-12 pt-24">
			<!-- Navigace — velký serif, prostor, tracked labels -->
			<nav class="flex flex-1 flex-col justify-center" aria-label="Mobilní navigace">
				<ul class="space-y-2">
					{#each navItems as item, i (item.href)}
						<li
							class="overflow-hidden"
							style="animation: menu-item-in 0.5s var(--ease-luxe) {0.08 + i * 0.06}s both;"
						>
							<a
								href={item.href}
								onclick={() => (mobileOpen = false)}
								class={cn(
									'group flex items-baseline gap-4 font-serif font-light leading-none transition-colors',
									isActive(item.href)
										? 'text-[var(--color-accent)]'
										: 'text-[var(--color-dark-foreground)] hover:text-[var(--color-accent)]'
								)}
								style="font-size: clamp(2rem, 11vw, 3.5rem);"
							>
								<!-- Číslo položky — tracked, jemné, accent -->
								<span
									class="font-sans text-xs font-medium tracking-[0.2em] text-[var(--color-accent)]/60 mt-2"
								>
									0{i + 1}
								</span>
								<span
									class="transition-transform duration-[var(--duration-base)] ease-[var(--ease-luxe)] group-hover:translate-x-2"
								>
									{item.label}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Spodní sekce: CTA + kontakt info -->
			<div class="space-y-6 border-t border-[var(--color-dark-foreground)]/15 pt-8">
				<a
					href="/#rezervace"
					onclick={() => (mobileOpen = false)}
					class="flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] font-sans text-sm font-medium tracking-wide text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)]"
				>
					Rezervovat termín
				</a>

				<!-- Kontakt info -->
				<div class="flex flex-col gap-3 font-sans text-sm text-[var(--color-dark-foreground)]/55">
					<a
						href={`tel:${cabin.manager.phone.replace(/\s/g, '')}`}
						class="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
					>
						<Icon icon="tabler:phone" class="h-4 w-4" />
						{cabin.manager.phone}
					</a>
					<a
						href={`mailto:${cabin.manager.email}`}
						class="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
					>
						<Icon icon="tabler:mail" class="h-4 w-4" />
						{cabin.manager.email}
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes menu-item-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		[style*='menu-item-in'] {
			animation: none !important;
		}
	}
</style>
