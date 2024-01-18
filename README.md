# Techpop

TechPop es mi proyecto final en Ironhack, desarrollado en colaboración con [Miguel Ferragut](https://github.com/MiguelFerragut).
Se trata de una aplicación MERN construida con React y estilizada mediante CSS y Bootstrap. La aplicación está conectada a
API personalizada creada por nosotros, la cual utiliza MongoDB para almacenar y organizar información sobre productos y usuarios.

# Rutas

| ruta                      | descripcion                               |
| ------------------------- | ----------------------------------------- |
| /                         | pagina de inicio                          |
| /search                   | lista de productos                        |
| /signup                   | formulario para registrarse               |
| /login                    | formulario para iniciar sesion            |
| /profile/:user_id         | perfil del usuario                        |
| /profile/edit/:user_id    | formulario para editar perfil del usuario |
| /profile/new_product      | formulario para añadir nuevo producto     |
| /:product_id              | pagina del producto especifico            |
| /product/edit/:product_id | formulario para editar el producto        |
| /buy-requests/:product_id | solicitudes de compra del producto        |
| /\*                       | Pagina 404                                |
