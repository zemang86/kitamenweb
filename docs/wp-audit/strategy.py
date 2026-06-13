#!/usr/bin/env python3
import json, re, os, html
from collections import Counter
D = os.path.dirname(os.path.abspath(__file__))
posts = json.load(open(f"{D}/posts.json"))
cats  = {c["id"]: html.unescape(c["name"]) for c in json.load(open(f"{D}/categories.json"))}
TAG = re.compile(r"<[^>]+>")
def wc(h): return len(re.sub(r"\s+"," ",TAG.sub(" ",h or "")).split())

rows = []
for p in posts:
    rows.append({"id": p["id"], "title": html.unescape(TAG.sub("",p["title"]["rendered"])).strip(),
                 "link": p["link"], "date": p["date"][:10], "words": wc(p["content"]["rendered"]),
                 "cats": [cats.get(c,str(c)) for c in p.get("categories",[])]})

uncat = [r for r in rows if not r["cats"] or "Uncategorized" in r["cats"]]
thin  = sorted([r for r in rows if r["words"] < 300], key=lambda r: r["words"])
catc  = Counter(c for r in rows for c in (r["cats"] or ["(none)"]))
multi = [r for r in rows if len(r["cats"]) > 2]

out = ["# KITAMEN.my — Content Inventory & Strategy\n"]
out.append(f"**{len(posts)} published posts.** Full row-level data in `inventory.csv`.\n")
out.append("## Category distribution\n_(posts can have multiple categories, so totals exceed 273)_\n")
out.append("| Category | Posts |\n|---|---:|")
for c, n in catc.most_common():
    out.append(f"| {c} | {n} |")
out.append("")
wcs = sorted(r["words"] for r in rows)
out.append("## Length profile\n")
out.append(f"- Median: **{wcs[len(wcs)//2]} words** · shortest: {wcs[0]} · longest: {wcs[-1]}")
out.append(f"- **{len(thin)} thin posts (<300 words)** — weak for SEO ranking\n")
out.append("### Thinnest 25 posts (priority to expand or merge)\n")
for r in thin[:25]:
    out.append(f"- **{r['words']}w** · {r['title'][:65]} — {r['link']}")
out.append("")
out.append(f"## Uncategorized / cleanup\n")
out.append(f"- **{len(uncat)} posts are Uncategorized** — assign proper categories for topical SEO clustering\n")
for r in uncat[:30]:
    out.append(f"- {r['title'][:65]} — {r['link']}")
out.append("")
open(f"{D}/content-strategy.md","w").write("\n".join(out))
print(f"uncategorized={len(uncat)} thin={len(thin)} multi_cat={len(multi)}")
print("thinnest 5:", [(r['words'], r['title'][:40]) for r in thin[:5]])
