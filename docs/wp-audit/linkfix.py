#!/usr/bin/env python3
"""Re-check external links, save raw results, emit a per-post actionable fix list."""
import json, re, os, urllib.request, urllib.error, urllib.parse, html
from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict

D = os.path.dirname(os.path.abspath(__file__))
items = json.load(open(f"{D}/posts.json")) + json.load(open(f"{D}/pages.json"))
HREF = re.compile(r'href=["\']([^"\']+)["\']', re.I)
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
TAG = re.compile(r"<[^>]+>")
title_of = {it["id"]: html.unescape(TAG.sub("", it["title"]["rendered"])).strip() for it in items}

link_sources = defaultdict(list)  # url -> [(id,link)]
for it in items:
    for href in set(HREF.findall(it["content"]["rendered"])):
        href = href.strip()
        if href.startswith(("mailto:", "tel:", "#", "javascript:")):
            continue
        host = urllib.parse.urlparse(href).netloc.lower()
        if host and host not in ("www.kitamen.my", "kitamen.my") and href.startswith("http"):
            link_sources[href].append((it["id"], it["link"]))

def check(url):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=15) as r:
                return url, r.status
        except urllib.error.HTTPError as e:
            if e.code in (403, 405, 429) and method == "HEAD":
                continue
            return url, e.code
        except Exception as e:
            if method == "HEAD":
                continue
            return url, f"ERR:{type(e).__name__}"
    return url, "ERR"

results = {}
with ThreadPoolExecutor(max_workers=16) as ex:
    for url, status in ex.map(check, link_sources.keys()):
        results[url] = status
json.dump({u: str(s) for u, s in results.items()}, open(f"{D}/link-results.json", "w"))

# classify
def is_confirmed(s):
    return (isinstance(s, int) and (s == 404 or s >= 500)) or (isinstance(s, str) and s.startswith("ERR"))
def is_suspect(s):  # likely bot-block / auth, verify manually
    return isinstance(s, int) and s in (401, 403, 406, 451)

confirmed = {u: s for u, s in results.items() if is_confirmed(s)}
suspect   = {u: s for u, s in results.items() if is_suspect(s)}

# group by source post
by_post = defaultdict(list)
for u, s in confirmed.items():
    for pid, link in link_sources[u]:
        by_post[(pid, link)].append((u, s))

out = ["# KITAMEN.my — Broken Links Fix List\n"]
out.append(f"**{len(confirmed)} confirmed-broken** external links across {len(by_post)} posts. "
           f"({len(suspect)} more are likely false positives — bot-blocked/auth — listed at the end.)\n")
out.append("## Confirmed broken — grouped by post (fix these)\n")
for (pid, link), bad in sorted(by_post.items(), key=lambda x: -len(x[1])):
    out.append(f"### {title_of.get(pid,'?')}")
    out.append(f"{link}")
    for u, s in bad:
        out.append(f"- `{s}` → {u}")
    out.append("")
out.append("## Likely false positives (verify, probably fine)\n")
for u, s in sorted(suspect.items()):
    out.append(f"- `{s}` {u}")
open(f"{D}/broken-links-fixlist.md", "w").write("\n".join(out))

from collections import Counter
print("confirmed_broken:", len(confirmed), "| suspect:", len(suspect), "| posts_affected:", len(by_post))
print("status spread:", Counter(str(s) for s in results.values()).most_common())
