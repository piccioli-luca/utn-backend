# Aplicación de Búsqueda de Gatos

Esta es la aplicación frontend para la base de datos de gatos. Para modificar el contenido de la base de datos, consulta el archivo README.md del proyecto backend.
La aplicación permite buscar gatos por nombre, mostrando todos los gatos cuyo nombre coincida con el texto ingresado, junto con su edad, peso, raza, dueño y color.
Las variables adicionales solo aparecerán si fueron completadas en la ficha del gato; de lo contrario, no se mostrarán.

¡Nota! La interfaz de la aplicación está en español, pero el código está en inglés.

Variables de los gatos:

- _id: Variable solo visible en codigo que identifica cada gato.
- name: Es la unica variable necesaria para un gato.
- age
- weight_kg: Peso en kilogramos
- breed
- owner
- color


## Dependencias

- Lenguaje de programación: Javascript, Typescript
- Dependencias de desarrollo: ts-node-dev: 2.0.0, typescript 5.8.3, MongoDB 1.46.2
- Dependencias: mongoose 1.46.2

## .env

Ademas de URI_DB, tambien es necesario configurar VITE_BACKEND_URL. Estas son las definiciones por defecto

URI_DB=mongodb://localhost:27017/your-database-here
VITE_BACKEND_URL=http://localhost:3000
