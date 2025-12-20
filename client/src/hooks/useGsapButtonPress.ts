import { useCallback, type RefObject } from 'react'
import gsap from 'gsap'

type BtnRef = RefObject<HTMLButtonElement> | RefObject<HTMLButtonElement | null>

export function useGsapButtonPress(buttonRef: BtnRef) {
  return useCallback(async () => {
    const btn = buttonRef.current
    if (!btn) return

    await gsap.to(btn, { scale: 0.95, duration: 0.1, ease: 'power2.in' })
    await gsap.to(btn, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.3)' })
  }, [buttonRef])
}
