import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { awardGroups, awards, chapters, experience, github, linkedIn, paper, photos, recap, type AwardGroup } from './portfolio-content'
import './professional.css'

type Photo = { src: string; alt: string; caption: string; where: string; width: number; height: number }
const nav = [['Journey', '#journey'], ['Work', '#work'], ['Research', '#research'], ['Honors', '#awards']] as const
const smallImages = ['singapore', 'taiwan-booth', 'innoserve']

function PhotoImage({ photo, eager = false }: { photo: Photo; eager?: boolean }) {
  const base = '/fieldnotes/' + photo.src
  return <img src={base + '.webp'}
    srcSet={smallImages.includes(photo.src) ? base + '-small.webp 640w, ' + base + '.webp ' + photo.width + 'w' : undefined}
    sizes="(max-width: 760px) 94vw, 55vw" width={photo.width} height={photo.height}
    alt={photo.alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />
}

function Figure({ photo, className = '', eager = false }: { photo: Photo; className?: string; eager?: boolean }) {
  return <figure className={'photo ' + className}>
    <PhotoImage photo={photo} eager={eager} />
    <figcaption><span>{photo.caption}</span><span>{photo.where}</span></figcaption>
  </figure>
}

function JumpLink({ href, children, external = false, className = '' }: { href: string; children: React.ReactNode; external?: boolean; className?: string }) {
  const Icon = external ? ArrowUpRight : ArrowRight
  return <a href={href} className={'jump-link ' + className}>{children}<Icon size={17} aria-hidden="true" /></a>
}

function Story() {
  const [active, setActive] = useState(0)
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const articles = Array.from(section.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? [])
    let frame = 0
    let current = -1
    function refresh() {
      frame = 0
      const vh = window.innerHeight
      const guide = vh * .55
      let index = 0
      let nearestDistance = Infinity
      for (const [i, item] of articles.entries()) {
        const box = item.getBoundingClientRect()
        const distance = Math.abs(box.top + box.height / 2 - guide)
        if (distance < nearestDistance) { nearestDistance = distance; index = i }
      }
      if (current !== index) { current = index; setActive(index) }
      const first = articles[0]?.getBoundingClientRect()
      const last = articles[articles.length - 1]?.getBoundingClientRect()
      if (first && last) {
        const start = first.top + first.height / 2
        const span = last.top + last.height / 2 - start
        stage.current?.style.setProperty('--story-progress', String(span > 0 ? Math.max(0, Math.min(1, (guide - start) / span)) : 0))
      }
    }
    function queue() { if (!frame) frame = requestAnimationFrame(refresh) }
    queue()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue) }
  }, [])
  return <section className="story" id="journey" ref={section} aria-labelledby="story-title">
    <div className="wrap">
      <div className="section-head">
        <div><p className="tag"><i /> 01 / THE JOURNEY</p><h2 id="story-title">One competition<br /> at a <em>time.</em></h2></div>
        <p>Five turning points, from the first LabVIEW final to seeing a team of junior students take our project forward.</p>
      </div>
      <div className="story-layout">
        <div className="story-stage" ref={stage}>
          <div className="stage-frame">
            <div className="stage-images" aria-hidden="true">
              {chapters.map((chapter, i) => <div className={'stage-image ' + (i === active ? 'active' : '')} key={chapter.label}>
                <PhotoImage photo={chapter.photo} />
              </div>)}
              <div className="frame-corner" />
            </div>
            <div className="stage-meta"><span>{chapters[active].photo.caption}</span><span>{chapters[active].photo.where}</span></div>
          </div>
          <div className="stage-progress"><span /></div>
          <nav className="chapter-nav" aria-label="Journey chapter index">
            {chapters.map((chapter, i) => <a href={'#journey-chapter-' + (i + 1)} key={chapter.label} aria-label={chapter.label} aria-current={active === i ? 'step' : undefined}>{String(i + 1).padStart(2, '0')}</a>)}
          </nav>
        </div>
        <div className="chapters">
          {chapters.map((chapter, i) => <article className="chapter" id={'journey-chapter-' + (i + 1)} data-chapter={i} key={chapter.label}>
            <p className="tag">/{String(i + 1).padStart(2, '0')} &nbsp; {chapter.date}</p>
            <h3>{chapter.heading}</h3>
            <p className="chapter-copy">{chapter.copy}</p>
            <p className="chapter-evidence">{chapter.evidence}</p>
            <Figure photo={chapter.photo} className="chapter-photo" />
          </article>)}
        </div>
      </div>
      <div className="story-out"><JumpLink href={recap} external>Read my full competition recap on LinkedIn</JumpLink></div>
    </div>
  </section>
}

