# Panel de Desembarques - Pesquera Talcahuano Sur SpA

Aplicación SPA desarrollada en React para la gestión y control de desembarques diarios en la Región del Biobío, incorporando persistencia local, consumo asíncrono seguro y sanitización de datos.

## 1. Elementos de React Utilizados (R1)
* **Componentes Funcionales:** * `App`: Componente principal que orquesta el estado global, el consumo de la API y el filtro.
  * `ListaDesembarques`: Componente estructural que renderiza la tabla.
  * `FilaDesembarque`: Componente especializado encargado del renderizado individual de cada lote y su estado.
* **Hooks de React:**
  * `useState`: Utilizado para almacenar la lista de desembarques, el estado de carga (`loading`), los errores de red, la lista de elementos prioritarios y la cadena del buscador.
  * `useEffect`: Utilizado en dos instancias: una para gatillar la petición asíncrona de datos una sola vez al montar la app, y otra para sincronizar automáticamente los cambios del estado de prioridad con el Local Storage.

## 2. Interacción con Herramientas de IA y Sugerencias (R1 y R2)
* **Sugerencia de la IA:** Implementar un inicializador perezoso (lazy initializer) en el `useState` de los lotes prioritarios en lugar de un llamado directo en el cuerpo del componente.
* **Comentario Técnico:** Se aceptó la sugerencia debido a que mutar o consultar el `localStorage` directamente en cada ciclo de renderizado degrada el rendimiento de la aplicación. Utilizar una función anónima `() => { ... }` asegura que el almacenamiento local se consulte únicamente en el montaje inicial de la SPA.

## 3. Análisis de Calidad y Seguridad con SonarLint (R7)
A continuación se detallan dos hallazgos detectados y corregidos durante el desarrollo para asegurar las buenas prácticas:

* **Hallazgo 1 (Code Smell - Seguridad):** Uso potencial de datos crudos en el flujo del cliente ("Do not trust user input directly").
  * **Corrección:** Se creó la función `sanearEntrada()` para interceptar el string de búsqueda del operador, removiendo caracteres como `<` y `>` mediante expresiones regulares antes de ejecutar la lógica de filtrado `.filter()`, previniendo así vulnerabilidades de Cross-Site Scripting (XSS).
  
* **Hallazgo 2 (Bug / Correctness):** Falta de un identificador único estático en la iteración de arreglos dentro de tablas de datos.
  * **Corrección:** Al mapear la lista de desembarques en `ListaDesembarques.jsx`, se asignó explícitamente `key={lote.id}` utilizando el ID único proveniente de la API REST, en lugar de usar el índice del array (`index`), garantizando que React preserve de forma óptima el estado del DOM cuando cambien los filtros.