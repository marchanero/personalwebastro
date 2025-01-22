# Personal Website - Roberto Sánchez Reolid

Sitio web personal construido con Astro, React y TailwindCSS.

## 🚀 Características

- ⚡️ Rendimiento optimizado con Astro
- 🎨 Diseño responsive con TailwindCSS
- 🌙 Modo oscuro/claro
- 📊 Sistema de publicaciones con filtrado y ordenamiento
- 🔍 SEO optimizado
- 🧪 Tests unitarios
- 📱 PWA ready

## 🛠️ Stack Tecnológico

- [Astro](https://astro.build)
- [React](https://reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Docker](https://www.docker.com)
- [GitHub Actions](https://github.com/features/actions)
- [GitHub Container Registry](https://ghcr.io)

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/username/personalwebastro.git

# Entrar al directorio
cd astroweb

# Instalar dependencias
npm install
```

## 🔧 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ver cobertura de tests
npm run test:coverage
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza el build de producción
- `npm test` - Ejecuta los tests
- `npm run test:watch` - Ejecuta los tests en modo watch
- `npm run test:coverage` - Genera reporte de cobertura
- `npm run lint` - Ejecuta el linter
- `npm run typecheck` - Verifica tipos de TypeScript
- `npm run format` - Formatea el código
- `npm run ci` - Ejecuta todas las verificaciones de CI

## 🗂️ Estructura del Proyecto

```
astroweb/
├── src/
│   ├── api/           # API endpoints y funciones
│   ├── components/    # Componentes reutilizables
│   ├── layouts/       # Layouts de página
│   ├── pages/         # Páginas y rutas
│   └── styles/        # Estilos globales
├── public/            # Archivos estáticos
├── tests/            # Tests y configuración
└── .github/          # Configuración de GitHub Actions
```

## 🧪 Testing

El proyecto utiliza Vitest para testing. Los tests están organizados junto a los archivos que prueban:

```
src/
└── api/
    ├── publications.js
    └── publications.test.ts
```

## 🐳 Docker

El proyecto está completamente dockerizado para desarrollo y producción.

### Desarrollo con Docker

```bash
# Iniciar el entorno de desarrollo
docker-compose up dev

# Ver logs
docker-compose logs -f dev
```

### Producción con Docker

```bash
# Construir y ejecutar para producción
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Comandos Docker útiles

```bash
# Reconstruir imágenes
docker-compose build --no-cache

# Limpiar recursos no utilizados
docker system prune -f

# Ver estado de los contenedores
docker-compose ps
```

## 📈 CI/CD

El proyecto utiliza GitHub Actions para CI/CD automatizado:

### Pipeline de CI

- Ejecutar tests unitarios
- Verificación de tipos TypeScript
- Análisis de código con ESLint
- Generación de reportes de cobertura
- Build y pruebas de la imagen Docker

### Pipeline de CD

- Construcción de imagen Docker
- Publicación en GitHub Container Registry
- Despliegue automático al servidor
- Verificación de salud del despliegue

### Registro de Contenedores

Las imágenes Docker se publican en GitHub Container Registry (ghcr.io):
- Tags automáticos basados en branches y versiones
- Caché de capas para builds más rápidos
- Escaneo de seguridad integrado

### Monitoreo

- Healthchecks automáticos
- Logs centralizados
- Métricas de despliegue

## 📄 Licencia

MIT