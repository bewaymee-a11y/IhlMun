import requests

URL = "https://bewaymee-a11y.github.io/IhlMun/"

try:
    print(f"Checking {URL} (Live Site)...")
    r = requests.get(URL, timeout=10)
    text = r.text
    
    print(f"Status: {r.status_code}")
    print(f"Length: {len(text)}")
    
    # Check key updates
    print("\n--- Key Updates ---")
    print(f"1. Date '18-19 April 2026': {'PRESENT' if '18-19 April 2026' in text else 'MISSING (Found March?)'}")
    print(f"2. Location 'International House Lyceum': {'PRESENT' if 'International House Lyceum' in text else 'MISSING'}")
    
    # Check committee count. We search for text "8" near "committeesCount"
    # But since it's hard to grep proximity, let's just count occurrences
    cnt_8 = text.count(">8<") # HTML tag content
    cnt_7 = text.count(">7<")
    print(f"3. Committee Count '8': {cnt_8} found (vs '7': {cnt_7} found)")
    
except Exception as e:
    print(f"Error checking live site: {e}")
