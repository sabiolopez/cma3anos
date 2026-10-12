"""Valida e empacota o site estático, sem dependências externas."""
from pathlib import Path
from html.parser import HTMLParser
import shutil
import zipfile
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'primeira-visao'
class Check(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids = set(); self.refs = []; self.assets = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"ID duplicado: {attrs['id']}"
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            value = attrs.get(key, '')
            if value.startswith('#'): self.refs.append(value[1:])
            elif value and not value.startswith(('https:', 'http:', 'mailto:', 'data:')): self.assets.append(value)

html = (SOURCE / 'index.html').read_text()
check = Check(); check.feed(html)
for ref in check.refs: assert ref in check.ids, f'Âncora ausente: {ref}'
for asset in check.assets: assert (SOURCE / asset).is_file(), f'Arquivo ausente: {asset}'
assert (SOURCE / 'assets/rubik.ttf').is_file()
js = html.split('<script>', 1)[1].split('</script>', 1)[0]
with tempfile.NamedTemporaryFile(suffix='.js', mode='w') as script:
    script.write(js); script.flush()
    subprocess.run(['node', '--check', script.name], check=True)
DIST = ROOT / 'dist'
DIST.mkdir(exist_ok=True)
shutil.copy2(SOURCE / 'index.html', DIST / 'index.html')
(DIST / 'assets').mkdir(exist_ok=True)
for asset in (SOURCE / 'assets').iterdir():
    if asset.suffix.lower() in {'.png', '.svg', '.ttf'}:
        shutil.copy2(asset, DIST / 'assets' / asset.name)
with zipfile.ZipFile(ROOT / 'site-publicacao.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(DIST.rglob('*')):
        if file.is_file(): archive.write(file, file.relative_to(DIST))
print(f'Validado: {len(check.ids)} IDs, {len(check.refs)} âncoras, recursos locais e sintaxe JavaScript.')
print('Gerados: dist/ e site-publicacao.zip')
