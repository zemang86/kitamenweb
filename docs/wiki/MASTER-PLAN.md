# KITAMEN Esports Wiki — Master Plan

**Surface:** `home.kitamen.my/wiki` (Next.js app, same repo/Vercel deploy as the rest of the site — NOT the WordPress blog at kitamen.my/blog).
**Created:** 2026-06-22 · **Status:** living doc, updated per batch.

---

## 1. Strategy

**What it is:** a Malaysia-esports knowledge base — an entity graph (games, teams, players, tournaments, terms, bodies) with schema.org markup, built to (a) win AEO/answer-engine citations and (b) feed authority into the kitamen.my/blog clusters.

**Two decisions that scope this doc (locked 2026-06-22):**
- **Coverage = full Malaysian competitive scene** — all titles with a real MY scene, not just MLBB. Managed depth-first (finish a title before opening the next) to avoid thin/orphan pages.
- **Purpose = both, balanced (~70/30)** — each batch is ~70% entities that support a blog cluster (have crosslinks both ways) and ~30% gap-fill for scene completeness / brand authority.

**The wedge (inherited from the blog roadmap — we do NOT fight ONE Esports / Liquipedia / VLR.gg on global head terms):**
1. Malaysia-team & MY-player tracking
2. "How to watch from Malaysia" + MYT schedules (tournament entities carry dates/streams)
3. Bahasa Malaysia explainers (BM notes on glossary; BM crosslink blocks)
4. Role / patch / meta long-tails on a refresh cadence
5. Institutional/govt entities (DEK, MEAP, KBS, NADI) — no local incumbent, highest-ticket leads

**Definition of success:** every blog cluster has wiki entities it links to and is linked from; each title branch looks "complete" (game + MY teams + key tournaments + scene); the govt/institutional branch is the most authoritative MY-language reference online.

---

## 2. Architecture (recap — see `src/lib/wiki.ts`)

- **Entity types** (`WIKI_TYPES`), schema.org `@type` each:
  - `games` → VideoGame · `teams` → SportsTeam · `players` → Person · `tournaments` → SportsEvent · `glossary` → DefinedTerm
  - **`orgs` → Organization** (LIVE since Batch 4) — with optional `meta.schemaTypeOverride` for finer @type (GovernmentOrganization, SportsOrganization, GovernmentService). Holds ministries, federations, agencies and govt programmes (KBS, MESF, ESI, NADI, DEK, MEAP).
- **Content:** MDX at `src/content/wiki/<type>/<slug>.mdx`, each with `export const meta = {...}` + body. Filesystem-scanned at build — no registry edit to add one.
- **Routes (all SSG, `dynamicParams=false`):** `/wiki`, `/wiki/[type]`, `/wiki/[type]/[slug]`.
- **Search:** build-time `searchIndex()` → `WikiSearch` client component on `/wiki` (token-AND, title-weighted). New entities auto-index.
- **Three link fields** on every entity `meta`:
  - `related[]` — internal wiki (next/link), builds the AEO entity graph
  - `reading[]` — own blog posts (external `<a>`, "From the KITAMEN blog")
  - `sources[]` — external refs (+ `sameAs` for JSON-LD identity), "Sources" section
- `draft: true` hides from index/sitemap/static-gen. `nationality` asserted in JSON-LD ONLY if `meta.nationality` set.

---

## 3. Coverage map (TOC) — ✅ live · 🟡 partial · ⬜ planned

### Games (VideoGame)
- ✅ Mobile Legends: Bang Bang
- ✅ Honor of Kings
- ⬜ Free Fire
- ⬜ Valorant
- ⬜ EA Sports FC (FC Mobile / FC 26)
- ⬜ PUBG Mobile
- ⬜ Dota 2
- ⬜ Counter-Strike 2
- ⬜ Sim racing (iRacing / Assetto Corsa / Gran Turismo — ties to KITAMEN rig rental)

