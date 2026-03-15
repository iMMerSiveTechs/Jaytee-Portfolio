import os
import uuid
import json
import asyncio
from datetime import datetime
from typing import Optional, List
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import motor.motor_asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage

# ─── App Setup ──────────────────────────────────────────────────────────────
app = FastAPI(title="JayTee Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Database ────────────────────────────────────────────────────────────────
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "jaytee_portfolio")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ─── LLM Config ──────────────────────────────────────────────────────────────
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")
LLM_PROVIDER = "openai"
LLM_MODEL = "gpt-4o"

CHAOS_SYSTEM_PROMPT = """You are Jethro \"JayTee\", a Cross-Domain Clarity Architect. Your role is to take messy, overloaded, ambiguous project ideas and turn them into clear, structured, actionable clarity.

You MUST respond with ONLY valid JSON, no markdown code fences, no explanation outside the JSON.

Output format:
{"summary": "1-2 sentence translation of what this really is", "steps": [{"stepNumber": "01", "title": "Step title", "content": "What to do and why"}]}

Rules:
- summary: brutally honest, business-first translation of the real core
- steps: 3-5 concrete, numbered steps with leading zeros (01, 02, etc.)
- No fluff, no buzzwords, no unnecessary caveats
- Keep each content field under 120 words"""

BLOAT_SYSTEM_PROMPT = """You are Jethro \"JayTee\", an expert in Core Protection and product clarity. Your role is to identify off-core drift and feature bloat in product descriptions, roadmaps, or pitch decks.

You MUST respond with ONLY valid JSON, no markdown code fences, no explanation outside the JSON.

Output format:
{"core_value": "1-2 sentence statement of what the true core product is", "bloat_items": ["feature that dilutes the core"], "keep_items": ["feature that genuinely supports the core"], "recommendation": "Ruthless, specific recommendation for what to cut first and why"}

Rules:
- core_value: what the product SHOULD be, distilled to its essence
- bloat_items: 2-5 specific items that don't serve the core
- keep_items: 2-4 items that genuinely support the core
- recommendation: one paragraph, direct, actionable, no softening language"""

FRICTION_SYSTEM_PROMPT = """You are Jethro \"JayTee\", a business workflow architect specialising in operational leverage. Your role is to take a described business process—however clunky, manual, or convoluted—and diagnose exactly where it breaks down, what to cut, and how to redesign it for real-world efficiency.

You MUST respond with ONLY valid JSON, no markdown code fences, no explanation outside the JSON.

Output format:
{
  "bottleneck": "The single biggest friction point in this process and a precise explanation of why it costs the most time, trust, or revenue",
  "eliminate_steps": [
    {"step": "Step name or short description", "reason": "Specific reason this step is removable or can be absorbed elsewhere"}
  ],
  "streamlined_architecture": [
    {"phase": "01", "name": "Phase name (2-4 words)", "description": "What happens in this phase and who owns it (under 40 words)"}
  ],
  "efficiency_signal": "One sharp, direct sentence describing the core transformation this redesign creates for the operator—what their daily reality looks like after this change"
}

Rules:
- bottleneck: name the specific step, handoff, or system that creates the most damage—not a vague observation
- eliminate_steps: 2-5 concrete steps to remove or collapse; each reason must be operational, not theoretical
- streamlined_architecture: 3-5 phases maximum; lean, sequenced, and actionable
- efficiency_signal: one sentence, no hedging, written as if describing the after-state the operator actually lives in
- Never use phrases like "consider" or "you might want to"—be direct"""

