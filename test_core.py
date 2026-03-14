"""
POC Test Script: Chaos Translator + Bloat Detector
Tests both LLM tool endpoints in isolation.
"""
import asyncio
import json
import os
import sys
from dotenv import load_dotenv
load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

API_KEY = os.environ.get("EMERGENT_LLM_KEY")
MODEL_PROVIDER = "openai"
MODEL_NAME = "gpt-4o"


# ─── Chaos Translator ────────────────────────────────────────────────────────
CHAOS_SYSTEM_PROMPT = """You are Jethro "JayTee", a Cross-Domain Clarity Architect. Your role is to take messy, overloaded, ambiguous project ideas and turn them into clear, structured, actionable clarity.

You MUST respond with ONLY valid JSON, no markdown, no explanation outside the JSON.

Output format:
{
  "summary": "1-2 sentence translation of what this really is",
  "steps": [
    {"stepNumber": "01", "title": "Step title", "content": "What to do and why"},
    ...
  ]
}

Rules:
- summary: brutally honest, business-first translation
- steps: 3-5 concrete steps, numbered with leading zeros
- No fluff, no buzzwords, no caveats outside the steps"""

BLOAT_SYSTEM_PROMPT = """You are Jethro "JayTee", an expert in Core Protection and product clarity. Your role is to identify off-core drift and feature bloat in product descriptions, roadmaps, or pitch decks.

You MUST respond with ONLY valid JSON, no markdown, no explanation outside the JSON.

Output format:
{
  "core_value": "1-2 sentence statement of what the true core product is",
  "bloat_items": ["feature or element that dilutes the core", ...],
  "keep_items": ["feature that genuinely supports the core", ...],
  "recommendation": "Ruthless, specific recommendation for what to cut first and why"
}

Rules:
- core_value: what the product SHOULD be, distilled to its essence
- bloat_items: 2-5 specific items that don't serve the core
- keep_items: 2-4 items that genuinely support the core
- recommendation: one paragraph, direct, actionable
- No softening language"""


async def test_chaos_translator():
    print("\n" + "="*60)
    print("TEST 1: Chaos Translator")
    print("="*60)

    test_input = """I have an idea for a local service app but it also has a marketplace 
    and a SaaS tool for businesses, and I want to add a social feed, 
    and I don't know who to sell to first - consumers or businesses?"""

    try:
        chat = LlmChat(
            api_key=API_KEY,
            session_id="poc-chaos-test",
            system_message=CHAOS_SYSTEM_PROMPT
        ).with_model(MODEL_PROVIDER, MODEL_NAME)

        user_msg = UserMessage(text=test_input)
        response = await chat.send_message(user_msg)
        
        print(f"Raw response:\n{response}\n")
        
        # Parse and validate
        parsed = json.loads(response)
        assert "summary" in parsed, "Missing 'summary'"
        assert "steps" in parsed, "Missing 'steps'"
        assert len(parsed["steps"]) >= 2, "Need at least 2 steps"
        assert all("stepNumber" in s and "title" in s and "content" in s for s in parsed["steps"]), "Steps missing fields"
        
        print("✅ Chaos Translator PASSED")
        print(f"   Summary: {parsed['summary'][:100]}...")
        print(f"   Steps: {len(parsed['steps'])}")
        return True

    except json.JSONDecodeError as e:
        print(f"❌ JSON Parse Error: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Validation Error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return False


async def test_bloat_detector():
    print("\n" + "="*60)
    print("TEST 2: Bloat Detector")
    print("="*60)

    test_input = """Our new fitness app tracks workouts, counts calories, 
    has a social feed with stories, sells crypto tokens for steps, 
    offers live coaching sessions, has a marketplace for gym gear, 
    and provides AI meal planning. Core promise: help people exercise more."""

    try:
        chat = LlmChat(
            api_key=API_KEY,
            session_id="poc-bloat-test",
            system_message=BLOAT_SYSTEM_PROMPT
        ).with_model(MODEL_PROVIDER, MODEL_NAME)

        user_msg = UserMessage(text=test_input)
        response = await chat.send_message(user_msg)
        
        print(f"Raw response:\n{response}\n")
        
        # Parse and validate
        parsed = json.loads(response)
        assert "core_value" in parsed, "Missing 'core_value'"
        assert "bloat_items" in parsed, "Missing 'bloat_items'"
        assert "keep_items" in parsed, "Missing 'keep_items'"
        assert "recommendation" in parsed, "Missing 'recommendation'"
        assert len(parsed["bloat_items"]) >= 1, "Need at least 1 bloat item"
        
        print("✅ Bloat Detector PASSED")
        print(f"   Core: {parsed['core_value'][:100]}...")
        print(f"   Bloat items: {len(parsed['bloat_items'])}")
        print(f"   Keep items: {len(parsed['keep_items'])}")
        return True

    except json.JSONDecodeError as e:
        print(f"❌ JSON Parse Error: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Validation Error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return False


async def main():
    print("Starting POC Tests: Clarity Lab AI Tools")
    print(f"Using model: {MODEL_PROVIDER}/{MODEL_NAME}")
    print(f"API Key present: {'Yes' if API_KEY else 'No'}")
    
    if not API_KEY:
        print("ERROR: EMERGENT_LLM_KEY not found in environment")
        sys.exit(1)

    results = []
    results.append(await test_chaos_translator())
    results.append(await test_bloat_detector())
    
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("✅ ALL POC TESTS PASSED - Ready to build app")
        sys.exit(0)
    else:
        print("❌ SOME TESTS FAILED - Fix before building app")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
