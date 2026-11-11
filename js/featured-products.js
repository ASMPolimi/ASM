(() => {
    const section = document.getElementById('featured-products-section');
    const grid = document.getElementById('featured-products-grid');
    const message = document.getElementById('featured-products-message');
    let products = [];
    let failed = false;

    function render() {
        const isIt = (window.currentLang || localStorage.getItem('site_lang')) === 'it';
        document.getElementById('featured-products-title').textContent = isIt ? 'Prodotti in evidenza' : 'Featured Products';
        document.getElementById('featured-products-description').textContent = isIt
            ? 'Prodotti selezionati dal team ASM. Controlla la classificazione e gli ingredienti: la presenza in questa sezione non equivale a una certificazione halal.'
            : 'Products selected by the ASM team. Check each classification and ingredients: being featured is not halal certification.';
        message.textContent = failed
            ? (isIt ? 'Impossibile caricare i prodotti in evidenza. Riprova piu tardi.' : 'Unable to load featured products. Please try again later.')
            : '';
        grid.replaceChildren();
        const labels = {
            halal: 'Halal', haram: 'Haram', mashbuh: 'Mashbuh',
            not_listed: isIt ? 'Non in lista' : 'Not Listed'
        };
        for (const product of products) {
            const card = document.createElement('article');
            card.className = 'featured-product-card';
            const imageUrl = product.image_url || '';
            if (/^https?:\/\//i.test(imageUrl)) {
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = product.product_name || '';
                image.loading = 'lazy';
                image.decoding = 'async';
                image.addEventListener('error', () => image.remove(), { once: true });
                card.appendChild(image);
            }
            const title = document.createElement('h4');
            title.textContent = product.product_name || (isIt ? 'Prodotto' : 'Product');
            card.appendChild(title);
            const brand = document.createElement('p');
            brand.textContent = product.brand || '';
            card.appendChild(brand);
            const status = Object.hasOwn(labels, product.status) ? product.status : 'not_listed';
            const badge = document.createElement('span');
            badge.className = `status-badge status-${status.replace('_', '-')}`;
            badge.textContent = labels[status];
            card.appendChild(badge);
            const barcode = document.createElement('p');
            barcode.className = 'result-prod-barcode';
            barcode.textContent = `Barcode: ${product.barcode}`;
            card.appendChild(barcode);
            if (product.ingredients_text) {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                summary.textContent = isIt ? 'Ingredienti' : 'Ingredients';
                const ingredients = document.createElement('p');
                ingredients.textContent = product.ingredients_text;
                details.append(summary, ingredients);
                card.appendChild(details);
            }
            grid.appendChild(card);
        }
        section.classList.toggle('hidden', !failed && products.length === 0);
    }

    async function load() {
        const local = ['localhost', '127.0.0.1'].includes(window.location.hostname);
        const endpoints = local
            ? ['/api/featured_products', 'https://admin.asmpolimi.it/api/featured_products']
            : ['https://admin.asmpolimi.it/api/featured_products', '/api/featured_products'];
        endpoints.push('data/featured_products.json', 'api/featured_products.json');
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (!data.success || !Array.isArray(data.products)) throw new Error('Invalid featured products response');
                products = data.products;
                render();
                return;
            } catch (error) {
                console.warn(`Failed to load featured products from ${endpoint}:`, error);
            }
        }
        failed = true;
        render();
    }

    window.addEventListener('asmLanguageChanged', render);
    load();
})();
