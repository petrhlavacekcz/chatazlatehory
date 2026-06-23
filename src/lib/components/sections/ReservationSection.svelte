<script lang="ts">
	import { pricing, pricingNotes } from '$lib/content/pricing';
	import { formatPrice } from '$lib/utils/format';
	import { cabin } from '$lib/content/cabin';
	import {
		inquirySchema,
		submitInquiry,
		type FieldErrors,
		type InquiryValues
	} from '$lib/utils/forms';
	import Icon from '@iconify/svelte';
	import AvailabilityCalendar from '$lib/components/AvailabilityCalendar.svelte';

	type FormState = 'idle' | 'submitting' | 'success' | 'error';

	let formState = $state<FormState>('idle');
	let errors = $state<FieldErrors<InquiryValues>>({});
	let values = $state<Partial<InquiryValues>>({});

	// Termín řízený kalendářem — obousměrně propojený s date inputy ve formuláři.
	let selectedFrom = $state<string | null>(null);
	let selectedTo = $state<string | null>(null);

	const tier = pricing[0];

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const raw = Object.fromEntries(formData.entries());

		const parsed = inquirySchema.safeParse(raw);
		if (!parsed.success) {
			const fieldErrors: FieldErrors<InquiryValues> = {};
			for (const [key, errs] of Object.entries(parsed.error.flatten().fieldErrors)) {
				if (errs && errs.length) fieldErrors[key as keyof InquiryValues] = errs[0];
			}
			errors = fieldErrors;
			values = raw as Partial<InquiryValues>;
			return;
		}

		errors = {};
		values = parsed.data;
		formState = 'submitting';

		try {
			const res = await submitInquiry(parsed.data);
			formState = res.ok ? 'success' : 'error';
		} catch {
			formState = 'error';
		}
	}

	const hasError = (field: keyof InquiryValues) => errors[field];
</script>

