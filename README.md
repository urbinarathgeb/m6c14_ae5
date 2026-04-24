# Módulo 6 - Aprendizaje Esperado nº5


## Edición y persistencia de datos con API REST

### Objetivo
Aplicar rutas REST para modificar datos en archivos JSON

### Descripción
Crear una API REST en Node.js con Express que permita gestionar (leer, agregar, editar y eliminar) registros guardados en un archivo `data.json`, utilizando el módulo `fs` para la persistencia.

### Instrucciones
- Iniciar el proyecto con npm init e instalar `Express`.
- Crear `data.json`con 5 objetos que tengan id y 5 propiedades.
- Implementar rutas `GET`, `POST`, `PUT` y `DELETE` para gestionar los datos.
- Usar `fs`para leer y escribir el archivo JSON.
- Probar las rutas con `Postman` y documentar brevemente cada método en un `READEM.md`.

---

## Documentación de la API

### Endpoints de Usuarios

La API permite gestionar usuarios con persistencia en un archivo JSON. Todas las rutas base son `/users`.

| Método | Endpoint | Descripción | Cuerpo de la Petición (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/users` | Obtiene la lista de todos los usuarios registrados. | No requiere |
| **GET** | `/users/:id` | Obtiene los detalles de un usuario específico por su ID. | No requiere |
| **POST** | `/users` | Crea un nuevo usuario. El ID se genera automáticamente. | `{"name", "lastname", "mail", "active", "role"}` |
| **PUT** | `/users/:id` | Actualiza los datos de un usuario existente por su ID. | `{"name", "lastname", "mail", "active", "role"}` |
| **DELETE** | `/users/:id` | Elimina un usuario del sistema por su ID. | No requiere |

### Pruebas
Se han incluido archivos con extensión `.http` y `.rest` en la carpeta `src/requests/` que pueden ser utilizados directamente en editores compatibles para probar los endpoints.