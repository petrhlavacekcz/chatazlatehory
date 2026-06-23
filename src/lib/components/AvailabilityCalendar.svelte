<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils/cn';

	type OccupiedRange = { from: string; to: string; status: 'approved' | 'pending' };
	type SelectionState = 'start' | 'end' | 'mid' | 'single';

	let {
		months = 2,
		selectable = false,
		selectedFrom = $bindable(null),
		selectedTo = $bindable(null)
	}: {
		months?: number;
		selectable?: boolean;
		selectedFrom?: string | null;
		selectedTo?: string | null;
	} = $props();

	let ranges = $state<OccupiedRange[]>([]);
	let loading = $state(true);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	let pivotYear = $state(today.getFullYear());
	let pivotMonth = $state(today.getMonth());

	onMount(async () => {
		try {
			const res = await fetch('/api/dostupnost');
			if (res.ok) ranges = await res.json();
		} catch {
			// gracefully show all-free
		}
		loading = false;
	});

	function toISO(d: Date): string {
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	}

	function parseISO(iso: string): Date {
		const [y, m, d] = iso.split('-').map(Number);
		return new Date(y, m - 1, d);
	}

	function getDays(year: number, month: number): (Date | null)[] {
		const first = new Date(year, month, 1);
		const last = new Date(year, month + 1, 0);
		const startPad = (first.getDay() + 6) % 7; // Mon = 0
		const days: (Date | null)[] = Array.from({ length: startPad }, () => null);
		for (let d = 1; d <= last.getDate(); d++) {
			days.push(new Date(year, month, d));
		}
		return days;
	}

	function getStatus(date: Date): 'approved' | 'pending' | null {
		const iso = toISO(date);
		for (const r of ranges) {
			if (iso >= r.from && iso <= r.to) return r.status;
		}
		return null;
	}

	// Returns true when the occupied strip should start (rounded left cap)
	function isVisualStart(date: Date, status: 'approved' | 'pending'): boolean {
		const dow = (date.getDay() + 6) % 7; // Mon=0
		if (dow === 0) return true; // row boundary always resets the strip
		const prev = new Date(date);
		prev.setDate(prev.getDate() - 1);
		return getStatus(prev) !== status;
	}

	// Returns true when the occupied strip should end (rounded right cap)
	function isVisualEnd(date: Date, status: 'approved' | 'pending'): boolean {
		const dow = (date.getDay() + 6) % 7;
		if (dow === 6) return true; // row boundary
		const next = new Date(date);
		next.setDate(next.getDate() + 1);
		return getStatus(next) !== status;
	}

	// ── Výběr termínu (jen v selectable režimu) ──────────────────────────────
	function rangeHasOccupied(fromIso: string, toIso: string): boolean {
		const end = parseISO(toIso);
		for (let d = parseISO(fromIso); d <= end; d.setDate(d.getDate() + 1)) {
			if (getStatus(d)) return true;
		}
		return false;
	}

	function handleDayClick(date: Date) {
		if (!selectable || date < today || getStatus(date)) return;
		const iso = toISO(date);

		// Žádný (nebo dokončený) výběr → začni od tohoto dne.
		if (!selectedFrom || (selectedFrom && selectedTo)) {
			selectedFrom = iso;
			selectedTo = null;
			return;
		}

		// Rozpracovaný výběr (jen příjezd).
		if (iso === selectedFrom) {
			selectedFrom = null;
			selectedTo = null;
		} else if (iso < selectedFrom || rangeHasOccupied(selectedFrom, iso)) {
			// Klik před příjezdem nebo přes obsazený den → restart od tohoto dne.
			selectedFrom = iso;
			selectedTo = null;
		} else {
			selectedTo = iso;
		}
	}

	function getSelection(date: Date): SelectionState | null {
		if (!selectedFrom) return null;
		const iso = toISO(date);
		if (!selectedTo) return iso === selectedFrom ? 'single' : null;
		if (iso < selectedFrom || iso > selectedTo) return null;
		if (iso === selectedFrom && iso === selectedTo) return 'single';
		if (iso === selectedFrom) return 'start';
		if (iso === selectedTo) return 'end';
		return 'mid';
	}

	function selVisualStart(date: Date): boolean {
		const dow = (date.getDay() + 6) % 7;
		if (dow === 0) return true;
		const prev = new Date(date);
		prev.setDate(prev.getDate() - 1);
		return !getSelection(prev);
	}

	function selVisualEnd(date: Date): boolean {
		const dow = (date.getDay() + 6) % 7;
		if (dow === 6) return true;
		const next = new Date(date);
		next.setDate(next.getDate() + 1);
		return !getSelection(next);
	}

	const displayMonths = $derived(
		Array.from({ length: months }, (_, i) => {
			const d = new Date(pivotYear, pivotMonth + i, 1);
			return { year: d.getFullYear(), month: d.getMonth() };
		})
	);

	const canGoPrev = $derived(
		pivotYear > today.getFullYear() ||
			(pivotYear === today.getFullYear() && pivotMonth > today.getMonth())
	);

	function prev() {
		const d = new Date(pivotYear, pivotMonth - 1, 1);
		pivotYear = d.getFullYear();
		pivotMonth = d.getMonth();
	}

	function next() {
		const d = new Date(pivotYear, pivotMonth + 1, 1);
		pivotYear = d.getFullYear();
		pivotMonth = d.getMonth();
	}

	const MONTHS = [
		'Leden',
		'Únor',
		'Březen',
		'Duben',
		'Květen',
		'Červen',
		'Červenec',
		'Srpen',
		'Září',
		'Říjen',
		'Listopad',
		'Prosinec'
	];
	const DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
