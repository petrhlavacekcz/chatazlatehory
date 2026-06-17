# Product

## Register

brand

## Users

Návštěvníci hledající únik do Jeseníků — především:

- **Rodiny s dětmi**, které hledají chatu na víkend nebo prázdniny v přírodě, s dostatkem prostoru a pohodlí.
- **Skupiny přátel a kolegů** pro teambuilding, oslavy, sportovní pobyty (lyžování v zimě, cykloturistika v létě).
- **Páry** hledající klidný, romantický únik do hor.
- **Turisté (české i zahraniční — PL/DE)**, kteří objevují Zlaté Hory a Jeseníky jako destinaci.

Kontext použití: návštěvník sedí u telefonu nebo laptopu, často večer, často po náročném dnu, a **sní o tom, že je někde jinde**. Rozhoduje se rychle na základě vizuálního dojmu — buď ho web vtáhne, nebo odejde. Nejde o transakci, jde o přání.

Práce, kterou má web vykonat (job to be done): **„Pomoz mi představit si, jaké by to bylo tady být — a dej mi důvěru, že to je místo, kam se chci vrátit."**

## Product Purpose

Veřejný marketingový web pro pronájem chaty v Zlatých Horách, v **areálu Bohemaland**.
Majitelé vlastní chatu; **správce zajišťuje úklid a pronájem** — web má zjednodušit komunikaci
mezi zájemci a správcem. Web prodává atmosféru a zážitek, ne jen postele.

Primární cíl: **zvýšit obsazenost chaty a usnadnit správu rezervací** konkrétně tak, že
návštěvník snadno zjistí informace, prohlédne si fotky, ověří cenu a **odešle rezervační
dotaz** správci.

Rozsah rezervace (schváleno): **dotaz + ceník**, nikoliv plný booking systém. Žádný živý
kalendář obsazenosti, žádná online platba v této fázi. Cesta: návštěvník vidí ceník → vyplní
rezervační dotaz (jméno, e-mail, telefon, termín, počet osob, poznámka) → e-mail správci,
který ručně potvrdí a řeší obsazenost. Platební brána a živý kalendář jsou **backlog** pro
pozdější fázi (architektura by neměla blokovat jejich přidání, ale nezavádí DB teď).

Success looks like:

- Návštěvník zůstane na webu, projde si galerii, necítí tlak.
- Po pár sekundách má jasno: kde to je (Bohemaland, Zlaté Hory), jak to vypadá, co to umí,
  kolik to stojí.
- Napíše rezervační dotaz bez obav — a správce dostane e-mail se všemi detaily.

## Brand Personality

**Premium. Klidný. Autentický.**

Tři slova, která drží brand:

1. **Premium** — ne okázalé luxusní, ale zklidnělé, sebevědomé. Důraz na materiály (dřevo, kámen), prostor, světlo. Nic nevolá o pozornost, protože nic nemusí.
2. **Klidný** — ticho hor, odpojení od shonu. Vizuální jazyk dýchá: hodně vzduchu, dlouhé sekvence, žádná drobná dekorace.
3. **Autentický** — žádné laciné klišé. Místo je reálné, fotky jsou reálné, zážitek je reálný. Důvěra přes pravdivost, ne přes marketingové triky.

Emoční cíl: když návštěvník zavře web, má pocit, že už tam částečně byl. Cítí touhu tam být. Ne „musím si rezervovat dovolenou", ale „chci tam být".

Hlas webu (copy): sebevědomý, stručný, tichý. Ne křiklavý prodej. Krátké věty. Nechává mluvit fotky.

## Anti-references

Co tento web **ROZHODNĚ NEMÁ BÝT**:

- **Levné ubytováky** — přeplněné bannery, hvězdičková hodnocení všude, ikonky jako dekorace, pocit „booking.comský". Web se má cítit jako destinace sama, ne jako katalog.
- **AI slop defaulty (2026)** — krémová/sand/paper pozadí jako „teplá defaulta", gradient text, kartové gridy s ikonami, „eyebrow" nad každou sekcí, číslované `01/02/03` scaffolding, hero-metric šablona. Plný seznam v `impeccable/SKILL.md`.
- **Agresivní marketing** — blikající „REZERVOVAT" banner, vyskakovací pop-upy, umělá nouze („poslední volný termín!"), pushové CTA. Tlak zabírá klid brandu.
- **Klišé horské chaty** — dřevěné texture pozadí, folklórní ornamenty, ručně psané fonty, „chata u lesa" kýč. Autenticita neznamená kýč — znamená pravdivost materiálů a místa.

Specifické vzory k vyhnout: klasicke typografie „horské chaty" (komiksově zelená, dřevěné pozadí), Booking.com/Airbnb listing UI, Wix/web-builder šablony „mountain lodge".

## Design Principles

1. **Atmosféra přes informaci.** Web nemá informovat — má vyvolat pocit. První vteřina rozhoduje; fotka a prostor dělají víc než text.
2. **Příběh místa, ne katalog vybavení.** Sekce nejsou „features grid" — jsou kapitoly příběhu o tom, jaké je v chatě být.
3. **Ticho jako designový prvek.** Bílé místo, klidná motion, žádná dekorace navíc. Prázdno není nedostatek — je to prostor pro představivost návštěvníka.
4. **Pravdivost materiálů.** Barvy a typografie evokují dřevo, kámen, mech, sníh — skutečné materiály místa, ne pastelové „přírodní" aproximace.
5. **Jedna akce, žádný tlak.** Cesta k rezervačnímu dotazu je jasná, ale tichá. Pozvat, ne tlačit.

## Accessibility & Inclusion

**WCAG 2.2 AA** — standard pro veřejné weby.

- Kontrast: body text ≥4.5:1, velký text ≥3:1. Placeholder ≥4.5:1 (ne muted gray default).
- Klávesnicová navigace: logický focus order, viditelné focus ringy, žádné keyboard trapy.
- Screen reader: sémantický HTML, `alt` texty u všech fotek (popisují co je na fotce, ne „fotka chaty"), ARIA jen kde nutné.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` pro každou animaci — crossfade/instant místo revealů.
- Mobile-first a touch-friendly: cíle ≥44px, čitelné na slunci (dostatečný kontrast i venku).
- Jazyk: primárně česky, s možností rozšíření na PL/DE později (LEAN — zatím jen CZ).

## Stack Context

Pro vizuální implementaci viz `AGENTS.md` — SvelteKit v2 + Svelte 5 (Runes) + Tailwind CSS v4, žádný ShadCN (vlastní komponenty), OKLCH barvy, `adapter-static` (SSG — dotaz + ceník, bez DB). Zdrojové materiály (47 fotek chaty, **vše landscape**, + video) ve složce `assets/` — do webu jen optimalizované kopie ve `static/img/`.

Architektura: **multi-page** (Home, O chatě, Fotogalerie, Okolí, Rezervace, Kontakt). i18n strukturováno teď (Wuchale, CZ naplněno, EN/DE/PL drop-in), ale naplněno primárně česky. SEO: meta tagy + schema.org LodgingBusiness. Formulář chráněn CSRF + sanitizace vstupů (reCAPTCHA volitelně do backlogu). Místo pro AI chatbota („Chat bud") je v návrhu zarezervované jako placeholder, ne staví se.
