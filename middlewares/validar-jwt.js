const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {
 
    //leer el token (lo leo de los headers)
  const token = req.header('x-token');

  if (!token ) {
   
    return res.status(401).json({
      ok: false,
      mgs: 'No hay token en la peticion'
    });
  }

   try {

    const { uid } = jwt.verify( token, process.env.JWT_SECRET );
    req.uid = uid;
    
    next();
   
    } catch (error) {
     return res.status(401).json({
        ok:false,
        msg: 'Token no valido'
     });   

   }
    
    
    
    
}



module.exports = {
    validarJWT
}