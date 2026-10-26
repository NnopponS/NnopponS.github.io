import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Download,
  ExternalLink,
  FileText,
  Code2,
  UsersRound,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { ScrollJourney } from './components/ScrollJourney'
import { ScrollMotion } from './components/ScrollMotion'
import './professional.css'
import './story-motion.css'

type AwardCategory = 'International' | 'Research' | 'National' | 'Academic'

type Award = {
  title: string
  recognition: string
  organization: string
  location: string
  year: string
  category: AwardCategory
  evidence?: string
}

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Recognition', href: '#awards' },
]

const highlights = [
  {
    locale: 'CHINA · 2026',
    headline: 'Gold Medal & Special Award',
    title: '9th China (Shanghai) International Invention & Innovation Expo',
    description: 'International recognition for WheelSense, an assistive sensing and intelligent-care platform.',
  },
  {
    locale: 'SINGAPORE · 2026',
    headline: 'Thailand National Winner',
    title: 'AI Ready ASEAN Youth Challenge',
    description: 'Represented Thailand at the regional showcase, presenting WheelSense and its applications in care.',
  },
  {
    locale: 'TAIWAN · 2026',
    headline: 'Honorable Award',
    title: 'Best AI Awards — AI Student Division',
    description: 'Recognition for EaseAI, an AI-assisted sensing and care system for nursing-home environments.',
  },
]

const projects = [
  {
    number: '02',
    area: 'RESEARCH · MACHINE LEARNING',
    name: 'BLE-Based Indoor Motion Tracking',
    body: 'First-author evaluation of machine learning and large language models for BLE signal-based indoor tracking, using ESP32-S3 anchors and wearable sensor data.',
    tags: ['BLE / RSSI', 'ESP32-S3', 'XGBoost', 'LLM evaluation'],
    link: 'https://ieeexplore.ieee.org/document/11608653',
    linkText: 'Read publication',
  },
  {
    number: '03',
    area: 'EDGE AI · ASSISTIVE TECHNOLOGY',
    name: 'EaseAI — Intelligent Care',
    body: 'Edge-AI care monitoring and smart-environment workflows designed to support caregivers and wheelchair users. Built as a working multidisciplinary prototype.',
    tags: ['Edge AI', 'PSoC Edge E84', 'AIoT', 'Care workflows'],
    link: 'https://github.com/NnopponS',
    linkText: 'Engineering work',
  },
  {
    number: '04',
    area: 'ROBOTICS · EMBEDDED SYSTEMS',
    name: 'Autonomous Drone Systems',
    body: 'A national embedded-systems competition project integrating MATLAB-based flight logic, signal analysis, GPS-spoofing resilience and a monitoring interface.',
    tags: ['MATLAB', 'Raspberry Pi 5', 'Autonomy', 'Signal processing'],
    link: 'https://github.com/NnopponS',
    linkText: 'View GitHub',
  },
]

const experience = [
  {
    period: 'OCT 2026 — PRESENT',
    role: 'Applications Engineer',
    company: 'TECHSQUARE CO., LTD.',
    context: 'Bangkok, Thailand · Full-time',
    detail: 'Translate customer requirements into practical engineering systems, demonstrations and technical guidance, with work involving NI instrumentation and LabVIEW.',
  },
  {
    period: 'APR 2026 — PRESENT',
    role: 'Research & Development Engineer',
    company: 'CED-SQUARE INNOVATION COMPANY LIMITED',
    context: 'Thailand · Part-time',
    detail: 'Develop WheelSense across embedded firmware, mobile applications, backend services and intelligent-care workflows. CED-SQUARE is an engineering company, separate from the university research appointment.',
  },
  {
    period: 'AUG 2025 — PRESENT',
    role: 'Research Assistant',
    company: 'Thammasat University · Center of Excellence in Creative Engineering Design and Development',
    context: 'Pathum Thani, Thailand',
    detail: 'Build connected sensing hardware and server infrastructure for applied research in indoor localization, care environments and AI-enabled assistive systems.',
  },
  {
    period: 'JUN — SEP 2026',
    role: 'Teaching Assistant',
    company: 'Thammasat University · Faculty of Engineering',
    context: 'Pathum Thani, Thailand',
    detail: 'Supported engineering teaching and learning in parallel with research and development work.',
  },
  {
    period: 'JUN — JUL 2025',
    role: 'Automation Engineering Intern',
    company: 'Charoen Pokphand Group · CP CIXI Park',
    context: 'Cixi, Zhejiang, China',
    detail: 'Worked in an international industrial automation environment and received a Special Contribution Award for the internship.',
  },
]

