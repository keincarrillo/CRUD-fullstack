import { useCallback, type RefObject } from 'react'
import gsap from 'gsap'

type DivRef = RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null>

export function useGsapFeedback(containerRef: DivRef) {
  const success = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    gsap.to(el, {
      y: -10,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })
  }, [containerRef])

  const errorShake = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    gsap.to(el, {
      x: -10,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: 'power2.inOut',
    })
  }, [containerRef])

  return { success, errorShake }
}
