
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
app.use('/api/events', require('./routes/events'))


// Configuración para que mi aplicación arranque desde el index
// y funcionen las rutas de react sin el hash(#)
app.get('*',( req, res )=> {
    res.sendFile(__dirname + '/public/index.html')
})


// Escuchar peticiones
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})