# build.py v1.6 2026-10-08：圖片名稱支援大寫；可內嵌 align-guide.js
"""把 index.html + anim-data.js + lesson-data.js + img/*.webp 打包成單一 html（到哪裡開都看得到）
用法：python build.py   → 產出 雞蛋武士教學.html
"""
import base64, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(HERE, 'index.html'), encoding='utf-8').read()

def inline(m):
    src = m.group(1)
    code = open(os.path.join(HERE, src), encoding='utf-8').read()
    return '<script>\n' + code.replace('</script>', '<\\/script>') + '\n</script>'

html = re.sub(r'<script src="([^"]+\.js)"></script>', inline, html)

used = set(re.findall(r"""['"]([A-Za-z][A-Za-z0-9_]*)['"]""", html))
imgs = {}
for f in sorted(os.listdir(os.path.join(HERE, 'img'))):
    if f.endswith('.webp') and f[:-5] in used:
        b = base64.b64encode(open(os.path.join(HERE, 'img', f), 'rb').read()).decode()
        imgs[f[:-5]] = 'data:image/webp;base64,' + b
js = 'window.IMGDATA={' + ','.join(f'"{k}":"{v}"' for k, v in imgs.items()) + '};'
html = html.replace('<script>\n/* 雞蛋武士', '<script>' + js + '</script>\n<script>\n/* 雞蛋武士', 1)

out = os.path.join(HERE, '雞蛋武士教學.html')
open(out, 'w', encoding='utf-8').write(html)
left = re.findall(r'src="(?!data:|https?:)[^"]+"', html)
print('ok', len(imgs), 'images,', os.path.getsize(out) // 1024, 'KB; leftover relative src:', left)
