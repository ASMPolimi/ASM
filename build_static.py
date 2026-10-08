import os
import json
import sqlite3
import openpyxl
from jinja2 import Environment, FileSystemLoader

# 1. Update templates to have fallback to static data
def patch_file(path, old_str, new_str):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print(f"Patched {path}")
    else:
        print(f"Old string not found in {path}")

# Patch gallery.html
gallery_old = """    fetch('/api/content')
        .then(response => response.json())
        .then(data => {"""

gallery_new = """    async function loadGalleryContent() {
        let data = null;
        for (const url of ['/api/content', 'data/content.json', 'api/content.json']) {
            try {
                const res = await fetch(url);
                if (res.ok) { data = await res.json(); break; }
            } catch (e) {}
        }
        if (!data) return;"""

patch_file('templates/gallery.html', gallery_old, gallery_new)
patch_file('templates/gallery.html', 
           ".catch(err => console.error('Error fetching gallery content:', err));", 
           "} loadGalleryContent().catch(err => console.error('Error fetching gallery content:', err));")

# Patch jumuah.html
jumuah_old = """    // Fetch dynamic content
    fetch('/api/content')
        .then(response => response.json())
        .then(data => {"""

jumuah_new = """    // Fetch dynamic content
    async function loadJumuahContent() {
        let data = null;
        for (const url of ['/api/content', 'data/content.json', 'api/content.json']) {
            try {
                const res = await fetch(url);
                if (res.ok) { data = await res.json(); break; }
            } catch (e) {}
        }
        if (!data) return;"""

patch_file('templates/jumuah.html', jumuah_old, jumuah_new)
patch_file('templates/jumuah.html',
           ".catch(err => console.error('Error fetching dynamic content:', err));",
           "} loadJumuahContent().catch(err => console.error('Error fetching dynamic content:', err));")

# Patch register.html
register_old = """        fetch('/api/content')
            .then(response => response.json())
            .then(data => {
                if (data.join_us_link && data.join_us_link.trim() !== '') {
                    setRegisterForm(data.join_us_link);
                }
            })
            .catch(err => console.error('Error fetching dynamic Join Us link:', err));"""

register_new = """        async function loadRegisterContent() {
            let data = null;
            for (const url of ['/api/content', 'data/content.json', 'api/content.json']) {
                try {
                    const res = await fetch(url);
                    if (res.ok) { data = await res.json(); break; }
                } catch (e) {}
            }
            if (data && data.join_us_link && data.join_us_link.trim() !== '') {
                setRegisterForm(data.join_us_link);
            }
        }
        loadRegisterContent().catch(err => console.error('Error fetching dynamic Join Us link:', err));"""

patch_file('templates/register.html', register_old, register_new)

# Patch halal.html custom barcode fetch
halal_old = """    async function loadCustomBarcodes() {
        try {
            const response = await fetch('/api/custom_barcodes');
            const result = await response.json();
            if (result.success && result.data) {
                CUSTOM_BARCODES = result.data;
                console.log("Loaded custom barcodes from Excel.");
            }
        } catch (e) {
            console.error("Failed to load custom barcodes:", e);
        }
    }"""

halal_new = """    async function loadCustomBarcodes() {
        let result = null;
        for (const url of ['/api/custom_barcodes', 'data/custom_barcodes.json', 'api/custom_barcodes.json']) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    result = await response.json();
                    if (result && result.success && result.data) break;
                }
            } catch (e) {}
        }
        if (result && result.success && result.data) {
            CUSTOM_BARCODES = result.data;
            console.log("Loaded custom barcodes successfully.");
        }
    }"""

patch_file('templates/halal.html', halal_old, halal_new)

# Patch support.html friendly error
support_old = """        } catch (err) {
            errorEl.textContent = 'Error connecting to the server. Please try again.';
            errorEl.classList.remove('hidden');"""

support_new = """        } catch (err) {
            errorEl.textContent = 'Unable to connect to the backend server. If you are viewing on GitHub Pages, interactive question submission is disabled; please contact us at asm.polimi@gmail.com.';
            errorEl.classList.remove('hidden');"""

patch_file('templates/support.html', support_old, support_new)

# 2. Export database & excel to data/ and api/
conn = sqlite3.connect('asm.db')
conn.row_factory = sqlite3.Row
c = conn.cursor()

content = {
    'announcement': '',
    'jumuah_prayer': '',
    'mission_text': '',
    'join_us_link': '',
    'global_event_reg_link': '',
    'events': [],
    'board_members': [],
    'gallery': []
}

c.execute('SELECT key, value FROM settings')
for row in c.fetchall():
    if row['key'] == 'jumuah_info':
        content['jumuah_info'] = json.loads(row['value'])
    else:
        content[row['key']] = row['value']

c.execute('SELECT * FROM events ORDER BY id ASC')
content['events'] = [dict(row) for row in c.fetchall()]

c.execute('SELECT * FROM board_members')
content['board_members'] = [dict(row) for row in c.fetchall()]

c.execute('SELECT * FROM gallery')
content['gallery'] = [dict(row) for row in c.fetchall()]
conn.close()

os.makedirs('data', exist_ok=True)
os.makedirs('api', exist_ok=True)
with open('data/content.json', 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2, ensure_ascii=False)
with open('api/content.json', 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2, ensure_ascii=False)

barcodes = {}
if os.path.exists('HalalScanner.xlsx'):
    wb = openpyxl.load_workbook('HalalScanner.xlsx', data_only=True)
    sheet = wb.active
    for row in sheet.iter_rows(min_row=2, values_only=True):
        if row[0]:
            barcode = str(row[0]).strip()
            if '.' in barcode and barcode.endswith('0'):
                try:
                    barcode = str(int(float(barcode)))
                except:
                    pass
            barcodes[barcode] = {
                'product_name': str(row[1]).strip() if row[1] else 'Unknown Product',
                'brands': str(row[2]).strip() if row[2] else 'Unknown Brand',
                'ingredients_text': str(row[3]).strip() if row[3] else 'Manual Entry',
                'status': str(row[4]).lower().strip() if row[4] else 'mashbuh',
                'reasons': []
            }

with open('data/custom_barcodes.json', 'w', encoding='utf-8') as f:
    json.dump({'success': True, 'data': barcodes}, f, indent=2, ensure_ascii=False)
with open('api/custom_barcodes.json', 'w', encoding='utf-8') as f:
    json.dump({'success': True, 'data': barcodes}, f, indent=2, ensure_ascii=False)

# 3. Pre-render all Jinja2 templates to root directory for GitHub Pages / static hosting
env = Environment(loader=FileSystemLoader('templates'))
template_names = [
    'index.html',
    'events.html',
    'gallery.html',
    'halal.html',
    'jumuah.html',
    'register.html',
    'support.html',
    'admin.html',
    'admin_jumuah.html',
    'admin_questions.html',
    'admin_users.html'
]

for tpl_name in template_names:
    tpl = env.get_template(tpl_name)
    rendered = tpl.render()
    with open(tpl_name, 'w', encoding='utf-8', newline='\n') as f:
        f.write(rendered)
    print(f"Rendered static {tpl_name}")

print("Pre-rendering complete!")
