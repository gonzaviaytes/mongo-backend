require('dotenv').config();

const express = require('express');
const bcryptjs = require('bcryptjs');

const { dbConnection } = require('./database/config');

const cors = require('cors')





//Crear el servidor de express, con el const app lo inicialimos.
const app = express();

//configurar CORS
app.use(cors())

// Lectura y parseo del body. esto va antes de las rutas. si no primero hace las rutas y luego hace el parseo del body y da problemas
app.use(express.json());

// Base de datos
dbConnection();





// crear ruta mediante app de express

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

 


app.listen(process.env.PORT, () =>  {
    console.log('Servidor corriendo en el puerto ' + 3000);
});    
