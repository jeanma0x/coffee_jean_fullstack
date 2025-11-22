# Coffee Jean — Sistema de Órdenes de Cafetería

Descripción
-----------
Coffee Jean es un sistema de órdenes para una cafetería que permite gestionar productos, categorías, órdenes y usuarios desde una interfaz web. Está desarrollado con PHP y Blade para las vistas, y JavaScript para la interacción cliente — es una aplicación fullstack pensada para facilitar el flujo de atención en puntos de venta y la gestión del inventario y pedidos.

Características principales
--------------------------
- Gestión de productos (crear, editar, eliminar, listar).
- Gestión de categorías de producto.
- Creación y seguimiento de órdenes.
- Interfaz responsive con plantillas Blade.
- Interactividad y validaciones con JavaScript.
- Esqueleto listo para integrarse con pasarelas de pago o terminales POS.

Tecnologías
-----------
- PHP (backend)
- Blade (plantillas)
- JavaScript (frontend)
- Base de datos (MySQL, PostgreSQL u otra compatible)
- Dependencias de gestión: Composer y Node (npm/yarn)

Requisitos
----------
- PHP >= 8.0 (recomendado 8.1+)
- Composer
- Node.js >= 16.x y npm o Yarn
- Servidor web (Apache, Nginx) o usar servidor embebido de Laravel
- Base de datos (MySQL, MariaDB o PostgreSQL)

Instalación (entorno de desarrollo)
-----------------------------------
1. Clona el repositorio:
   git clone https://github.com/jeanma0x/coffee_jean_fullstack.git
   cd coffee_jean_fullstack

2. Instala dependencias PHP con Composer:
   composer install

3. Instala dependencias JS:
   npm install
   # o
   yarn install

4. Copia el archivo de ejemplo de entorno y configúralo:
   cp .env.example .env
   # Edita .env con tus credenciales de base de datos y otros valores:
   # APP_NAME=CoffeeJean
   # APP_ENV=local
   # APP_KEY=
   # APP_URL=http://localhost:8000
   # DB_CONNECTION=mysql
   # DB_HOST=127.0.0.1
   # DB_PORT=3306
   # DB_DATABASE=coffee_jean
   # DB_USERNAME=root
   # DB_PASSWORD=secret

5. Genera la key de la aplicación (si usas Laravel):
   php artisan key:generate

6. Ejecuta migraciones y seeders:
   php artisan migrate
   php artisan db:seed
   (Ajusta o crea seeders según las entidades del proyecto)

7. Compila assets para desarrollo:
   npm run dev
   # o
   yarn dev

Ejecución
---------
- Usando servidor embebido (Laravel):
  php artisan serve --host=0.0.0.0 --port=8000
  Luego abre http://localhost:8000

- Para producción:
  - Compila los assets: npm run build (o yarn build)
  - Configura tu servidor web (Nginx/Apache) apuntando al directorio public/
  - Asegúrate de usar variables de entorno adecuadas y cachear configuración:
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache

Estructura recomendada del proyecto
----------------------------------
- app/         — Lógica de negocio (models, controllers, services)
- resources/
  - views/     — Plantillas Blade
  - js/        — Archivos JavaScript
  - sass/ o css/ — Estilos
- database/
  - migrations/
  - seeders/
- public/      — Assets públicos (compilados)

Buenas prácticas
----------------
- Usar control de versiones (git) y ramas para features.
- Proteger las rutas y validar input en backend.
- Mantener secretos fuera del repositorio (.env en .gitignore).
- Escribir tests automatizados (feature y unitarios) si se integra PHPUnit / Pest.

Pruebas
-------
Si el proyecto incluye pruebas con PHPUnit:
- Ejecutar:
  ./vendor/bin/phpunit
Ajusta la configuración de PHPUnit en phpunit.xml según el entorno de CI.

Despliegue
----------
- Configura el servidor con PHP-FPM + Nginx o Apache.
- Asegura permisos adecuados en storage/ y bootstrap/cache.
- Ejecuta migraciones en el servidor y despliega los assets compilados.
- Considera usar herramientas como Envoyer, Deployer o GitHub Actions para CI/CD.

```
