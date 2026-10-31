// Clean URLs: automatically strip .html from browser address bar
if (window.location.protocol.startsWith('http') && window.location.pathname.endsWith('.html')) {
    const cleanPath = window.location.pathname.replace(/\.html$/, '');
    const finalPath = (cleanPath === '/index' || cleanPath === 'index') ? '/' : cleanPath;
    window.history.replaceState(null, '', finalPath + window.location.search + window.location.hash);
}

// Global Translation Dictionary
const ASM_I18N = {
    en: {
        nav_home: "Home",
        nav_events: "Events",
        nav_halal: "Halal Scanner",
        nav_support: "Ask an Imam",
        nav_gallery: "Gallery",
        nav_jumuah: "Jumu'ah",
        nav_quran: "Quran Irtaqi",
        nav_join: "Join Us",
        nav_admin: "Admin",
                footer_copyright: "&copy; 2026 Politecnico di Milano, Associazione Studenti Musulmani.<br> All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms & Conditions",
                footer_cookies: "Cookie Policy",
        cookie_banner_title: "Salam! Halal Cookies Only 🍪",
        cookie_banner_desc: "We only serve halal cookies: essential storage to run the site and optional analytics to improve student services. Accept all or decline non-essential anytime in our",
        cookie_banner_link: "Cookie Policy",
        cookie_btn_accept: "Accept All",
        cookie_btn_decline: "Decline Non-Essential",

        qibla_title: "Milan Qibla Compass",
        qibla_city_sub: "Milan, Italy &bull; 45.46° N, 9.19° E &bull; ~3,820 km",
        qibla_sensor_text: "Align phone until the 🕋 Kaaba points to the top.",
        qibla_close_btn: "Close Compass",
        qibla_recalibrate: "Reset / Calibrate",
        qibla_calib_hint: "💡 Hold phone flat or move in a <strong>figure-8</strong> motion if direction drifts.",

        hero_title: "Welcome to your community.",
        hero_subtitle: "Fostering faith, brotherhood, sisterhood, and excellence at Politecnico di Milano.",
        dock_about: "About Us",
        dock_member: "Become a Member",
        dock_events: "Upcoming Events",
        dock_prayer: "Prayer",
        dock_hijri: "Islamic Events",
        dock_halal: "Halal Scanner",
        dock_support: "Ask an Imam",
        dock_quran: "Quran Irtaqi",
        dock_contact: "Get in touch",

        hijri_badge: "Upcoming Events",
        hijri_heading: "Major Islamic Events",
        hijri_subhead: "Major Islamic celebrations and spiritual milestones across the academic year.",
        hijri_today_label: "Current Hijri Date",
        hijri_phase_label: "Current Lunar Phase",
        hijri_scroll_hint: "👈 Swipe horizontally to view all upcoming events 👉",
        hijri_sighting_note: "🌙 Months follow confirmed moon sighting (Hilal). Dates may vary by &plusmn;1 day.",
        hijri_explorer_btn: "Explore the 12 Islamic Hijri Months",
        event_ramadan_badge: "Holy Month of Fasting",
        event_ramadan_title: "Ramadan",
        event_ramadan_desc: "The sacred month of fasting from dawn to sunset, daily Quran recitation, nightly Taraweeh prayers, and community Iftar dinners.",
        event_eid_fitr_badge: "Festival of Breaking the Fast",
        event_eid_fitr_title: "Eid al-Fitr",
        event_eid_fitr_desc: "The joyous celebration marking the end of Ramadan, celebrated with morning Eid congregational prayer, charity, and festive campus gatherings.",
        event_arafah_badge: "Pinnacle of Hajj",
        event_arafah_title: "Day of Arafah",
        event_arafah_desc: "The most sacred day of the Islamic year. Pilgrims gather on Mount Arafat in prayer. Fasting is highly recommended for non-pilgrims.",
        event_eid_adha_badge: "Feast of the Sacrifice",
        event_eid_adha_title: "Eid al-Adha",
        event_eid_adha_desc: "Commemorates Prophet Ibrahim’s (AS) devotion and sacrifice. Celebrated with morning Eid prayer, Qurbani charity, and community feasts.",

        ayah_shuffle_btn: "Shuffle Ayah",
        ayah_copy_btn: "Copy Ayah",
        ayah_loading: "Loading Ayah of the day...",
        ayah_surah_prefix: "Surah",
        ayah_copied_toast: "Ayah & translation copied to clipboard! 📋",
        ayah_copied_btn: "Copied!",

        about_heading: "About Us",
        mission_heading: "Our Mission",
        mission_text: "The Muslim Student Association (ASM) strives to facilitate a welcoming and active community for Muslim students on campus. We aim to support our members in balancing their academic pursuits with their spiritual growth, while fostering an inclusive environment that promotes understanding and dialogue.",
        what_we_do_heading: "What We Do",
        what_we_do_spiritual: "<strong>Spiritual:</strong> Weekly Halaqas, daily prayers, and Jummah services.",
        what_we_do_social: "<strong>Social:</strong> Brotherhood/Sisterhood events, dinners, and game nights.",
        what_we_do_service: "<strong>Service:</strong> Community service projects and charity fundraisers.",
        what_we_do_education: "<strong>Education:</strong> Islam Awareness Week, guest speakers, and workshops.",
        about_community_photo: "Community Photo",

        events_heading: "Featured Events",
        events_subhead: "Stay updated with our latest halaqas, socials, and activities.",
        events_loading: "Loading events...",
        events_empty: "No upcoming events scheduled at the moment.",
        events_cta_all: "👉 See All Events &amp; Register",
        events_cta_gallery: "📸 Explore Photo Gallery",

        prayer_heading: "Daily Prayer Times",
        prayer_date_loading: "Loading date...",
        prayer_fajr: "Fajr",
        prayer_dhuhr: "Dhuhr",
        prayer_asr: "Asr",
        prayer_maghrib: "Maghrib",
        prayer_isha: "Isha",
        prayer_next_prefix: "Next Prayer:",
        prayer_time_now: "Now",
        prayer_time_soon: "Soon",
        prayer_time_in_prefix: "in",
        prayer_jumuah_btn: "Jumu'ah Info & Prayer Map",

        services_badge: "Student Services",
        services_heading: "Student Services & Guidance",
        services_subhead: "Essential services tailored to support your daily student life, faith, and well-being at Politecnico di Milano.",
        service_halal_category: "Food & Groceries",
        service_halal_title: "Halal Product Scanner",
        service_halal_desc: "Unsure about snacks, cafeteria food, or supermarket groceries in Milan? Our scanner checks barcodes against 500,000+ products using your camera, highlighting non-halal additives, pork gelatin, and alcohol in seconds.",
        service_halal_pt1: "📷 Live camera barcode scanner",
        service_halal_pt2: "🏷️ Search Italian & global databases",
        service_halal_pt3: "⚠️ Automatic E-number & additive detection",
        service_halal_btn: "Open Halal Scanner &rarr;",
        service_imam_category: "Religious & Student Support",
        service_imam_title: "Ask an Imam",
        service_imam_desc: "Have questions about daily prayers, fasting during exams, campus relationships, or personal struggles? Submit your inquiry confidentially to receive authentic guidance directly from our affiliated local scholar.",
        service_imam_pt1: "🔒 100% confidential and private",
        service_imam_pt2: "📖 Verified answers rooted in Islamic Fiqh",
        service_imam_pt3: "🎓 Attuned to university student life in Milan",
        service_imam_btn: "Ask an Imam &rarr;",

        board_heading: "Our Board members",
        role_president: "President",
        role_vicepresident: "Vice President",
        role_secretary: "Secretary",
        role_treasurer: "Treasurer",
        role_advisor: "Advisor",

        contact_heading: "Get in Touch",
        contact_info_title: "Contact Information",
        contact_info_sub: "Have questions? Want to collaborate? Reach out to us!",
        contact_email_label: "Email:",
        contact_email_send: "Send Email",
        contact_paypal_label: "PayPal Email:",
        contact_bank_label: "Bank Transfer:",
        contact_name_label: "Name:",
        contact_iban_label: "IBAN:",
        contact_follow_title: "Follow Us",
        contact_follow_sub: "Stay connected with announcements, student halaqas, and events across all platforms:",

        form_join_title: "Join Our Mailing List",
        form_name_label: "Full Name",
        form_name_placeholder: "e.g. Huthayfah Samir",
        form_email_label: "University Email",
        form_email_placeholder: "name.surname@mail.polimi.it",
        form_year_label: "Graduation Year",
        form_year_placeholder: "Select Year...",
        form_year_grad: "Graduate Student",
        gdpr_notice_header: "Privacy &amp; Data Protection Notice",
        gdpr_notice_text: "<strong>ASM Politecnico di Milano</strong> processes your personal data (name, email, year) exclusively to send association newsletters, campus event updates, prayer schedules, and educational initiatives pursuant to <strong>EU Regulation 2016/679 (GDPR)</strong>. Your data is stored securely and never shared with third parties.",
        gdpr_details_btn: "Read Full Privacy Policy (Art. 13 GDPR) &rarr;",
        gdpr_consent_text: "I consent to ASM POLIMI processing my personal data to receive newsletter communications and event updates in accordance with the <a href=\"#privacy-notice-modal\" class=\"open-privacy-modal-btn\" style=\"color: var(--color-primary); text-decoration: underline; font-weight: 600;\">Privacy Notice</a>. <span class=\"required-star\">*</span>",
        form_subscribe_btn: "Subscribe",
        form_trust_badge: "Zero spam. Unsubscribe at any time with one click or email.",

        gdpr_modal_title: "Privacy Notice &amp; GDPR Information",
        gdpr_art1_title: "1. Data Controller",
        gdpr_art1_body: "The Data Controller is <strong>Associazione Studenti Musulmani - Politecnico di Milano (ASM POLIMI)</strong>, with registered activities at Politecnico di Milano (Piazza Leonardo da Vinci 32, 20133 Milano, Italy). For any inquiries regarding your personal data, you can reach the Data Protection contact at: <a href=\"mailto:info@asmpolimi.it\" style=\"color: var(--color-primary); font-weight: 600; text-decoration: underline;\">info@asmpolimi.it</a> or <a href=\"mailto:asm.polimi@gmail.com\" style=\"color: var(--color-primary); font-weight: 600; text-decoration: underline;\">asm.polimi@gmail.com</a>.",
        gdpr_art2_title: "2. Categories of Data Collected",
        gdpr_art2_body: "When subscribing to the mailing list, we collect: full name, university email address, and graduation year (optional).",
        gdpr_art3_title: "3. Purpose and Legal Basis of Processing",
        gdpr_art3_body: "Your personal data is collected and processed solely for the purpose of sending informational emails regarding ASM POLIMI initiatives, including Friday prayer (Jumu'ah) locations, academic guides, social events, workshops, Halal services updates, and general student welfare announcements. The legal basis for processing is your explicit, freely given consent in accordance with <strong>Article 6(1)(a) of the EU General Data Protection Regulation (GDPR - Regulation EU 2016/679)</strong>.",
        gdpr_art4_title: "4. Data Storage, Security &amp; Third Parties",
        gdpr_art4_body: "Your data is stored securely on protected servers and encrypted databases. We do not sell, rent, disclose, or transfer your personal data to commercial third parties or non-EU organizations. Only authorized board members of ASM POLIMI have administrative access for managing communication dispatches.",
        gdpr_art5_title: "5. Retention Period",
        gdpr_art5_body: "Your personal data will be kept for as long as you maintain your subscription to the mailing list, or until you exercise your right to withdraw consent. Upon receiving an unsubscription request, your data will be permanently removed from our active distribution lists within 7 days.",
        gdpr_art6_title: "6. Your Rights under GDPR",
        gdpr_art6_intro: "Under Articles 15 to 22 of the GDPR, you have the right to:",
        gdpr_right_access: "<strong>Access:</strong> Request confirmation of whether your data is being processed and obtain a copy.",
        gdpr_right_rect: "<strong>Rectification:</strong> Request correction of inaccurate or incomplete personal information.",
        gdpr_right_erase: "<strong>Erasure (\"Right to be Forgotten\"):</strong> Request total deletion of your personal data from our systems.",
        gdpr_right_withdraw: "<strong>Withdrawal of Consent:</strong> Withdraw your consent at any time without affecting prior lawful processing.",
        gdpr_right_complaint: "<strong>Lodge a Complaint:</strong> File a complaint with the competent supervisory authority (in Italy: <em>Garante per la protezione dei dati personali</em> - <a href=\"https://www.garanteprivacy.it\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--color-primary); text-decoration: underline;\">garanteprivacy.it</a>).",
        gdpr_modal_close: "Understood &amp; Close",

        // Events Page
        events_page_heading: "Featured Events",
        events_page_sub: "Stay updated with our latest halaqas, socials, and activities.",
        events_reg_heading: "Register for an Event",
        events_reg_sub: "Reserve your spot by filling out the form below.",
        events_open_tab_btn: "📋 Open Form in New Tab",
        events_empty_msg: "No upcoming events at this time. Check back later!",
        events_date_tbd: "Date TBD",
        events_untitled: "Untitled Event",

        // Halal Scanner Page
        halal_page_heading: "Halal Product Scanner",
        halal_page_sub: "Check products instantly via barcode scanning or manual ingredients analysis.",
        halal_tab_cam: "📷 Live Camera Scan",
        halal_tab_barcode: "🔢 Enter Barcode",
        halal_tab_ingredients: "📝 Ingredients Analyzer",
        halal_cam_instruction: "Align the barcode inside the camera viewpoint to scan automatically.",
        halal_cam_start: "Start Camera Scanner",
        halal_cam_stop: "Stop Camera",
        halal_barcode_label: "Product Barcode (EAN/UPC Number)",
        halal_barcode_ph: "e.g. 20305062",
        halal_barcode_btn: "Look Up Product",
        halal_ing_instruction: "Paste the ingredients list of any product below. Our system will highlight any Haram or doubtful (Mashbuh) substances.",
        halal_ing_label: "Ingredients Text",
        halal_ing_ph: "Paste ingredients list here...",
        halal_ing_btn: "Analyze Ingredients",
        halal_querying: "Querying Database...",
        halal_legal_title: "Legal Disclaimer & Privacy Notice",
        halal_legal_agree: "<strong>Automatic Agreement:</strong> By using the Halal Food Scanner, Live Camera Scan, or Ingredients Analyzer, you automatically agree to these legal terms, our <a href='/terms' style='color: #1e40af; text-decoration: underline; font-weight: 700;'>Terms & Conditions</a>, and our <a href='/privacy' style='color: #1e40af; text-decoration: underline; font-weight: 700;'>Privacy Policy</a>.",
        halal_legal_p1_title: "Informational Support Only:",
        halal_legal_p1_desc: "This tool is a volunteer-run student aid and does not constitute formal religious rulings (fatwas), laboratory testing, or official Halal certification.",
        halal_legal_p2_title: "Packaging Label Takes Precedence:",
        halal_legal_p2_desc: "Manufacturers frequently alter ingredients without changing barcodes. Always verify the printed ingredients list on the physical packaging.",
        halal_legal_p3_title: "Privacy & Camera Stream:",
        halal_legal_p3_desc: "Camera scanning is processed 100% locally in your browser. No photos, video feeds, or personal imagery are recorded, saved, or uploaded to any server.",
        halal_legal_p4_title: "Limitation of Liability:",
        halal_legal_p4_desc: "ASM POLIMI disclaims liability for any dietary, health, or religious discrepancies resulting from external database records (Open Food Facts) or manufacturer recipe updates.",

        halal_ask_imam_cta: "Ask an Imam",
        halal_status_certified: "Certified Halal",
        halal_status_halal: "Halal (No Haram Ingredients Found)",
        halal_status_mashbuh: "Doubtful / Mashbuh",
        halal_status_haram: "Haram / Non-Halal",
        halal_brand_label: "Brand:",
        halal_ing_list_title: "Ingredients List:",

        // Student Support / Ask an Imam Page
        support_heading: "Student Support",
        support_sub: "We are here for you. Whether you need help or have a question.",
        support_card_title: "\"Ask an Imam\"",
        support_card_desc: "Have a question about Fiqh, personal struggles, or campus life? Submit it below, and our affiliated local scholar will answer it privately.",
        support_topic_label: "Topic",
        support_topic_placeholder: "Select Topic...",
        support_topic_prayer: "Prayer & Worship",
        support_topic_halal: "Halal & Haram",
        support_topic_relationships: "Relationships & Marriage",
        support_topic_mental: "Mental Health & Stress",
        support_topic_other: "Other",
        support_q_label: "Your Question",
        support_q_ph: "Describe your question in detail...",
        support_email_label: "Email (Required if Phone number is empty)",
        support_phone_label: "Phone Number (Required if Email is empty)",
        support_submit_btn: "Submit Question",
        support_success_msg: "Your question has been submitted successfully! The Imam will review it.",
        support_error_contact: "Please provide either an email or a phone number so the Imam can get back to you.",

        // Photo Gallery Page
        gallery_heading: "Media Gallery",
        gallery_sub: "Memories from our past events, halaqas, and community gatherings.",
        gallery_loading: "Loading gallery...",
        gallery_recordings_heading: "Halaqa Recordings",
        gallery_recordings_sub: "Would like to see more pictures? Visit our OneDrive archive.",
        gallery_onedrive_btn: "Visit our OneDrive",

        // Jumu'ah Page
        jumuah_heading: "Jumu'ah Prayers",
        jumuah_map_cta_btn: "🗺️ Prayer &amp; Mosque Map &darr;",
        jumuah_ayah_trans: "O you who have believed, when [the adhan] is called for the prayer on the day of Jumu'ah (Friday), then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew. (Quran 62:9)",
        jumuah_details_prefix: "Prayer Details for",
        jumuah_bovisa_title: "Bovisa Campus",
        jumuah_bovisa_loc: "Building 24 level -1, Bovisa Campus",
        jumuah_arrive_early: "Please arrive early to secure a spot.",
        jumuah_unimi_title: "Unimi Building",
        jumuah_unimi_loc: "Room 300 Unimi Building",
        jumuah_sunnah_heading: "Sunnahs of Friday",
        jumuah_sunnah_ghusl: "<strong>Ghusl (غسل):</strong> Performing the ritual bath before heading to the prayer.",
        jumuah_sunnah_clothes: "<strong>Clean Clothes:</strong> Wearing your best and cleanest clothes.",
        jumuah_sunnah_perfume: "<strong>Perfume:</strong> Applying perfume (for men).",
        jumuah_sunnah_siwak: "<strong>Siwak (سواك):</strong> Using the miswak to clean your teeth.",
        jumuah_sunnah_kahf: "<strong>Surah Al-Kahf (سورة الكهف):</strong> Reciting Surah Al-Kahf during the day or the night before.",
        jumuah_sunnah_salawat: "<strong>Prayer on the Prophet (الصلاة على النبي ﷺ):</strong> Sending abundant blessings upon the Prophet Muhammad (PBUH).",
        jumuah_sunnah_dua: "<strong>Dua (الدعاء):</strong> Making earnest supplications, especially during the 'hour of acceptance'.",

        // Map Section on Jumu'ah Page
        map_badge: "Campus & Milan Guide",
        map_heading: "Locations & Mosques Map",
        map_sub: "Interactive guide to all university prayer spaces and prominent mosques in Milan. Click any location card or pin to see room video guides, Jumu'ah availability, or open 1-click GPS navigation in Google Maps.",
        map_filter_all: "📍 All",
        map_filter_campus: "🎓 Campus",
        map_filter_mosque: "🕌 Mosques",
        map_legend_campus: "Campus Room",
        map_legend_mosque: "Milan Mosque",
        map_btn_video: "▶ Video Guide",
        map_badge_jumuah: "Jumu'ah Available",
        map_badge_mosque: "Mosque & Jumu'ah",
        map_badge_daily: "Daily Prayers Only",

        // Event Registration Form
        events_reg_heading: "Event Registration & Application",
        events_reg_sub: "Reserve your spot by filling out your attendee details below.",
        events_selected_label: "Selected Event",
        events_step1_title: "Choose Event",
        events_select_label: "Which event are you attending? *",
        events_step2_title: "Attendee Information",
        events_name_label: "Full Name *",
        events_email_label: "Email Address *",
        events_phone_label: "Phone Number / WhatsApp *",
        events_phone_hint: "Used for WhatsApp group coordination and day-of reminders.",
        events_matricola_label: "Polimi Matricola (Student ID)",
        events_guest_checkbox: "I am not a Polimi student (External Guest / Friend)",
        events_step3_title: "Event Details & Dietary Preferences",
        events_dietary_label: "Dietary Requirements & Allergies (for meals/Iftar)",
        dietary_opt_none: "No special dietary restrictions (Halal standard)",
        dietary_opt_veg: "Vegetarian",
        dietary_opt_vegan: "Vegan",
        dietary_opt_celiac: "Gluten-Free / Celiac",
        dietary_opt_nut: "Nut / Peanut Allergy",
        dietary_opt_other: "Other (please specify in notes below)",
        events_emergency_label: "Emergency Contact (for hikes & outdoor sports)",
        events_notes_label: "Special Notes, Questions, or Carpooling Offers",
        events_free_title: "100% Free Event Registration!",
        events_free_desc: "This event is organized with free entry for all students and community members. Reserve your place below.",
        events_submit_btn: "🎟️ Confirm & Reserve My Spot",
        events_success_title: "Registration Confirmed!",
        events_success_sub: "Alhamdulillah! We have secured your spot for the event.",
        events_summary_event: "Event",
        events_register_another: "Register Another Person",
        events_back_btn: "Back to All Events",

        // Event Registration Wizard (Separate Page)
        event_reg_badge: "Official Event Application",
        event_reg_title: "Event Application & Registration",
        event_reg_subtitle: "Step-by-step registration for upcoming ASM campus halaqas, Iftars, hikes, and workshops.",
        event_step1_label: "Select Event",
        event_step2_label: "Attendee Info",
        event_step3_label: "Membership & Pricing",
        event_step4_label: "Logistics",
        event_step5_label: "Review & Confirm",
        event_step1_heading: "Step 1: Choose Your Event",
        event_step1_desc: "Select which event, hike, or gathering you would like to attend.",
        event_select_prompt: "Select an Event to Register: *",
        event_back_to_list: "← Back to Events",
        event_btn_continue: "Continue to Attendee Info →",
        event_step2_heading: "Step 2: Attendee Information",
        event_step2_desc: "Tell us who is attending this event.",
        event_name_label: "Full Name *",
        event_email_label: "Email Address *",
        event_email_hint: "We will send your event confirmation and pass here.",
        event_phone_label: "Phone Number / WhatsApp *",
        event_phone_hint: "Used for day-of reminders and joining the event WhatsApp group.",
        event_btn_prev: "← Back",
        event_btn_continue_pricing: "Next: Membership & Pricing →",
        event_step3_heading: "Step 3: Membership Status & Price",
        event_step3_desc: "ASM members enjoy discounted or free entry to our campus activities.",
        event_member_question: "Are you an official ASM Member for the 2025/2026 academic year? *",
        event_tier_member_title: "Yes, I am an ASM Member",
        event_tier_member_desc: "You registered for student membership and hold an active membership.",
        event_tier_non_title: "Non-Member / External Guest",
        event_tier_non_desc: "Open to all Politecnico students, friends, and community guests.",
        event_matricola_label: "Polimi Matricola (Student ID) *",
        event_guest_toggle: "I am not a Polimi student (External Guest / Non-Student)",
        event_btn_continue_logistics: "Next: Logistics & Dietary →",
        event_step4_heading: "Step 4: Dietary Needs & Emergency Logistics",
        event_step4_desc: "Help us prepare food portions, safety measures, and logistics.",
        event_dietary_label: "Dietary Requirements & Allergies (for meals/Iftar)",
        event_emergency_label: "Emergency Contact Name & Phone (recommended for hikes & sports)",
        event_notes_label: "Special Notes, Questions, or Carpooling Offers",
        event_btn_continue_review: "Review & Confirm →",
        event_step5_heading: "Step 5: Review & Confirm Registration",
        event_step5_desc: "Please review your booking details before confirming.",
        summary_event: "Event",
        summary_datetime: "Date & Time",
        summary_location: "Location",
        summary_attendee: "Attendee",
        summary_contact: "Contact",
        summary_membership: "Membership Tier",
        summary_price_due: "Total Contribution Due",
        event_free_banner_title: "100% Free Event Registration!",
        event_free_banner_desc: "This event has zero entry fee for you. Click Confirm below to lock in your attendee reservation.",
        event_btn_submit: "🎟️ Confirm & Complete Registration",
        event_success_title: "Registration Confirmed!",
        event_success_sub: "Alhamdulillah! Your spot has been secured. We look forward to seeing you.",
        event_register_another: "Register Another Person",
        event_back_to_events: "Back to All Events",
        events_portal_cta_title: "Ready to Join an Event?",
        events_portal_cta_desc: "Registration is completed through our dedicated step-by-step application portal. Browse all upcoming sessions, check membership tier discounts, and secure your spot online.",
        events_open_portal_btn: "Open Event Application Portal →"
    },
    it: {
        nav_home: "Home",
        nav_events: "Eventi",
        nav_halal: "Scanner Halal",
        nav_support: "Chiedi all'Imam",
        nav_gallery: "Galleria",
        nav_jumuah: "Jumu'ah",
        nav_quran: "Corano Irtaqi",
        nav_join: "Unisciti a noi",
        nav_admin: "Amministrazione",
                footer_copyright: "&copy; 2026 Politecnico di Milano, Associazione Studenti Musulmani.<br> Tutti i diritti riservati.",
        footer_privacy: "Informativa sulla Privacy",
        footer_terms: "Termini e Condizioni",
                footer_cookies: "Informativa sui Cookie",
        cookie_banner_title: "Salam! Solo Biscotti Halal 🍪",
        cookie_banner_desc: "Serviamo solo biscotti halal: memoria tecnica essenziale per il sito e analisi facoltative per migliorare i servizi agli studenti. Accetta o rifiuta quando vuoi nella nostra",
        cookie_banner_link: "Informativa sui Cookie",
        cookie_btn_accept: "Accetta Tutti",
        cookie_btn_decline: "Rifiuta Non Essenziali",

        qibla_title: "Bussola Direzione Qibla (Milano)",
        qibla_city_sub: "Milano, Italia &bull; 45.46° N, 9.19° E &bull; ~3.820 km",
        qibla_sensor_text: "Allinea il telefono finché la Kaaba 🕋 non punta in alto.",
        qibla_close_btn: "Chiudi Bussola",
        qibla_recalibrate: "Reimposta / Calibra",
        qibla_calib_hint: "💡 Tieni il telefono piatto o muovilo a forma di <strong>8</strong> se la direzione devia.",

        hero_title: "Benvenuto nella tua comunità.",
        hero_subtitle: "Promuoviamo la fede, la fratellanza e l'eccellenza al Politecnico di Milano.",
        dock_about: "Chi Siamo",
        dock_member: "Diventa Socio",
        dock_events: "Prossimi Eventi",
        dock_prayer: "Preghiera",
        dock_hijri: "Eventi Islamici",
        dock_halal: "Scanner Halal",
        dock_support: "Chiedi all'Imam",
        dock_quran: "Corano Irtaqi",
        dock_contact: "Contattaci",

        hijri_badge: "Prossimi Eventi",
        hijri_heading: "Principali Eventi Islamici",
        hijri_subhead: "Le principali celebrazioni e festività islamiche dell'anno accademico.",
        hijri_today_label: "Data Hijri di Oggi",
        hijri_phase_label: "Fase Lunare Attuale",
        hijri_scroll_hint: "👈 Scorri orizzontalmente per vedere tutti gli eventi 👉",
        hijri_sighting_note: "🌙 I mesi seguono l'avvistamento della luna crescente (Hilal). Le date possono variare di &plusmn;1 giorno.",
        hijri_explorer_btn: "Esplora i 12 Mesi del Calendario Islamico",
        event_ramadan_badge: "Mese Sacro del Digiuno",
        event_ramadan_title: "Ramadan",
        event_ramadan_desc: "Il mese sacro del digiuno dall'alba al tramonto, lettura del Corano, preghiere notturne di Taraweeh e cene comunitarie di Iftar.",
        event_eid_fitr_badge: "Festa della Fine del Digiuno",
        event_eid_fitr_title: "Eid al-Fitr",
        event_eid_fitr_desc: "La gioiosa festa che celebra il completamento del Ramadan con la preghiera mattutina comunitaria, la carità (Zakat) e momenti conviviali.",
        event_arafah_badge: "Culmine del Pellegrinaggio",
        event_arafah_title: "Giorno di Arafah",
        event_arafah_desc: "Il giorno più sacro dell'anno islamico. I pellegrini si raccolgono sul monte Arafat. Il digiuno è fortemente raccomandato per chi non è in Hajj.",
        event_eid_adha_badge: "Festa del Sacrificio",
        event_eid_adha_title: "Eid al-Adha",
        event_eid_adha_desc: "Celebra la devozione e il sacrificio del Profeta Abramo (Ibrahim AS). Si festeggia con la preghiera dell'Eid, carità e banchetti comunitari.",

        ayah_shuffle_btn: "Altra Ayah",
        ayah_copy_btn: "Copia Ayah",
        ayah_loading: "Caricamento del versetto del giorno...",
        ayah_surah_prefix: "Sura",
        ayah_copied_toast: "Versetto e traduzione copiati negli appunti! 📋",
        ayah_copied_btn: "Copiato!",

        about_heading: "Chi Siamo",
        mission_heading: "La Nostra Missione",
        mission_text: "L'Associazione Studenti Musulmani (ASM) si impegna a promuovere una comunità accogliente e attiva per gli studenti musulmani dell'ateneo. Il nostro obiettivo è supportare i membri nel conciliare il percorso accademico con la crescita spirituale, favorendo un ambiente inclusivo aperto al dialogo e alla comprensione reciproca.",
        what_we_do_heading: "Cosa Facciamo",
        what_we_do_spiritual: "<strong>Spiritualità:</strong> Halaqa settimanali, preghiere quotidiane e preghiera comunitaria del Venerdì (Jumu'ah).",
        what_we_do_social: "<strong>Socialità:</strong> Incontri di fratellanza, cene comunitarie e serate ricreative.",
        what_we_do_service: "<strong>Volontariato:</strong> Progetti di utilità sociale e raccolte fondi di beneficenza.",
        what_we_do_education: "<strong>Cultura:</strong> Settimana di Consapevolezza Islamica, conferenze con ospiti e workshop formativi.",
        about_community_photo: "Foto della Comunità",

        events_heading: "Eventi in Evidenza",
        events_subhead: "Rimani aggiornato su conferenze, incontri e attività della nostra associazione.",
        events_loading: "Caricamento eventi in corso...",
        events_empty: "Nessun evento programmato al momento.",
        events_cta_all: "👉 Vedi Tutti gli Eventi e Iscriviti",
        events_cta_gallery: "📸 Esplora la Galleria Fotografica",

        prayer_heading: "Orari delle Preghiere Quotidiane",
        prayer_date_loading: "Caricamento data...",
        prayer_fajr: "Fajr",
        prayer_dhuhr: "Dhuhr",
        prayer_asr: "Asr",
        prayer_maghrib: "Maghrib",
        prayer_isha: "Isha",
        prayer_next_prefix: "Prossima Preghiera:",
        prayer_time_now: "Adesso",
        prayer_time_soon: "A breve",
        prayer_time_in_prefix: "tra",
        prayer_jumuah_btn: "Info Jumu'ah & Mappa Preghiere",

        services_badge: "Servizi per gli Studenti",
        services_heading: "Servizi per Studenti e Supporto",
        services_subhead: "Servizi essenziali pensati per supportare la tua vita universitaria, la fede e il benessere al Politecnico di Milano.",
        service_halal_category: "Alimentazione e Spesa",
        service_halal_title: "Scanner Prodotti Halal",
        service_halal_desc: "Hai dubbi su snack, cibi della mensa o prodotti del supermercato a Milano? Il nostro scanner verifica i codici a barre su oltre 500.000 prodotti con la fotocamera, evidenziando additivi non halal, gelatina di maiale e alcol in pochi secondi.",
        service_halal_pt1: "📷 Scansione rapida codici a barre da fotocamera",
        service_halal_pt2: "🏷️ Ricerca nei database italiani e globali",
        service_halal_pt3: "⚠️ Rilevamento automatico di additivi e codici E",
        service_halal_btn: "Apri Scanner Halal &rarr;",
        service_imam_category: "Supporto Religioso e Personale",
        service_imam_title: "Chiedi all'Imam",
        service_imam_desc: "Hai domande sulle preghiere quotidiane, il digiuno durante la sessione d'esami, le relazioni o questioni personali? Invia la tua richiesta in totale riservatezza per ricevere una guida autentica da studiosi locali qualificati.",
        service_imam_pt1: "🔒 Riservato e privato al 100%",
        service_imam_pt2: "📖 Risposte verificate basate sul Fiqh islamico",
        service_imam_pt3: "🎓 Adattato alla realtà degli studenti a Milano",
        service_imam_btn: "Chiedi all'Imam &rarr;",

        board_heading: "Il Consiglio Direttivo",
        role_president: "Presidente",
        role_vicepresident: "Vice Presidente",
        role_secretary: "Segretario",
        role_treasurer: "Tesoriere",
        role_advisor: "Consigliere",

        contact_heading: "Mettiti in Contatto",
        contact_info_title: "Informazioni di Contatto",
        contact_info_sub: "Hai domande o vuoi collaborare con noi? Scrivici!",
        contact_email_label: "Email:",
        contact_email_send: "Invia Email",
        contact_paypal_label: "Email PayPal:",
        contact_bank_label: "Bonifico Bancario:",
        contact_name_label: "Intestatario:",
        contact_iban_label: "IBAN:",
        contact_follow_title: "Seguici sui Social",
        contact_follow_sub: "Resta connesso con annunci, incontri e iniziative su tutti i nostri canali:",

        form_join_title: "Iscriviti alla Mailing List",
        form_name_label: "Nome e Cognome",
        form_name_placeholder: "es. Huthayfah Samir",
        form_email_label: "Email Universitaria",
        form_email_placeholder: "nome.cognome@mail.polimi.it",
        form_year_label: "Anno Previsto di Laurea",
        form_year_placeholder: "Seleziona Anno...",
        form_year_grad: "Studente Laureato / Master",
        gdpr_notice_header: "Informativa sulla Privacy e Protezione Dati",
        gdpr_notice_text: "<strong>ASM Politecnico di Milano</strong> tratta i tuoi dati personali (nome, email, anno) esclusivamente per inviare newsletter associative, aggiornamenti sugli eventi, orari di preghiera e iniziative formative ai sensi del <strong>Regolamento UE 2016/679 (GDPR)</strong>. I tuoi dati sono conservati in sicurezza e non ceduti a terzi.",
        gdpr_details_btn: "Leggi l'Informativa Privacy Completa (Art. 13 GDPR) &rarr;",
        gdpr_consent_text: "Acconsento al trattamento dei miei dati personali da parte di ASM POLIMI per ricevere comunicazioni e aggiornamenti sulle iniziative associative secondo l'<a href=\"#privacy-notice-modal\" class=\"open-privacy-modal-btn\" style=\"color: var(--color-primary); text-decoration: underline; font-weight: 600;\">Informativa Privacy</a>. <span class=\"required-star\">*</span>",
        form_subscribe_btn: "Iscriviti",
        form_trust_badge: "Nessuno spam. Cancellati in qualsiasi momento con un clic o via email.",

        gdpr_modal_title: "Informativa Privacy e Diritti GDPR",
        gdpr_art1_title: "1. Titolare del Trattamento",
        gdpr_art1_body: "Il Titolare del Trattamento è l'<strong>Associazione Studenti Musulmani - Politecnico di Milano (ASM POLIMI)</strong>, con sede e attività presso il Politecnico di Milano (Piazza Leonardo da Vinci 32, 20133 Milano, Italia). Per qualsiasi domanda o esercizio dei diritti sui dati personali, puoi contattare il responsabile privacy all'indirizzo: <a href=\"mailto:info@asmpolimi.it\" style=\"color: var(--color-primary); font-weight: 600; text-decoration: underline;\">info@asmpolimi.it</a> oppure <a href=\"mailto:asm.polimi@gmail.com\" style=\"color: var(--color-primary); font-weight: 600; text-decoration: underline;\">asm.polimi@gmail.com</a>.",
        gdpr_art2_title: "2. Categorie di Dati Raccolti",
        gdpr_art2_body: "In occasione dell'iscrizione alla mailing list, raccogliamo: nome e cognome, indirizzo email universitario e anno previsto di laurea (facoltativo).",
        gdpr_art3_title: "3. Finalità e Base Giuridica del Trattamento",
        gdpr_art3_body: "I tuoi dati personali sono raccolti e trattati unicamente al fine di inviare comunicazioni informative riguardanti le attività di ASM POLIMI, inclusi i luoghi e gli orari della preghiera comunitaria del Venerdì (Jumu'ah), guide accademiche, eventi culturali, workshop, aggiornamenti sui servizi Halal e avvisi per il benessere studentesco. La base giuridica del trattamento è il tuo consenso esplicito e liberamente prestato ai sensi dell'<strong>Articolo 6, paragrafo 1, lettera a) del Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679)</strong>.",
        gdpr_art4_title: "4. Archiviazione, Sicurezza e Terze Parti",
        gdpr_art4_body: "I dati sono archiviati in modo sicuro su server protetti e database crittografati. Non vendiamo, cediamo, diffondiamo né trasferiamo i tuoi dati a soggetti terzi con finalità commerciali o extra-UE. L'accesso è riservato esclusivamente ai membri autorizzati del Consiglio Direttivo di ASM POLIMI per la gestione delle comunicazioni.",
        gdpr_art5_title: "5. Periodo di Conservazione",
        gdpr_art5_body: "I dati saranno conservati per l'intera durata della tua iscrizione alla mailing list, ovvero fino all'eventuale revoca del consenso. A seguito della richiesta di cancellazione, i dati saranno eliminati definitivamente dai registri attivi entro 7 giorni.",
        gdpr_art6_title: "6. I Tuoi Diritti ai sensi del GDPR",
        gdpr_art6_intro: "Ai sensi degli Articoli da 15 a 22 del GDPR, hai il diritto di:",
        gdpr_right_access: "<strong>Accesso:</strong> Ottenere la conferma del trattamento dei tuoi dati e richiederne copia.",
        gdpr_right_rect: "<strong>Rettifica:</strong> Richiedere la correzione tempestiva di dati inesatti o incompleti.",
        gdpr_right_erase: "<strong>Cancellazione (\"Diritto all'Oblio\"):</strong> Chiedere l'eliminazione totale dei tuoi dati dai nostri sistemi.",
        gdpr_right_withdraw: "<strong>Revoca del Consenso:</strong> Revocare il consenso prestato in qualsiasi momento senza pregiudicare la liceità del trattamento precedente.",
        gdpr_right_complaint: "<strong>Reclamo all'Autorità:</strong> Proporre reclamo all'autorità di controllo competente (in Italia: <em>Garante per la protezione dei dati personali</em> - <a href=\"https://www.garanteprivacy.it\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--color-primary); text-decoration: underline;\">garanteprivacy.it</a>).",
        gdpr_modal_close: "Ho Capito e Chiudi",

        // Events Page
        events_page_heading: "Eventi in Evidenza",
        events_page_sub: "Rimani aggiornato su halaqat, incontri e attività della nostra associazione.",
        events_reg_heading: "Iscriviti a un Evento",
        events_reg_sub: "Prenota il tuo posto compilando il modulo sottostante.",
        events_open_tab_btn: "📋 Apri Modulo in una Nuova Scheda",
        events_empty_msg: "Nessun evento in programma al momento. Torna a trovarci presto!",
        events_date_tbd: "Data da definire",
        events_untitled: "Evento Senza Titolo",

        // Halal Scanner Page
        halal_page_heading: "Scanner Prodotti Halal",
        halal_page_sub: "Verifica istantaneamente i prodotti tramite scansione codice a barre o analisi degli ingredienti.",
        halal_tab_cam: "📷 Scansione Fotocamera",
        halal_tab_barcode: "🔢 Inserisci Codice a Barre",
        halal_tab_ingredients: "📝 Analisi Ingredienti",
        halal_cam_instruction: "Inquadra il codice a barre con la fotocamera per eseguire la scansione automatica.",
        halal_cam_start: "Avvia Fotocamera",
        halal_cam_stop: "Ferma Fotocamera",
        halal_barcode_label: "Codice a Barre Prodotto (Numero EAN/UPC)",
        halal_barcode_ph: "es. 20305062",
        halal_barcode_btn: "Cerca Prodotto",
        halal_ing_instruction: "Incolla la lista degli ingredienti di qualsiasi prodotto qui sotto. Il nostro sistema evidenzierà eventuali sostanze Haram o dubbie (Mashbuh).",
        halal_ing_label: "Testo Ingredienti",
        halal_ing_ph: "Incolla qui l'elenco degli ingredienti...",
        halal_ing_btn: "Analizza Ingredienti",
        halal_querying: "Interrogazione del database in corso...",
        halal_legal_title: "Informativa Legale e Privacy",
        halal_legal_agree: "<strong>Accettazione Automatica:</strong> Utilizzando lo Scanner Halal, la Scansione Fotocamera o l'Analisi Ingredienti, accetti automaticamente questi termini, i nostri <a href='/terms' style='color: #1e40af; text-decoration: underline; font-weight: 700;'>Termini e Condizioni</a> e l'<a href='/privacy' style='color: #1e40af; text-decoration: underline; font-weight: 700;'>Informativa sulla Privacy</a>.",
        halal_legal_p1_title: "Solo Supporto Informativo:",
        halal_legal_p1_desc: "Questo strumento è un supporto informativo gestito da volontari e non costituisce parere religioso formale (fatwa), analisi di laboratorio o certificazione Halal ufficiale.",
        halal_legal_p2_title: "Prevalenza dell'Etichetta Fisica:",
        halal_legal_p2_desc: "I produttori modificano frequentemente le ricette senza variare il codice a barre. Verifica sempre l'elenco degli ingredienti stampato sulla confezione fisica.",
        halal_legal_p3_title: "Privacy e Flusso Fotocamera:",
        halal_legal_p3_desc: "La scansione tramite fotocamera avviene al 100% in locale nel browser. Nessuna foto, video o immagine viene registrata, salvata o inviata a server esterni.",
        halal_legal_p4_title: "Limitazione di Responsabilità:",
        halal_legal_p4_desc: "ASM POLIMI declina ogni responsabilità per eventuali discrepanze alimentari, religiose o sanitarie derivanti da banche dati esterne (Open Food Facts) o modifiche dei produttori.",

        halal_ask_imam_cta: "Chiedi all'Imam",
        halal_status_certified: "Certificato Halal",
        halal_status_halal: "Halal (Nessun ingrediente Haram rilevato)",
        halal_status_mashbuh: "Dubbio / Mashbuh",
        halal_status_haram: "Haram / Non Halal",
        halal_brand_label: "Marca:",
        halal_ing_list_title: "Elenco Ingredienti:",

        // Student Support / Ask an Imam Page
        support_heading: "Supporto per gli Studenti",
        support_sub: "Siamo qui per te. Sia che tu abbia bisogno di aiuto o di un consiglio.",
        support_card_title: "\"Chiedi all'Imam\"",
        support_card_desc: "Hai domande su Fiqh, difficoltà personali o vita universitaria? Inviala qui sotto: un nostro studioso locale affiliato ti risponderà in forma strettamente confidenziale.",
        support_topic_label: "Argomento",
        support_topic_placeholder: "Seleziona Argomento...",
        support_topic_prayer: "Preghiera e Culto",
        support_topic_halal: "Halal e Haram",
        support_topic_relationships: "Relazioni e Matrimonio",
        support_topic_mental: "Salute Mentale e Stress Universitario",
        support_topic_other: "Altro",
        support_q_label: "La Tua Domanda",
        support_q_ph: "Descrivi la tua domanda nel dettaglio...",
        support_email_label: "Email (Obbligatoria se il telefono è vuoto)",
        support_phone_label: "Numero di Telefono (Obbligatorio se l'email è vuota)",
        support_submit_btn: "Invia Domanda",
        support_success_msg: "La tua domanda è stata inviata con successo! L'Imam la esaminerà al più presto.",
        support_error_contact: "Per favore fornisci un'email o un numero di telefono affinché l'Imam possa ricontattarti.",

        // Photo Gallery Page
        gallery_heading: "Galleria Multimediale",
        gallery_sub: "I ricordi dei nostri eventi passati, halaqat e incontri comunitari.",
        gallery_loading: "Caricamento galleria in corso...",
        gallery_recordings_heading: "Registrazioni delle Halaqa",
        gallery_recordings_sub: "Vuoi vedere altre foto e registrazioni? Visita il nostro archivio OneDrive.",
        gallery_onedrive_btn: "Visita il nostro OneDrive",

        // Jumu'ah Page
        jumuah_heading: "Preghiera del Venerdì (Jumu'ah)",
        jumuah_map_cta_btn: "🗺️ Mappa Spazi di Preghiera e Moschee &darr;",
        jumuah_ayah_trans: "O voi che credete! Quando viene chiamato alla preghiera nel Giorno del Venerdì (Jumu'ah), accorrete al ricordo di Allah e lasciate ogni commercio. Ciò è meglio per voi, se solo lo sapeste. (Corano 62:9)",
        jumuah_details_prefix: "Dettagli Preghiera per",
        jumuah_bovisa_title: "Campus Bovisa",
        jumuah_bovisa_loc: "Edificio 24 piano -1, Campus Bovisa",
        jumuah_arrive_early: "Si consiglia di arrivare in anticipo per trovare posto.",
        jumuah_unimi_title: "Sede Unimi (Città Studi)",
        jumuah_unimi_loc: "Aula 300, Sede Unimi",
        jumuah_sunnah_heading: "Atti Consigliati (Sunan) del Venerdì",
        jumuah_sunnah_ghusl: "<strong>Ghusl (غسل):</strong> Compiere il lavaggio rituale prima di recarsi alla preghiera.",
        jumuah_sunnah_clothes: "<strong>Abiti Puliti:</strong> Indossare i propri vestiti migliori e puliti.",
        jumuah_sunnah_perfume: "<strong>Profumo:</strong> Mettersi del profumo (per gli uomini).",
        jumuah_sunnah_siwak: "<strong>Siwak (سواك):</strong> Usare il miswak o spazzolino per pulire i denti.",
        jumuah_sunnah_kahf: "<strong>Sura Al-Kahf (سورة الكهف):</strong> Recitare la Sura Al-Kahf durante il giorno o la notte precedente.",
        jumuah_sunnah_salawat: "<strong>Preghiera sul Profeta (الصلاة على النبي ﷺ):</strong> Inviare copiose benedizioni sul Profeta Muhammad (pace e benedizioni su di lui).",
        jumuah_sunnah_dua: "<strong>Dua (الدعاء):</strong> Invocare intensamente Allah, in particolare durante l'ora in cui le suppliche vengono esaudite.",

        // Map Section on Jumu'ah Page
        map_badge: "Guida Campus e Milano",
        map_heading: "Mappa Spazi di Preghiera e Moschee",
        map_sub: "Guida interattiva a tutti gli spazi di preghiera universitari e alle principali moschee di Milano. Clicca su qualsiasi scheda o marcatore per vedere video guide delle stanze, disponibilità di Jumu'ah o avviare la navigazione GPS con 1 clic in Google Maps.",
        map_filter_all: "📍 Tutte",
        map_filter_campus: "🎓 Atenei",
        map_filter_mosque: "🕌 Moschee",
        map_legend_campus: "Stanza di Campus",
        map_legend_mosque: "Moschea a Milano",
        map_btn_video: "▶ Video Guida",
        map_badge_jumuah: "Jumu'ah Disponibile",
        map_badge_mosque: "Moschea e Jumu'ah",
        map_badge_daily: "Solo Preghiere Quotidiane",

        // Modulo Iscrizione Eventi
        events_reg_heading: "Iscrizione e Prenotazione Eventi",
        events_reg_sub: "Prenota il tuo posto inserendo i tuoi dati di seguito.",
        events_selected_label: "Evento Selezionato",
        events_step1_title: "Scegli l'Evento",
        events_select_label: "A quale evento parteciperai? *",
        events_step2_title: "Dati Partecipante",
        events_name_label: "Nome Completo *",
        events_email_label: "Indirizzo Email *",
        events_phone_label: "Numero di Telefono / WhatsApp *",
        events_phone_hint: "Utilizzato per il coordinamento via WhatsApp e promemoria dell'evento.",
        events_matricola_label: "Matricola Polimi (Codice Studente)",
        events_guest_checkbox: "Non sono uno studente Polimi (Ospite Esterno / Amico)",
        events_step3_title: "Dettagli Evento ed Esigenze Alimentari",
        events_dietary_label: "Preferenze Alimentari e Allergie (per pasti/Iftar)",
        dietary_opt_none: "Nessuna restrizione particolare (standard Halal)",
        dietary_opt_veg: "Vegetariano",
        dietary_opt_vegan: "Vegano",
        dietary_opt_celiac: "Senza Glutine / Celiachia",
        dietary_opt_nut: "Allergia a frutta secca / arachidi",
        dietary_opt_other: "Altro (specificare nelle note in basso)",
        events_emergency_label: "Contatto di Emergenza (per escursioni e attività fisiche)",
        events_notes_label: "Note Speciali, Domande o Passaggi Auto",
        events_free_title: "Iscrizione all'Evento 100% Gratuita!",
        events_free_desc: "Questo evento è a ingresso gratuito per tutti gli studenti e membri della comunità. Prenota il tuo posto di seguito.",
        events_submit_btn: "🎟️ Conferma e Prenota il Mio Posto",
        events_success_title: "Iscrizione Confermata!",
        events_success_sub: "Alhamdulillah! Il tuo posto per l'evento è stato confermato.",
        events_summary_event: "Evento",
        events_register_another: "Iscrivi un'Altra Persona",
        events_back_btn: "Torna a Tutti gli Eventi",

        // Modulo Iscrizione Eventi Guidato (Pagina Dedicata)
        event_reg_badge: "Iscrizione Ufficiale Evento",
        event_reg_title: "Modulo Iscrizione Evento",
        event_reg_subtitle: "Registrazione guidata per halaqas, Iftar di Ramadiamo, escursioni e laboratori ASM.",
        event_step1_label: "Seleziona Evento",
        event_step2_label: "Dati Partecipante",
        event_step3_label: "Tessera & Quota",
        event_step4_label: "Logistica",
        event_step5_label: "Riepilogo & Conferma",
        event_step1_heading: "Passo 1: Scegli l'Evento",
        event_step1_desc: "Seleziona a quale incontro, escursione o attività desideri partecipare.",
        event_select_prompt: "Seleziona un evento a cui iscriverti: *",
        event_back_to_list: "← Torna agli Eventi",
        event_btn_continue: "Continua con i Dati Personali →",
        event_step2_heading: "Passo 2: Informazioni Partecipante",
        event_step2_desc: "Indicaci chi parteciperà all'evento.",
        event_name_label: "Nome Completo *",
        event_email_label: "Indirizzo Email *",
        event_email_hint: "Invieremo qui la conferma e il pass di ingresso.",
        event_phone_label: "Numero di Telefono / WhatsApp *",
        event_phone_hint: "Utilizzato per promemoria e l'accesso al gruppo WhatsApp dell'evento.",
        event_btn_prev: "← Indietro",
        event_btn_continue_pricing: "Avanti: Quota & Tessera →",
        event_step3_heading: "Passo 3: Stato Membro ASM & Prezzo",
        event_step3_desc: "I soci ASM beneficiano di sconti o accesso gratuito a tutte le attività.",
        event_member_question: "Sei un socio ufficiale ASM per l'anno accademico 2025/2026? *",
        event_tier_member_title: "Sì, sono un Socio ASM",
        event_tier_member_desc: "Hai completato la registrazione socio e possiedi la tessera attiva.",
        event_tier_non_title: "Non Socio / Ospite Esterno",
        event_tier_non_desc: "Aperto a tutti gli studenti del Politecnico, amici e ospiti della comunità.",
        event_matricola_label: "Matricola Polimi (Codice Studente) *",
        event_guest_toggle: "Non sono uno studente Polimi (Ospite Esterno / Non Studente)",
        event_btn_continue_logistics: "Avanti: Esigenze Alimentari & Logistica →",
        event_step4_heading: "Passo 4: Esigenze Alimentari & Logistica",
        event_step4_desc: "Aiutaci a organizzare le porzioni dei pasti e le misure di sicurezza.",
        event_dietary_label: "Esigenze Alimentari e Allergie (per pasti/Iftar)",
        event_emergency_label: "Contatto di Emergenza Nome e Telefono (consigliato per escursioni e sport)",
        event_notes_label: "Note Speciali, Domande o Offerte di Passaggio Auto",
        event_btn_continue_review: "Riepilogo & Conferma →",
        event_step5_heading: "Passo 5: Riepilogo & Conferma Iscrizione",
        event_step5_desc: "Verifica i dettagli della tua prenotazione prima di confermare.",
        summary_event: "Evento",
        summary_datetime: "Data e Ora",
        summary_location: "Luogo",
        summary_attendee: "Partecipante",
        summary_contact: "Contatto",
        summary_membership: "Tipologia Iscrizione",
        summary_price_due: "Totale Quota da Versare",
        event_free_banner_title: "Iscrizione 100% Gratuita!",
        event_free_banner_desc: "Questo evento non prevede alcuna quota di partecipazione. Clicca Conferma per bloccare il tuo posto.",
        event_btn_submit: "🎟️ Conferma e Completa Iscrizione",
        event_success_title: "Iscrizione Confermata!",
        event_success_sub: "Alhamdulillah! Il tuo posto è stato riservato. Non vediamo l'ora di accoglierti.",
        event_register_another: "Iscrivi un'Altra Persona",
        event_back_to_events: "Torna a Tutti gli Eventi",
        events_portal_cta_title: "Pronto a Partecipare a un Evento?",
        events_portal_cta_desc: "La registrazione si effettua tramite il nostro portale guidato passo dopo passo. Scopri le tariffe riservate ai soci e agli ospiti.",
        events_open_portal_btn: "Apri il Portale Iscrizione Eventi →"
    }
};
window.ASM_I18N = ASM_I18N;

