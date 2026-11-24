"""Render the web and print CV from the same checked public content."""
import json
from html import escape
from pathlib import Path
from xml.sax.saxutils import escape as xml
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

root = Path(__file__).resolve().parent
out = root.parents[1] / 'public'
(out/'cv').mkdir(parents=True,exist_ok=True)
d = json.loads((root/'content.json').read_text())
def e(s): return escape(s,quote=True)
def href(url):
    return e(url[len(d['site']):] if url.startswith(d['site'] + '/') else url)
def link(label,url,cls=''):
    return f'<a class="{cls}" href="{href(url)}">{e(label)}</a>'
def section(index,id,title,body,second=False):
    c=' section-page-two' if second else ''
    return f'<section id="{id}" class="block{c}" aria-labelledby="{id}-title"><div class="title"><p class="num" aria-hidden="true">{index:02d} /</p><h2 id="{id}-title">{e(title)}</h2></div>{body}</section>'
def definitions(rows):
    return '<dl class="items">' + ''.join(f'<div class="item"><dt>{e(label)}</dt><dd>{e(value)}</dd></div>' for label,value in rows) + '</dl>'
def dated(rows):
    result=[]
    for name,org,date,description in rows:
        desc=f'<p>{e(description)}</p>' if description else ''
        result.append(f'<li class="item"><div class="item-head"><h3>{e(name)}</h3><span class="date">{e(date)}</span></div><span class="eyebrow organisation">{e(org)}</span>{desc}</li>')
    return '<ul class="items">' + ''.join(result) + '</ul>'
def referenced(rows):
    return '<ul class="items">' + ''.join(f'<li class="item"><h3>{e(name)}</h3><p>{e(desc)}</p>{link(label,url,"source")}</li>' for name,desc,label,url in rows) + '</ul>'
def honors(rows):
    return '<div><p class="evidence-intro">Award titles link to public sources and privacy-safe previews where available.</p><ul class="items recognition">' + ''.join(f'<li class="item"><div class="item-head"><h3>{link(name,url)}</h3><span class="date">{e(date)}</span></div><p>{e(org)}</p></li>' for name,org,date,url in rows) + '</ul></div>'

