import type { ReactNode, RefObject } from 'react'

type DivRef = RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null>

type Props = {
  children: ReactNode
  containerRef?: DivRef
}

export default function AuthCard({ children, containerRef }: Props) {
  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary to-primary-dark"></div>
      {children}
    </div>
  )
}
