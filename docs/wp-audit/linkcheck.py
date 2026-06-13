#!/usr/bin/env python3
"""Broken-link check: external via HTTP, internal validated against known URL set."""
import json, re, os, urllib.request, urllib.error, urllib.parse
from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict

D = os.path.dirname(os.path.abspath(__file__))
posts = json.load(open(f"{D}/posts.json"))
pages = json.load(open(f"{D}/pages.json"))
items = posts + pages

HREF = re.compile(r'href=["\']([^"\']+)["\']', re.I)
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

# known live internal paths
def norm(path):
    return urllib.parse.urlparse(path).path.rstrip("/").lower()
known = set()
for it in items:
    known.add(norm(it["link"]))

# collect links: url -> list of source post links
link_sources = defaultdict(set)
for it in items:
    for href in HREF.findall(it["content"]["rendered"]):
        href = href.strip()
        if href.startswith(("mailto:", "tel:", "#", "javascript:")):
            continue
        link_sources[href].add(it["link"])

internal, external = {}, {}
for url, srcs in link_sources.items():
    host = urllib.parse.urlparse(url).netloc.lower()
    if host in ("", "www.kitamen.my", "kitamen.my"):
        internal[url] = srcs
    elif url.startswith(("http://", "https://")):
        external[url] = srcs

# ---- internal: validate against known set (skip archive/system paths) ----
ARCHIVE = re.compile(r"^/(category|tag|author|page|wp-content|wp-admin|feed|comments|\?)", re.I)
internal_bad = []
for url, srcs in internal.items():
    p = norm(url)
    if p in known or p == "" or ARCHIVE.search(p + "/"):
        continue
    internal_bad.append((url, sorted(srcs)))

# ---- external: HTTP check ----
def check(url):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=15) as r:
                return url, r.status
        except urllib.error.HTTPError as e:
            if e.code in (403, 405, 429) and method == "HEAD":
                continue  # retry with GET
            return url, e.code
        except Exception as e:
            if method == "HEAD":
                continue
            return url, f"ERR:{type(e).__name__}"
    return url, "ERR"

results = {}
with ThreadPoolExecutor(max_workers=16) as ex:
    for url, status in ex.map(check, external.keys()):
        results[url] = status

bad_status = {u: s for u, s in results.items()
              if isinstance(s, str) or (isinstance(s, int) and s >= 400)}

# ---- report ----
out = ["# KITAMEN.my — Broken Link Audit\n"]
out.append(f"Scanned **{len(items)} items** · {len(link_sources)} unique links "
           f"({len(internal)} internal, {len(external)} external)\n")
out.append(f"- **Internal links pointing to unknown/unpublished URLs:** {len(internal_bad)}")
out.append(f"- **External links returning errors (4xx/5xx/unreachable):** {len(bad_status)}\n")

out.append("## Broken / suspect external links\n")
if bad_status:
    for url, status in sorted(bad_status.items(), key=lambda x: str(x[1])):
        out.append(f"- `{status}` {url}")
        for s in sorted(external[url])[:3]:
            out.append(f"    - on: {s}")
else:
    out.append("_None_")
out.append("")

out.append("## Internal links to unknown URLs (possible broken/renamed/unpublished)\n")
out.append("_Note: archive paths (/category, /tag, /author, /page) excluded. Some may be valid custom pages — verify._\n")
if internal_bad:
    for url, srcs in internal_bad[:80]:
        out.append(f"- {url}")
        for s in srcs[:2]:
            out.append(f"    - on: {s}")
else:
    out.append("_None_")
out.append("")

open(f"{D}/broken-links.md", "w").write("\n".join(out))

print(f"unique_links={len(link_sources)} internal={len(internal)} external={len(external)}")
print(f"internal_unknown={len(internal_bad)} external_bad={len(bad_status)}")
from collections import Counter
print("external status spread:", Counter(str(s) for s in results.values()).most_common())
print("sample bad external:", list(bad_status.items())[:12])
