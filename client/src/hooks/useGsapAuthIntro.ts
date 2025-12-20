import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'

type DivRef = RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null>

type Args = {
  containerRef: DivRef
  headerRef: DivRef
  formRef: DivRef
}

export function useGsapAuthIntro({ containerRef, headerRef, formRef }: Args) {
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const headerChildren = headerRef.current
      ? Array.from(headerRef.current.children)
      : []

    const formChildren = formRef.current
      ? Array.from(formRef.current.children)
      : []

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.from(container, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.4,
      clearProps: 'opacity,transform',
    })
      .from(
        headerChildren,
        {
          opacity: 0,
          y: -10,
          stagger: 0.05,
          duration: 0.3,
          clearProps: 'opacity,transform',
        },
        0.25
      )
      .from(
        formChildren,
        {
          opacity: 0,
          x: -20,
          stagger: 0.05,
          duration: 0.3,
          clearProps: 'opacity,transform',
        },
        0.35
      )

    // ✅ Cleanup SIN salida: solo mata la animación, NO revierte estilos
    return () => {
      tl.kill()
    }
  }, [])
}
