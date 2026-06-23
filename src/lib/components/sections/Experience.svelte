<script lang="ts">
	import { galleryImages } from '$lib/content/gallery';
	import Icon from '@iconify/svelte';

	const bgImage = galleryImages.find((img) => img.src.includes('40')) ?? galleryImages[0];

	const experiences = [
		{
			icon: 'tabler:flame',
			title: 'Večery u krbu',
			text: 'Praskající oheň a ticho lesa za oknem.'
		},
		{
			icon: 'tabler:shower',
			title: 'Komfort a teplo',
			text: 'Útulné zázemí po celý den — sprcha, teplo, ložní prádlo v ceně.'
		},
		{
			icon: 'tabler:trees',
			title: 'Soukromí v přírodě',
			text: 'Zahrada, les, žádní sousedé v dohledu.'
		}
	];
</script>

<!--
	Experience — tmavý kontrastní panel. Drama, střídání tónů.
-->
<section class="relative overflow-hidden bg-[var(--color-dark-deep)] py-[var(--spacing-section)]">
	<picture>
		<source type="image/avif" srcset={bgImage.src} />
		<img
			src={bgImage.src.replace('.avif', '.webp')}
			alt=""
			aria-hidden="true"
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover opacity-20"
		/>
	</picture>
	<div
		class="absolute inset-0 bg-gradient-to-b from-[var(--color-dark-deep)] via-[var(--color-dark-deep)]/85 to-[var(--color-dark-deep)]"
	></div>

	<div class="relative mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mx-auto mb-16 max-w-2xl text-center">
			<p class="label text-[var(--color-accent)]">Prožitek</p>
			<h2
				class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-dark-foreground)]"
				style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
			>
				Více než jen ubytování
			</h2>
		</div>

		<div class="grid gap-px overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-3">
			{#each experiences as exp (exp.title)}
				<div class="bg-[var(--color-dark)]/50 p-10 backdrop-blur-sm">
					<Icon icon={exp.icon} class="h-8 w-8 text-[var(--color-accent)]" aria-hidden="true" />
					<h3 class="mt-7 font-serif text-2xl font-light text-[var(--color-dark-foreground)]">
						{exp.title}
					</h3>
					<p class="mt-3 font-sans text-sm leading-relaxed text-[var(--color-dark-foreground)]/55">
						{exp.text}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