const awards: Award[] = [
  {
    year: 'OCT 2026',
    category: 'Academic',
    title: 'Quality Youth of the Year 2026',
    recognition: 'National youth recognition',
    organization: 'Foundation of Science and Technology Council of Thailand',
    location: 'Thailand',
  },
  {
    year: 'OCT 2026',
    category: 'International',
    title: 'ITEC ASEAN 2026',
    recognition: 'Top 20 Semi-Finalist',
    organization: 'Chaoyang International Talent Entrepreneurship Conference — ASEAN',
    location: 'Thailand',
  },
  {
    year: 'OCT 2026',
    category: 'International',
    title: 'InnoServe Awards 2026',
    recognition: 'Selected international finalist · Event in November 2026',
    organization: 'International ICT Innovative Services Awards',
    location: 'Taiwan',
  },
  {
    year: 'AUG 2026',
    category: 'National',
    title: 'TESAIoT Secure Edge AI Service Robotics Hackathon',
    recognition: '1st Place — Team EaseAI',
    organization: 'Thai Embedded Systems Association and Maker Association of Thailand',
    location: 'Thailand',
  },
  {
    year: 'JUN 2026',
    category: 'International',
    title: '9th China (Shanghai) International Invention & Innovation Expo',
    recognition: 'Gold Medal & Special Award',
    organization: 'China-South Asia Innovation Forum',
    location: 'China',
  },
  {
    year: 'MAY 2026',
    category: 'International',
    title: 'AI Ready ASEAN Youth Challenge',
    recognition: 'Thailand National Winner · Singapore regional showcase',
    organization: 'ASEAN Foundation / AI Singapore',
    location: 'Singapore',
  },
  {
    year: 'MAY 2026',
    category: 'Research',
    title: 'ECTI-CON 2026',
    recognition: 'Best Paper Award · First Author',
    organization: 'International Conference on Electrical Engineering / Electronics',
    location: 'Thailand',
    evidence: 'https://ieeexplore.ieee.org/document/11608653',
  },
  {
    year: 'APR 2026',
    category: 'International',
    title: 'Best AI Awards — AI Student Division',
    recognition: 'Honorable Award',
    organization: 'Department of Industrial Technology, MOEA',
    location: 'Taiwan',
    evidence: '/certificates/ai-awards-english-supporting-documents.pdf',
  },
  {
    year: 'JAN 2026',
    category: 'National',
    title: 'Thailand New Gen Inventors Award',
    recognition: 'Grand Prize, Gold Medal & Popular Vote',
    organization: 'National Research Council of Thailand',
    location: 'Thailand',
    evidence: '/certificates/wheelsense-inewgen-award-2026-medal.pdf',
  },
  {
    year: 'JAN 2026',
    category: 'International',
    title: 'IPITEx 2026',
    recognition: 'Gold Medal',
    organization: 'National Research Council of Thailand',
    location: 'Thailand',
    evidence: '/certificates/ipitex2026-gold-wheelchair-motion.pdf',
  },
  {
    year: 'NOV 2025',
    category: 'National',
    title: 'TESA Top Gun Rally',
    recognition: '4th Place Nationwide',
    organization: 'Thai Embedded Systems Association',
    location: 'Thailand',
    evidence: '/certificates/embedded-system-tesa-rally-2025.pdf',
  },
  {
    year: 'AUG 2025',
    category: 'National',
    title: 'LabVIEW Battle Thailand',
    recognition: 'Champion',
    organization: 'TECHSQUARE CO., LTD.',
    location: 'Thailand',
    evidence: '/certificates/labview-battle-thailand-2025-winner.pdf',
  },
]

