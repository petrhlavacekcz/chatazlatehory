<script lang="ts">
	import { cabin } from '$lib/content/cabin';
	import { contactSchema, submitContact, type FieldErrors, type ContactValues } from '$lib/utils/forms';
	import Icon from '@iconify/svelte';

	type FormState = 'idle' | 'submitting' | 'success' | 'error';

	let formState = $state<FormState>('idle');
	let errors = $state<FieldErrors<ContactValues>>({});
	let values = $state<Partial<ContactValues>>({});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const raw = Object.fromEntries(formData.entries());

		const parsed = contactSchema.safeParse(raw);
		if (!parsed.success) {
			const fieldErrors: FieldErrors<ContactValues> = {};
			for (const [key, errs] of Object.entries(parsed.error.flatten().fieldErrors)) {
				if (errs && errs.length) fieldErrors[key as keyof ContactValues] = errs[0];
			}
			errors = fieldErrors;
			values = raw as Partial<ContactValues>;
			return;
		}

		errors = {};
		values = parsed.data;
		formState = 'submitting';

		try {
			const res = await submitContact(parsed.data);
			formState = res.ok ? 'success' : 'error';
		} catch {
			formState = 'error';
		}
	}

	const hasError = (field: keyof ContactValues) => errors[field];
</script>

<svelte:head>
	<title>Kontakt · {cabin.name}</title>
	<meta name="description" content={`Kontaktujte správce chaty ${cabin.name}.`} />
</svelte:head>

<section class="border-b border-[var(--color-border)] bg-[var(--color-background)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)] py-16 md:py-24">
		<p class="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Kontakt</p>
		<h1 class="mt-4 max-w-3xl font-light tracking-[-0.02em] text-[var(--color-foreground)]" style="font-size: clamp(2.25rem, 6vw, 3.5rem); line-height: 1.08;">
			Ozvěte se nám
		</h1>
	</div>
</section>

<section class="bg-[var(--color-background)] py-[var(--spacing-section)]">
	<div class="mx-auto max-w-6xl px-[var(--spacing-container)]">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Kontaktní údaje -->
			<div>
				<h2 class="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Správce chaty</h2>
				<div class="mt-6 space-y-6">
					<div>
						<p class="text-2xl font-light text-[var(--color-foreground)]">{cabin.manager.name}</p>
						<p class="mt-1 text-sm text-[var(--color-muted)]">{cabin.manager.role}</p>
					</div>

					<dl class="space-y-4 border-t border-[var(--color-border)] pt-6">
						<div class="flex items-center gap-4">
							<Icon icon="tabler:phone" class="h-5 w-5 text-primary" aria-hidden="true" />
							<a
								href={`tel:${cabin.manager.phone.replace(/\s/g, '')}`}
								class="text-base text-[var(--color-foreground)] transition-colors hover:text-primary"
							>
								{cabin.manager.phone}
							</a>
						</div>
						<div class="flex items-center gap-4">
							<Icon icon="tabler:mail" class="h-5 w-5 text-primary" aria-hidden="true" />
							<a
								href={`mailto:${cabin.manager.email}`}
								class="text-base text-[var(--color-foreground)] transition-colors hover:text-primary"
							>
								{cabin.manager.email}
							</a>
						</div>
						<div class="flex items-center gap-4">
							<Icon icon="tabler:map-pin" class="h-5 w-5 text-primary" aria-hidden="true" />
							<p class="text-base text-[var(--color-foreground)]">{cabin.location.address}</p>
						</div>
					</dl>
				</div>
			</div>

			<!-- Krátký formulář -->
			<div>
				<h2 class="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Napište nám</h2>

				{#if formState === 'success'}
					<div class="mt-6 rounded-[var(--radius-md)] border border-[var(--color-accent)]/30 bg-[var(--color-surface)] p-6">
						<div class="flex items-center gap-3">
							<Icon icon="tabler:circle-check" class="h-6 w-6 text-primary" />
							<p class="text-base font-medium text-[var(--color-foreground)]">Zpráva byla odeslána.</p>
						</div>
						<p class="mt-2 text-sm text-[var(--color-muted)]">Ozveme se vám co nejdříve.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="mt-6 space-y-5">
						<div>
							<label for="name" class="block text-sm font-medium text-[var(--color-foreground)]">Jméno</label>
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
								<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">{hasError('name')}</p>
							{/if}
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-[var(--color-foreground)]">E-mail</label>
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
								<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">{hasError('email')}</p>
							{/if}
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-[var(--color-foreground)]">Zpráva</label>
							<textarea
								id="message"
								name="message"
								rows="5"
								required
								class="mt-2 w-full resize-y rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:outline-none"
								placeholder="Jak vám můžeme pomoci?"
								aria-invalid={!!hasError('message')}
							></textarea>
							{#if hasError('message')}
								<p class="mt-1 text-sm text-[var(--color-accent)]" role="alert">{hasError('message')}</p>
							{/if}
						</div>

						{#if formState === 'error'}
							<p class="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-accent)]" role="alert">
								Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište e-mail.
							</p>
						{/if}

						<button
							type="submit"
							disabled={formState === 'submitting'}
							class="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-hover)] disabled:opacity-60 sm:w-auto"
						>
							{formState === 'submitting' ? 'Odesíláme…' : 'Odeslat zprávu'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
