import urllib.request, json
response = urllib.request.urlopen('http://localhost:8000/committees')
data = json.loads(response.read())
for c in data:
    for chair in c['chairs']:
        print(f"{chair['name']}: {chair.get('photo_url')}")
