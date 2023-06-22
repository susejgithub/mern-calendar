const express = require('express');
const { dbConection } = require('./database/config');
require('dotenv').config();

const  cors = require('cors')

//Server de Express
const app= express();

//Base de datos
dbConection();

//Cors
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json() );


app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Escuchar aplicaciones
app.listen(process.env.PORT, () => {
    console.log(`Servido corriendo en puerto ${process.env.PORT}`)
});