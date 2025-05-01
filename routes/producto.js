const express = require('express') //Framework
const router = express.Router() //Rutas
const db = require('../config/database') //Acceso BD

router.get('/', async (req, res) => {
  try{
    const query = `
    SELECT 
      p.idproducto,
      p.producto,
      p.precio,
      p.modelo,
      p.descripcion,
      p.stock,
      m.marca,
      c.catalogo
    FROM productos p
  LEFT JOIN marcas m ON p.idmarca = m.idmarca
  LEFT JOIN catalogos c ON p.idcatalogo = c.idcatalogo;
    `
    const [productos] = await db.query(query)
    res.render('index', {productos})
  }catch(error){
    console.error(error)
  }
});

module.exports = router;