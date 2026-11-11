const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

function createScanner(file, imageUrl = '') {
    const source = readFileSync(path.join(__dirname, '..', file), 'utf8');
    const images = source.slice(source.indexOf('    const DEFAULT_PRODUCT_PLACEHOLDER'), source.indexOf('    // Send anonymous scan report'));
    const lookupStart = source.indexOf('    async function fetchProductByBarcode');
    const lookup = source.slice(lookupStart, source.indexOf('\n    // ', lookupStart));
    const customData = {
        product_name: 'Excel product', brands: 'Custom brand', image_url: imageUrl,
        ingredients_text: 'Custom ingredients', status: 'haram', reasons: []
    };
    const image = { src: imageUrl };
    const elements = {
        classList: { add() {}, remove() {} },
        querySelector: () => image
    };
    const calls = [];
    const warnings = [];
    let timer;
    let resolvePhoto;
    const photo = new Promise(resolve => { resolvePhoto = resolve; });
    const context = vm.createContext({
        CUSTOM_BARCODES: { '123': customData },
        customBarcodesReady: Promise.resolve(),
        document: { getElementById: () => elements },
        window: {},
        console: { warn: (...args) => warnings.push(args) },
        fetch: url => { calls.push(url); return photo; },
        setTimeout: callback => { timer = callback; },
        displayResults: (product, customAnalysis) => {
            context.window._lastHalalResult = { product, customAnalysis };
        }
    });
    vm.runInContext(images + '\n' + lookup, context);
    return {
        context, calls, warnings, image, customData,
        lookup: () => context.fetchProductByBarcode('123'),
        show: () => timer(),
        respond: data => resolvePhoto({ ok: true, json: async () => data }),
        fail: () => resolvePhoto({ ok: false })
    };
}

for (const file of ['halal.html', path.join('templates', 'halal.html')]) {
    test(`${file}: renders custom details before the photo and caches the result`, async () => {
        const scanner = createScanner(file);
        await scanner.lookup();
        const pending = scanner.show();
        const result = scanner.context.window._lastHalalResult;
        assert.equal(result.product.product_name, 'Excel product');
        assert.equal(result.product.ingredients_text, 'Custom ingredients');
        assert.equal(result.customAnalysis.status, 'haram');
        assert.equal(result.product.image_url, '');
        assert.match(scanner.calls[0], /\/123\.json\?fields=image_front_url,image_url$/);
        scanner.respond({ status: 1, product: { image_front_url: 'https://images.example/front.jpg', product_name: 'Ignored' } });
        await pending;
        assert.equal(scanner.image.src, 'https://images.example/front.jpg');
        assert.equal(result.product.image_url, scanner.image.src);
        assert.equal(result.product.product_name, 'Excel product');
        assert.equal(scanner.customData.image_url, scanner.image.src);
        await scanner.lookup();
        await scanner.show();
        assert.equal(scanner.calls.length, 1);
    });

    test(`${file}: keeps existing custom photos without querying OFF`, async () => {
        const scanner = createScanner(file, 'https://images.example/custom.jpg');
        await scanner.lookup();
        await scanner.show();
        assert.equal(scanner.calls.length, 0);
        assert.equal(scanner.image.src, 'https://images.example/custom.jpg');
    });

    test(`${file}: image_url fallback does not overwrite a newer result`, async () => {
        const scanner = createScanner(file);
        await scanner.lookup();
        const pending = scanner.show();
        scanner.context.window._lastHalalResult = { product: { code: '456' } };
        scanner.image.src = 'newer-photo';
        scanner.respond({ status: 1, product: { image_url: 'https://images.example/general.jpg' } });
        await pending;
        assert.equal(scanner.image.src, 'newer-photo');
        assert.equal(scanner.customData.image_url, 'https://images.example/general.jpg');
    });

    test(`${file}: missing products/photos and HTTP errors leave custom results intact`, async () => {
        for (const data of [{ status: 0 }, { status: 1, product: {} }, null]) {
            const scanner = createScanner(file);
            await scanner.lookup();
            const pending = scanner.show();
            if (data) scanner.respond(data);
            else scanner.fail();
            await pending;
            assert.equal(scanner.image.src, '');
            assert.equal(scanner.customData.image_url, '');
            assert.equal(scanner.context.window._lastHalalResult.customAnalysis.status, 'haram');
            assert.equal(scanner.warnings.length, data ? 0 : 1);
        }
    });
}
