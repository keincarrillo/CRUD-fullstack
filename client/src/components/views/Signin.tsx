import type { SigninFormData } from '../../types/signinFormType'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import AuthLayout from '../auth/AuthLayout'
import AuthCard from '../auth/AuthCard'
import Alert from '../ui/Alert'
import FormField from '../ui/FormField'

import { EMAIL_REGEX, PASSWORD_STYLE } from '../constants/validation'
import { signinRequest } from '../../services/auth.service'
import { getHttpErrorMessage } from '../../utils/httpError'

import { useGsapAuthIntro } from '../../hooks/useGsapAuthIntro'
import { useGsapButtonPress } from '../../hooks/useGsapButtonPress'
import { useGsapFeedback } from '../../hooks/useGsapFeedback'
import { useGsapInputScale } from '../../hooks/useGsapInputScale'

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>()

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [apiError, setApiError] = useState('')
  const [apiSuccess, setApiSuccess] = useState(false)

  const { onFocus, onBlur } = useGsapInputScale()
  const press = useGsapButtonPress(buttonRef)
  const { success, errorShake } = useGsapFeedback(containerRef)

  useGsapAuthIntro({ containerRef, headerRef, formRef }) // 👈 sin iconRef

  const onSubmit = async (data: SigninFormData) => {
    setApiError('')
    setApiSuccess(false)

    await press()

    try {
      await signinRequest(data)
      setApiSuccess(true)
      success()
    } catch (err) {
      setApiError(getHttpErrorMessage(err, 'Credenciales inválidas'))
      errorShake()
    }
  }

  return (
    <AuthLayout>
      <AuthCard containerRef={containerRef}>
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">Bienvenido</h1>
          <p className="text-text-muted">Inicia sesión en tu cuenta</p>
        </div>

        {apiSuccess && (
          <Alert variant="success" message="¡Inicio de sesión exitoso!" />
        )}
        {apiError && <Alert variant="error" message={apiError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div ref={formRef} className="space-y-6">
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

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            ¿No tienes cuenta?{' '}
            <Link
              to="/signup"
              className="text-primary hover:text-primary-dark font-medium relative group"
            >
              Regístrate aquí
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
