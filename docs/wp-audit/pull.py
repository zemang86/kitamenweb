#!/usr/bin/env python3
"""Pull all posts + pages from www.kitamen.my via the Cloudflare worker route."""
import json, base64, urllib.request, urllib.error, os, sys

BASE = "https://www.kitamen.my/wp-json/wp/v2"
USER = os.environ["WP_API_USERNAME"]
PWD  = os.environ["WP_API_PASSWORD"]
UA   = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
AUTH = base64.b64encode(f"{USER}:{PWD}".encode()).decode()
OUT  = os.path.dirname(os.path.abspath(__file__))

FIELDS = "id,slug,link,status,date,modified,title,excerpt,content,categories,tags,yoast_head_json"

def fetch(endpoint):
    items, page = [], 1
    while True:
        url = f"{BASE}/{endpoint}?per_page=100&page={page}&status=publish&_fields={FIELDS}"
        req = urllib.request.Request(url, headers={
            "Authorization": f"Basic {AUTH}", "Accept": "application/json", "User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                batch = json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 400:  # past last page
                break
            print(f"  HTTP {e.code} on {endpoint} page {page}: {e.read()[:200]}", file=sys.stderr)
            break
        if not batch:
            break
        items.extend(batch)
        print(f"  {endpoint}: page {page} -> {len(batch)} (total {len(items)})")
        if len(batch) < 100:
            break
        page += 1
    return items

for ep in ("posts", "pages"):
    print(f"Fetching {ep}...")
    data = fetch(ep)
    with open(os.path.join(OUT, f"{ep}.json"), "w") as f:
        json.dump(data, f)
    print(f"  saved {len(data)} {ep} -> {ep}.json")

# also pull category + tag term maps for the inventory
for tax in ("categories", "tags"):
    terms, page = [], 1
    while True:
        url = f"{BASE}/{tax}?per_page=100&page={page}&_fields=id,name,slug,count"
        req = urllib.request.Request(url, headers={
            "Authorization": f"Basic {AUTH}", "Accept": "application/json", "User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                batch = json.load(r)
        except urllib.error.HTTPError:
            break
        if not batch:
            break
        terms.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    with open(os.path.join(OUT, f"{tax}.json"), "w") as f:
        json.dump(terms, f)
    print(f"  saved {len(terms)} {tax} -> {tax}.json")
