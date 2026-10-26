import sqlite3

for db_path in ['asm.db', 'BackendASM/asm.db']:
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        
        # Add price_member to events
        try:
            c.execute("ALTER TABLE events ADD COLUMN price_member TEXT DEFAULT 'Free'")
            print(f"Added price_member to events in {db_path}")
        except Exception as e:
            print(f"events price_member in {db_path}: {e}")
            
        # Add price_non_member to events
        try:
            c.execute("ALTER TABLE events ADD COLUMN price_non_member TEXT DEFAULT 'Free'")
            print(f"Added price_non_member to events in {db_path}")
        except Exception as e:
            print(f"events price_non_member in {db_path}: {e}")
            
        # Add is_member to event_applications
        try:
            c.execute("ALTER TABLE event_applications ADD COLUMN is_member INTEGER DEFAULT 0")
            print(f"Added is_member to event_applications in {db_path}")
        except Exception as e:
            print(f"event_applications is_member in {db_path}: {e}")
            
        # Add price_applied to event_applications
        try:
            c.execute("ALTER TABLE event_applications ADD COLUMN price_applied TEXT DEFAULT 'Free'")
            print(f"Added price_applied to event_applications in {db_path}")
        except Exception as e:
            print(f"event_applications price_applied in {db_path}: {e}")

        # Update sample events with realistic member vs non-member prices
        # 1. Islamic Event: Members: Free, Non-Members: Free
        c.execute("UPDATE events SET price_member = 'Free', price_non_member = 'Free' WHERE category LIKE '%Islamic%'")
        # 2. Ramadiamo (Grand Iftar): Members: Free, Non-Members: €5
        c.execute("UPDATE events SET price_member = 'Free', price_non_member = '€5' WHERE category LIKE '%Ramadiamo%' OR title LIKE '%Iftar%'")
        # 3. Physical Activities (Hike/Laser tag): Members: €10, Non-Members: €18
        c.execute("UPDATE events SET price_member = '€10', price_non_member = '€18' WHERE category LIKE '%Physical%' OR title LIKE '%Alpine%'")
        # 4. Cultural Workshop: Members: Free, Non-Members: €3
        c.execute("UPDATE events SET price_member = 'Free', price_non_member = '€3' WHERE category LIKE '%Cultural%' OR title LIKE '%Calligraphy%'")

        conn.commit()
        conn.close()
        print(f"Successfully migrated {db_path}")
    except Exception as err:
        print(f"Error on {db_path}: {err}")
