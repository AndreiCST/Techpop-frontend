# Techpop

TechPop es mi proyecto final en Ironhack, desarrollado en colaboración con [Miguel Ferragut](https://github.com/MiguelFerragut).
Se trata de una aplicación MERN construida con React y estilizada mediante CSS y Bootstrap. La aplicación está conectada a
API personalizada creada por nosotros, la cual utiliza MongoDB para almacenar y organizar información sobre productos y usuarios.

# Conceptos aprendidos durente el proyecto

-La importancia de los componentes en la construcción de la interfaz de usuario, destacando su reutilización, facilidad de mantenimiento y mejora en la legibilidad del código, entre otras ventajas.
-El manejo de información mutable a través del uso del estado y otros hooks proporcionados por React.
-La utilización de la función .map para renderizar listas de elementos de manera eficiente y dinámica.
-La gestión de rutas, incluyendo rutas públicas y privadas, utilizando herramientas como React Router para la navegación en la aplicación.
-La implementación de renderizado condicional para adaptar la interfaz de usuario según diferentes condiciones y estados.
-La comprensión y aplicación de la comunicación entre componentes, tanto de padres a hijos como de hijos a padres, utilizando props y funciones como mecanismos de transferencia de datos.
-Realizar solicitudes a API utilizando bibliotecas como Axios.
-Implementar formularios controlados en React, gestionando el estado del formulario y manejando eventos de entrada.
-etc.

# Rutas

---

### Rutas publicas

| ruta                 | descripcion                    |
| -------------------- | ------------------------------ |
| /                    | pagina de inicio               |
| /search              | lista de productos             |
| /signup              | formulario para registrarse    |
| /login               | formulario para iniciar sesion |
| /product/:product_id | pagina del producto especifico |
| /\*                  | Pagina 404                     |

### Rutas privadas

| ruta                      | descripcion                               |
| ------------------------- | ----------------------------------------- |
| /profile/:user_id         | perfil del usuario                        |
| /profile/edit/:user_id    | formulario para editar perfil del usuario |
| /profile/new_product      | formulario para añadir nuevo producto     |
| /product/edit/:product_id | formulario para editar el producto        |
| /buy-requests/:product_id | solicitudes de compra del producto        |
