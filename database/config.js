const mongoose = require('mongoose');

    //creamos una funcion que sea la encargada de que cuando yo la llame, establezca la conexion

const dbConnection = async () => {

    // si quiero hacer conexiones a base de datos tengo que manejar el try y catch pq esto puede fallar
    
    try {
    
        await mongoose.connect( process.env.DB_CNN, {
        
        
        
        });  //cadena de conexion a nuestra base de datos
       
        
        console.log('DB Online');

    } catch(error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}    

module.exports = {
    dbConnection
}    