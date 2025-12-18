import type { SignupFormData } from '../types/signupFormType'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>()

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const password = watch('password')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.from(iconRef.current, {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.5,
        delay: 0.1,
        ease: 'back.out(1.5)',
      })

      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: -10,
        stagger: 0.05,
        duration: 0.3,
        delay: 0.25,
        ease: 'power2.out',
      })

      gsap.from(formRef.current?.children || [], {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        duration: 0.3,
        delay: 0.35,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true)
    console.log('Datos del formulario:', data)

    await gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.in',
    })

    await gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'elastic.out(1, 0.3)',
    })

    gsap.to(containerRef.current, {
      y: -10,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })

    setTimeout(() => setIsSubmitting(false), 1000)
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary to-primary-dark"></div>

        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">
            Crear cuenta
          </h1>
          <p className="text-text-muted">Regístrate para comenzar</p>
        </div>

        <div ref={formRef} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-main mb-2"
            >
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              {...register('fullName', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
              placeholder="Juan Pérez"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-error animate-pulse">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-main mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-main mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'Mínimo 6 caracteres',
                },
              })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-main mb-2"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Debes confirmar tu contraseña',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden',
              })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error animate-pulse">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <button
              ref={buttonRef}
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            ¿Ya tienes cuenta?{' '}
            <a
              href="#"
              className="text-primary hover:text-primary-dark font-medium relative group"
            >
              Inicia sesión aquí
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
