import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Download,
  ExternalLink,
  Mail,
  Play,
  RadioTower,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { CertificateGallery } from './components/CertificateGallery'
import { GitHubMark } from './components/GitHubMark'
import { JourneyGame } from './components/JourneyGame'
import {
  certificateItems,
  honorItems,
  journeyCheckpoints,
  navItems,
  projectItems,
  skillGroups,
} from './data/portfolio'

const wheelsenseDemoUrl = 'https://wheelsense-preview.vercel.app/login'
const JourneyScene = lazy(() =>
  import('./components/JourneyScene').then((module) => ({ default: module.JourneyScene })),
)

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !appRef.current) return

    let active = true
    let cleanup: (() => void) | undefined

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (!active || !appRef.current) return

        const { gsap } = gsapModule
        const { ScrollTrigger } = scrollTriggerModule
        gsap.registerPlugin(ScrollTrigger)

        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
            gsap.fromTo(
              element,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.78,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 84%',
                },
              },
            )
          })

          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
            const distance = Number(element.dataset.parallax) || -70
            gsap.to(element, {
              y: distance,
              ease: 'none',
              scrollTrigger: {
                trigger: element.closest('section') ?? element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          })
        }, appRef)

        cleanup = () => context.revert()
      },
    )

    return () => {
      active = false
      cleanup?.()
    }
  }, [reducedMotion])

  const featuredCertificates = certificateItems.filter((certificate) => certificate.featured)

  return (
    <div className="site-shell" ref={appRef}>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand-mark" href="#story" aria-label="Worapon Sangsasri home">
          WS
        </a>
        <nav>
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero-section" id="story">
          <div className="hero-copy" data-reveal>
            <p className="intro-line">Engineering impact for real people.</p>
            <h1>
              Worapon
              <span>Sangsasri</span>
            </h1>
            <p className="hero-subtitle">AI HealthTech and Embedded Systems</p>
            <p className="hero-body">
              Fourth-year Electrical Engineering student at Thammasat University building assistive
              motion sensing, caregiver intelligence, and smart environment control.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#timeline">
                <Play size={18} aria-hidden="true" />
                Start the journey
              </a>
              <a className="secondary-action" href={wheelsenseDemoUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" />
                Open WheelSense demo
              </a>
            </div>
            <a className="demo-url" href={wheelsenseDemoUrl} target="_blank" rel="noreferrer">
              wheelsense-preview.vercel.app/login
            </a>
          </div>

          <div className="hero-map" data-parallax="-42">
            <Suspense fallback={<div className="journey-scene scene-fallback">Loading journey map</div>}>
              <JourneyScene reducedMotion={reducedMotion} />
            </Suspense>
            <div className="map-card" data-reveal>
              <span>Currently building</span>
              <strong>WheelSense</strong>
              <p>Making mobility data actionable for prevention and personalized care.</p>
              <div className="tech-pills">
                <span>BLE RSSI</span>
                <span>FastAPI</span>
                <span>Next.js</span>
              </div>
            </div>
          </div>

          <a className="next-preview" href="#timeline">
            <span>The journey so far</span>
            <strong>Turning curiosity into tested systems.</strong>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </section>

        <section className="story-section" id="timeline">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">The journey so far</p>
            <h2>Turning curiosity into systems that can be tested, shown, and improved.</h2>
          </div>
          <div className="checkpoint-rail">
            {journeyCheckpoints.map((checkpoint) => {
              const Icon = checkpoint.icon
              return (
                <article className="checkpoint-card" data-reveal key={checkpoint.id}>
                  <span className="checkpoint-number">{checkpoint.marker}</span>
                  <Icon size={26} aria-hidden="true" />
                  <h3>{checkpoint.title}</h3>
                  <p>{checkpoint.detail}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading compact" data-reveal>
            <p className="section-kicker">Projects</p>
            <h2>Flagship work first, supporting engineering work around it.</h2>
          </div>
          <div className="project-showcase">
            {projectItems.map((project, index) => (
              <article className={index === 0 ? 'project-card featured' : 'project-card'} data-reveal key={project.title}>
                <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <p>{project.period}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <strong>{project.impact}</strong>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    Open live demo
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="evidence-section">
          <div className="evidence-copy" data-reveal>
            <p className="section-kicker">Research and skill map</p>
            <h2>Evidence-backed engineering, not a decorative resume.</h2>
            <p>
              The portfolio is structured as a journey because the work connects: embedded sensing,
              AI evaluation, caregiver workflows, student leadership, and award-stage communication.
            </p>
          </div>
          <div className="skill-bento">
            {skillGroups.map((group) => {
              const Icon = group.icon
              return (
                <article data-reveal key={group.label}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="awards-section" id="awards">
          <div className="section-heading compact" data-reveal>
            <p className="section-kicker">Honors</p>
            <h2>Recognition across AI, invention, embedded systems, and academic performance.</h2>
          </div>
          <div className="honor-grid">
            {honorItems.map((honor) => {
              const Icon = honor.icon
              return (
                <article className="honor-card" data-reveal key={honor.title}>
                  <Icon size={28} aria-hidden="true" />
                  <div>
                    <span>{honor.date}</span>
                    <h3>{honor.title}</h3>
                    <p>{honor.issuer}</p>
                  </div>
                  <strong>{honor.detail}</strong>
                </article>
              )
            })}
          </div>
        </section>

        <section className="featured-certificates">
          <div className="section-heading compact" data-reveal>
            <p className="section-kicker">Proof preview</p>
            <h2>Featured certificates are visible before the full archive.</h2>
          </div>
          <div className="featured-strip">
            {featuredCertificates.map((certificate) => (
              <a href={certificate.pdfPath} target="_blank" rel="noreferrer" data-reveal key={certificate.pdfPath}>
                <img src={certificate.thumbnailPath} alt={`${certificate.title} preview`} loading="lazy" />
                <span>{certificate.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="certificates-section" id="certificates">
          <div className="section-heading compact" data-reveal>
            <p className="section-kicker">Certificates</p>
            <h2>A public archive of awards, English scores, experience evidence, and CV.</h2>
            <p>
              Private application, identity, financial, recommendation, and admissions documents are excluded
              from the public site.
            </p>
          </div>
          <CertificateGallery />
        </section>

        <section className="game-section" id="journey-game">
          <div className="section-heading compact" data-reveal>
            <p className="section-kicker">Playable story</p>
            <h2>A lightweight game layer for the same engineering journey.</h2>
          </div>
          <JourneyGame />
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-panel" data-reveal>
            <div>
              <p className="section-kicker">Contact</p>
              <h2>Let the work speak first, then start the conversation.</h2>
              <p>
                Available for graduate research, AI HealthTech collaboration, embedded systems work,
                and assistive technology discussions.
              </p>
            </div>
            <div className="contact-actions">
              <a href="mailto:worapon.sangs@gmail.com">
                <Mail size={18} aria-hidden="true" />
                Email Worapon
              </a>
              <a href="https://github.com/NnopponS" target="_blank" rel="noreferrer">
                <GitHubMark size={18} />
                View GitHub
              </a>
              <a href="/certificates/cv-worapon-sangsasri.pdf" download>
                <Download size={18} aria-hidden="true" />
                Download CV
              </a>
            </div>
          </div>
          <div className="footer-proof" aria-label="Portfolio proof points">
            <span>
              <RadioTower size={18} aria-hidden="true" />
              WheelSense demo linked
            </span>
            <span>
              <BadgeCheck size={18} aria-hidden="true" />
              15 public PDFs
            </span>
            <span>
              <ShieldCheck size={18} aria-hidden="true" />
              Private application docs excluded
            </span>
            <span>
              <Sparkles size={18} aria-hidden="true" />
              Web story with mini-game
            </span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
