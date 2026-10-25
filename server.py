from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import json
import os
import sqlite3
import urllib.request
import urllib.error
import datetime
import openpyxl

app = Flask(__name__, template_folder='templates')
CORS(app)

DB_FILE = 'asm.db'
ALLOWED_FILES = ['index.html', 'register.html', 'admin.html', 'admin_members.html', 'admin_jumuah.html', 'admin_users.html', 'jumuah.html', 'support.html', 'gallery.html', 'events.html', 'admin_questions.html', 'halal.html', 'admin_scanner.html']
ALLOWED_DIRS = ['assets', 'css', 'js']

# Cache for prayer times
prayer_times_cache = {
    'date': None,
    'data': None
}

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            year TEXT,
            consent_given INTEGER DEFAULT 1,
            consent_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    try:
        c.execute("ALTER TABLE subscribers ADD COLUMN consent_given INTEGER DEFAULT 1")
    except Exception:
        pass
    try:
        c.execute("ALTER TABLE subscribers ADD COLUMN consent_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    except Exception:
        pass
    c.execute('''
        CREATE TABLE IF NOT EXISTS membership_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            matricola TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            course_level TEXT,
            course TEXT,
            skills TEXT,
            teams TEXT,
            languages TEXT,
            volunteer_translator TEXT,
            payment_method TEXT,
            comments TEXT,
            lang_selected TEXT,
            paid INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    try:
        c.execute("ALTER TABLE membership_applications ADD COLUMN paid INTEGER DEFAULT 0")
    except Exception:
        pass
    try:
        c.execute("ALTER TABLE membership_applications ADD COLUMN keychain_requested INTEGER DEFAULT 0")
    except Exception:
        pass
    try:
        c.execute("ALTER TABLE membership_applications ADD COLUMN keychain_name TEXT DEFAULT ''")
    except Exception:
        pass

    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin'
        )
    ''')

    # Ensure default superadmin user 'ASM' with password 'ASMKT'
    c.execute("SELECT id FROM users WHERE username = 'ASM'")
    if not c.fetchone():
        c.execute("INSERT INTO users (username, password, role) VALUES ('ASM', 'ASMKT', 'superadmin')")
    else:
        c.execute("UPDATE users SET password = 'ASMKT', role = 'superadmin' WHERE username = 'ASM'")

    # Also ensure legacy 'admin' user password is updated to 'ASMKT'
    c.execute("SELECT id FROM users WHERE username = 'admin'")
    if not c.fetchone():
        c.execute("INSERT INTO users (username, password, role) VALUES ('admin', 'ASMKT', 'superadmin')")
    else:
        c.execute("UPDATE users SET password = 'ASMKT', role = 'superadmin' WHERE username = 'admin'")

    # Scanned products anonymous log and admin verification table
    c.execute('''
        CREATE TABLE IF NOT EXISTS scanned_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            barcode TEXT NOT NULL UNIQUE,
            product_name TEXT,
            brand TEXT,
            ingredients_text TEXT,
            status TEXT DEFAULT 'not_listed',
            admin_status TEXT DEFAULT 'pending',
            admin_notes TEXT DEFAULT '',
            image_url TEXT,
            source TEXT DEFAULT 'scanner',
            scan_count INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    try:
        c.execute("CREATE INDEX IF NOT EXISTS idx_scanned_barcode ON scanned_products (barcode)")
    except Exception:
        pass

    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def serve_file(path):
    if path in ALLOWED_FILES:
        return render_template(path)
    if f"{path}.html" in ALLOWED_FILES:
        return render_template(f"{path}.html")
    for d in ALLOWED_DIRS:
        if path.startswith(d + '/'):
            return send_from_directory('.', path)
    return "Not Found", 404

@app.route('/api/content', methods=['GET'])
def get_content():
    conn = get_db()
    c = conn.cursor()
    
    content = {
        "announcement": "",
        "jumuah_prayer": "",
        "mission_text": "",
        "join_us_link": "",
        "global_event_reg_link": "",
        "events": [],
        "board_members": [],
        "gallery": []
    }
    
    try:
        # Load settings
        c.execute("SELECT key, value FROM settings")
        for row in c.fetchall():
            if row['key'] == 'jumuah_info':
                content['jumuah_info'] = json.loads(row['value'])
            else:
                content[row['key']] = row['value']
                
        # Load events
        c.execute("SELECT * FROM events ORDER BY id ASC")
        content['events'] = [dict(row) for row in c.fetchall()]
        
        # Load board members
        c.execute("SELECT * FROM board_members")
        content['board_members'] = [dict(row) for row in c.fetchall()]
        
        # Load gallery
        c.execute("SELECT * FROM gallery")
        content['gallery'] = [dict(row) for row in c.fetchall()]
        
    except Exception as e:
        print("Database error:", e)
    finally:
        conn.close()
        
    return jsonify(content)

def get_user_role(token):
    if not token:
        return None
    token = str(token).strip()
    if token.startswith('Bearer '):
        token = token[7:].strip()
    if token.startswith('token-'):
        username = token.split('token-')[1]
    else:
        username = token
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT role FROM users WHERE username = ?", (username,))
    row = c.fetchone()
    conn.close()
    if row:
        return row['role']
    return None

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
        
    username = data.get('username')
    password = data.get('password')
    
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT role FROM users WHERE username = ? AND password = ?", (username, password))
    row = c.fetchone()
    conn.close()
    
    if row:
        return jsonify({"success": True, "token": f"token-{username}", "role": row['role']})
            
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/api/users', methods=['GET', 'POST', 'DELETE'])
def manage_users():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if role != 'superadmin':
        return jsonify({"success": False, "message": "Forbidden. Superadmin access required."}), 403

    conn = get_db()
    c = conn.cursor()

    if request.method == 'GET':
        c.execute("SELECT username, role FROM users")
        users = [dict(row) for row in c.fetchall()]
        conn.close()
        return jsonify({"success": True, "users": users})

    if request.method == 'POST':
        data = request.json
        new_user = data.get('username')
        new_pass = data.get('password')
        new_role = data.get('role', 'admin')
        if not new_user or not new_pass:
            conn.close()
            return jsonify({"success": False, "message": "Username and password required"}), 400
        
        try:
            c.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (new_user, new_pass, new_role))
            conn.commit()
            success = True
            msg = ""
        except sqlite3.IntegrityError:
            success = False
            msg = "User already exists"
        
        conn.close()
        return jsonify({"success": success, "message": msg} if not success else {"success": True})

    if request.method == 'DELETE':
        data = request.json
        del_user = data.get('username')
        
        if not del_user:
            conn.close()
            return jsonify({"success": False, "message": "Username required"}), 400
        if del_user in ('admin', 'ASM'):
            conn.close()
            return jsonify({"success": False, "message": "Cannot delete default admin account"}), 400
            
        c.execute("DELETE FROM users WHERE username = ?", (del_user,))
        deleted = c.rowcount > 0
        conn.commit()
        conn.close()
        
        if not deleted:
            return jsonify({"success": False, "message": "User not found"}), 404
            
        return jsonify({"success": True})

@app.route('/api/update', methods=['POST'])
def update_content():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
    
    data = request.json
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
        
    conn = get_db()
    c = conn.cursor()
    
    try:
        if 'events' in data:
            c.execute("DELETE FROM events")
            for ev in data['events']:
                c.execute("INSERT INTO events (title, date, desc, reg_link) VALUES (?, ?, ?, ?)",
                          (ev.get('title', ''), ev.get('date', ''), ev.get('desc', ''), ev.get('reg_link', '')))
        
        # update setting fields
        settings_keys = ['announcement', 'jumuah_prayer', 'mission_text', 'join_us_link', 'global_event_reg_link']
        for k in settings_keys:
            if k in data:
                c.execute("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (k, data[k]))
                
        if 'jumuah_info' in data:
            c.execute("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", ('jumuah_info', json.dumps(data['jumuah_info'])))
            
        if 'gallery' in data:
            for item in data['gallery']:
                c.execute("UPDATE gallery SET title = ?, image = ? WHERE role = ?", 
                          (item.get('title', ''), item.get('image', ''), item.get('role', '')))
                          
        if 'board_members' in data:
            for member in data['board_members']:
                c.execute("UPDATE board_members SET name = ?, avatar = ? WHERE role = ?",
                          (member.get('name', ''), member.get('avatar', ''), member.get('role', '')))
            
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"success": False, "message": str(e)}), 500
        
    conn.close()
    return jsonify({"success": True})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    if 'file' not in request.files:
        return jsonify({"success": False, "message": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"success": False, "message": "No selected file"}), 400
        
    filename = request.form.get('filename')
    if not filename:
        from werkzeug.utils import secure_filename
        filename = secure_filename(file.filename)
        
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ['.png', '.jpg', '.jpeg', '.webp']:
        return jsonify({"success": False, "message": "Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed."}), 400
        
    filename = os.path.basename(filename)
    dest_path = os.path.join('assets', filename)
    
    try:
        os.makedirs('assets', exist_ok=True)
        file.save(dest_path)
        return jsonify({"success": True, "path": f"assets/{filename}"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/questions', methods=['POST'])
def add_question():
    data = request.json
    if not data or not data.get('question') or not data.get('topic'):
        return jsonify({"success": False, "message": "Topic and question details are required"}), 400
    
    if not data.get('email') and not data.get('phone'):
        return jsonify({"success": False, "message": "Either email or phone number is required"}), 400
    
    q_id = str(int(datetime.datetime.now().timestamp() * 1000))
    topic = data.get('topic')
    question = data.get('question')
    email = data.get('email', '')
    phone = data.get('phone', '')
    created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    conn = get_db()
    c = conn.cursor()
    try:
        c.execute("INSERT INTO questions (id, topic, question, email, phone, answered, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (q_id, topic, question, email, phone, False, created_at))
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"success": False, "message": str(e)}), 500
        
    conn.close()
    return jsonify({"success": True})

@app.route('/api/questions', methods=['GET'])
def get_questions():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
    
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM questions ORDER BY created_at DESC")
    questions = [dict(row) for row in c.fetchall()]
    # SQLite boolean returns 0/1, convert to True/False for json
    for q in questions:
        q['answered'] = bool(q['answered'])
    conn.close()
    
    return jsonify({"success": True, "questions": questions})

@app.route('/api/questions/toggle', methods=['POST'])
def toggle_question_status():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    data = request.json
    q_id = data.get('id') if data else None
    if not q_id:
        return jsonify({"success": False, "message": "Question ID required"}), 400
        
    conn = get_db()
    c = conn.cursor()
    c.execute("UPDATE questions SET answered = 1 - answered WHERE id = ?", (q_id,))
    updated = c.rowcount > 0
    conn.commit()
    
    if updated:
        c.execute("SELECT * FROM questions ORDER BY created_at DESC")
        questions = [dict(row) for row in c.fetchall()]
        for q in questions:
            q['answered'] = bool(q['answered'])
        conn.close()
        return jsonify({"success": True, "questions": questions})
        
    conn.close()
@app.route('/api/questions/answer', methods=['POST'])
def answer_question():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    data = request.json
    q_id = data.get('id') if data else None
    answer = data.get('answer', '') if data else ''
    if not q_id:
        return jsonify({"success": False, "message": "Question ID required"}), 400
        
    conn = get_db()
    c = conn.cursor()
    c.execute("UPDATE questions SET answer = ? WHERE id = ?", (answer, q_id))
    updated = c.rowcount > 0
    conn.commit()
    
    if updated:
        c.execute("SELECT * FROM questions ORDER BY created_at DESC")
        questions = [dict(row) for row in c.fetchall()]
        for q in questions:
            q['answered'] = bool(q['answered'])
        conn.close()
        return jsonify({"success": True, "questions": questions})
        
    conn.close()
    return jsonify({"success": False, "message": "Question not found"}), 404

@app.route('/api/questions', methods=['DELETE'])
def delete_question():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if role != 'superadmin':
        return jsonify({"success": False, "message": "Forbidden. Only superadmin access level can delete questions."}), 403
        
    data = request.json
    q_id = data.get('id') if data else None
    if not q_id:
        return jsonify({"success": False, "message": "Question ID required"}), 400
        
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM questions WHERE id = ?", (q_id,))
    deleted = c.rowcount > 0
    conn.commit()
    
    if deleted:
        c.execute("SELECT * FROM questions ORDER BY created_at DESC")
        questions = [dict(row) for row in c.fetchall()]
        for q in questions:
            q['answered'] = bool(q['answered'])
        conn.close()
        return jsonify({"success": True, "questions": questions})
        
    conn.close()
    return jsonify({"success": False, "message": "Question not found"}), 404

@app.route('/api/prayer_times')
def prayer_times():
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    if prayer_times_cache['date'] == today and prayer_times_cache['data']:
        return jsonify({"success": True, "data": prayer_times_cache['data']})
        
    try:
        url = "https://api.aladhan.com/v1/timingsByCity?city=Milan&country=Italy&method=2"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and data.get('code') == 200:
                prayer_times_cache['date'] = today
                prayer_times_cache['data'] = data['data']['timings']
                return jsonify({"success": True, "data": prayer_times_cache['data']})
    except Exception as e:
        print("Error fetching prayer times:", e)
        
    return jsonify({"success": False, "message": "Could not fetch prayer times"}), 500

@app.route('/api/custom_barcodes', methods=['GET'])
def get_custom_barcodes():
    barcodes = {}
    try:
        if os.path.exists('HalalScanner.xlsx'):
            wb = openpyxl.load_workbook('HalalScanner.xlsx', data_only=True)
            sheet = wb.active
            for row in sheet.iter_rows(min_row=2, values_only=True):
                if row[0]:
                    barcode = str(row[0]).strip()
                    if '.' in barcode and barcode.endswith('0'): # Handling float representation of long ints like 1.234567890123E+12
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
        # Also include any admin verified/reviewed products from the scanned_products database
        try:
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT barcode, product_name, brand, ingredients_text, status FROM scanned_products WHERE admin_status IN ('verified', 'reviewed')")
            for row in c.fetchall():
                b = str(row['barcode']).strip()
                barcodes[b] = {
                    'product_name': row['product_name'] or 'Verified Product',
                    'brands': row['brand'] or '',
                    'ingredients_text': row['ingredients_text'] or 'Admin Verified Entry',
                    'status': (row['status'] or 'halal').lower().strip(),
                    'reasons': []
                }
            conn.close()
        except Exception as db_err:
            print("Notice: could not load verified products from db:", db_err)

        return jsonify({"success": True, "data": barcodes})
    except Exception as e:
        print("Error reading HalalScanner.xlsx / custom barcodes:", e)
        return jsonify({"success": False, "message": str(e)})

@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({"success": False, "message": "Name and email are required"}), 400
        
    # Verify explicit consent
    if data.get('consent') is False:
        return jsonify({"success": False, "message": "Consent is required to subscribe under GDPR regulations"}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    year = data.get('year', '')
    
    conn = get_db()
    c = conn.cursor()
    try:
        # Check if already exists
        c.execute("SELECT id FROM subscribers WHERE email = ?", (email,))
        if c.fetchone():
            conn.close()
            return jsonify({"success": True, "message": "Already subscribed!"})
            
        try:
            c.execute("INSERT INTO subscribers (name, email, year, consent_given, consent_timestamp) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)", (name, email, year))
        except Exception:
            c.execute("INSERT INTO subscribers (name, email, year) VALUES (?, ?, ?)", (name, email, year))
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"success": False, "message": str(e)}), 500
        
    conn.close()
    return jsonify({"success": True})

@app.route('/api/subscribers', methods=['GET'])
def get_subscribers():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM subscribers ORDER BY created_at DESC")
    subscribers = [dict(row) for row in c.fetchall()]
    conn.close()
    return jsonify({"success": True, "subscribers": subscribers})

@app.route('/api/subscribers', methods=['DELETE'])
def delete_subscriber():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    data = request.json
    sub_id = data.get('id') if data else None
    if not sub_id:
        return jsonify({"success": False, "message": "Subscriber ID required"}), 400
        
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM subscribers WHERE id = ?", (sub_id,))
    deleted = c.rowcount > 0
    conn.commit()
    conn.close()
    
    if not deleted:
        return jsonify({"success": False, "message": "Subscriber not found"}), 404
        
    return jsonify({"success": True})

def generate_excel_response(headers, data_rows, filename, sheet_title="Sheet1"):
    import io
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from flask import Response
    
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = sheet_title
    
    # ASM Brand Primary header fill and bold font
    header_fill = PatternFill(start_color="124A61", end_color="124A61", fill_type="solid")
    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    header_alignment = Alignment(horizontal="center", vertical="center")
    
    ws.append(headers)
    for col_num in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_num)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = header_alignment
        
    thin_border = Border(
        left=Side(style='thin', color='E5E7EB'),
        right=Side(style='thin', color='E5E7EB'),
        top=Side(style='thin', color='E5E7EB'),
        bottom=Side(style='thin', color='E5E7EB')
    )
    
    for row_idx, row_data in enumerate(data_rows, start=2):
        ws.append(list(row_data))
        for col_idx in range(1, len(row_data) + 1):
            cell = ws.cell(row=row_idx, column=col_idx)
            cell.border = thin_border
            if row_idx % 2 == 1:
                cell.fill = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
            cell.alignment = Alignment(vertical="center")

    for col in ws.columns:
        max_len = 0
        col_letter = openpyxl.utils.get_column_letter(col[0].column)
        for cell in col:
            val = str(cell.value or '')
            max_len = max(max_len, len(val))
        ws.column_dimensions[col_letter].width = max(12, min(max_len + 4, 60))
        
    bio = io.BytesIO()
    wb.save(bio)
    bio.seek(0)
    
    response = Response(
        bio.getvalue(),
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

@app.route('/api/subscribers/export', methods=['GET'])
def export_subscribers():
    token = request.args.get('token')
    role = get_user_role(f"Bearer {token}" if token else None)
    if not role:
        auth_header = request.headers.get('Authorization')
        role = get_user_role(auth_header)
    if not role:
        return "Unauthorized", 401
        
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT name, email, year, created_at FROM subscribers ORDER BY created_at DESC")
    rows = c.fetchall()
    conn.close()
    
    headers = ['Name', 'Email', 'Graduation Year', 'GDPR Consent Confirmed', 'Subscribed At']
    data_rows = [[r['name'], r['email'], r['year'] or '', 'Yes (Art. 6(1)(a) GDPR)', r['created_at'] or ''] for r in rows]
    return generate_excel_response(headers, data_rows, "subscribers.xlsx", "Subscribers")

# ----------------------------------------------------
# Membership Fee & Keychain Gift Configuration Endpoints
# ----------------------------------------------------

def get_membership_fee_setting():
    conn = get_db()
    c = conn.cursor()
    try:
        c.execute("SELECT value FROM settings WHERE key = 'membership_fee'")
        row = c.fetchone()
        conn.close()
        if not row or not row['value']:
            return 5.0
        val = str(row['value']).strip().lower().replace('€', '').replace('eur', '').strip()
        if val in ('0', 'free', 'gratis', '0.0', '0.00'):
            return 0.0
        return max(0.0, float(val))
    except Exception:
        if conn: conn.close()
        return 5.0

def get_keychain_gift_setting():
    conn = get_db()
    c = conn.cursor()
    try:
        c.execute("SELECT value FROM settings WHERE key = 'keychain_gift_enabled'")
        row = c.fetchone()
        conn.close()
        if not row:
            return True
        val = str(row['value']).strip().lower()
        return val in ('1', 'true', 'yes', 'enabled', 'on')
    except Exception:
        if conn: conn.close()
        return True

@app.route('/api/membership/fee', methods=['GET'])
def get_membership_fee():
    fee = get_membership_fee_setting()
    is_free = (fee == 0.0)
    fee_formatted = "Free" if is_free else (f"€{int(fee)}" if fee.is_integer() else f"€{fee:.2f}")
    return jsonify({
        "success": True,
        "fee": fee,
        "is_free": is_free,
        "fee_formatted": fee_formatted,
        "currency": "EUR",
        "keychain_gift_enabled": get_keychain_gift_setting()
    })

@app.route('/api/membership/fee', methods=['POST'])
def set_membership_fee():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    data = request.json or {}
    raw_val = data.get('fee')
    if raw_val is None:
        return jsonify({"success": False, "message": "Fee value is required"}), 400

    try:
        val_str = str(raw_val).strip().lower().replace('€', '').replace('eur', '').strip()
        if val_str in ('0', 'free', 'gratis', '0.0', '0.00'):
            fee = 0.0
        else:
            fee = max(0.0, float(val_str))
    except (ValueError, TypeError):
        return jsonify({"success": False, "message": "Invalid fee amount. Please enter a valid number (e.g. 0, 5, 10)."}), 400

    fee_str = "0" if fee == 0.0 else (str(int(fee)) if fee.is_integer() else f"{fee:.2f}")
    conn = get_db()
    c = conn.cursor()
    try:
        c.execute(
            "INSERT INTO settings (key, value) VALUES ('membership_fee', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
            (fee_str,)
        )
        conn.commit()
        conn.close()
        is_free = (fee == 0.0)
        fee_formatted = "Free" if is_free else (f"€{int(fee)}" if fee.is_integer() else f"€{fee:.2f}")
        return jsonify({
            "success": True,
            "fee": fee,
            "is_free": is_free,
            "fee_formatted": fee_formatted,
            "message": f"Membership fee successfully updated to {fee_formatted}!"
        })
    except Exception as e:
        if conn: conn.close()
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/membership/keychain-gift', methods=['GET'])
def get_keychain_gift_status():
    return jsonify({
        "success": True,
        "enabled": get_keychain_gift_setting(),
        "image_url": "assets/keychain_gift.jpg"
    })

@app.route('/api/membership/keychain-gift', methods=['POST'])
def set_keychain_gift_status():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    data = request.json or {}
    enabled = bool(data.get('enabled', True))
    val_str = '1' if enabled else '0'
    conn = get_db()
    c = conn.cursor()
    try:
        c.execute(
            "INSERT INTO settings (key, value) VALUES ('keychain_gift_enabled', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
            (val_str,)
        )
        conn.commit()
        conn.close()
        return jsonify({
            "success": True,
            "enabled": enabled,
            "message": f"Personalized keychain gift offer has been {'enabled' if enabled else 'disabled'}!"
        })
    except Exception as e:
        if conn: conn.close()
        return jsonify({"success": False, "message": str(e)}), 500

# ----------------------------------------------------
# Membership Application Endpoints
# ----------------------------------------------------

@app.route('/api/membership', methods=['POST'])
@app.route('/api/memberships', methods=['POST'])
def submit_membership():
    data = request.json or {}
    full_name = data.get('full_name') or data.get('name')
    matricola = data.get('matricola')
    email = data.get('email')
    phone = data.get('phone')
    
    if not full_name or not matricola or not email or not phone:
        return jsonify({"success": False, "message": "Full name, matricola, email, and phone are required"}), 400
        
    course_level = data.get('course_level', '')
    course = data.get('course', '')
    skills = data.get('skills', '')
    if isinstance(skills, list):
        skills = ", ".join(skills)
    teams = data.get('teams', '')
    if isinstance(teams, list):
        teams = ", ".join(teams)
    languages = data.get('languages', '')
    if isinstance(languages, list):
        languages = ", ".join(languages)
    volunteer_translator = data.get('volunteer_translator', '')
    payment_method = data.get('payment_method', '')
    comments = data.get('comments', '')
    lang_selected = data.get('lang_selected', 'en')

    current_fee = get_membership_fee_setting()
    if current_fee == 0.0 and (not payment_method or payment_method in ('N/A', 'None', '')):
        payment_method = 'Free Membership'
    initial_paid = 1 if current_fee == 0.0 else 0

    keychain_gift_enabled = get_keychain_gift_setting()
    raw_keychain_req = data.get('keychain_requested')
    if keychain_gift_enabled and raw_keychain_req in (True, 1, '1', 'true', 'yes', 'on'):
        keychain_requested = 1
        keychain_name = str(data.get('keychain_name') or full_name).strip()[:40]
    else:
        keychain_requested = 0
        keychain_name = ''
    
    conn = get_db()
    c = conn.cursor()
    try:
        c.execute('''
            INSERT INTO membership_applications 
            (full_name, matricola, email, phone, course_level, course, skills, teams, languages, volunteer_translator, payment_method, comments, lang_selected, paid, keychain_requested, keychain_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (full_name, str(matricola).strip(), email.strip(), phone.strip(), course_level, course, skills, teams, languages, volunteer_translator, payment_method, comments, lang_selected, initial_paid, keychain_requested, keychain_name))
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"success": False, "message": str(e)}), 500
        
    conn.close()
    return jsonify({"success": True, "message": "Application submitted successfully"})

