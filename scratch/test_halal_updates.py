import re

HALAL_EXCEPTIONS_REGEX = [
    re.compile(r'\baceto\s+(?:di\s+|da\s+)?vino(?:\s+(?:bianco|rosso))?\b', re.I),
    re.compile(r'\baceto\s+balsamico(?:\s+di\s+modena)?\b', re.I),
    re.compile(r'\baceto\s+(?:di\s+|d[\'’])?alcol\b', re.I),
    re.compile(r'\baceto\s+(?:di\s+|d[\'’])?alcool\b', re.I),
    re.compile(r'\b(?:non[\s-]alcoholic|alcohol[\s-]free|zero[\s-]alcohol)\s+(?:beer|wine|malt|cider|beverage|drink)s?\b', re.I),
    re.compile(r'\bbirr[ae]\s+(?:senza\s+alco+l|analcolic[oaei]|alco+l[\s-]free|zero\s+alco+l|0(?:[.,]0)?%)\b', re.I),
    # Brewer's / Baker's Yeast
    re.compile(r'\blievito\s+(?:naturale\s+|fresco\s+|secco\s+|disidratato\s+)?(?:di\s+|da\s+)?birra(?:\s+(?:disidratato|secco|fresco|in\s+polvere|compresso|liquido|naturale))?\b', re.I),
    re.compile(r'\b(?:brewer\'?s|baker\'?s)\s+yeast\b', re.I),
    re.compile(r'\blevure\s+de\s+bi[eè]re\b', re.I),
    re.compile(r'\blevadura\s+de\s+cerveza\b', re.I)
]

SURFACE_ALCOHOL_REGEX = re.compile(
    r'\b(?:(?:trattat[oaei]|trattamento|conservat[oaei])\s+(?:in\s+superficie\s+|in\s+superficie\s+con\s+|superficiale\s+(?:con\s+)?|con\s+)?(?:alco+l(?:\s+etilico)?|etilico)|(?:surface[\s-])?treated\s+with\s+(?:ethyl\s+)?alcohol|trait[eé][e]?\s+(?:en\s+surface\s+)?(?:[aà]\s+(?:l[\'’])?alco+l(?:\s+[eé]thylique)?|avec\s+(?:de\s+l[\'’])?alco+l(?:\s+[eé]thylique)?))\b',
    re.I
)

HARAM_WORDS = ['birra', 'beer', 'vino', 'wine', 'alcool', 'alcol', 'etilico', 'strutto', 'maiale']
MASHBUH_WORDS = ['e471', 'gelatina']

def word_regex(w):
    return re.compile(rf'\b{re.escape(w)}s?(?![a-z0-9])', re.I)

def analyze(text):
    raw = text.lower()
    t = raw
    for rgx in HALAL_EXCEPTIONS_REGEX:
        t = rgx.sub('__HALAL_SAFE_EXCEPTION__', t)

    found_mashbuh = []
    found_haram = []

    surface_matches = SURFACE_ALCOHOL_REGEX.findall(t)
    if surface_matches:
        found_mashbuh.append({'word': surface_matches[0], 'reason': 'Surface alcohol treatment (Mashbuh)'})

    t = SURFACE_ALCOHOL_REGEX.sub('__MASHBUH_SAFE_TOKEN__', t)

    for w in HARAM_WORDS:
        if word_regex(w).search(t):
            found_haram.append(w)

    for w in MASHBUH_WORDS:
        if word_regex(w).search(t):
            found_mashbuh.append(w)

    if found_haram:
        return 'haram'
    elif found_mashbuh:
        return 'mashbuh'
    else:
        return 'halal'

cases = [
    ("lievito di birra", "halal"),
    ("Farina di grano tenero tipo 0, acqua, lievito di birra, sale.", "halal"),
    ("Farina di grano tenero tipo 0, acqua, olio di semi di girasole, lievito di birra, sale, destrosio. Trattato con alcool etilico.", "mashbuh"),
    ("Piadina: farina, acqua, olio, sale. Trattato in superficie con alcol etilico.", "mashbuh"),
    ("Pane bauletto: farina, lievito di birra, trattato con alcool.", "mashbuh"),
    ("Birra Moretti, acqua, malto.", "haram"),
    ("Farina, zucchero, lievito di birra, aroma (contiene alcool).", "haram"),
    ("Farina, strutto, trattato con alcool etilico.", "haram"),
]

all_ok = True
for inp, exp in cases:
    res = analyze(inp)
    ok = (res == exp)
    print(f"[{'PASS' if ok else 'FAIL'}] '{inp}' -> expected {exp}, got {res}")
    if not ok:
        all_ok = False

if all_ok:
    print("\nAll Python test cases PASSED!")
else:
    exit(1)
