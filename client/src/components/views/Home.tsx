import { useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

import FeatureCard from '../home/FeatureCard'
import { HOME_FEATURES } from '../home/homeFeatures'
import { useGsapHomeIntro } from '../../hooks/useGsapHomeIntro'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useGsapHomeIntro({
    containerRef,
    titleRef,
    subtitleRef,
    featuresRef,
    buttonsRef,
  })

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: 'power2.out' })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
  }

  const handleFeatureHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -5, duration: 0.3, ease: 'power2.out' })
  }

  const handleFeatureLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <div className="max-w-6xl w-full">
        <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary to-primary-dark"></div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark opacity-5 rounded-full -ml-48 -mb-48"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h1
                ref={titleRef}
                className="text-4xl md:text-6xl font-bold text-text-main mb-4"
              >
                Gestión de Datos{' '}
                <span className="text-primary">Inteligente</span>
              </h1>

              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
              >
                Aplicación web moderna con operaciones CRUD, potenciada por
                Firebase y optimizada con caché Redis para máximo rendimiento
              </p>
            </div>

            <div
              ref={featuresRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {HOME_FEATURES.map(f => (
                <FeatureCard
                  key={f.title}
                  {...f}
                  onMouseEnter={handleFeatureHover}
                  onMouseLeave={handleFeatureLeave}
                />
              ))}
            </div>

            <Link to="/signin">
              <div
                ref={buttonsRef}
                className="flex justify-center items-center"
              >
                <button
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group hover:cursor-pointer"
                >
                  <span className="relative z-10">Iniciar sesión</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