### Teams (SportsTeam) — MY orgs
- MLBB: ✅ Selangor Red Giants · ✅ Team Vamos · ✅ Homebois (HBSE) · ⬜ Geek Fam · ⬜ Orange Esports · ⬜ Todak · ⬜ RSG MY (verify) · ⬜ others per MPL MY franchise list
- HoK: ⬜ KIC 2025 MY podium orgs
- Free Fire: ⬜ FFMC MY teams
- Valorant: ⬜ MY Valorant orgs (verify roster nationality before "MY team")
- Other titles: ⬜ as scene warrants

### Players (Person) — VERIFIED ONLY, no invented stats/real-names
- ✅ Yums (SRG roamer, S17 MVP) · 🟡 example-player (draft template — keep as draft)
- ⬜ SRG S17 roster (verified handles + roles only) · ⬜ notable MY players per title

### Tournaments (SportsEvent)
- ✅ MPL Malaysia · ✅ MSC 2026 · ✅ KIC 2025
- ⬜ Esports World Cup 2026 (MLBB + HoK) · ⬜ M-series World Championship (M6/M7) · ⬜ MY Honor of Kings League (MKL)
- ⬜ Asian Games 2026 esports · ⬜ FFMC 2026 · ⬜ FFWS 2026 · ⬜ Valorant Challengers MY/SEA
- ⬜ NADI E-Sukan (grassroots) · ⬜ campus/school circuits

### Glossary (DefinedTerm)
- Roles (MLBB): ✅ gold-laner · ✅ exp-laner · ✅ mid-laner · ✅ jungler · ✅ roamer
- General esports: ⬜ meta · ⬜ patch · ⬜ draft/ban (pick-ban) · ⬜ rank tiers (Mythic etc.) · ⬜ MMR · ⬜ bo3/bo5/bo7 · ⬜ franchise league · ⬜ scrim · ⬜ IGL · ⬜ clutch · ⬜ eco round (Valorant) · ⬜ LAN
- MY-specific: ⬜ Dana E-Sukan KBS (DEK) · ⬜ MEAP · ⬜ NADI E-Sukan *(may move to `orgs`)*

### Orgs / bodies (Organization) — proposed type
- ⬜ KBS (Kementerian Belia & Sukan) · ⬜ MEsA (Malaysia Esports Association) · ⬜ NADI · ⬜ DEK & MEAP programmes (GovernmentOrganization/GrantProgram)

---

## 4. Batch plan (sequenced; each = one finishable verify → seed → link cycle)

Order = blog demand + fact-readiness (where we already have verified facts in memory). Each batch states the blog cluster it feeds and applies the 70/30 rule.

| # | Batch | Entities (target) | Feeds blog cluster | Fact source |
|---|-------|-------------------|--------------------|-------------|
| 1 | ✅ MLBB core | games×1, roles×5, teams×3, tourneys×3, player×1 | C1 news, C3 game-knowledge | DONE 2026-06-22 |
| 2 | MLBB deepen | +MY teams (Geek Fam/Orange/Todak/RSG MY), +SRG roster players (verified handles), +EWC 2026 MLBB, +M-series worlds; +general glossary (meta/patch/draft/rank tiers) | C1, C3 | Liquipedia + [[mlbb-game-facts-2026]] |
| 3 | Honor of Kings deepen | +MKL league, +KIC MY orgs, +HoK roles/terms, +EWC HoK | C2 HoK land-grab | [[hok-malaysia-facts]] |
| 4 | Institutional/govt | NEW `orgs` type: KBS, MEsA, NADI; DEK, MEAP; +Asian Games 2026 esports tourney | C5 schools/DEK (highest ticket) | [[my-esports-govt-facts-2026]], [[nadi-esukan-facts]] |
| 5 | ✅ Free Fire | game + FFWS + FFMC + glossary (BR/booyah/gloo wall/IGL); Vamos→multi-title | C4 Free Fire | DONE 2026-06-22 |
| 6 | Valorant | game + MY scene + Challengers + teams + terms (eco/clutch/IGL) | C7 Valorant TO money page | verify |
| 7 | Other titles | EA FC, PUBGM, Dota 2, CS2 — game + MY scene where real | gap-fill / breadth | verify |
| 8 | Sim racing | title(s) + KITAMEN rig-rental tie-in | C6 corporate, racing-sim-rental | [[racing-sim-rental-cluster]] |
| ∞ | Glossary + players ongoing | general + MY terms; verified player profiles | all | rolling |

