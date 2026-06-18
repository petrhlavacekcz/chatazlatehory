<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

---

name: Chata Zlaté Hory
description: Premium marketingový web pro pronájem horské chaty v Jeseníkách.

---

# Design System: Chata Zlaté Hory

## 1. Overview

**Creative North Star: „Warm Lodge Luxury"**

Vizuální systém, který dýchá teplem luxury resortu v horách. Inspirováno Trexon-style
hospitality: teplý krém jako plátno, hluboké espresso pro vážnost, zlato jako jediný
signature akcent. Stránka se cítí jako klidná destinace s nobesou hotelového magazínu —
light serif display přebírá editorial discipline nad zklidněným sans-serif body textem.

Filozofie: **teplo je designový prvek.** Krémové pozadí není „AI defaulta" — je to
záměrný warm surface, který nese teplotu brandu společně se zlatým akcentem. Žádná
studená pure-white sterilita. Jediný sytý akcent — zlato — se objeví střídmě jako podpis
brandu, ne jako ozdoba.

Tento systém **přijímá**: teplé krémové pozadí (warm-tinted, ne neutral), light serif
display + sans body typografický pair, zlatý signature akcent. **Odmítá**: gradient text,
glassmorphism jako default, „eyebrow" nad každou sekcí, číslované `01/02/03` scaffolding,
agresivní „REZERVOVAT" bannery, dřevěné texture pozadí a folklórní kýč „horské chaty",
booking.comské listing UI. Plný seznam v `PRODUCT.md` (Anti-references) a
`impeccable/SKILL.md` (Absolute bans).

**Key Characteristics:**

- Teplé krémové pozadí — warm-tinted surface, který nese teplotu brandu (ne pure white).
- Light serif display + zklidněný sans body — magazine-grade typografický pair.
- Jeden signature accent (zlato) používaný střídmě — vzácnost je podpis.
- Ticho přes hluk — bílé místo, restraint, žádná dekorace navíc.
- Fotka jako hrdina — velké, plné kvality, lazy-loaded.

## 2. Colors: The Warm Lodge Palette

Strategie: **Warm restrained** — teplé krémové pozadí + jeden signature zlatý akcent.
Teplotu brandu nese povrch (krém) společně s akcentem (zlato). Barevné hodnoty v OKLCH
(kanonický formát projektu). Dark mode je out-of-scope pro tuto fázi (light only); tokeny
se ale strukturuji jako CSS custom properties, aby byl dark mode drop-in bez refaktoru.

### Accent — Gold

- **Gold** (`oklch(0.72 0.12 75)`): Signature brand barva, jediný akcent. Používá se
  výhradně na CTA, aktivní stavy, ikony, klíčové akcenty. Zlatý fill nese tmavý text
  (`--color-accent-foreground`). Střídmě — pokud je zlato na víc než ~10–15% obrazovky,
  je to moc.
- **Gold Hover** (`oklch(0.66 0.14 75)`): Tmavší, sytější zlato pro hover/active stavy CTA.
- **Gold Text** (`oklch(0.4 0.09 65)`): Výrazně tmavší zlato pro TEXT na light bg (splňuje
  WCAG AA body-text limit ≥4.5:1). Gold fill (`--color-accent`) je příliš světlý na text —
  proto samostatný text token.

### Dark — Espresso

- **Espresso** (`oklch(0.18 0.015 55)`): Hluboká teplá hnědá pro tmavé sekce (Experience,
  CallToAction, About floating stat, Hero overlay). Teplé hue 55, ne chladná šedá.
- **Espresso Deep** (`oklch(0.1 0.01 55)`): Nejhlubší tón — Hero pozadí, video sekvence.
- **Espresso Foreground** (`oklch(0.92 0.015 75)`): Světlý text na tmavém espresso pozadí.

### Neutrals — Warm Lodge

- **Cream** (`oklch(0.92 0.012 75)`): Body background. Teplý krém — záměrně warm-tinted
  (hue 75), ne pure white. Nese teplotu brandu.
- **Surface** (`oklch(0.96 0.008 75)`): O něco světlejší krém pro sekce/karty. Subtilní
  tonální vrstvení proti Cream pozadí.
- **Espresso Ink** (`oklch(0.22 0.015 55)`): Foreground — hlavní text, ~14:1 kontrast vs
  Cream. Teplá hluboká hnědá (hue 55).
