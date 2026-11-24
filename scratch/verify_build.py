import re

# Read rendered halal.html
with open('halal.html', 'r', encoding='utf-8') as f:
    content = f.read()

assert 'lievito' in content
assert 'SURFACE_ALCOHOL_REGEX' in content
assert 'trattato con alcool etilico' in content

print("Successfully verified halal.html contains all updated rules, exceptions and regexes!")
