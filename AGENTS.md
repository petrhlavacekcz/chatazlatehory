# AGENTS.md

Rychlá reference pro AI agenty (ZCode, Cursor, Claude, …) při práci v tomto repu.

## Přehled projektu

**Chata Zlaté Hory** — veřejný marketingový web pro pronájem chaty v Zlatých Horách.
Jednoúčelový web (presentation + booking inquiry), **není** interní systém ani e-shop.

Cíl: moderní, rychlý, vizuálně čistý web, který chatu prodá — hero, galerie, vybavení,
ceník, lokalita a kontaktní/rezervační formulář. Czech-first, mobile-first.

**Zdrojové materiály**: fotografie a video chaty jsou ve složce `assets/` (viz sekce
_Materiály_ níže). Nejsou součástí buildu — do webu se dostanou jen optimalizované kopie.

---

## Tech Stack (LOCKED)

| Kategorie     | Technologie                                                   |
| ------------- | ------------------------------------------------------------- |
| Runtime       | Bun (kompatibilní s Node.js)                                  |
| Framework     | SvelteKit v2 + **Svelte 5 (pouze Runes API)**                 |
| Styling       | **Tailwind CSS v4** (přes `@tailwindcss/vite`)                |
| UI komponenty | **Vlastní** — žádný ShadCN, žádná hotová knihovna témat       |
| Primitiva     | `bits-ui` jen pro headless chování (dialog, tabs apod.)       |
| Ikony         | `@iconify/svelte` + `@iconify-json/tabler` / `unplugin-icons` |
| Obrázky       | `@sveltejs/enhanced-img` (responzivní, AVIF/WebP)             |
| Fonty         | Fontsource (lokalně, žádné CDN)                               |
| Validace      | Zod všude                                                     |
| Formuláře     | SvelteKit form actions + Zod                                  |
| E-mail        | Resend (odeslání rezervačního dotazu z formuláře)             |
| Animace       | Svelte transitions + Motion (jemné, úsporné)                  |
| SEO           | meta tagy + sitemap + `robots.txt`                            |
| Deploy        | `adapter-static` (SSG) — rychlé, levné, bezpečné              |

**Bez ShadCN je záměr.** Design se staví od základu s Tailwind utility a vlastními
komponentami, aby byl maximálně moderní a nevázaný na cizí designový systém.

---

## Vývojové příkazy

```bash
# Běh
bun install               # Instalace závislostí
bun dev                   # Dev server
bun run build             # Produkční build (statický output)
bun run preview           # Náhled buildu

# Kvalita kódu
bun run check             # Type check (svelte-check)
bun run lint              # ESLint + Prettier
bun run format            # Auto-formát
```