const documents = [
  {
    title: 'Thailand New Gen Inventors Award',
    description: 'Grand Prize and national award evidence · 2026',
    image: '/certificate-thumbs/wheelsense-inewgen-award-2026-medal.jpg',
    href: '/certificates/wheelsense-inewgen-award-2026-medal.pdf',
  },
  {
    title: 'Best AI Awards — Taiwan',
    description: 'International award supporting documents · 2026',
    image: '/certificate-thumbs/ai-awards-english-supporting-documents.jpg',
    href: '/certificates/ai-awards-english-supporting-documents.pdf',
  },
  {
    title: 'IPITEx 2026',
    description: 'Gold Medal certificate · 2026',
    image: '/certificate-thumbs/ipitex2026-gold-wheelchair-motion.jpg',
    href: '/certificates/ipitex2026-gold-wheelchair-motion.pdf',
  },
  {
    title: 'Internship in China',
    description: 'CP CIXI Special Contribution Award · 2025',
    image: '/certificate-thumbs/internship-special-contribution-award-2025.jpg',
    href: '/certificates/internship-special-contribution-award-2025.pdf',
  },
]

const filters: Array<AwardCategory | 'All'> = ['All', 'International', 'Research', 'National', 'Academic']

function ExternalAnchor({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
    </a>
  )
}

