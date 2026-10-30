#!/usr/bin/env python3
"""Bundle src/ into one self-contained HTML file.

Outputs:
  index.html            standalone page (open locally, host on GitHub Pages, any static host)
  dist/artifact.html    same app without the document skeleton, for hosts that add their own
"""
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
CONTENT = ["l1.js", "l2.js", "l3.js", "l4.js", "l5.js", "extras.js"]

def read(p): return (SRC / p).read_text(encoding="utf-8")

head = read("head.html") + "<style>\n" + read("styles.css") + "</style>\n"
scripts = "window.LMS = { levels: [], addLevel(l) { this.levels.push(l); } };\n"
scripts += "\n".join(read("content/" + f) for f in CONTENT) + "\n" + read("app.js")
body = read("body.html") + "<script>\n" + scripts + "</script>\n"

standalone = (
    '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + head + "</head>\n<body>\n" + body + "</body>\n</html>\n"
)
(ROOT / "index.html").write_text(standalone, encoding="utf-8")
(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist" / "artifact.html").write_text(head + body, encoding="utf-8")
print(f"index.html {len(standalone)//1024} KB")