blocks=[('education','Education',definitions(d['education'])),('experience','Experience',dated(d['experience'])),('research','Research & IP',referenced(d['research'])),('projects','Selected projects',referenced(d['projects'])),('honors','Honors',honors(d['honors'])),('skills','Technical focus',definitions(d['skills']))]
intro_links = '\n'.join(link(label,url) for label,url in d['links'][1:])
toc=''.join(f'<a href="#{id}">{e(label)}</a>' for id,label,_ in blocks)
sections='\n'.join(section(i,id,label,body,i==4) for i,(id,label,body) in enumerate(blocks,start=1))
(out/'cv.html').write_text(f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(d["name"])} | Curriculum Vitae</title>
<meta name="description" content="Academic and engineering CV for {e(d["name"])}: embedded systems, BLE sensing, assistive technologies and applied research.">
<meta name="theme-color" content="#f5f2e9">
<link rel="canonical" href="{d["site"]}/cv.html">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>{(root/'style.css').read_text()}</style>
</head>
<body>
<a class="skip" href="#main-content">Skip to CV</a>
<header class="bar"><div class="wrap bar-inner">
<a class="back" href="/"><span aria-hidden="true">←</span> Portfolio</a>
<nav class="bar-tools" aria-label="CV actions"><button class="button" type="button" onclick="window.print()">Print</button><a class="button primary" href="/cv/Worapon-Sangsasri-CV.pdf" download>Download PDF <span aria-hidden="true">↓</span></a></nav>
</div></header>
<main class="wrap" id="main-content" tabindex="-1">
<header class="hero">
<div><p class="eyebrow">Curriculum vitae</p><h1>{e(d["name"])}</h1><p class="role">{e(d["role"].replace(" | ", " · "))}</p>
<div class="identity"><span>{e(d["location"])}</span><a href="mailto:{e(d["email"])}">{e(d["email"])}</a>{intro_links}</div></div>
<p class="folio"><span>CV Edition</span><strong>2026</strong><span>{e(d["updated"])}</span></p>
</header>
<div class="sheet">
<section class="summary" aria-label="Professional profile"><p>{e(d["summary"])}</p></section>
<nav class="sheet-nav" aria-label="CV sections">{toc}</nav>
<div class="sections">{sections}</div>
<footer class="closing"><span>Public CV · Updated {e(d["updated"])}</span><a href="/evidence/">Browse photos &amp; certificate previews <span aria-hidden="true">↗</span></a></footer>
</div>
</main>
</body>
</html>
''',encoding='utf-8')

fontroot=Path('/usr/share/fonts/truetype/liberation')
for name,file in [('CvSerif','LiberationSerif-Regular.ttf'),('CvSans','LiberationSans-Regular.ttf'),('CvBold','LiberationSans-Bold.ttf'),('CvMono','LiberationMono-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(fontroot/file)))
INK=colors.HexColor('#233025')
ACCENT=colors.HexColor('#3e5947')
SOFT=colors.HexColor('#4c594f')
WARM=colors.HexColor('#79572e')
RULE=colors.HexColor('#ccd2c3')
SAGE=colors.HexColor('#e6ecde')
IVORY=colors.HexColor('#f5f2e9')
WHITE=colors.white
w,h=A4
L,R=53,w-53
width=R-L
f=out/'cv'/'Worapon-Sangsasri-CV.pdf'
cv=canvas.Canvas(str(f),pagesize=A4,pageCompression=1,invariant=1)
cv.setTitle('Worapon Sangsasri | Curriculum Vitae')
cv.setAuthor(d['name'])
cv.setSubject('Academic and engineering curriculum vitae')
y=0

def line(text,x,y,font='CvSans',size=10,color=INK):
    cv.setFont(font,size); cv.setFillColor(color)
    cv.drawString(x,y,text)

def right(text,x,y,font='CvSans',size=10,color=INK):
    cv.setFont(font,size); cv.setFillColor(color)
    cv.drawRightString(x,y,text)

def para(text, y, font='CvSans', size=10.1, leading=13, color=INK, x=L, maxw=width):
    p=Paragraph(text,ParagraphStyle('row',fontName=font,fontSize=size,leading=leading,textColor=color,splitLongWords=False))
    _, hh=p.wrap(maxw,1000)
    p.drawOn(cv,x,y-hh)
    return y-hh

def hlink(label,url,y,x=L,size=8.8,with_rule=True):
    line(label,x,y,'CvBold',size,ACCENT)
    tw=pdfmetrics.stringWidth(label,'CvBold',size)
    cv.linkURL(url,(x,y-3,x+tw,y+size+2),relative=0,thickness=0)
    if with_rule:
        cv.setStrokeColor(ACCENT);cv.setLineWidth(.35);cv.line(x,y-2,x+tw,y-2)
    return x+tw

def rule(y):
    cv.setStrokeColor(RULE);cv.setLineWidth(.55);cv.line(L,y,R,y)

def form_header(page):
    global y
    cv.setFillColor(IVORY)
    cv.rect(0,h-26,w,26,fill=1,stroke=0)
    line('CURRICULUM VITAE',L,h-17,'CvMono',8,WARM)
    right(d['updated'].upper(),R,h-17,'CvMono',8,WARM)
    if page==1:
        line(d['name'],L,h-83,'CvSerif',42,INK)
        line(d['role'],L,h-109,'CvBold',11.6,ACCENT)
        line(d['location'],L,h-131,'CvSans',9.4,SOFT)
        pos=L+pdfmetrics.stringWidth(d['location'],'CvSans',9.4)+15
        hlink(d['email'],'mailto:'+d['email'],h-131,pos,size=9.4)
        pos=L
        for label,url in d['links']:
            pos=hlink(label,url,h-150,pos,size=9)+19
        rule(h-163)
        y=h-177
    else:
        line(d['name'],L,h-63,'CvSerif',29,INK)
        right('PROJECTS / HONORS / TECHNICAL FOCUS',R,h-63,'CvMono',7.4,WARM)
        rule(h-76)
        y=h-91

def form_footer(page):
    assert y>61, f'Page {page} appears crowded (bottom margin {y:.1f})'
    rule(46)
    line(d['name'],L,31,'CvBold',8.3,ACCENT)
    hlink('Portfolio evidence archive',d['site']+'/evidence/',31,L+119,size=8.1)
    right(f'{page} / 2',R,31,'CvMono',8,WARM)
    cv.showPage()

def lead(section):
    global y
    line(section,L,y-10,'CvSerif',19,INK)
    rule(y-17)
    y-=25

def experience_item(title,org,date,desc):
    global y
    right(date,R,y-8,'CvMono',7.9,WARM)
    y=para(xml(title),y,font='CvBold',size=10.6,leading=12,maxw=width-108)
    y=para(xml(org),y-1.5,font='CvSans',size=9.25,leading=11,color=ACCENT)
    if desc: y=para(xml(desc),y-1.7,font='CvSans',size=9.6,leading=12,color=INK)
    y-=9

def linked_item(title,desc,label,url,space=10):
    global y
    y=para(xml(title),y,font='CvBold',size=10.7,leading=13)
    y=para(xml(desc),y-2,size=9.65,leading=12.1,color=SOFT)
    hlink(label,url,y-11,size=8.7)
    y-=space+13

form_header(1)
# Light profile plate, with semantic text, not rasterized.
cv.setFillColor(SAGE)
cv.roundRect(L-11,y-65,width+22,71,3,fill=1,stroke=0)
y=para(xml(d['summary']),y-3,size=10.4,leading=13.7)
y-=24
lead('Education')
for label,value in d['education']:
    y=para(f'<font name="CvBold">{xml(label)}:</font> {xml(value)}',y,size=9.8,leading=12.2)-4
y-=12
lead('Professional experience')
for item in d['experience']: experience_item(*item)
y-=3
lead('Research & intellectual property')
for item in d['research']: linked_item(*item,space=8)
form_footer(1)

form_header(2)
lead('Selected projects')
for item in d['projects']: linked_item(*item,space=11)
y-=4
lead('Selected honors')
for title,org,date,url in d['honors']:
    right(date,R,y-7.5,'CvMono',7.45,WARM)
    y=para(xml(title),y,font='CvBold',size=9.9,leading=11.3,maxw=width-84)
    y=para(xml(org),y-1.15,size=9.05,leading=10.3,color=SOFT)
    # A link on the result label keeps the layout clean while preserving evidence access.
    cv.linkURL(url,(L,y+10,L+min(width-84,pdfmetrics.stringWidth(title,'CvBold',9.9)),y+23),relative=0,thickness=0)
    y-=4
y-=10
lead('Technical focus')
for label,value in d['skills']:
    y=para(f'<font name="CvBold">{xml(label)}:</font> {xml(value)}',y,size=9.5,leading=12.2)-4
form_footer(2)
cv.save()
print(f'Built {out/"cv.html"} and {f}')
