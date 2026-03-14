#!/usr/bin/env python3
import requests
import json
import sys
import time
from datetime import datetime

class JayTeeAPITester:
    def __init__(self, base_url="https://nemurium-core.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None, timeout=30):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            else:
                response = requests.request(method, url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                    return True, response_data
                except:
                    return True, response.text
            else:
                self.tests_failed.append({
                    "name": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200] if response.text else ""
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False, {}

        except requests.exceptions.Timeout:
            self.tests_failed.append({"name": name, "error": "Request timeout"})
            print(f"❌ Failed - Timeout after {timeout}s")
            return False, {}
        except Exception as e:
            self.tests_failed.append({"name": name, "error": str(e)})
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health(self):
        """Test health endpoint"""
        success, response = self.run_test("Health Check", "GET", "api/health", 200)
        if success and isinstance(response, dict):
            if "status" in response and response["status"] == "ok":
                print("   ✓ Health status OK")
                return True
            else:
                print("   ⚠ Unexpected health response format")
        return success

    def test_notes_list(self):
        """Test notes list endpoint"""
        success, response = self.run_test("Notes List", "GET", "api/notes", 200)
        if success and isinstance(response, dict):
            if "notes" in response:
                notes = response["notes"]
                print(f"   ✓ Found {len(notes)} notes")
                if len(notes) >= 3:
                    print("   ✓ Expected seeded notes found")
                    return True, notes
                else:
                    print("   ⚠ Expected at least 3 seeded notes")
                    return True, notes
            else:
                print("   ⚠ Unexpected notes response format")
        return success, []

    def test_note_detail(self, slug):
        """Test individual note detail endpoint"""
        success, response = self.run_test(f"Note Detail ({slug})", "GET", f"api/notes/{slug}", 200)
        if success and isinstance(response, dict):
            required_fields = ["title", "slug", "content", "excerpt"]
            missing_fields = [f for f in required_fields if f not in response]
            if not missing_fields:
                print(f"   ✓ All required fields present")
                return True
            else:
                print(f"   ⚠ Missing fields: {missing_fields}")
        return success

    def test_note_not_found(self):
        """Test note not found"""
        success, response = self.run_test("Note Not Found", "GET", "api/notes/nonexistent-slug", 404)
        return success

    def test_chaos_translator(self):
        """Test Chaos Translator tool"""
        test_input = {
            "text": "I have an idea for a local service app but it also has a marketplace and a SaaS tool for businesses, and I want to add a social feed, and I don't know who to sell to first..."
        }
        success, response = self.run_test(
            "Chaos Translator", "POST", "api/tools/chaos-translate", 200, 
            data=test_input, timeout=60
        )
        if success and isinstance(response, dict):
            if "success" in response and "data" in response:
                data = response["data"]
                if "summary" in data and "steps" in data:
                    print(f"   ✓ AI response with summary and {len(data['steps'])} steps")
                    return True
                else:
                    print("   ⚠ Missing summary or steps in AI response")
            else:
                print("   ⚠ Unexpected chaos translator response format")
        return success

    def test_chaos_translator_validation(self):
        """Test Chaos Translator input validation"""
        # Test empty input
        success, _ = self.run_test(
            "Chaos Translator - Empty Input", "POST", "api/tools/chaos-translate", 400,
            data={"text": ""}
        )
        if success:
            print("   ✓ Empty input validation working")
        
        # Test short input
        success2, _ = self.run_test(
            "Chaos Translator - Short Input", "POST", "api/tools/chaos-translate", 400,
            data={"text": "short"}
        )
        if success2:
            print("   ✓ Short input validation working")
        
        return success and success2

    def test_bloat_detector(self):
        """Test Bloat Detector tool"""
        test_input = {
            "text": "Our new fitness app tracks workouts, counts calories, has a social feed with stories, sells crypto tokens for steps, offers live coaching sessions, has a marketplace for gym gear, and provides AI meal planning."
        }
        success, response = self.run_test(
            "Bloat Detector", "POST", "api/tools/bloat-detect", 200,
            data=test_input, timeout=60
        )
        if success and isinstance(response, dict):
            if "success" in response and "data" in response:
                data = response["data"]
                required_fields = ["core_value", "bloat_items", "keep_items", "recommendation"]
                missing_fields = [f for f in required_fields if f not in data]
                if not missing_fields:
                    print(f"   ✓ AI response with all required fields")
                    return True
                else:
                    print(f"   ⚠ Missing fields: {missing_fields}")
            else:
                print("   ⚠ Unexpected bloat detector response format")
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "service": "General Inquiry",
            "budget": "Not sure yet",
            "timeline": "Flexible",
            "message": "This is a test message for the contact form to ensure it works properly and stores the data correctly."
        }
        success, response = self.run_test(
            "Contact Submission", "POST", "api/contact", 200, data=test_data
        )
        if success and isinstance(response, dict):
            if "success" in response and response["success"]:
                print("   ✓ Contact form submission successful")
                return True
            else:
                print("   ⚠ Contact submission not marked as successful")
        return success

    def test_contact_validation(self):
        """Test contact form validation"""
        # Test short message
        success, _ = self.run_test(
            "Contact - Short Message", "POST", "api/contact", 400,
            data={
                "name": "Test",
                "email": "test@example.com", 
                "message": "Short message"
            }
        )
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("🚀 STARTING JAYTEE PORTFOLIO API TESTS")
        print("=" * 60)
        print(f"Testing API at: {self.base_url}")
        
        start_time = time.time()

        # Basic endpoints
        print("\n" + "─" * 40)
        print("📋 BASIC ENDPOINTS")
        print("─" * 40)
        self.test_health()

        # Notes functionality
        print("\n" + "─" * 40)
        print("📝 NOTES FUNCTIONALITY")  
        print("─" * 40)
        notes_success, notes = self.test_notes_list()
        self.test_note_not_found()
        
        # Test individual notes if we have them
        if notes:
            # Test first note detail
            first_note = notes[0]
            if "slug" in first_note:
                self.test_note_detail(first_note["slug"])

        # AI Tools
        print("\n" + "─" * 40)
        print("🤖 AI TOOLS (May take 10-15 seconds each)")
        print("─" * 40)
        self.test_chaos_translator_validation()
        print("\n⏱️  Testing AI functionality - please wait...")
        self.test_chaos_translator()
        self.test_bloat_detector()

        # Contact functionality
        print("\n" + "─" * 40)
        print("📬 CONTACT FUNCTIONALITY")
        print("─" * 40)
        self.test_contact_validation()
        self.test_contact_submission()

        # Results summary
        end_time = time.time()
        duration = end_time - start_time
        
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {len(self.tests_failed)}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        print(f"Duration: {duration:.1f}s")

        if self.tests_failed:
            print("\n❌ FAILED TESTS:")
            for failure in self.tests_failed:
                print(f"  • {failure['name']}")
                if "expected" in failure:
                    print(f"    Expected: {failure['expected']}, Got: {failure['actual']}")
                if "error" in failure:
                    print(f"    Error: {failure['error']}")
                if "response" in failure and failure["response"]:
                    print(f"    Response: {failure['response']}")

        return len(self.tests_failed) == 0

def main():
    tester = JayTeeAPITester()
    success = tester.run_all_tests()
    
    print(f"\n🏁 API testing completed. {'SUCCESS' if success else 'SOME FAILURES'}")
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())