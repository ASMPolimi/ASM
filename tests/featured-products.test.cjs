const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

async function loadFeatured(responses, hostname = 'localhost') {
    function element(tag = '') {
        return {
            tag, children: [], textContent: '', className: '',
            classList: { toggle(name, hidden) { this[name] = hidden; } },
            appendChild(child) { this.children.push(child); },
            append(...children) { this.children.push(...children); },
            replaceChildren() { this.children = []; },
            addEventListener() {}
        };
    }
    const ids = Object.fromEntries(['section', 'grid', 'message', 'title', 'description']
        .map(id => [`featured-products-${id}`, element()]));
    const calls = [];
    const warnings = [];
    const events = {};
    const window = {
        currentLang: 'en', location: { hostname },
        addEventListener: (name, callback) => { events[name] = callback; }
    };
    const context = {
        window, localStorage: { getItem: () => 'en' },
        document: { getElementById: id => ids[id], createElement: element },
        AbortSignal: { timeout: () => ({}) },
        console: { warn: (...args) => warnings.push(args) },
        fetch: async (url, options) => {
            calls.push({ url, options });
            const data = responses.shift();
            if (data instanceof Error) throw data;
            return { ok: true, json: async () => data };
        }
    };
    vm.runInNewContext(readFileSync(path.join(__dirname, '..', 'js', 'featured-products.js'), 'utf8'), context);
    await new Promise(resolve => setImmediate(resolve));
    return { ids, calls, warnings, window, events };
}

test('only selected API products render, as text, with actual classifications and safe images', async () => {
    const product = {
        product_name: '<img src=x onerror=alert(1)>', brand: 'Brand',
        barcode: '00123', status: 'haram', image_url: 'javascript:alert(1)',
        ingredients_text: '<script>private-looking text</script>'
    };
    const result = await loadFeatured([{ success: true, products: [product] }]);
    const card = result.ids['featured-products-grid'].children[0];
    assert.equal(card.children.find(child => child.tag === 'h4').textContent, product.product_name);
    assert.equal(card.children.some(child => child.tag === 'img'), false);
    assert.equal(card.children.find(child => child.tag === 'span').textContent, 'Haram');
    assert.equal(card.children.find(child => child.tag === 'details').children[1].textContent, product.ingredients_text);
    assert.equal(result.ids['featured-products-section'].classList.hidden, false);
    assert.equal(result.calls[0].url, '/api/featured_products');
    assert.equal(result.calls[0].options.cache, 'no-store');
    result.window.currentLang = 'it';
    result.events.asmLanguageChanged();
    assert.equal(result.ids['featured-products-title'].textContent, 'Prodotti in evidenza');
    assert.equal(result.ids['featured-products-grid'].children[0].children.at(-1).children[0].textContent, 'Ingredienti');
});

test('successful empty live selection hides section without loading stale snapshots', async () => {
    const result = await loadFeatured([{ success: true, products: [] }], 'asmpolimi.it');
    assert.equal(result.calls.length, 1);
    assert.equal(result.calls[0].url, 'https://admin.asmpolimi.it/api/featured_products');
    assert.equal(result.ids['featured-products-section'].classList.hidden, true);
});

test('offline snapshots render after failed or malformed live responses', async () => {
    const result = await loadFeatured([
        new Error('Offline'), { success: false },
        { success: true, products: [{ barcode: '123', status: 'unexpected', image_url: 'https://example.test/p.jpg' }] }
    ]);
    assert.equal(result.calls[2].url, 'data/featured_products.json');
    assert.equal(result.warnings.length, 2);
    const card = result.ids['featured-products-grid'].children[0];
    assert.equal(card.children[0].tag, 'img');
    assert.equal(card.children.find(child => child.tag === 'span').textContent, 'Not Listed');
});

test('failure of every endpoint shows a visible error instead of an empty success', async () => {
    const result = await loadFeatured(Array.from({ length: 4 }, () => new Error('Offline')));
    assert.equal(result.ids['featured-products-section'].classList.hidden, false);
    assert.match(result.ids['featured-products-message'].textContent, /Unable to load/);
    assert.equal(result.warnings.length, 4);
});
