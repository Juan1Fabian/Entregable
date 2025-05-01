const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const rutaProducto = require('./routes/producto')

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', rutaProducto)

app.listen(PORT,() =>{
    console.log('Servidor iniciado en http://localhost:5000')
})