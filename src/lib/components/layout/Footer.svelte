<script lang="ts">
	import { footerNavItems as navItems } from '$lib/content/nav';
	import { cabin } from '$lib/content/cabin';
	import Icon from '@iconify/svelte';
</script>

<footer class="bg-[var(--color-dark-deep)] text-[var(--color-dark-foreground)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)] py-20">
		<div class="grid gap-12 md:grid-cols-3">
			<div class="space-y-4">
				<p class="font-serif text-2xl font-light">{cabin.name}</p>
				<p class="max-w-xs font-sans text-sm leading-relaxed text-[var(--color-dark-foreground)]/55">
					{cabin.location.city}, {cabin.location.region}. {cabin.area}.
				</p>
			</div>

			<nav aria-label="Navigace v patičce" class="space-y-5">
				<p class="label text-[var(--color-accent)]">Procházet</p>
				<ul class="space-y-3">
					{#each navItems as item (item.href)}
						<li>
							<a href={item.href} class="font-sans text-sm text-[var(--color-dark-foreground)]/65 transition-colors hover:text-[var(--color-accent)]">
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="space-y-5">
				<p class="label text-[var(--color-accent)]">Kontakt</p>
				<ul class="space-y-3 font-sans text-sm">
					<li>
						<a
							href={`tel:${cabin.manager.phone.replace(/\s/g, '')}`}
							class="inline-flex items-center gap-2 text-[var(--color-dark-foreground)]/65 transition-colors hover:text-[var(--color-accent)]"
						>
							<Icon icon="tabler:phone" class="h-4 w-4 text-[var(--color-dark-foreground)]/35" />
							{cabin.manager.phone}
						</a>
					</li>
					<li>
						<a
							href={`mailto:${cabin.manager.email}`}
							class="inline-flex items-center gap-2 text-[var(--color-dark-foreground)]/65 transition-colors hover:text-[var(--color-accent)]"
						>
							<Icon icon="tabler:mail" class="h-4 w-4 text-[var(--color-dark-foreground)]/35" />
							{cabin.manager.email}
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-16 flex flex-col items-start justify-between gap-2 border-t border-[var(--color-dark-foreground)]/10 pt-8 font-sans text-xs text-[var(--color-dark-foreground)]/35 sm:flex-row sm:items-center">
			<p>© {new Date().getFullYear()} {cabin.name}. Všechna práva vyhrazena.</p>
			<p>{cabin.location.address}</p>
		</div>
	</div>
</footer>