**Sequencing rule:** finish a title's branch (game→teams→tournaments→players) before opening the next, so no title launches thin. Glossary/general terms drip alongside whatever batch needs them.

---

## 5. Per-entity Definition of Done

An entity is "done" only when ALL hold:
1. **Facts verified** against ≥1 authoritative source (Liquipedia / official / Esports Charts / govt). Players: handle + role + team only unless real-name/nationality independently verified. **Never invent.**
2. `sources[]` present (entities of record: teams/tournaments/games/orgs); every URL returns **200** (curl-check before publish).
3. `sameAs[]` set where a canonical identity page exists (drives JSON-LD entity identity).
4. `related[]` wired **bidirectionally** — if A links B, B links A.
5. `reading[]` points to any KITAMEN blog post about it (real permalink via `context=edit&_fields=link`, never guessed). BM posts labelled "(Bahasa Malaysia)".
6. BM text (glossary notes, BM crosslink copy) passes `bm_lint.py` (no Indonesian markers) — house style [[bahasa-malaysia-guardrail]].
7. Brand = "KITAMEN" only (no Sdn Bhd) per [[brand-name-kitamen-only]].
8. `npm run build` green (page prerenders) before commit.

---

## 6. Cross-linking protocol (blog ↔ wiki)

- **Deploy order:** push wiki entities → confirm pages 200 live → THEN add blog→wiki links (blog is a separate WP deploy; broken links if reversed).
- **wiki→blog:** `reading[]` field on the entity.
- **blog→wiki:** `docs/wp-audit/crosslink.py` injects an idempotent `<div id="km-esports-wiki">` block. Add `MAP[post_id]` entry (list = EN, or `{"lang":"ms","links":[...]}` for BM). Run `dry` then `apply`; auth imported from `enhance_post.py` (**never put WP password inline** — sandbox blocks it). Tool stays untracked (wp-audit convention).
- Each new entity that maps to a blog post gets BOTH directions in the same batch before the batch is "closed."

---

## 7. Progress ledger