let currentLang = localStorage.getItem('site_lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {

    // Dark Mode Toggle
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Dark Mode Toggle Helper to sync both buttons
    function updateThemeToggleButtons(darkEnabled) {
        const toggles = document.querySelectorAll('.theme-toggle-btn');
        toggles.forEach(toggle => {
            toggle.textContent = darkEnabled ? '☀️' : '🌙';
        });
    }

    function createThemeToggle(isMobile) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle-btn';
        themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
        if (isMobile) {
            themeToggle.style.cssText = 'background: none; border: none; font-size: 1.5rem; cursor: pointer; margin-top: 1.5rem; color: white; transition: color 0.2s; display: block; text-align: center; width: 100%;';
        } else {
            themeToggle.style.cssText = 'background: none; border: none; font-size: 1.25rem; cursor: pointer; margin-left: 0.65rem; color: var(--color-text-light); transition: color 0.2s;';
        }
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('clicked');
            setTimeout(() => themeToggle.classList.remove('clicked'), 600);
            document.body.classList.toggle('dark-mode');
            const darkEnabled = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', darkEnabled);
            updateThemeToggleButtons(darkEnabled);
        });

        return themeToggle;
    }

    // Language Switcher Helper Functions
    function updateLangSwitcherButtons(lang) {
        document.querySelectorAll('[data-lang-choice]').forEach(btn => {
            if (btn.getAttribute('data-lang-choice') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function createLangSwitcher() {
        const wrap = document.createElement('div');
        wrap.className = 'lang-switcher-pill';
        wrap.setAttribute('role', 'group');
        wrap.setAttribute('aria-label', 'Language Switcher');

        const btnEn = document.createElement('button');
        btnEn.type = 'button';
        btnEn.className = 'lang-pill-btn' + (currentLang === 'en' ? ' active' : '');
        btnEn.setAttribute('data-lang-choice', 'en');
        btnEn.textContent = 'EN';
        btnEn.title = 'Switch to English';
        btnEn.addEventListener('click', () => setSiteLanguage('en'));

        const divider = document.createElement('span');
        divider.className = 'lang-divider';
        divider.textContent = '/';

        const btnIt = document.createElement('button');
        btnIt.type = 'button';
        btnIt.className = 'lang-pill-btn' + (currentLang === 'it' ? ' active' : '');
        btnIt.setAttribute('data-lang-choice', 'it');
        btnIt.textContent = 'IT';
        btnIt.title = 'Passa all\'Italiano';
        btnIt.addEventListener('click', () => setSiteLanguage('it'));

        wrap.appendChild(btnEn);
        wrap.appendChild(divider);
        wrap.appendChild(btnIt);
        return wrap;
    }

    function createMobileLangSwitcher() {
        const wrap = document.createElement('div');
        wrap.className = 'mobile-lang-switcher';

        const btnEn = document.createElement('button');
        btnEn.type = 'button';
        btnEn.className = 'mobile-lang-btn' + (currentLang === 'en' ? ' active' : '');
        btnEn.setAttribute('data-lang-choice', 'en');
        btnEn.textContent = 'EN';
        btnEn.addEventListener('click', () => {
            setSiteLanguage('en');
        });

        const divider = document.createElement('span');
        divider.className = 'lang-divider';
        divider.style.cssText = 'color: rgba(255, 255, 255, 0.4); font-size: 1.2rem; font-weight: 600; padding: 0 0.5rem;';
        divider.textContent = '/';

        const btnIt = document.createElement('button');
        btnIt.type = 'button';
        btnIt.className = 'mobile-lang-btn' + (currentLang === 'it' ? ' active' : '');
        btnIt.setAttribute('data-lang-choice', 'it');
        btnIt.textContent = 'IT';
        btnIt.addEventListener('click', () => {
            setSiteLanguage('it');
        });

        wrap.appendChild(btnEn);
        wrap.appendChild(divider);
        wrap.appendChild(btnIt);
        return wrap;
    }

    // Set Global Language
    function setSiteLanguage(lang, persist = true) {
        currentLang = lang === 'it' ? 'it' : 'en';
        if (persist) {
            localStorage.setItem('site_lang', currentLang);
        }
        document.documentElement.lang = currentLang;

        updateLangSwitcherButtons(currentLang);

        const t = ASM_I18N[currentLang] || ASM_I18N.en;

        // Apply translations to all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                // If custom mission text exists and language is English, keep custom
                if (key === 'mission_text' && currentLang === 'en' && window._customMissionText) {
                    el.textContent = window._customMissionText;
                } else {
                    el.innerHTML = t[key];
                }
            }
        });

        // Apply translations to elements with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) {
                el.placeholder = t[key];
            }
        });

        // Apply translations to elements with data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (t[key] !== undefined) {
                el.title = t[key];
            }
        });

        // Translate dynamic board member roles
        const roleMap = {
            president: { en: 'President', it: 'Presidente' },
            vicepresident: { en: 'Vice President', it: 'Vice Presidente' },
            secretary: { en: 'Secretary', it: 'Segretario' },
            treasurer: { en: 'Treasurer', it: 'Tesoriere' },
            advisor: { en: 'Advisor', it: 'Consigliere' }
        };

        document.querySelectorAll('[data-board-role]').forEach(el => {
            const role = el.getAttribute('data-board-role');
            if (roleMap[role] && roleMap[role][currentLang]) {
                el.textContent = roleMap[role][currentLang];
            }
        });

        // Update Date Display format in prayer section
        const dateDisplay = document.getElementById('current-date');
        if (dateDisplay) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateDisplay.textContent = new Date().toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', options);
        }

        // Update Daily Ayah if on homepage
        if (currentAyahIndex >= 0 && typeof CURATED_STUDENT_AYAT !== 'undefined' && CURATED_STUDENT_AYAT[currentAyahIndex]) {
            renderCuratedAyah(CURATED_STUDENT_AYAT[currentAyahIndex], false);
        }

        // Refresh countdown in prayer times status bar
        if (typeof window.updatePrayerCountdownAndHighlights === 'function') {
            window.updatePrayerCountdownAndHighlights();
        }

        // Refresh Islamic Hijri Calendar and key holy events
        if (typeof window.updateIslamicCalendarUI === 'function') {
            window.updateIslamicCalendarUI();
        }

        // Dispatch custom event for any other component
        window.dispatchEvent(new CustomEvent('asmLanguageChanged', { detail: { lang: currentLang } }));
    }
    window.setSiteLanguage = setSiteLanguage;

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.appendChild(createLangSwitcher());
        navLinks.appendChild(createThemeToggle(false));
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Dynamic Admin links & controls for mobile navigation
    const mobileNavLinksContainer = document.querySelector('.mobile-nav-links');
    if (mobileNavLinksContainer) {
        // Add mobile language switcher
        mobileNavLinksContainer.appendChild(createMobileLangSwitcher());

        // Add theme toggle to mobile navigation menu
        const mobileThemeToggle = createThemeToggle(true);
        mobileThemeToggle.style.marginTop = '0.5rem';
        mobileNavLinksContainer.appendChild(mobileThemeToggle);

        const divider = document.createElement('div');
        divider.style.cssText = 'border-top: 1px solid rgba(255, 255, 255, 0.2); margin: 0.5rem 0; width: 100%;';
        mobileNavLinksContainer.appendChild(divider);

        const adminLinks = [
            { text: 'Admin', href: 'https://admin.asmpolimi.it/admin' },
        ];

        adminLinks.forEach(linkInfo => {
            const a = document.createElement('a');
            a.href = linkInfo.href;
            a.innerHTML = `<span class="mobile-nav-icon">⚙️</span><span data-i18n="nav_admin">${linkInfo.text}</span>`;
            a.style.cssText = 'font-size: 1.15rem; opacity: 0.85;';
            mobileNavLinksContainer.appendChild(a);
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    // Inject top Scroll Progress Bar
    const progressContainer = document.createElement('div');
    progressContainer.id = 'scroll-progress-container';
    progressContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 4px; background: rgba(0,0,0,0.05); z-index: 1002; pointer-events: none;';
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = 'width: 0%; height: 100%; background: linear-gradient(90deg, var(--color-secondary), var(--color-primary-light)); transition: width 0.1s ease-out;';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    // Inject Circular Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = `
        <svg class="progress-ring" viewBox="0 0 50 50" width="100%" height="100%">
            <circle class="progress-ring-bg" cx="25" cy="25" r="22"/>
            <circle class="progress-ring-fill" cx="25" cy="25" r="22"/>
        </svg>
        <span class="back-to-top-arrow">↑</span>
    `;
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const progressCircle = backToTopBtn.querySelector('.progress-ring-fill') || backToTopBtn.querySelector('circle');
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // Update top progress bar
        progressBar.style.width = `${scrollPercent}%`;

        // Update circular indicator
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;

        // Navbar Shadow
        if (navbar) {
            if (scrollTop > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                navbar.style.padding = '0';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        }
    });

    // Set Current Date in Prayer Times
    const dateDisplay = document.getElementById('current-date');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Fetch live prayer times using Aladhan API for Milan, Italy
    async function fetchPrayerTimes() {
        const defaultTimings = {
            Fajr: "04:30",
            Dhuhr: "13:20",
            Asr: "17:15",
            Maghrib: "20:45",
            Isha: "22:15"
        };

        const updatePrayerUI = (timings) => {
            // Helper to convert 24h API time to 12h format
            const formatTime = (time24, asHtml = false) => {
                const [hours, minutes] = time24.split(':');
                const h = parseInt(hours, 10);
                const ampm = h >= 12 ? 'PM' : 'AM';
                const h12 = h % 12 || 12;
                if (asHtml) {
                    return `${h12}:${minutes} <span class="prayer-ampm">${ampm}</span>`;
                }
                return `${h12}:${minutes} ${ampm}`;
            };

            const fajrEl = document.getElementById('fajr-time');
            if (fajrEl) fajrEl.innerHTML = formatTime(timings.Fajr, true);
            const dhuhrEl = document.getElementById('dhuhr-time');
            if (dhuhrEl) dhuhrEl.innerHTML = formatTime(timings.Dhuhr, true);
            const asrEl = document.getElementById('asr-time');
            if (asrEl) asrEl.innerHTML = formatTime(timings.Asr, true);
            const maghribEl = document.getElementById('maghrib-time');
            if (maghribEl) maghribEl.innerHTML = formatTime(timings.Maghrib, true);
            const ishaEl = document.getElementById('isha-time');
            if (ishaEl) ishaEl.innerHTML = formatTime(timings.Isha, true);

            // Highlight the next coming prayer and update Hero Status Bar countdown
            const prayers = [
                { name: 'Fajr', id: 'fajr-time', time: timings.Fajr },
                { name: 'Dhuhr', id: 'dhuhr-time', time: timings.Dhuhr },
                { name: 'Asr', id: 'Asr', idTarget: 'asr-time', time: timings.Asr },
                { name: 'Maghrib', id: 'maghrib-time', time: timings.Maghrib },
                { name: 'Isha', id: 'isha-time', time: timings.Isha }
            ];

            const getMinutes = (time24) => {
                if (!time24) return 0;
                const [hours, minutes] = time24.split(':');
                return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
            };

            const updatePrayerCountdownAndHighlights = () => {
                const now = new Date();
                const currentMinutes = now.getHours() * 60 + now.getMinutes();

                let nextPrayer = null;
                let isTomorrow = false;

                for (const prayer of prayers) {
                    if (getMinutes(prayer.time) > currentMinutes) {
                        nextPrayer = prayer;
                        break;
                    }
                }

                // If all prayers today have passed, the next prayer is Fajr tomorrow
                if (!nextPrayer) {
                    nextPrayer = prayers[0];
                    isTomorrow = true;
                }

                // Remove highlight from all prayer items in schedule card
                prayers.forEach(p => {
                    const targetId = p.idTarget || p.id;
                    const element = document.getElementById(targetId);
                    if (element) {
                        const prayerItem = element.closest('.prayer-item');
                        if (prayerItem) {
                            prayerItem.classList.remove('highlight');
                        }
                    }
                });

                // Highlight next prayer in prayer schedule
                const nextTargetId = nextPrayer.idTarget || nextPrayer.id;
                const nextElement = document.getElementById(nextTargetId);
                if (nextElement) {
                    const nextPrayerItem = nextElement.closest('.prayer-item');
                    if (nextPrayerItem) {
                        nextPrayerItem.classList.add('highlight');
                    }
                }

                // Calculate countdown time for Hero Status Bar
                let diffMinutes = isTomorrow
                    ? (1440 - currentMinutes) + getMinutes(nextPrayer.time)
                    : getMinutes(nextPrayer.time) - currentMinutes;

                let countdownStr = '';
                if (diffMinutes <= 0 && diffMinutes >= -15) {
                    countdownStr = currentLang === 'it' ? 'Adesso' : 'Now';
                } else if (diffMinutes > 0) {
                    const hours = Math.floor(diffMinutes / 60);
                    const mins = diffMinutes % 60;
                    const prefix = currentLang === 'it' ? 'tra' : 'in';
                    countdownStr = hours > 0 ? `${prefix} ${hours}h ${mins}m` : `${prefix} ${mins}m`;
                } else {
                    countdownStr = currentLang === 'it' ? 'A breve' : 'Soon';
                }

                // Update Daily Prayer Card Status Bar elements (Home & Jumu'ah pages)
                const cardNameEl = document.getElementById('card-next-prayer-name') || document.querySelector('.next-prayer-name');
                const cardCountdownEl = document.getElementById('card-next-prayer-countdown');
                const cardTimeEl = document.getElementById('card-next-prayer-time');

                if (cardNameEl) cardNameEl.textContent = nextPrayer.name;
                if (cardCountdownEl) cardCountdownEl.textContent = countdownStr;
                if (cardTimeEl) cardTimeEl.textContent = `(${formatTime(nextPrayer.time)})`;

                // Also update any hero elements if present
                const heroNameEl = document.getElementById('hero-next-prayer-name');
                const heroCountdownEl = document.getElementById('hero-next-prayer-countdown');
                const heroTimeEl = document.getElementById('hero-next-prayer-time');

                if (heroNameEl) heroNameEl.textContent = nextPrayer.name;
                if (heroCountdownEl) heroCountdownEl.textContent = countdownStr;
                if (heroTimeEl) heroTimeEl.textContent = `(${formatTime(nextPrayer.time)})`;
            };

            window.updatePrayerCountdownAndHighlights = updatePrayerCountdownAndHighlights;
            updatePrayerCountdownAndHighlights();

            // Keep countdown live every 30 seconds
            if (window._prayerTickerInterval) clearInterval(window._prayerTickerInterval);
            window._prayerTickerInterval = setInterval(updatePrayerCountdownAndHighlights, 30000);
        };

        try {
            // Fetch cached prayer times from backend API or fallback to direct Aladhan API for static hosting
            let timings = null;
            let hijriData = null;
            try {
                const response = await fetch('/api/prayer_times');
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.success && result.data) {
                        timings = result.data;
                        if (result.hijri) hijriData = result.hijri;
                    }
                }
            } catch (e) { }

            if (!timings) {
                // Direct call for GitHub Pages / static hosting
                const directRes = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Milan&country=Italy&method=2');
                if (directRes.ok) {
                    const directData = await directRes.json();
                    if (directData && directData.data && directData.data.timings) {
                        timings = directData.data.timings;
                        if (directData.data.date && directData.data.date.hijri) {
                            hijriData = directData.data.date.hijri;
                        }
                    }
                }
            }

            if (timings) {
                updatePrayerUI(timings);
            } else {
                updatePrayerUI(defaultTimings);
            }

            updateIslamicCalendarUI(hijriData);
        } catch (error) {
            console.warn('Error fetching live prayer times, using Milan defaults:', error);
            updatePrayerUI(defaultTimings);
            updateIslamicCalendarUI(null);
        }
    }

    // ========================================================
    // Islamic Hijri Calendar & Key Holy Events System
    // ========================================================
    const HIJRI_MONTHS_INFO = [
        { number: 1, en: "Muharram", it: "Muharram", ar: "مُحَرَّم", sacred: true, notesEn: "Islamic New Year & Ashura (10th)", notesIt: "Capodanno Islamico & Ashura (10°)" },
        { number: 2, en: "Safar", it: "Safar", ar: "صَفَر", sacred: false, notesEn: "Second month of the lunar year", notesIt: "Secondo mese lunare" },
        { number: 3, en: "Rabi' al-Awwal", it: "Rabi' al-Awwal", ar: "رَبِيع الأَوَّل", sacred: false, notesEn: "Birth of Prophet Muhammad ﷺ (Mawlid)", notesIt: "Nascita del Profeta Muhammad ﷺ (Mawlid)" },
        { number: 4, en: "Rabi' al-Thani", it: "Rabi' al-Thani", ar: "رَبِيع الآخِر", sacred: false, notesEn: "Fourth lunar month", notesIt: "Quarto mese lunare" },
        { number: 5, en: "Jumada al-Ula", it: "Jumada al-Ula", ar: "جُمَادَى الأُولَى", sacred: false, notesEn: "Fifth lunar month", notesIt: "Quinto mese lunare" },
        { number: 6, en: "Jumada al-Akhirah", it: "Jumada al-Akhirah", ar: "جُمَادَى الآخِرَة", sacred: false, notesEn: "Sixth lunar month", notesIt: "Sesto mese lunare" },
        { number: 7, en: "Rajab", it: "Rajab", ar: "رَجَب", sacred: true, notesEn: "Sacred Month & Al-Isra' wal-Mi'raj (27th)", notesIt: "Mese Sacro & Al-Isra' wal-Mi'raj (27°)" },
        { number: 8, en: "Sha'ban", it: "Sha'ban", ar: "شَعْبَان", sacred: false, notesEn: "Preparation for Ramadan", notesIt: "Mese di preparazione al Ramadan" },
        { number: 9, en: "Ramadan", it: "Ramadan", ar: "رَمَضَان", sacred: false, blessed: true, notesEn: "Holy Month of Fasting & Laylat al-Qadr", notesIt: "Mese Sacro del Digiuno & Laylat al-Qadr" },
        { number: 10, en: "Shawwal", it: "Shawwal", ar: "شَوَّال", sacred: false, notesEn: "Eid al-Fitr & 6 Sunnah fasting days", notesIt: "Eid al-Fitr & 6 giorni di digiuno Sunnah" },
        { number: 11, en: "Dhu al-Qi'dah", it: "Dhu al-Qi'dah", ar: "ذُو القَعْدَة", sacred: true, notesEn: "Sacred Month of truce before Hajj", notesIt: "Mese Sacro di tregua prima dell'Hajj" },
        { number: 12, en: "Dhu al-Hijjah", it: "Dhu al-Hijjah", ar: "ذُو الحِجَّة", sacred: true, notesEn: "Hajj, Day of Arafah (9th) & Eid al-Adha (10th)", notesIt: "Hajj, Giorno di Arafah (9°) & Eid al-Adha (10°)" }
    ];

    function getNativeHijriParts(date = new Date()) {
        try {
            const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            }).formatToParts(date);
            const res = {};
            for (const p of parts) {
                if (p.type === 'day') res.day = parseInt(p.value, 10);
                if (p.type === 'month') res.month = parseInt(p.value, 10);
                if (p.type === 'year') res.year = parseInt(p.value.replace(/[^0-9]/g, ''), 10);
            }
            return res;
        } catch (e) {
            return { day: 15, month: 5, year: 1448 };
        }
    }

    function findNextHijriTarget(targetMonth, targetDay) {
        const todayMid = new Date();
        todayMid.setHours(12, 0, 0, 0);
        for (let i = 0; i <= 390; i++) {
            const d = new Date(todayMid.getTime() + i * 86400000);
            const h = getNativeHijriParts(d);
            if (h.month === targetMonth && h.day === targetDay) {
                return { date: d, daysLeft: i, hijriYear: h.year };
            }
        }
        return null;
    }

    function getMoonPhaseForHijriDay(day) {
        const d = parseInt(day, 10) || 1;
        if (d <= 1) {
            return { emoji: '🌒', nameEn: 'Waxing Crescent (Hilal)', nameIt: 'Luna Crescente (Hilal)', ar: 'هلال أول الشهر' };
        } else if (d <= 6) {
            return { emoji: '🌒', nameEn: 'Waxing Crescent (Hilal)', nameIt: 'Luna Crescente (Hilal)', ar: 'هلال متزايد' };
        } else if (d <= 9) {
            return { emoji: '🌓', nameEn: 'First Quarter', nameIt: 'Primo Quarto', ar: 'التربيع الأول' };
        } else if (d <= 13) {
            return { emoji: '🌔', nameEn: 'Waxing Gibbous', nameIt: 'Gibbosa Crescente', ar: 'أحدب متزايد' };
        } else if (d <= 16) {
            return { emoji: '🌕', nameEn: 'Full Moon (Badr)', nameIt: 'Luna Piena (Badr)', ar: 'بدر التمام' };
        } else if (d <= 20) {
            return { emoji: '🌖', nameEn: 'Waning Gibbous', nameIt: 'Gibbosa Calante', ar: 'أحدب متناقص' };
        } else if (d <= 24) {
            return { emoji: '🌗', nameEn: 'Third Quarter', nameIt: 'Ultimo Quarto', ar: 'التربيع الثاني' };
        } else if (d <= 28) {
            return { emoji: '🌘', nameEn: 'Waning Crescent', nameIt: 'Luna Calante', ar: 'هلال متناقص' };
        } else {
            return { emoji: '🌑', nameEn: 'New Moon', nameIt: 'Luna Nuova', ar: 'محاق' };
        }
    }

    function updateIslamicCalendarUI(hijriData) {
        if (hijriData) window._lastHijriData = hijriData;
        const apiData = hijriData || window._lastHijriData;

        let day = 15;
        let monthNum = 5;
        let year = 1448;
        let monthObj = HIJRI_MONTHS_INFO[4];

        if (apiData && apiData.month && apiData.month.number) {
            day = parseInt(apiData.day, 10) || 15;
            monthNum = parseInt(apiData.month.number, 10) || 5;
            year = parseInt(apiData.year, 10) || 1448;
            monthObj = HIJRI_MONTHS_INFO[monthNum - 1] || HIJRI_MONTHS_INFO[4];
        } else {
            const nativeParts = getNativeHijriParts(new Date());
            day = nativeParts.day || 15;
            monthNum = nativeParts.month || 5;
            year = nativeParts.year || 1448;
            monthObj = HIJRI_MONTHS_INFO[monthNum - 1] || HIJRI_MONTHS_INFO[4];
        }

        const isIt = (currentLang === 'it');
        const monthName = isIt ? monthObj.it : monthObj.en;
        const hijriFormatted = `${day} ${monthName} ${year} AH`;
        const hijriArabicFormatted = `${day} ${monthObj.ar} ${year} هـ`;

        // 1. Update Prayer Times Card Hijri Date Badge & Moon Icon
        const prayerHijriEl = document.getElementById('current-hijri-date');
        if (prayerHijriEl) prayerHijriEl.textContent = hijriFormatted;
        const prayerHijriArEl = document.getElementById('current-hijri-ar');
        if (prayerHijriArEl) prayerHijriArEl.textContent = hijriArabicFormatted;

        // 2. Update Feature Card on Islamic Calendar section
        const heroHijriEl = document.getElementById('hijri-full-display');
        if (heroHijriEl) heroHijriEl.textContent = hijriFormatted;
        const heroHijriArEl = document.getElementById('hijri-arabic-display');
        if (heroHijriArEl) heroHijriArEl.textContent = hijriArabicFormatted;

        // 3. Dynamic Moon Phase Emoji based on current day of month (🌑🌒🌓🌔🌕🌖🌗🌘)
        const moonPhase = getMoonPhaseForHijriDay(day);
        const moonArtEl = document.getElementById('hijri-moon-phase-art');
        if (moonArtEl) moonArtEl.textContent = moonPhase.emoji;

        const lunarEmojiEl = document.getElementById('hijri-lunar-emoji');
        if (lunarEmojiEl) lunarEmojiEl.textContent = moonPhase.emoji;

        const lunarTextEl = document.getElementById('hijri-lunar-phase-text');
        if (lunarTextEl) {
            const phaseName = isIt ? moonPhase.nameIt : moonPhase.nameEn;
            lunarTextEl.textContent = `${phaseName} • ${moonPhase.ar}`;
        }

        const prayerMoonBadge = document.querySelector('#prayer-hijri-badge .hijri-badge-icon');
        if (prayerMoonBadge) prayerMoonBadge.textContent = moonPhase.emoji;
        const prayerMoonArt = document.getElementById('prayer-moon-phase-art');
        if (prayerMoonArt) prayerMoonArt.textContent = moonPhase.emoji;

        // 4. Calculate Upcoming Islamic Events
        const eventsData = [
            {
                id: 'ramadan',
                targetMonth: 9,
                targetDay: 1,
                titleEn: '1 Ramadan',
                titleIt: '1 Ramadan'
            },
            {
                id: 'eid-fitr',
                targetMonth: 10,
                targetDay: 1,
                titleEn: '1 Shawwal',
                titleIt: '1 Shawwal'
            },
            {
                id: 'arafah',
                targetMonth: 12,
                targetDay: 9,
                titleEn: '9 Dhu al-Hijjah',
                titleIt: '9 Dhu al-Hijjah'
            },
            {
                id: 'eid-adha',
                targetMonth: 12,
                targetDay: 10,
                titleEn: '10 Dhu al-Hijjah',
                titleIt: '10 Dhu al-Hijjah'
            }
        ];

        eventsData.forEach(ev => {
            const target = findNextHijriTarget(ev.targetMonth, ev.targetDay);
            if (!target) return;

            const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
            const gregDateStr = '~ ' + target.date.toLocaleDateString(isIt ? 'it-IT' : 'en-US', dateOptions);
            const hijriDateStr = `${isIt ? ev.titleIt : ev.titleEn} ${target.hijriYear} AH`;

            let countdownText = '';
            let isToday = false;
            if (target.daysLeft === 0) {
                countdownText = isIt ? '🎉 Oggi!' : '🎉 Today!';
                isToday = true;
            } else if (target.daysLeft === 1) {
                countdownText = isIt ? '⏳ Domani!' : '⏳ Tomorrow!';
            } else {
                countdownText = isIt ? `⏳ tra ${target.daysLeft} giorni` : `⏳ in ${target.daysLeft} days`;
            }

            // Update Home card
            const countEl = document.getElementById(`countdown-${ev.id}`);
            if (countEl) {
                countEl.textContent = countdownText;
                if (isToday) countEl.classList.add('today');
                else countEl.classList.remove('today');
            }
            const gregEl = document.getElementById(`date-greg-${ev.id}`);
            if (gregEl) gregEl.textContent = gregDateStr;
            const hijriEl = document.getElementById(`date-hijri-${ev.id}`);
            if (hijriEl) hijriEl.textContent = hijriDateStr;

            // Update Events page card if present
            const evCountEl = document.getElementById(`events-countdown-${ev.id}`);
            if (evCountEl) {
                evCountEl.textContent = countdownText;
                if (isToday) evCountEl.classList.add('today');
                else evCountEl.classList.remove('today');
            }
            const evGregEl = document.getElementById(`events-date-greg-${ev.id}`);
            if (evGregEl) evGregEl.textContent = gregDateStr;
        });

        // 4. Populate 12-Month Explorer Grid
        const monthsContainer = document.getElementById('hijri-months-container');
        if (monthsContainer) {
            monthsContainer.innerHTML = HIJRI_MONTHS_INFO.map(m => {
                const isCurrent = (m.number === monthNum);
                const currentBadge = isCurrent
                    ? `<span class="month-tag-current">${isIt ? 'Mese Attuale' : 'Current Month'}</span>`
                    : '';
                const sacredBadge = m.sacred
                    ? `<span class="month-tag-sacred">${isIt ? 'Mese Sacro' : 'Sacred Month'}</span>`
                    : '';
                const notes = isIt ? m.notesIt : m.notesEn;

                return `
                    <div class="hijri-month-tile ${isCurrent ? 'current-active-month' : ''}">
                        <div class="month-num-pill">${m.number} / 12</div>
                        <div class="month-name-en">${isIt ? m.it : m.en}</div>
                        <div class="month-name-ar" dir="rtl">${m.ar}</div>
                        <div>${currentBadge}${sacredBadge}</div>
                        <div class="month-brief-notes">${notes}</div>
                    </div>
                `;
            }).join('');
        }
    }
    window.updateIslamicCalendarUI = updateIslamicCalendarUI;

    // Instant local rendering
    updateIslamicCalendarUI(null);

    // Explorer Accordion Toggle
    const explorerToggle = document.getElementById('hijri-explorer-toggle');
    const explorerContainer = document.getElementById('hijri-months-container');
    if (explorerToggle && explorerContainer) {
        explorerToggle.addEventListener('click', () => {
            const isHidden = explorerContainer.classList.contains('hidden');
            if (isHidden) {
                explorerContainer.classList.remove('hidden');
                explorerToggle.setAttribute('aria-expanded', 'true');
            } else {
                explorerContainer.classList.add('hidden');
                explorerToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Islamic Events Horizontal Scrolling Drag Helper
    document.querySelectorAll('.islamic-events-grid').forEach(slider => {
        let isDown = false;
        let startX, scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('is-dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('is-dragging');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('is-dragging');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    fetchPrayerTimes();

    // Universal Toast Notification Helper
    function showAsmToast(message) {
        let toast = document.getElementById('asm-global-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'asm-global-toast';
            toast.className = 'asm-toast-notification';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
        toast.classList.add('show');

        clearTimeout(window._asmToastTimeout);
        window._asmToastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }
    window.showAsmToast = showAsmToast;

    // Curated uplifting, inspirational, and student-relevant Ayat
    const CURATED_STUDENT_AYAT = [
        // Seeking Knowledge & Wisdom
        {
            surah: 20, ayah: "114",
            theme: "📚 Seeking Knowledge",
            surahName: "Taha",
            arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
            english: "And say: 'My Lord, increase me in knowledge.'",
            italian: "E di': «Signore, accresci la mia conoscenza»."
        },
        {
            surah: 39, ayah: "9",
            theme: "💡 Wisdom & Reflection",
            surahName: "Az-Zumar",
            arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
            english: "Say: 'Are those who know equal to those who do not know?' Only they will remember who are people of understanding.",
            italian: "Di': «Sono forse uguali coloro che sanno e coloro che non sanno?» Solo gli uomini dotati di intelletto riflettono."
        },
        {
            surah: 58, ayah: "11",
            theme: "🎓 Status of Knowledge",
            surahName: "Al-Mujadila",
            arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
            english: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
            italian: "Allah innalzerà di molti gradi coloro tra voi che credono e coloro a cui è stata data la scienza."
        },
        {
            surah: 96, ayah: "1-5",
            theme: "🖋️ Seeking Knowledge",
            surahName: "Al-Alaq",
            arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
            english: "Recite in the name of your Lord who created... taught by the pen, taught man that which he knew not.",
            italian: "Leggi, in nome del tuo Signore che ha creato... Colui che ha insegnato per mezzo del calamo, ha insegnato all'uomo ciò che non sapeva."
        },
        // Effort, Hardship & Perseverance (Exams & Studies)
        {
            surah: 94, ayah: "5-6",
            theme: "🌱 Perseverance & Ease",
            surahName: "Ash-Sharh",
            arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
            english: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
            italian: "In verità, con la difficoltà c'è la facilità. Sì, con la difficoltà c'è la facilità."
        },
        {
            surah: 53, ayah: "39-40",
            theme: "🎯 Dedication & Effort",
            surahName: "An-Najm",
            arabic: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ۝ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ",
            english: "And that there is not for man except that [good] for which he strives, and that his effort is going to be seen.",
            italian: "E che l'uomo non otterrà che il frutto dei suoi sforzi, e che il suo impegno sarà presto mostrato."
        },
        {
            surah: 2, ayah: "286",
            theme: "💪 Inner Strength",
            surahName: "Al-Baqarah",
            arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
            english: "Allah does not burden a soul beyond that it can bear.",
            italian: "Allah non impone ad alcuna anima un carico superiore alle sue capacità."
        },
        {
            surah: 2, ayah: "153",
            theme: "🤲 Patience & Prayer",
            surahName: "Al-Baqarah",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
            english: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
            italian: "O voi che credete, cercate aiuto nella pazienza e nella preghiera. In verità, Allah è con i pazienti."
        },
        {
            surah: 3, ayah: "200",
            theme: "🏆 Steadfastness",
            surahName: "Ali 'Imran",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
            english: "O you who have believed, persevere and endure and remain steadfast and conscious of Allah that you may succeed.",
            italian: "O voi che credete, perseverate nella pazienza e siate saldi, e temete Allah affinché possiate prosperare."
        },
        {
            surah: 3, ayah: "139",
            theme: "✨ Resilience & Dignity",
            surahName: "Ali 'Imran",
            arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
            english: "So do not weaken and do not grieve, and you will be superior if you are [true] believers.",
            italian: "Non perdetevi d'animo e non siate tristi, poiché sarete voi i superiori se siete veri credenti."
        },
        // Tawakkul & Overcoming Academic Anxiety
        {
            surah: 65, ayah: "3",
            theme: "🛡️ Trust in Allah (Tawakkul)",
            surahName: "At-Talaq",
            arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
            english: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
            italian: "E chi confida in Allah, Egli gli basta. In verità, Allah porta a compimento ogni Suo decreto."
        },
        {
            surah: 3, ayah: "159",
            theme: "🎯 Focus & Reliance",
            surahName: "Ali 'Imran",
            arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
            english: "And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].",
            italian: "E quando hai preso una decisione, riponi la tua fiducia in Allah. In verità, Allah ama coloro che confidano in Lui."
        },
        {
            surah: 13, ayah: "28",
            theme: "🕊️ Inner Peace",
            surahName: "Ar-Ra'd",
            arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
            english: "Those who believe and whose hearts find rest in the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts find peace.",
            italian: "Coloro che credono e i cui cuori si rasserenano al ricordo di Allah. Non è forse al ricordo di Allah che i cuori trovano pace?"
        },
        {
            surah: 2, ayah: "186",
            theme: "🤲 Divine Nearness",
            surahName: "Al-Baqarah",
            arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
            english: "And when My servants ask you concerning Me - indeed I am near. I respond to the call of the caller when he calls upon Me.",
            italian: "E quando i Miei servi ti chiedono di Me, ebbene Io sono vicino. Rispondo all'invocazione di chi Mi invoca quando Mi chiama."
        },
        {
            surah: 3, ayah: "173",
            theme: "🛡️ Supreme Protector",
            surahName: "Ali 'Imran",
            arabic: "الَّذِينَ قَالَ لَهُمُ النَّاسُ إِنَّ النَّاسَ قَدْ جَمَعُوا لَكُمْ فَاخْشَوْهُمْ فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
            english: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
            italian: "Allah ci basta, ed Egli è il migliore dei protettori."
        },
        // Dua for Mental Clarity & Academic Success
        {
            surah: 20, ayah: "25-28",
            theme: "📖 Dua for Clarity & Ease",
            surahName: "Taha",
            arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي",
            english: "My Lord, expand for me my chest [with assurance], and ease for me my task, and untie the knot from my tongue that they may understand my speech.",
            italian: "Signore, aprimi il petto, rendi facile la mia missione e sciogli il nodo della mia lingua affinché comprendano il mio discorso."
        },
        {
            surah: 2, ayah: "201",
            theme: "⚖️ Balanced Success",
            surahName: "Al-Baqarah",
            arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            english: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
            italian: "Signore nostro, concedici il bene in questa vita e il bene nell'Altra, e proteggici dal tormento del Fuoco."
        },
        // Hope & Relief
        {
            surah: 93, ayah: "3-5",
            theme: "🌅 Brighter Tomorrow",
            surahName: "Ad-Duha",
            arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
            english: "Your Lord has not forsaken you, nor has He detested. And what is to come is better for you than what has passed. And your Lord is going to give you, and you will be well-pleased.",
            italian: "Il tuo Signore non ti ha abbandonato e non ti disprezza. E la vita futura sarà per te migliore della presente, e il tuo Signore ti colmerà di doni e ne sarai soddisfatto."
        },
        {
            surah: 39, ayah: "53",
            theme: "💖 Boundless Mercy",
            surahName: "Az-Zumar",
            arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
            english: "Say: 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.'",
            italian: "Di': «O Miei servi che avete ecceduto contro voi stessi, non disperate della misericordia di Allah. In verità, Allah perdona tutti i peccati»."
        },
        // Excellence (Ihsan) & Gratitude
        {
            surah: 18, ayah: "30",
            theme: "🌟 Excellence (Ihsan)",
            surahName: "Al-Kahf",
            arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا",
            english: "Indeed, those who have believed and done righteous deeds - We will not allow to be lost the reward of any who did well in deeds.",
            italian: "In verità, coloro che credono e compiono il bene: non lasceremo andare perduta la ricompensa di chi avrà agito al meglio."
        },
        {
            surah: 55, ayah: "60",
            theme: "✨ Goodness Rewarded",
            surahName: "Ar-Rahman",
            arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ",
            english: "Is the reward for goodness [anything] other than goodness?",
            italian: "Quale può essere la ricompensa del bene, se non il bene stesso?"
        },
        {
            surah: 14, ayah: "7",
            theme: "📈 Gratitude & Growth",
            surahName: "Ibrahim",
            arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
            english: "And [remember] when your Lord proclaimed: 'If you are grateful, I will surely increase you [in favor].'",
            italian: "E ricorda quando il tuo Signore proclamò: «Se sarete riconoscenti, certamente aumenterò la Mia grazia su di voi»."
        },
        {
            surah: 2, ayah: "152",
            theme: "🌿 Mindfulness & Gratitude",
            surahName: "Al-Baqarah",
            arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
            english: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
            italian: "Ricordatevi di Me e Io Mi ricorderò di voi; siatemi riconoscenti e non siate ingrati."
        },
        // Brotherhood & Mutual Support
        {
            surah: 49, ayah: "10",
            theme: "🤝 Brotherhood & Unity",
            surahName: "Al-Hujurat",
            arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ",
            english: "The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.",
            italian: "I credenti sono fratelli: ristabilite dunque la concordia tra i vostri fratelli e temete Allah affinché vi sia usata misericordia."
        },
        {
            surah: 3, ayah: "103",
            theme: "🔗 Holding Together",
            surahName: "Ali 'Imran",
            arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
            english: "And hold firmly to the rope of Allah all together and do not become divided.",
            italian: "E stringetevi tutti insieme alla corda di Allah e non vi dividete."
        },
        {
            surah: 5, ayah: "2",
            theme: "🤝 Cooperation in Good",
            surahName: "Al-Ma'idah",
            arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ",
            english: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
            italian: "Aiutatevi gli uni con gli altri nella virtù e nella pietà, e non sostenetevi nel peccato e nell'ingiustizia."
        },
        // Time & Purpose
        {
            surah: 103, ayah: "1-3",
            theme: "⏳ Value of Time",
            surahName: "Al-'Asr",
            arabic: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
            english: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
            italian: "Per il Tempo! In verità l'essere umano è in perdita, eccetto coloro che credono, compiono il bene e si esortano a vicenda alla verità e alla pazienza."
        }
    ];

    let currentAyahIndex = -1;
    let currentAyahData = null;

    // Deterministic daily Ayah index based on day of the year
    function getDailyAyahIndex() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return dayOfYear % CURATED_STUDENT_AYAT.length;
    }

    function renderCuratedAyah(ayahItem, isShuffle = false) {
        const arabicDisplay = document.getElementById('daily-ayah-arabic');
        const englishDisplay = document.getElementById('daily-ayah-text');
        const ayahRef = document.getElementById('daily-ayah-ref');
        const contentWrap = document.getElementById('daily-ayah-content-wrap');
        const shuffleBtn = document.getElementById('shuffle-ayah-btn');

        if (isShuffle && shuffleBtn) {
            const syncIcon = shuffleBtn.querySelector('.sync-icon');
            if (syncIcon) {
                syncIcon.classList.add('spinning');
                setTimeout(() => syncIcon.classList.remove('spinning'), 700);
            }
        }

        if (contentWrap) {
            contentWrap.style.transition = 'opacity 0.22s ease';
            contentWrap.style.opacity = '0.3';
        }

        setTimeout(() => {
            const isIt = currentLang === 'it';
            const translatedText = (isIt && ayahItem.italian) ? ayahItem.italian : ayahItem.english;
            const surahPrefix = isIt ? 'Sura' : 'Surah';

            currentAyahData = {
                arabic: ayahItem.arabic,
                english: ayahItem.english,
                italian: ayahItem.italian,
                currentTranslation: translatedText,
                surah: ayahItem.surahName,
                ayahNumber: ayahItem.ayah
            };

            if (arabicDisplay) arabicDisplay.textContent = ayahItem.arabic;
            if (englishDisplay) englishDisplay.textContent = `"${translatedText}"`;
            if (ayahRef) ayahRef.textContent = `— ${surahPrefix} ${ayahItem.surahName} (${ayahItem.surah}:${ayahItem.ayah})`;

            if (contentWrap) {
                contentWrap.style.opacity = '1';
            }
        }, isShuffle ? 180 : 0);
    }

    function shuffleCuratedAyah() {
        if (CURATED_STUDENT_AYAT.length <= 1) return;
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * CURATED_STUDENT_AYAT.length);
        } while (nextIndex === currentAyahIndex);
        currentAyahIndex = nextIndex;
        renderCuratedAyah(CURATED_STUDENT_AYAT[currentAyahIndex], true);
    }

    // Initialize daily ayah
    if (document.getElementById('daily-ayah-content-wrap')) {
        currentAyahIndex = getDailyAyahIndex();
        renderCuratedAyah(CURATED_STUDENT_AYAT[currentAyahIndex], false);
    }

    // Wire up Shuffle Ayah Button
    const shuffleAyahBtn = document.getElementById('shuffle-ayah-btn');
    if (shuffleAyahBtn) {
        shuffleAyahBtn.addEventListener('click', () => {
            shuffleCuratedAyah();
        });
    }

    // Wire up Copy Ayah Button
    const copyAyahBtn = document.getElementById('copy-ayah-btn');
    if (copyAyahBtn) {
        copyAyahBtn.addEventListener('click', () => {
            const arabicEl = document.getElementById('daily-ayah-arabic');
            const englishEl = document.getElementById('daily-ayah-text');
            const refEl = document.getElementById('daily-ayah-ref');

            const arabic = arabicEl ? arabicEl.textContent.trim() : '';
            const english = englishEl ? englishEl.textContent.trim() : '';
            const ref = refEl ? refEl.textContent.trim() : '';

            const shareText = `${arabic}\n\n${english}\n${ref}\n\n(ASM POLIMI - https://asmpolimi.it)`;

            copyTextToClipboard(shareText, () => {
                const t = ASM_I18N[currentLang] || ASM_I18N.en;
                showAsmToast(t.ayah_copied_toast || 'Ayah & translation copied to clipboard! 📋');
                const btnText = document.getElementById('copy-ayah-btn-text');
                if (btnText) {
                    btnText.textContent = t.ayah_copied_btn || 'Copied!';
                    setTimeout(() => {
                        btnText.textContent = t.ayah_copy_btn || 'Copy Ayah';
                    }, 2000);
                }
            }, (err) => {
                console.error('Failed to copy Ayah:', err);
            });
        });
    }

    // Form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const year = document.getElementById('year').value;
            const consentCheckbox = document.getElementById('newsletter-gdpr-consent');

            if (consentCheckbox && !consentCheckbox.checked) {
                consentCheckbox.focus();
                alert('Please confirm your GDPR consent to receive association updates before subscribing.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Subscribing...';

            const isLiveDomain = window.location.hostname.includes('asmpolimi.it') || window.location.hostname.endsWith('github.io');
            const endpoints = isLiveDomain
                ? ['https://admin.asmpolimi.it/api/subscribe', '/api/subscribe']
                : ['/api/subscribe', 'https://admin.asmpolimi.it/api/subscribe'];

            let succeeded = false;
            let lastMessage = '';

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, year, consent: true })
                    });
                    if (response.ok) {
                        const result = await response.json();
                        if (result.success) {
                            btn.textContent = result.message || 'Subscribed!';
                            btn.style.backgroundColor = '#047857';
                            btn.style.color = 'white';
                            form.reset();
                            if (consentCheckbox) consentCheckbox.checked = false;
                            succeeded = true;
                            break;
                        } else {
                            lastMessage = result.message || 'Error subscribing.';
                        }
                    }
                } catch (err) {
                    console.warn(`Failed to connect to ${endpoint}:`, err);
                }
            }

            if (!succeeded) {
                alert(lastMessage || 'Unable to complete subscription at this time. Please try again or reach out to us at asm.polimi@gmail.com.');
                btn.textContent = originalText;
            }

            btn.disabled = false;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // GDPR Privacy Modal Controller
    const privacyModal = document.getElementById('privacy-notice-modal');
    if (privacyModal) {
        const openBtns = document.querySelectorAll('.open-privacy-modal-btn');
        const closeBtns = document.querySelectorAll('.close-privacy-modal-btn');

        function openPrivacyModal(e) {
            if (e && e.preventDefault) e.preventDefault();
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closePrivacyModal(e) {
            if (e && e.preventDefault) e.preventDefault();
            privacyModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        openBtns.forEach(b => b.addEventListener('click', openPrivacyModal));
        closeBtns.forEach(b => b.addEventListener('click', closePrivacyModal));

        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) closePrivacyModal(e);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && privacyModal.classList.contains('active')) {
                closePrivacyModal(e);
            }
        });

        window.openPrivacyModal = openPrivacyModal;
        window.closePrivacyModal = closePrivacyModal;
    }

    // Qibla Compass Modal & Live Orientation Controller
    const qiblaModal = document.getElementById('qibla-modal');
    if (qiblaModal) {
        const openQiblaBtns = document.querySelectorAll('.open-qibla-modal-btn');
        const closeQiblaBtns = document.querySelectorAll('.close-qibla-modal-btn');
        const compassDial = document.getElementById('compass-dial-ring');
        const sensorMsg = document.getElementById('qibla-sensor-text');
        const recalibrateBtn = document.getElementById('btn-recalibrate-compass');

        let sensorActive = false;
        let orientationHandler = null;
        let currentListenerType = null;
        let currentDialRotation = 0; // Continuous angle tracking to prevent 360° whip spin

        // Screen orientation helper (portrait vs landscape)
        const getScreenOrientationAngle = () => {
            if (screen.orientation && typeof screen.orientation.angle === 'number') {
                return screen.orientation.angle;
            }
            if (typeof window.orientation === 'number') {
                return window.orientation;
            }
            return 0;
        };

        // 3D Tilt Compensation for Android alpha/beta/gamma
        const computeCompassHeading = (alpha, beta, gamma) => {
            if (alpha === null) return null;
            // When flat or near-flat
            if (Math.abs(beta || 0) < 6 && Math.abs(gamma || 0) < 6) {
                return (360 - alpha) % 360;
            }

            const degToRad = Math.PI / 180;
            const radToDeg = 180 / Math.PI;

            const x = (beta || 0) * degToRad; // pitch
            const y = (gamma || 0) * degToRad; // roll
            const z = (alpha || 0) * degToRad; // yaw

            const cX = Math.cos(x);
            const cY = Math.cos(y);
            const cZ = Math.cos(z);
            const sX = Math.sin(x);
            const sY = Math.sin(y);
            const sZ = Math.sin(z);

            // Device pointing vector components
            const Vx = -cZ * sY - sZ * sX * cY;
            const Vy = -sZ * sY + cZ * sX * cY;

            let heading = Math.atan2(Vx, Vy) * radToDeg;
            if (heading < 0) heading += 360;
            return heading;
        };

        // Smooth continuous dial rotation (shortest path interpolation)
        const setDialHeading = (heading) => {
            if (!compassDial) return;
            const target = -heading;
            let diff = (target - currentDialRotation) % 360;
            if (diff < -180) diff += 360;
            if (diff > 180) diff -= 360;
            currentDialRotation += diff;
            compassDial.style.transform = `rotate(${currentDialRotation}deg)`;
        };

        const stopSensor = () => {
            if (orientationHandler && currentListenerType) {
                window.removeEventListener(currentListenerType, orientationHandler, true);
            }
            // Also ensure regular deviceorientation is cleared
            if (orientationHandler) {
                window.removeEventListener('deviceorientation', orientationHandler, true);
                window.removeEventListener('deviceorientationabsolute', orientationHandler, true);
            }
            orientationHandler = null;
            currentListenerType = null;
            sensorActive = false;
        };

        const startSensor = async () => {
            stopSensor();

            const setupOrientationListener = () => {
                orientationHandler = (event) => {
                    let heading = null;

                    // 1. iOS True North (webkitCompassHeading)
                    if (typeof event.webkitCompassHeading !== 'undefined' && event.webkitCompassHeading !== null) {
                        heading = event.webkitCompassHeading;
                    }
                    // 2. Android deviceorientationabsolute or absolute alpha
                    else if (event.alpha !== null) {
                        const isAbsolute = Boolean(event.absolute || currentListenerType === 'deviceorientationabsolute');
                        if (isAbsolute) {
                            heading = computeCompassHeading(event.alpha, event.beta, event.gamma);
                        } else {
                            heading = (360 - event.alpha) % 360;
                        }
                    }

                    if (heading !== null && !isNaN(heading)) {
                        const screenAngle = getScreenOrientationAngle();
                        heading = (heading + screenAngle + 360) % 360;

                        setDialHeading(heading);

                        if (sensorMsg) {
                            const diff = Math.abs((heading - 124 + 360) % 360);
                            const currentLang = window.currentLang || localStorage.getItem('site_lang') || 'en';
                            const isIt = currentLang === 'it';
                            if (diff < 7 || diff > 353) {
                                sensorMsg.innerHTML = `<strong style="color: #10b981;">🕋 ${isIt ? 'Allineato con la Qibla! Sei rivolto verso la Mecca.' : 'Aligned with Qibla! Facing Makkah.'}</strong>`;
                            } else {
                                const rounded = Math.round(heading);
                                sensorMsg.textContent = isIt 
                                    ? `Ruota il telefono finché la Kaaba 🕋 non punta in alto (${rounded}°)`
                                    : `Turn phone until 🕋 Kaaba aligns with the top (${rounded}°)`;
                            }
                        }
                    }
                };

                // Determine whether to use deviceorientationabsolute (Android Chrome) or deviceorientation
                if ('ondeviceorientationabsolute' in window) {
                    currentListenerType = 'deviceorientationabsolute';
                    window.addEventListener('deviceorientationabsolute', orientationHandler, true);
                } else {
                    currentListenerType = 'deviceorientation';
                    window.addEventListener('deviceorientation', orientationHandler, true);
                }

                sensorActive = true;
                if (sensorMsg) {
                    const currentLang = window.currentLang || localStorage.getItem('site_lang') || 'en';
                    sensorMsg.textContent = currentLang === 'it' 
                        ? 'Sensore bussola attivo. Ruota il telefono per allinearti con la Kaaba 🕋.' 
                        : 'Phone compass active. Rotate phone to align with 🕋 Kaaba.';
                }
            };

            // Request permission on iOS 13+ devices
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const response = await DeviceOrientationEvent.requestPermission();
                    if (response === 'granted') {
                        setupOrientationListener();
                    } else if (sensorMsg) {
                        sensorMsg.textContent = 'Fixed mode (124° SE for Milan). Orientation access not granted.';
                    }
                } catch (err) {
                    console.warn('Device orientation permission error:', err);
                    if (sensorMsg) sensorMsg.textContent = 'Fixed compass mode (124° SE for Milan).';
                }
            } else if ('ondeviceorientationabsolute' in window || 'ondeviceorientation' in window || 'DeviceOrientationEvent' in window) {
                setupOrientationListener();
            } else if (sensorMsg) {
                sensorMsg.textContent = 'Fixed compass mode (124° SE for Milan).';
            }
        };

        const recalibrateCompass = () => {
            stopSensor();
            currentDialRotation = 0;
            if (compassDial) compassDial.style.transform = 'rotate(0deg)';
            if (sensorMsg) {
                const currentLang = window.currentLang || localStorage.getItem('site_lang') || 'en';
                sensorMsg.innerHTML = `<span style="color: #0284c7;">🔄 ${currentLang === 'it' ? 'Calibrazione in corso... Tieni il telefono piatto o muovilo a forma di 8.' : 'Calibrating... Hold phone flat or move in a figure-8 motion.'}</span>`;
            }
            setTimeout(() => {
                if (qiblaModal.classList.contains('active')) {
                    startSensor();
                }
            }, 300);
        };

        if (recalibrateBtn) {
            recalibrateBtn.addEventListener('click', recalibrateCompass);
        }

        // Auto-recalibrate upon screen unlock / tab visibility resume
        document.addEventListener('visibilitychange', () => {
            if (!qiblaModal.classList.contains('active')) return;
            if (document.visibilityState === 'visible') {
                // When user unlocks or returns to phone, re-sync sensors cleanly
                recalibrateCompass();
            } else {
                stopSensor();
            }
        });

        function openQiblaModal(e) {
            if (e && e.preventDefault) e.preventDefault();
            qiblaModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentDialRotation = 0;
            startSensor();
        }

        function closeQiblaModal(e) {
            if (e && e.preventDefault) e.preventDefault();
            qiblaModal.classList.remove('active');
            document.body.style.overflow = '';
            stopSensor();
            if (compassDial) compassDial.style.transform = 'rotate(0deg)';
        }

        openQiblaBtns.forEach(btn => btn.addEventListener('click', openQiblaModal));
        closeQiblaBtns.forEach(btn => btn.addEventListener('click', closeQiblaModal));

        qiblaModal.addEventListener('click', (e) => {
            if (e.target === qiblaModal) closeQiblaModal(e);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && qiblaModal.classList.contains('active')) {
                closeQiblaModal(e);
            }
        });
    }

    // Friday Sunnah checklist functionality
    const sunnahList = document.getElementById('sunnah-checklist');
    if (sunnahList) {
        sunnahList.classList.add('checklist');
        const items = sunnahList.querySelectorAll('li');
        const todayStr = new Date().toISOString().split('T')[0]; // Reset checklist daily
        const savedChecksKey = `sunnahs-checked-${todayStr}`;

        // Get saved indexes from localStorage
        let checkedIndexes = [];
        try {
            const saved = localStorage.getItem(savedChecksKey);
            if (saved) {
                checkedIndexes = JSON.parse(saved);
            } else {
                // Clear old keys to save space
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('sunnahs-checked-')) {
                        localStorage.removeItem(key);
                    }
                });
            }
        } catch (e) {
            console.error('Error loading checks', e);
        }

        items.forEach((item, index) => {
            // Apply checked class if loaded from storage
            if (checkedIndexes.includes(index)) {
                item.classList.add('checked');
            }

            // Click listener
            item.addEventListener('click', () => {
                item.classList.toggle('checked');

                // Recalculate checked list
                const currentChecked = [];
                items.forEach((li, idx) => {
                    if (li.classList.contains('checked')) {
                        currentChecked.push(idx);
                    }
                });

                try {
                    localStorage.setItem(savedChecksKey, JSON.stringify(currentChecked));
                } catch (e) {
                    console.error('Error saving checks', e);
                }
            });
        });
    }

    // Gallery Lightbox Modal
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        // Create Lightbox Markup
        const lightbox = document.createElement('div');
        lightbox.id = 'gallery-lightbox';
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-content">
                <div class="lightbox-card">
                    <img class="lightbox-img" src="" alt="Gallery Image">
                    <div class="caption"></div>
                </div>
            </div>
            <a class="lightbox-prev">&#10094;</a>
            <a class="lightbox-next">&#10095;</a>
        `;
        document.body.appendChild(lightbox);

        const caption = lightbox.querySelector('.caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        let currentIndex = 0;

        const openLightbox = (index) => {
            const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
            if (index < 0 || index >= items.length) return;
            currentIndex = index;
            const item = items[index];
            const imgElement = item.querySelector('img');
            const captionText = item.querySelector('.gallery-caption').textContent;

            const lightboxImg = lightbox.querySelector('.lightbox-img');
            if (imgElement && lightboxImg) {
                lightboxImg.src = imgElement.src;
                lightboxImg.alt = imgElement.alt || 'Gallery Image';
            }
            caption.textContent = captionText;

            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        };

        const showNext = (e) => {
            e.stopPropagation();
            const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
            currentIndex = (currentIndex + 1) % items.length;
            openLightbox(currentIndex);
        };

        const showPrev = (e) => {
            e.stopPropagation();
            const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            openLightbox(currentIndex);
        };

        // Use event delegation for click listener on gallery items
        galleryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (!item) return;
            const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
            const index = items.indexOf(item);
            if (index !== -1) {
                openLightbox(index);
            }
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-content').addEventListener('click', (e) => e.stopPropagation());
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext(e);
            if (e.key === 'ArrowLeft') showPrev(e);
        });
    }

    // Hash Scroll highlight animation flash effect
    document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach(anchor => {
        anchor.addEventListener('click', function () {
            const href = this.getAttribute('href');
            const hash = href.includes('#') ? '#' + href.split('#')[1] : null;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    setTimeout(() => {
                        target.classList.add('flash-target-active');
                        setTimeout(() => {
                            target.classList.remove('flash-target-active');
                        }, 1200);
                    }, 500); // delay to align with scroll finish
                }
            }
        });
    });

    // Scroll Animations Observer
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    window.scrollObserver = scrollObserver; // Expose globally for dynamic elements

    // Watch animation elements
    document.querySelectorAll('.fade-in, .fade-in-up, .scale-in, .slide-in-left, .slide-in-right').forEach(el => {
        scrollObserver.observe(el);
    });

    // Stagger layout grids automatically
    document.querySelectorAll('.stagger-children').forEach(container => {
        Array.from(container.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 120}ms`;
            child.classList.add('fade-in-up');
            scrollObserver.observe(child);
        });
    });

    // Universal copy helper with fallback
    function copyTextToClipboard(text, onSuccess, onError) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess).catch(err => {
                fallbackCopy(text, onSuccess, onError);
            });
        } else {
            fallbackCopy(text, onSuccess, onError);
        }
    }

    function fallbackCopy(text, onSuccess, onError) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            if (successful && onSuccess) onSuccess();
            else if (!successful && onError) onError(new Error('execCommand failed'));
        } catch (err) {
            if (onError) onError(err);
        }
    }

    // Click-to-copy badges (Email, PayPal, IBAN, etc. with .copyable-iban)
    document.querySelectorAll('.copyable-iban').forEach(badge => {
        badge.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = badge.getAttribute('data-copy') || badge.childNodes[0].textContent.trim();
            if (!textToCopy) return;

            copyTextToClipboard(textToCopy, () => {
                badge.classList.add('copied');
                setTimeout(() => {
                    badge.classList.remove('copied');
                }, 2000);
            }, (err) => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // Click-to-copy standalone buttons (.copy-btn)
    document.querySelectorAll('.copy-btn:not(.copyable-iban)').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            copyTextToClipboard(textToCopy, () => {
                btn.classList.add('copied');
                const iconCopy = btn.querySelector('.icon-copy');
                const iconCheck = btn.querySelector('.icon-check');
                const copyText = btn.querySelector('.copy-text');
                if (iconCopy) iconCopy.style.display = 'none';
                if (iconCheck) iconCheck.style.display = 'inline-block';
                if (copyText) {
                    btn.dataset.originalText = btn.dataset.originalText || copyText.textContent;
                    copyText.textContent = 'Copied!';
                }

                setTimeout(() => {
                    btn.classList.remove('copied');
                    if (iconCopy) iconCopy.style.display = 'inline-block';
                    if (iconCheck) iconCheck.style.display = 'none';
                    if (copyText && btn.dataset.originalText) {
                        copyText.textContent = btn.dataset.originalText;
                    }
                }, 2000);
            }, (err) => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // Universal Announcement Banner Loader
    async function initAnnouncementBanner() {
        const banner = document.getElementById('announcement-banner');
        const text = document.getElementById('announcement-text');
        if (!banner || !text) return;

        // Give page-specific scripts 120ms to populate if present
        setTimeout(async () => {
            if (text.innerHTML.trim() !== '') return;

            try {
                let data = null;
                for (const url of ['https://admin.asmpolimi.it/api/content', '/api/content', '/data/content.json', 'data/content.json', 'api/content.json']) {
                    try {
                        const res = await fetch(url);
                        if (res.ok) {
                            data = await res.json();
                            break;
                        }
                    } catch (e) { }
                }
                if (data && data.announcement && data.announcement.trim() !== '') {
                    if (text.innerHTML.trim() === '') {
                        text.innerHTML = formatAnnouncementHtml(data.announcement);
                        banner.classList.remove('hidden');
                        banner.style.display = 'block';
                        document.body.classList.add('has-announcement-banner');
                        window.scheduleAnnouncementAutoHide(20000);
                    }
                }
            } catch (err) { }
        }, 120);
    }

    initAnnouncementBanner();
    initCookieConsent();

    // Close announcement banner button
    const closeBannerBtn = document.getElementById('close-announcement-btn');
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            window.hideAnnouncementBanner();
        });
    }

    // Initialize site language from saved preference
    setSiteLanguage(currentLang, false);

});

