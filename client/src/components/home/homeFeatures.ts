export type HomeFeature = {
  title: string
  description: string
  iconPath: string
}

export const HOME_FEATURES: HomeFeature[] = [
  {
    title: 'Firebase Backend',
    description:
      'Base de datos en tiempo real con sincronización automática y seguridad robusta',
    iconPath:
      'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
  },
  {
    title: 'Caché Redis',
    description:
      'Optimización de consultas con almacenamiento en caché de alto rendimiento',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Operaciones CRUD',
    description:
      'Crear, leer, actualizar y eliminar datos de forma intuitiva y eficiente',
    iconPath:
      'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
]
