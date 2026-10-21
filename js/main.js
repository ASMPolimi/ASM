// Clean URLs: automatically strip .html from browser address bar
if (window.location.protocol.startsWith('http') && window.location.pathname.endsWith('.html')) {
    const cleanPath = window.location.pathname.replace(/\.html$/, '');
    const finalPath = (cleanPath === '/index' || cleanPath === 'index') ? '/' : cleanPath;
    window.history.replaceState(null, '', finalPath + window.location.search + window.location.hash);
}

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
            themeToggle.style.cssText = 'background: none; border: none; font-size: 1.25rem; cursor: pointer; margin-left: 1rem; color: var(--color-text-light); transition: color 0.2s;';
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

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
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

    // Dynamic Admin links for mobile navigation
    const mobileNavLinksContainer = document.querySelector('.mobile-nav-links');
    if (mobileNavLinksContainer) {
        // Add theme toggle to mobile navigation menu (above admin lines)
        const mobileThemeToggle = createThemeToggle(true);
        mobileThemeToggle.style.marginTop = '0.5rem';
        mobileNavLinksContainer.appendChild(mobileThemeToggle);

        const divider = document.createElement('div');
        divider.style.cssText = 'border-top: 1px solid rgba(255, 255, 255, 0.2); margin: 0.5rem 0; width: 100%;';
        mobileNavLinksContainer.appendChild(divider);

        const adminLinks = [
            { text: 'Admin: Events', href: 'https://admin.asmpolimi.it/admin' },
            { text: 'Admin: Members & Mailing', href: 'https://admin.asmpolimi.it/admin_members' },
            { text: "Admin: Jumu'ah", href: 'https://admin.asmpolimi.it/admin_jumuah' },
            { text: 'Admin: Questions', href: 'https://admin.asmpolimi.it/admin_questions' },
            { text: 'Admin: Users', href: 'https://admin.asmpolimi.it/admin_users' }
        ];

        adminLinks.forEach(linkInfo => {
            const a = document.createElement('a');
            a.href = linkInfo.href;
            a.textContent = linkInfo.text;
            a.style.cssText = 'font-size: 1.1rem; opacity: 0.8;';
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
                    countdownStr = 'Now';
                } else if (diffMinutes > 0) {
                    const hours = Math.floor(diffMinutes / 60);
                    const mins = diffMinutes % 60;
                    countdownStr = hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins}m`;
                } else {
                    countdownStr = 'Soon';
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

            updatePrayerCountdownAndHighlights();

            // Keep countdown live every 30 seconds
            if (window._prayerTickerInterval) clearInterval(window._prayerTickerInterval);
            window._prayerTickerInterval = setInterval(updatePrayerCountdownAndHighlights, 30000);
        };

        try {
            // Fetch cached prayer times from backend API or fallback to direct Aladhan API for static hosting
            let timings = null;
            try {
                const response = await fetch('/api/prayer_times');
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.success && result.data) timings = result.data;
                }
            } catch (e) {}

            if (!timings) {
                // Direct call for GitHub Pages / static hosting
                const directRes = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Milan&country=Italy&method=2');
                if (directRes.ok) {
                    const directData = await directRes.json();
                    if (directData && directData.data && directData.data.timings) {
                        timings = directData.data.timings;
                    }
                }
            }

            if (timings) {
                updatePrayerUI(timings);
            } else {
                updatePrayerUI(defaultTimings);
            }
        } catch (error) {
            console.warn('Error fetching live prayer times, using Milan defaults:', error);
            updatePrayerUI(defaultTimings);
        }
    }

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
            english: "And say: 'My Lord, increase me in knowledge.'"
        },
        {
            surah: 39, ayah: "9",
            theme: "💡 Wisdom & Reflection",
            surahName: "Az-Zumar",
            arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
            english: "Say: 'Are those who know equal to those who do not know?' Only they will remember who are people of understanding."
        },
        {
            surah: 58, ayah: "11",
            theme: "🎓 Status of Knowledge",
            surahName: "Al-Mujadila",
            arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
            english: "Allah will raise those who have believed among you and those who were given knowledge, by degrees."
        },
        {
            surah: 96, ayah: "1-5",
            theme: "🖋️ Seeking Knowledge",
            surahName: "Al-Alaq",
            arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
            english: "Recite in the name of your Lord who created... taught by the pen, taught man that which he knew not."
        },
        // Effort, Hardship & Perseverance (Exams & Studies)
        {
            surah: 94, ayah: "5-6",
            theme: "🌱 Perseverance & Ease",
            surahName: "Ash-Sharh",
            arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
            english: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease."
        },
        {
            surah: 53, ayah: "39-40",
            theme: "🎯 Dedication & Effort",
            surahName: "An-Najm",
            arabic: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ۝ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ",
            english: "And that there is not for man except that [good] for which he strives, and that his effort is going to be seen."
        },
        {
            surah: 2, ayah: "286",
            theme: "💪 Inner Strength",
            surahName: "Al-Baqarah",
            arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
            english: "Allah does not burden a soul beyond that it can bear."
        },
        {
            surah: 2, ayah: "153",
            theme: "🤲 Patience & Prayer",
            surahName: "Al-Baqarah",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
            english: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient."
        },
        {
            surah: 3, ayah: "200",
            theme: "🏆 Steadfastness",
            surahName: "Ali 'Imran",
            arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
            english: "O you who have believed, persevere and endure and remain steadfast and conscious of Allah that you may succeed."
        },
        {
            surah: 3, ayah: "139",
            theme: "✨ Resilience & Dignity",
            surahName: "Ali 'Imran",
            arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
            english: "So do not weaken and do not grieve, and you will be superior if you are [true] believers."
        },
        // Tawakkul & Overcoming Academic Anxiety
        {
            surah: 65, ayah: "3",
            theme: "🛡️ Trust in Allah (Tawakkul)",
            surahName: "At-Talaq",
            arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
            english: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose."
        },
        {
            surah: 3, ayah: "159",
            theme: "🎯 Focus & Reliance",
            surahName: "Ali 'Imran",
            arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
            english: "And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him]."
        },
        {
            surah: 13, ayah: "28",
            theme: "🕊️ Inner Peace",
            surahName: "Ar-Ra'd",
            arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
            english: "Those who believe and whose hearts find rest in the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts find peace."
        },
        {
            surah: 2, ayah: "186",
            theme: "🤲 Divine Nearness",
            surahName: "Al-Baqarah",
            arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
            english: "And when My servants ask you concerning Me - indeed I am near. I respond to the call of the caller when he calls upon Me."
        },
        {
            surah: 3, ayah: "173",
            theme: "🛡️ Supreme Protector",
            surahName: "Ali 'Imran",
            arabic: "الَّذِينَ قَالَ لَهُمُ النَّاسُ إِنَّ النَّاسَ قَدْ جَمَعُوا لَكُمْ فَاخْشَوْهُمْ فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
            english: "Sufficient for us is Allah, and [He is] the best Disposer of affairs."
        },
        // Dua for Mental Clarity & Academic Success
        {
            surah: 20, ayah: "25-28",
            theme: "📖 Dua for Clarity & Ease",
            surahName: "Taha",
            arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي",
            english: "My Lord, expand for me my chest [with assurance], and ease for me my task, and untie the knot from my tongue that they may understand my speech."
        },
        {
            surah: 2, ayah: "201",
            theme: "⚖️ Balanced Success",
            surahName: "Al-Baqarah",
            arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            english: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire."
        },
        // Hope & Relief
        {
            surah: 93, ayah: "3-5",
            theme: "🌅 Brighter Tomorrow",
            surahName: "Ad-Duha",
            arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
            english: "Your Lord has not forsaken you, nor has He detested. And what is to come is better for you than what has passed. And your Lord is going to give you, and you will be well-pleased."
        },
        {
            surah: 39, ayah: "53",
            theme: "💖 Boundless Mercy",
            surahName: "Az-Zumar",
            arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
            english: "Say: 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.'"
        },
        // Excellence (Ihsan) & Gratitude
        {
            surah: 18, ayah: "30",
            theme: "🌟 Excellence (Ihsan)",
            surahName: "Al-Kahf",
            arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا",
            english: "Indeed, those who have believed and done righteous deeds - We will not allow to be lost the reward of any who did well in deeds."
        },
        {
            surah: 55, ayah: "60",
            theme: "✨ Goodness Rewarded",
            surahName: "Ar-Rahman",
            arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ",
            english: "Is the reward for goodness [anything] other than goodness?"
        },
        {
            surah: 14, ayah: "7",
            theme: "📈 Gratitude & Growth",
            surahName: "Ibrahim",
            arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
            english: "And [remember] when your Lord proclaimed: 'If you are grateful, I will surely increase you [in favor].'"
        },
        {
            surah: 2, ayah: "152",
            theme: "🌿 Mindfulness & Gratitude",
            surahName: "Al-Baqarah",
            arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
            english: "So remember Me; I will remember you. And be grateful to Me and do not deny Me."
        },
        // Brotherhood & Mutual Support
        {
            surah: 49, ayah: "10",
            theme: "🤝 Brotherhood & Unity",
            surahName: "Al-Hujurat",
            arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ",
            english: "The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy."
        },
        {
            surah: 3, ayah: "103",
            theme: "🔗 Holding Together",
            surahName: "Ali 'Imran",
            arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
            english: "And hold firmly to the rope of Allah all together and do not become divided."
        },
        {
            surah: 5, ayah: "2",
            theme: "🤝 Cooperation in Good",
            surahName: "Al-Ma'idah",
            arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ",
            english: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression."
        },
        // Time & Purpose
        {
            surah: 103, ayah: "1-3",
            theme: "⏳ Value of Time",
            surahName: "Al-'Asr",
            arabic: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
            english: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience."
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
            currentAyahData = {
                arabic: ayahItem.arabic,
                english: ayahItem.english,
                surah: ayahItem.surahName,
                ayahNumber: ayahItem.ayah
            };

            if (arabicDisplay) arabicDisplay.textContent = ayahItem.arabic;
            if (englishDisplay) englishDisplay.textContent = `"${ayahItem.english}"`;
            if (ayahRef) ayahRef.textContent = `— Surah ${ayahItem.surahName} (${ayahItem.surah}:${ayahItem.ayah})`;

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
                showAsmToast('Ayah & translation copied to clipboard! 📋');
                const btnText = document.getElementById('copy-ayah-btn-text');
                if (btnText) {
                    btnText.textContent = 'Copied!';
                    setTimeout(() => { btnText.textContent = 'Copy Ayah'; }, 2000);
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
        let sensorActive = false;
        let orientationHandler = null;

        const startSensor = async () => {
            const setupOrientationListener = () => {
                if (orientationHandler) {
                    window.removeEventListener('deviceorientation', orientationHandler, true);
                }
                orientationHandler = (event) => {
                    let heading = null;
                    if (typeof event.webkitCompassHeading !== 'undefined') {
                        heading = event.webkitCompassHeading; // iOS True North heading
                    } else if (event.alpha !== null) {
                        heading = (360 - event.alpha) % 360; // Android approximation
                    }

                    if (heading !== null && compassDial) {
                        compassDial.style.transform = `rotate(${-heading}deg)`;
                        if (sensorMsg) {
                            const diff = Math.abs((heading - 124 + 360) % 360);
                            if (diff < 8 || diff > 352) {
                                sensorMsg.innerHTML = '<strong style="color: #10b981;">Aligned with Qibla! 🕋 Facing Makkah.</strong>';
                            } else {
                                sensorMsg.textContent = `Turn phone until 🕋 Kaaba aligns with the top (${Math.round(heading)}°)`;
                            }
                        }
                    }
                };

                window.addEventListener('deviceorientation', orientationHandler, true);
                sensorActive = true;
                if (sensorMsg) {
                    sensorMsg.textContent = 'Phone sensor active. Rotate phone to align with 🕋 Kaaba.';
                }
            };

            // Request permission if needed (iOS 13+)
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const response = await DeviceOrientationEvent.requestPermission();
                    if (response === 'granted') {
                        setupOrientationListener();
                    } else if (sensorMsg) {
                        sensorMsg.textContent = 'Fixed mode (124° SE for Milan). Orientation access not granted.';
                    }
                } catch (err) {
                    console.warn('Device orientation error:', err);
                    if (sensorMsg) sensorMsg.textContent = 'Fixed compass mode (124° SE for Milan).';
                }
            } else if ('ondeviceorientation' in window || 'DeviceOrientationEvent' in window) {
                setupOrientationListener();
            } else if (sensorMsg) {
                sensorMsg.textContent = 'Fixed compass mode (124° SE for Milan).';
            }
        };

        const stopSensor = () => {
            if (sensorActive && orientationHandler) {
                window.removeEventListener('deviceorientation', orientationHandler, true);
                orientationHandler = null;
                sensorActive = false;
            }
            if (compassDial) compassDial.style.transform = 'rotate(0deg)';
            if (sensorMsg) sensorMsg.textContent = 'Align phone until the 🕋 Kaaba points to the top.';
        };

        function openQiblaModal(e) {
            if (e && e.preventDefault) e.preventDefault();
            qiblaModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            startSensor();
        }

        function closeQiblaModal(e) {
            if (e && e.preventDefault) e.preventDefault();
            qiblaModal.classList.remove('active');
            document.body.style.overflow = '';
            stopSensor();
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

});
