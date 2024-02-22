const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
   
    const errores = validationResult(req);
    
    if ( !errores.isEmpty()) {
        return res.status(400).json({
         ok: false,
         errors: errores.mapped()
        });
    }    

    //con esto, revisamos que no haya errores en la request,
    //si los hay, disparo el error 400 con el check. Y si llega al final sin errores, llamo el next

    next();

} 


module.exports = {
    validarCampos
}    