SCOPE_SLICER_SYSTEM_PROMPT = """You are Jethro \"JayTee\", an expert in Core Protection and Leverage Mapping. Your role is to take overly ambitious, bloated project scopes and ruthlessly slice them down to a bare-bones, high-leverage MVP — the smallest thing that can prove the core idea under real conditions.

You MUST respond with ONLY valid JSON, no markdown code fences, no explanation outside the JSON.

Output format:
{
  "core_bet": "One sentence: the single bet this product is actually making — the irreducible hypothesis that must be proven before anything else matters",
  "mvp_scope": [
    {"feature": "Feature name (2-5 words)", "reason": "Why this must exist in v1 — what it proves or enables (under 30 words)"}
  ],
  "deferred": [
    {"feature": "Feature name (2-5 words)", "version": "v2 or v3", "reason": "Why this can wait — what dependency or validation must come first (under 30 words)"}
  ],
  "cut_entirely": ["Feature or idea that should be permanently removed and why in one clause"],
  "launch_signal": "One sharp sentence describing what success looks like for this MVP — the measurable or observable signal that tells you the core bet is working"
}

Rules:
- core_bet: one sentence, no hedging, identifies the actual hypothesis being tested
- mvp_scope: 3-5 features maximum — the absolute minimum to test the core bet
- deferred: 3-6 features that are valuable but premature — each must name what needs to be true first
- cut_entirely: 2-4 items that are distractions, vanity features, or scope creep regardless of version
- launch_signal: one sentence, specific and observable, not vague metrics
- Be ruthless. Founders over-scope because they're afraid of launching small. Your job is to make small feel strategic.
- Never use phrases like "consider" or "you might want to" — be direct"""


ENTROPY_AUDIT_SYSTEM_PROMPT = """You are Jethro \"JayTee\", a Cross-Domain Clarity Architect. Your role is to take a chaotic dump of someone's current situation — worries, tasks, problems, feelings, ambitions — and ruthlessly separate the noise from the signal, then identify the single highest-leverage action.

You MUST respond with ONLY valid JSON, no markdown code fences, no explanation outside the JSON.

Output format:
{
  "noise": "The items that are distractions, emotional venting, or irrelevant to the actual problem — listed clearly so the person can see what to ignore",
  "signal": "The actual core problem or bottleneck identified from the chaos — one clear, specific statement of what is really going on",
  "leverage": "The single highest-leverage action to take RIGHT NOW — not a plan, not a strategy, one concrete action",
  "leverage_detail": "A specific instruction on when or how to execute this action (e.g., 'Do this before 5pm today' or 'Send this email within the next hour')"
}

Rules:
- noise: identify 2-4 items that are distractions, emotional weight, or secondary concerns. Be direct but not cruel.
- signal: one sentence, brutally specific. Name the actual problem, not the symptom.
- leverage: one action. Not three. Not a plan. One thing.
- leverage_detail: make it concrete and time-bound when possible.
- If the domain is "strategy", focus on business/product decisions. If "operations", focus on workflow/execution.
- Never hedge. Never say "consider" or "you might want to". Be direct."""


# ─── Pydantic Models ─────────────────────────────────────────────────────────
class ToolInput(BaseModel):
    text: str

class EntropyAuditInput(BaseModel):
    text: str
    domain: str = "operations"

class ContactSubmission(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    service: Optional[str] = None
    message: str
    honeypot: Optional[str] = None  # spam trap
    tried_already: Optional[str] = None
    breaking_most: Optional[str] = None
    success_looks_like: Optional[str] = None

class NewsletterSubscribe(BaseModel):
    email: str

class NoteCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    tags: Optional[List[str]] = []


# ─── Helpers ─────────────────────────────────────────────────────────────────
def serialize_doc(doc):
    if doc is None:
        return None
    result = {}
    for key, value in doc.items():
        if key == "_id":
            result["id"] = str(value)
        elif isinstance(value, datetime):
            result[key] = value.isoformat()
        else:
            result[key] = value
    return result


async def call_llm(system_prompt: str, user_text: str, session_id: str) -> dict:
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=system_prompt
    ).with_model(LLM_PROVIDER, LLM_MODEL)

    user_msg = UserMessage(text=user_text)
    response = await chat.send_message(user_msg)

    # Strip markdown code fences if present
    cleaned = response.strip()
    if cleaned.startswith("```"):
        lines = cleaned.split("\n")
        cleaned = "\n".join(lines[1:-1])

    return json.loads(cleaned)


