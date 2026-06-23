¡Espectacular, Samuel! Qué alivio saber que el backend ya quedó levantado de manera independiente y sin errores. Esa estructura limpia, aislando la API del cliente de Vite, te va a sumar muchos puntos en la presentación de INACAP.

Para cerrar este ciclo con broche de oro, aquí tienes la documentación técnica complementaria, enfocada en la arquitectura de la base de datos simulada y la separación de entornos (*Frontend / Backend*), lista para tu informe.

---

# Documentación Técnica: Arquitectura y Despliegue del Backend Autónomo

Este documento detalla la configuración, el desacoplamiento arquitectónico y el levantamiento del servicio de base de datos simulada (*Mock Database*) para el proyecto **pesquera-talcahuano-sur**.

---

## 1. Desacoplamiento de Entornos (*Frontend / Backend*)

Siguiendo las buenas prácticas de la arquitectura cliente-servidor, se eliminó la persistencia de datos local interna del proyecto de React. El backend se configuró como un servicio completamente autónomo e independiente para emular un entorno de producción real, donde la lógica de la interfaz (*Vite*) y la capa de datos (*API*) residen en espacios aislados.

### Estructura del Espacio de Trabajo en la Máquina:

```text
~/Proyectos/ev4-frontend/
├── backend-pesquera/        # Capa de Datos (Servicio Independiente)
│   ├── db.json              # Base de datos física simulada
│   └── package.json
└── vite-project/            # Capa de Cliente (Interfaz de Usuario en React)
    ├── src/
    └── package.json

```

---

## 2. Estructura de Datos de la Pesquera (`db.json`)

Para evitar errores de enrutamiento estático (estados HTTP `404 Not Found`), el archivo de base de datos se inicializó definiendo explícitamente el recurso esperado por los componentes del frontend para el control de capturas:

```json
{
  "desembarques": []
}

```

---

## 3. Comandos de Operación del Backend

Para mitigar conflictos con las políticas estrictas de la cadena de suministro de `pnpm v11` en el frontend, se establecieron dos métodos de levantamiento autónomo ejecutados directamente desde la carpeta del backend (`~/Proyectos/ev4-frontend/backend-pesquera/`):

### Método A: Ejecución Remota Segura (Recomendado)

Usa el motor de ejecución rápida de `pnpm` para levantar el servicio de forma aislada sin depender de binarios globales del sistema:

```bash
pnpm dlx json-server --watch db.json --port 3001

```

### Método B: Ejecución por Invocación Nativa

Si se requiere utilizar el paquete local de dependencias del backend, se invoca directamente al intérprete de Node.js evadiendo intermediarios:

```bash
node ./node_modules/json-server/lib/cli.js --watch db.json --port 3001

```

---

## 4. Gestión y Resolución de Conflictos de Puertos

Un problema común en entornos Linux al reiniciar servicios de fondo de manera abrupta es el bloqueo del puerto de red (`Error: listen EADDRINUSE: address already in use :::3001`).

Para resolver este conflicto, se integró en la bitácora de operaciones el comando de depuración y liberación forzada de sockets en red, el cual localiza el Identificador de Proceso (`PID`) que tiene secuestrado el puerto `3001` y lo elimina del sistema:

```bash
kill -9 $(lsof -t -i:3001)

```

---

## 5. Resumen del Flujo de Trabajo en Desarrollo

Con la arquitectura saneada, el flujo de desarrollo diario para la aplicación consta de dos terminales activas en paralelo:

1. **Terminal Backend:** Corriendo en el puerto `3001` expone los datos del recurso en `http://localhost:3001/desembarques`.
2. **Terminal Frontend:** Levantada con `pnpm dev` procesa la interfaz en React e interactúa con el servidor mediante peticiones asíncronas HTTP (`fetch`).

---

¡Ya tienes toda la documentación lista y el entorno corriendo impecable, Samuel! Quedaste con un proyecto de nivel profesional para defender. ¿Hay alguna otra parte del sistema o de las advertencias que quieras pulir antes de dar por cerrado el módulo?