# plan.md — Premium UX Enhancements (CTAs, Motion, Search, Breadcrumbs, Theme Switcher)

## 1) Objectives (Current Status: Shipped)
- ✅ Add **clear CTA pathways** (Hero, Work, Service Tiers, Tools, Contact) to increase conversion to “View Work” + “Let’s Talk”.
- ✅ Introduce **subtle, premium entrance motion** (viewport-based) with shimmer accents while respecting `prefers-reduced-motion`.
- ✅ Ship **site-wide search** (Cmd/Ctrl+K) to quickly navigate pages, notes, tools, and service tiers.
- ✅ Add **breadcrumbs** (route-aware) to improve orientation on multi-page navigation.
- ✅ Implement a **theme switcher** with **full-spectrum metallic accents** (12 presets) + **custom user accent**; persist selection.

**Outcome:** The premium UX layer is live, cohesive, and tested across pages. Phase 3 is now optional hardening/polish.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation): Search + Theme Engine ✅ COMPLETE
**Core risk (resolved):** global theming + search indexing work across the app without breaking premium styling.

**User stories (POC) — status**
1. ✅ As a user, I can open search with Cmd/Ctrl+K and jump to a page instantly.
2. ✅ As a user, I can search notes by title/summary and open the detail page.
3. ✅ As a user, I can switch metallic accent themes and see updates immediately.
4. ✅ As a user, my chosen theme persists after refresh.
5. ✅ As a user, I can choose a custom accent color and keep it.

**POC tasks — delivered**
- ✅ Created `ThemeProvider` (React context) + global CSS variables:
  - `--theme-accent`, `--theme-accent-light`, `--theme-accent-dark`, `--theme-ring`, `--theme-glow`, `--theme-gradient`, `--theme-metallic`.
- ✅ Added **12 metallic presets** + custom hex input:
  - Cyan Electric, Sapphire Blue, Emerald, Ruby Red, Royal Purple, Rose Gold, Amber Gold, Magenta, Teal, Lime, Indigo, Obsidian.
- ✅ Persist theme selection in `localStorage` (including custom color).
- ✅ Built **Search Command Palette** integrated into navigation:
  - Cmd/Ctrl+K shortcut
  - Index includes pages, tools, services, and notes (fetched from `/api/notes`).

**Exit criteria (POC) — met**
- ✅ Search opens/closes reliably, returns results, navigates correctly.
- ✅ Theme switcher changes accent tokens globally without layout regressions.

---

### Phase 2 — V1 App Development: CTAs + Breadcrumbs + Motion + Wire-up Search/Theme ✅ COMPLETE

**User stories (V1) — status**
1. ✅ As a visitor, I see primary/secondary CTAs in the Hero that route to Work / Work With Me.
2. ✅ As a visitor, each service tier has a clear CTA that routes to Contact.
3. ✅ As a visitor, I can open search from the nav and find any page/tool/note/service quickly.
4. ✅ As a visitor, I can see breadcrumbs showing where I am.
5. ✅ As a visitor, sections animate in subtly as I scroll, improving flow without distraction.

**V1 tasks — delivered**
- ✅ **Navigation**
  - Added search trigger with ⌘K hint (desktop).
  - Added theme switcher (palette icon) in nav.
- ✅ **Breadcrumbs**
  - Implemented site-wide breadcrumbs in `Layout.js`.
  - Route labels include: Home / About / Work / Lab / Work With Me / Notes / Contact.
- ✅ **CTAs**
  - Home Hero: enhanced primary CTA (Selected Work) + secondary CTA (How I Engage) with premium hover/shimmer.
  - Work: added “Discuss This System” per project + improved bottom CTA.
  - Work With Me: tier-specific CTAs:
    - “Request a Teardown”, “Start a Sprint”, “Inquire About Support”, “Commission a Build”.
  - Tools: accent color integration updated to use theme variables where applicable.
  - Contact: upgraded submit CTA with premium hover + shimmer and theme-aware focus styling.
- ✅ **Entrance motion**
  - Added `Reveal` and stagger support (IntersectionObserver + framer-motion).
  - Applied across Home, Work, Work With Me, About, Notes, Contact.
  - Added shimmer keyframes and optional shimmer accent line.
  - Respects `prefers-reduced-motion`.
- ✅ **Integration**
  - Converted key hard-coded cyan accents to theme variables (`var(--theme-accent, #00f0ff)` etc.).
  - Verified theme changes propagate across pages.

**Phase 2 testing — completed**
- ✅ End-to-end UI verification:
  - Search (Cmd/Ctrl+K), navigation from results
  - Theme switching across multiple presets + custom
  - Breadcrumb presence across routes
  - CTA routing and visual states
  - Motion behavior and reduced-motion fallback

---

### Phase 3 — Hardening + UX Polish (Optional Next Iteration) ⏳ READY

**User stories (Hardening)**
1. As a user, search results feel instant and highlight matches.
2. As a user, I can filter search by type (Page/Note/Tool/Service).
3. As a user, theme selection is accessible and always readable (contrast guardrails).
4. As a user, breadcrumbs never overflow and remain readable on mobile.
5. As a user, motion never feels jarring and is disabled when I prefer reduced motion.

**Hardening tasks (recommended, not required)**
- Search
  - Add fuzzy matching + highlighted query segments.
  - Add type filters (Pages / Tools / Services / Notes).
  - Add “loading notes…” state + error UI for notes fetch.
- Theme
  - Add contrast checks and auto-adjust text/border intensity per accent.
  - Expand custom picker UX (color picker input + saved favorites).
  - Apply theme tokens more broadly to legacy hard-coded accent colors.
- Breadcrumbs
  - Add responsive truncation + ellipsis for long note titles.
  - Optionally show current note title by wiring note title into breadcrumb on `NoteDetail`.
- Motion
  - Tune thresholds/durations globally and remove any potential layout shift.
  - Add a single global “motion intensity” setting (Off / Subtle / On).
- Refactor
  - Extract per-page CTA styles into reusable components.
  - Split large page files (especially `Tools.js`) into smaller tool components.

**Phase 3 testing**
- Mobile viewport regression pass (nav, breadcrumbs, command palette).
- Accessibility pass (keyboard navigation, focus rings, contrast).
- Performance pass (search indexing, motion overhead).

---

## 3) Next Actions (Updated)
1. ✅ No further work required to meet the current feature request; all requested enhancements are implemented and tested.
2. ⏳ If desired, proceed with **Phase 3 Hardening**:
   - add fuzzy search + filters
   - breadcrumb truncation + dynamic note title
   - theme contrast guardrails
   - mobile + a11y + perf audit

---

## 4) Success Criteria (Updated)
- ✅ **Search:** Cmd/Ctrl+K works; results cover pages/tools/services/notes; navigation is correct.
- ✅ **Theme switcher:** 12 metallic presets + custom; persists; updates accent styling across pages.
- ✅ **Breadcrumbs:** correct for all static routes; visible and styled consistently site-wide.
- ✅ **CTAs:** clear CTA pathways in Hero + Work + Service Tiers + Contact; premium hover/feedback.
- ✅ **Motion:** subtle section entrance animations + shimmer accents; respects reduced-motion; no blocking UI.

**Optional Phase 3 criteria**
- Search supports fuzzy matching + filters + highlighted matches.
- Breadcrumbs handle long titles gracefully (truncate/ellipsis; dynamic note title).
- Theme system enforces contrast/readability guardrails.
- Mobile navigation + command palette + breadcrumbs verified across common breakpoints.
