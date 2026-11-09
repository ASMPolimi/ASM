# ASM Politecnico di Milano Website
**Official Website for the Associazione Studenti Musulmani (ASM) - Politecnico di Milano**

Live Online URL: [https://asmpolimi.onrender.com](https://asmpolimi.onrender.com)  
GitHub Pages: Enable GitHub Pages in repository settings pointing to `/ (root)` of branch `main`.

---

## 🌟 Features
- **Community & Mission**: Overview of ASM Polimi, community photo, board members.
- **Daily Prayer Timings & Ayah**: Automatic Milan prayer schedule (Aladhan API) with daily Ayah (AlQuran API).
- **Jumu'ah Timings & Locations**: Friday prayer information for Bovisa and Leonardo with interactive maps.
- **Halal Product Scanner**: Live camera barcode scanner, manual barcode lookup via Open Food Facts, ingredients analyzer with Haram/Mashbuh classification, and custom barcodes database.
- **Events & Registration**: Upcoming events calendar with linked Google Form registration.
- **Ask an Imam**: Private question submission portal.
- **Gallery**: Event photos and activities.
- **Admin & Superadmin Dashboard**: Dynamic management for announcements, events, gallery, Jumu'ah timings, and board details.

---

## 🚀 How to Run Locally

### Option 1: One-Click Quick Start
- **Windows**: Double-click `run.bat`
- **Linux / macOS**: Run `chmod +x run.sh && ./run.sh`

### Option 2: Manual Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ASMPolimi/ASM.git
   cd ASM
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python server.py
   ```
5. Open your browser at [http://localhost:8080](http://localhost:8080).

---

## 🌐 GitHub Pages (Static Hosting)
This repository is pre-rendered and static-ready:
- All main pages (`index.html`, `events.html`, `halal.html`, `jumuah.html`, `gallery.html`, `register.html`, etc.) are located in the root directory.
- Dynamic data is pre-compiled into `data/content.json` and `data/custom_barcodes.json`, allowing the site to work on static web hosts (GitHub Pages) without needing a Python backend.
- To re-generate or refresh the static files after updating templates or database entries, run:
  ```bash
  python build_static.py
  ```

---

## 📂 Project Structure
```text
├── index.html              # Main homepage (static pre-rendered for GitHub Pages)
├── events.html             # Events & registration page
├── halal.html              # Halal scanner page
├── jumuah.html             # Jumu'ah prayer info page
├── gallery.html            # Event gallery page
├── register.html           # Membership registration page
├── support.html            # Ask an Imam page
├── admin.html              # Admin dashboard
├── admin_*.html            # Specific admin panels
├── server.py               # Flask backend server & API
├── build_static.py         # Static export & Jinja pre-rendering script
├── requirements.txt        # Python dependencies
├── run.bat / run.sh        # 1-click startup scripts
├── asm.db                  # SQLite database
├── data/ & api/            # Static JSON fallbacks for content & barcodes
├── templates/              # Jinja2 source templates
├── css/ & js/              # Stylesheets and frontend scripts
└── assets/                 # Images, logos, and avatars
```