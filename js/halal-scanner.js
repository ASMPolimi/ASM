(function (root, factory) {
    const scanner = factory();
    root.HalalScanner = scanner;

    if (typeof module === 'object' && module.exports) {
        module.exports = scanner;
    }
})(typeof window === 'undefined' ? globalThis : window, function () {
    const DICTIONARY = {
        haram: [
            { word: 'pork', reason: 'Pork meat is strictly prohibited in Islam.' },
            { word: 'maiale', reason: 'Pork meat is strictly prohibited in Islam.' },
            { word: 'lard', reason: 'Lard is fat from pig/pork, which is prohibited.' },
            { word: 'strutto', reason: 'Lard is fat from pig/pork, which is prohibited.' },
            { word: 'lardo', reason: 'Lard is fat from pig/pork, which is prohibited.' },
            { word: 'bacon', reason: 'Bacon comes from pork.' },
            { word: 'pancetta', reason: 'Bacon/Pancetta comes from pork.' },
            { word: 'gelatine (pork)', reason: 'Pork-derived gelatin is strictly Haram.' },
            { word: 'gelatin (pork)', reason: 'Pork-derived gelatin is strictly Haram.' },
            { word: 'gelatina di maiale', reason: 'Pork-derived gelatin is strictly Haram.' },
            { word: 'carmine', reason: 'Carmine (E120) is a red dye extracted from insects, considered Haram by the majority of scholars.' },
            { word: 'carminio', reason: 'Carmine (E120) is a red dye extracted from insects, considered Haram by the majority of scholars.' },
            { word: 'cochineal', reason: 'Cochineal extract (E120) is a dye derived from insects.' },
            { word: 'cocciniglia', reason: 'Cochineal extract (E120) is a dye derived from insects.' },
            { word: 'e120', reason: 'E120 (Carmine/Cochineal) is insect-derived red food color.' },
            { word: 'alcohol', reason: 'Intoxicants are strictly Haram.' },
            { word: 'alcol', reason: 'Intoxicants are strictly Haram.' },
            { word: 'alcool', reason: 'Intoxicants are strictly Haram.' },
            { word: 'wine', reason: 'Wine contains alcohol and is Haram.' },
            { word: 'vino', reason: 'Wine contains alcohol and is Haram (Note: Wine vinegar / aceto di vino is Halal as the alcohol has fermented into acetic acid).' },
            { word: 'beer', reason: 'Beer is an alcoholic beverage.' },
            { word: 'birra', reason: 'Beer is an alcoholic beverage.' },
            { word: 'rum', reason: 'Rum contains alcohol.' },
            { word: 'lardum', reason: 'Lardum is pork fat.' },
            { word: 'ham', reason: 'Ham is pork meat.' },
            { word: 'prosciutto', reason: 'Ham/Prosciutto is pork meat.' }
        ],
        mashbuh: [
            { word: 'gelatine', reason: 'Gelatin is doubtful unless specifically certified as Halal (it may be pork or non-dhabihah beef).' },
            { word: 'gelatin', reason: 'Gelatin is doubtful unless specifically certified as Halal.' },
            { word: 'gelatina', reason: 'Gelatin is doubtful unless specifically certified as Halal.' },
            { word: 'whey', reason: 'Whey protein is doubtful as the rennet used in cheese production could come from non-halal slaughtered animals.' },
            { word: 'siero di latte', reason: 'Whey protein is doubtful as the rennet used in cheese production could come from non-halal slaughtered animals.' },
            { word: 'rennet', reason: 'Rennet is doubtful unless from a halal/microbial source.' },
            { word: 'caglio', reason: 'Rennet is doubtful unless from a halal/microbial source.' },
            { word: 'pepsin', reason: 'Pepsin is an enzyme often sourced from pigs.' },
            { word: 'pepsina', reason: 'Pepsin is an enzyme often sourced from pigs.' },
            { word: 'emulsifier', reason: 'Emulsifiers (like mono- and diglycerides) can be derived from either animal or plant fats.' },
            { word: 'emulsionante', reason: 'Emulsifiers (like mono- and diglycerides) can be derived from either animal or plant fats.' },
            { word: 'mono- and diglycerides', reason: 'Could be of animal fat origin.' },
            { word: 'mono and diglycerides', reason: 'Could be of animal fat origin.' },
            { word: 'mono- & diglycerides', reason: 'Could be of animal fat origin.' },
            { word: 'mono- e digliceridi', reason: 'Could be of animal fat origin.' },
            { word: 'mono e digliceridi', reason: 'Could be of animal fat origin.' },
            { word: 'mono e digliceridi degli acidi grassi', reason: 'Could be of animal fat origin.' },
            { word: 'e471', reason: 'E471 (mono- and diglycerides) is doubtful as it may come from animal fats.' },
            { word: 'e472', reason: 'E472 emulsifiers can be derived from animal fat.' },
            { word: 'lecithin', reason: 'Lecithin (E322) is doubtful unless specified as soy/plant lecithin.' },
            { word: 'lecitina', reason: 'Lecithin (E322) is doubtful unless specified as soy/plant lecithin.' },
            { word: 'glycerin', reason: 'Glycerin (E422) can be animal-derived.' },
            { word: 'glicerina', reason: 'Glycerin (E422) can be animal-derived.' },
            { word: 'glycerol', reason: 'Glycerol can be derived from animal lipids.' },
            { word: 'glicerolo', reason: 'Glycerol can be derived from animal lipids.' }
        ]
    };

    const HALAL_EXCEPTIONS_REGEX = [
        /\baceto\s+(?:di\s+|da\s+)?vino(?:\s+(?:bianco|rosso))?\b/gi,
        /\baceto\s+balsamico(?:\s+di\s+modena)?\b/gi,
        /\baceto\s+(?:di\s+|d['’])?alcol\b/gi,
        /\baceto\s+(?:di\s+|d['’])?alcool\b/gi,
        /\b(?:white\s+|red\s+)?wine\s+vinegar\b/gi,
        /\bbalsamic\s+vinegar(?:\s+of\s+modena)?\b/gi,
        /\b(?:spirit|alcohol|distilled)\s+vinegar\b/gi,
        /\bvinaigre\s+de\s+vin(?:\s+(?:blanc|rouge))?\b/gi,
        /\bvinaigre\s+d['’]alcool\b/gi,
        /\bvinagre\s+de\s+vino(?:\s+(?:blanco|tinto))?\b/gi,
        /\bvinagre\s+de\s+alcohol\b/gi
    ];

    function escapeHtml(text) {
        return String(text ?? '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[character]);
    }

    function escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function ingredientPattern(word) {
        return new RegExp(`\\b${escapeRegExp(word)}s?(?![a-z0-9])`, 'gi');
    }

    function analyzeProductIngredients(ingredientsText, labelsText = '', hasIngredients = true) {
        const source = `${ingredientsText || ''} ${labelsText || ''}`.toLowerCase();
        let text = source;
        HALAL_EXCEPTIONS_REGEX.forEach(pattern => {
            text = text.replace(pattern, ' ');
        });

        const findMatches = category => DICTIONARY[category].filter(item => ingredientPattern(item.word).test(text));
        const foundHaram = findMatches('haram');
        const foundMashbuh = findMatches('mashbuh').filter(item =>
            !foundHaram.some(haram => haram.word.includes(item.word))
        );

        if (foundHaram.length) {
            return { status: 'haram', reasons: foundHaram, certified: false };
        }
        if (foundMashbuh.length) {
            return { status: 'mashbuh', reasons: foundMashbuh, certified: false };
        }
        if (!hasIngredients) {
            return {
                status: 'not_listed',
                certified: false,
                reasons: [{
                    word: 'No ingredients listed',
                    reason: 'No ingredients list is available in online databases for this product. Halal status cannot be verified without ingredient data.'
                }]
            };
        }
        return { status: 'halal', certified: false, reasons: [] };
    }

    function highlightIngredients(ingredientsText) {
        if (!ingredientsText) return '';

        let highlighted = String(ingredientsText);
        const placeholders = [];
        let tokenPrefix = '__ASM_HALAL_TOKEN_';
        while (highlighted.includes(tokenPrefix)) tokenPrefix += '_';

        const mark = (match, className) => {
            const token = `${tokenPrefix}${placeholders.length}__`;
            const html = `<span class="${className}">${escapeHtml(match)}</span>`;
            placeholders.push({ token, html });
            return token;
        };

        HALAL_EXCEPTIONS_REGEX.forEach(pattern => {
            highlighted = highlighted.replace(pattern, match => mark(match, 'highlight-halal'));
        });
        DICTIONARY.haram.forEach(item => {
            highlighted = highlighted.replace(ingredientPattern(item.word), match => mark(match, 'highlight-haram'));
        });
        DICTIONARY.mashbuh.forEach(item => {
            highlighted = highlighted.replace(ingredientPattern(item.word), match => mark(match, 'highlight-mashbuh'));
        });

        highlighted = escapeHtml(highlighted);
        placeholders.forEach(({ token, html }) => {
            highlighted = highlighted.replace(token, html);
        });
        return highlighted;
    }

    function normalizeOpenFoodFactsProduct(payload, barcode) {
        if (payload?.status !== 'success' || !payload.product) return null;

        return {
            ...payload.product,
            code: payload.product.code || barcode,
            source: 'openfoodfacts'
        };
    }

    return { analyzeProductIngredients, escapeHtml, highlightIngredients, normalizeOpenFoodFactsProduct };
});