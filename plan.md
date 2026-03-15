# plan.md — Premium UX Enhancements + Immersive 3D Upgrade (Advanced Footer, Light/Dark + Palettes, Smooth Navigation, 3D UI)

## 1) Objectives (Current Status: Premium UX Shipped → Immersive Upgrade Planned)
- ✅ Add **clear CTA pathways** (Hero, Work, Service Tiers, Tools, Contact) to increase conversion to “View Work” + “Let’s Talk”.
- ✅ Introduce **subtle, premium entrance motion** (viewport-based) with shimmer accents while respecting `prefers-reduced-motion`.
- ✅ Ship **site-wide search** (Cmd/Ctrl+K) to quickly navigate pages, notes, tools, and service tiers.
- ✅ Add **breadcrumbs** (route-aware) to improve orientation on multi-page navigation.
- ✅ Implement a **theme switcher** with **full-spectrum metallic accents** (12 presets) + **custom user accent**; persist selection.

### New Objectives (Planned — Major Architectural Upgrade)
- ⏳ Add **Light/Dark mode toggle** site-wide, **combinable with accent palettes** (12 metallic presets + custom) for **24+ combinations**.
- ⏳ Implement **advanced smooth, elegant navigation**:
  - route/page transitions,
  - smooth scrolling / anchor navigation,
  - shared element (morphing) transitions.
- ⏳ Create an **ADVANCED 3D interactive UI layout throughout the app** (full immersive scope):
  - consistent depth, parallax, hover tilt,
  - 3D scene layers as progressive enhancement,
  - section-level 3D motifs for Home/Work/Tools/About/Contact.
- ⏳ Add an **advanced footer component** (interactive + premium):
  - animated mini-sitemap,
  - quick navigation and “mini-map”,
  - social + newsletter placeholder,
  - theme-aware styling.
- ⏳ Maintain performance via **progressive enhancement** (visual impact + optimization + fallbacks):
  - lazy-load 3D,
  - route-based code splitting,
  - reduced-motion handling,
  - non-WebGL fallback.

**Outcome (current):** The premium UX layer is live, cohesive, and tested across pages.
**Next Outcome (target):** Transform the site into a fully immersive, premium 3D web experience with dual Light/Dark modes and advanced navigation, without sacrificing stability.

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

### Phase 3 — Hardening + UX Polish (Optional) ⏳ READY
**Status:** not required for the immersive upgrade, but recommended before/alongside major 3D changes.

**User stories (Hardening)**
1. As a user, search results feel instant and highlight matches.
2. As a user, I can filter search by type (Page/Note/Tool/Service).
3. As a user, theme selection is accessible and always readable (contrast guardrails).
4. As a user, breadcrumbs never overflow and remain readable on mobile.
5. As a user, motion never feels jarring and is disabled when I prefer reduced motion.

**Hardening tasks (recommended)**
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

### Phase 4 — Dual Theme System (Light/Dark Toggle × Accent Palettes) ⏳ PLANNED
**Goal:** Add working toggle buttons for **Light/Dark** modes while retaining **accent palette switching**.

**User stories**
1. As a user, I can toggle **Dark** ↔ **Light** mode anywhere in the site.
2. As a user, I can keep my chosen **accent palette** in either mode.
3. As a user, the site maintains readability and premium contrast in both modes.

**Implementation tasks**
- Theme model
  - Extend `ThemeContext` to include `mode: 'dark' | 'light'`.
  - Persist `mode` in `localStorage` alongside accent preset/custom.
- Tokenization
  - Introduce background/surface tokens per mode:
    - `--theme-bg0`, `--theme-bg1`, `--theme-bg2`, `--theme-text`, `--theme-muted`, `--theme-border`.
  - Update shadcn/ui variables to reflect mode (`--background`, `--foreground`, `--card`, etc.).
- UI controls
  - Add a **Light/Dark toggle button** in nav (next to Search + Palette).
  - Optionally add a compact “Theme panel” with mode toggle + palette grid.
- Audit
  - Replace remaining hard-coded dark surfaces with mode-aware tokens.

**Exit criteria**
- Light/Dark toggle works globally.
- Accent palette switching continues to work in both modes.
- No major contrast regressions.

---

### Phase 5 — Advanced Smooth Navigation (All-of-the-Above) ⏳ PLANNED
**Goal:** Deliver elegant movement between sections and pages.

**User stories**
1. As a user, changing routes feels smooth and intentional (not abrupt).
2. As a user, in-page navigation scrolls smoothly with premium easing.
3. As a user, key UI elements can morph between routes (shared element transitions).

**Implementation tasks**
- Route transitions
  - Add `AnimatePresence` in the router outlet.
  - Page enter/exit transitions (fade + slight translate + blur).
