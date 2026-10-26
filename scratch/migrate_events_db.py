import sqlite3
import os

sample_events = [
    {
        "title": "Islamic Event: Spiritual Gathering & Halaqa",
        "category": "Islamic Event",
        "date": "Friday, Nov 14, 2026",
        "time": "6:00 PM - 8:30 PM",
        "location": "Aula Rogers, Campus Leonardo",
        "cost": "Free",
        "desc": "Inspiring talk on balancing academic excellence and faith, followed by interactive team activities, Q&A, and complimentary giveaway gadgets for all attendees!",
        "reg_link": "#register-form",
        "registration_open": 1,
        "max_capacity": 80
    },
    {
        "title": "Ramadiamo: Grand Community Iftar",
        "category": "Ramadiamo",
        "date": "Saturday, Mar 20, 2027",
        "time": "6:30 PM - 9:30 PM",
        "location": "Campus Bovisa - Student Hall",
        "cost": "Free",
        "desc": "Join fellow students, faculty, and friends for a warm, festive communal Iftar meal to break the fast together during Ramadan. Dates, soup, main dishes, and tea provided.",
        "reg_link": "#register-form",
        "registration_open": 1,
        "max_capacity": 150
    },
    {
        "title": "Physical Activities: Alpine Lake Hike & Laser Tag",
        "category": "Physical Activity",
        "date": "Sunday, May 9, 2027",
        "time": "8:30 AM - 6:00 PM",
        "location": "Meeting Point: Milano Centrale / Lake Como",
        "cost": "€10 (Transport & Gear)",
        "desc": "Exciting outdoor day trip featuring a scenic mountain hike with panoramic lake views, outdoor group Dhuhr/Asr prayer, group lunch, and an afternoon laser tag adventure!",
        "reg_link": "#register-form",
        "registration_open": 1,
        "max_capacity": 40
    },
    {
        "title": "Cultural Workshop: Arabic Calligraphy & Henna Art",
        "category": "Cultural Event",
        "date": "Wednesday, Dec 2, 2026",
        "time": "5:30 PM - 7:30 PM",
        "location": "Student Association Room, Campus Leonardo",
        "cost": "Free",
        "desc": "Hands-on creative masterclass where you will learn traditional Arabic calligraphy stroke techniques with authentic bamboo pens, and explore natural organic henna design patterns.",
        "reg_link": "#register-form",
        "registration_open": 1,
        "max_capacity": 35
    }
]

for db_path in ['asm.db', 'BackendASM/asm.db']:
    if not os.path.exists(db_path):
        continue
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    
    # 1. Add new columns to events if not present
    c.execute("PRAGMA table_info(events)")
    existing_cols = [r[1] for r in c.fetchall()]
    
    col_defs = [
        ("category", "TEXT DEFAULT 'Islamic Event'"),
        ("cost", "TEXT DEFAULT 'Free'"),
        ("location", "TEXT DEFAULT 'Campus Leonardo'"),
        ("time", "TEXT DEFAULT ''"),
        ("registration_open", "INTEGER DEFAULT 1"),
        ("max_capacity", "INTEGER DEFAULT 0")
    ]
    for col_name, col_sql in col_defs:
        if col_name not in existing_cols:
            c.execute(f"ALTER TABLE events ADD COLUMN {col_name} {col_sql}")
            
    # 2. Create event_applications table
    c.execute('''
        CREATE TABLE IF NOT EXISTS event_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER,
            event_title TEXT NOT NULL,
            full_name TEXT NOT NULL,
            matricola TEXT,
            is_guest INTEGER DEFAULT 0,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            dietary TEXT DEFAULT '',
            emergency_contact TEXT DEFAULT '',
            notes TEXT DEFAULT '',
            payment_method TEXT DEFAULT 'Free',
            status TEXT DEFAULT 'confirmed',
            lang_selected TEXT DEFAULT 'en',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 3. Populate sample events if table is empty
    c.execute("SELECT count(*) FROM events")
    count = c.fetchone()[0]
    if count == 0:
        for ev in sample_events:
            c.execute('''
                INSERT INTO events (title, category, date, time, location, cost, desc, reg_link, registration_open, max_capacity)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (ev['title'], ev['category'], ev['date'], ev['time'], ev['location'], ev['cost'], ev['desc'], ev['reg_link'], ev['registration_open'], ev['max_capacity']))
            
    conn.commit()
    conn.close()
    print(f"Migrated and seeded {db_path} successfully")
