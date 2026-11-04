const test = require('node:test');
const assert = require('node:assert/strict');
const {
    analyzeProductIngredients,
    highlightIngredients,
    normalizeOpenFoodFactsProduct
} = require('../js/halal-scanner.js');

test('a halal product name does not hide mashbuh ingredients or imply certification', () => {
    const result = analyzeProductIngredients('gelatin', 'Halal snack brand', true);

    assert.equal(result.status, 'mashbuh');
    assert.equal(result.certified, false);
});

test('halal wording without an explicit certification does not mark a product certified', () => {
    const result = analyzeProductIngredients('sugar', 'Halal brand', true);

    assert.equal(result.status, 'halal');
    assert.equal(result.certified, false);
});

test('untrusted ingredient markup is escaped while matched words remain highlighted', () => {
    const rendered = highlightIngredients('<img src=x onerror=alert(1)> gelatin');

    assert.equal(rendered.includes('<img'), false);
    assert.match(rendered, /&lt;img/);
    assert.match(rendered, /<span class="highlight-mashbuh">gelatin<\/span>/);
});

test('plural ingredient matches remain visible in highlighted output', () => {
    const rendered = highlightIngredients('emulsifiers');

    assert.match(rendered, /<span class="highlight-mashbuh">emulsifiers<\/span>/);
});

test('wine vinegar remains an exception to the wine keyword', () => {
    assert.equal(analyzeProductIngredients('aceto di vino').status, 'halal');
});

test('missing ingredient data is not reported as halal', () => {
    assert.equal(analyzeProductIngredients('', '', false).status, 'not_listed');
});

test('Open Food Facts v3 product responses are normalized for the scanner', () => {
    const product = normalizeOpenFoodFactsProduct({
        status: 'success',
        product: { product_name: 'Sample food', ingredients_text: 'sugar' }
    }, '1234567890123');

    assert.equal(product.code, '1234567890123');
    assert.equal(product.source, 'openfoodfacts');
    assert.equal(product.product_name, 'Sample food');
});

test('Open Food Facts not-found responses do not produce a product', () => {
    assert.equal(normalizeOpenFoodFactsProduct({ status: 'failure' }, '1234567890123'), null);
});