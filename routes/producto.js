const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../config/database'); // Conexión a la base de datos

// Configuración de Multer para almacenar imágenes temporalmente en 'public/images'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
  }
});
const upload = multer({ storage: storage });

// Ruta para cargar productos con filtros
router.get('/', async (req, res) => {
  const { nombre, marca, catalogo } = req.query;

  let sql = `
    SELECT p.*, m.marca, c.catalogo
    FROM productos p
    LEFT JOIN marcas m ON p.idmarca = m.idmarca
    LEFT JOIN catalogos c ON p.idcatalogo = c.idcatalogo
    WHERE 1=1
  `;
  
  let params = [];
  
  if (nombre) {
    sql += " AND p.producto LIKE ?";
    params.push(`%${nombre}%`);
  }
  if (marca) {
    sql += " AND p.idmarca = ?";
    params.push(marca);
  }
  if (catalogo) {
    sql += " AND p.idcatalogo = ?";
    params.push(catalogo);
  }

  try {
    const [productos] = await db.query(sql, params);
    const [marcas] = await db.query("SELECT * FROM marcas");
    const [catalogos] = await db.query("SELECT * FROM catalogos");

    res.render('index', {
      productos,
      marcas,
      catalogos,
      query: req.query
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar productos");
  }
});

// Ruta para mostrar el formulario de creación de producto
router.get('/create', async (req, res) => {
  try {
    const [marcas] = await db.query('SELECT * FROM marcas');
    const [catalogos] = await db.query('SELECT * FROM catalogos');
    res.render('create', { marcas, catalogos });
  } catch (error) {
    console.error(error);
    res.send('Error al cargar la vista');
  }
});

// Ruta para crear un producto (POST)
router.post('/create', upload.single('image'), async (req, res) => {
  const { nombre, precio, modelo, descripcion, stock, marca, catalogo } = req.body;
  const imagen = req.file ? fs.readFileSync(req.file.path) : null;

  try {
    await db.query(
      `INSERT INTO productos (producto, precio, modelo, descripcion, stock, idmarca, idcatalogo, imagen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, precio, modelo, descripcion, stock, marca, catalogo, imagen]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error al guardar el producto');
  }
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [producto] = await db.query('SELECT * FROM productos WHERE idproducto = ?', [id]);
    const [marcas] = await db.query('SELECT * FROM marcas');
    const [catalogos] = await db.query('SELECT * FROM catalogos');

    if (producto.length > 0)
      res.render('edit', { marcas, catalogos, producto: producto[0] });
    else
      res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el producto');
  }
});

router.post('/edit/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, modelo, descripcion, stock, marca, catalogo } = req.body;

  try {
    // Obtener imagen anterior si no se sube nueva
    let imagen = null;
    if (req.file) {
      imagen = fs.readFileSync(req.file.path);
    } else {
      const [producto] = await db.query('SELECT imagen FROM productos WHERE idproducto = ?', [id]);
      imagen = producto[0].imagen;
    }

    await db.query(`
      UPDATE productos 
      SET producto = ?, precio = ?, modelo = ?, descripcion = ?, stock = ?, idmarca = ?, idcatalogo = ?, imagen = ?
      WHERE idproducto = ?
    `, [nombre, precio, modelo, descripcion, stock, marca, catalogo, imagen, id]);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el producto');
  }
});


router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM productos WHERE idproducto = ?', [id]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el producto');
  }
});

// Ruta para obtener la imagen desde la base de datos (por ID de producto)
router.get('/imagen/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT imagen FROM productos WHERE idproducto = ?', [req.params.id]);
    if (rows.length === 0 || !rows[0].imagen) return res.send('Imagen no encontrada');

    res.set('Content-Type', 'image/jpeg'); // Ajusta a 'image/png' si es PNG
    res.send(rows[0].imagen);
  } catch (err) {
    console.error(err);
    res.send('Error al obtener la imagen');
  }
});

module.exports = router;