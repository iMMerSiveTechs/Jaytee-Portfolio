# plan.md — Premium UX Enhancements (CTAs, Motion, Search, Breadcrumbs, Theme Switcher)

## 1) Objectives
- Add **clear CTA pathways** (Hero, Work, Service Tiers, Tools, Contact) to increase conversion to “View Work” + “Let’s Talk”.
- Introduce **subtle, premium entrance motion** (viewport-based) with shimmer accents while respecting `prefers-reduced-motion`.
- Ship **site-wide search** (Cmd/Ctrl+K) to quickly navigate pages, notes, tools, and service tiers.
- Add **breadcrumbs** (route-aware) to improve orientation on multi-page navigation.
- Implement a **theme switcher** with **full-spectrum metallic accents** (from reference images) + **custom user accent**; persist selection.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation): Search + Theme Engine
**Core risk:** global theming + search indexing must work everywhere without breaking premium styling.

**User stories (POC)**
1. As a user, I can open search with Cmd/Ctrl+K and jump to a page instantly.
2. As a user, I can search notes by title/summary and open the detail page.
3. As a user, I can switch metallic accent themes and see updates immediately.
4. As a user, my chosen theme persists after refresh.
5. As a user, I can choose a custom accent color and keep it.

**POC tasks**
- Create `ThemeProvider` (React context) + CSS variables (`--accent`, `--accent-2`, `--ring`, etc.).
- Add **12–15 metallic presets** (cyan, sapphire, emerald, ruby, gold, rose, magenta, teal, lime, obsidian, etc.) + **custom picker**.
- Persist theme in `localStorage`; safe default if missing.
- Build minimal **Search Command Palette** (shadcn `Command`) with static in-memory index:
  - pages (Home/About/Work/Tools/Work With Me/Notes/Contact)
  - tools (Chaos/Bloat/Friction)
  - service tiers (4)
  - notes (fetched from `/api/notes`)
- Verify keyboard shortcut + open/close behavior and route navigation.

**Exit criteria (POC)**
- Search opens/closes reliably, returns results, navigates correctly.
- Theme switcher changes accent tokens globally without layout regressions.

---

### Phase 2 — V1 App Development: CTAs + Breadcrumbs + Motion + Wire-up Search/Theme

**User stories (V1)**
1. As a visitor, I see a primary CTA in the Hero that takes me to Contact or Work.
2. As a visitor, each service tier has a clear “Start” CTA that routes to Contact with context.
3. As a visitor, I can open search from the nav and find any page/tool/note quickly.
4. As a visitor, I can see breadcrumbs showing where I am (e.g., Notes → Post).
5. As a visitor, sections animate in subtly as I scroll, improving flow without distraction.

**V1 tasks**
- **Navigation**
  - Add nav items: Search trigger + Theme switcher (dropdown/panel).
  - Add Cmd/Ctrl+K hint.
- **Breadcrumbs**
  - Implement in `Layout.js` using shadcn `Breadcrumb`.
  - Route map for labels; handle dynamic `notes/:slug` label via loaded note title (fallback to “Note”).
- **CTAs**
  - Hero: ensure 2 CTAs (Primary: “Let’s Talk”, Secondary: “View Work”).
  - Work With Me page: each tier gets primary CTA (“Request a Teardown”, etc.).
  - Tools page: add “Use this tool” / “Run another” micro-CTAs where appropriate.
  - Contact: add a strong “Start Intake” CTA (even if mailto for now).
- **Entrance motion**
  - Create `Reveal` component (framer-motion + IntersectionObserver) with stagger support.
  - Apply to major sections across Home/Work/WorkWithMe/Tools/Notes.
  - Add shimmer as a very subtle highlight line using accent tokens.
  - Respect `prefers-reduced-motion`.
- **Integrate POC components**
  - Theme tokens applied to existing accent usage (convert hard-coded accent colors to CSS vars where feasible).
  - Search indexes Notes via API and caches locally.

**Phase 2 testing**
- Run end-to-end UI verification: open search, navigate, switch themes, breadcrumbs display, CTAs route correctly.

---

### Phase 3 — Hardening + UX Polish

**User stories (Hardening)**
1. As a user, search results feel instant and highlight matches.
2. As a user, I can filter search by type (Page/Note/Tool/Service).
3. As a user, theme selection is accessible and doesn’t reduce readability.
4. As a user, breadcrumbs never overflow and remain readable on mobile.
5. As a user, motion never feels jarring and is disabled when I prefer reduced motion.

**Hardening tasks**
- Search: fuzzy matching, type filters, empty states, loading states for notes.
- Theme: ensure contrast rules, tune metallic palette, apply to focus rings + subtle borders.
- Breadcrumbs: responsive truncation + ellipsis; ensure correct labeling.
- Motion: tune durations/easing; ensure no layout shift.
- Refactor: extract Search + Theme + Reveal into `/src/components/` modules.

**Phase 3 testing**
- Comprehensive regression pass across all pages (desktop + mobile viewport), verify no broken layouts.

---

## 3) Next Actions
1. Implement ThemeProvider + CSS variable tokens + presets + custom color (POC).
2. Implement Command Palette search modal + keyboard shortcut + index builder (POC).
3. Integrate Search + Theme switcher into `Layout.js` nav.
4. Add Breadcrumbs in `Layout.js`.
5. Add `Reveal` component and apply to key sections.
6. Add/upgrade CTA buttons in Hero + Service Tiers + Tools + Contact.

---

## 4) Success Criteria
- **Search:** Cmd/Ctrl+K works; results cover pages/tools/services/notes; navigation is correct; no key exposure.
- **Theme switcher:** 12–15 metallic presets + custom; persists; updates accent styling globally without readability regressions.
- **Breadcrumbs:** correct for all routes; dynamic notes handled; mobile-friendly.
- **CTAs:** clear primary/secondary CTAs in Hero + per-service CTA; routing works.
- **Motion:** subtle section entrance animations + shimmer accents; respects reduced-motion; no layout shift.
