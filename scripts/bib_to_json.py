# Extract publication info from a .bib file and output in the current JSON format
# Usage: Run this script in Python after placing your .bib file in assets/docs

import bibtexparser
import json
import os

BIB_PATH = 'assets/docs/publications.bib'
JSON_PATH = 'researcher.json'

# Load bib file
def load_bib(path):
    with open(path, encoding='utf-8') as bibtex_file:
        bib_database = bibtexparser.load(bibtex_file)
    return bib_database.entries

# Convert bib entries to publication format
def bib_to_publications(entries):
    publications = []
    for entry in entries:
        pub = {
            'title': entry.get('title', '').replace('{', '').replace('}', ''),
            'author': entry.get('author', '').replace('{', '').replace('}', ''),
            'journal': entry.get('journal', entry.get('booktitle', '')),
            'year': entry.get('year', ''),
            'volume': entry.get('volume', ''),
            'number': entry.get('number', ''),
            'pages': entry.get('pages', ''),
            'publisher': entry.get('publisher', ''),
            'doi': entry.get('doi', None)
        }
        publications.append(pub)
    return publications

# Main function
def main():
    if not os.path.exists(BIB_PATH):
        print(f"Bib file not found: {BIB_PATH}")
        return
    entries = load_bib(BIB_PATH)
    publications = bib_to_publications(entries)

    # Load current researcher.json
    with open(JSON_PATH, encoding='utf-8') as f:
        data = json.load(f)
    data['publications'] = publications

    # Save updated researcher.json
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"Updated {JSON_PATH} with {len(publications)} publications.")

if __name__ == '__main__':
    main()
