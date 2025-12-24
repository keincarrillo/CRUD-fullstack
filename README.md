# CRUD Fullstack - Sistema de Gestión de Productos

Aplicación web fullstack con autenticación, sistema de roles y operaciones CRUD completas.

## Stack Tecnológico

**Frontend:** React 19 + TypeScript + Vite + TailwindCSS + GSAP  
**Backend:** Bun + Express + Firebase + Redis + JWT

## Características

- Sistema de autenticación con roles (Admin, Moderador, Usuario)
- CRUD completo de productos con permisos granulares
- Animaciones fluidas con GSAP
- Caché de sesiones con Redis
- Validaciones en frontend y backend

## Inicio Rápido

### Requisitos

- Bun 1.0+
- Redis
- Cuenta de Firebase

### 1. Backend

```bash
cd server
bun install
```

Crea `.env`:

```env
API_KEY=tu_api_key
AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PROJECT_ID=tu_proyecto_id
STORAGE_BUCKET=tu_proyecto.appspot.com
MESSAGING_SENDER_ID=tu_sender_id
APP_ID=tu_app_id
PORT=3000
JWT_SECRET=tu_secret_seguro
REDIS_URL=redis://127.0.0.1:6379
```

```bash
bun run dev
```

### 2. Frontend

```bash
cd client
bun install
```

Crea `.env`:

```env
VITE_API_URL=http://url-de-la-api/api
```

```bash
bun run dev
```

## Sistema de Roles

| Acción   | Admin | Moderador | Usuario |
| -------- | ----- | --------- | ------- |
| Crear    | ✅    | ❌        | ❌      |
| Editar   | ✅    | ❌        | ❌      |
| Eliminar | ❌    | ✅        | ❌      |
| Ver      | ✅    | ✅        | ✅      |

## Docker

```bash
cd server
docker-compose up -d
```

## Documentación

- [Frontend](./client/README.md)
- [Backend](./server/README.md)

## Autor

Kein Carrillo - [@keincarrillo](https://github.com/keincarrillo)

## 📝 Licencia

MIT