@app.route('/api/memberships', methods=['GET'])
def get_memberships():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM membership_applications ORDER BY created_at DESC")
    rows = c.fetchall()
    conn.close()
    applications = []
    for row in rows:
        a = dict(row)
        a['paid'] = bool(a.get('paid', 0))
        a['keychain_requested'] = bool(a.get('keychain_requested', 0))
        a['keychain_name'] = a.get('keychain_name') or ''
        applications.append(a)
    return jsonify({"success": True, "applications": applications})

@app.route('/api/memberships/toggle-paid', methods=['POST'])
def toggle_membership_paid():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    data = request.json or {}
    app_id = data.get('id')
    if not app_id:
        return jsonify({"success": False, "message": "Application ID required"}), 400

    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT paid FROM membership_applications WHERE id = ?", (app_id,))
    row = c.fetchone()
    if not row:
        conn.close()
        return jsonify({"success": False, "message": "Application not found"}), 404

    current_val = bool(row['paid'])
    new_val = 0 if current_val else 1
    if 'paid' in data:
        new_val = 1 if data['paid'] else 0

    c.execute("UPDATE membership_applications SET paid = ? WHERE id = ?", (new_val, app_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "paid": bool(new_val)})

@app.route('/api/memberships/toggle-keychain', methods=['POST'])
def toggle_membership_keychain():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    data = request.json or {}
    app_id = data.get('id')
    if not app_id:
        return jsonify({"success": False, "message": "Application ID required"}), 400

    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT keychain_requested FROM membership_applications WHERE id = ?", (app_id,))
    row = c.fetchone()
    if not row:
        conn.close()
        return jsonify({"success": False, "message": "Application not found"}), 404

    current_val = bool(row['keychain_requested'])
    new_val = 0 if current_val else 1
    if 'keychain_requested' in data:
        new_val = 1 if data['keychain_requested'] else 0

    c.execute("UPDATE membership_applications SET keychain_requested = ? WHERE id = ?", (new_val, app_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "keychain_requested": bool(new_val)})

