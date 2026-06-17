<script lang="ts">
	import { heroImage } from '$lib/content/gallery';
	import { cabin } from '$lib/content/cabin';
</script>

<section class="relative overflow-hidden">
	<img
		src={heroImage.src}
		alt=""
		aria-hidden="true"
		loading="lazy"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-[var(--color-dark-deep)]/85"></div>

	<div class="relative mx-auto max-w-4xl px-[var(--spacing-container)] py-28 text-center md:py-40">
		<p class="label text-[var(--color-accent)]">Vaše úniková chata</p>
		<h2
			class="mx-auto mt-7 max-w-2xl font-serif font-light leading-[1.05] text-[var(--color-dark-foreground)]"
			style="font-size: clamp(2.5rem, 6vw, 4.5rem);"
		>
			Přijďte si odpočinout
		</h2>
		<p
			class="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-[var(--color-dark-foreground)]/70 md:text-lg"
		>
			{cabin.location.city}, {cabin.location.region}. Napište nám a my se ozveme s volnými termíny.
		</p>
		<div class="mt-10">
			<a
				href="/rezervace/"
				class="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-10 font-sans text-sm font-medium tracking-wide text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)]"
			>
				Rezervovat termín
			</a>
		</div>
	</div>
</section>
