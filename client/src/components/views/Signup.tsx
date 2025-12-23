import type { SignupFormData } from '../../types/signupFormType'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthLayout from '../auth/AuthLayout'
import AuthCard from '../auth/AuthCard'
import Alert from '../ui/Alert'
import FormField from '../ui/FormField'

import { EMAIL_REGEX, PASSWORD_STYLE } from '../constants/validation'
import { signupRequest } from '../../services/auth.service'
import { getHttpErrorMessage } from '../../utils/httpError'

import { useGsapAuthIntro } from '../../hooks/useGsapAuthIntro'
import { useGsapButtonPress } from '../../hooks/useGsapButtonPress'
import { useGsapFeedback } from '../../hooks/useGsapFeedback'
import { useGsapInputScale } from '../../hooks/useGsapInputScale'

const Signup = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>()

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [apiError, setApiError] = useState('')
  const [apiSuccess, setApiSuccess] = useState(false)

  const password = watch('password', '')
  const { onFocus, onBlur } = useGsapInputScale()
  const press = useGsapButtonPress(buttonRef)
  const { success, errorShake } = useGsapFeedback(containerRef)

  useGsapAuthIntro({ containerRef, headerRef, formRef })

  const onSubmit = async (data: SignupFormData) => {
    setApiError('')
    setApiSuccess(false)

    await press()

    try {
      await signupRequest(data)
      setApiSuccess(true)
      success()
      navigate('/signin', { replace: true })
    } catch (err) {
      setApiError(getHttpErrorMessage(err, 'Error al crear la cuenta'))
      errorShake()
    }
  }

  return (
    <AuthLayout>
      <AuthCard containerRef={containerRef}>
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">
            Crear cuenta
          </h1>
          <p className="text-text-muted">Regístrate para comenzar</p>
        </div>

        {apiSuccess && (
          <Alert variant="success" message="¡Cuenta creada exitosamente!" />
        )}
        {apiError && <Alert variant="error" message={apiError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div ref={formRef} className="space-y-5">
            <FormField
              label="Nombre completo"
              htmlFor="name"
              error={errors.name?.message}
            >
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                })}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                placeholder="Juan Pérez"
              />
            </FormField>

            <FormField
              label="Correo electrónico"
              htmlFor="email"
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Correo electrónico inválido',
                  },
                })}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                placeholder="tu@email.com"
              />
            </FormField>

            <FormField
              label="Contraseña"
              htmlFor="password"
              error={errors.password?.message}
            >
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                onFocus={onFocus}
                onBlur={onBlur}
                style={PASSWORD_STYLE}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                placeholder="••••••••"
              />
            </FormField>

            <FormField
              label="Confirmar contraseña"
              htmlFor="confirmPassword"
              error={errors.confirmPassword?.message}
            >
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Debes confirmar tu contraseña',
                  validate: v =>
                    v === password || 'Las contraseñas no coinciden',
                })}
                onFocus={onFocus}
                onBlur={onBlur}
                style={PASSWORD_STYLE}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                placeholder="••••••••"
              />
            </FormField>

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark hover:cursor-pointer text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/signin"
              className="text-primary hover:text-primary-dark font-medium relative group"
            >
              Inicia sesión aquí
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}

export default Signup
