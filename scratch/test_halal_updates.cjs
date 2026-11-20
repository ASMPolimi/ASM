// Test script to verify "Lievito di birra is halal" and "Trattato con alcool etilico is mashbuh"
'use strict';

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
    /\bvinagre\s+de\s+alcohol\b/gi,
    /\b(?:soy|soya|soia|sunflower|girasole)\s+lecit(?:in|ina)\b/gi,
    /\b(?:non[\s-]alcoholic|alcohol[\s-]free|zero[\s-]alcohol)\s+(?:beer|wine|malt|cider|beverage|drink)s?\b/gi,
    /\bbirr[ae]\s+(?:senza\s+alco+l|analcolic[oaei]|alco+l[\s-]free|zero\s+alco+l|0(?:[.,]0)?%)\b/gi,
    /\bvin[oi]\s+(?:senza\s+alco+l|analcolic[oaei]|dealcolat[oaei]|de-?alcolat[oaei]|0(?:[.,]0)?%)\b/gi,
    /\b(?:non[\s-]alcoholic|alcohol[\s-]free|free\s+(?:from|of)\s+alcohol|zero\s+alcohol|0(?:[.,]0)?%\s*(?:vol\b|alco+l\b)|no\s+alcohol|without\s+(?:added\s+)?alcohol)\b/gi,
    /\b(?:senza\s+(?:aggiunta\s+di\s+)?alco+l(?:ico)?|analcolic[oaei]|priv[oaei]\s+di\s+alco+l|alco+l[\s-]free|zero\s+alco+l)\b/gi,
    /\b(?:sans\s+alcool|alkoholfrei|de-?alcoholi[sz]ed|dealcolat[oaei]|de-?alcolat[oaei])\b/gi,
    /\b(?:pork[\s-]free|free\s+(?:from|of)\s+pork|no\s+pork|without\s+pork|contains?\s+no\s+pork)\b/gi,
    /\b(?:senza\s+(?:carne\s+(?:di\s+|da\s+)?)?maiale|priv[oaei]\s+di\s+(?:carne\s+)?maiale)\b/gi,
    /\b(?:senza\s+(?:carne\s+)?suin[oaei]|priv[oaei]\s+di\s+(?:carne\s+)?suin[oaei]|senza\s+derivati\s+suini)\b/gi,
    /\b(?:senza\s+strutto|priv[oaei]\s+di\s+strutto|senza\s+lardo|priv[oaei]\s+di\s+lardo)\b/gi,
    /\b(?:senza\s+pancetta|senza\s+prosciutto|bacon[\s-]free|no\s+bacon|without\s+bacon|no\s+lard|without\s+lard|no\s+ham|ham[\s-]free)\b/gi,
    /\b(?:sans\s+porc|ohne\s+schweinefleisch)\b/gi,
    /\b(?:gelatin[e]?[\s-]free|free\s+(?:from|of)\s+gelatin[e]?|senza\s+gelatina(?:\s+animale)?|no\s+gelatin[e]?)\b/gi,
    /\b(?:fish|pesce|poisson)\s+gelatin[ea]?\b/gi,
    /\bgelatin[ea]?\s+(?:di\s+|de\s+)?(?:pesce|poisson|fish)\b/gi,
    /\b(?:vegetal|vegetale|plant)[\s-]based\s+gelatin[ea]?\b/gi,
    /\bgelatina\s+vegetale\b/gi,
    /\bagar[\s-]agar\b/gi,
    /\b(?:carmine[\s-]free|cochineal[\s-]free|senza\s+(?:colorante\s+)?carminio|senza\s+cocciniglia|senza\s+e120)\b/gi,
    /\b(?:fungh[ie]\s+)?porcin[io]\b/gi,
    /\bporcini\s+mushrooms?\b/gi,
    // Brewer's / Baker's Yeast (Lievito di birra - 100% Halal yeast / Saccharomyces cerevisiae, must never match 'birra')
    /\blievito\s+(?:naturale\s+|fresco\s+|secco\s+|disidratato\s+)?(?:di\s+|da\s+)?birra(?:\s+(?:disidratato|secco|fresco|in\s+polvere|compresso|liquido|naturale))?\b/gi,
    /\b(?:brewer'?s|baker'?s)\s+yeast\b/gi,
    /\blevure\s+de\s+bi[eè]re\b/gi,
    /\blevadura\s+de\s+cerveza\b/gi
];

const SURFACE_ALCOHOL_REGEX = /\b(?:(?:trattat[oaei]|trattamento|conservat[oaei])\s+(?:in\s+superficie\s+|in\s+superficie\s+con\s+|superficiale\s+(?:con\s+)?|con\s+)?(?:alco+l(?:\s+etilico)?|etilico)|(?:surface[\s-])?treated\s+with\s+(?:ethyl\s+)?alcohol|trait[eé][e]?\s+(?:en\s+surface\s+)?(?:[aà]\s+(?:l['’])?alco+l(?:\s+[eé]thylique)?|avec\s+(?:de\s+l['’])?alco+l(?:\s+[eé]thylique)?))\b/gi;

