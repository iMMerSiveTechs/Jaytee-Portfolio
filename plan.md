# plan.md (Updated)

## 1) Objectives
- ✅ Deliver a production-quality, premium dark-themed multi-page portfolio for **Jethro “JayTee”** that sells operator/strategist/builder capability.
- ✅ Implement **real React Router** navigation across 7 pages (Home, About, Work, Tools, Work With Me, Notes, Contact) + notes detail route.
- ✅ Prove and ship the **core workflow**: AI-powered **Chaos Translator** + **Bloat Detector** via **FastAPI backend** (**no client-side keys**).
- ✅ Capture conversion via a premium **Contact/Intake form** and store submissions in **MongoDB**.
- ✅ Apply the specified visual system (graphite surfaces, metallic type, controlled neon accents) **without** generic “AI startup template” energy.
- ✅ Complete a **V1 refinement pass** focused on visible core polish while preserving future-ready architecture underneath (no auth, dashboards, or unnecessary complexity).
- 🔜 Finalize hardening/polish: run final QA matrix (breakpoints + tool failure modes), confirm no dead CTAs/placeholder links, and document how to operate/extend.

---

## 2) Implementation Steps

### Phase 1 — Core Feature POC (LLM Tools in Isolation)
**Goal:** verify LLM integration is stable before building the full site.

**User stories**
1. ✅ As a visitor, I can paste a messy idea and get a structured plan (summary + steps).
2. ✅ As a visitor, I can paste a feature list and get bloat/core/cut recommendations.
3. ✅ As a visitor, I see clear loading, success, and error states for AI runs.
4. ✅ As a builder, I can change prompts server-side without redeploying the frontend.
5. ✅ As an owner, I can be confident no API keys are exposed in the browser.

**Steps (Completed)**
- ✅ Implemented deterministic JSON-shaped outputs for both tools using backend-only LLM calls.
- ✅ Built and ran a standalone **Python POC script** validating both tools repeatedly.
- ✅ Confirmed results are parseable, stable, and returned as structured JSON.

**Deliverables (Completed)**
- ✅ Working FastAPI tool endpoints with validated JSON outputs:
  - `POST /api/tools/chaos-translate`
  - `POST /api/tools/bloat-detect`
- ✅ POC script proving both flows end-to-end.

---

### Phase 2 — V1 App Development (Full Site around Proven Core)

**User stories**
1. ✅ As a visitor, I can navigate across 7 pages without hash routing and without broken links.
2. ✅ As a visitor, the Home page clearly communicates the promise + method + selected systems in under 10 seconds.
3. ✅ As a visitor, I can use both AI tools on the Tools page and copy results.
4. ✅ As a prospective client, I can understand service options and initiate contact from multiple CTAs.
5. ✅ As the owner, contact submissions are stored in MongoDB and can be reviewed later.

**Backend (FastAPI + MongoDB) — Completed**
- ✅ Implemented:
  - `POST /api/contact` (server-side validation + honeypot; persists to MongoDB)
  - `GET /api/notes` and `GET /api/notes/{slug}` (seeded notes; published-only)
  - Notes seeding on startup + indexes (slug unique, created_at)
- ✅ Confirmed **backend tests: 100%** passing (10/10).

**Frontend (React + Router + Tailwind + shadcn/ui) — Completed**
- ✅ Real routes implemented:
  - `/` Home, `/about`, `/work`, `/tools`, `/work-with-me`, `/notes`, `/notes/:slug`, `/contact`
- ✅ Shared layout:
  - premium top nav with active state indicator
  - global footer with primary CTA
- ✅ Pages implemented per requirements:
  - **Home:** hero, Operating Sequence, Selected Systems hierarchy, ecosystem presence, tools preview, work-with-me preview, final CTA
  - **Work:** selective 3-project portfolio (Job Forge, ChurnWise, Transplant Tracker)
  - **Tools:** Chaos Translator + Bloat Detector wired to backend with loading/error/copy
  - **Work With Me:** 4 tiers + flagship treatment
  - **Notes:** index + detail page (simple markdown-like rendering)
  - **Contact:** premium intake form → backend
- ✅ Visual system implemented:
  - deep charcoal/graphite surfaces, metallic headline treatments, restrained neon instrumentation accents (cyan/blue/violet)

**Close Phase 2 with testing — Completed**
- ✅ End-to-end pass completed with testing agent.
- ✅ Frontend major feature pass rate: ~95%.
- ✅ Medium issues addressed:
  - Contact form inputs updated with `name` attributes + `data-testid` hooks.
  - Mobile nav implementation reviewed/confirmed correct (toggle uses `md:hidden`).

---

### Phase 2.5 — V1 Refinement Pass (Visible Core Polish, Future-Ready Architecture Preserved) — Completed
**Goal:** refine the visible “core” experience to feel like a high-end operator portfolio with an immersive ecosystem behind it—without surfacing extra complexity.

