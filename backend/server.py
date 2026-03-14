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


# ─── Pydantic Models ─────────────────────────────────────────────────────────
class ToolInput(BaseModel):
    text: str

class ContactSubmission(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    service: Optional[str] = None
    message: str
    honeypot: Optional[str] = None  # spam trap

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


# ─── Routes: Contact ─────────────────────────────────────────────────────────
@app.post("/api/contact")
async def submit_contact(body: ContactSubmission):
    # Honeypot spam check
    if body.honeypot:
        return {"success": True, "message": "Received."}

    if len(body.message.strip()) < 20:
        raise HTTPException(status_code=400, detail="Please provide more detail in your message.")

    doc = {
        "name": body.name.strip(),
        "email": body.email.strip().lower(),
        "company": body.company,
        "budget": body.budget,
        "timeline": body.timeline,
        "service": body.service,
        "message": body.message.strip(),
        "created_at": datetime.utcnow(),
        "status": "new"
    }

    result = await db.contacts.insert_one(doc)
    return {"success": True, "message": "Your intake has been received. I'll be in touch within 48 hours.", "id": str(result.inserted_id)}


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
    return {"message": f"Seeded {len(seed_data)} notes."}


# Seed notes on startup
@app.on_event("startup")
async def startup_event():
    existing = await db.notes.count_documents({})
    if existing == 0:
        await seed_notes()
    # Create indexes
    await db.notes.create_index("slug", unique=True)
    await db.contacts.create_index("created_at")
