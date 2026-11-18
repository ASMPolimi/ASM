// Quick smoke-test for newly added haram entries
'use strict';

const fs = require('fs');
const html = fs.readFileSync('halal.html', 'utf8');

// Extract the DICTIONARY from the script
const dictMatch = html.match(/const DICTIONARY\s*=\s*\{([\s\S]*?)\};\s*\/\/ Longest phrases/);
if (!dictMatch) { console.error('Could not find DICTIONARY'); process.exit(1); }

// Build a simple list of haram words from the HTML using regex
const wordMatches = [...html.matchAll(/\{ word: '([^']+)',\s*reason: '[^']*',\s*reason_it:/g)];
const haramSection = html.match(/\/\/ Haram E-numbers([\s\S]*?)\/\/ Carmine/)[1];
const haramWords = [...haramSection.matchAll(/word: '([^']+)'/g)].map(m => m[1]);

// New entries we expect to find
const expected = [
  'guanciale', 'speck', 'salame', 'salami', 'mortadella',
  'e542', 'e 542', 'bone phosphate', 'fosfato di osso',
  'e124', 'e 124', 'ponceau',
  'e354', 'e 354', 'calcium tartrate', 'tartrato di calcio'
];

// Search raw HTML for each word entry
let pass = 0, fail = 0;
for (const w of expected) {
  const found = html.includes(`word: '${w}'`);
  if (found) {
    console.log(`  ✔  '${w}' found in DICTIONARY`);
    pass++;
  } else {
    console.error(`  ✗  '${w}' MISSING from DICTIONARY`);
    fail++;
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