export default function ProfessionalPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<AwardCategory | 'All'>('All')
  const [showAllAwards, setShowAllAwards] = useState(false)

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', dismissOnEscape)
    return () => window.removeEventListener('keydown', dismissOnEscape)
  }, [])

  const filteredAwards = awards.filter((award) => activeFilter === 'All' || award.category === activeFilter)
  const displayedAwards = showAllAwards ? filteredAwards : filteredAwards.slice(0, 7)

  return (
    <div className="portfolio">
      <ScrollMotion />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="wordmark" aria-label="Worapon Sangsasri, back to top">
            <span className="wordmark-symbol">W<span className="wordmark-period">.</span></span>
            <span className="wordmark-identity">
              <strong>Worapon Sangsasri</strong>
              <small>ENGINEER & RESEARCHER</small>
            </span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav id="primary-navigation" className={'nav-links' + (menuOpen ? ' is-open' : '')} aria-label="Main navigation">
            {navigation.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Get in touch <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow"><span className="eyebrow-line" /> ENGINEERING · AI · ASSISTIVE TECHNOLOGY</div>
              <h1>Intelligent systems.<br /><em>Human impact.</em></h1>
              <p className="hero-intro">
                I am Worapon, an electrical engineer and researcher developing embedded-AI
                and intelligent sensing systems for mobility, independent living and care.
              </p>
              <div className="hero-buttons">
                <a className="button button-dark" href="#work">Explore selected work <ArrowRight size={17} aria-hidden="true" /></a>
                <a className="text-link" href="/cv.html" target="_blank" rel="noopener noreferrer">View academic CV <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="hero-caption">
                <span>BASED IN BANGKOK, THAILAND</span>
                <span>RESEARCH INTEREST · FALL 2027</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-stage">
                <div className="portrait-accent" aria-hidden="true">01 / PROFILE</div>
                <img
                  className="portrait-image"
                  src="https://avatars.githubusercontent.com/u/105480619?v=4&size=720"
                  alt="Portrait of Worapon Sangsasri"
                  loading="eager"
                />
                <div className="portrait-legend">
                  <span>WORAPON SANGSASRI</span>
                  <span>ENGINEERING RESEARCH</span>
                </div>
              </div>
              <div className="portrait-aside">
                <span className="aside-line" />
                <p>From research prototypes to working systems, with international competition experience.</p>
              </div>
            </div>
          </div>
          <div className="container">
            <a className="scroll-prompt" href="#recognition">SELECTED RECOGNITION <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="proof-strip" aria-label="Selected academic and research achievements">
          <div className="container proof-grid">
            <div><span className="proof-label">ACADEMIC FOUNDATION</span><strong><span data-gpa-counter>3.72</span> <small>/ 4.00</small></strong><p>B.Eng. Electrical Engineering · Thammasat University</p></div>
            <div><span className="proof-label">PEER-REVIEWED RESEARCH</span><strong>Best Paper</strong><p>ECTI-CON 2026 · First author</p></div>
            <div><span className="proof-label">INTERNATIONAL RECOGNITION</span><strong>Gold Medal</strong><p>Shanghai International Invention & Innovation Expo 2026</p></div>
          </div>
        </section>

        <section className="section recognition-section" id="recognition">
          <div className="container">
            <div className="section-top"><span className="section-index">01 / SELECTED RECOGNITION</span><span>CHINA · SINGAPORE · TAIWAN</span></div>
            <div className="section-heading-row motion-reveal">
              <h2>Recognized beyond<br /><em>the laboratory.</em></h2>
              <p>My work has been evaluated in international research, invention and innovation settings, with an emphasis on practical outcomes.</p>
            </div>
            <div className="recognition-grid">
              {highlights.map((entry, index) => (
                <article className="recognition-card motion-reveal" key={entry.locale}>
                  <div className="recognition-top"><span>{entry.locale}</span><span>0{index + 1}</span></div>
                  <div className="recognition-body"><h3>{entry.headline}</h3><p className="recognition-title">{entry.title}</p><p className="recognition-description">{entry.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="section-aside">
              <span className="section-index">02 / ABOUT</span>
              <div className="small-rule" />
              <p>ENGINEER<br />RESEARCHER<br />PROBLEM SOLVER</p>
            </div>
            <div className="about-content motion-reveal">
              <h2>I work where sensing, intelligence and real-world needs meet.</h2>
              <p className="lead-paragraph">
                My background spans electrical engineering, embedded systems, machine learning
                and applied software development. I focus on technology that can move beyond
                a technical demonstration and become genuinely useful to people.
              </p>
              <p>
                Following my B.Eng. at Thammasat University, I now work as an Applications Engineer
                at TECHSQUARE and as an R&D Engineer with CED-SQUARE INNOVATION.
                I have also worked as both a Research Assistant and a Teaching Assistant at the university,
                and completed an industrial automation internship in Zhejiang, China.
              </p>
              <div className="expertise-grid">
                <div><strong>01</strong><h3>Intelligent sensing</h3><p>Wearables, BLE/RSSI and indoor localization for human-centered applications.</p></div>
                <div><strong>02</strong><h3>Embedded & edge AI</h3><p>On-device intelligence, sensor integration and applied machine learning.</p></div>
                <div><strong>03</strong><h3>Assistive robotics</h3><p>Adaptive care workflows, accessible interfaces and intelligent control systems.</p></div>
              </div>
            </div>
          </div>
        </section>

        <ScrollJourney />

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-top"><span className="section-index">04 / SELECTED WORK</span><span>APPLIED ENGINEERING & RESEARCH</span></div>
            <div className="section-heading-row motion-reveal">
              <h2>Built to be used,<br /><em>not just presented.</em></h2>
              <p>From wearable hardware and firmware to AI models, dashboards and care-system integration.</p>
            </div>
            <article className="case-study motion-reveal">
              <div className="case-copy">
                <span className="case-number">01 / FLAGSHIP PROJECT</span>
                <span className="case-line" />
                <h3>WheelSense</h3>
                <p className="case-subhead">AI-enabled assistive care & mobility intelligence</p>
                <p className="case-description">
                  An integrated prototype for wheelchair users, older adults and care teams.
                  WheelSense combines motion sensing, BLE-based localization, intelligent
                  monitoring and smart-environment interaction in one system.
                </p>
                <ul className="case-list">
                  <li>BLE-enabled wearables and indoor sensing infrastructure</li>
                  <li>Backend telemetry, caregiver-facing interfaces and alerts</li>
                  <li>Intelligent assistance and smart-environment integrations</li>
                </ul>
                <ExternalAnchor className="inline-action" href="https://wheelsense-preview.vercel.app/login">Explore project demo</ExternalAnchor>
              </div>
              <div className="case-art" aria-label="Conceptual system diagram for WheelSense">
                <div className="art-title"><span>WHEELSENSE / SYSTEM ARCHITECTURE</span><span>RESEARCH PROTOTYPE</span></div>
                <div className="architecture">
                  <div className="architecture-item"><span className="arch-index">01</span><strong>SENSE</strong><small>Wearables · BLE · IoT</small></div>
                  <div className="arch-join" aria-hidden="true"><span /></div>
                  <div className="architecture-item arch-emphasis"><span className="arch-index">02</span><strong>INTERPRET</strong><small>Localization · Edge AI</small></div>
                  <div className="arch-join" aria-hidden="true"><span /></div>
                  <div className="architecture-item"><span className="arch-index">03</span><strong>SUPPORT</strong><small>Care workflows · Control</small></div>
                </div>
                <div className="art-footer"><span>EMBEDDED SYSTEMS</span><span>APPLIED AI</span><span>HUMAN-CENTERED DESIGN</span></div>
              </div>
            </article>
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-tile motion-reveal" key={project.name}>
                  <div className="project-tile-top"><span>{project.number} / {project.area}</span><ArrowUpRight size={19} aria-hidden="true" /></div>
                  <div className="project-tile-body">
                    <h3>{project.name}</h3>
                    <p>{project.body}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <ExternalAnchor href={project.link} className="project-footer-link">{project.linkText}</ExternalAnchor>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section research-section" id="research">
          <div className="container research-grid">
            <div className="research-label"><span className="section-index light">05 / RESEARCH</span><BookOpenText size={48} strokeWidth={1.2} aria-hidden="true" /></div>
            <div className="research-content motion-reveal">
              <p className="research-caption">FIRST-AUTHOR PUBLICATION · BEST PAPER AWARD</p>
              <h2>Comparative Performance Evaluation of BLE-Based Indoor Motion Tracking Using Machine Learning and Large Language Models</h2>
              <p>
                ECTI-CON 2026. Experimental comparison of machine-learning and LLM approaches
                to BLE-based indoor tracking using ESP32-S3 anchors and a wearable tag, with attention
                to trajectories, boundary transitions and noisy conditions.
              </p>
              <div className="research-meta"><span>2026 · PEER-REVIEWED CONFERENCE</span><span>FIRST AUTHOR · BEST PAPER</span></div>
              <ExternalAnchor className="research-link" href="https://ieeexplore.ieee.org/document/11608653">Read on IEEE Xplore</ExternalAnchor>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="container">
            <div className="section-top"><span className="section-index">06 / EXPERIENCE</span><span>INDUSTRY & ACADEMIA</span></div>
            <div className="section-heading-row motion-reveal">
              <h2>Engineering across<br /><em>different environments.</em></h2>
              <p>Selected roles that shaped how I research, build and communicate engineering systems.</p>
            </div>
            <div className="experience-list">
              <span className="experience-rail" aria-hidden="true"><span className="experience-rail-fill" /></span>
              {experience.map((entry, index) => (
                <article className="experience-row motion-reveal" key={entry.role + entry.company}>
                  <div className="experience-side"><span>{entry.period}</span><span className="experience-number">{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="experience-main"><h3>{entry.role}</h3><p className="experience-company">{entry.company}</p><p className="experience-description">{entry.detail}</p></div>
                  <div className="experience-context">{entry.context}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section awards-section" id="awards">
          <div className="container">
            <div className="section-top"><span className="section-index">07 / AWARDS & HONORS</span><span>2025 — 2026</span></div>
            <div className="section-heading-row motion-reveal">
              <h2>Selected honors,<br /><em>documented results.</em></h2>
              <p>A record of recognition from research, international innovation, embedded systems and engineering competitions.</p>
            </div>
            <div className="award-toolbar" aria-label="Filter awards by category">
              {filters.map((filter) => (
                <button type="button" key={filter} aria-pressed={filter === activeFilter}
                  className={'award-filter' + (filter === activeFilter ? ' selected' : '')}
                  onClick={() => { setActiveFilter(filter); setShowAllAwards(false) }}>
                  {filter}
                </button>
              ))}
            </div>
            <div className="award-list motion-reveal">
              {displayedAwards.map((award) => (
                <article className="award-row" key={activeFilter + (showAllAwards ? "-all-" : "-short-") + award.title}>
                  <span className="award-year">{award.year}</span>
                  <div className="award-text"><h3>{award.title}</h3><p>{award.organization} · {award.location}</p></div>
                  <div className="award-outcome"><strong>{award.recognition}</strong><span>{award.category}</span></div>
                  {award.evidence ? <ExternalAnchor className="award-evidence" href={award.evidence}>Evidence</ExternalAnchor> : <span className="award-evidence-spacer" />}
                </article>
              ))}
            </div>
            {filteredAwards.length > 7 ? (
              <button className="view-all-button" type="button" onClick={() => setShowAllAwards(!showAllAwards)} aria-expanded={showAllAwards}>
                {showAllAwards ? 'Show fewer honors' : 'View all ' + filteredAwards.length + ' honors'}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </section>

        <section className="section documents-section" id="documents">
          <div className="container">
            <div className="section-top"><span className="section-index">08 / DOCUMENTATION</span><span>SELECTED PUBLIC EVIDENCE</span></div>
            <div className="section-heading-row motion-reveal">
              <h2>Work you can<br /><em>verify.</em></h2>
              <p>Selected award certificates and research evidence. Personal admissions records and test score reports are not displayed in this archive.</p>
            </div>
            <div className="documents-grid">
              {documents.map((item) => (
                <ExternalAnchor className="document-card motion-reveal" href={item.href} key={item.title}>
                  <div className="document-image"><img src={item.image} alt={'Certificate preview: ' + item.title} loading="lazy" /></div>
                  <div className="document-content"><h3>{item.title}</h3><p>{item.description}</p><span>VIEW CERTIFICATE <ExternalLink size={13} aria-hidden="true" /></span></div>
                </ExternalAnchor>
              ))}
            </div>
            <div className="document-footer">
              <span>Academic CV</span>
              <p>An up-to-date print-friendly academic CV is available online.</p>
              <a href="/cv.html" target="_blank" rel="noopener noreferrer">Open CV / Save as PDF <Download size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid motion-reveal">
            <div>
              <span className="section-index light">09 / CONTACT</span>
              <h2>Let's build something<br /><em>meaningful.</em></h2>
              <p>Open to conversations about graduate research, intelligent sensing, embedded AI and assistive technology.</p>
            </div>
            <div className="contact-details">
              <a href="mailto:worapon.sangs@gmail.com"><Mail size={19} aria-hidden="true" /><span>EMAIL</span><strong>worapon.sangs@gmail.com</strong><ArrowUpRight size={18} aria-hidden="true" /></a>
              <ExternalAnchor href="https://www.linkedin.com/in/worapon-sangsasri-0371a8376/"><UsersRound size={19} aria-hidden="true" /><span>LINKEDIN</span><strong>Professional profile</strong></ExternalAnchor>
              <ExternalAnchor href="https://github.com/NnopponS"><Code2 size={19} aria-hidden="true" /><span>GITHUB</span><strong>Code & projects</strong></ExternalAnchor>
              <a href="/cv.html" target="_blank" rel="noopener noreferrer"><FileText size={19} aria-hidden="true" /><span>CURRICULUM VITAE</span><strong>View academic CV</strong><ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© 2026 WORAPON SANGSASRI</span>
          <span>ENGINEERING · RESEARCH · HUMAN IMPACT</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  )
}
