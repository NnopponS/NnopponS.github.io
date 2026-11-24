# Worapon Sangsasri · Engineering Portfolio

[Portfolio](https://nnoppons.github.io/) · [CV](https://nnoppons.github.io/cv.html) · [LinkedIn](https://www.linkedin.com/in/worapon-sangsasri-0371a8376/) · [GitHub profile](https://github.com/NnopponS)

A field journal about going from my first LabVIEW competition to building assistive systems, testing BLE tracking, and sharing the work internationally. The scroll narrative uses real event photographs and also works as a straightforward sequence of text and photos on phones.

| Page | What’s there |
| --- | --- |
| [The journey](https://nnoppons.github.io/#journey) | Five chapters, from LabVIEW Battle to InnoServe and the next team |
| [WheelSense & EaseAI](https://nnoppons.github.io/wheelsense/) | Sensing, telemetry, and assistant workflows for the home and care facilities |
| [WheelAthlete](https://nnoppons.github.io/wheelathlete/) | Synchronized wheelchair motion acquisition and Windows research tooling |
| [Research](https://nnoppons.github.io/#research) | First-author, Best Paper-recognized ECTI-CON research in BLE tracking |
| [Photos & certificates](https://nnoppons.github.io/evidence/) | Filterable gallery of documentary images and privacy-edited certificate previews |
| [Honors](https://nnoppons.github.io/#awards) | Competition and research results, scholarship, and source links |

## Maintain the site

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

React, TypeScript and Vite build a static site. GitHub Actions deploys the built `dist/` folder to GitHub Pages on pushes to `main`.

- Update homepage facts, captions and award sources in `src/portfolio-content.ts`. Review edits against the public LinkedIn profile, team results and papers; it’s a curated sync, not a live scrape.
- Case-study pages live under `public/wheelsense/` and `public/wheelathlete/`. They share a stylesheet and do not require JavaScript.
- The print-friendly CV is `public/cv.html`. Keep role titles and recognition in step with the portfolio.
- The read-only [photo credits](PHOTO_CREDITS.md) document the public / owner-supplied images used here. Keep source photos out of Git; `scripts/prepare_fieldnotes.py` makes smaller, metadata-free WebP copies from approved originals.

- The Evidence archive is static HTML derived from `public/evidence/items.json`. Regenerate it with `python scripts/build_evidence.py` after editing the inventory. Use safe web-size previews, not unredacted source reports.