- **2026-06-22 — Batch 1 (MLBB core):** 14 entities live. MLBB+HoK games, 5 roles, SRG/Vamos/Homebois, MPL/MSC/KIC, Yums. blog→wiki on #91570/#91597/#91598/#91599 + BM #91657–91662 + #91660 (6-link role hub); Team Vamos anchors on #91570/#91662. All verified live.
- **2026-06-22 — Batch 2 (MLBB deepen):** +10 entities (24 total). SRG S17 roster players (Kramm/Sekys/Stormie/Innocent/Unii — verified handles+roles+nationality, no real names) + Yums nationality added; M-Series World Championship (latest M7 = Aurora PH 4–0, M6 = ONIC PH); general glossary meta/patch/draft/rank-tiers. Verified MSC 2026 entity is CORRECT vs Liquipedia (25 teams/1 Jul–1 Aug — no edit). MPL entity now lists all 8 S17 franchise teams. Graph fully wired (roster↔roles↔team↔league). Pushed b1e20ab, all 10 pages verified 200 live. blog→wiki: #91570 expanded to 6 links (+Yums MVP, +M-Series) — applied & verified live public.
- **2026-06-22 — Batch 3 (HoK deepen):** +2 tournaments (26 total) — MY Honor of Kings League (MKL; Spring 2026 3rd ed., champion All Gamers Global, US$60k) + Honor of Kings World Cup 2026 (KWC at EWC 26, Paris 30 Jul–8 Aug, US$3M, 20 teams, def. AG.AL). Wired into HoK game (body linkified) + KIC + homebois (HBSE core → Geekay in MKL 2026). KIC podium re-verified all-MY (HBSE/Nova/Alpha). **Deliberately deferred standalone HoK team pages** (Nova/Alpha/AG.AL) — org nationality is muddy (AG.AL called a Chinese org yet won the Malaysian MKL; "Nova" is a global brand). Needs per-org identity verification first. Pushed a0da16d, both pages 200 live. blog→wiki: #91598 expanded to 5 links (+MKL, +HoK World Cup) — applied & verified live public.
- **2026-06-22 — Batch 4 (institutional/govt):** added 6th entity type **`orgs`** (Organization, with `schemaTypeOverride` for GovernmentOrganization/SportsOrganization/GovernmentService) in wiki.ts. +6 org entities (32 total): KBS (ministry, Min. Dr. Mohammed Taufiq Johari), MESF (OCM-recognised national body), Esports Integrated/ESI (KBS agency, runs MEL + DEK), NADI (MCMC ~1,099 centres + NADI E-Sukan grassroots), DEK (RM1m grant, RM5k–20k/project, 2026 window closed), MEAP (RM500k intl. accelerator). Corrected master-plan "MEsA"→MESF. NADI: no acronym expansion asserted. All official URLs verified. Pushed bcc0097, all 6 pages + /wiki/orgs index 200 live. blog→wiki: #91561 (5 links: KBS/ESI/DEK/MEAP/MESF), #91564 (NADI/KBS), #91565 (NADI/MESF/KBS) — BM blocks, lint-clean, applied & verified live public.
- **2026-06-22 — Batch 5 (Free Fire):** +8 entities (40 total). New title branch, verified vs Liquipedia/Garena. games/free-fire (Garena/111dots, mobile BR, Clash Squad 4v4 BO7, MY operational — India ban did NOT affect MY/SEA); tournaments free-fire-world-series (FFWS 2025 Global Finals, Jakarta 31 Oct–15 Nov, US$1M, BR champ Buriram United TH; no MY org in global field) + free-fire-malaysia-championship (FFMC — confirmed current name, NOT "FFML"; 2026 Spring, 18 teams, US$50k, champ Team Vamos, RU Anyone Can Dream, 3rd EWG); glossary battle-royale/booyah/gloo-wall/igl. **Cross-game win:** Team Vamos confirmed (Liquipedia FF page: "Malaysian, founded by Mohd Faris", vamos.com.my) = SAME org as MLBB Vamos → expanded teams/team-vamos to multi-title org (MLBB MPL S17 RU + Free Fire FFMC 2026 Spring champ), linking the MLBB↔Free Fire branches. Pushed 29e32ed, all 8 pages 200 live. blog→wiki: #89643 (5 links), #91625 (3), #89632 (2), #91577 (2) — applied & verified live public. **Deferred (unverified):** standalone pages for Anyone Can Dream / EWG (thin identity), FFWS 2026 winner + FFMC 2026 Fall results (seasons in progress), Team SMG/RSG as FF reps (not in verified standings).
- _next: Batch 6 (Valorant)._

**Deferred HoK gap-fill:** verified team pages for KIC/MKL orgs (Nova, Alpha Gaming, All Gamers Global) once each org's nationality/identity is confirmed; optional HoK-specific glossary (lane/objective names — memory flags these LOW-confidence).

**Remaining MLBB gap-fill (later):** full pages for the other 6 S17 franchise teams (Invictus Gaming, Bigetron MY by VIT, RRQ Tora, Team Rey, AC Esports, Team Flash) — need per-team placement verification before seeding.

---

## 8. Open items / decisions pending

- [x] ~~Approve `orgs` type~~ — DONE Batch 4 (Organization + schemaTypeOverride).
- [x] ~~Confirm S17 franchise teams~~ — verified (8 teams listed on MPL entity); 6 still need standalone pages.
- [ ] HoK team pages (Nova/Alpha/AG.AL) — pending per-org nationality verification.
- [ ] Asian Games 2026 esports tournament entity — needs live qualifier verification (Cluster 1 / news).
- [ ] Sim-racing: model as game entities per sim title, or one "Sim racing" hub + KITAMEN offering? (decide at Batch 8).
