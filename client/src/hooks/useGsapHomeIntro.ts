import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'

type Args = {
  containerRef: RefObject<HTMLDivElement | null>
  titleRef: RefObject<HTMLHeadingElement | null>
  subtitleRef: RefObject<HTMLParagraphElement | null>
  featuresRef: RefObject<HTMLDivElement | null>
  buttonsRef: RefObject<HTMLDivElement | null>
}

export function useGsapHomeIntro({
  containerRef,
  titleRef,
  subtitleRef,
  featuresRef,
  buttonsRef,
}: Args) {
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const featuresChildren = featuresRef.current
      ? Array.from(featuresRef.current.children)
      : []

    const buttonsChildren = buttonsRef.current
      ? Array.from(buttonsRef.current.children)
      : []

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.from(container, {
      opacity: 0,
      duration: 0.5,
      clearProps: 'opacity',
    })
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: 'back.out(1.2)',
          clearProps: 'opacity,transform',
        },
        0.2
      )
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          clearProps: 'opacity,transform',
        },
        0.4
      )
      .from(
        featuresChildren,
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.5,
          clearProps: 'opacity,transform',
        },
        0.6
      )
      .from(
        buttonsChildren,
        {
          opacity: 0,
          scale: 0.98,
          stagger: 0.1,
          duration: 0.4,
          ease: 'back.out(.6)',
          clearProps: 'opacity,transform',
        },
        0.6
      )

    // ✅ IMPORTANTE: no retornes tl.kill() (porque “devuelve Timeline”)
    return () => {
      tl.kill()
    }
  }, [])
}
