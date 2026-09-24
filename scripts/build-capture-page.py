#!/usr/bin/env python3
"""Usage: build-capture-page.py <page-folder> [variant]
Writes <page>/capture.html from <page>/index.html: one variant only, no switcher or
variant CSS/JS, flag chips removed, <sup> converted to Unicode, animations frozen,
Figma capture script added. Prints a checklist so the capture can be trusted."""
import re, sys, pathlib
root = pathlib.Path.home() / 'Desktop/Lorikeet/hers-au-pricing'
page = sys.argv[1]; variant = sys.argv[2] if len(sys.argv) > 2 else None
src = (root / page / 'index.html').read_text()
s = src
if variant:
    head = s[: s.index('<main>') + len('<main>')]
    head = re.sub(r'<body data-variant="[a-z]">', '<body>', head)
    i = s.index(f'<div class="only-{variant}">'); j = s.index('\n\n</main>', i)
    block = s[i:j]
    tail = s[s.index('</main>'):]
    s = head + '\n' + block + '\n\n' + tail
s = re.sub(r'<div class="variant-tag">.*?</div>\n', '', s, flags=re.S)
s = re.sub(r'<div class="switch".*?</div>\n', '', s, flags=re.S)
s = re.sub(r'^body\[data-variant=.*\n', '', s, flags=re.M)
s = re.sub(r'<script>(?!.*capture\.js)[\s\S]*?</script>\n?', '', s)
s = re.sub(r'<p class="center"[^>]*><span class="flag">.*?</span></p>\n', '', s)
sup = {'1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '†': '†', '*': '*'}
s = re.sub(r'<sup[^>]*>(.*?)</sup>', lambda m: sup.get(m.group(1), m.group(1)), s)
s = re.sub(r'animation:\s*[a-z-]+ [^;]+;', 'animation: none;', s)
s = s.replace('</head>', '<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>\n</head>', 1)
out = root / page / 'capture.html'; out.write_text(s)
print('wrote', out)
print('sections:', s.count('<section'), '| flags:', s.count('class="flag"'), '| sup:', s.count('<sup'),
      '| switcher:', s.count('class="switch"'), '| data-variant rules:', s.count('data-variant='),
      '| mix-blend-mode (fix in Figma after):', s.count('mix-blend-mode'))
