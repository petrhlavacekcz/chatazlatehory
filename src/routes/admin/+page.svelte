<script lang="ts">
	import Icon from '@iconify/svelte';

	type Status = 'all' | 'pending' | 'approved' | 'rejected';
	type Reservation = {
		id: string;
		name: string;
		email: string;
		phone: string | null;
		date_from: string;
		date_to: string;
		guests: number | null;
		message: string | null;
		status: 'pending' | 'approved' | 'rejected';
		note: string | null;
		created_at: string;
	};

	let password = $state('');
	let authed = $state(false);
	let authError = $state(false);
	let reservations = $state<Reservation[]>([]);
	let filterStatus = $state<Status>('all');
	let loading = $state(false);
	let editNote = $state<{ id: string; note: string } | null>(null);

	const statusLabel: Record<string, string> = {
		pending: 'Čekající',
		approved: 'Schváleno',
		rejected: 'Odmítnuto'
	};
	const statusColor: Record<string, string> = {
		pending: 'text-amber-600 bg-amber-50',
		approved: 'text-green-700 bg-green-50',
		rejected: 'text-red-600 bg-red-50'
	};

	function storedPassword(): string {
		return sessionStorage.getItem('admin_pw') ?? '';
	}

	async function fetchReservations(pw: string) {
		loading = true;
		const url = filterStatus === 'all' ? '/api/admin/rezervace' : `/api/admin/rezervace?status=${filterStatus}`;
		const res = await fetch(url, { headers: { Authorization: `Bearer ${pw}` } });
		loading = false;
		if (res.status === 401) {
			sessionStorage.removeItem('admin_pw');
			authed = false;
			authError = true;
			return;
		}
		reservations = await res.json();
	}

	async function login() {
		authError = false;
		const res = await fetch('/api/admin/rezervace', {
			headers: { Authorization: `Bearer ${password}` }
		});
		if (res.status === 401) {
			authError = true;
			return;
		}
		sessionStorage.setItem('admin_pw', password);
		authed = true;
		reservations = await res.json();
	}

	async function updateStatus(id: string, status: 'approved' | 'rejected') {
		const pw = storedPassword();
		await fetch('/api/admin/rezervace', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` },
			body: JSON.stringify({ id, status })
		});
		await fetchReservations(pw);
	}

	async function saveNote(id: string, note: string) {
		const pw = storedPassword();
		await fetch('/api/admin/rezervace', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` },
			body: JSON.stringify({ id, note })
		});
		editNote = null;
		await fetchReservations(pw);
	}

	$effect(() => {
		const saved = storedPassword();
		if (saved) {
			authed = true;
			fetchReservations(saved);
		}
	});

	$effect(() => {
		if (authed) fetchReservations(storedPassword());
	});

	const filtered = $derived(
		filterStatus === 'all' ? reservations : reservations.filter((r) => r.status === filterStatus)
	);
</script>