<section id="rezervace" class="scroll-mt-24 bg-[var(--color-surface)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-7xl px-[var(--spacing-container)]">
		<!-- Header -->
		<div class="mb-12 max-w-2xl">
			<p class="label text-[var(--color-accent-text)]">Rezervace</p>
			<h2
				class="mt-6 font-serif font-light leading-[1.05] text-[var(--color-foreground)]"
				style="font-size: clamp(2.25rem, 5vw, 3.5rem);"
			>
				Rezervujte si termín
			</h2>
			<p class="mt-4 font-sans text-base leading-relaxed text-[var(--color-muted)]">
				Vyberte volný termín v kalendáři a odešlete nezávaznou poptávku — obsazenost potvrdíme
				obvykle do 24 hodin.
			</p>
		</div>

		<!-- Kalendář (klikací výběr termínu) -->
		<AvailabilityCalendar months={2} selectable bind:selectedFrom bind:selectedTo />

		<div class="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
			<!-- Ceník (stručně) -->
			<div>
				<h3 class="label text-[var(--color-muted)]">Ceník</h3>
				<div
					class="mt-5 rounded-[var(--radius-lg)] bg-[var(--color-dark)] p-9 shadow-[var(--shadow-hover)]"
				>
					<p class="label text-[var(--color-dark-foreground)]/60">{tier.label}</p>
					<p class="mt-4 font-serif text-5xl font-light text-[var(--color-dark-foreground)]">
						{formatPrice(tier.amount)}
					</p>
					<p class="mt-2 font-sans text-sm text-[var(--color-dark-foreground)]/55">{tier.period}</p>
					{#if tier.note}
						<p class="mt-1 font-sans text-xs text-[var(--color-dark-foreground)]/40">{tier.note}</p>
					{/if}
				</div>

				<!-- Check-in / Check-out -->
				<div class="mt-6 flex gap-6">
					<div class="flex items-center gap-2 text-sm text-[var(--color-muted)]">
						<Icon
							icon="tabler:clock-check"
							class="h-4 w-4 shrink-0 text-[var(--color-accent)]"
							aria-hidden="true"
						/>
						<span
							>Příjezd od <strong class="text-[var(--color-foreground)]">{cabin.checkIn}</strong
							></span
						>
					</div>
					<div class="flex items-center gap-2 text-sm text-[var(--color-muted)]">
						<Icon
							icon="tabler:clock-x"
							class="h-4 w-4 shrink-0 text-[var(--color-accent)]"
							aria-hidden="true"
						/>
						<span
							>Odjezd do <strong class="text-[var(--color-foreground)]">{cabin.checkOut}</strong
							></span
						>
					</div>
				</div>

				{#if pricingNotes.length}
					<ul class="mt-6 space-y-2">
						{#each pricingNotes as note (note)}
							<li class="flex items-start gap-2 text-sm text-[var(--color-muted)]">
								<Icon
									icon="tabler:check"
									class="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
									aria-hidden="true"
								/>
								{note}
							</li>
						{/each}
					</ul>
				{/if}

				<!-- Obsazený termín -->
				<p
					class="mt-6 border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-relaxed text-[var(--color-muted)]"
				>
					Pokud je vámi zvolený termín obsazený, prosím zavolejte nám — rádi vymyslíme jiný termín
					nebo jinou chatku v areálu k vaší spokojenosti.
				</p>
			</div>

			<!-- Formulář -->
			<div>
				<h3 class="label text-[var(--color-muted)]">Rezervační dotaz</h3>

				{#if formState === 'success'}
					<div
						class="mt-5 rounded-[var(--radius-md)] border border-[var(--color-accent)]/30 bg-[var(--color-background)] p-6"
					>
						<div class="flex items-center gap-3">
							<Icon icon="tabler:circle-check" class="h-6 w-6 text-[var(--color-accent)]" />
							<p class="text-base font-medium text-[var(--color-foreground)]">
								Děkujeme! Dotaz jsme přijali.
							</p>
						</div>
						<p class="mt-2 text-sm text-[var(--color-muted)]">
							Ozveme se vám na uvedený e-mail, obvykle do 24 hodin.
						</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="mt-5 space-y-5">
						<!-- Jméno -->
						<div>
							<label for="name" class="block text-sm font-medium text-[var(--color-foreground)]"
								>Jméno a příjmení</label
							>
							<input
								id="name"
								name="name"
								type="text"
								value={values.name ?? ''}
								required
								class="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:outline-none"
								placeholder="Jan Novák"
								aria-invalid={!!hasError('name')}
							/>
							{#if hasError('name')}
								<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">
									{hasError('name')}
								</p>
							{/if}
						</div>

						<!-- E-mail + telefon -->
						<div class="grid gap-5 sm:grid-cols-2">
							<div>
								<label for="email" class="block text-sm font-medium text-[var(--color-foreground)]"
									>E-mail</label
								>
								<input
									id="email"
									name="email"
									type="email"
									value={values.email ?? ''}
									required
									class="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:outline-none"
									placeholder="jan@example.com"
									aria-invalid={!!hasError('email')}
								/>
								{#if hasError('email')}
									<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">
										{hasError('email')}
									</p>
								{/if}
							</div>
							<div>
								<label for="phone" class="block text-sm font-medium text-[var(--color-foreground)]"
									>Telefon (volitelné)</label
								>
								<input
									id="phone"
									name="phone"
									type="tel"
									value={values.phone ?? ''}
									class="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:outline-none"
									placeholder="+420 ..."
								/>
							</div>
						</div>

						<!-- Termín (synchronizovaný s kalendářem) -->
						<div class="grid gap-5 sm:grid-cols-2">
							<div>
								<label
									for="dateFrom"
									class="block text-sm font-medium text-[var(--color-foreground)]">Příjezd</label
								>
								<input
									id="dateFrom"
									name="dateFrom"
									type="date"
									value={selectedFrom ?? ''}
									oninput={(e) => (selectedFrom = e.currentTarget.value || null)}
									required
									class="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
								/>
								{#if hasError('dateFrom')}
									<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">
										{hasError('dateFrom')}
									</p>
								{/if}
							</div>
							<div>
								<label for="dateTo" class="block text-sm font-medium text-[var(--color-foreground)]"
									>Odjezd</label
								>
								<input
									id="dateTo"
									name="dateTo"
									type="date"
									value={selectedTo ?? ''}
									oninput={(e) => (selectedTo = e.currentTarget.value || null)}
									required
									class="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
								/>
								{#if hasError('dateTo')}
									<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">
										{hasError('dateTo')}
									</p>
								{/if}
							</div>
						</div>

						<!-- Počet osob -->
						<div>
							<label for="guests" class="block text-sm font-medium text-[var(--color-foreground)]"
								>Počet osob</label
							>
							<input
								id="guests"
								name="guests"
								type="number"
								min="1"
								max={cabin.capacity.guests}
								value={values.guests ?? ''}
								class="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
								placeholder={`max. ${cabin.capacity.guests}`}
							/>
						</div>

						<!-- Zpráva -->
						<div>
							<label for="message" class="block text-sm font-medium text-[var(--color-foreground)]"
								>Poznámka (volitelné)</label
							>
							<textarea
								id="message"
								name="message"
								rows="4"
								class="mt-2 w-full resize-y rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:outline-none"
								placeholder="Máme psa, přijíždíme v pátek odpoledne..."
								>{values.message ?? ''}</textarea
							>
						</div>

						{#if formState === 'error'}
							<p
								class="rounded-[var(--radius-sm)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-accent)]"
								role="alert"
							>
								Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište e-mail.
							</p>
						{/if}

						<button
							type="submit"
							disabled={formState === 'submitting'}
							class="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-base font-medium text-[var(--color-accent-foreground)] transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-hover)] disabled:opacity-60 sm:w-auto"
						>
							{formState === 'submitting' ? 'Odesíláme…' : 'Odeslat rezervační dotaz'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
