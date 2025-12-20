import type { ReactNode } from 'react'

type Props = {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export default function FormField({ label, htmlFor, error, children }: Props) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-text-main mb-2"
      >
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-sm text-error animate-pulse">{error}</p>
      )}
    </div>
  )
}
