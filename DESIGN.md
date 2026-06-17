<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

---
name: Chata Zlaté Hory
description: Premium marketingový web pro pronájem horské chaty v Jeseníkách.
---

# Design System: Chata Zlaté Hory

## 1. Overview

**Creative North Star: „The Quiet Lodge"**

Vizuální systém, který dýchá tichem horské chaty. Pure white pozadí nechává mluvit fotografii chaty — světlo dřeva, struktura kamene, zeleň okolí nese veškerou teplotu brandu. Stránka se cítí jako klidná destinace, ne jako katalog ubytování. Typografie přebírá editorial discipline: velký serif display jako by z tištěného hospitality magazínu, zklidněný sans-serif body text.

Filozofie: **ticho je designový prvek.** Bílé místo není nedostatek obsahu, je to prostor, ve kterém si návštěvník představí, že už je tam. Žádná dekorace, která by soutěžila s fotkou. Jeden sytý akcent — hluboká sage — se objeví velmi vzácně (≤10% plochy) jako podpis brandu, ne jako ozdoba.

Tento systém explicitně **odmítá**: krémové „teplé defaulty" 2026 (paper/sand/linen pozadí), gradient text, kartové gridy s ikonami, eyebrow nad každou sekcí, číslované `01/02/03` scaffolding, agresivní „REZERVOVAT" bannery, dřevěné texture pozadí a folklórní kýč „horské chaty", booking.comské listing UI. Plný seznam v `PRODUCT.md` (Anti-references) a `impeccable/SKILL.md` (Absolute bans).

**Key Characteristics:**
- Pure white pozadí — teplotu brandu nese fotka a accent, nikoliv surface.
- Editorial serif display + zklidněný sans body — magazine-grade hierarchy.
- Jeden signature accent (hluboká sage) ≤10% plochy; vzácnost je pointa.
- Ticho přes hluk — bílé místo, restraint, žádná dekorace navíc.
- Fotka jako hrdina — velké, plné kvality, lazy-loaded.

## 2. Colors: The Lodge Palette

Strategie: **Restrained** — pure white surface + jeden signature accent na ≤10% plochy. Teplotu brandu nenese pozadí, nese ji fotka chaty + sage accent. Barevné hodnoty v OKLCH (kanonický formát projektu). Dark mode je out-of-scope pro tuto fázi (light only); tokeny se ale strukturuji jako CSS custom properties, aby byl dark mode drop-in bez refaktoru.

### Primary
- **Deep Sage** (`oklch(0.50 0.085 125)`): Signature brand barva, anchor palette (seed hue 110° z `palette.mjs`). Používá se výhradně na CTA, aktivní stavy, klíčové akcenty, header/footer tón (Bohemaland forest vibe). Vzácnost je pointa — pokud je sage na víc než 10% obrazovky, je to moc. Bílý text na fill (saturovaná mid-luminance, viz Helmholtz-Kohlrausch).

### Accent
- **Warm Clay** (`oklch(0.45 0.11 45)`): Druhá brand barva, distinct od primary v hue (45° vs 125°) i lightness. CTA highlight, drobné sekundární akcenty, status indikátory. Nahrazuje Stitch `#C0392B` (teplá červená) teplejší hlínou, která lépe ladí s lesní paletou. Bílý text na fill.

### Neutral
- **Pure White** (`oklch(1.000 0.000 0)`): Body background. Přesně pure white — ne `#F5F5F5` (Stitch navrhoval), ne 0.99, ne chroma 0.002. Žádná skrytá teplota. (DEFAULT A z palette guidance — Stripe/Notion/Apple doktrína.)
- **Mist** (`oklch(0.975 0.004 120)`): Surface pro sekce/karty, velmi jemně tinted směrem k sage hue. Subtlist než samotná sage — cítit, ne vidět.
- **Ink** (`oklch(0.22 0.010 120)`): Body text, ~14:1 kontrast vs white. Lehce warm-tinted k brand hue, ale primárně hluboká šedá.
- **Stone** (`oklch(0.48 0.010 120)`): Secondary/muted text, ~4.5:1 kontrast. Ink pulled 40% toward bg.
- **Hairline** (`oklch(0.90 0.003 120)`): Subtilní borders, dividers. Téměř neviditelné, jen naznačené.

