require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');

const cors = require('cors')


//Crear el servidor de express, con el const app lo inicialimos.
const app = express();

//configurar CORS
app.use(cors())

// Base de datos
dbConnection();





// crear ruta mediante app de express
app.get('/', (req, res) => {

   res.json({
    ok: true,
    msg: 'Hola mundo'
   })

});    


app.listen(process.env.PORT, () =>  {
    console.log('Servidor corriendo en el puerto ' + 3000);
});    
