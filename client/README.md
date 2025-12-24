# Cliente - Sistema de Gestión de Productos

Frontend con React 19, TypeScript, TailwindCSS y animaciones GSAP.

## Stack

- React 19 + TypeScript
- Vite
- TailwindCSS 4
- React Hook Form
- GSAP (animaciones)
- Axios
- React Router 7

## Inicio

```bash
bun install
```

Crea `.env`:

```env
VITE_API_URL=http://url-de-la-api/api
```

```bash
# Desarrollo
bun run dev

# Build
bun run build
```

## Estructura

```
src/
├── components/
│   ├── Dashboard/          # Vista principal
│   ├── auth/               # Autenticación
│   ├── products/           # CRUD productos
│   ├── ui/                 # Componentes reutilizables
│   └── views/              # Páginas
├── context/
│   └── AuthContext.tsx     # Estado global auth
├── hooks/                  # Custom hooks GSAP
├── services/               # API calls
├── types/                  # TypeScript types
└── utils/                  # Utilidades
```

## Personalización

Colores en `src/index.css`:

```css
@theme {
  --color-primary: #2563eb;
  --color-background: #eef2ff;
  --color-card: #ffffff;
  /* ... */
}
```

## Context de Auth

```tsx
import { useAuth } from './context/AuthContext'

function Component() {
  const { user, signin, signout } = useAuth()
  // ...
}
```

## Scripts

- `dev` - Servidor de desarrollo
- `build` - Build producción
- `preview` - Preview del build
- `lint` - Ejecutar linter

## Licencia

MIT