### Named Rules
**The One Voice Rule.** Deep Sage se objeví na maximálně 10% jakékoliv obrazovky. Vzácnost je důvod, proč rezonuje. Pokud ho potřebuješ na víc, přehodnoť — brand mlčí, ne křičí.

**The Pure Surface Rule.** Pozadí je vždy pure white (`oklch(1.000 0.000 0)`). Žádné cream/sand/paper/línen. Teplotu brandu nese fotka a accent — nikoliv surface. Dát teplotu do obou (primary + bg) je AI klišé.

## 3. Typography: Single Sans, Committed Contrast

**Font:** **Hanken Grotesk** (open source, self-hosted přes Fontsource). Jeden distinctive
warm-humanist sans rod, použitý v celé hierarchii přes committed váha/velikost kontrast.
Fallback: `system-ui, -apple-system, 'Segoe UI', sans-serif`.

**Proč single family, ne display+body pair** (rozhodnutí vs. původní seed): `brand.md`
říká „A single well-chosen family with committed weight/size contrast is stronger than a
timid display+body pair." Pro tichý „Quiet Lodge" brand je jedna rodina klidnější než dva
konkurenční hlasy. Editorial serif lane (Fraunces/Cormorant display) je navíc saturated
AI-slop attractor (reflex-reject list v `brand.md`), Inter/Poppins/DM Sans jsou monoculture
defaults. Hanken Grotesk je distinctive warm humanist — má character, ale není křiklavý.

**Character:** Warm humanist sans s characteristic curves (a, g), ideální pro tichou
hospitality atmosféru. Thin (300) display vs medium (500) body vytváří committed kontrast
bez potřeby druhé rodiny. Čte se jako premium outdoor/hospitality hybrid.

### Hierarchy
- **Display** (Hanken Grotesk, 300 weight, `clamp(2.75rem, 8vw, 5rem)`, line-height 1.0–1.05, letter-spacing -0.02em až -0.03em): Hero headline, hlavní statement. Max 5rem (~80px). `text-wrap: balance`.
- **Headline** (Hanken Grotesk, 400, `clamp(1.875rem, 4vw, 2.5rem)`, line-height 1.15): Sekce nadpisy.
- **Title** (Hanken Grotesk, 500, `clamp(1.25rem, 2vw, 1.5rem)`, line-height 1.25): Podnadpisy, card tituly.
- **Body** (Hanken Grotesk, 400, 1rem–1.125rem, line-height 1.65, max 65–75ch): Hlavní text. `text-wrap: pretty`.
- **Label** (Hanken Grotesk, 600, 0.75rem, letter-spacing 0.08em, uppercase POUZE u záměrného brand kick-off — nikoliv eyebrow nad každou sekcí): Tagy, metadata, CTA microcopy.

### Named Rules
**The Single-Voice Rule.** Jedna rodina (Hanken Grotesk), committed váhový kontrast (300 thin display vs 500 medium body). Žádné míchání serif/sans, žádné reflex display fonty (Fraunces/Cormorant/Inter).