- Smooth scroll
  - Add smooth scrolling engine (native `scroll-behavior` + optional Lenis).
  - Add optional anchor navigation for major sections (Home sections, Work sections).
- Shared element transitions
  - Add “shared layout” transitions for:
    - project cards → detail views (future)
    - tool cards → tool page (present)
  - Use framer-motion layoutId or FLIP.
- Accessibility
  - Respect reduced motion.
  - Maintain focus management on navigation.

**Exit criteria**
- Route transitions are stable and not nauseating.
- Smooth scroll does not break browser back/forward behavior.

---

### Phase 6 — Full-Site 3D Interactive UI Layout (React Three Fiber / Three.js) ⏳ PLANNED
**Scope chosen:** 2c — **Full immersive 3D experience across the entire site**.

**Principles**
- Progressive enhancement: 2D UI always works; 3D enhances.
- Performance: lazy-load scenes; stop rendering offscreen.
- Accessibility: reduced-motion and low-power fallbacks.

**User stories**
1. As a user, the site feels dimensional (depth, parallax, interactive layers).
2. As a user, 3D visuals reinforce the brand (metallic premium, immersive).
3. As a user, the site remains fast and usable on modest devices.

**Implementation tasks**
- Dependencies + architecture
  - Add `three`, `@react-three/fiber`, `@react-three/drei`.
  - Add a `ThreeLayer` system:
    - global background canvas,
    - per-page scene hooks,
    - intersection-controlled rendering.
- Global 3D language
  - Subtle “Nemurium field” background: particles/lines/volumetric glow.
  - Hover tilt + depth transforms for cards (CSS 3D + optional pointer-based parallax).
- Page-specific 3D motifs
  - Home: hero “signal field” + orbiting glyphs.
  - Work: 3D system diagrams / nodes.
  - Tools: “lab chamber” lighting + reactive grid.
  - About: 3D brand architecture stack visualization.
  - Contact: calm 3D ambient field.
- Fallbacks
  - Detect WebGL support; if missing, use 2D fallback (existing design).
  - Provide “3D intensity” setting (Off / Subtle / Immersive).

**Exit criteria**
- 3D layer does not break layout, navigation, or forms.
- 3D degrades gracefully.
- Core routes remain performant.

---

### Phase 7 — Advanced Footer Component (Interactive + Premium) ⏳ PLANNED
**Goal:** A footer that feels like a control panel, not an afterthought.

**User stories**
1. As a user, I can quickly jump to key pages and tools from the footer.
2. As a user, I see an interactive sitemap/mini-map and brand closure.
3. As a user, footer visuals match the premium immersive theme.

**Implementation tasks**
- Layout
  - Multi-column: Pages, Tools, Services, Contact.
  - Mini-map: highlight current route + quick nav.
- Interaction
  - Subtle animated hover states + shimmer.
  - Optional “Back to top” smooth scroll.
- Theme + motion
  - Fully theme-aware (light/dark + accent).
  - Reveal entrance animation.
- Optional
  - Newsletter placeholder (no backend) or integrate later.

**Exit criteria**
- Footer looks premium on desktop + mobile.
- Provides clear navigation and closure.

---

## 3) Next Actions (Updated)
1. Implement **Phase 4**: Light/Dark mode toggle + integrate with existing accent palettes.
2. Implement **Phase 5**: Smooth navigation (route transitions + smooth scroll + shared layout transitions).
3. Implement **Phase 6**: Introduce 3D infrastructure + progressive full-site 3D language.
4. Implement **Phase 7**: Advanced interactive footer.
5. Run combined hardening checks from Phase 3 (mobile, a11y, performance).

---

## 4) Success Criteria (Updated)
### Shipped ✅
- ✅ **Search:** Cmd/Ctrl+K works; results cover pages/tools/services/notes; navigation is correct.
- ✅ **Theme switcher:** 12 metallic presets + custom; persists; updates accent styling across pages.
- ✅ **Breadcrumbs:** correct for all static routes; visible and styled consistently site-wide.
- ✅ **CTAs:** clear CTA pathways in Hero + Work + Service Tiers + Contact; premium hover/feedback.
- ✅ **Motion:** subtle section entrance animations + shimmer accents; respects reduced-motion; no blocking UI.

### New Success Criteria (Immersive Upgrade) ⏳
- **Light/Dark Mode:** one-click toggle; persists; no contrast regressions; works with all palettes + custom.
- **Advanced navigation:** smooth page transitions; smooth anchor scroll; shared element transitions on key cards.
- **3D UI:** full-site 3D layer enhances without breaking usability; progressive enhancement; controllable intensity.
- **Advanced footer:** interactive, theme-aware, responsive, and provides quick navigation.
- **Performance:** acceptable LCP/CLS; 3D lazy-loaded; reduced-motion honored; non-WebGL fallback works.
