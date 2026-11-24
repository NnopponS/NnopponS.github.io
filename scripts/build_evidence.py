"""Regenerate the static, linkable evidence archive from its public manifest."""
from pathlib import Path
from html import escape
import json

public = Path(__file__).resolve().parents[1] / 'public'
archive = public / 'evidence'
items = json.loads((archive / 'items.json').read_text())
assert len(items) == len({x['id'] for x in items}), 'Each archive item needs a unique anchor'
for x in items:
    assert x['kind'] in ('photo','certificate')
    assert x['src'].startswith(('/fieldnotes/','/evidence/media/'))
    assert (public / x['src'].lstrip('/')).is_file(), x['src']

cards = []
for item in items:
    x = {k:escape(str(v),quote=True) for k,v in item.items()}
    kind = 'Photo' if x['kind']=='photo' else 'Document'
    anchor = '#' + x['id']
    cards.append(f'''
      <article class="item" data-kind="{x['kind']}" data-group="{x['group']}" data-year="{x['year']}" id="{x['id']}">
        <a class="preview open-proof" href="{x['src']}" aria-label="Open image: {x['title']}">
          <img src="{x['src']}" alt="{x['title']}" width="{x['width']}" height="{x['height']}" loading="lazy" decoding="async">
          <span class="preview-arrow" aria-hidden="true">↗</span>
        </a>
        <div class="item-content">
          <div class="item-meta"><span>{kind} / {x['year']}</span><a href="{anchor}" aria-label="Link to {x['title']}" title="Link to this item">#</a></div>
          <h2>{x['title']}</h2>
          <p class="item-event">{x['event']}</p>
          <p class="item-summary">{x['summary']}</p>
          <span class="source">{x['origin']}</span>
        </div>
      </article>''')
counts = {kind:sum(x['kind']==kind for x in items) for kind in ('photo','certificate')}
title = 'Photos &amp; Certificates | Worapon Sangsasri'
get = lambda n: '\n'.join(cards) if n == 'CARDS' else str(counts[n])
template = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f6ef">
  <title>__TITLE__</title>
  <meta name="description" content="Browse Worapon Sangsasri’s competition photos, award certificates, and research evidence.">
  <link rel="canonical" href="https://nnoppons.github.io/evidence/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="./archive.css">
  <script defer src="./archive.js"></script>
</head>
<body>
  <a href="#archive-items" class="skip">Skip to archive</a>
  <header class="band"><div class="wrap nav"><a href="/">← Portfolio</a><a href="/#awards">Honors and awards ↗</a></div></header>
  <main class="wrap">
    <section class="intro" aria-labelledby="archive-title">
      <div class="intro-copy">
        <p class="tag"><i></i> FIELD NOTES / THE ARCHIVE</p>
        <h1 id="archive-title">Photos <em>&amp;</em><br>certificates.</h1>
        <p class="intro-description">The awards, projects, and people behind the work. Browse original event photos and certificate previews by year or topic.</p>
      </div>
      <dl class="ledger"><div><dt>PHOTOGRAPHS</dt><dd>__photo__</dd></div><div><dt>CERTIFICATES &amp; DOCUMENTS</dt><dd>__certificate__</dd></div></dl>
    </section>
    <section class="collection" aria-label="Portfolio evidence archive">
      <div class="control-row" id="archive-controls" hidden>
        <div class="types" role="group" aria-label="Evidence type">
          <button type="button" data-choice="all" aria-pressed="true">All items</button>
          <button type="button" data-choice="photo" aria-pressed="false">Photos</button>
          <button type="button" data-choice="certificate" aria-pressed="false">Certificates &amp; documents</button>
        </div>
        <div class="query">
          <label><span>Search the archive</span><input id="search" type="search" placeholder="e.g. WheelSense" autocomplete="off"></label>
          <label><span>Category</span><select id="category"><option value="all">All categories</option><option>International</option><option>National</option><option>Research</option><option>Academic</option></select></label>
          <label><span>Year</span><select id="year"><option value="all">All years</option>__YEARS__</select></label>
        </div>
      </div>
      <div class="results"><p id="results" aria-live="polite">__TOTAL__ items</p><button type="button" id="clear" hidden>Reset filters</button></div>
      <p class="empty" id="empty" hidden>No items match those filters. Try an event name or reset the filters.</p>
      <div id="archive-items" class="items" tabindex="-1">__CARDS__
      </div>
      <nav class="record-links" aria-label="Official records"><a href="https://innoserveawards.tca.org.tw/award.aspx">InnoServe official results ↗</a><a href="https://ieeexplore.ieee.org/document/11608653">ECTI-CON paper on IEEE Xplore ↗</a></nav>
      <p class="archive-note">Photographs are from the owner or published event sources. Some document previews are cropped or masked to omit personal identifiers, signatures, and verification codes. Duplicate copies and unrelated account screenshots are not included.</p>
    </section>
  </main>
  <dialog id="image-dialog" aria-labelledby="dialog-title">
    <form method="dialog" class="dialog-bar"><p class="tag">ARCHIVE PREVIEW</p><button type="submit" autofocus aria-label="Close preview">Close ×</button></form>
    <div class="dialog-content"><img id="dialog-image" alt=""><div><h2 id="dialog-title"></h2><p id="dialog-description"></p></div></div>
  </dialog>
  <footer class="band foot"><div class="wrap nav"><span>WORAPON SANGSASRI / EVIDENCE ARCHIVE</span><a href="https://www.linkedin.com/in/worapon-sangsasri-0371a8376/details/honors/">LinkedIn Honors ↗</a></div></footer>
</body>
</html>
'''
replacements = {
  'TITLE': title, 'photo': get('photo'), 'certificate': get('certificate'), 'CARDS': get('CARDS'), 'TOTAL': str(len(items)),
  'YEARS': ''.join(f'<option>{escape(a)}</option>' for a in sorted({x['year'] for x in items}, reverse=True)),
}
for key,value in replacements.items(): template=template.replace('__'+key+'__',value)
(archive/'index.html').write_text(template)
