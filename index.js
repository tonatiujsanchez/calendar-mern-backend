
const express = require('express')
require('dotenv').config()
const cors = require('cors')

const { dbConnection } = require('./database/config')


// Crear el servidor de express
const app = express()

// DB connetion
dbConnection()

// cors
app.use(cors())

// Lectura y parseo del body
app.use( express.json() )

// Directorio publico
app.use(express.static('public'))


// Rutas
app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD: calendar events




// Escuchar peticiones
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})