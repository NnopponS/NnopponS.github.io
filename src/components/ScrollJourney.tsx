import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Chapter = {
  time: string
  label: string
  title: string
  narrative: string
  evidence: string
}

const chapters: Chapter[] = [
  {
    time: '2022 — 2026',
    label: '01 / FOUNDATION',
    title: 'Learning the engineering behind the idea.',
    narrative:
      'Electrical engineering at Thammasat University established my technical foundation in electronics, signal processing and programming. Working in university research and teaching strengthened the habit of testing an idea against evidence.',
    evidence: 'B.Eng. Electrical Engineering · GPA 3.72 / 4.00',
  },
  {
    time: '2025 — PRESENT',
    label: '02 / FROM IDEA TO PROTOTYPE',
    title: 'Engineering technology that supports people.',
    narrative:
      'WheelSense began with a practical question: how could sensing and intelligent software make mobility and daily care more responsive? The work grew into wearable hardware, indoor positioning, AI experiments and caregiver-facing systems.',
    evidence: 'WheelSense · Assistive technology · Embedded AI',
  },
  {
    time: '2026',
    label: '03 / TESTED ON INTERNATIONAL STAGES',
    title: 'Taking the work beyond the laboratory.',
    narrative:
      'Presenting WheelSense in competition settings brought rigorous questions, new collaborators and international recognition: a Gold Medal and Special Award in Shanghai, representation of Thailand in Singapore, and an AI award in Taiwan.',
    evidence: 'Shanghai · Singapore · Taiwan · ECTI-CON Best Paper',
  },
  {
    time: '2025 — PRESENT',
    label: '04 / INDUSTRY AND RESEARCH',
    title: 'Bringing research into real engineering work.',
    narrative:
      'An automation internship in Zhejiang, research and teaching responsibilities at Thammasat, and engineering roles with TECHSQUARE and CED-SQUARE taught me to balance research ambition with practical systems, reliability and collaboration.',
    evidence: 'CP CIXI China · TECHSQUARE · CED-SQUARE · RA / TA',
  },
  {
    time: 'FALL 2027 / NEXT',
    label: '05 / RESEARCH DIRECTION',
    title: 'Moving toward intelligent, accessible systems.',
    narrative:
      'My next goal is research-oriented master’s study in robotics, intelligent sensing and embedded AI. I want to investigate how robust perception and human-centered system design can help assistive technology work reliably outside the lab.',
    evidence: 'Research goal · Robotics · Embedded AI · Assistive Technology',
  },
]

export function ScrollJourney() {
  const [activeChapter, setActiveChapter] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !('IntersectionObserver' in window)) return

    const items = sectionRef.current.querySelectorAll<HTMLElement>('[data-chapter-index]')
    const observer = new IntersectionObserver(
      (entries) => {
        const inFocus = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (inFocus) {
          const index = Number((inFocus.target as HTMLElement).dataset.chapterIndex)
          if (Number.isFinite(index)) setActiveChapter(index)
        }
      },
      { rootMargin: '-17% 0px -43% 0px', threshold: [0, 0.1, 0.25, 0.4] },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="storytelling-section" id="journey" ref={sectionRef} aria-labelledby="journey-title">
      <div className="container">
        <div className="section-top">
          <span className="section-index">03 / THE JOURNEY</span>
          <span>AN ENGINEERING STORY IN FIVE CHAPTERS</span>
        </div>

        <div className="story-layout">
          <div className="story-sidebar">
            <div className="story-sticky">
              <p className="story-eyebrow">BEHIND THE WORK</p>
              <h2 id="journey-title">From prototypes<br />to <em>purpose.</em></h2>
              <p className="story-introduction">
                A journey shaped by hands-on engineering, research, international
                competitions and a commitment to useful technology.
              </p>

              <div className="story-navigation" aria-label="Journey chapters">
                <div className="story-progress-summary">
                  <span>CHAPTER {String(activeChapter + 1).padStart(2, '0')}</span>
                  <span>{String(chapters.length).padStart(2, '0')} TOTAL</span>
                </div>
                <div className="story-progress-track" aria-hidden="true">
                  <span style={{ transform: 'scaleX(' + ((activeChapter + 1) / chapters.length) + ')' }} />
                </div>
                <div className="story-dots">
                  {chapters.map((chapter, index) => (
                    <a
                      key={chapter.label}
                      href={'#journey-chapter-' + (index + 1)}
                      title={chapter.title}
                      aria-label={'Jump to chapter ' + (index + 1) + ': ' + chapter.title}
                      aria-current={index === activeChapter ? 'step' : undefined}
                      className={index === activeChapter ? 'story-dot is-current' : 'story-dot'}
                      onClick={() => setActiveChapter(index)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </a>
                  ))}
                </div>
                <p className="story-active-title">{chapters[activeChapter].label.replace(/^\d\d \/ /, '')}</p>
              </div>
            </div>
          </div>

          <div className="story-chapters">
            {chapters.map((chapter, index) => (
              <article
                id={'journey-chapter-' + (index + 1)}
                data-chapter-index={index}
                className={'story-chapter motion-reveal' + (index === activeChapter ? ' is-current' : '')}
                key={chapter.label}
              >
                <div className="story-chapter-top">
                  <span>{chapter.time}</span>
                  <span>CHAPTER {String(index + 1).padStart(2, '0')} / 05</span>
                </div>
                <div className="story-chapter-content">
                  <p className="story-chapter-label">{chapter.label}</p>
                  <h3>{chapter.title}</h3>
                  <p className="story-chapter-narrative">{chapter.narrative}</p>
                </div>
                <div className="story-chapter-footer">
                  <span>{chapter.evidence}</span>
                  <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
