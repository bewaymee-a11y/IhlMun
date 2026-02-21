import os
import requests
import re

chairs_data = [
    {"name": "Darina Galchevskaya", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcApABtfx0M49pbA1r9LeAj32j_7LS-J133Aku1GfQ4pqYLADwsX_PNt6JG42niHE7HMUYvkxaiHLXywlVkgwwrO5fzJhEqBJ4Lvb736XLs-9i0L0jhyjYlOMc9SJ8-6vjUy8HykQ7vdPcMvbXpWvt7XhLzlcI=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Dilshod Khalbekov", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdjK1YEtHp2gh9jr_T71xN0cmH2OyK0_zShPKLtJSP87L-of9xzCK0q6RV8sKZDEDMKULzflmAMQ5lFEkb3Vs_JD6ushnu6fZoIvRJBAp96qL3XnxAdLObZjK4lQxXTtSluUNp3OLo02vL_btKKnbJFwzin0ls=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Fahriddin Shirinov", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeFIVuTxEF3c0w0WUvDCwb_f3wfae4LtITRnKNQpjmhS9TUF9jj1HW-ZaJ7QZZGKPfmSBmaI5BqNwYO_F0c6nRF5UQNqFE5ameedb5lYdo8zua7UY0kJv8BhJc6sEkWsLkW9xyidvCz11mVJFGINnsmZMU5bSE=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Roman Kim", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeiegZdJ_vBEX3m49B5mR-iAsS9lfi0Q80NZ3CMmRUK5XatwzRtNJShUm1yaVrs-y9CqHuk4FR6an2O3IZXu-zD1eQ8W61IIbtRiKXm3exbQHsx7e7N3XkFXlrh_sqddsF9WJov5thPtBN4odf157Gcymxidw=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Hilola Sotimkulova", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcpRMyzTDTaYtXQfjf3XQXdcQPMsigKhgf99On9NGu-fSGgP1mh483hoyWvIX4ruUgmQxYiUtnyAA6Z6ga7kqa2Xw5mRgQyh_R56PygdjIuWUQFqvTKvjjZpBVLmZ2IKVJkv5GiuOSkEYLsmQ-cvDHGM6LhpfE=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Muazzam Muminova", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeUEb1mTo_ePDS5Rc15pCRKFZ9cRU-fTPgly5G1a1V-u_tnf3snJqAWeUgcAfaPlK1oE_TXRnP0lleGH8YAo0FuN222NmB7OsQ7it2SremFFWGcYfpZ8A43c1zNUmz3hP3fsKUqBbHa0MO9hxjRP0cSd7a0tXw=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Khadija Bakhromova", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXc-eSkTRvEQ6obpkTFFcdtTolrtejy_Y3FjMS9grcf00w8en9dr2aznCzaggeEkvKGVnTyzHj3hgN9Wv9mBdx4cTDnf-lL0VaQGyJny-2M6fJL9_ltcruEno02S1RXOKsk8BFZ2sLAXZDWWCbIeszPVJfXmvKo=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Ezoza Bobomurodova", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcqTUT9NWd0a3qtdn9OdEmqtJ90pbzKFtqRYFZcAVTRlUJSs7boz29foOoDl10kugTtlqyrC6HMRKPkTIJ62xQLlhRQX3dYaMo8fJgmUxQIUK5s2hYvsuDgRdQyepucRQOf5YIunKgGLGgPHezLF43jdekiTU4=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Khonzodabegim Burkhonova", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfdMhfmOtxwWlrfaKmJSY7v4eE2KuodTY1c5AHsyeU92GUVpkRTtBJIihjrT8TlFAIpiUrUVaM69_w1XiLdPGglYSYyIHkPGVVRFmFC7bnrlSHA66lpHZtX5M7n8cTvCERA1gf_Wkg7-eaOQJ7li7I82gGrZQ=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Saida Adkhamova", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfdQSrFJV-yrtsNPiBi8OgZmzZuaC0Qhnnxc0k9vE_LZWmYGrsivEoYjSxtan1kOKdeBPWfXIjw8bp50s8mRRspObl0cEKm-yd-3k-_j3PL4YyN_VgCbXuUyhDLYns2IwaCTCVu9CZte-bWxe4KbmX9jNIw7Pw=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Abdumajid Toshmatov", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfwiA8a0V6hOah4SFaR_1UmUux2dqrRO-8-YmdZ4Mo9-4CXtzcmr2b9pt6gF0z6jOSLQBvIq94Jog-zXo94Ny2C9QB2_UtPfcDZJxPoZ1ZYqJOH0FrRFbUhvjPOTtRRymXDVCfPlhhQCNbAOTcDFS3oXIHg5w=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Dilnoza Yuldasheva", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfLEr04LtOIn7CZP9H-k7noLGjGPeXHx2j6xV2R0hPtshpnmW31YFz6aK9l5Vi8zR9RXJ3ZvUEFnuU_kgKUx90HZthSghswaWH2oi58-KewX8tHzEO9z1u9xBEf2IpPqbKhz7X9yi51HT0HMRyOUQnoU38Pqvw=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Mark Tokarev", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfbbVdvDR4QhzLV0nOWgyXFDjc17Ja9K1eVuGCgAixMllKXIQtgLncAIO0ti9i9GZGo8BgiYi3ZTMF5DLLjITqjG4wyGx0r2aONct1vzFao3jS9BDSiFqpaFNmX8oaQDlrJIVS5kceFhc8Gk3dHT4cKuYF-aQ=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Saidakhmadkhon Saidaminov", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfERCBAXUXUVstA-rjhmW7pXnFSKXzLtJ8DfUtS7LqpTOtrVcbmYpqs89sYDR_Ji4SzCTBDn3-h6bKVWccVws09zmpWr0Xrbl_GoyIRZbEbXVA8giCeoRjgwY5l1eG0o5QZsjt2C578mt83laomYjFcRcODf-E=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Neve Marie Crige", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfrrIGQtzBxzT7J0fkbeuCWHEgjchX-yAs9k7--3AcmwQb-PuHTRdSkO8GkDcmZHgXfb3vg8VS4uUCn4j05HcJgRXrCYfSYf9IcBYimGkFgOq0zxCpsAg-3wPiTJqfAYmhU2lHMWPw5cgzkACY8UdcO5OA1Tv0=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Асаль Шукурова", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdHwdpMXbakuBvQfXUTLG_FIVdLOZsu7_Vf-kZpIUYFnwO9eRC0dDDEaDm6d3m6XfmF5w8aq9d3Aig1ixJg-d5kM0lwSM8FJyDiQ3u-96ylQGB0lfX40wqF5mbhcjIMYRsTlNwaOtfOhiKoiDBRFh3eXdJcSIE=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"},
    {"name": "Мариям Мелибаева", "url": "https://lh7-rt.googleusercontent.com/docsz/AD_4nXe3jYTZoeDK6fAtRsgdWP_ef3jUEKgzUir_f7vrz0-ngSKG7XSoYpBHX8S_7ehrlf6FxR0lEzRg0l8VgIpgnq8XHI-VQyjQTNG4MyCugupIwME1zyMA004qda72RrTcLyVmB3cS9-Cvxuvbftw6HIT4IOWPUFQ=s800?key=ygTkgHqKEnrPfKLW4zdZ7g"}
]

output_dir = "frontend/public/chairs"
os.makedirs(output_dir, exist_ok=True)

def slugify(text):
    text = text.lower()
    mapping = {
        "асаль шукурова": "asal_shukurova",
        "мариям мелибаева": "mariyam_melibaeva"
    }
    if text in mapping:
        return mapping[text]
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s-]+', '_', text)
    return text

for chair in chairs_data:
    name = chair["name"]
    url = chair["url"]
    filename = f"{slugify(name)}.jpg"
    filepath = os.path.join(output_dir, filename)
    
    print(f"Downloading {name} to {filename}...")
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Success: {filename}")
        else:
            print(f"Failed to download {name}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {name}: {e}")

print("Download complete.")