const SURFACE_ALCOHOL_REASON = {
    en: 'Surface treatment with ethyl alcohol (antimicrobial preservative on bakery packaging) is considered doubtful (Mashbuh) due to scholarly debate regarding alcohol used as a preservative.',
    it: 'Il trattamento superficiale con alcool etilico (antimuffa per panificati e prodotti da forno) è considerato dubbio (Mashbuh) per divergenza giurisprudenziale sull\'alcol usato come conservante e il suo residuo.'
};

const DICTIONARY = {
    haram: [
        { word: 'strutto', reason: 'Strutto is lard (pork fat), strictly Haram.' },
        { word: 'alcohol', reason: 'Intoxicants are strictly Haram.' },
        { word: 'alcol', reason: 'Intoxicants are strictly Haram.' },
        { word: 'alcool', reason: 'Intoxicants are strictly Haram.' },
        { word: 'wine', reason: 'Wine contains alcohol and is Haram.' },
        { word: 'vino', reason: 'Wine contains alcohol and is Haram.' },
        { word: 'beer', reason: 'Beer is an alcoholic beverage.' },
        { word: 'birra', reason: 'Beer is an alcoholic beverage.' },
        { word: 'etilico', reason: 'Intoxicants are strictly Haram.' }
    ],
    mashbuh: [
        { word: 'e471', reason: 'E471 mono- and diglycerides can be from animal fats.' }
    ]
};

function escapeRegExp(text) {
    return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function wordRegex(word, flags) {
    const escaped = escapeRegExp(word);
    if (/[)\]]$/.test(word)) {
        return new RegExp(`\\b${escaped}(?![a-z0-9])`, flags);
    }
    return new RegExp(`\\b(${escaped}s?)(?![a-z0-9])`, flags);
}

function maskHalalExceptions(str) {
    if (!str) return '';
    let result = str;
    HALAL_EXCEPTIONS_REGEX.forEach(rgx => {
        result = result.replace(rgx, '__HALAL_SAFE_EXCEPTION__');
    });
    return result;
}

function analyzeProductIngredients(ingredientsText, labelsText = '', hasIngredients = true) {
    const isIt = true;
    const rawText = (ingredientsText + ' ' + labelsText).toLowerCase();
    let text = maskHalalExceptions(rawText);
    const foundHaram = [];
    const foundMashbuh = [];

    const surfaceMatches = text.match(SURFACE_ALCOHOL_REGEX);
    if (surfaceMatches && surfaceMatches.length > 0) {
        foundMashbuh.push({
            word: surfaceMatches[0].trim(),
            reason: isIt ? SURFACE_ALCOHOL_REASON.it : SURFACE_ALCOHOL_REASON.en
        });
    }
    text = text.replace(SURFACE_ALCOHOL_REGEX, '__MASHBUH_SAFE_TOKEN__');

    DICTIONARY.haram.forEach(item => {
        if (wordRegex(item.word, 'i').test(text)) {
            foundHaram.push({
                word: item.word,
                reason: item.reason
            });
        }
    });

    DICTIONARY.mashbuh.forEach(item => {
        if (wordRegex(item.word, 'i').test(text)) {
            foundMashbuh.push({
                word: item.word,
                reason: item.reason
            });
        }
    });

    if (foundHaram.length > 0) {
        return { status: 'haram', reasons: foundHaram };
    } else if (foundMashbuh.length > 0) {
        return { status: 'mashbuh', reasons: foundMashbuh };
    } else {
        return { status: 'halal', reasons: [] };
    }
}

// Tests
const testCases = [
    {
        name: 'Pure lievito di birra',
        input: 'lievito di birra',
        expected: 'halal'
    },
    {
        name: 'Bread with lievito di birra',
        input: 'Farina di grano tenero tipo 0, acqua, lievito di birra, sale.',
        expected: 'halal'
    },
    {
        name: 'Bread with lievito di birra and trattato con alcool etilico',
        input: 'Farina di grano tenero tipo 0, acqua, olio di semi di girasole, lievito di birra, sale, destrosio. Trattato con alcool etilico.',
        expected: 'mashbuh'
    },
    {
        name: 'Trattato con alcol etilico in superficie',
        input: 'Piadina: farina, acqua, olio, sale. Trattato in superficie con alcol etilico.',
        expected: 'mashbuh'
    },
    {
        name: 'Trattato con alcol',
        input: 'Pane bauletto: farina, lievito di birra, trattato con alcool.',
        expected: 'mashbuh'
    },
    {
        name: 'Actual beer beverage',
        input: 'Birra Moretti, acqua, malto.',
        expected: 'haram'
    },
    {
        name: 'Product with actual alcohol liqueur aroma',
        input: 'Farina, zucchero, lievito di birra, aroma (contiene alcool).',
        expected: 'haram'
    },
    {
        name: 'Product with pork lard and surface alcohol',
        input: 'Farina, strutto, trattato con alcool etilico.',
        expected: 'haram'
    }
];

let allPassed = true;
testCases.forEach(tc => {
    const res = analyzeProductIngredients(tc.input);
    const passed = res.status === tc.expected;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${tc.name} -> Expected: ${tc.expected}, Got: ${res.status}`);
    if (!passed) {
        console.log('   Details:', res);
        allPassed = false;
    }
});

if (!allPassed) process.exit(1);
console.log('\nAll test cases PASSED successfully!');
