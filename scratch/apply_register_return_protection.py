with open('templates/register.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update goToStep and add draft & history helpers
old_go_to_step = '''    function goToStep(step) {
        const step1 = document.getElementById('step-1-language');
        const step2 = document.getElementById('step-2-overview');
        const step3 = document.getElementById('step-3-personal');
        const step4 = document.getElementById('step-4-teams');
        const step5 = document.getElementById('step-5-payment');
        const stepSuccess = document.getElementById('page-success');

        [step1, step2, step3, step4, step5, stepSuccess].forEach(el => {
            if (el) el.classList.add('hidden');
        });

        // Update stepper indicators
        for (let i = 1; i <= 5; i++) {
            const item = document.getElementById(`stepper-step-${i}`);
            if (!item) continue;
            if (i < step) {
                item.className = 'step-item completed';
            } else if (i === step) {
                item.className = 'step-item active';
            } else {
                item.className = 'step-item';
            }
        }

        if (step === 1) step1.classList.remove('hidden');
        if (step === 2) step2.classList.remove('hidden');
        if (step === 3) step3.classList.remove('hidden');
        if (step === 4) step4.classList.remove('hidden');
        if (step === 5) step5.classList.remove('hidden');
        if (step === 6) {
            stepSuccess.classList.remove('hidden');
            for (let i = 1; i <= 5; i++) {
                const item = document.getElementById(`stepper-step-${i}`);
                if (item) item.className = 'step-item completed';
            }
        }

        window.scrollTo({ top: 120, behavior: 'smooth' });
    }'''

new_go_to_step = '''    let currentStep = 1;
    let isFormSubmitted = false;

    // Checks if the user has written any personal information
    function hasWrittenData() {
        const fn = document.getElementById('app-fullname')?.value?.trim() || '';
        const mat = document.getElementById('app-matricola')?.value?.trim() || '';
        const em = document.getElementById('app-email')?.value?.trim() || '';
        const ph = document.getElementById('app-phone')?.value?.trim() || '';
        const co = document.getElementById('app-course')?.value?.trim() || '';
        const cm = document.getElementById('app-comments')?.value?.trim() || '';
        return !!(fn || mat || em || (ph && ph !== '+39' && ph !== '+39 ') || co || cm);
    }

    // Persists written inputs automatically so data is never lost on refresh or accidental back
    function saveDraft() {
        if (isFormSubmitted) return;
        try {
            const draft = {
                step: currentStep,
                lang: currentLang,
                text: {
                    fullname: document.getElementById('app-fullname')?.value || '',
                    matricola: document.getElementById('app-matricola')?.value || '',
                    email: document.getElementById('app-email')?.value || '',
                    phone: document.getElementById('app-phone')?.value || '',
                    course: document.getElementById('app-course')?.value || '',
                    skillOther: document.getElementById('app-skill-other')?.value || '',
                    teamOther: document.getElementById('app-team-other')?.value || '',
                    comments: document.getElementById('app-comments')?.value || '',
                    keychainName: document.getElementById('app-keychain-name')?.value || '',
                    keychainManual: document.getElementById('app-keychain-name')?.dataset?.manual || 'false'
                },
                radios: {},
                checkboxes: {}
            };

            ['course_level', 'volunteer_translator', 'payment_method'].forEach(name => {
                const checked = document.querySelector(`input[name="${name}"]:checked`);
                if (checked) draft.radios[name] = checked.value;
            });

            document.querySelectorAll('#membership-form input[type="checkbox"]').forEach(cb => {
                if (cb.id) {
                    draft.checkboxes[cb.id] = cb.checked;
                } else if (cb.name && cb.value) {
                    draft.checkboxes[`${cb.name}_${cb.value}`] = cb.checked;
                }
            });

            sessionStorage.setItem('asm_membership_draft', JSON.stringify(draft));
        } catch (e) { }
    }

    // Restores written inputs if the user returns to the page
    function restoreDraft() {
        try {
            const raw = sessionStorage.getItem('asm_membership_draft');
            if (!raw) return;
            const draft = JSON.parse(raw);
            if (!draft) return;

            if (draft.lang && (draft.lang === 'en' || draft.lang === 'it')) {
                currentLang = draft.lang;
                applyTranslations(currentLang);
            }

            if (draft.text) {
                const setVal = (id, val) => {
                    const el = document.getElementById(id);
                    if (el && val !== undefined) el.value = val;
                };
                setVal('app-fullname', draft.text.fullname);
                setVal('app-matricola', draft.text.matricola);
                setVal('app-email', draft.text.email);
                setVal('app-phone', draft.text.phone);
                setVal('app-course', draft.text.course);
                setVal('app-skill-other', draft.text.skillOther);
                setVal('app-team-other', draft.text.teamOther);
                setVal('app-comments', draft.text.comments);

                const kn = document.getElementById('app-keychain-name');
                if (kn && draft.text.keychainName) {
                    kn.value = draft.text.keychainName;
                    if (draft.text.keychainManual) kn.dataset.manual = draft.text.keychainManual;
                }
            }

            if (draft.radios) {
                Object.keys(draft.radios).forEach(name => {
                    const val = draft.radios[name];
                    const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
                    if (radio) {
                        radio.checked = true;
                        const label = radio.closest('.choice-card-label');
                        if (label) updateChoiceStyle(label);
                    }
                });
            }

            if (draft.checkboxes) {
                Object.keys(draft.checkboxes).forEach(k => {
                    const checked = draft.checkboxes[k];
                    let cb = document.getElementById(k);
                    if (!cb && k.includes('_')) {
                        const parts = k.split('_');
                        const name = parts[0];
                        const val = parts.slice(1).join('_');
                        cb = document.querySelector(`input[name="${name}"][value="${val}"]`);
                    }
                    if (cb) {
                        cb.checked = checked;
                        const label = cb.closest('.choice-card-label');
                        if (label) {
                            if (checked) label.classList.add('selected');
                            else label.classList.remove('selected');
                        }
                    }
                });
            }

            if (draft.step && draft.step > 1 && draft.step < 6) {
                goToStep(draft.step, false);
            }
        } catch (e) { }
    }

    function goToStep(step, pushHistory = true) {
        currentStep = step;
        saveDraft();

        if (pushHistory && step !== 1) {
            // Push history state so the browser/phone "Return / Back" button navigates steps instead of leaving the site
            if (!window.history.state || window.history.state.step !== step) {
                window.history.pushState({ step: step }, '', window.location.href);
            }
        }

        const step1 = document.getElementById('step-1-language');
        const step2 = document.getElementById('step-2-overview');
        const step3 = document.getElementById('step-3-personal');
        const step4 = document.getElementById('step-4-teams');
        const step5 = document.getElementById('step-5-payment');
        const stepSuccess = document.getElementById('page-success');

        [step1, step2, step3, step4, step5, stepSuccess].forEach(el => {
            if (el) el.classList.add('hidden');
        });

        // Update stepper indicators
        for (let i = 1; i <= 5; i++) {
            const item = document.getElementById(`stepper-step-${i}`);
            if (!item) continue;
            if (i < step) {
                item.className = 'step-item completed';
            } else if (i === step) {
                item.className = 'step-item active';
            } else {
                item.className = 'step-item';
            }
        }

        if (step === 1 && step1) step1.classList.remove('hidden');
        if (step === 2 && step2) step2.classList.remove('hidden');
        if (step === 3 && step3) step3.classList.remove('hidden');
        if (step === 4 && step4) step4.classList.remove('hidden');
        if (step === 5 && step5) step5.classList.remove('hidden');
        if (step === 6) {
            if (stepSuccess) stepSuccess.classList.remove('hidden');
            for (let i = 1; i <= 5; i++) {
                const item = document.getElementById(`stepper-step-${i}`);
                if (item) item.className = 'step-item completed';
            }
        }

        window.scrollTo({ top: 120, behavior: 'smooth' });
    }'''

# Normalize newlines for matching
is_crlf = '\r\n' in content
c_old = old_go_to_step.replace('\n', '\r\n') if is_crlf else old_go_to_step
c_new = new_go_to_step.replace('\n', '\r\n') if is_crlf else new_go_to_step

if c_old in content:
    content = content.replace(c_old, c_new)
    print("Replaced goToStep successfully")
else:
    print("Could not find old_go_to_step")

# 2. Add popstate, beforeunload, enter key listener, input autosave, and restoreDraft in DOMContentLoaded
old_dom_content = '''    // Initialize listeners on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        loadFeeSetting();'''

new_dom_content = '''    // Intercept Browser/Mobile Return (Back) Button to prevent losing written data
    window.addEventListener('popstate', (e) => {
        if (isFormSubmitted) return;
        const targetStep = (e.state && e.state.step) ? e.state.step : 1;

        // Warn if user has typed info and accidentally tries to exit completely back to start
        if (currentStep > 2 && targetStep === 1 && hasWrittenData()) {
            const confirmMsg = currentLang === 'it'
                ? "Hai inserito dei dati nella domanda di iscrizione. Vuoi davvero tornare alla schermata iniziale?"
                : "You have written information in the application. Are you sure you want to return to the start?";
            if (!confirm(confirmMsg)) {
                window.history.pushState({ step: currentStep }, '', window.location.href);
                return;
            }
        }
        goToStep(targetStep, false);
    });

    // Prevent accidental tab close, page refresh, or navigation if data is written
    window.addEventListener('beforeunload', (e) => {
        if (!isFormSubmitted && hasWrittenData()) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });

    // Initialize listeners on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        loadFeeSetting();

        // Establish initial browser history state for seamless Return button stepping
        window.history.replaceState({ step: 1 }, '', window.location.href);

        // Restore any written draft if user refreshed or navigated back
        restoreDraft();

        // Listen for all input/change events to auto-save written data in real-time
        const membershipForm = document.getElementById('membership-form');
        if (membershipForm) {
            membershipForm.addEventListener('input', () => saveDraft());
            membershipForm.addEventListener('change', () => saveDraft());

            // Prevent keyboard Enter / Return key on inputs from accidentally submitting or clearing the form
            membershipForm.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') {
                    e.preventDefault();
                    if (e.target.id === 'app-course') {
                        proceedToStep4();
                        return;
                    }
                    const inputs = Array.from(membershipForm.querySelectorAll('input:not([type="hidden"]), select, textarea'))
                        .filter(el => !el.disabled && el.offsetParent !== null);
                    const idx = inputs.indexOf(e.target);
                    if (idx > -1 && idx + 1 < inputs.length) {
                        inputs[idx + 1].focus();
                    }
                }
            });
        }'''

c_old_dom = old_dom_content.replace('\n', '\r\n') if is_crlf else old_dom_content
c_new_dom = new_dom_content.replace('\n', '\r\n') if is_crlf else new_dom_content

if c_old_dom in content:
    content = content.replace(c_old_dom, c_new_dom)
    print("Replaced DOMContentLoaded successfully")
else:
    print("Could not find old_dom_content")

# 3. Handle draft cleanup on submit success and resetFormToStart
old_submit_success = '''            goToStep(6);
        } else {'''

new_submit_success = '''            isFormSubmitted = true;
            try { sessionStorage.removeItem('asm_membership_draft'); } catch (e) {}
            goToStep(6);
        } else {'''

c_old_succ = old_submit_success.replace('\n', '\r\n') if is_crlf else old_submit_success
c_new_succ = new_submit_success.replace('\n', '\r\n') if is_crlf else new_submit_success

if c_old_succ in content:
    content = content.replace(c_old_succ, c_new_succ)
    print("Replaced submit success successfully")
else:
    print("Could not find old_submit_success")

old_reset = '''    function resetFormToStart() {
        document.getElementById('membership-form').reset();'''

new_reset = '''    function resetFormToStart() {
        isFormSubmitted = false;
        try { sessionStorage.removeItem('asm_membership_draft'); } catch (e) {}
        document.getElementById('membership-form').reset();'''

c_old_rst = old_reset.replace('\n', '\r\n') if is_crlf else old_reset
c_new_rst = new_reset.replace('\n', '\r\n') if is_crlf else new_reset

if c_old_rst in content:
    content = content.replace(c_old_rst, c_new_rst)
    print("Replaced resetFormToStart successfully")
else:
    print("Could not find old_reset")

with open('templates/register.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished updating templates/register.html")

