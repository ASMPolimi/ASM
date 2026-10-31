import os
import json
import sqlite3
import openpyxl
from jinja2 import Environment, FileSystemLoader

# 1. Export database & excel to data/ and api/
conn = sqlite3.connect('asm.db')
conn.row_factory = sqlite3.Row
c = conn.cursor()

content = {
    'announcement': '',
    'jumuah_prayer': '',
    'mission_text': '',
    'join_us_link': '',
    'global_event_reg_link': '',
    'show_board_section': True,
    'events': [],
    'board_members': [],
    'gallery': []
}

c.execute('SELECT key, value FROM settings')
for row in c.fetchall():
    if row['key'] == 'jumuah_info':
        content['jumuah_info'] = json.loads(row['value'])
    elif row['key'] == 'show_board_section':
        content['show_board_section'] = str(row['value']).strip().lower() in ('1', 'true', 'yes', 'enabled', 'on')
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

try:
    conn_sc = sqlite3.connect('asm.db')
    conn_sc.row_factory = sqlite3.Row
    c_sc = conn_sc.cursor()
    c_sc.execute("SELECT barcode, product_name, brand, ingredients_text, status FROM scanned_products WHERE admin_status IN ('verified', 'reviewed')")
    for row in c_sc.fetchall():
        b = str(row['barcode']).strip()
        barcodes[b] = {
            'product_name': row['product_name'] or 'Verified Product',
            'brands': row['brand'] or '',
            'ingredients_text': row['ingredients_text'] or 'Admin Verified Entry',
            'status': (row['status'] or 'halal').lower().strip(),
            'reasons': []
        }
    conn_sc.close()
except Exception as e:
    pass

with open('data/custom_barcodes.json', 'w', encoding='utf-8') as f:
    json.dump({'success': True, 'data': barcodes}, f, indent=2, ensure_ascii=False)
with open('api/custom_barcodes.json', 'w', encoding='utf-8') as f:
    json.dump({'success': True, 'data': barcodes}, f, indent=2, ensure_ascii=False)

# 2. Pre-render all Jinja2 templates to root directory for GitHub Pages / static hosting
env = Environment(loader=FileSystemLoader('templates'))
template_names = [
    'index.html',
    'events.html',
    'gallery.html',
    'halal.html',
    'jumuah.html',
    'register.html',
    'event-register.html',
    'support.html',
    'admin.html',
    'admin_members.html',
    'admin_jumuah.html',
    'admin_questions.html',
    'admin_scanner.html',
    'admin_users.html',
    'privacy.html',
    'terms.html',
    'cookies.html'
]

for tpl_name in template_names:
    tpl = env.get_template(tpl_name)
    rendered = tpl.render(**content)
    with open(tpl_name, 'w', encoding='utf-8', newline='\n') as f:
        f.write(rendered)
    print(f"Rendered static {tpl_name}")

print("Static build complete!")
