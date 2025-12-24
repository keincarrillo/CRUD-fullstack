# Servidor - API REST de Gestión de Productos

Backend con Express, Firebase Firestore, Redis y autenticación JWT.

## Stack

- Bun runtime
- Express.js 5
- Firebase (Firestore + Auth)
- Redis (sesiones)
- JWT
- TypeScript

## Inicio

```bash
bun install
```

Crea `.env`:

```env
# Firebase
API_KEY=tu_api_key
AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PROJECT_ID=tu_proyecto_id
STORAGE_BUCKET=tu_proyecto.appspot.com
MESSAGING_SENDER_ID=123456789
APP_ID=tu_app_id

# Server
PORT=3000
JWT_SECRET=tu_secret_seguro

# Redis
REDIS_URL=redis://127.0.0.1:6379
```

```bash
# Inicia Redis
redis-server

# Inicia el servidor
bun run dev
```

## Estructura

```
src/
├── controllers/        # Lógica de negocio
├── middlewares/        # Verificación de roles
├── routes/            # Definición de rutas
├── services/          # Firebase y Redis
├── types/             # TypeScript types
└── utils/             # Validaciones
```

## Endpoints

### Autenticación

**POST** `/api/auth/signup` - Registrar usuario

```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "123456",
  "rol": "user"
}
```

**POST** `/api/auth/signin` - Iniciar sesión

```json
{
  "email": "juan@mail.com",
  "password": "123456"
}
```

**GET** `/api/auth/verify` - Verificar token

**POST** `/api/auth/signout` - Cerrar sesión

### Productos

**GET** `/api/products` - Listar productos

**GET** `/api/products/:id` - Obtener producto

**POST** `/api/products` 🔒 Admin - Crear producto

```json
{
  "nombre": "Laptop",
  "marca": "Dell",
  "precio": 9999,
  "descripcion": "Laptop Dell",
  "stock": 10
}
```

**PUT** `/api/products/:id` Admin - Actualizar producto

**DELETE** `/api/products/:id` Moderator/Admin - Eliminar producto

## 🎭 Roles y Permisos

| Rol       | Crear | Leer | Actualizar | Eliminar |
| --------- | ----- | ---- | ---------- | -------- |
| Admin     | ✅    | ✅   | ✅         | ❌       |
| Moderator | ❌    | ✅   | ❌         | ✅       |
| User      | ❌    | ✅   | ❌         | ❌       |

## 🐳 Docker

```bash
docker-compose up -d
```

Inicia:

- API: puerto 3000
- Redis: puerto 6379

## Autenticación

1. **Signup**: Crea usuario en Firebase + Firestore
2. **Signin**: Autentica → Crea sesión en Redis → JWT en cookie
3. **Verify**: Valida JWT + sesión Redis
4. **Signout**: Elimina sesión + cookie

Sesión Redis: `sess:{sid}` → TTL 24h

## 📝 alidaciones

**Productos:**

- nombre: min 3 caracteres
- marca: requerido
- precio: > 0
- descripcion: min 10 caracteres
- stock: >= 0

**Auth:**

- email: formato válido
- password: min 6 caracteres

## Licencia

MIT