- **Muted** (`oklch(0.28 0.02 55)`): Sekundární/muted text, ~4.5:1 kontrast vs Cream.
- **Border** (`oklch(0.8 0.012 65)`): Subtilní borders, dividers. Téměř neviditelné.

### Named Rules

**The Warm Surface Rule.** Pozadí je vždy teplý krém (`oklch(0.92 0.012 75)`) nebo
Espresso pro tmavé sekce. Žádné pure white (`oklch(1.000 0.000 0)`) — to by byla studená
sterilita, která neodpovídá warm lodge charakteru. Teplotu brandu nese surface + akcent.

**The Gold Accent Rule.** Gold (`oklch(0.72 0.12 75)`) je jediný signature akcent. Objevuje
se střídmě — CTA, ikony, klíčové highlighty. Vzácnost je důvod, proč rezonuje. Pro text na
light bg vždy použij tmavší `--color-accent-text` (WCAG AA).

## 3. Typography: Serif Display + Sans Body Pair

**Fonty (pair):**

- **Spectral** (`@fontsource/spectral`): Light serif rod pro display (h1–h3, font-weight
  300). Editorial elegance — hospitality magazín vibe. Fallback: `Georgia, 'Times New
Roman', serif`.
- **Hanken Grotesk Variable** (`@fontsource-variable/hanken-grotesk`): Warm humanist sans
  pro body text, labels a UI. Fallback: `system-ui, -apple-system, sans-serif`.

**Proč serif+sans pair, ne single family:** Editorial serif display (Spectral, light 300)
vytváří magazine-grade hierarchii — vizuální „váha" nadpisů vychází z lehkého serifu, ne z
bold váhy. Sans body (Hanken, 400/500) je čitelný a neutrální. Kontrast mezi lehkým serif
display a sans body je stronger než committed single-family kontrast. Spectral je klidný
klasický serif (ne reflex trendy display font).

**Character:** Spectral light 300 v display roli + Hanken Grotesk v body roli = premium
outdoor/hospitality hybrid. Čte se jako luxury resort brochure.

### Hierarchy

- **Display** (Spectral, 300 weight, `clamp(2.75rem, 9vw, 6rem)`, line-height 1.02–1.05,
  letter-spacing -0.02em): Hero headline, hlavní statement. Max 6rem (~96px).
  `text-wrap: balance`.
- **Headline** (Spectral, 300, `clamp(2.25rem, 5vw, 3.5–3.75rem)`, line-height 1.05,
  letter-spacing -0.015em): Sekce nadpisy (H2). Některé sekce (About, Amenities) jdou na
  3.75rem max pro jemné zvýraznění. `text-wrap: balance`.
