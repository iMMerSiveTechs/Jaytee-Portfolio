# plan.md (Updated)

## 1) Objectives
- ✅ Deliver a production-quality, premium dark-themed multi-page portfolio for **Jethro “JayTee”** that clearly sells operator/strategist/builder capability.
- ✅ Implement **real React Router** navigation across 7 pages (Home, About, Work, Tools, Work With Me, Notes, Contact) + notes detail route.
- ✅ Prove and ship the **core workflow**: AI-powered **Chaos Translator** + **Bloat Detector** via **FastAPI backend** (**no client-side keys**).
- ✅ Capture conversion via a premium **Contact/Intake form** and store submissions in **MongoDB**.
- ✅ Apply the specified visual system (graphite surfaces, metallic type, controlled neon accents) without looking like a generic template.
- 🔜 Finalize hardening/polish: confirm mobile nav behavior across breakpoints, verify contact inputs/testids, run final QA pass, and document how to operate/extend.

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
  - **Home:** hero (“Turns ambiguity into structure, direction, and leverage”), Operating Sequence, Selected Systems hierarchy, ecosystem strip, tools preview, work-with-me preview, final CTA
  - **Work:** Job Forge (primary), ChurnWise (secondary), Transplant Tracker (quieter third)
  - **Tools:** Chaos Translator + Bloat Detector wired to backend with loading/error/copy
  - **Work With Me:** 4 tiers + flagship badge
  - **Notes:** index + detail page (simple markdown-like rendering)
  - **Contact:** premium intake form → backend
- ✅ Visual system implemented:
  - deep charcoal/graphite surfaces, metallic gradient headline treatment, restrained neon instrumentation accents (cyan/blue/violet)

**Close Phase 2 with testing — Completed**
- ✅ End-to-end pass completed with testing agent.
- ✅ Frontend major feature pass rate: ~95%.
- ✅ Two medium issues addressed:
  - Contact form inputs updated with `name` attributes + `data-testid` hooks.
  - Mobile nav implementation reviewed/confirmed correct (toggle uses `md:hidden`).

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
- 🔜 Tool UX polish (optional but recommended):
  - persist local run history
  - add “download JSON” + clearer error retry messages
- 🔜 Notes polish:
  - add canonical metadata (date already present, confirm display)
  - ensure slugs and 404 handling remain clean
- 🔜 Backend hardening:
  - add explicit timeouts/retries/backoff for LLM calls (if not already)
  - structured logs + request correlation id
  - rate limiting guardrail (simple in-memory throttle for v1)
- 🔜 Performance pass:
  - ensure no oversized assets
  - optional route-level code splitting

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
1. 🔜 Run final cross-device QA pass (mobile nav toggle + contact form selectors).
2. 🔜 Confirm tool error handling under forced failures (simulate backend 500/timeout).
3. 🔜 Confirm Mongo contact persistence and indexes in current environment.
4. 🔜 Do a final content/copy sweep to ensure hierarchy is maintained (JayTee primary; Nemurium present but not noisy) and no placeholders exist.

---

## 4) Success Criteria
- ✅ POC: both tool endpoints return valid, consistently shaped JSON across repeated runs; no client-side key exposure.
- ✅ V1: all 7 routes render with premium styling; Tools page works end-to-end; Contact submissions persist in MongoDB.
- ✅ UX: clear positioning hierarchy (JayTee primary; Nemurium ecosystem present but not noisy); Selected Systems layout rules honored.
- 🔜 Quality (final sign-off): verified responsive behavior across breakpoints, robust error states, no dead CTAs, and documented operation/extension steps.