@app.route('/api/memberships', methods=['DELETE'])
def delete_membership():
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    data = request.json or {}
    app_id = data.get('id')
    if not app_id:
        return jsonify({"success": False, "message": "Application ID required"}), 400
        
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM membership_applications WHERE id = ?", (app_id,))
    deleted = c.rowcount > 0
    conn.commit()
    conn.close()
    
    if not deleted:
        return jsonify({"success": False, "message": "Application not found"}), 404
        
    return jsonify({"success": True})

@app.route('/api/memberships/export', methods=['GET'])
def export_memberships():
    token = request.args.get('token')
    role = get_user_role(f"Bearer {token}" if token else None)
    if not role:
        auth_header = request.headers.get('Authorization')
        role = get_user_role(auth_header)
    if not role:
        return "Unauthorized", 401
        
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT id, created_at, paid, payment_method, full_name, matricola, email, phone, course_level, course, teams, skills, languages, volunteer_translator, keychain_requested, keychain_name, lang_selected, comments FROM membership_applications ORDER BY created_at DESC")
    rows = c.fetchall()
    conn.close()

    current_fee = get_membership_fee_setting()
    fee_str = "Free" if current_fee == 0.0 else (f"€{int(current_fee)}" if current_fee.is_integer() else f"€{current_fee:.2f}")
    paid_status = f"PAID ({fee_str})" if current_fee > 0 else "FREE / WAIVED"
    unpaid_status = "PENDING" if current_fee > 0 else "FREE"
    
    headers = [
        'ID', 'Submission Date', 'Fee Paid', 'Payment Method', 'Full Name', 'Matricola', 'Email',
        'Phone', 'Course Level', 'Course', 'Keychain Gift', 'Keychain Name', 'Teams', 'Skills', 'Languages Spoken',
        'Volunteer Translator', 'Language Form', 'Comments'
    ]
    data_rows = [
        [
            r['id'],
            r['created_at'] or '',
            paid_status if r['paid'] else unpaid_status,
            r['payment_method'] or '',
            r['full_name'] or '',
            str(r['matricola'] or ''),
            r['email'] or '',
            r['phone'] or '',
            r['course_level'] or '',
            r['course'] or '',
            'YES' if r['keychain_requested'] else 'NO',
            r['keychain_name'] or '',
            r['teams'] or '',
            r['skills'] or '',
            r['languages'] or '',
            r['volunteer_translator'] or '',
            r['lang_selected'] or '',
            r['comments'] or ''
        ]
        for r in rows
    ]
    return generate_excel_response(headers, data_rows, "membership_applications.xlsx", "Membership Applications")

