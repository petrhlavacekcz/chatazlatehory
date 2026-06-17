<script lang="ts">
	import { cabin } from '$lib/content/cabin';
	import { heroImage } from '$lib/content/gallery';
</script>

<!--
	Hero — full viewport fotka, text v levém dolním rohu (kde je fotka tmavší).
	Silný vertikální gradient zespodu pro čitelnost.
	Veliký light serif headline, tracked uppercase label nad ním.
-->
<section class="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[var(--color-dark-deep)]">
	<img
		src={heroImage.src}
		alt={heroImage.alt}
		class="absolute inset-0 h-full w-full object-cover"
		fetchpriority="high"
	/>
	<!-- Vertikální gradient zespodu (espresso) — zajišťuje čitelnost textu.
	     Horizontální gradient zleva pro lepší kontrast v levém rohu. -->
	<div class="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-deep)] via-[var(--color-dark-deep)]/60 to-[var(--color-dark-deep)]/20"></div>
	<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-deep)]/70 via-transparent to-transparent"></div>

	<div class="relative mx-auto w-full max-w-7xl px-[var(--spacing-container)] pb-16 pt-32 md:pb-24">
		<div class="max-w-2xl">
			<p class="label text-[var(--color-accent)]">
				{cabin.area} · {cabin.location.region}
			</p>
			<h1
				class="mt-6 font-serif font-light leading-[1.02] text-[var(--color-dark-foreground)]"
				style="font-size: clamp(2.75rem, 9vw, 6rem); letter-spacing: -0.02em;"
			>
				{cabin.tagline}
			</h1>
			<p class="mt-8 max-w-md font-sans text-base leading-relaxed text-[var(--color-dark-foreground)]/70 md:text-lg">
				Dřevěná horská chata v srdci Jeseníků. Místo, kam se na chvíli zastaví čas.
			</p>

			<div class="mt-10 flex flex-wrap items-center gap-4">
				<a
					href="/rezervace/"
					class="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 font-sans text-sm font-medium tracking-wide text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)]"
				>
					Rezervovat termín
				</a>
				<a
					href="/galerie/"
					class="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-dark-foreground)]/30 px-8 font-sans text-sm font-medium tracking-wide text-[var(--color-dark-foreground)] backdrop-blur-sm transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:border-[var(--color-dark-foreground)]/70 hover:bg-[var(--color-dark-foreground)]/10"
				>
					Galerie
				</a>
			</div>
		</div>

		<!-- Klidný horizontální pruh statistik dole -->
		<dl class="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-[var(--color-dark-foreground)]/15 pt-8 md:gap-x-20">
			{#each cabin.highlights as highlight (highlight.label)}
				<div class="flex items-baseline gap-2">
					<dt class="font-serif text-2xl font-light text-[var(--color-dark-foreground)]">{highlight.value}</dt>
					<dd class="label !text-[0.6rem] text-[var(--color-dark-foreground)]/55">{highlight.label}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