<svelte:head>
	<title>Admin · Rezervace</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if !authed}
	<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
		<div class="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
			<h1 class="mb-6 text-xl font-semibold text-gray-800">Admin přihlášení</h1>
			<form onsubmit={(e) => { e.preventDefault(); login(); }}>
				<input
					type="password"
					bind:value={password}
					placeholder="Heslo"
					class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
				/>
				{#if authError}
					<p class="mt-2 text-sm text-red-600">Špatné heslo.</p>
				{/if}
				<button
					type="submit"
					class="mt-4 w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-medium text-white hover:bg-amber-700"
				>
					Přihlásit se
				</button>
			</form>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50">
		<header class="border-b border-gray-200 bg-white px-6 py-4">
			<div class="mx-auto flex max-w-7xl items-center justify-between">
				<h1 class="text-lg font-semibold text-gray-800">Správa rezervací</h1>
				<button
					onclick={() => { sessionStorage.removeItem('admin_pw'); authed = false; }}
					class="text-sm text-gray-500 hover:text-gray-700"
				>
					Odhlásit
				</button>
			</div>
		</header>

		<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
			<!-- Filtr -->
			<div class="mb-6 flex flex-wrap gap-2">
				{#each (['all', 'pending', 'approved', 'rejected'] as const) as s}
					<button
						onclick={() => { filterStatus = s; fetchReservations(storedPassword()); }}
						class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors {filterStatus === s ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'}"
					>
						{s === 'all' ? 'Vše' : statusLabel[s]}
						{#if s !== 'all'}
							<span class="ml-1 text-xs opacity-70">
								({reservations.filter((r) => r.status === s).length})
							</span>
						{/if}
					</button>
				{/each}
			</div>

			{#if loading}
				<p class="py-12 text-center text-sm text-gray-400">Načítám…</p>
			{:else if filtered.length === 0}
				<p class="py-12 text-center text-sm text-gray-400">Žádné rezervace v této kategorii.</p>
			{:else}
				<div class="space-y-4">
					{#each filtered as r (r.id)}
						<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
							<div class="flex flex-wrap items-start justify-between gap-3">
								<div>
									<div class="flex items-center gap-2">
										<span class="font-semibold text-gray-800">{r.name}</span>
										<span class="rounded-full px-2 py-0.5 text-xs font-medium {statusColor[r.status]}">
											{statusLabel[r.status]}
										</span>
									</div>
									<div class="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-gray-500">
										<a href="mailto:{r.email}" class="hover:text-amber-600">{r.email}</a>
										{#if r.phone}<a href="tel:{r.phone}" class="hover:text-amber-600">{r.phone}</a>{/if}
									</div>
								</div>
								<div class="text-right text-sm text-gray-500">
									<div class="font-medium text-gray-700">
										{r.date_from} – {r.date_to}
									</div>
									{#if r.guests}<div>{r.guests} {r.guests === 1 ? 'osoba' : r.guests < 5 ? 'osoby' : 'osob'}</div>{/if}
									<div class="text-xs">{r.created_at.slice(0, 16).replace('T', ' ')}</div>
								</div>
							</div>

							{#if r.message}
								<p class="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">{r.message}</p>
							{/if}

							<!-- Poznámka admina -->
							{#if editNote?.id === r.id}
								<div class="mt-3 flex gap-2">
									<input
										type="text"
										bind:value={editNote.note}
										placeholder="Poznámka…"
										class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
									/>
									<button
										onclick={() => saveNote(r.id, editNote!.note)}
										class="rounded-lg bg-amber-600 px-3 py-2 text-sm text-white hover:bg-amber-700"
									>
										Uložit
									</button>
									<button
										onclick={() => (editNote = null)}
										class="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
									>
										Zrušit
									</button>
								</div>
							{:else if r.note}
								<button
									onclick={() => (editNote = { id: r.id, note: r.note! })}
									class="mt-2 flex items-center gap-1 text-xs text-amber-600 hover:underline"
								>
									<Icon icon="tabler:pencil" class="h-3 w-3" />
									{r.note}
								</button>
							{/if}

							<!-- Akce -->
							<div class="mt-4 flex flex-wrap gap-2">
								{#if r.status !== 'approved'}
									<button
										onclick={() => updateStatus(r.id, 'approved')}
										class="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
									>
										<Icon icon="tabler:check" class="h-4 w-4" />
										Schválit
									</button>
								{/if}
								{#if r.status !== 'rejected'}
									<button
										onclick={() => updateStatus(r.id, 'rejected')}
										class="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
									>
										<Icon icon="tabler:x" class="h-4 w-4" />
										Odmítnout
									</button>
								{/if}
								<button
									onclick={() => (editNote = { id: r.id, note: r.note ?? '' })}
									class="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
								>
									<Icon icon="tabler:notes" class="h-4 w-4" />
									Poznámka
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</main>
	</div>
{/if}
