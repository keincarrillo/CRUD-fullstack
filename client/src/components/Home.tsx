import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })

      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        delay: 0.2,
        ease: 'back.out(1.2)',
      })

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.4,
        ease: 'power2.out',
      })

      gsap.from(featuresRef.current?.children || [], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.6,
        ease: 'power2.out',
      })

      gsap.from(buttonsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.6,
        ease: 'back.out(.6)',
      })
    })

    return () => ctx.revert()
  }, [])

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleFeatureHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -5,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleFeatureLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <div className="max-w-6xl w-full">
        <div
          ref={heroRef}
          className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
        >
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
              <div
                onMouseEnter={handleFeatureHover}
                onMouseLeave={handleFeatureLeave}
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
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-main mb-2">
                  Firebase Backend
                </h3>
                <p className="text-text-muted text-sm">
                  Base de datos en tiempo real con sincronización automática y
                  seguridad robusta
                </p>
              </div>

              <div
                onMouseEnter={handleFeatureHover}
                onMouseLeave={handleFeatureLeave}
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-main mb-2">
                  Caché Redis
                </h3>
                <p className="text-text-muted text-sm">
                  Optimización de consultas con almacenamiento en caché de alto
                  rendimiento
                </p>
              </div>

              <div
                onMouseEnter={handleFeatureHover}
                onMouseLeave={handleFeatureLeave}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-main mb-2">
                  Operaciones CRUD
                </h3>
                <p className="text-text-muted text-sm">
                  Crear, leer, actualizar y eliminar datos de forma intuitiva y
                  eficiente
                </p>
              </div>
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
