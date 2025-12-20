import type React from 'react'
import type { HomeFeature } from './homeFeatures'

type Props = HomeFeature & {
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

const FeatureCard = ({
  title,
  description,
  iconPath,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="bg-primary-soft border border-border rounded-xl p-6 cursor-pointer"
    >
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-text-main mb-2">{title}</h3>
      <p className="text-text-muted text-sm">{description}</p>
    </div>
  )
}

export default FeatureCard