Konvence commit zpráv: Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`,
případně `feat(gallery): ...`.

---

## Architektura a struktura

### Datový tok

```
Obsah (typed data v src/lib/content/*.ts)
  ↓
Svelte 5 komponenty (Runes: $state, $derived, $props)
  ↓
SvelteKit routes (staticky prerenderované)
```

Web je **převážně statický** (SSG přes `adapter-static`, bez DB). Veškerý obsah (vybavení,
ceník, okolí, FAQ, fotky) žije jako typovaná data v `src/lib/content/`, aby byl jediný zdroj
pravdy a snadno editovatelný. Jediná dynamická část je rezervační/kontaktní formulář (form
action → e-mail přes Resend majiteli).

**Rozsah rezervace (schváleno):** dotaz + ceník, nikoliv plný booking systém. Žádný živý
kalendář obsazenosti, žádná online platba v této fázi. Cesta: návštěvník vidí ceník → vyplní
rezervační dotaz → e-mail majiteli, který ručně potvrdí. Platební brána + živý kalendář jsou
**backlog** — architektura by neměla blokovat jejich přidání později, ale nezavádí DB teď.

### Architektura: multi-page

```
src/routes/
  +layout.svelte        # globální shell: Header, Footer, fonty, SEO defaults
  +layout.ts            # prerender = true, i18n setup
  +page.svelte          # Home (hero, o chatě, galerie preview, okolí preview, rezervace: ceník + kalendář + formulář na #rezervace)
  /o-chate/             # O chatě — kapacita, dispozice, vybavení, areál Bohemaland, majitel
  /galerie/             # Fotogalerie — kategorie, slideshow, lazy-load
  /okoli/               # Okolí — tipy na výlety (Biskupská kupa, Rejvíz, lyžování, cyklo)
  /rezervace/           # 308 redirect → /#rezervace (rezervace je sekce na homepage)
  /kontakt/             # Kontakt — majitel, adresa, mapa, krátký formulář
```

### i18n (Wuchale)

Strukturováno teď, naplněno primárně česky. EN/DE/PL drop-in (CZ je default):
Wuchale `.wuchale/` katalogy, locale switcher v header. Dokud není naplněno, jen CZ.

### Adresářová struktura

```
src/
  lib/
    components/
      ui/          # vlastní primitivy: Button, Container, Section, Tag
      layout/      # Header, Footer, Nav, LocaleSwitcher
      sections/    # stránkové sekce: Hero, About, Gallery, Amenities, Location, Pricing, Inquiry, FAQ
    content/       # typovaný obsah chaty: cabin.ts, amenities.ts, pricing.ts, okoli.ts, gallery.ts
    utils/         # cn() (clsx + tailwind-merge), format (cena/datum)
  routes/
    +layout.svelte     # globální shell: Header + Footer + fonty + SEO defaults
    +layout.ts         # prerender = true, i18n setup
    +page.svelte       # Home
    o-chate/+page.svelte
    galerie/+page.svelte
    okoli/+page.svelte
    rezervace/+page.svelte
    rezervace/+page.server.ts   # form action: rezervační dotaz → Resend → e-mail majiteli
    kontakt/+page.svelte
    kontakt/+page.server.ts     # form action: krátký kontaktní dotaz
  app.css              # Tailwind v4 vstup + design tokeny (@theme, OKLCH CSS custom properties)
  app.html
static/
  img/                 # optimalizované obrázky (zdroj: assets/) — AVIF/WebP, landscape
assets/                # ZDROJOVÉ materiály (fotky/video) — NE v buildu, viz Materiály
# Pozn.: fonty (Spectral, Hanken Grotesk Variable) se loadují přes @fontsource npm balíčky
# v src/app.css (@import), ne ze složky static/.
```

---

## Design & Tokeny (LOCKED)

Vizuální směr je zachycen v `DESIGN.md` („Warm Lodge Luxury"). Klíčové zásady:

- **Jediný zdroj tokenů:** `src/app.css` přes Tailwind v4 `@theme` + OKLCH CSS custom
  properties. Všechny barvy, fonty, spacing, radius a motion pocházejí odsud. Tokeny se
  strukturuji jako CSS custom properties (`--color-background`, `--color-accent`, …), aby
  byl dark mode drop-in bez refaktoru později (light only v této fázi).
- **Žádné hardcoded hodnoty** v komponentách — žádné `#1a2b3c`, žádné `bg-slate-800`.
  Používat **sémantické tokeny** (`bg-background`, `text-foreground`, `bg-accent`,
  `text-muted`, `border-border`, …).
- **Typografie:** serif+sans pair — **Spectral** (light serif, display h1–h3) + **Hanken
  Grotesk** (warm humanist sans, body a labels). Serif display váha výhradně 300 (light) —
  hierarchie přes velikost a serif vs sans kontrast, ne váhu. Detail hierarchie v
  `DESIGN.md` §3.
- **Barvy:** Warm Lodge — teplý krém bg (`oklch(0.92 0.012 75)`), gold accent
  (`oklch(0.72 0.12 75)`), espresso foreground (`oklch(0.22 0.015 55)`). Gold pro text na
  light bg vždy přes `--color-accent-text` (WCAG AA). Plná paleta + named rules v
  `DESIGN.md` §2.
- **Responsivita:** mobile-first. Mobil = primární breakpoint. Touch-friendly cíle (min 44px).
  **Fotky jsou 100% landscape** (47 fotek, žádné vertikální) — design pro landscape hero.
- **Fotky jsou hrdinou:** velké, plné kvality, responzivní, s lazy-load a blur placeholder.
- **Motion:** Restrained — jen state changes (hover, focus, jemné přechody), žádná choreografie.
  `@media (prefers-reduced-motion: reduce)` pro každou animaci.

> Záměrně **bez ShadCN / knihoven témat**. Komponenty se píší ručně, aby design nebyl
> omezen cizím vzhledem. `bits-ui` se použije jen tehdy, když je potřeba přístupné chování
> (focus trap, ARIA), které nestojí za psaní znovu. Ikony: `@iconify-json/tabler`.

---

## Materiály (`assets/`)

Zdrojové fotografie a video chaty:

```
assets/
  Final/                       # ~47 finálních fotek (5940×3959 px, JPG)
  Chata Zlate Hory Pavela.mp4  # video, ~248 MB (příliš velké na web)
```

Pravidla:

- **Složka `assets/` není součástí webu.** Je to zdrojový archív. Do webu se dostanou jen
  zmenšené/komprimované kopie ve `static/img/`.
- **Optimalizace:** fotky se před nasazením zmenší na reálné rozměry (max ~2400px šířka),
  převedou na AVIF/WebP, doplní se responzivní varianty (`@sveltejs/enhanced-img`).
  Původní 5940px JPG nikdy nejdou do `static/`.
- **Video (~248 MB) nejde na web přímo.** Buď se nahoje na YouTube/Vimeo a vloží se přes
  `<iframe>`, nebo se vytvoří krátký komprimovaný web-optimized klip. Nikdy ne vkládat
  plné rozlišení do repa/buildu.
- **Názvy souborů v `assets/` nejsou stabilní API.** Při přidávání fotek do galerie je
  přejmenuj popisně (`exterior-night.avif`, `living-room.avif`) ve `static/img/`.

---

## Klíčové principy

- **KISS**: explicitní kód nad abstrakcemi. Web má pár sekcí — nepředimenzovávat.
- **LEAN**: implementovat jen to, co web skutečně potřebuje. Žádné rezervační systémy s
  kalendářem, dokud o ně není reálná poptávka — stačí kontaktní formulář.
- **DRY**: sdílené primitivy v `lib/components/ui/`, obsah v `lib/content/`.
- **Parse, Don't Validate**: Zod schémata jsou zdrojem typů (rezervační formulář, obsah).
- **Content as data**: každý editovatelný text/seznam (vybavení, ceník, FAQ) je typovaný
  objekt v `lib/content/`, ne hardcoded v `.svelte`. Majitel pak mění obsah na jednom místě.
- **Mobile-first & rychlost**: Lighthouse 90+ cílem. Statický build, optimalizované obrázky,
  žádné zbytečné JS.
- **Přístupnost**: sémantický HTML, `alt` texty u všech fotek, klávesová navigace, kontrast.

---

## Důležité patterny

### Svelte 5 (Runes only)

- Stav: `$state()` pro lokální, `.svelte.ts` pro sdílenou logiku.
- Odvozené: jednoduché `$derived(výraz)`, složité `$derived.by(() => { ... })`.
- Props: `$props()` s typovaným rozhraním, `$bindable()` jen když opravdu nutné.
- Žádné Svelte 4 stores/lifecycle, pokud to nejde vyjádřit runami.

### Vlastní UI primitiva

```svelte
<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	let {
		variant = 'primary',
		href,
		class: klass,
		children
	}: { variant?: 'primary' | 'ghost'; href?: string; class?: string; children: Snippet } = $props();
</script>

{#if href}
	<a {href} class={cn('btn', `btn-${variant}`, klass)}>{@render children()}</a>
{:else}
	<button class={cn('btn', `btn-${variant}`, klass)}>{@render children()}</button>
{/if}
```

### Reservační formulář (form action)

```typescript
// src/routes/+page.server.ts
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const inquirySchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	from: z.string(),
	to: z.string(),
	message: z.string().optional()
});

export const actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const parsed = inquirySchema.safeParse(data);
		if (!parsed.success) return fail(400, { errors: parsed.error.flatten() });
		// odeslat přes Resend → e-mail majiteli
		return { success: true };
	}
};
```

---

## Jazyky / i18n

**Výchozí: česky.** Web je primárně pro české návštěvníky.

Zlaté Hory leží na polském hraničí a jsou populární i pro PL/DE turisty. Pokud vznikne
reálná potřeba, přidat i18n přes **Wuchale** (paralelně s BUIS konvencí) — ne dříve.
Držet zásadu LEAN: žádné překlady, dokud o ně není poptávka.

---

## Design Context (zdroj pravdy)

**Před prací na designu vždy čti:**

| Soubor                    | Co obsahuje                                                                                                                 | Kdy číst                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `PRODUCT.md`              | Strategický kontext: register (brand), users, purpose, brand personality, anti-references, design principles, a11y          | Před jakýmkoliv design rozhodnutím     |
| `DESIGN.md`               | Vizuální systém: Creative North Star („Warm Lodge Luxury"), paleta (OKLCH), typografie, elevation, named rules, Do's/Don'ts | Před psaním jakéhokoliv CSS/komponenty |
| `.impeccable/config.json` | Konfigurace design detector hooku (zapnuto)                                                                                 | —                                      |

Oba soubory vytvořil `/impeccable init` a udržují se aktuální. Po implementaci komponent spusť
`/impeccable document` v scan módu, aby DESIGN.md zachytil reálné tokeny a komponenty
(nahradí seed placeholdery). `context.mjs` tyto soubory načítá automaticky před každým
`/impeccable` příkazem.

**Shrnutí brand rozhodnutí:** register = brand (design IS produkt); publikum = rodiny,
skupiny, páry, turisté (CZ + zahraniční); tón = premium/designový; reference = hospitality
premium + outdoor lifestyle; anti-ref = levné ubytováky, AI slop, agresivní marketing,
klišé horské chaty; a11y = WCAG 2.2 AA; paleta = teplý krém + espresso + gold accent;
typografie = serif display (Spectral) + sans body (Hanken Grotesk); motion = restrained.

---

## Skills & Design Workflow (world-class cílování)

Web má být **world-class**, ne jen „funkční". Design kvalita se zde aktivně řídí třemi
komplementárními vrstvami skillů. Každá řeší jiný problém:

| Vrstva                   | Skill                              | Co řeší                                           | Kdy použít                               |
| ------------------------ | ---------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| **Engineering workflow** | `superpowers` (plugin)             | TDD, systematic debugging, plánování, code review | Proces: plán → implementace → verifikace |
| **Svelte 5 kód**         | `svelte-ai` (lokální) + Svelte MCP | Runes syntax, best practices, autofixer           | Kdykoliv píšeš/měníš `.svelte`           |
| **Design kvalita**       | `impeccable` (lokální, 23 příkazů) | Typografie, barvy, motion, layout, anti-AI-slop   | Vizuální kvalita, „world-class" vzhled   |

> **Ať je kód sebečistší, generický AI design vypadá genericky.** Pro marketingový web,
> kde „design IS the product", je `impeccable` ta nejdůležitější vrstva. Engineering skilly
> zajistí čistotu; design skill zajistí, že web nepůjde poznat jako AI generace.

### Impeccable — regist a absolutní zákazy

Tento web patří do **brand registru** (marketing/landing → design JE produkt). Při každém
`/impeccable` příkazu skill nejprve načte projektové kontexty (`PRODUCT.md`, `DESIGN.md`
v rootu — vytvoří je `/impeccable init` respektive `shape`).

**Absolutní zákazy (AI slop tells)** — tyto patterny se v projektu nikdy nesmí objevit
(plný seznam v `impeccable/SKILL.md`, sekce _Absolute bans_):

- Proužkové `border-left/right` akcenty na kartách/callouts.
- Gradient text (`background-clip: text` + gradient).
- Glassmorphism jako default (blury jako dekorace).
- „Eyebrow" nad každou sekcí (malé caps s širokým trackingem „O NÁS" / „CENÍK").
- Číslované markery `01 · 02 · 03` jako default scaffolding (jen u reálné sekvence).
- Identické kartové gridy (icon + heading + text donekonečna).
- Hero-metric šablona (velké číslo + malý label + gradient akcent).
- Sketch/hand-drawn SVG jako fallback.
- `repeating-linear-gradient` diagonální pruhy.

> **Výjimka — teplé krémové pozadí.** Tento web záměrně používá warm-tinted krém
> (`oklch(0.92 0.012 75)`) jako signature Warm Lodge Luxury surface — není to „AI defaulta",
> ale záměrné brand rozhodnutí. Krém zde povolen je (viz `DESIGN.md` §2, The Warm Surface
> Rule). Obecný AI-slop ban krémového bg se v tomto projektu nepoužije.

**Kontrastní pravidlo:** body text ≥4.5:1, placeholder ≥4.5:1 (ne muted gray), velký text ≥3:1.
Nejčastější selhání: „elegantní" světlešedý body text na tin-tovaném pozadí.

### Kanonický workflow pro tento web

```
init   →  shape   →  craft (stavět sekce)  →  critique  →
  (typeset/layout/animate/colorize/delight dle potřeby)  →  polish  →  document
```

| Fáze         | Příkaz                                                    | Výstup pro chatazlatehory                                                  |
| ------------ | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| Setup        | `/impeccable init`                                        | `PRODUCT.md` (kontext chaty, cíl webu, publikum, register)                 |
| Design brief | `/impeccable shape`                                       | UX/UI plán sekcí **před** psaním kódu (tón chaty, selling pointy)          |
| Build        | `/impeccable craft [sekce]`                               | Postavit sekci end-to-end                                                  |
| Evaluate     | `/impeccable critique`                                    | UX review s heuristickým scoringem + persona testy                         |
| Evaluate     | `/impeccable audit`                                       | Technická kontrola (a11y, performance, responsive) — kritické s 47 fotkami |
| Refine       | `/impeccable typeset\|layout\|animate\|colorize\|delight` | Doladění jedné dimenze                                                     |
| Refine       | `/impeccable polish`                                      | Poslední raňka mezi „dobré" a „skvělé"                                     |
| Fix          | `/impeccable optimize`                                    | LCP, bundle size — klíčové pro rychlost webu s galerií                     |
| Fix          | `/impeccable adapt`                                       | Responsive napříč zařízeními (mobil = primární)                            |
| Capture      | `/impeccable document`                                    | `DESIGN.md` — vizuální systém zachycený pro budoucí agenty                 |

**Pravidla pro chatazlatehory:**

1. **Začni `shape`, ne `craft`.** Tón chaty (luxusní vs. rodinný vs. úsporný), cílové
   publikum a klíčové selling pointy se musejí rozhodnout dříve, než se píše kód.
2. **`palette.mjs` pro brand seed.** Brand barva (gold accent `oklch(0.72 0.12 75)`) je
   záměrně zvolená Warm Lodge Luxury signature. Kompletní paleta (bg/surface/ink/
   accent/muted) žije v OKLCH v `src/app.css`. Teplá horská paleta — krém + espresso + zlato
   je záměrný brand rozhodnutí (viz `DESIGN.md` §2), nikoliv AI defaulta.
3. **Fotky jsou hrdinou.** Web prodává atmosféru chaty — Impeccable `delight` a `animate`
   se použijí, aby galerie měla osobnost, ale `optimize` zajistí, že 47 fotek nezabije LCP.
4. **Žádný AI slop.** Každá sekce po `craft` projde `critique` + `audit`.„AI made that"
   je selhání definice done.
5. **`PRODUCT.md` a `DESIGN.md` jsou zdroj pravdy.** Po `init`/`shape`/`document` se
   tyto soubory v rootu udržují aktuální — každý další agent (i v budoucnu) je čte
   přes `context.mjs` dříve, než začne pracovat.

### Kdy kterou vrstvu aktivovat

- **Píšeš/měníš Svelte komponentu** → `svelte-ai` (runes-first) + Svelte MCP
  (`list-sections` → `get-documentation`), `svelte-autofixer` před finalizací.
- **Navrhneš novou sekci nebo redesign** → `impeccable` (`shape` → `craft` → `critique`).
- **Začínáš non-trivální feature** → `superpowers` (`brainstorming`/`writing-plans`
  dříve než kód; HARD-GATE: žádná implementace bez schváleného designu).
- **Ladíš bug** → `superpowers` `systematic-debugging`.
- **Dokončuješ větev** → `superpowers` `verification-before-completion` + `requesting-code-review`.

---

## Svelte MCP & tooling

- **Svelte MCP** je zdroj pravdy pro Svelte 5 / SvelteKit API nad trénovacími daty.
  Workflow: `list-sections` → `get-documentation` → psaní kódu.
- **`svelte-autofixer`** pouštět na Svelte kód před finalizací, iterovat do čista.
- Konfigurace toolingu přes **Svelte CLI**: `npx sv add <addon>`, `npx sv check` —
  neručně editovat configy, které spravuje CLI.
- Veškerý Svelte 5 kód se řídí runami-first patterny (lokální `svelte-ai` skill).

---

## Definition of Done (vertikální řez)

Každá nová sekce/feature webu se doručuje jako celistvý řez:

1. **Obsah** — data v `src/lib/content/*.ts` (typovaná, editovatelná).
2. **Komponenta(y)** — sekce/primitivum v `lib/components/`, build na sémantických tokenech.
3. **Route** — napojení v `src/routes/`, respektive homepage sekce.
4. **Obrázky** — fotky optimalizované ve `static/img/`, responzivní varianty, `alt`.
5. **SEO** — meta tagy (title, description, OG image) pro danou stránku.
6. **Responzivita & a11y** — ověřeno na mobilu i desktopu, sémantické HTML, kontrast.
7. **Kontrola** — `bun run check` a `bun run lint` čisté.

---

**Last Updated**: 2026-06-17
**Status**: Greenfield — pouze `assets/` + nainstalovaný `impeccable` skill. Projekt se teprve zakládá podle tohoto AGENTS.md. Další krok: `/impeccable init` → `/impeccable shape` (design brief).
