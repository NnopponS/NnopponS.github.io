import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Medal,
  Play,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Trophy,
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

const proofStats = [
  { value: 'GPA 3.72', label: 'Electrical Engineering, Thammasat University' },
  { value: 'TOEIC 790', label: 'English proof for international study and teamwork' },
  { value: '15 PDFs', label: 'Public certificates, awards, scores, and CV' },
  { value: '2026', label: 'AI, invention, research, and showcase milestones' },
]

const quickValues = [
  {
    title: 'AI HealthTech builder',
    text: 'WheelSense connects indoor motion tracking, caregiver workflows, and smart-home control into a working assistive-care prototype.',
    icon: RadioTower,
  },
  {
    title: 'Competition-proven',
    text: 'Winner and award recipient across AI Ready ASEAN, I-New Gen, Best AI Awards Taiwan, LabVIEW, and embedded systems.',
    icon: Trophy,
  },
  {
    title: 'Student mentor energy',
    text: 'Strong foundation in mathematics, physics, programming, and embedded systems, with project experience that is easy to explain to younger students.',
    icon: GraduationCap,
  },
]

const fullProfile = [
  {
    title: 'Education',
    text: 'Fourth-year Electrical Engineering student at Thammasat University, focused on embedded systems, AI HealthTech, indoor localization, and smart environments.',
    icon: GraduationCap,
  },
  {
    title: 'Research',
    text: 'First-author ECTI-CON 2026 work on BLE-based indoor motion tracking using machine learning and large language models.',
    icon: BookOpen,
  },
  {
    title: 'Experience',
    text: 'CP CIXI internship award, TSE Student Welfare Line Bot, student leadership activities, TSE Open House support, and engineering project presentations.',
    icon: Medal,
  },
  {
    title: 'Tools',
    text: 'React, Next.js, FastAPI, Python, Docker, ESP32-S3, M5StickC Plus2, MQTT, BLE RSSI, XGBoost, LabVIEW, MATLAB, and Raspberry Pi.',
    icon: Sparkles,
  },
]

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
  const [showFullProfile, setShowFullProfile] = useState(false)

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
                duration: 0.74,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 86%',
                },
              },
            )
          })

          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
            const distance = Number(element.dataset.parallax) || -56
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
            <div className="hero-nameplate">
              <span>AI HealthTech</span>
              <span>Embedded Systems</span>
              <span>Student Portfolio</span>
            </div>
            <h1>
              Worapon{' '}
              <span>Sangsasri</span>
            </h1>
            <p className="hero-subtitle">
              Electrical engineering student building WheelSense, BLE motion tracking, and
              assistive-care systems that can be tested in the real world.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#profile-snapshot">
                <Play size={18} aria-hidden="true" />
                See short profile
              </a>
              <a className="secondary-action" href={wheelsenseDemoUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" />
                WheelSense demo
              </a>
            </div>
            <img
              aria-hidden="true"
              className="mobile-hero-strip"
              src="/art/light-profile-hero.png"
              alt=""
            />
            <div className="hero-proof" aria-label="Key proof points">
              {proofStats.map((stat) => (
                <div key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-art" data-parallax="-36" data-reveal>
            <img
              src="/art/light-profile-hero.png"
              alt="Generated light portfolio artwork using Worapon Sangsasri's portrait with WheelSense, certificates, awards, sensors, and engineering project imagery"
            />
            <div className="hero-art-card">
              <span>Flagship project</span>
              <strong>WheelSense</strong>
              <p>Assistive motion sensing, caregiver intelligence, and smart-home control.</p>
            </div>
          </div>

          <a className="next-preview" href="#profile-snapshot">
            <span>Start with the short version</span>
            <strong>Profile, honors, experience, and proof in one scan.</strong>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </section>

        <section className="profile-snapshot" id="profile-snapshot">
          <div className="snapshot-copy" data-reveal>
            <p className="section-kicker">Short profile</p>
            <h2>Engineer, researcher, and student mentor with proof behind the story.</h2>
            <p>
              I build assistive technology and explain complex engineering clearly: from BLE motion
              tracking and embedded systems to AI evaluation, presentations, and student support.
            </p>
            <button
              aria-controls="full-profile"
              aria-expanded={showFullProfile}
              className="detail-toggle"
              onClick={() => setShowFullProfile((value) => !value)}
              type="button"
            >
              {showFullProfile ? 'Hide full profile' : 'See full profile detail'}
              <ChevronDown size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="value-cards">
            {quickValues.map((item) => {
              const Icon = item.icon
              return (
                <article data-reveal key={item.title}>
                  <Icon size={25} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              )
            })}
          </div>

          {showFullProfile ? (
            <div className="full-profile-panel" data-reveal id="full-profile">
              {fullProfile.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title}>
                    <Icon size={22} aria-hidden="true" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}
        </section>

        <section className="proof-poster" aria-labelledby="poster-heading">
          <div className="poster-media" data-parallax="-32">
            <img
              src="/art/light-achievement-collage.png"
              alt="Generated achievement collage with awards, certificates, wheelchair motion sensing, embedded boards, and presentation scenes"
              loading="lazy"
            />
          </div>
          <div className="poster-copy" data-reveal>
            <p className="section-kicker">Proof poster</p>
            <h2 id="poster-heading">Short enough to scan. Strong enough to trust.</h2>
            <div className="poster-list">
              <span>National and international awards</span>
              <span>Research and working prototype evidence</span>
              <span>Certificates, English scores, and CV archive</span>
            </div>
            <a href="#certificates">
              View public certificate archive
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="story-section" id="timeline">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Journey map</p>
            <h2>One journey, five checkpoints: profile, WheelSense, research, honors, proof.</h2>
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

        <section className="scene-section" aria-labelledby="scene-heading">
          <div className="scene-copy" data-reveal>
            <p className="section-kicker">Checkpoint scene</p>
            <h2 id="scene-heading">Each checkpoint connects the profile to the evidence behind it.</h2>
            <p>
              The path moves from study and sensing work into WheelSense, research, honors, and
              public proof that visitors can inspect.
            </p>
          </div>
          <div className="scene-frame" data-reveal>
            <Suspense fallback={<div className="journey-scene scene-fallback">Loading journey map</div>}>
              <JourneyScene reducedMotion={reducedMotion} />
            </Suspense>
            <div className="map-card">
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
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading compact" data-reveal>
            <p className="section-kicker">Projects</p>
            <h2>WheelSense first, with supporting engineering work around it.</h2>
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
            <p className="section-kicker">Skills evidence</p>
            <h2>Skills are grouped by evidence, not decoration.</h2>
            <p>
              The site keeps the first scan short, then lets visitors inspect skills, projects,
              awards, and documents in clear sections.
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
            <h2>Short honor cards for fast trust, with the certificate archive below.</h2>
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
            <p className="section-kicker">Certificate preview</p>
            <h2>Featured proof appears before the full downloadable archive.</h2>
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
            <h2>Collect the milestones in a small game about the same journey.</h2>
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
              Light web story with mini-game
            </span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