export default function ProfessionalPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [group, setGroup] = useState<AwardGroup>('All')
  const [showAll, setShowAll] = useState(false)
  const awardList = awards.filter(award => group === 'All' || award.group === group)
  useEffect(() => {
    function close(e: KeyboardEvent) { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return <>
    <a href="#main" className="skip">Skip to content</a>
    <header className="header">
      <div className="wrap nav-row">
        <a className="mark" href="#home" aria-label="Worapon Sangsasri, home"><span aria-hidden="true">W<span>.</span></span><strong>Worapon<br />Sangsasri</strong></a>
        <button className="nav-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="page-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={'page-nav ' + (menuOpen ? 'is-open' : '')} id="page-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-contact">Contact <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
      </div>
      <div className="page-progress" aria-hidden="true" />
    </header>
    <main id="main">
      <section className="hero wrap" id="home" aria-labelledby="title">
        <div className="hero-intro">
          <div className="hero-copy">
            <p className="tag"><i /> WORAPON SANGSASRI / ENGINEERING PORTFOLIO</p>
            <h1 id="title">From signals<br /> to <em>support.</em></h1>
            <p className="hero-description">I’m Worapon, an Applications Engineer at TECHSQUARE. I work with LabVIEW and build embedded systems that make everyday mobility and care easier to understand.</p>
            <div className="hero-actions"><JumpLink className="button" href="#work">Explore my work</JumpLink><JumpLink href="/cv.html" external>View my CV</JumpLink></div>
          </div>
          <div className="hero-motif" aria-hidden="true">
            <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="91" /><circle cx="100" cy="100" r="65" /><circle cx="100" cy="100" r="41" /><path d="M100 4v192M4 100h192" /><path className="motif-wave" d="M13 108h32l12-18 16 32 19-52 19 62 13-36 14 12h49" /><circle className="motif-point" cx="100" cy="100" r="3" /></svg>
            <span>13.76° N &nbsp; 100.50° E</span>
          </div>
        </div>
        <Figure photo={photos.singapore} className="hero-photo" eager />
        <div className="hero-index"><a href="#journey"><ArrowDown size={16} aria-hidden="true" /> Scroll to follow the story</a><span>Bangkok, Thailand / Work &amp; research</span></div>
      </section>
      <div className="proof-strip">
        <div className="wrap">
          <a href="#experience"><small>THE DAY JOB</small><strong>LabVIEW</strong><span>Applications Engineer · TECHSQUARE</span></a>
          <a href="#research"><small>THE RESEARCH</small><strong>Best Paper</strong><span>ECTI-CON 2026 · First author</span></a>
          <a href="#awards"><small>THE TEAM</small><strong>3rd Place</strong><span>InnoServe 2026 · International Exchange (English)</span></a>
        </div>
      </div>
      <Story />
      <section className="work wrap block" id="work">
        <div className="section-head"><div><p className="tag"><i /> 02 / SELECTED WORK</p><h2>Two projects.<br /> Different <em>questions.</em></h2></div><p>Both start with a wheelchair. One asks how to support someone at home or in care. The other asks how to measure motion reliably enough for research.</p></div>
        <div className="work-grid">
          <article className="work-feature">
            <Figure photo={photos.booth} className="work-photo" />
            <div className="work-text"><p className="tag">01 / SENSING &amp; CARE</p><h3>WheelSense &amp; EaseAI</h3><p>From a home prototype for wheelchair users to demonstrable sensing and assistive workflows for care facilities.</p><JumpLink href="/wheelsense/">Read the case study</JumpLink></div>
          </article>
          <article className="work-feature">
            <div className="trace" role="img" aria-label="Illustrative signal diagram showing separate left and right wheel channels, not experimental data.">
              <span>L / R · SCHEMATIC SIGNALS</span>
              <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path className="grid-lines" d="M0 40H400M0 85H400M0 130H400M50 0V170M100 0V170M150 0V170M200 0V170M250 0V170M300 0V170M350 0V170" /><path className="trace-a" d="M0 91C24 92 24 43 50 43s22 46 50 46 20-57 50-57 22 63 50 63 28-52 51-52 20 39 49 39 26-62 50-62 30 56 50 56" /><path className="trace-b" d="M0 123c24 0 28-34 52-34s30 40 48 40 27-26 52-26 22 38 48 38 24-58 49-58 20 33 50 33 22-23 48-23 32 28 53 28" /></svg>
              <small>ILLUSTRATION / NOT MEASURED DATA</small>
            </div>
            <div className="work-text"><p className="tag">02 / MOTION ACQUISITION</p><h3>WheelAthlete</h3><p>Two synchronized wheel-mounted IMUs and a Windows workflow for recording, checking and exporting wheelchair motion data.</p><JumpLink href="/wheelathlete/">See how it works</JumpLink></div>
          </article>
        </div>
        <div className="work-side"><JumpLink href="https://github.com/NnopponS/ReachSenseAI" external>ReachSenseAI · magnetic sensing project</JumpLink><JumpLink href={github} external>All public work on GitHub</JumpLink></div>
      </section>
      <section className="research block" id="research">
        <div className="wrap research-grid">
          <div><p className="tag"><i /> 03 / FIRST-AUTHOR RESEARCH</p><h2>What can a BLE<br /> signal <em>tell us?</em></h2><p>Indoor motion tracking with Bluetooth Low Energy can be noisy. At Thammasat’s CED2 research center, I evaluated machine-learning and language-model approaches on data from ESP32-S3 anchors and a wearable tag.</p><p className="paper-title">Comparative Performance Evaluation of BLE-Based Indoor Motion Tracking Using Machine Learning and Large Language Models</p><JumpLink href={paper} external>Read the paper on IEEE Xplore</JumpLink></div>
          <Figure photo={photos.research} />
        </div>
      </section>
      <section className="experience wrap block" id="experience">
        <div id="about"><p className="tag"><i /> 04 / EXPERIENCE</p><h2>How I <em>work.</em></h2><p className="lede">B.Eng. in Electrical Engineering, Thammasat University · cGPA 3.72 / 4.00</p></div>
        <div className="roles">{experience.map(([period, role, org, description]) => <article key={role}>
          <span>{period}</span><div><h3>{role}</h3><strong>{org}</strong>{description && <p>{description}</p>}</div>
        </article>)}</div>
      </section>
      <section className="awards block" id="awards">
        <div className="wrap">
          <div id="recognition" className="section-head"><div><p className="tag"><i /> 05 / RECOGNITION</p><h2>What the teams<br /> <em>took home.</em></h2></div><p>Competition results, research recognition and an individual scholarship. Find the evidence alongside the work where available.</p></div>
          <div className="award-photos"><Figure photo={photos.taiwan} /><Figure photo={photos.youth} /></div>
          <div className="filters" aria-label="Filter honors">{awardGroups.map(filter => <button key={filter} type="button" aria-pressed={filter === group} onClick={() => { setGroup(filter); setShowAll(false) }}>{filter}</button>)}</div>
          <div className="honor-list" id="honor-list">{(showAll ? awardList : awardList.slice(0, 6)).map(({ date, title, result, proof }) => <article key={title}><span>{date}</span><div><h3>{title}</h3><p>{result}</p></div>{proof && <a href={proof} aria-label={'Source for ' + title}>Source <ArrowUpRight size={15} aria-hidden="true" /></a>}</article>)}</div>
          {awardList.length > 6 && <button className="more" type="button" aria-expanded={showAll} aria-controls="honor-list" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer honors' : 'View all ' + awardList.length + ' honors'} <ArrowDown size={16} aria-hidden="true" /></button>}
          <div id="documents" className="work-side"><JumpLink href={linkedIn + 'details/honors/'} external>View supporting photos and honors on LinkedIn</JumpLink></div>
        </div>
      </section>
      <footer className="footer" id="contact">
        <div className="wrap">
          <p className="tag"><i /> 06 / CONTACT</p><h2>Let’s talk about<br /><em>what’s next.</em></h2>
          <p>I’m interested in embedded AI, assistive technology, and research collaborations that start with a real problem.</p>
          <div className="footer-links"><JumpLink href="mailto:worapon.sangs@gmail.com" external>Email</JumpLink><JumpLink href={linkedIn} external>LinkedIn</JumpLink><JumpLink href={github} external>GitHub</JumpLink><JumpLink href="/cv.html" external>CV</JumpLink></div>
          <div className="footer-base"><span>WORAPON SANGSASRI © 2026</span><a href="#home">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  </>
}