</script>

<div class="select-none">
	<!-- Navigation header -->
	<div class="mb-6 flex items-center gap-4">
		<button
			onclick={prev}
			disabled={!canGoPrev}
			aria-label="Předchozí měsíc"
			class={cn(
				'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
				canGoPrev
					? 'text-[var(--color-foreground)] hover:bg-[var(--color-surface)]'
					: 'cursor-not-allowed text-[var(--color-muted)]/25'
			)}
		>
			<Icon icon="tabler:chevron-left" class="h-5 w-5" />
		</button>

		<div class={cn('grid flex-1', months >= 2 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
			{#each displayMonths as m}
				<p class="text-center font-serif text-lg font-light text-[var(--color-foreground)]">
					{MONTHS[m.month]}
					{m.year}
				</p>
			{/each}
		</div>

		<button
			onclick={next}
			aria-label="Následující měsíc"
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface)]"
		>
			<Icon icon="tabler:chevron-right" class="h-5 w-5" />
		</button>
	</div>

	{#if loading}
		<div class={cn('grid gap-6', months >= 2 ? 'sm:grid-cols-2' : '')}>
			{#each Array.from({ length: months }) as _}
				<div class="animate-pulse">
					<div class="grid grid-cols-7">
						{#each Array.from({ length: 35 }) as _}
							<div class="m-0.5 h-8 rounded-full bg-[var(--color-border)]/50"></div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class={cn('grid gap-6', months >= 2 ? 'sm:grid-cols-2' : '')}>
			{#each displayMonths as m (m.year + '-' + m.month)}
				<div>
					<!-- Day name headers -->
					<div class="mb-1 grid grid-cols-7">
						{#each DAYS as d}
							<div
								class="py-2 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-muted)]/55"
							>
								{d}
							</div>
						{/each}
					</div>

					<!-- Day cells -->
					<div class="grid grid-cols-7">
						{#each getDays(m.year, m.month) as day}
							{#if day === null}
								<div class="h-9"></div>
							{:else}
								{@const status = getStatus(day)}
								{@const isPast = day < today}
								{@const isTodayDay = toISO(day) === toISO(today)}
								{@const vStart = status ? isVisualStart(day, status) : false}
								{@const vEnd = status ? isVisualEnd(day, status) : false}
								{@const isSingle = vStart && vEnd}
								{@const sel = selectable ? getSelection(day) : null}
								{@const selStart = sel ? selVisualStart(day) : false}
								{@const selEnd = sel ? selVisualEnd(day) : false}
								{@const selSingle = selStart && selEnd}
								{@const cap = selStart || selEnd || selSingle}
								{@const interactive = selectable && !status && !isPast}

								<svelte:element
									this={interactive ? 'button' : 'div'}
									type={interactive ? 'button' : null}
									role={interactive ? 'button' : null}
									aria-label={interactive
										? `Vybrat ${day.getDate()}. ${MONTHS[day.getMonth()]} ${day.getFullYear()}`
										: null}
									onclick={interactive ? () => handleDayClick(day) : null}
									class={cn(
										'group relative flex h-9 w-full items-center justify-center',
										interactive && 'cursor-pointer'
									)}
								>
									<!-- Range strip (background highlight for consecutive days) -->
									{#if status}
										<div
											class={cn(
												'pointer-events-none absolute inset-y-[5px]',
												status === 'approved'
													? 'bg-[var(--color-dark)]'
													: 'bg-[var(--color-muted)]/15',
												isSingle
													? 'left-[8%] right-[8%] rounded-full'
													: vStart
														? 'left-1/2 right-0 rounded-l-full'
														: vEnd
															? 'left-0 right-1/2 rounded-r-full'
															: 'left-0 right-0'
											)}
										></div>
									{:else if sel}
										<div
											class={cn(
												'pointer-events-none absolute inset-y-[5px] bg-[var(--color-accent)]/15',
												selSingle
													? 'left-[8%] right-[8%] rounded-full'
													: selStart
														? 'left-1/2 right-0 rounded-l-full'
														: selEnd
															? 'left-0 right-1/2 rounded-r-full'
															: 'left-0 right-0'
											)}
										></div>
									{/if}

									<!-- Day number circle -->
									<span
										class={cn(
											'relative z-10 flex h-7 w-7 items-center justify-center rounded-full font-sans text-sm leading-none transition-colors',
											status === 'approved'
												? vStart || vEnd || isSingle
													? 'bg-[var(--color-dark)] font-medium text-[var(--color-dark-foreground)]'
													: 'text-[var(--color-dark-foreground)]'
												: '',
											status === 'pending'
												? vStart || vEnd || isSingle
													? 'bg-[var(--color-muted)]/20 font-medium text-[var(--color-foreground)]'
													: 'text-[var(--color-foreground)]'
												: '',
											sel && cap
												? 'bg-[var(--color-accent)] font-medium text-[var(--color-accent-foreground)]'
												: '',
											sel && !cap ? 'text-[var(--color-foreground)]' : '',
											!status && !sel && isPast ? 'text-[var(--color-muted)]/35' : '',
											!status && !sel && !isPast ? 'text-[var(--color-foreground)]' : '',
											interactive && !sel
												? 'group-hover:ring-1 group-hover:ring-[var(--color-accent)]/40'
												: '',
											isTodayDay && !cap
												? 'ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-background)]'
												: ''
										)}
									>
										{day.getDate()}
									</span>
								</svelte:element>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Legend -->
		<div
			class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-4 font-sans text-xs text-[var(--color-muted)]"
		>
			{#if selectable}
				<div class="flex items-center gap-2">
					<span class="h-3 w-3 rounded-full bg-[var(--color-accent)]"></span>
					Vybraný termín
				</div>
			{/if}
			<div class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[var(--color-dark)]"></span>
				Obsazeno
			</div>
			<div class="flex items-center gap-2">
				<span
					class="h-3 w-3 rounded-full bg-[var(--color-muted)]/20 ring-1 ring-[var(--color-muted)]/30"
				></span>
				Čeká na potvrzení
			</div>
			<div class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full ring-1 ring-[var(--color-border)]"></span>
				Volné
			</div>
		</div>
	{/if}
</div>
