# 📄 SysSoft Integra Documents - Microservicio de Generación de Documentos

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0+-red.svg)](https://nestjs.com/)
[![Playwright](https://img.shields.io/badge/Playwright-1.47.2-blue.svg)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-UNLICENSED-orange.svg)](LICENSE)

> **Microservicio especializado en la generación automática de documentos PDF y Excel a partir de datos de APIs REST**

## 🎯 Descripción del Proyecto

**SysSoft Integra Documents** es un microservicio robusto y escalable construido con **NestJS** que se encarga de transformar datos de APIs REST en documentos profesionales en formato PDF y Excel. Utiliza **Playwright** para renderizado HTML a PDF y **ExcelJS** para la generación de hojas de cálculo.

### ✨ Características Principales

- 🚀 **Alta Performance**: Generación rápida de documentos con optimizaciones de memoria
- 📊 **Múltiples Formatos**: Soporte para PDF (A4, tickets personalizados) y Excel
- 🎨 **Templates EJS**: Sistema flexible de plantillas para personalización
- 🔄 **API REST**: Endpoints RESTful para integración con otros servicios
- 🐳 **Docker Ready**: Contenedores Docker para despliegue fácil
- 📱 **Responsive**: Generación de documentos adaptables a diferentes tamaños
- 🔒 **Seguro**: Validación de datos y manejo seguro de archivos

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API REST      │───▶│  NestJS Service  │───▶│  Document       │
│   (Datos)       │    │  (Controller)    │    │  Generator      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │  Business Logic  │    │  Playwright     │
                       │  (Service Layer) │    │  + ExcelJS      │
                       └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │  Data Models     │    │  PDF/Excel      │
                       │  (DTOs)          │    │  Output         │
                       └──────────────────┘    └─────────────────┘
```

## 🛠️ Stack Tecnológico

### Core Framework
- **[NestJS 10.0+](https://nestjs.com/)** - Framework de Node.js para aplicaciones escalables
- **[Node.js 18+](https://nodejs.org/)** - Runtime de JavaScript

### Generación de Documentos
- **[Playwright 1.47.2](https://playwright.dev/)** - Automatización de navegadores para PDF
- **[ExcelJS 4.4.0](https://github.com/exceljs/exceljs)** - Generación de archivos Excel
- **[EJS 3.1.10](https://ejs.co/)** - Motor de plantillas HTML

### Utilidades
- **[QR Code](https://github.com/soldair/node-qrcode)** - Generación de códigos QR
- **[Barcode](https://github.com/metafloor/bwip-js)** - Generación de códigos de barras
- **[Number to Words](https://github.com/marlun78/number-to-words)** - Conversión numérica a texto

### DevOps & Herramientas
- **[Docker](https://www.docker.com/)** - Contenedores para despliegue
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestación de servicios
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automatizado

## 📁 Estructura del Proyecto

```
syssoft-integra-documents/
├── 📁 src/
│   ├── 📁 common/           # Utilidades compartidas
│   │   ├── 📁 class/        # Clases base
│   │   ├── 📁 enums/        # Enumeraciones
│   │   └── 📁 interfaces/   # Interfaces TypeScript
│   ├── 📁 config/           # Configuraciones
│   ├── 📁 helper/           # Helpers y utilidades
│   ├── 📁 middleware/       # Middlewares personalizados
│   ├── 📁 model/            # Modelos de datos
│   ├── 📁 modules/          # Módulos de la aplicación
│   │   ├── 📁 collection/   # Módulo de cobranzas
│   │   ├── 📁 dispatch-guide/ # Módulo de guías de despacho
│   │   ├── 📁 expense/      # Módulo de gastos
│   │   ├── 📁 order/        # Módulo de órdenes
│   │   ├── 📁 person/       # Módulo de personas
│   │   ├── 📁 product/      # Módulo de productos
│   │   ├── 📁 purchase/     # Módulo de compras
│   │   ├── 📁 quotation/    # Módulo de cotizaciones
│   │   ├── 📁 sale/         # Módulo de ventas
│   │   └── 📁 transaction/  # Módulo de transacciones
│   └── 📁 views/            # Templates EJS
├── 📁 dist/                 # Código compilado
├── 📁 public/               # Archivos estáticos
├── 📁 test/                 # Tests unitarios y e2e
├── 📁 docker-compose.yml    # Configuración Docker
├── 📁 Dockerfile            # Imagen Docker
└── 📁 package.json          # Dependencias del proyecto
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js 18+** y **npm**
- **Docker** y **Docker Compose** (opcional)
- **Git**

### 1. Clonar el Repositorio

```bash
# Clonar con SSH (recomendado)
git clone git@github.com:luissince/syssoft-integra-documents.git

# O clonar con HTTPS
git clone https://github.com/luissince/syssoft-integra-documents.git

cd syssoft-integra-documents
```

### 2. Configurar el Entorno

```bash
# Usar la versión correcta de Node.js
nvm use

# Instalar dependencias
npm install

# Instalar Playwright con Chromium
npx playwright@1.47.2 install --with-deps chromium
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# Configuración del servidor
NODE_ENV=development
PORT=8000
APP_URL=http://localhost:8000

# Configuración CORS
CORS_ORIGIN=*

# Configuración de memoria (recomendado para producción)
NODE_OPTIONS="--max-old-space-size=2048 --expose-gc"
```

### 4. Ejecutar en Desarrollo

```bash
# Modo desarrollo con hot reload
npm run dev

# O ejecutar directamente
npm run start:dev
```

### 5. Ejecutar con Docker (Opcional)

```bash
# Construir y ejecutar en modo desarrollo
docker-compose -f docker-compose.dev.yml up --build -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Detener servicios
docker-compose -f docker-compose.dev.yml down
```

## 📖 Uso de la API

### Link de swagger

````
http://localhost:8000/docs
````

### Generar PDF desde Template

```bash
POST /product/pdf/reports
Content-Type: application/json

{
  "size": "A4",
  "data": {
    "title": "Reporte de Productos",
    "products": [...]
  }
}
```

### Generar PDF desde HTML

```bash
POST /pdf
Content-Type: application/json

{
  "html": "<html><body><h1>Mi Documento</h1></body></html>",
  "size": "A4",
  "title": "Documento Personalizado"
}
```

### Generar Excel

```bash
POST /product/excel
Content-Type: application/json

{
  "data": {
    "headers": ["Nombre", "Precio", "Stock"],
    "rows": [...]
  }
}
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e

# Tests en modo debug
npm run test:debug
```

## 🚀 Despliegue

### Variables de Entorno para Producción

```bash
NODE_ENV=production
PORT=8000
APP_URL=https://tu-dominio.com
CORS_ORIGIN=https://tu-dominio.com
NODE_OPTIONS="--max-old-space-size=4096 --expose-gc"
```

### Docker en Producción

```bash
# Construir imagen de producción
docker build -t syssoft-documents:latest .

# Ejecutar contenedor
docker run -d \
  -p 8000:8000 \
  -e NODE_ENV=production \
  --name syssoft-documents \
  syssoft-documents:latest
```

### Docker Compose en Producción

```bash
# Desplegar stack completo
docker-compose up -d

# Escalar servicios
docker-compose up -d --scale app=3
```

## 🔧 Configuración Avanzada

### Optimización de Memoria

```bash
# Para servidores con poca memoria
NODE_OPTIONS="--max-old-space-size=1024 --expose-gc"

# Para servidores con mucha memoria
NODE_OPTIONS="--max-old-space-size=4096 --expose-gc"
```

### Configuración de Playwright

```typescript
// src/config/playwright.config.ts
export const playwrightConfig = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--single-process'
  ]
};
```

## 📊 Monitoreo y Logs

### Endpoints de Salud

```bash
# Estado del servicio
GET /health

# Métricas del sistema
GET /metrics

# Información de la versión
GET /version
```

### Logs Estructurados

El sistema genera logs estructurados para facilitar el monitoreo:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info",
  "message": "PDF generated successfully",
  "template": "product/reports/a4.ejs",
  "duration": 1250,
  "memory": "156MB"
}
```

## 🤝 Contribución

### 1. Configurar SSH para GitHub

```bash
# Generar clave SSH
ssh-keygen -t rsa -b 4096 -C "tu-email@ejemplo.com"

# Agregar clave al agente SSH
ssh-add ~/.ssh/id_rsa

# Copiar clave pública
cat ~/.ssh/id_rsa.pub
```

### 2. Configurar Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 3. Flujo de Trabajo

```bash
# Crear rama de feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "feat: añade nueva funcionalidad de reportes"

# Push a la rama
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

### 4. Convenciones de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato de código
refactor: refactorización
test: tests
chore: tareas de mantenimiento
```

## 🐛 Troubleshooting

### Problemas Comunes

#### Error de Memoria
```bash
# Solución: Aumentar límite de memoria
NODE_OPTIONS="--max-old-space-size=4096"
```

#### Playwright no instala Chromium
```bash
# Solución: Instalar manualmente
npx playwright@1.47.2 install --with-deps chromium
```

#### Docker no puede acceder al puerto
```bash
# Solución: Verificar que el puerto esté libre
lsof -i :8000
```

#### Error de permisos en Docker
```bash
# Solución: Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

## 📚 Documentación Adicional

- [NestJS Documentation](https://docs.nestjs.com/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [ExcelJS Documentation](https://github.com/exceljs/exceljs)
- [EJS Documentation](https://ejs.co/)

## 📄 Licencia

Este proyecto está bajo la licencia **UNLICENSED**. Todos los derechos reservados.

## 👥 Equipo

- **Desarrollador Principal**: [Luis Lara](https://github.com/luissince)
- **Empresa**: SysSoft Integra

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/luissince/syssoft-integra-documents/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/luissince/syssoft-integra-documents/discussions)
- **Email**: [Contacto del proyecto]

---

⭐ **Si este proyecto te es útil, considera darle una estrella en GitHub**