# ─── Routes: Health ───────────────────────────────────────────────────────────
@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


# ─── Routes: Tools ───────────────────────────────────────────────────────────
@app.post("/api/tools/chaos-translate")
async def chaos_translate(body: ToolInput):
    if not body.text or len(body.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Input too short. Please provide more context.")
    if len(body.text) > 3000:
        raise HTTPException(status_code=400, detail="Input too long. Please keep under 3000 characters.")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM service not configured.")

    session_id = f"chaos-{uuid.uuid4().hex[:8]}"
    try:
        result = await call_llm(CHAOS_SYSTEM_PROMPT, body.text, session_id)
        # Validate structure
        if "summary" not in result or "steps" not in result:
            raise ValueError("Invalid response structure")
        return {"success": True, "data": result}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/tools/bloat-detect")
async def bloat_detect(body: ToolInput):
    if not body.text or len(body.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Input too short. Please provide more context.")
    if len(body.text) > 3000:
        raise HTTPException(status_code=400, detail="Input too long. Please keep under 3000 characters.")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM service not configured.")

    session_id = f"bloat-{uuid.uuid4().hex[:8]}"
    try:
        result = await call_llm(BLOAT_SYSTEM_PROMPT, body.text, session_id)
        if "core_value" not in result or "bloat_items" not in result:
            raise ValueError("Invalid response structure")
        return {"success": True, "data": result}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/tools/friction-audit")
async def friction_audit(body: ToolInput):
    if not body.text or len(body.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Input too short. Please describe your process in more detail.")
    if len(body.text) > 3000:
        raise HTTPException(status_code=400, detail="Input too long. Please keep under 3000 characters.")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM service not configured.")

    session_id = f"friction-{uuid.uuid4().hex[:8]}"
    try:
        result = await call_llm(FRICTION_SYSTEM_PROMPT, body.text, session_id)
        required_keys = {"bottleneck", "eliminate_steps", "streamlined_architecture", "efficiency_signal"}
        if not required_keys.issubset(result.keys()):
            raise ValueError(f"Invalid response structure — missing keys: {required_keys - set(result.keys())}")
        return {"success": True, "data": result}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audit failed: {str(e)}")


@app.post("/api/tools/scope-slice")
async def scope_slice(body: ToolInput):
    if not body.text or len(body.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Input too short. Please describe your project scope in more detail.")
    if len(body.text) > 3000:
        raise HTTPException(status_code=400, detail="Input too long. Please keep under 3000 characters.")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM service not configured.")

    session_id = f"scope-{uuid.uuid4().hex[:8]}"
    try:
        result = await call_llm(SCOPE_SLICER_SYSTEM_PROMPT, body.text, session_id)
        required_keys = {"core_bet", "mvp_scope", "deferred", "cut_entirely", "launch_signal"}
        if not required_keys.issubset(result.keys()):
            raise ValueError(f"Invalid response structure — missing keys: {required_keys - set(result.keys())}")
        return {"success": True, "data": result}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scope analysis failed: {str(e)}")


@app.post("/api/tools/entropy-audit")
async def entropy_audit(body: EntropyAuditInput):
    if not body.text or len(body.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Input too short. Please dump more of your current chaos.")
    if len(body.text) > 3000:
        raise HTTPException(status_code=400, detail="Input too long. Please keep under 3000 characters.")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM service not configured.")

    domain_context = f"\n\nDomain context: The user is focused on {body.domain}. Weight your analysis accordingly."
    session_id = f"entropy-{uuid.uuid4().hex[:8]}"
    try:
        result = await call_llm(ENTROPY_AUDIT_SYSTEM_PROMPT + domain_context, body.text, session_id)
        required_keys = {"noise", "signal", "leverage", "leverage_detail"}
        if not required_keys.issubset(result.keys()):
            raise ValueError(f"Invalid response structure — missing keys: {required_keys - set(result.keys())}")
        return {"success": True, "data": result}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Entropy audit failed: {str(e)}")


# ─── Routes: Contact ─────────────────────────────────────────────────────────
@app.post("/api/contact")
async def submit_contact(body: ContactSubmission):
    # Honeypot spam check
    if body.honeypot:
        return {"success": True, "message": "Received."}

    # Server-side validation
    errors = {}
    if not body.name or not body.name.strip():
        errors["name"] = "Name is required."
    elif len(body.name.strip()) < 2:
        errors["name"] = "Name must be at least 2 characters."
    elif len(body.name.strip()) > 100:
        errors["name"] = "Name must be under 100 characters."

    if not body.email or not body.email.strip():
        errors["email"] = "Email is required."
    else:
        import re
        email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        if not email_pattern.match(body.email.strip()):
            errors["email"] = "Please provide a valid email address."

    if not body.message or not body.message.strip():
        errors["message"] = "Message is required."
    elif len(body.message.strip()) < 20:
        errors["message"] = "Please provide more detail in your message (at least 20 characters)."
    elif len(body.message.strip()) > 5000:
        errors["message"] = "Message must be under 5000 characters."

    if body.service and body.service not in [
        "Clarity Teardown", "System Architecture Sprint",
        "Strategic Operator Support", "White-Glove Build",
        "General Inquiry", "Partnership or Collaboration"
    ]:
        errors["service"] = "Invalid service selection."

    if errors:
        raise HTTPException(status_code=422, detail={"errors": errors, "message": "Please fix the following fields."})

    doc = {
        "name": body.name.strip(),
        "email": body.email.strip().lower(),
        "company": body.company,
        "budget": body.budget,
        "timeline": body.timeline,
        "service": body.service,
        "message": body.message.strip(),
        "tried_already": body.tried_already,
        "breaking_most": body.breaking_most,
        "success_looks_like": body.success_looks_like,
        "created_at": datetime.utcnow(),
        "status": "new"
    }

    result = await db.contacts.insert_one(doc)
    return {"success": True, "message": "Your intake has been received. I'll be in touch within 48 hours.", "id": str(result.inserted_id)}


# ─── Routes: Newsletter ──────────────────────────────────────────────────────
@app.post("/api/newsletter/subscribe")
async def subscribe_newsletter(body: NewsletterSubscribe):
    import re
    email = body.email.strip().lower()
    email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    if not email or not email_pattern.match(email):
        raise HTTPException(status_code=422, detail="Please provide a valid email address.")

    await db.subscribers.update_one(
        {"email": email},
        {"$set": {"email": email, "subscribed_at": datetime.utcnow()}},
        upsert=True
    )
    return {"success": True, "message": "You're in. Welcome to the signal."}


# ─── Routes: Notes ────────────────────────────────────────────────────────────
@app.get("/api/notes")
async def get_notes():
    notes = await db.notes.find({"published": True}).sort("created_at", -1).to_list(50)
    return {"notes": [serialize_doc(n) for n in notes]}


@app.get("/api/notes/{slug}")
async def get_note(slug: str):
    note = await db.notes.find_one({"slug": slug, "published": True})
    if not note:
        raise HTTPException(status_code=404, detail="Note not found.")
    return serialize_doc(note)


@app.post("/api/notes/seed")
async def seed_notes():
    """Seed initial notes for the portfolio."""
    existing = await db.notes.count_documents({})
    if existing > 0:
        return {"message": "Notes already seeded."}

    seed_data = [
        {
            "title": "Why Most Products Don't Need More Features",
            "slug": "why-products-dont-need-more-features",
            "excerpt": "The fastest path to clarity is almost always subtraction. Here's how to find what actually matters.",
            "content": """Most founders I work with have the opposite problem from what they think. They believe they need to add more to fix their product. More features. More segments. More channels. More complexity.

They're wrong.

The fastest path to clarity is almost always subtraction. Every feature you add creates three problems: it adds surface area that needs maintenance, it dilutes your core message, and it forces users to make decisions they didn't come for.

The operating principle I use: **Protect the core. Remove the clutter.**

Here's what that looks like in practice:

**Step 1: Identify the irreducible core**
What is the one thing your product does that no other product does in the same way? Strip everything else out. That's your core.

**Step 2: Audit every feature against the core**
For each feature, ask: does this directly serve the core promise, or does it exist because someone asked for it, or because a competitor has it? If it's the latter two, it's a candidate for removal.

**Step 3: Measure the cost of confusion**
Every time a user has to choose between two features that seem similar, you've failed. Confusion has a real cost — in churn, in support burden, in missed conversions.

The companies that win long-term are almost always the ones that said no more often than yes.""",
            "tags": ["product", "clarity", "systems"],
            "reading_time": 3,
            "published": True,
            "created_at": datetime(2025, 1, 15)
        },
        {
            "title": "The Operator Mindset: Structure Before Scale",
            "slug": "operator-mindset-structure-before-scale",
            "excerpt": "Scaling a broken system just creates a bigger broken system. Here's how to structure first.",
            "content": """There's a pattern I see in almost every engagement: the founder wants to scale, but the system underneath isn't ready for scale.

The instinct is understandable. You've got momentum, you've got interest, you want to move fast. But scaling a broken system doesn't fix the system — it amplifies every crack.

I call this the Structure First principle.

**What structuring looks like:**

Before you hire more, map what the current team is actually doing versus what they should be doing. You'll almost always find overlap, gaps, and one person doing three jobs that should belong to different roles.

Before you acquire more customers, map the customer journey from first touchpoint to full value. Where are they getting confused? Where are they churning? You'll find the same two or three friction points killing your retention.

Before you add more features, map what the current product actually does versus what users think it does. Misalignment here is usually the root cause of churn, not feature gaps.

Structuring is unglamorous work. It doesn't make headlines. But it's what separates companies that scale cleanly from companies that grow chaotically and then implode under the weight of their own complexity.

Do the structural work first. The scale becomes a lot easier.""",
            "tags": ["operations", "scale", "strategy"],
            "reading_time": 4,
            "published": True,
            "created_at": datetime(2025, 2, 8)
        },
        {
            "title": "On Building Systems That Outlast You",
            "slug": "building-systems-that-outlast-you",
            "excerpt": "A system that only works when you're in the room isn't a system. It's a dependency.",
            "content": """A system that only works when you're in the room isn't a system. It's a dependency.

This is one of the most common failure modes I see in early-stage businesses. The founder is brilliant, responsive, and deeply knowledgeable. But nothing works without them. Every decision runs through them. Every problem lands on their desk.

This isn't sustainable, and it isn't scalable.

Building systems that outlast you requires a specific kind of intentionality:

**Externalize the decision logic**
Instead of making every decision, write down the criteria for making the decision. What are the inputs? What are the rules? What are the exceptions? When those criteria are clear, other people can make the decision without you.

**Build for the second operator, not yourself**
The first operator (usually you) can navigate ambiguity because they have context. The second operator won't have that context. Build the system for them — clear documentation, obvious workflows, explicit handoffs.

**Design for failure**
Every system will fail at some point. The question is whether the failure is catastrophic or recoverable. Build in redundancy, checkpoints, and clear escalation paths so that when something breaks, it doesn't take everything else down with it.

The goal isn't a perfect system. It's a resilient one.""",
            "tags": ["systems", "operations", "leadership"],
            "reading_time": 4,
            "published": True,
            "created_at": datetime(2025, 3, 20)
        }
    ]

    await db.notes.insert_many(seed_data)

    # Additional notes with richer markdown formatting
    rich_notes = [
        {
            "title": "The Leverage Map: Finding Your 10x Moves",
            "slug": "leverage-map-finding-10x-moves",
            "excerpt": "Not all effort is created equal. A leverage map helps you find the moves that produce disproportionate results.",
            "content": """## The Problem With Equal Effort

Most teams treat every task as equally important. They work linearly through backlogs, distribute effort evenly, and wonder why progress feels slow despite everyone being busy.

The truth is brutal: **80% of your effort produces 20% of your results.** The question isn't whether you're working hard — it's whether you're working on the right things.

### What Is a Leverage Map?

A leverage map is a simple framework for categorizing every initiative by two dimensions:

1. **Impact** — how much does this move the needle on your core metric?
2. **Effort** — how much time, money, and attention does it require?

> The goal isn't to do more. The goal is to find the smallest set of actions that produce the largest set of outcomes.

### The Four Quadrants

- **High Impact, Low Effort** — Do these immediately. These are your 10x moves.
- **High Impact, High Effort** — Plan these carefully. They're worth doing but need proper resourcing.
- **Low Impact, Low Effort** — Automate or delegate. Don't waste senior attention on these.
- **Low Impact, High Effort** — Kill these. They're the silent killers of velocity.

### How to Build Yours

1. List every active initiative, project, and recurring task
2. Score each on impact (1-5) and effort (1-5)
3. Plot them on a 2x2 grid
4. Ruthlessly cut or defer anything in the bottom-right quadrant
5. Double down on the top-left quadrant

### The Hard Part

The hardest part isn't building the map — it's acting on it. **Killing projects feels like failure.** Saying no to stakeholders feels political. But the alternative is spreading yourself so thin that nothing gets the attention it deserves.

---

The best operators I know don't work harder. They work on fewer things, with more intensity, on the things that actually matter. That's leverage.""",
            "tags": ["strategy", "leverage", "operations"],
            "reading_time": 5,
            "published": True,
            "created_at": datetime(2025, 4, 12)
        },
        {
            "title": "Friction Is a Feature (When Used Intentionally)",
            "slug": "friction-is-a-feature",
            "excerpt": "We spend so much time removing friction that we forget: sometimes friction is exactly what the system needs.",
            "content": """## The Reflex to Remove

In product and operations, the default instinct is to remove friction. Faster onboarding. Fewer clicks. Smoother workflows. And most of the time, this instinct is right.

But not always.

### When Friction Protects

Some friction exists for good reasons:

- **Confirmation dialogs** before irreversible actions prevent costly mistakes
- **Cooling-off periods** in high-stakes decisions reduce regret and support tickets
- **Manual review steps** in critical workflows catch errors that automation misses

> The question isn't "how do we remove all friction?" — it's "which friction is protecting us, and which is just slowing us down?"

### The Intentional Friction Framework

Here's how I evaluate friction in any system:

1. **Map every friction point** — where does the user or operator slow down, stop, or get confused?
2. **Classify each one:**
   - `Protective` — prevents errors, enforces quality, or ensures compliance
   - `Educational` — teaches the user something they need to know
   - `Accidental` — exists because no one thought to remove it
   - `Legacy` — existed for a reason that no longer applies
3. **Remove accidental and legacy friction aggressively**
4. **Preserve and optimize protective and educational friction**

### A Real Example

A client wanted to remove the review step from their content publishing pipeline. "It slows us down," they said. We analyzed six months of data and found that the review step caught an average of `3.2 errors per week` that would have gone live — including two that would have caused compliance issues.

We didn't remove the review step. We made it faster:

- Pre-populated checklists based on content type
- Automated the mechanical checks (links, formatting, metadata)
- Reduced review time from **45 minutes to 12 minutes**

The friction stayed. The pain went away.

---

**The takeaway:** Don't reflexively remove friction. Understand it first. The best systems aren't frictionless — they're *intentionally* frictioned.""",
            "tags": ["product", "systems", "friction"],
            "reading_time": 5,
            "published": True,
            "created_at": datetime(2025, 5, 3)
        }
    ]

    for note in rich_notes:
        try:
            await db.notes.insert_one(note)
        except Exception:
            pass  # Skip if slug already exists

    return {"message": f"Seeded {len(seed_data) + len(rich_notes)} notes."}


# Seed notes on startup
@app.on_event("startup")
async def startup_event():
    existing = await db.notes.count_documents({})
    if existing == 0:
        await seed_notes()
    # Create indexes
    await db.notes.create_index("slug", unique=True)
    await db.contacts.create_index("created_at")
    await db.subscribers.create_index("email", unique=True)
