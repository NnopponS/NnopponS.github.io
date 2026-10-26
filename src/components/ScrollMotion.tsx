import { useEffect, useRef } from 'react'

/**
 * Progressive enhancement: content remains visible if JavaScript motion fails
 * or the visitor requests reduced motion. No forced smooth-scroll hijacking.
 */
export function ScrollMotion() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const progress = Math.max(0, Math.min(1, window.scrollY / scrollableHeight))
        if (progressRef.current) progressRef.current.style.transform = 'scaleX(' + progress + ')'
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let alive = true
    let revert: (() => void) | undefined

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, triggerModule]) => {
        if (!alive) return
        const root = document.querySelector('.portfolio')
        if (!root) return

        const gsap = gsapModule.gsap
        gsap.registerPlugin(triggerModule.ScrollTrigger)
        const context = gsap.context(() => {
          gsap.from('.hero-content > *', {
            autoAlpha: 0,
            y: 22,
            duration: 0.78,
            stagger: 0.11,
            delay: 0.08,
            ease: 'power2.out',
            clearProps: 'opacity,visibility,transform',
          })
          gsap.from('.portrait-stage', {
            autoAlpha: 0,
            y: 26,
            duration: 1,
            delay: 0.28,
            ease: 'power2.out',
            clearProps: 'opacity,visibility,transform',
          })
          gsap.to('.portrait-image', {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-grid',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })

          gsap.utils.toArray<HTMLElement>('.motion-reveal').forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 25 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                ease: 'power2.out',
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 92%',
                  once: true,
                },
              },
            )
          })

          const experienceLine = root.querySelector<HTMLElement>('.experience-rail-fill')
          if (experienceLine) {
            gsap.fromTo(
              experienceLine,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.experience-list',
                  start: 'top 78%',
                  end: 'bottom 65%',
                  scrub: 0.4,
                },
              },
            )
          }

          const gpa = root.querySelector<HTMLElement>('[data-gpa-counter]')
          if (gpa) {
            const score = { value: 0 }
            gsap.to(score, {
              value: 3.72,
              duration: 1.25,
              ease: 'power2.out',
              onUpdate: () => {
                gpa.textContent = score.value.toFixed(2)
              },
              scrollTrigger: {
                trigger: gpa,
                start: 'top 92%',
                once: true,
              },
            })
          }
        }, root)

        revert = () => context.revert()
      },
    ).catch(() => {
      // The editorial layout and content still work without scroll animation.
    })

    return () => {
      alive = false
      revert?.()
    }
  }, [])

  return <div ref={progressRef} className="reading-progress" aria-hidden="true" />
}
