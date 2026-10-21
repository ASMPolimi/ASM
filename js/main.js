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
            const formatTime = (time24) => {
                const [hours, minutes] = time24.split(':');
                const h = parseInt(hours, 10);
                const ampm = h >= 12 ? 'PM' : 'AM';
                const h12 = h % 12 || 12;
                return `${h12}:${minutes} ${ampm}`;
            };

            const fajrEl = document.getElementById('fajr-time');
            if (fajrEl) fajrEl.textContent = formatTime(timings.Fajr);
            const dhuhrEl = document.getElementById('dhuhr-time');
            if (dhuhrEl) dhuhrEl.textContent = formatTime(timings.Dhuhr);
            const asrEl = document.getElementById('asr-time');
            if (asrEl) asrEl.textContent = formatTime(timings.Asr);
            const maghribEl = document.getElementById('maghrib-time');
            if (maghribEl) maghribEl.textContent = formatTime(timings.Maghrib);
            const ishaEl = document.getElementById('isha-time');
            if (ishaEl) ishaEl.textContent = formatTime(timings.Isha);

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

    // Fetch daily Ayah using AlQuran API with Shuffle and Copy support
    let currentAyahData = null;

    async function fetchDailyAyah(isShuffle = false) {
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
            contentWrap.style.transition = 'opacity 0.2s ease';
            contentWrap.style.opacity = '0.4';
        }

        try {
            // Get a random ayah between 1 and 6236
            const randomAyah = Math.floor(Math.random() * 6236) + 1;
            const response = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/editions/quran-uthmani,en.asad`);
            const result = await response.json();

            if (result && result.data && result.data.length === 2) {
                const arabicData = result.data[0];
                const englishData = result.data[1];

                const arabicText = arabicData.text;
                const englishText = englishData.text;
                const surahName = englishData.surah.englishName;
                const ayahNumber = englishData.numberInSurah;

                currentAyahData = {
                    arabic: arabicText,
                    english: englishText,
                    surah: surahName,
                    ayahNumber: ayahNumber
                };

                if (arabicDisplay) arabicDisplay.textContent = arabicText;
                if (englishDisplay) englishDisplay.textContent = `"${englishText}"`;
                if (ayahRef) ayahRef.textContent = `— Surah ${surahName} (${ayahNumber})`;
            }
        } catch (error) {
            console.error('Error fetching Ayah:', error);
            if (englishDisplay) englishDisplay.textContent = '"Verily, with hardship comes ease."';
            if (ayahRef) ayahRef.textContent = '— Surah Ash-Sharh (94:6)';
        } finally {
            if (contentWrap) {
                contentWrap.style.opacity = '1';
            }
        }
    }

    fetchDailyAyah();

    // Wire up Shuffle Ayah Button
    const shuffleAyahBtn = document.getElementById('shuffle-ayah-btn');
    if (shuffleAyahBtn) {
        shuffleAyahBtn.addEventListener('click', () => {
            fetchDailyAyah(true);
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
