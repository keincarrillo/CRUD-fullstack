import type { LoginFormData } from '../types/loginFormType'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import userAvatar from '../assets/userAvatar.svg'

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const onSubmit = async (data: LoginFormData) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="text-center mb-8">
          <div
            ref={iconRef}
            className="inline-block p-3 bg-blue-100 rounded-full mb-4 relative"
          >
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        <div ref={formRef} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                {...register('remember')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-transform group-hover:scale-110"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                Recordarme
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium relative group"
            >
              ¿Olvidaste tu contraseña?
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <div>
            <button
              ref={buttonRef}
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium relative group"
            >
              Regístrate aquí
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin
