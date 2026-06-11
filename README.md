# Proyecto Node + Angular — Pasos de creación y ejecución

Este README contiene los comandos que se usaron para crear e integrar la aplicación Angular dentro del proyecto Node.js, y los comandos para ejecutar y probar ambos proyectos localmente.

> Nota: los comandos están pensados para PowerShell en Windows. Ajusta `cd`/rutas si usas otra shell.

## 1) Crear la aplicación Angular (scaffold)
Desde la carpeta raíz del proyecto (`servicioNode`) ejecutar:

```powershell
Set-Location "D:\Programacion Web cotecnova\servicioNode"
npx --yes @angular/cli@latest new angular-app-noche --routing --style=scss --skip-install --skip-git
# Durante los prompts respondí: SSR? -> N   y  AI tools -> None
```

Esto crea la carpeta `angular-app` dentro del proyecto con el scaffold básico.

## 2) Instalar dependencias de Angular

```powershell
Set-Location "D:\Programacion Web cotecnova\servicioNode\angular-app"
npm install
```

## 3) Comandos para desarrollo y build (Angular)

- Iniciar servidor de desarrollo (hot reload):

```powershell
npm start
# abre http://localhost:4200
```

- Compilar para producción:

```powershell
npm run build
# archivos resultantes en dist/angular-app
```

## 4) Ejecutar el servidor Node (backend)

Desde la raíz del proyecto (`servicioNode`):

```powershell
Set-Location "D:\Programacion Web cotecnova\servicioNode"
node src/server.js
# El backend por defecto usa http://localhost:3000
```

Si prefieres usar `nodemon` durante el desarrollo, instala globalmente o como dependencia de desarrollo e inicia con `npx nodemon src/server.js`.

## 5) Verificar la API y la documentación

- Endpoint de ejemplo para clientes:

```powershell
curl http://localhost:3000/api/clientes
```

- Documentación Swagger (si el servidor está en ejecución):

```
http://localhost:3000/api-docs
```

## 6) Recomendación: iniciar frontend y backend simultáneamente

Opcionalmente puedes usar una terminal para el backend y otra para el frontend. Si quieres un único comando, instala `concurrently` en la raíz y añade un script:

```powershell
# desde la raíz
npm install -D concurrently
```

Agregar en `package.json` (raíz) algo como:

```json
"scripts": {
  "start:backend": "node src/server.js",
  "start:frontend": "cd angular-app && npm start",
  "start:dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
}
```

Luego ejecutar:

```powershell
npm run start:dev
```

## 7) Notas sobre prompts del CLI



Si quieres, puedo agregar un script `start:dev` ya configurado en el `package.json` raíz o crear un `README` más detallado con la estructura de carpetas (si me pides que lo haga). ¡Dime qué prefieres!

## Crear el proyecto desde cero (comandos)

Si prefieres empezar desde cero, estos son los pasos y comandos (PowerShell) para crear el proyecto completo —backend Node.js y frontend Angular— en una nueva carpeta:

1) Crear carpeta del proyecto e inicializar `git` y `npm` (backend)

```powershell
# crear la carpeta y entrar
New-Item -ItemType Directory -Path "D:\Programacion Web cotecnova\servicioNode"
Set-Location "D:\Programacion Web cotecnova\servicioNode"

# inicializar git y npm
git init
npm init -y
```

2) Instalar dependencias del backend

```powershell
# dependencias de producción
npm install express cors dotenv mssql swagger-jsdoc swagger-ui-express

# (opcional) herramientas de desarrollo
npm install -D nodemon
```

3) Crear estructura de carpetas y archivos básicos

```powershell
# crear carpetas
New-Item -ItemType Directory -Path src,src\config,src\controllers,src\routes,src\public

# crear archivos base (edítalos después)
New-Item -ItemType File -Path src\server.js,src\app.js,src\config\db.js,src\controllers\cliente.controller.js,src\routes\cliente.routes.js
New-Item -ItemType File -Path .env,README.md
```

4) Crear la aplicación Angular (frontend)

```powershell
# desde la raíz del proyecto
Set-Location "D:\Programacion Web cotecnova\servicioNode"

# genera scaffold de Angular en 'angular-app' (responder prompts: SSR? N, AI tools? None)
npx --yes @angular/cli@latest new angular-app --routing --style=scss --skip-install --skip-git

# entrar y instalar dependencias
Set-Location "D:\Programacion Web cotecnova\servicioNode\angular-app"
npm install
```

5) Comandos para desarrollo y build

```powershell
# Backend (desde la raíz)
Set-Location "D:\Programacion Web cotecnova\servicioNode"
# con nodemon (si lo instalaste)
npx nodemon src/server.js
# o
node src/server.js

# Frontend (desde la carpeta angular-app)
Set-Location "D:\Programacion Web cotecnova\servicioNode\angular-app"
npm start        # ng serve -> http://localhost:4200
npm run build    # build de producción -> dist/angular-app
```

6) Verificación

```powershell
# comprobar API clientes
curl http://localhost:3000/api/clientes

# ver documentación swagger
http://localhost:3000/api-docs
```

7) Iniciar frontend + backend con un solo comando (opcional)

```powershell
# desde la raíz
npm install -D concurrently

# agrega en package.json (raíz):
# "start:backend": "node src/server.js",
# "start:frontend": "cd angular-app && npm start",
# "start:dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\""

# y ejecuta
npm run start:dev
```
