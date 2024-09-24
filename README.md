# Microservicio encargado de generar reportes como PDF y Excel

## ¿Qué es esto?

Este microservicio que se encarga de generar reportes en formato PDF y Excel a partir de datos obtenidos por un API REST.

## ¿Cómo funciona?

El servicio se encarga de recibir los datos de la API REST y generar el reporte en formato PDF y Excel. El proceso de generación del reporte se realiza utilizando librerías como puppeteer y excel4node.

## ¿Cómo se integra?

El microservicio se integra con otros microservicios como el de almacenamiento de datos y la API REST. El proceso de integración se realiza utilizando servicios de integración continua y entrega de software.

## ¿Cómo se despliega?

El proceso de despliegue se realiza utilizando herramientas como Docker Compose y Kubernetes.

## Herramientas utilizadas

- [Node](https://nodejs.org/en/) Es un entorno de ejecución de JavaScript que permite ejecutar código JavaScript en servidores, desde entornos de desarrollo hasta aplicaciones en producción.

- [Pupeteer](https://pptr.dev/) Es una librería de Node.js que permite automatizar el proceso de navegación en el navegador web.

- [Excel4Node](https://github.com/advisr-io/excel4node) Es una librería de Node.js que permite generar archivos de Excel desde datos en formato JSON.

- [Docker](https://www.docker.com/) Es una plataforma de contenedores que permite ejecutar aplicaciones en contenedores.

- [Visual Studio Code](https://code.visualstudio.com/) Es un editor de código abierto diseñado para desarrolladores.

- [Docker Compose](https://docs.docker.com/compose/) Es una herramienta de línea de comandos para crear y administrar aplicaciones y servicios de Docker.

- [Kubernetes](https://kubernetes.io/) Es un orquestador de contenedores que automatiza la creación, ejecución y administración de contenedores.

- [Git](https://git-scm.com/) Es un sistema de control de versiones distribuido que permite rastrear cambios en archivos y directorios.

- [Git Hub](https://github.com/) Es un sitio web que permite alojar repositorios de código en línea y colaborar en proyectos.

## ¿Cómo contribuir?

Si deseas contribuir al proyecto, puedes seguir los siguientes pasos:

1.  Clona el proyecto o agrague el ssh al repositorio para contribuir en nuevos cambios [Git Hub - Generador de Resportes](https://github.com/luissince/syssoft-integra-reports)

    1. Agregue por ssh para la integración

        Generar tu clave ssh para poder contribuir al proyecto.

        ```bash
        ssh-keygen -t rsa -b 4096 -C "tu email"
        ```

        Configuración global del nombre.

        ```bash
        git config --global user.name "John Doe"
        ```

        Configuración global del email.

        ```bash
        git config --global user.email johndoe@example.com
        ```

        Crea una carpeta.

        ```bash
        mkdir syssoft-integra-reports
        ```

        Moverse a la carpeta.

        ```bash
        cd syssoft-integra-reports
        ```

        Comando para inicia git.

        ```bash
        git init
        ```

        Comando que agrega la referencia de la rama.

        ```bash
        git remote add origin git@github.com:luissince/syssoft-integra-reports.git
        ```

        Comando que descarga los archivos al working directory.

        ```bash
        git fetch origin master
        ```

        Comando que une los cambios al staging area.

        ```bash
        git merge origin/master
        ```

    2. Clonar al proyecto

        Al clonar un proyecto no necesitas crear ninguna carpeta.

        ```bash
        git clone https://github.com/luissince/syssoft-integra-reports.git
        ```

2. Instale las dependencias

    ```bash
    nvm use
    npm install
    ```

3. Configurar las variables de entorno  en el archivo .env

    ```bash
    NODE_ENV=development
    PORT=3000
    API_URL=http://localhost:3001
    ```

4. Ejecutar el servico en modo desarrollo 

    ```bash
    npm run dev   
    ```

5. Ejecutar los tests unitarios
    
    ```bash
    npm run test  
    ```

## Configuración para Ejecutar GitHub Actions para el CI/CD:

Para ejecutar los workflows de GitHub Actions, asegúrate de que tu usuario tenga los privilegios de ejecución necesarios. A continuación, te proporcionamos algunos pasos para empezar:


1. Crea un grupo de Docker:

    ```bash
    sudo groupadd docker
    ```

2. Agrega tu Usuario al Grupo de Docker:

    ```bash
    sudo usermod -aG docker $USER
    ```

3. Aplica los Cambios en el Grupo de Docker:

    ```bash
    newgrp docker
    ```

4. Verifica que tu Usuario esté en el Grupo de Docker:

    ```bash
    groups
    ```

    Asegúrate de que "docker" esté en la lista de grupos.

5. Configuración y Uso del Runner:

    Para iniciar la creación del runner, ve a Settings del proyecto, luego a Actions, Runners, y selecciona "New self-hosted runner".

    Si deseas ejecutar en segundo plano, utiliza los siguientes comandos de configuración:

    ```bash
    sudo ./svc.sh status
    sudo ./svc.sh install
    sudo ./svc.sh start
    sudo ./svc.sh stop
    sudo ./svc.sh uninstall
    ```

    Estos comandos te permiten controlar el runner según sea necesario.

6. Punto importante la hacer git push

    Cuando realices un git push origin master y desees evitar que se ejecute el flujo de trabajo de GitHub Actions, puedes incorporar [skip ci] o [ci skip] en el mensaje del commit. Esta adición indicará a GitHub Actions que omita la ejecución de los trabajos para ese commit específico.

    Por ejemplo, al realizar un commit, puedes utilizar el siguiente comando para incluir [skip ci] en el mensaje del commit:

    ```bash
    git commit -m "Tu mensaje del commit [skip ci]"
    ```

## Aquí tienes algunas pautas para crear buenos comentarios de commit:

1. **Sé claro y conciso**: Describe qué se cambió y por qué en pocas palabras.
2. **Usa el tiempo presente**: Como si estuvieras dando instrucciones.
3. **Incluye contexto**: Si el cambio está relacionado con un bug o una tarea específica, referencia el número de ticket o issue.

### Combinar mensajes de ramas

- Si deseas mantener mensajes de commit distintos para desarrollo, prueba y producción, perosin tener que hacer un commit en la rama de desarrollo antes de probar en la rama deprueba, puedes utilizar la opción --no-ff (no fast-forward) al realizar la fusión en cadarama. Esto te permitirá realizar un commit específico en la rama de prueba (y posteriormente en la rama de producción) incluso si no hubo cambios adicionales endesarrollo.

1. En la rama desarrollo

    ```bash
    git checkout desarrollo
    git pull origin desarrollo
    # Realiza tus cambios y realiza el commit
    git add .
    git commit -m "Mensaje de desarrollo"
    ```

2. Cambia a la rama de prueba

    ```bash
    git checkout test
    git pull origin test
    # Fusiona los cambios de desarrollo con un commit específico
    git merge --no-ff desarrollo -m "Mensaje de prueba"
    ```

    El uso de --no-ff asegurará que se cree un nuevo commit, incluso si no hubo cambios adicionales en desarrollo.

3. Alterar el mensaje del ultimo commit local

    ```bash
    git commit --amend -m "Nuevo comentario"
    ```

3. Deshacer el ultimo commit local

    ```bash
    git reset --soft HEAD~1
    git status
    git restore --staged <file>
    ```

4. Borrar el ultimo commit local

    ```bash
    git reset --hard HEAD~1
    ```

5. Borrar el ultimo commit del remoto

    ```bash
    git revert <ID_LOG>
    ```

### Ejemplos de comentarios de commit:

#### Para una nueva funcionalidad:
```
feat: añade funcionalidad de búsqueda avanzada con filtros personalizados
```

#### Para una corrección de bug:
```
fix: corrige error en el cálculo de la cantidad total de productos en el carrito
```

#### Para mejoras de rendimiento:
```
perf: optimiza la carga de imágenes en la galería de productos
```

#### Para refactorización de código:
```
refactor: reestructura la lógica de autenticación para mejorar la legibilidad y mantenibilidad
```

#### Para documentación:
```
docs: añade documentación para la API de productos en el README
```

#### Para tareas menores:
```
chore: actualiza dependencias de npm a sus versiones más recientes
```

#### Para estilos:
```
style: corrige el formato y espaciado en los archivos CSS
```