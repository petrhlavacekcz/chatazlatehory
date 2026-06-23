<script lang="ts">
	import AvailabilityCalendar from '$lib/components/AvailabilityCalendar.svelte';
</script>

<section class="bg-[var(--color-surface)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<div class="mb-12 max-w-2xl">
			<p class="label text-[var(--color-accent-text)]">Obsazenost</p>
			<h2
				class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
				style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
			>
				Kdy je chata volná?
			</h2>
			<p class="mt-4 font-sans text-base leading-relaxed text-[var(--color-muted)]">
				Přehled obsazenosti se aktualizuje v reálném čase. Pokud váš termín je volný, napište nám
				— obsazenost potvrdíme do 24 hodin.
			</p>
		</div>
		<AvailabilityCalendar months={2} />
	</div>
</section>
