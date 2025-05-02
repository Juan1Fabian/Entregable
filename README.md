
# Aplicación Web - Gestión de Productos

Esta aplicación web permite **registrar, listar, buscar, editar y eliminar productos** como si fuera una pequeña tienda virtual (por ejemplo, venta de celulares). Está desarrollada con **Node.js**, **Express.js**, **EJS** y **Bootstrap 5**.

---

## Características principales

- Registro de productos con imagen y datos detallados.
- Filtro de búsqueda combinada por nombre, marca o catálogo.
- Visualización de productos como tarjetas con imágenes.
- Listado de vehículos (otro módulo opcional).
- Eliminación con confirmación SweetAlert.
- Estilo responsivo y oscuro con Bootstrap.

---

## Tecnologías utilizadas

- **Frontend:** Bootstrap 5, HTML, CSS
- **Backend:** Node.js, Express.js
- **Motor de plantillas:** EJS
- **Base de datos:** MySQL (con PDO o Sequelize según implementación)
- **Cargado de imágenes:** Middleware `multer`
- **Alertas modernas:** SweetAlert2

---

## Estructura general

```
/views
  /partials       -> Encabezado y pie HTML reutilizable
  index.ejs       -> Página principal (catálogo)
  create.ejs      -> Crear nueva tabla
  edit.ejs        -> Editar tabla

/public
  /images        -> Carpeta donde se almacenan imágenes

/routes
  productos.js    -> Rutas para productos

/Entregable
  /config/Database.js -> Conexión a base de datos


app.js         -> Archivo principal de arranque del servidor

---

## Funcionalidades del formulario

Formulario ubicado dentro de un `div` centrado con estilo oscuro:

```html
<form action="/create" method="POST" enctype="multipart/form-data">
  <!-- Campos: nombre, precio, modelo, descripción, stock -->
  <!-- Selects dinámicos: marca, catálogo -->
  <!-- Imagen del producto -->
  <!-- Botones: Registrar y Cancelar -->
</form>
```

---

## Función de búsqueda

En la página principal, puedes buscar productos por:

- Nombre
- Marca
- Catálogo  
(Simultáneamente)

Los resultados se actualizan dinámicamente desde el servidor.

---

## Registro y vista de productos

Cada producto se muestra con:

- Imagen (tamaño controlado con CSS/Bootstrap)
- Nombre, modelo, marca, descripción, precio, stock
- Tarjeta decorativa con estilo oscuro
- Botones de edición y eliminación

---

## Eliminar productos

La eliminación de productos o vehículos se confirma con:

```js
document.addEventListener("DOMContentLoaded", () => {
      const enlacesEliminar = document.querySelectorAll(".delete");
  
      enlacesEliminar.forEach((enlace) => {
        enlace.addEventListener("click", (event) => {
          event.preventDefault();
  
          Swal.fire({
            title: "Producto",
            text: "¿Está seguro de eliminar?",
            icon: "question",
            background: "#2c3e50",
            color: "#ecf0f1",
            footer: "<span style='color:#bdc3c7'>Product Web</span>",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#27ae60",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#c0392b",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = event.currentTarget.getAttribute("href");
            }
          });
        });
      });
    });
```

---

## Diseño y estilos

- Uso del color `bg-secondary` y `text-white` para fondos oscuros.
- Botones con clases como `btn-sm`, `btn-primary`, `btn-outline-*` y `w-100`.
- Texto con bordes decorativos para stock, utilizando clases como:

```html
<div class="text-end">
    <p class="bg-secondary text-white rounded px-1 py-1 d-inline-block">
        <strong>Stock:</strong> <%= p.stock %>
    </p>
</div>
```

---

## Opcional: Módulo de vehículos

Se puede listar vehículos en una tabla con las columnas:

- ID, Marca, Modelo, Color, Combustible, Año, Condición
- Botones de editar y eliminar

---

## Requisitos previos

- Node.js
- MySQL
- Bootstrap CDN
- Middleware `express`, `multer`, `body-parser`, `ejs`, `sweetalert2`

---

## Cómo ejecutar

1. Clonar el repositorio
2. Configurar la base de datos en `Database.js`
3. Ejecutar:

```bash
nodemon app
```

---