# ==========================================
# SCANNED PRODUCTS (ANONYMOUS & ADMIN)
# ==========================================

@app.route('/api/scanned_products', methods=['GET', 'POST'])
def handle_scanned_products():
    if request.method == 'POST':
        # Public & anonymous submission endpoint
        data = request.json or {}
        barcode = str(data.get('barcode', '')).strip()
        if not barcode:
            return jsonify({"success": False, "message": "Barcode is required"}), 400

        product_name = str(data.get('product_name', '')).strip()[:200]
        brand = str(data.get('brand', '')).strip()[:150]
        ingredients_text = str(data.get('ingredients_text', '')).strip()[:3000]
        status = str(data.get('status', 'not_listed')).strip().lower()
        if status not in ['not_listed', 'halal', 'mashbuh', 'haram']:
            status = 'not_listed'
        image_url = str(data.get('image_url', '')).strip()[:500]
        source = str(data.get('source', 'scanner')).strip()[:50]

        conn = get_db()
        c = conn.cursor()
        try:
            # Check if this barcode was already scanned
            c.execute("SELECT id, scan_count, product_name, brand, ingredients_text, image_url, status, admin_status FROM scanned_products WHERE barcode = ?", (barcode,))
            existing = c.fetchone()
            if existing:
                new_count = (existing['scan_count'] or 1) + 1
                # If existing has placeholder or blank fields, enrich with newly scanned data
                bad_names = ('Product Not Listed', 'Prodotto Non in Lista', 'Unknown Product', '')
                up_name = existing['product_name'] if (existing['product_name'] and existing['product_name'] not in bad_names) else (product_name or existing['product_name'])
                bad_brands = ('Unknown Brand', 'Unknown / Not Registered', 'Barcode non censito', 'Unknown', '')
                up_brand = existing['brand'] if (existing['brand'] and existing['brand'] not in bad_brands) else (brand or existing['brand'])
                up_ing = existing['ingredients_text'] if existing['ingredients_text'] else (ingredients_text or '')
                up_img = existing['image_url'] if existing['image_url'] else (image_url or '')
                
                # If admin has not reviewed and current status is not_listed, update status if incoming status is known
                up_status = existing['status']
                if existing['admin_status'] == 'pending' and existing['status'] == 'not_listed' and status != 'not_listed':
                    up_status = status

                c.execute('''
                    UPDATE scanned_products
                    SET scan_count = ?,
                        product_name = ?,
                        brand = ?,
                        ingredients_text = ?,
                        image_url = ?,
                        status = ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                ''', (new_count, up_name, up_brand, up_ing, up_img, up_status, existing['id']))
            else:
                c.execute('''
                    INSERT INTO scanned_products (barcode, product_name, brand, ingredients_text, status, image_url, source, scan_count)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
                ''', (barcode, product_name, brand, ingredients_text, status, image_url, source))
            conn.commit()
            conn.close()
            return jsonify({"success": True, "message": "Scanned product logged successfully"})
        except Exception as e:
            conn.close()
            print("Error logging scanned product:", e)
            return jsonify({"success": False, "message": str(e)}), 500

    # GET method - Admin view
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    conn = get_db()
    c = conn.cursor()
    try:
        filter_status = request.args.get('status', '').strip().lower()
        filter_review = request.args.get('review_status', '').strip().lower()
        search_query = request.args.get('q', '').strip().lower()

        query = "SELECT * FROM scanned_products WHERE 1=1"
        params = []

        if filter_status and filter_status != 'all':
            query += " AND LOWER(status) = ?"
            params.append(filter_status)

        if filter_review and filter_review != 'all':
            query += " AND LOWER(admin_status) = ?"
            params.append(filter_review)

        if search_query:
            query += " AND (LOWER(barcode) LIKE ? OR LOWER(product_name) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(ingredients_text) LIKE ?)"
            like_term = f"%{search_query}%"
            params.extend([like_term, like_term, like_term, like_term])

        sort_by = request.args.get('sort', 'newest').strip().lower()
        if sort_by == 'scans':
            query += " ORDER BY scan_count DESC, updated_at DESC"
        elif sort_by == 'oldest':
            query += " ORDER BY updated_at ASC"
        else:
            query += " ORDER BY updated_at DESC"

        c.execute(query, params)
        rows = [dict(row) for row in c.fetchall()]

        # Metrics stats for dashboard cards
        c.execute("SELECT COUNT(*) as cnt FROM scanned_products")
        total_scans = c.fetchone()['cnt']
        c.execute("SELECT COUNT(*) as cnt FROM scanned_products WHERE status = 'not_listed' OR admin_status = 'pending'")
        needs_review = c.fetchone()['cnt']
        c.execute("SELECT COUNT(*) as cnt FROM scanned_products WHERE status = 'halal'")
        halal_count = c.fetchone()['cnt']
        c.execute("SELECT COUNT(*) as cnt FROM scanned_products WHERE status = 'mashbuh'")
        mashbuh_count = c.fetchone()['cnt']
        c.execute("SELECT COUNT(*) as cnt FROM scanned_products WHERE status = 'haram'")
        haram_count = c.fetchone()['cnt']

        conn.close()
        return jsonify({
            "success": True,
            "products": rows,
            "stats": {
                "total": total_scans,
                "needs_review": needs_review,
                "halal": halal_count,
                "mashbuh": mashbuh_count,
                "haram": haram_count
            }
        })
    except Exception as e:
        conn.close()
        print("Error fetching scanned products:", e)
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/scanned_products/<int:prod_id>', methods=['PUT', 'DELETE'])
def manage_scanned_product(prod_id):
    auth_header = request.headers.get('Authorization')
    role = get_user_role(auth_header)
    if not role:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    conn = get_db()
    c = conn.cursor()

    if request.method == 'DELETE':
        c.execute("DELETE FROM scanned_products WHERE id = ?", (prod_id,))
        deleted = c.rowcount > 0
        conn.commit()
        conn.close()
        if not deleted:
            return jsonify({"success": False, "message": "Product not found"}), 404
        return jsonify({"success": True, "message": "Product deleted successfully"})

    if request.method == 'PUT':
        data = request.json or {}
        status = data.get('status')
        admin_status = data.get('admin_status', 'reviewed')
        admin_notes = data.get('admin_notes', '')
        product_name = data.get('product_name')
        brand = data.get('brand')
        ingredients_text = data.get('ingredients_text')

        c.execute("SELECT * FROM scanned_products WHERE id = ?", (prod_id,))
        row = c.fetchone()
        if not row:
            conn.close()
            return jsonify({"success": False, "message": "Product not found"}), 404

        new_status = status if status is not None else row['status']
        new_admin_status = admin_status if admin_status is not None else row['admin_status']
        new_admin_notes = admin_notes if admin_notes is not None else row['admin_notes']
        new_name = product_name if product_name is not None else row['product_name']
        new_brand = brand if brand is not None else row['brand']
        new_ing = ingredients_text if ingredients_text is not None else row['ingredients_text']

        c.execute('''
            UPDATE scanned_products
            SET status = ?,
                admin_status = ?,
                admin_notes = ?,
                product_name = ?,
                brand = ?,
                ingredients_text = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (new_status, new_admin_status, new_admin_notes, new_name, new_brand, new_ing, prod_id))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Product updated successfully"})

@app.route('/api/scanned_products/export', methods=['GET'])
def export_scanned_products():
    token = request.args.get('token')
    role = get_user_role(f"Bearer {token}" if token else None)
    if not role:
        auth_header = request.headers.get('Authorization')
        role = get_user_role(auth_header)
    if not role:
        return "Unauthorized", 401

    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT id, barcode, product_name, brand, status, admin_status, admin_notes, scan_count, created_at, updated_at, ingredients_text FROM scanned_products ORDER BY updated_at DESC")
    rows = c.fetchall()
    conn.close()

    headers = [
        'ID', 'Barcode', 'Product Name', 'Brand', 'Halal Status', 'Admin Review Status',
        'Scan Count', 'First Scanned', 'Last Scanned', 'Admin Notes', 'Ingredients'
    ]
    data_rows = [
        [
            r['id'],
            str(r['barcode'] or ''),
            r['product_name'] or '',
            r['brand'] or '',
            str(r['status'] or '').upper(),
            str(r['admin_status'] or '').capitalize(),
            r['scan_count'] or 1,
            r['created_at'] or '',
            r['updated_at'] or '',
            r['admin_notes'] or '',
            r['ingredients_text'] or ''
        ]
        for r in rows
    ]
    return generate_excel_response(headers, data_rows, "scanned_products.xlsx", "Scanned Products Log")

if __name__ == '__main__':
    print("Starting server on http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=True)
