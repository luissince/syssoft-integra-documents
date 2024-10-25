# Usa Debian Slim como imagen base para la construcción
FROM debian:bullseye-slim AS build

# Evita las preguntas interactivas durante la instalación de paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Actualiza el sistema e instala las dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    --no-install-recommends \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala @nestjs/cli de forma global
RUN npm install -g @nestjs/cli

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm ci

# Copia el resto del código fuente de la aplicación
COPY . .

# Compila la aplicación para producción
RUN npm run build

# Limpia las dependencias de desarrollo y caché de npm
RUN npm prune --production && npm cache clean --force

# Usa una imagen más ligera para la ejecución final
FROM debian:bullseye-slim AS production

# Evita las preguntas interactivas durante la instalación de paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Actualiza el sistema e instala las dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    --no-install-recommends \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala Playwright y los navegadores necesarios
RUN npx playwright@1.47.2 install --with-deps chromium

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
COPY --from=build /app/.env ./.env

# Expone el puerto en el que la aplicación NestJS escuchará
EXPOSE 8000

# Comando para ejecutar la aplicación en modo producción
CMD ["node", "dist/main"]