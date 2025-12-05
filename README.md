# API REST de Gestión de Productos

## Requisitos previos

- [Bun](https://bun.sh/) instalado (v1.0.0 o superior)
- Una cuenta de [Firebase](https://firebase.google.com/) con un proyecto configurado
- Firestore habilitado en tu proyecto de Firebase

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/keincarrillo/CRUD-fullstack.git
cd server
```

2. Instala las dependencias:

```bash
bun install
```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto:

```bash
API_KEY="tu_api_key_de_firebase"
AUTH_DOMAIN="tu_proyecto.firebaseapp.com"
PROJECT_ID="tu_proyecto_id"
STORAGE_BUCKET="tu_proyecto.appspot.com"
MESSAGING_SENDER_ID="tu_messaging_sender_id"
APP_ID="tu_app_id"
MEASUREMENT_ID="tu_measurement_id"
```

> **Nota:** Puedes obtener estas credenciales desde la consola de Firebase en Configuración del proyecto > General > Tus aplicaciones.

## Ejecución

### Modo desarrollo (con hot-reload):

```bash
bun run dev
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

## Estructura del proyecto

```
.
├── src/
│   ├── config/          # Configuración de Firebase
│   ├── controllers/     # Lógica de negocio
│   ├── firebase/        # Inicialización de Firebase
│   ├── routes/          # Definición de rutas
│   ├── types/           # Tipos de TypeScript
│   └── utils/           # Funciones de validación
├── index.ts             # Punto de entrada
├── package.json
├── tsconfig.json
└── .env                 # Variables de entorno (no incluir en git)
```

## 🔒 Seguridad

- El archivo `.env` está incluido en `.gitignore` para evitar exponer credenciales
- Nunca compartas tus credenciales de Firebase públicamente
- Considera implementar reglas de seguridad en Firestore para producción

## 📝 Mejoras futuras

- [ ] Implementar autenticación y autorización
- [ ] Agregar endpoint para listar productos
- [ ] Agregar endpoint para eliminar productos
- [ ] Implementar paginación
- [ ] Agregar tests unitarios e integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Caché con Redis

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
