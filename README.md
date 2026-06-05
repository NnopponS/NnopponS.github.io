# Worapon Sangsasri Portfolio

Story-game portfolio for `https://NnopponS.github.io/`.

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Asset Pipeline

The public certificate and award PDFs are copied from the sibling `Master-Scholarship` source folder and converted into thumbnails with PyMuPDF and Pillow:

```bash
python scripts/prepare_assets.py
```

The script intentionally avoids admissions, identity, financial, and recommendation documents.