**Priority outcomes (Completed)**
1. ✅ **Homepage polish (Nemurium signal, less template energy)**
   - Added subtle **dot-grid texture** + controlled glow sweeps for a more immersive/Nemurium feel.
   - Rebuilt ecosystem messaging as a **subtle inline signal strip** (Nemurium / iMMerSiveTechs / VibeForge Studios) — not an org chart.
   - Redesigned **Operating Sequence** from a generic 4-card grid into an **editorial numbered list** with typographic hierarchy.
   - Improved spacing/rhythm/hierarchy and rewrote CTA language to be more operator-specific.

2. ✅ **Selected Systems (premium/editorial composition)**
   - Preserved hierarchy rules:
     - Job Forge left / primary
     - ChurnWise right / secondary
     - Transplant Tracker quieter third below
   - Reduced “card-template sameness” via differentiated treatments:
     - Job Forge gets dominant, accented framing
     - ChurnWise gets lighter secondary framing with signal lines
     - Transplant Tracker becomes quieter horizontal panel

3. ✅ **Work page (remove placeholder energy)**
   - Removed placeholder preview blocks.
   - Added **CSS-only abstract visual panels** per project:
     - Job Forge workflow bars
     - ChurnWise subscription stack
     - Transplant Tracker continuity chart
   - Shifted to more editorial layout with hairline separators and clearer differentiation.

4. ✅ **Tools / Lab (operator instrument framing, not identity takeover)**
   - Strengthened “instrument” framing and reduced demo vibes.
   - Improved output presentation as report-like panels (Terminal icon header, structured sections).
   - Added top gradient accent lines differentiating tools; kept backend-safe monetization runway.

5. ✅ **Contact + Work With Me (premium, direct, useful)**
   - Work With Me: editorial numbered service tiers, italic “Best for” context, sharper CTAs, rewritten “How I work”.
   - Contact: two-column layout with trust/intent signals (response time, who reads it, what next) + improved “What’s the situation?” framing and “Send this” CTA.

6. ✅ **Keep V1 lean**
   - No auth, dashboards, user accounts, or surfaced app complexity.
   - Preserved the future-ready backend/component architecture underneath.

---

### Phase 3 — Testing, Polish, and Hardening (Remaining)
**User stories**
1. As a visitor, pages load fast and animations never block reading.
2. As a visitor, tool failures are explained with actionable retry guidance.
3. As the owner, the site feels premium and consistent across pages.
4. As a prospective client, the contact flow feels intentional and high-trust.
5. As the owner, there are no placeholder links or dead CTAs.

**Steps (Revised for current status)**
- 🔜 Run final QA matrix:
  - mobile/desktop breakpoints (verify nav toggle visibility)
  - Safari/Chrome smoke pass
  - slow network + tool timeout/error simulation
- 🔜 Verify conversion flow end-to-end:
  - contact submit → Mongo persistence
  - success state + toast reliability
- 🔜 Tool resilience hardening:
  - explicit timeouts/retries/backoff for LLM calls (if not already)
  - clearer error retry messages for transient failures
  - optional lightweight rate limiting guardrail (v1)
- 🔜 Notes polish:
  - confirm canonical metadata (date/tag display) + 404 handling
- 🔜 Performance pass:
  - ensure no oversized assets
  - optional route-level code splitting
- 🔜 Content sweep:
  - confirm JayTee remains primary; Nemurium is present but subtle
  - remove/replace any remaining placeholders (links, copy, footer metadata)

---

### Phase 4 — Feature Expansion (after V1 is stable)
**User stories**
1. As the owner, I can add/edit notes without redeploying (admin workflow).
2. As the owner, I can view contact submissions in a simple internal dashboard.
3. As a visitor, I can share notes with clean social previews.
4. As the owner, I can gate advanced tool usage for monetization later.
5. As a visitor, I can subscribe for updates (optional).

**Steps (Unchanged; post-V1)**
- Add lightweight admin (or CLI) for notes + contact review.
- Add monetization-ready architecture: user tiers, quotas, and tool run metering.
- If auth is requested: propose approach and get user approval before implementing.

---

## 3) Next Actions (Immediate)
1. 🔜 Run final cross-device QA pass (nav toggle + typography/spacing across breakpoints).
2. 🔜 Confirm tool failure handling under forced failures (simulate backend 500/timeout).
3. 🔜 Confirm Mongo contact persistence and indexes in current environment.
4. 🔜 Do a final content/link sweep to ensure no placeholders or dead CTAs remain.

---

## 4) Success Criteria
- ✅ POC: both tool endpoints return valid, consistently shaped JSON across repeated runs; no client-side key exposure.
- ✅ V1: all 7 routes render with premium styling; Tools page works end-to-end; Contact submissions persist in MongoDB.
- ✅ UX: clear positioning hierarchy (JayTee primary; Nemurium ecosystem present but not noisy); Selected Systems layout rules honored.
- ✅ Refinement: homepage/editorial rhythm improved; Work page feels intentional; tools framed as instruments; conversion pages feel premium and direct.
- 🔜 Quality (final sign-off): verified responsive behavior across breakpoints, robust error states under timeouts, no dead CTAs/placeholder links, and documented operation/extension steps.
