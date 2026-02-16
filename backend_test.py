#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class IHLMUNAPITester:
    def __init__(self, base_url="https://ihlmun-register.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'N/A')}"
            self.log_test("API Root", success, details)
            return success
        except Exception as e:
            self.log_test("API Root", False, f"Error: {str(e)}")
            return False

    def test_get_committees(self):
        """Test getting committees"""
        try:
            response = requests.get(f"{self.api_url}/committees", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                committees = response.json()
                details += f", Count: {len(committees)}"
                # Check if we have the expected 8 committees
                if len(committees) == 8:
                    details += " (Expected 8 committees found)"
                else:
                    details += f" (Expected 8, got {len(committees)})"
            self.log_test("Get Committees", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_test("Get Committees", False, f"Error: {str(e)}")
            return False, []

    def test_get_committee_by_id(self, committee_id):
        """Test getting specific committee"""
        try:
            response = requests.get(f"{self.api_url}/committees/{committee_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                committee = response.json()
                details += f", Name: {committee.get('name', 'N/A')}"
            self.log_test(f"Get Committee {committee_id[:8]}...", success, details)
            return success, response.json() if success else None
        except Exception as e:
            self.log_test(f"Get Committee {committee_id[:8]}...", False, f"Error: {str(e)}")
            return False, None

    def test_get_settings(self):
        """Test getting site settings"""
        try:
            response = requests.get(f"{self.api_url}/settings", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                settings = response.json()
                details += f", Fee: {settings.get('registration_fee', 'N/A')}"
            self.log_test("Get Settings", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Get Settings", False, f"Error: {str(e)}")
            return False, {}

    def test_registration(self, committee_id, committee_name):
        """Test registration endpoint with new essay fields"""
        # Create a 80+ word essay for why_attend
        why_attend_essay = "I want to attend IHL MUN 2026 because it represents an incredible opportunity to engage with international diplomacy and global affairs. As a student passionate about international relations, I believe this conference will provide me with invaluable experience in negotiation, public speaking, and critical thinking. The chance to represent a country and debate pressing global issues alongside peers from diverse backgrounds is exactly what I need to develop my diplomatic skills. Furthermore, the free participation makes this accessible to students like me who are genuinely interested in making a difference in the world through diplomacy and international cooperation."
        
        test_data = {
            "full_name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "institution": "Test University",
            "phone": "+998901234567",
            "telegram": "@testuser",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "committee_id": committee_id,
            "why_attend": why_attend_essay,
            "mun_experience": "I have participated in 3 MUN conferences at my university. I have experience as both delegate and chair.",
            "why_committee": f"I chose {committee_name} because I am passionate about the topics it covers and want to contribute meaningfully to the discussions.",
            "alternative_committees": "Human Rights Council, General Assembly, UNODC",
            "consent_interview": True,
            "understands_selection": True
        }
        
        try:
            response = requests.post(f"{self.api_url}/registrations", json=test_data, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                result = response.json()
                details += f", Success: {result.get('success', False)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f", Response: {response.text[:100]}"
            self.log_test(f"Registration for {committee_name[:20]}...", success, details)
            return success
        except Exception as e:
            self.log_test(f"Registration for {committee_name[:20]}...", False, f"Error: {str(e)}")
            return False

    def test_admin_login(self):
        """Test admin login"""
        try:
            response = requests.post(f"{self.api_url}/admin/login", 
                                   json={"username": "admin", "password": "admin123"}, 
                                   timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                self.token = data.get('access_token')
                details += ", Token received"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f", Response: {response.text[:100]}"
            self.log_test("Admin Login", success, details)
            return success
        except Exception as e:
            self.log_test("Admin Login", False, f"Error: {str(e)}")
            return False

    def test_admin_verify(self):
        """Test admin token verification"""
        if not self.token:
            self.log_test("Admin Verify", False, "No token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            response = requests.get(f"{self.api_url}/admin/verify", headers=headers, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Valid: {data.get('valid', False)}"
            self.log_test("Admin Verify", success, details)
            return success
        except Exception as e:
            self.log_test("Admin Verify", False, f"Error: {str(e)}")
            return False

    def test_admin_registrations(self):
        """Test admin registrations endpoint"""
        if not self.token:
            self.log_test("Admin Registrations", False, "No token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            response = requests.get(f"{self.api_url}/admin/registrations", headers=headers, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                registrations = response.json()
                details += f", Count: {len(registrations)}"
            self.log_test("Admin Registrations", success, details)
            return success
        except Exception as e:
            self.log_test("Admin Registrations", False, f"Error: {str(e)}")
            return False

    def test_get_secretariat(self):
        """Test getting secretariat members"""
        try:
            response = requests.get(f"{self.api_url}/secretariat", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                members = response.json()
                details += f", Count: {len(members)}"
            self.log_test("Get Secretariat", success, details)
            return success
        except Exception as e:
            self.log_test("Get Secretariat", False, f"Error: {str(e)}")
            return False

    def test_get_speakers(self):
        """Test getting guest speakers"""
        try:
            response = requests.get(f"{self.api_url}/speakers", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                speakers = response.json()
                details += f", Count: {len(speakers)}"
            self.log_test("Get Speakers", success, details)
            return success
        except Exception as e:
            self.log_test("Get Speakers", False, f"Error: {str(e)}")
            return False

    def test_get_media(self):
        """Test getting media photos"""
        try:
            response = requests.get(f"{self.api_url}/media", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                media = response.json()
                details += f", Count: {len(media)}"
            self.log_test("Get Media", success, details)
            return success
        except Exception as e:
            self.log_test("Get Media", False, f"Error: {str(e)}")
            return False

    def test_registration_word_count_validation(self, committee_id):
        """Test registration word count validation (minimum 80 words)"""
        short_essay = "This is too short."  # Only 4 words
        
        test_data = {
            "full_name": f"Test User Short {datetime.now().strftime('%H%M%S')}",
            "institution": "Test University",
            "phone": "+998901234567",
            "telegram": "@testuser",
            "email": f"testshort{datetime.now().strftime('%H%M%S')}@example.com",
            "committee_id": committee_id,
            "why_attend": short_essay,
            "mun_experience": "I have some experience.",
            "why_committee": "I like this committee.",
            "alternative_committees": "Any other committee",
            "consent_interview": True,
            "understands_selection": True
        }
        
        try:
            response = requests.post(f"{self.api_url}/registrations", json=test_data, timeout=10)
            # Should fail with 400 status code due to word count
            success = response.status_code == 400
            details = f"Status: {response.status_code}"
            if response.status_code == 400:
                try:
                    error_data = response.json()
                    error_msg = error_data.get('detail', '')
                    if '80 words' in error_msg:
                        details += f", Correct validation: {error_msg}"
                    else:
                        details += f", Unexpected error: {error_msg}"
                        success = False
                except:
                    details += ", Could not parse error response"
                    success = False
            else:
                details += ", Should have failed with 400 status"
                success = False
            
            self.log_test("Registration Word Count Validation", success, details)
            return success
        except Exception as e:
            self.log_test("Registration Word Count Validation", False, f"Error: {str(e)}")
            return False

    def test_admin_registration_status_update(self, registration_id):
        """Test updating registration status via admin"""
        if not self.token:
            self.log_test("Admin Status Update", False, "No token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            # Test updating status to "Accepted"
            response = requests.put(
                f"{self.api_url}/admin/registrations/{registration_id}/status", 
                json={"status": "Accepted"}, 
                headers=headers, 
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                result = response.json()
                details += f", Success: {result.get('success', False)}"
            self.log_test("Admin Status Update", success, details)
            return success
        except Exception as e:
            self.log_test("Admin Status Update", False, f"Error: {str(e)}")
            return False

    def test_admin_registrations_with_filters(self):
        """Test admin registrations with status and committee filters"""
        if not self.token:
            self.log_test("Admin Registrations Filters", False, "No token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.token}"}
            
            # Test filter by status
            response = requests.get(f"{self.api_url}/admin/registrations?status=Under Review", headers=headers, timeout=10)
            success = response.status_code == 200
            details = f"Status filter - Status: {response.status_code}"
            if success:
                registrations = response.json()
                details += f", Count: {len(registrations)}"
            
            # Test filter by committee (if we have registrations)
            if success:
                response2 = requests.get(f"{self.api_url}/admin/registrations?committee_id=test", headers=headers, timeout=10)
                success2 = response2.status_code == 200
                details += f" | Committee filter - Status: {response2.status_code}"
                
            self.log_test("Admin Registrations Filters", success, details)
            return success
        except Exception as e:
            self.log_test("Admin Registrations Filters", False, f"Error: {str(e)}")
            return False

    def test_committee_count_and_names(self):
        """Test that we have exactly 7 committees and no Security Council"""
        try:
            response = requests.get(f"{self.api_url}/committees", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                committees = response.json()
                committee_count = len(committees)
                committee_names = [c.get('name', '') for c in committees]
                
                # Check count is 7
                count_correct = committee_count == 7
                details += f", Count: {committee_count} (Expected: 7)"
                
                # Check no Security Council
                has_security_council = any('Security Council' in name for name in committee_names)
                no_security_council = not has_security_council
                details += f", No Security Council: {no_security_council}"
                
                # List committee names for verification
                details += f", Committees: {', '.join(committee_names[:3])}..."
                
                success = count_correct and no_security_council
                
            self.log_test("Committee Count & Names", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_test("Committee Count & Names", False, f"Error: {str(e)}")
            return False, []

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting IHL MUN 2026 API Tests")
        print("=" * 50)
        
        # Basic API tests
        if not self.test_api_root():
            print("❌ API root failed - stopping tests")
            return self.get_summary()
        
        # Test committee count and names (7 committees, no Security Council)
        committees_success, committees = self.test_committee_count_and_names()
        
        # Test committees
        if committees_success and committees:
            # Test first committee details
            first_committee = committees[0]
            self.test_get_committee_by_id(first_committee['id'])
            
            # Test registration with first committee (with new essay fields)
            self.test_registration(first_committee['id'], first_committee['name'])
            
            # Test word count validation
            self.test_registration_word_count_validation(first_committee['id'])
        
        # Test settings
        self.test_get_settings()
        
        # Test other endpoints
        self.test_get_secretariat()
        self.test_get_speakers()
        self.test_get_media()
        
        # Test admin functionality
        if self.test_admin_login():
            self.test_admin_verify()
            self.test_admin_registrations()
            self.test_admin_registrations_with_filters()
            
            # If we have registrations, test status update
            # Note: This would need a real registration ID in practice
        
        return self.get_summary()

    def get_summary(self):
        """Get test summary"""
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
        else:
            print("⚠️  Some tests failed")
            failed_tests = [r for r in self.test_results if not r['success']]
            print("\nFailed tests:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "results": self.test_results
        }

def main():
    tester = IHLMUNAPITester()
    summary = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if summary["passed_tests"] == summary["total_tests"] else 1

if __name__ == "__main__":
    sys.exit(main())