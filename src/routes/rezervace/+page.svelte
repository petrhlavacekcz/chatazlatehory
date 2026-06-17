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

	type FormState = 'idle' | 'submitting' | 'success' | 'error';

	let formState = $state<FormState>('idle');
	let errors = $state<FieldErrors<InquiryValues>>({});
	let values = $state<Partial<InquiryValues>>({});

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

<svelte:head>
	<title>Rezervace a ceník · {cabin.name}</title>
	<meta name="description" content={`Rezervační dotaz a ceník chaty ${cabin.name}.`} />
</svelte:head>

<section class="border-b border-[var(--color-border)] bg-[var(--color-background)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)] py-16 md:py-24">
		<p class="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
			Rezervace
		</p>
		<h1
			class="mt-4 max-w-3xl font-light tracking-[-0.02em] text-[var(--color-foreground)]"
			style="font-size: clamp(2.25rem, 6vw, 3.5rem); line-height: 1.08;"
		>
			Vyberte si termín a napište nám
		</h1>
		<p class="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
			Nemáme online kalendář — obsazenost řešíme ručně. Vyplňte dotaz a my se do 24 hodin ozveme s
			potvrzením a dalšími kroky.
		</p>
	</div>
</section>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
			<!-- Ceník -->
			<div>
				<h2 class="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
					Ceník
				</h2>
				<div class="mt-6 space-y-4">
					{#each pricing as tier (tier.id)}
						<div class="rounded-[var(--radius-md)] border border-[var(--color-border)] p-6">
							<div class="flex items-baseline justify-between gap-4">
								<h3 class="text-base font-medium text-[var(--color-foreground)]">{tier.label}</h3>
								<span class="text-2xl font-light text-[var(--color-foreground)]"
									>{formatPrice(tier.amount)}</span
								>
							</div>
							<p class="mt-1 text-sm text-[var(--color-muted)]">{tier.period}</p>
							{#if tier.note}
								<p class="mt-1 text-xs text-[var(--color-muted)]/80">{tier.note}</p>
							{/if}
						</div>
					{/each}
				</div>
				{#if pricingNotes.length}
					<ul class="mt-8 space-y-2">
						{#each pricingNotes as note (note)}
							<li class="flex items-start gap-2 text-sm text-[var(--color-muted)]">
								<Icon
									icon="tabler:check"
									class="mt-0.5 h-4 w-4 shrink-0 text-primary"
									aria-hidden="true"
								/>
								{note}
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Formulář -->
			<div>
				<h2 class="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
					Rezervační dotaz
				</h2>

				{#if formState === 'success'}
					<div
						class="mt-6 rounded-[var(--radius-md)] border border-[var(--color-accent)]/30 bg-[var(--color-surface)] p-6"
					>
						<div class="flex items-center gap-3">
							<Icon icon="tabler:circle-check" class="h-6 w-6 text-primary" />
							<p class="text-base font-medium text-[var(--color-foreground)]">
								Děkujeme! Dotaz jsme přijali.
							</p>
						</div>
						<p class="mt-2 text-sm text-[var(--color-muted)]">
							Ozveme se vám na uvedený e-mail, obvykle do 24 hodin.
						</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="mt-6 space-y-5">
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

						<!-- Termín -->
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
									value={values.dateFrom ?? ''}
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
									value={values.dateTo ?? ''}
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
								placeholder="Máme psa, přijíždíme v pátek odpoledne..."></textarea>
						</div>

						{#if formState === 'error'}
							<p
								class="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-accent)]"
								role="alert"
							>
								Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište e-mail.
							</p>
						{/if}

						<button
							type="submit"
							disabled={formState === 'submitting'}
							class="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-hover)] disabled:opacity-60 sm:w-auto"
						>
							{formState === 'submitting' ? 'Odesíláme…' : 'Odeslat rezervační dotaz'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
