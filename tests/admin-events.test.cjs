const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

function createEditor(file, initialEvents) {
    const source = readFileSync(path.join(__dirname, '..', file), 'utf8');
    const markup = source.replace(/<!--[\s\S]*?-->/g, '').split('{% block extra_scripts %}')[0];
    const elements = new Map([...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => [id, {
        value: '', checked: false, files: [], textContent: '', innerHTML: '',
        classList: { add() {}, remove() {} },
        listeners: {},
        addEventListener(event, callback) { this.listeners[event] = callback; },
        scrollIntoView() {}
    }]));
    const requests = [];
    const messages = [];
    const context = vm.createContext({
        document: { getElementById: id => elements.get(id) || null },
        window: {}, URL, Date, Intl,
        events: structuredClone(initialEvents),
        token: 'test-token', editingEventIndex: null,
        editorCard: elements.get('event-editor-card'),
        editorTitle: elements.get('event-editor-title'),
        btnSubmitEvent: elements.get('btn-submit-event'),
        btnCancelEdit: elements.get('btn-cancel-edit'),
        escapeHtml: value => String(value),
        renderEvents() {},
        showMessage: (...args) => messages.push(args),
        alert: message => { throw new Error(message); },
        fetch: async (url, options) => {
            const body = JSON.parse(options.body);
            requests.push({ url, body });
            return { ok: true, json: async () => ({
                success: true,
                events: body.events.map((event, index) => ({ ...event, id: event.id || 100 + index }))
            }) };
        }
    });
    const status = source.slice(source.indexOf('    function getEventStatus('), source.indexOf('    function isFreeFee('));
    const editor = source.slice(source.indexOf('    function resetEventEditor('), source.indexOf('    // Save All Events'));
    vm.runInContext(status + editor, context);
    return {
        context, elements, requests, messages,
        submit: () => elements.get('btn-submit-event').listeners.click()
    };
}

for (const file of [path.join('templates', 'admin.html'), path.join('asm-admin', 'templates', 'admin.html')]) {
    test(`${file}: loads an existing event and publishes changes without losing its ID or poster`, async () => {
        const event = {
            id: 12, title: 'Existing event', date: 'Friday, Nov 27, 2026',
            time: '6 PM', desc: 'Original description', location: 'Campus',
            agenda: 'Welcome', max_capacity: 40, registration_status: 'soon',
            ask_origin_country: 0, event_image: 'https://admin.example/assets/poster.png'
        };
        const editor = createEditor(file, [event]);
        editor.context.window.editEvent(0);
        assert.equal(editor.elements.get('event-input-desc').value, event.desc);
        assert.equal(editor.elements.get('event-input-date').value, event.date);
        assert.equal(editor.elements.get('event-input-status').value, 'soon');
        assert.equal(editor.elements.get('event-input-ask-origin').checked, false);
        assert.match(editor.elements.get('event-image-preview').innerHTML, /poster\.png/);
        editor.elements.get('event-input-desc').value = 'Updated description';
        await editor.submit();
        const saved = editor.requests[0].body.events[0];
        assert.equal(saved.id, 12);
        assert.equal(saved.desc, 'Updated description');
        assert.equal(saved.event_image, event.event_image);
        assert.equal(saved.date, event.date);
        assert.equal(editor.context.editingEventIndex, null);
        assert.equal(editor.elements.get('event-input-title').value, '');
    });

    test(`${file}: uses server-assigned IDs when publishing another new event`, async () => {
        const editor = createEditor(file, []);
        editor.context.resetEventEditor();
        editor.elements.get('event-input-title').value = 'First event';
        editor.elements.get('event-input-start-datetime').value = '2026-11-27T18:00';
        editor.elements.get('event-input-end-datetime').value = '2026-11-27T20:00';
        await editor.submit();
        assert.equal(editor.requests[0].body.events[0].time, '6:00 PM - 8:00 PM');
        editor.elements.get('event-input-title').value = 'Second event';
        await editor.submit();
        assert.equal(editor.requests[1].body.events[1].id, 100);
    });
}
