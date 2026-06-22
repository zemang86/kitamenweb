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
| 6 | ✅ VALORANT | game + VCT + VCT Pacific + d4v41 + glossary (roles/eco/clutch/spike/entry); Vamos-style cross-title via igl | C7 Valorant TO money page | DONE 2026-06-22 |
| 7 | ✅ Other titles | EA FC, PUBGM, Dota 2, CS2 — games + tournaments + MY players/team + glossary | gap-fill / breadth | DONE 2026-06-22 |
| 8 | ✅ Sim racing | discipline hub + 4 titles + 3 tourneys + Axle Sports + 4 MY drivers + glossary | C6 corporate, racing-sim-rental | DONE 2026-06-22 |
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
- **2026-06-22 — Batch 6 (VALORANT):** +12 entities (52 total). New title branch, verified vs Liquipedia/Riot. games/valorant (Riot 5v5 tactical FPS, 2020 PC / 2024 console, 4 agent roles); tournaments valorant-champions-tour (2026 = **4** intl leagues Americas/EMEA/Pacific/**China**, 12 ea; Champions 2026 Shanghai; 2025 champ NRG beat Fnatic 3–2 Paris) + vct-pacific (APAC tier-1; MY pathway = **Challengers SEA**, NOT "Challengers Malaysia"; **Ascension removed 2026** → direct Stage 2 Playoff slots); players/d4v41 (Khalish Rusyaidee, Malaysian Kelantan, Paper Rex IGL, first MY at a VCT international, Champions 2023 RU — real name verified via Liquipedia so included); glossary duelist/initiator/controller/sentinel + eco/clutch/spike/entry-fragger, and wired VALORANT+d4v41 into existing igl term (cross-title). **Verification corrections applied:** 4 VCT leagues not 3 (China added); `monyet` is Indonesian not Malaysian (EXCLUDED); Team Secret/Bleed/Todak NOT confirmed tier-1 MY (not seeded). Pushed 3afbd25, all 12 pages 200 live. blog→wiki: #89639 (5), #91624 (3), #87987 (3), #89632 (pillar updated to 4: +VALORANT +VCT alongside FF), #88421 Todak (2: MLBB+VALORANT), #88449 Xipto (2) — applied & verified live public. **Deferred (unverified):** MY tier-1 teams/players beyond d4v41, console availability in MY, 2027 open-qualifier return (forward-looking).
- **2026-06-22 — Batch 7 (EA FC / PUBG Mobile / Dota 2 / CS2):** +24 entities (76 total). Four new title branches, verify-first vs Liquipedia/official. **games:** ea-sports-fc (EA Vancouver/Romania, FC 26 rel. 26 Sep 2025, FIFA→FC rebrand at FC 24/2023, comp = 1v1 Ultimate Team on **FC Pro** circuit — **≠ FIFAe/eFootball**), pubg-mobile (LightSpeed/KRAFTON, 100p BR squad-4, rel. 19 Mar 2018; circuit PMPL→PMSL→**PMPL again 2026, PMSL defunct**), dota-2 (Valve MOBA 2013; **DPC discontinued after 2023** → third-party ESL/PGL/FISSURE era), counter-strike-2 (Valve, Source 2, **replaced CS:GO 27 Sep 2023**). **tournaments:** fc-pro-world-championship (Paris 22–26 Jul 2026, within EWC; eCL 2026 champ Anders Vejrgang DEN), pubg-mobile-global-championship (PMGC 2025 champ Alpha7 BR; World Cup 2025 champ Yangon Galacticos MM), the-international (Aegis; TI 2021 ~US$40M record; TI24 Liquid, TI25 Falcons), pgl-major-singapore-2026 (**first-ever CS Major in SEA**, 25 Nov–13 Dec). **teams:** orange-esports (**3rd at TI3 2013** — landmark MY/SEA Dota result). **players (real names only where Liquipedia-verified):** mushi (Chai Yee Fung), midone (Yeik Nai Zheng, first SEA to 8000 MMR, TI19 4th), kaze (Andrew Khong Weng Keong, CS AWPer via China orgs), rajabos (MY EA FC, FC Pro Asia South regional champ, no real name on record). **glossary:** wwcd, placement-points, ultimate-team, skill-moves, roshan, aegis-of-champions, position-system, captains-mode, awp, bomb, retake; cross-title wiring (battle-royale/igl ← PUBGM; eco/clutch/spike ← CS2; bomb↔spike; free-fire↔pubg-mobile; valorant→cs2). Pushed 3c15609, all 24 pages 200 live. blog→wiki: #89647 (4), #91263 (2), #91336 (1), #89641 (3), #89645 (3), #89746 (4), **#89632 pillar upgraded to 8-title hub** (all game branches) — applied & verified live public. **Honest exclusions:** no verified individual MY PUBGM player (regional slots ≠ asserted rosters); CS2 MY scene framed historical/diaspora (no domestic tier-1 team); EA FC's Minbappe kept as **eFootball not EA FC**; SEA Dota nationality carefully filtered (iceiceice=SG, Kuku=PH, Ana=AU all excluded).
- **2026-06-22 — Batch 8 (sim racing):** +22 entities (98 total). Final planned title batch; verify-first vs Liquipedia/official/motorsport sources; richest commercial tie-in (KITAMEN's rig-rental cluster). **discipline hub:** glossary/sim-racing (sim vs **arcade** distinction; FIA-recognised — GT champs FIA-sanctioned 2018, esports in Intl Sporting Code 2024). **games:** gran-turismo (GT7, **PlayStation console exclusive**, Polyphony/Sony, GTWS Nations+Manufacturers Cup; 2025 WF José Serrano ESP / Porsche), iracing (subscription PC online, est. 2008, eNASCAR/Porsche Supercup/IMSA), assetto-corsa-competizione (Kunos/505, 2018, **official GT World Challenge** game; ACC EVO ≠ official licence), f1 (Codemasters/EA, F1 25; esport renamed **F1 Sim Racing**). **tournaments:** gran-turismo-world-series (FIA-Certified GT heritage), f1-sim-racing (2025 champ **Jarno Opmeer NED, record 3rd**, Red Bull; on F1 24 game), toyota-gr-gt-cup-malaysia (**MY premier sim series**, national→Asia→Worlds). **orgs:** axle-sports (Alex Yoong's PJ academy + eRacing GP; SportsOrganization). **players (all verified Malaysian, Person):** alex-yoong (Malaysia's **only F1 driver** Minardi 2001–02; **national e-Racing coach appointed by MESF**, full-time Apr 2026, targeting 2026 Asian Games), naquib-azlan + nabil-azlan (iRacing → Toyota GR dev → **Sepang 1000km winners 2022/2023** = documented sim-to-real pipeline), taj-izrin-aiman (**GR GT Cup Asia 2024 champion**, Global Finals). **glossary:** force-feedback, direct-drive, load-cell-pedals, racing-line, balance-of-performance, telemetry, slipstream, hotlap, setup. **Hardware** (Fanatec **now Corsair-owned** post-2024 Endor insolvency; Logitech/Thrustmaster/MOZA/Simagic) folded into direct-drive/force-feedback glossary — NOT commercial brand pages. **Cross-branch link:** orgs/mesf → alex-yoong (ties govt branch to sim racing). Pushed 5c714cf, all 22 pages 200 live. blog→wiki (rig-rental cluster): #91571 Alex Yoong (4), #91283 rental pillar (5), #91284 (2), #91285 (2), #91286 (2), #91299 wheel brands (4), #91335 Toyota Gazoo case study (4), #91638 (2), #91614 corp tournament (3) — applied & verified live public. **Honest exclusions:** unnamed GTWS/Olympic "Aiman" claim, any MY GTWS World-Finals finisher (none verified), F1-returns-to-Malaysia rumor; MY scene framed emerging-but-real/motorsport-linked.
- **2026-06-22 — Gap-fill round 1 (110 entities):** cleared most of the deferred list, verify-first vs Liquipedia, honest nationality/franchise framing. +6 MPL Malaysia S17 teams completing the 8-team graph: invictus-gaming (3rd, CN brand/MY roster), bigetron-my-by-vit (4th, MY franchise of ID Bigetron), team-rey (5th, MY org ex-Barracuda), rrq-tora (6th, MY franchise of ID RRQ), ac-esports (7th, CN brand/MY roster), team-flash (8th, **SG-origin** not VN — corrected — entered MPL MY). Lean pages, NO rosters (loan tags/incomplete IG list flagged unreliable). +3 MKL HoK teams (resolves the Nova/Alpha/AG.AL deferral): all-gamers-global (MKL Spring 2026 champ; **Malaysia-based AG-brand team, MY-majority roster 4MY+1CN; distinct from Chinese AG Super Play**; AG.AL = AG+Alpha EWC tag, "Aurora Legend" was UNVERIFIED & dropped), geekay-esports (UAE org fielding ex-Homebois BSE MY core; MKL RU; took Challenger Cup slot after AGG ruled ineligible), nova-by-roc-esports (MKL 3rd, MY-majority roster under intl Nova brand via ROC partnership). +2 FF teams: eastern-wolves-gangz/EWG (FFMC 2026 Spring 3rd, roster verified) + anyone-can-dream (RU, lean). +tournaments/asian-games-2026 (Aichi-Nagoya 19 Sep–4 Oct, esports **full medal sport**, 11 events/13 titles incl MLBB/HoK/PUBGM/GT7/eFootball — **Dota 2 & EA FC excluded**; forward-looking STRUCTURE only, no results; links MLBB/HoK/PUBGM/Gran Turismo + MESF). Wired into mpl-malaysia (8 teams), mkl (podium + Challenger Cup eligibility), ffmc (ACD/EWG), homebois (Geekay lineage), 4 game pages (Asian Games). Pushed 633c045, all 12 pages 200 live. blog→wiki: #91598 HoK-scene (6, +3 MKL teams), #89737 Top-10-teams (4, NEW), #91577 EWC-guide (+asian-games-2026) — applied & verified live public. **Excluded per verification:** no MY VALORANT tier-1 beyond d4v41 (monyet/Famouz are Indonesian — FALSE leads); Alpha Gaming/AG Super Play (CN, KPL)/Trace Esports deferred (foreign, not MKL teams); no Asian Games results (future).
- **2026-06-22 — Gap-fill round 2 (117 entities):** completed the **MKL Spring 2026 10-team graph** — seeded the 7 remaining Malaysian-presenting teams after parallel Liquipedia nationality verification, with honest org framing. +slxdte-gaming (4th, MY org = rebranded DTE Gaming/Diamond Teenagers Esports + SHENLING partnership, 4MY+1CN, qualified via Open Series Split 5), team-haq (5th, MY org, all-MY 5/5, partner team), twisted-minds (6th, **Saudi org** Riyadh/2021 fielding MY-majority MKL roster 4MY+1CN — labelled foreign, locationName Saudi Arabia; signed MY roster ~23 Feb 2026 after ex-Vitality EU squad left), crit-vip (7th, MY org = CRIT Esports, all-MY ACS EduTour development squad), xdg-esports (8th, MY grassroots all-MY, **no Liquipedia org page** → nationality inferred from roster + Open Series qualifier path, empty sameAs), blepcat-gaming (9th, MY-majority 4MY+1CN = rebrand of DrG, **org HQ unverified**, empty sameAs), maqna-esports-club (10th, MY org, all-MY, promoted partner team). Standings reconcile cleanly 1–10 (AGG/Geekay/Nova already seeded). mkl.mdx now carries **full Spring 2026 final-standings table** (10 rows) + related links to all 10 teams; body note "8 of 10 are MY orgs/grassroots; Geekay (UAE) + Twisted Minds (SA) are foreign orgs with MY-majority rosters." Pushed b923dda, all 7 pages 200 live. **No new blog→wiki crosslinks** — #91598 HoK-scene block stays curated (game + league + World Cup + top-3 teams) and points to the MKL hub which now surfaces all 10; wiki→blog covered via each team's reading[]→#91598. **Verification honesty:** rosters listed as handles+nationality flags only (no unverified real names); XDG/Blepcat org HQ explicitly flagged inferred/unverified in body + facts.
- **2026-06-22 — Gap-fill round 3 (133 entities):** +16 standalone verified Malaysian **player** profiles (Person), each Liquipedia-verified — handle + role + nationality always, real name only where explicitly documented; current-team 2026 entries hedged (roster churn), historical titles are the load-bearing facts. **MLBB (7):** moon (Zikry Bin Shamsuddin, 3× MPL MY champ, Todak core), xorn (Mohammad Zul Hisham, MPL MY S3+S12 champ, S12 Finals MVP), chibi (Muhammad Nazhan, S12 champ + S16 RS MVP), sepat (Muhammad Irfan bin Aujang, S12 champ), smooth (Aeliff Adam, S8 champ w/ Team SMG, S11 RS MVP), izanami (Mohammad Irwandy Lim, S7 champ w/ RSG MY), soloz (Mohd Faris bin Zakaria — **= the verified Team Vamos co-founder**, 2× League MVP, leading MY MLBB creator). **Dota 2 (5):** nothingtosay (Cheng Jin Xiang, TI2021 RU + Riyadh Masters 2022 champ, 17k MMR), chuan (Wong Hock Chuan, **TI2012 champion — first SEA to win TI**, w/ the *Chinese* Invictus Gaming — noted, NOT linked to the MLBB invictus-gaming page), ws (Chung Wei Shen, **first to 15k MMR**, Commonwealth 2022 gold), yamateh (Ng Wei Poong, Orange Esports TI2012 legend), chyuan (Ng Kee Chyuan, TI2021 Fnatic). **HoK (2):** musangking (Chan Tat Yann, **HoK Championship 2024 champ + Finals MVP**, Geekay), shisan (Chong Khean Loong, HoK Intl Champ 2025 3rd, Geekay). **Free Fire (2):** theaxel (Mohamad Azim, most-decorated MY FF, FFWS MY 2024 — titles national NOT world), zuezz (Adam Hazwan). **Entity-model fix:** broadened teams/homebois from HoK-only "HBSE" into the full **Homebois org** page (MLBB MPL S12 champions + HoK HBSE KIC-2025 world title), mirroring the team-vamos multi-title pattern — makes all MLBB-player→homebois links correct + fills the MLBB Homebois gap. Bidirectional related[] back-links wired across dota-2/the-international/honor-of-kings/free-fire/FFMC/orange-esports/geekay/team-vamos/bigetron/ac-esports. Pushed 63af09a, all 16 pages 200 live. **blog→wiki crosslinks** to the two player-list posts (matched each post's actual ranked top-10): **#89719** Top-10-players NEW (6: sekys/midone/yums/stormie/zuezz/rajabos — the 6 of its 10 that have wiki pages), **#89746** Highest-earning extended 4→7 (+nothingtosay #2/chuan #8/moon #10 alongside mushi/midone/orange) — applied & verified live public. **Excluded per verification:** QingC (HoK, thinnest résumé — deferred); no standalone PUBGM player (none verified to spec, confirms prior finding); xNova/Minbappe/iShotz/AkmalJHD/Oli/JT/Ah-fu/Ohaiyo (in the blog lists but not seeded — unverified to spec or off-scope eFootball).
- _next: All 8 title batches + gap-fill rounds 1–3 DONE. Wiki = **133 entities** across 6 types; MPL MY S17 (8) + MKL Spring 2026 (10) team graphs COMPLETE; 31 player profiles live. Remaining deferred (thin/pending): Asian Games 2026 results (after Sep–Oct 2026); per-player handle-only roster members for lower-table teams (no standalone notability); rolling glossary/players as new verified facts land._

**Deferred HoK gap-fill:** verified team pages for KIC/MKL orgs (Nova, Alpha Gaming, All Gamers Global) once each org's nationality/identity is confirmed; optional HoK-specific glossary (lane/objective names — memory flags these LOW-confidence).

**Remaining MLBB gap-fill (later):** full pages for the other 6 S17 franchise teams (Invictus Gaming, Bigetron MY by VIT, RRQ Tora, Team Rey, AC Esports, Team Flash) — need per-team placement verification before seeding.

---

## 8. Open items / decisions pending

- [x] ~~Approve `orgs` type~~ — DONE Batch 4 (Organization + schemaTypeOverride).
- [x] ~~Confirm S17 franchise teams~~ — verified (8 teams listed on MPL entity); 6 still need standalone pages.
- [ ] HoK team pages (Nova/Alpha/AG.AL) — pending per-org nationality verification.
- [ ] Asian Games 2026 esports tournament entity — needs live qualifier verification (Cluster 1 / news).
- [ ] Sim-racing: model as game entities per sim title, or one "Sim racing" hub + KITAMEN offering? (decide at Batch 8).
