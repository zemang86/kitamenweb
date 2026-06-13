#!/usr/bin/env python3
"""SEO meta audit + content inventory from pulled JSON."""
import json, re, os, csv, html
from collections import Counter, defaultdict

D = os.path.dirname(os.path.abspath(__file__))
posts = json.load(open(f"{D}/posts.json"))
pages = json.load(open(f"{D}/pages.json"))
cats  = {c["id"]: c["name"] for c in json.load(open(f"{D}/categories.json"))}

TAG_RE = re.compile(r"<[^>]+>")
def text_of(htmlstr):
    t = TAG_RE.sub(" ", htmlstr or "")
    t = html.unescape(t)
    return re.sub(r"\s+", " ", t).strip()
def wc(htmlstr):
    return len(text_of(htmlstr).split())

def yoast(item, key):
    y = item.get("yoast_head_json") or {}
    return y.get(key)

# ---------- SEO META AUDIT ----------
def audit(items, kind):
    rows = []
    for it in items:
        title = text_of(it["title"]["rendered"])
        seo_title = yoast(it, "title") or ""
        desc = yoast(it, "description") or ""
        robots = (yoast(it, "robots") or {})
        noindex = isinstance(robots, dict) and robots.get("index") == "noindex"
        rows.append({
            "id": it["id"], "kind": kind, "title": title, "link": it["link"],
            "seo_title": seo_title, "seo_title_len": len(seo_title),
            "desc": desc, "desc_len": len(desc), "noindex": noindex,
            "words": wc(it["content"]["rendered"]),
            "cats": [cats.get(c, str(c)) for c in it.get("categories", [])],
            "date": it["date"][:10],
        })
    return rows

rows = audit(posts, "post") + audit(pages, "page")

missing_desc   = [r for r in rows if not r["desc"]]
long_desc      = [r for r in rows if r["desc"] and r["desc_len"] > 160]
short_desc     = [r for r in rows if r["desc"] and 0 < r["desc_len"] < 70]
missing_title  = [r for r in rows if not r["seo_title"]]
long_title     = [r for r in rows if r["seo_title_len"] > 60]
noindexed      = [r for r in rows if r["noindex"]]
thin           = [r for r in rows if r["kind"] == "post" and r["words"] < 300]

# duplicates
def dups(field):
    seen = defaultdict(list)
    for r in rows:
        v = (r[field] or "").strip().lower()
        if v:
            seen[v].append(r)
    return {k: v for k, v in seen.items() if len(v) > 1}
dup_desc  = dups("desc")
dup_title = dups("seo_title")

# ---------- REPORT ----------
out = []
out.append("# KITAMEN.my — SEO Meta Audit\n")
out.append(f"_Source: www.kitamen.my via Cloudflare worker · {len(posts)} posts + {len(pages)} pages = {len(rows)} items_\n")
out.append("## Summary\n")
out.append(f"| Issue | Count | % of items |")
out.append(f"|---|---:|---:|")
n = len(rows)
def pct(x): return f"{100*x/n:.0f}%"
out.append(f"| **Missing meta description** | {len(missing_desc)} | {pct(len(missing_desc))} |")
out.append(f"| Meta description too long (>160) | {len(long_desc)} | {pct(len(long_desc))} |")
out.append(f"| Meta description too short (<70) | {len(short_desc)} | {pct(len(short_desc))} |")
out.append(f"| Missing SEO title | {len(missing_title)} | {pct(len(missing_title))} |")
out.append(f"| SEO title too long (>60) | {len(long_title)} | {pct(len(long_title))} |")
out.append(f"| Duplicate meta descriptions | {sum(len(v) for v in dup_desc.values())} ({len(dup_desc)} groups) | |")
out.append(f"| Duplicate SEO titles | {sum(len(v) for v in dup_title.values())} ({len(dup_title)} groups) | |")
out.append(f"| **noindex** (hidden from Google) | {len(noindexed)} | {pct(len(noindexed))} |")
out.append(f"| Thin posts (<300 words) | {len(thin)} | |")
out.append("")

def listing(title, items, fmt):
    out.append(f"## {title} ({len(items)})\n")
    if not items:
        out.append("_None_\n"); return
    for r in items[:60]:
        out.append(fmt(r))
    if len(items) > 60:
        out.append(f"\n_…and {len(items)-60} more (see inventory.csv)_")
    out.append("")

listing("Missing meta description", missing_desc,
        lambda r: f"- [{r['kind']}] {r['title'][:70]} — {r['link']}")
listing("noindex pages (excluded from search)", noindexed,
        lambda r: f"- [{r['kind']}] {r['title'][:70]} — {r['link']}")
listing("SEO title too long (>60 chars)", long_title,
        lambda r: f"- ({r['seo_title_len']}) {r['seo_title'][:80]}")

out.append("## Duplicate meta descriptions\n")
for desc, group in list(dup_desc.items())[:20]:
    out.append(f"- **{len(group)}×** \"{desc[:80]}…\"")
    for r in group:
        out.append(f"    - {r['link']}")
out.append("")

open(f"{D}/seo-report.md", "w").write("\n".join(out))

# ---------- INVENTORY CSV ----------
with open(f"{D}/inventory.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["id","kind","date","title","url","categories","words","seo_title_len","desc_len","missing_desc","noindex","thin(<300)"])
    for r in sorted(rows, key=lambda x: x["date"], reverse=True):
        w.writerow([r["id"], r["kind"], r["date"], r["title"], r["link"],
                    "; ".join(r["cats"]), r["words"], r["seo_title_len"], r["desc_len"],
                    "YES" if not r["desc"] else "", "YES" if r["noindex"] else "",
                    "YES" if (r["kind"]=="post" and r["words"]<300) else ""])

# ---------- CONTENT STRATEGY ----------
cat_counts = Counter()
for r in rows:
    if r["kind"] == "post":
        for c in (r["cats"] or ["(uncategorized)"]):
            cat_counts[c] += 1
# topic heuristic: exam/education vs esports
edu_kw = re.compile(r"\b(soalan|tahun|kssr|matematik|sains|bahasa|karangan|pemahaman|upsr|pt3|spm|nota|latihan)\b", re.I)
edu = [r for r in rows if r["kind"]=="post" and edu_kw.search(r["title"])]
print(f"posts={len(posts)} pages={len(pages)}")
print(f"missing_desc={len(missing_desc)} noindex={len(noindexed)} thin={len(thin)} long_title={len(long_title)}")
print(f"dup_desc_groups={len(dup_desc)} dup_title_groups={len(dup_title)}")
print(f"edu/exam-keyword posts={len(edu)} of {len(posts)}")
print("Top categories:", cat_counts.most_common(13))
wcs = sorted(r["words"] for r in rows if r["kind"]=="post")
print(f"word count: min={wcs[0]} median={wcs[len(wcs)//2]} max={wcs[-1]}")
