import { useCallback } from 'react'
import gsap from 'gsap'

export function useGsapInputScale() {
  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: 'power2.out' })
  }, [])

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, { scale: 1, duration: 0.2, ease: 'power2.out' })
  }, [])

  return { onFocus, onBlur }
}