// Global Auto-hide & Dismiss Controller for Announcement Banner
window.scheduleAnnouncementAutoHide = function (durationMs = 20000) {
    if (window.announcementAutoHideTimer) {
        clearTimeout(window.announcementAutoHideTimer);
    }
    window.announcementAutoHideTimer = setTimeout(() => {
        window.hideAnnouncementBanner();
    }, durationMs);
};

window.hideAnnouncementBanner = function () {
    const banner = document.getElementById('announcement-banner');
    if (!banner || banner.classList.contains('hidden')) return;
    if (window.announcementAutoHideTimer) {
        clearTimeout(window.announcementAutoHideTimer);
        window.announcementAutoHideTimer = null;
    }
    banner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-15px)';
    setTimeout(() => {
        banner.classList.add('hidden');
        banner.style.display = 'none';
        document.body.classList.remove('has-announcement-banner');
    }, 500);
};

// Universal Announcement Link Formatter (supports Markdown links [Text](url), raw URLs, or <a> tags)
function formatAnnouncementHtml(rawText) {
    if (!rawText) return '';
    let text = rawText.trim();

    // Check if it already contains HTML <a> tags
    const hasHtmlLink = /<a\s+[^>]*href=["'][^"']+["'][^>]*>.*?<\/a>/i.test(text);

    if (hasHtmlLink) {
        return text.replace(/<a\s+([^>]*?)href=(["'])(.*?)\2([^>]*)>(.*?)<\/a>/gi, (match, before, quote, href, after, innerText) => {
            const isExternal = href.startsWith('http://') || href.startsWith('https://');
            const targetAttr = isExternal && !/target=/i.test(match) ? ' target="_blank" rel="noopener noreferrer"' : '';
            const classAttr = /class=/i.test(match) ? '' : ' class="announcement-link"';
            return `<a ${before}href="${href}"${classAttr}${targetAttr}${after}>${innerText}</a>`;
        });
    }

    // Escape basic HTML entities to avoid broken tags, but preserve emojis & unicode
    let escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Convert Markdown links: [Label](URL)
    const mdLinkRegex = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    const hasMarkdownLink = mdLinkRegex.test(escaped);
    mdLinkRegex.lastIndex = 0;

    if (hasMarkdownLink) {
        escaped = escaped.replace(mdLinkRegex, (match, label, url) => {
            const cleanUrl = url.trim();
            const isExternal = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');
            const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
            return `<a href="${cleanUrl}" class="announcement-link"${targetAttr}>${label}</a>`;
        });
    } else {
        // Smart fallback: If admin didn't use brackets, automatically link "JOIN US" or "Join Us" to /register
        const joinUsRegex = /\b(JOIN\s+US|Join\s+Us|join\s+us)\b/gi;
        escaped = escaped.replace(joinUsRegex, (match) => {
            return `<a href="/register" class="announcement-link">${match}</a>`;
        });
    }

    // Auto-link standalone URLs not preceded by href="
    const standaloneUrlRegex = /(^|[\s])(https?:\/\/[^\s<]+)/g;
    escaped = escaped.replace(standaloneUrlRegex, (match, space, url) => {
        return `${space}<a href="${url}" class="announcement-link" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return escaped;
}
window.formatAnnouncementHtml = formatAnnouncementHtml;



// -------------------------------------------------------------------------
// GDPR Cookie Consent Controller
// -------------------------------------------------------------------------
const GA_ID = 'G-8N5B01YCZ4';

window.getCookieConsent = function () {
    return localStorage.getItem('asm_cookie_consent'); // 'accepted' | 'declined' | null
};

window.setCookieConsent = function (status) {
    if (status !== 'accepted' && status !== 'declined') return;
    localStorage.setItem('asm_cookie_consent', status);

    if (status === 'accepted') {
        window['ga-disable-' + GA_ID] = false;
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            gtag('event', 'cookie_consent_accepted');
        }
    } else {
        window['ga-disable-' + GA_ID] = true;
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    window.hideCookieBanner();

    if (typeof window.refreshCookiePreferencesWidget === 'function') {
        window.refreshCookiePreferencesWidget();
    }
};

window.resetCookieConsent = function () {
    localStorage.removeItem('asm_cookie_consent');
    window['ga-disable-' + GA_ID] = true;
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
    window.showCookieBanner();
    if (typeof window.refreshCookiePreferencesWidget === 'function') {
        window.refreshCookiePreferencesWidget();
    }
};

window.showCookieBanner = function () {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.style.display = 'block';
    }
};

window.hideCookieBanner = function () {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.style.display = 'none';
    }
};

function initCookieConsent() {
    const consent = window.getCookieConsent();
    const btnAccept = document.getElementById('btn-cookie-accept');
    const btnDecline = document.getElementById('btn-cookie-decline');

    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            window.setCookieConsent('accepted');
        });
    }

    if (btnDecline) {
        btnDecline.addEventListener('click', () => {
            window.setCookieConsent('declined');
        });
    }

    // If consent hasn't been chosen yet, show banner after a small delay
    if (!consent) {
        setTimeout(() => {
            window.showCookieBanner();
        }, 600);
    }
}
