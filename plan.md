# plan.md

## 1) Objectives
- Deliver a production-quality, premium dark-themed multi-page portfolio for **Jethro “JayTee”** that clearly sells operator/strategist/builder capability.
- Implement **real React Router** navigation across 7 pages (Home, About, Work, Tools, Work With Me, Notes, Contact).
- Prove and ship the **core workflow**: AI-powered **Chaos Translator** + **Bloat Detector** via **FastAPI backend** (no client-side keys).
- Capture conversion via a premium **Contact/Intake form** and store submissions in **MongoDB**.
- Apply the specified visual system (graphite surfaces, metallic type, controlled neon accents) without looking like a generic template.

---

## 2) Implementation Steps

### Phase 1 — Core Feature POC (LLM Tools in Isolation)
**Goal:** verify LLM integration is stable before building the full site.

**User stories**
1. As a visitor, I can paste a messy idea and get a structured plan (summary + steps).
2. As a visitor, I can paste a feature list and get bloat/core/cut recommendations.
3. As a visitor, I see clear loading, success, and error states for AI runs.
4. As a builder, I can change prompts server-side without redeploying the frontend.
5. As an owner, I can be confident no API keys are exposed in the browser.

**Steps**
- Websearch best practices for: FastAPI → LLM provider calls, timeouts/retries, response shaping, and prompt design for “structure” + “bloat detection”.
- Define minimal response contracts:
  - `POST /api/tools/chaos-translate` → `{summary, steps[], risks?, assumptions?}`
  - `POST /api/tools/bloat-detect` → `{core_value, bloat_items[], keep_items[], recommendation}`
- Implement FastAPI endpoints with:
  - env-based LLM key usage (Emergent key), strict request validation (Pydantic), timeout + error mapping.
  - deterministic-ish output format (system prompt + JSON schema instructions).
- Create a **standalone Python test script** that calls both endpoints with sample inputs; iterate prompts until output is consistently parseable.
- Add minimal logging (request id, latency, failure reason) and basic rate limiting guardrails (simple in-memory throttle acceptable for v1).
- “Fix until it works”: do not proceed until both endpoints reliably return valid shaped JSON in repeated runs.

**Deliverables**
- Working FastAPI tool endpoints with validated JSON outputs.
- Python POC script proving both flows end-to-end.

---

### Phase 2 — V1 App Development (Full Site around Proven Core)
**User stories**
1. As a visitor, I can navigate across 7 pages without hash routing and without broken links.
2. As a visitor, the Home page clearly communicates the promise + method + selected systems in under 10 seconds.
3. As a visitor, I can use both AI tools on the Tools page and copy results.
4. As a prospective client, I can understand service options and initiate contact from multiple CTAs.
5. As the owner, contact submissions are stored in MongoDB and can be reviewed later.

**Backend (FastAPI + MongoDB)**
- Establish app structure: `api/` with routers for `tools`, `contact`, `notes`.
- Implement:
  - `POST /api/contact` to store intake submissions (Mongo) with server-side validation.
  - `GET /api/notes` + `GET /api/notes/:slug` for public notes read (seeded content ok for v1).
- Security: CORS allow frontend origin, input validation, strip HTML, basic spam mitigation (honeypot field + minimal timing check).

**Frontend (React + Router + Tailwind + shadcn/ui)**
- Real routes:
  - `/` Home, `/about`, `/work`, `/tools`, `/work-with-me`, `/notes`, `/contact`, `/notes/:slug`.
- Build a shared layout:
  - premium top nav, active states, global footer with **real** links only.
- Implement key page sections:
  - Home: hero (“Turns ambiguity into structure, direction, and leverage”), Operating Sequence, Selected Systems layout rules, ecosystem strip, tools preview, services preview, final CTA.
  - Work: curated systems (Job Forge primary left, ChurnWise secondary right, Transplant Tracker third quieter).
  - Tools: Chaos Translator + Bloat Detector UIs wired to backend; loading/errors/copy.
  - Work With Me: service cards + outcomes + CTA.
  - Notes: index + detail page (MVP: list + markdown rendering).
  - Contact: premium intake form → backend.
- Design system pass (single source of truth): colors, type scale, glow borders, glass panels, metallic gradient headings; avoid “rounded-card everywhere”.

**Close Phase 2 with testing**
- Run one end-to-end pass: navigation, tools calls, contact submit, notes read, mobile responsiveness.

---

### Phase 3 — Testing, Polish, and Hardening
**User stories**
1. As a visitor, pages load fast and animations never block reading.
2. As a visitor, tool failures are explained with actionable retry guidance.
3. As the owner, the site feels premium and consistent across pages.
4. As a prospective client, the contact flow feels intentional and high-trust.
5. As the owner, there are no placeholder links or dead CTAs.

**Steps**
- QA matrix: desktop/mobile, Safari/Chrome, slow network, API failure simulation.
- Improve tool UX: history (local), copy/download, character counters, example prompts.
- Notes: add basic author/date, reading time, SEO tags.
- Backend: tighten timeouts, add structured logs, add Mongo indexes (createdAt, slug).
- Performance: image optimization, route-level code splitting if needed.

---

### Phase 4 — Feature Expansion (after V1 is stable)
**User stories**
1. As the owner, I can add/edit notes without redeploying (admin workflow).
2. As the owner, I can view contact submissions in a simple internal dashboard.
3. As a visitor, I can share notes with clean social previews.
4. As the owner, I can gate advanced tool usage for monetization later.
5. As a visitor, I can subscribe for updates (optional).

**Steps**
- Add lightweight admin (or CLI) for notes + contact review.
- Add monetization-ready architecture: user tiers, quotas, and tool run metering (auth only with approval).
- If auth is requested: propose approach and get user approval before implementing.

---

## 3) Next Actions (Immediate)
1. Run websearch on best practices for FastAPI LLM calls + JSON schema prompting.
2. Implement FastAPI POC endpoints for Chaos Translator + Bloat Detector.
3. Write and run a Python POC script hitting both endpoints until outputs are stable.
4. Only after POC success: scaffold React Router app + Tailwind/shadcn, then wire Tools + Contact.

---

## 4) Success Criteria
- POC: both tool endpoints return valid, consistently shaped JSON across repeated runs; no client-side key exposure.
- V1: all 7 routes render with premium styling; Tools page works end-to-end; Contact submissions persist in MongoDB.
- UX: clear positioning hierarchy (JayTee primary; Nemurium ecosystem present but not noisy); Selected Systems layout rules honored.
- Quality: no placeholder links, no fake metrics, robust loading/error states, responsive across devices.
