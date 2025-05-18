# Descripcion

Este projecto contiene las herramientas para manejar un database de gatos!

## Funciones

Todas las funciones manejan los errores y en completo forman un CRUD.

### connectMongoDB()

Connecta a MongoDB database para empezar operaciones.

### Funciones CRUD

Todas las funciones de CRUD devuelven un grupo de datos: 

1. 'Success', que es 'true' si tuvo exito la funcion, y 'false' sino.
2. 'data' es el resultado de la funcion, la cual depende de la funcion especifica y los argumentos que tiene.
3. 'message' devuelve un comentario informando sobre el exito, o detallando la falla de la funcion.

### getAllCats()

Devuelve a todos los gatos en el database.

### updateCat(id: string, updatedCatdata{})

Actualiza los valores del gato con el ID en la funcion. Devuelve dichos valores en 'data'.

### createCat(newCatData: interface)

Crea un nuevo gato con los valores dados mediante la interfaz contenida en los argumentos. El nombre y el color son valores necesarios - pero todos los demas pueden ser, y son por defecto, nulos. Devuelve el gato creado en 'data'.

### deleteCat(id: string)

Borra al gato con el id en la funcion del database por completo. Devuelve el id del gato borrado en 'data'.

### getcatbyID(id: string)

Busca a un gato con el mismo id que recibio mediante el argumento, y lo devuelve en 'data'.

## Requisitos

- Lenguaje de programación: Javascript, Typescript
- Dependencias de desarrollo: ts-node-dev: 2.0.0, typescript 5.8.3, MongoDB 1.46.2
- Dependencias: mongoose 1.46.2

## Configuración

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/piccioli-luca/utn-backend
    ```

2. Navegar al directorio del proyecto:

    ```bash
    cd <directorio>
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```
