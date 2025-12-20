import axios from 'axios'

export const getHttpErrorMessage = (
  error: unknown,
  fallback = 'Error al procesar la solicitud'
) => {
  if (axios.isAxiosError(error)) {
    const msg =
      (error.response?.data as any)?.message || error.response?.statusText

    if (msg) return String(msg)
    if (error.request) return 'No se pudo conectar con el servidor'
    return fallback
  }
  return fallback
}