- **Sub-headline** (Spectral, 300, `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.15):
  Podnadpisy v rámci stránky (o-chate sekce).
- **Title** (Spectral, 300, `text-xl`–`text-2xl` (1.25–1.5rem), line-height 1.25, letter-
  spacing -0.015em): Card/item tituly (amenity, trip, experience). `text-wrap: balance`.
- **Body** (Hanken Grotesk, 400, `text-base`–`text-lg` (1–1.125rem), line-height 1.625,
  max 65–75ch): Hlavní text. `text-wrap: pretty`.
- **Label** (Hanken Grotesk, 500, 0.7rem, letter-spacing 0.25em, uppercase): Brand kicker
  nad sekcemi, metadata, badge microcopy.

> Pozn.: `text-wrap: balance` a `letter-spacing: -0.015em` jsou globálně aplikovány na
> `h1, h2, h3` v `app.css` base. Pro item tituly, které nejsou `<h1-3>` (např. `<dt>`),
> je nutné tyto vlastnosti přidat inline.

### Named Rules

**The Paired-Voice Rule.** Dvě rodiny — Spectral serif (display, 300) + Hanken Grotesk
sans (body/labels, 400/500). Žádná bold serif váha (display je výhradně light 300 —
„váha" nadpisu pochází z velikosti a serif charakteru, ne z bold). Žádné reflex trendy
display fonty (Fraunces/Cormorant/Inter/Poppins).

**The No-Eyebrow Rule.** Žádné malé uppercase tracked eyebrow nad každou sekcí
(„O NÁS" / „CENÍK" / „GALERIE") jako saturated scaffold. Brand `.label` kicker je
záměrný hlas — používá se jednou na začátku sekce, ne opakovaně.

**The Light Display Rule.** Display letter-spacing -0.015em až -0.02em (záporný tracking
pro velký serif). Serif display váha výhradně 300 (light) — nikdy 400+ v serifu. Hierarchie
se buduje velikostí a serif vs sans kontrastem, ne váhou.

## 4. Elevation

Systém je **flat by default** v light sekcích. Hloubka se nevyjadřuje dekorativními stíny
v klidu, ale tonálním vrstvením (Cream bg vs Surface karty vs Espresso tmavé sekce) a
jasnými hranicemi (ring/border).

Stíny se objevují jako response na stav (hover, focus) a jako signature elevation u
fotografií/floating elementů (About floating stat, galerie). Warm Lodge charakter dovoluje
výraznější soft shadows u hero elementů — ne ghost-card tell, ale záměrná elevation.

### Shadow Vocabulary

- **Soft** (`box-shadow: 0 2px 20px oklch(0.18 0.015 55 / 0.06)`): Jemný baseline stín pro
  karty/elementy s elevation.
- **Hover** (`box-shadow: 0 12px 40px oklch(0.18 0.015 55 / 0.12)`): Výraznější zdvih na
  hover interaktivních karet/galerie items. Warm Lodge signature elevation.
- **Focus** (`box-shadow: 0 0 0 3px oklch(0.72 0.12 75 / 0.35)`): Viditelný focus
  indicator pro klávesnici, v Gold accent.

### Named Rules

**The Flat-By-Default Rule.** Light surfacy jsou flat v klidu — hloubka přes tonální
vrstvení (Cream/Surface). Stíny přicházejí jako response na stav (hover, focus) nebo jako
signature elevation u hero elementů (fotky, floating stat). Tmavé Espresso sekce mohou
používat tonální vrstvení uvnitř (Experience `gap-px` grid).

## 5. Components

[SEED — komponenty se dokumentují, až budou existovat. Bude obsahovat: Button (primary
gold / ghost ink), Container/Section layout, Navigation (sticky, scroll-aware), Gallery
(signature — fotka jako hrdina), Amenity item (nahá ikona + serif titul), Pricing tier,
Inquiry form, Footer. Po implementaci spusť `$impeccable document` pro reálné komponenty.]

## 6. Do's and Don'ts

### Do:

- **Do** použij teplé krémové pozadí (`oklch(0.92 0.012 75)`) — teplotu brandu nese surface
  - Gold accent.
- **Do** drž Gold (`oklch(0.72 0.12 75)`) střídmě jako signature akcent (The Gold Accent
  Rule). Pro text na light bg použij `--color-accent-text` (WCAG AA).
- **Do** použij white/espresso text na Gold fill — sat mid-luminance, WCAG může lhát,
  Helmholtz-Kohlrausch ne.
- **Do** velké fotky chaty jako hrdinu — plná kvalita, responzivní, lazy-loaded.
- **Do** `text-wrap: balance` na h1–h3, `text-wrap: pretty` na prose.
- **Do** `@media (prefers-reduced-motion: reduce)` pro každou animaci.
- **Do** dotazy na mobilu nejprve (mobile-first), touch cíle ≥44px, kontrast čitelný venku.

### Don't:

- **Don't** použij pure white (`oklch(1.000 0.000 0)`) pozadí — studená sterilita neodpovídá
  Warm Lodge charakteru. Vždy teplý krém.
- **Don't** použij gradient text (`background-clip: text` + gradient). Jedna solid barva,
  důraz přes váhu nebo velikost.
- **Don't** dávej eyebrow (malé caps tracked) nad každou sekcí — saturated scaffold
  (The No-Eyebrow Rule). Brand `.label` kicker je záměrný, jednou.
- **Don't** použij číslované `01 · 02 · 03` markery jako default scaffolding — jen u reálné
  sekvence, kde order nese informaci.
- **Don't** stavěj identické kartové gridy (icon + heading + text donekonečna) jako línou
  odpověď — každá sekce ať má charakter.
- **Don't** použij bold serif váhu (400+) v display — display je výhradně light 300
  (The Light Display Rule). Hierarchie přes velikost/serif vs sans, ne váhu.
- **Don't** použij agresivní „REZERVOVAT" bannery, pop-upy, umělou nouzi („poslední volný
  termín!"). Brand zve, netlačí.
- **Don't** použij dřevěné texture pozadí, folklórní ornamenty, ručně psané fonty, „chata
  u lesa" kýč — autenticita ≠ kýč.
- **Don't** použij sketch/hand-drawn SVG jako fallback — raději žádná ilustrace než
  amatérská.
- **Don't** animuj CSS layout properties; ease out exponential curves (quart/quint/expo),
  nikdy bounce/elastic.