**The No-Eyebrow Rule.** Žádné malé uppercase tracked eyebrow nad každou sekcí („O NÁS" / „CENÍK" / „GALERIE"). Saturated AI scaffold. Jedno záměrné číslované/popsané kickoff na jedné stránce je hlas; eyebrow nad každou sekcí je AI gramatika.

**The Quiet Display Rule.** Display letter-spacing ≥ -0.04em (floor) — ideálně -0.02 až -0.03em pro Hanken. Nikdy těsnější. Cramped letters reads jako „designed", ne elegantní.

## 4. Elevation

Systém je **flat by default**. Hloubka se nevyjadřuje stíny, ale tonální vrstvením (Mist surface vs Pure White bg) a jasnými hranicemi. Motion energy je Restrained — žádné choreografie, jen state changes — takže stíny nejsou potřeba pro navádění oka.

Stíny se objevují výhradně jako response na stav (hover, elevation, focus) a jen když materiálně zlepší efekt. Žádné dekorativní ghost-cards (1px border + široký soft shadow najednou — to je codex tell). Pick one: buď solid border, nebo definovaný shadow ≤8px blur, nikdy obojí jako dekorace.

### Shadow Vocabulary
- **Hover Lift** (`box-shadow: 0 2px 8px oklch(0.22 0.010 120 / 0.08)`): Jemný náznak zdvihu na hover interaktivních karet/galerie items. ≤8px blur.
- **Focus Ring** (`box-shadow: 0 0 0 2px oklch(0.50 0.085 125 / 0.4)`): Viditelný focus indicator pro klávesnici, v brand accent.

### Named Rules
**The Flat-By-Default Rule.** Surfacy jsou flat v klidu. Stíny přicházejí jen jako response na stav (hover, focus, elevation). Dekorativní stíny v klidu = AI slop tell.

## 5. Components

[SEED — komponenty se dokumentují, až budou existovat. Bude obsahovat: Button (primary sage / ghost ink), Container/Section layout, Navigation (tiché, sticky), Gallery (signature — fotka jako hrdina), Amenity item, Pricing tier, Inquiry form, Footer. Po implementaci spusť `$impeccable document` pro reálné komponenty.]

## 6. Do's and Don'ts

### Do:
- **Do** použij pure white pozadí (`oklch(1.000 0.000 0)`) — teplotu brandu nese fotka a sage accent, nikoliv surface.
- **Do** drž Deep Sage na ≤10% plochy jakékoliv obrazovky (The One Voice Rule).
- **Do** použij white text na saturrovaných fills (Deep Sage, Warm Clay) — sat mid-luminance, WCAG může lhát, Helmholtz-Kohlrausch ne.
- **Do** velké fotky chaty jako hrdinu — plná kvalita, responzivní, lazy-loaded, blur placeholder.
- **Do** `text-wrap: balance` na h1–h3, `text-wrap: pretty` na prose.
- **Do** `@media (prefers-reduced-motion: reduce)` pro každou animaci — crossfade/instant alternativy.
- **Do** dotazy na mobilu nejprve (mobile-first), touch cíle ≥44px, kontrast čitelný venku na slunci.

### Don't:
- **Don't** použij krémové/sand/paper/línen pozadí (cream AI defaulta 2026: OKLCH L 0.84–0.97, C<0.06, hue 40–100). Teplotu brandu dáváš do primary i bg = AI klišé.
- **Don't** použij gradient text (`background-clip: text` + gradient). Jedna solid barva, důraz přes váhu nebo velikost.
- **Don't** dávej eyebrow (malé caps tracked) nad každou sekcí — saturated AI scaffold (The No-Eyebrow Rule).
- **Don't** použij číslované `01 · 02 · 03` markery jako default scaffolding — jen u reálné sekvence, kde order nese informaci.
- **Don't** stavěj identické kartové gridy (icon + heading + text donekonečna) — karty jsou líná odpověď.
- **Don't** kombinuj `border: 1px solid X` + `box-shadow` s ≥16px blur na stejném elementu (ghost-card codex tell). Pick one.
- **Don't** zaobli karty na 24–40px radius. Karty max 12–16px; full-pill jen pro tagy/tlačítka.
- **Don't** použij agresivní „REZERVOVAT" bannery, pop-upy, umělou nouzi („poslední volný termín!"). Brand zve, netlačí.
- **Don't** použij dřevěné texture pozadí, folklórní ornamenty, ručně psané fonty, „chata u lesa" kýč — autenticita ≠ kýč.
- **Don't** použij sketch/hand-drawn SVG jako fallback — raději žádná ilustrace než amatérská.
- **Don't** animuj CSS layout properties; ease out exponential curves (quart/quint/expo), nikdy bounce/elastic.
