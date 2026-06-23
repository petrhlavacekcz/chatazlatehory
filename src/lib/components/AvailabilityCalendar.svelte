<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils/cn';

	type OccupiedRange = { from: string; to: string; status: 'approved' | 'pending' };

	let { months = 2 }: { months?: number } = $props();

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
		'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
		'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
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
					{MONTHS[m.month]} {m.year}
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
		<div class={cn('grid gap-8', months >= 2 ? 'sm:grid-cols-2' : '')}>
			{#each Array.from({ length: months }) as _}
				<div class="animate-pulse">
					<div class="grid grid-cols-7">
						{#each Array.from({ length: 35 }) as _}
							<div class="m-0.5 h-9 rounded-full bg-[var(--color-border)]/50"></div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class={cn('grid gap-8', months >= 2 ? 'sm:grid-cols-2' : '')}>
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
								<div class="h-10"></div>
							{:else}
								{@const status = getStatus(day)}
								{@const isPast = day < today}
								{@const isTodayDay = toISO(day) === toISO(today)}
								{@const vStart = status ? isVisualStart(day, status) : false}
								{@const vEnd = status ? isVisualEnd(day, status) : false}
								{@const isSingle = vStart && vEnd}

								<div class="relative flex h-10 items-center justify-center">
									<!-- Range strip (background highlight for consecutive days) -->
									{#if status}
										<div
											class={cn(
												'pointer-events-none absolute inset-y-[6px]',
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
									{/if}

									<!-- Day number circle -->
									<span
										class={cn(
											'relative z-10 flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm leading-none',
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
											!status && isPast ? 'text-[var(--color-muted)]/35' : '',
											!status && !isPast ? 'text-[var(--color-foreground)]' : '',
											isTodayDay
												? 'ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-background)]'
												: ''
										)}
									>
										{day.getDate()}
									</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Legend -->
		<div
			class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-5 font-sans text-xs text-[var(--color-muted)]"
		>
			<div class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[var(--color-dark)]"></span>
				Obsazeno
			</div>
			<div class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[var(--color-muted)]/20 ring-1 ring-[var(--color-muted)]/30"></span>
				Čeká na potvrzení
			</div>
			<div class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full ring-1 ring-[var(--color-border)]"></span>
				Volné
			</div>
		</div>
	{/if}
</div>
