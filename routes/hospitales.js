/*
hospitales
ruta: '/api/hospitales'
*/


//    Ruta /api/usuarios


//mi primera ruta de usuarios 
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');


// en este caso separamos las rutas en un archivo independiente y creamos el controller donde vamos a tener la logica que va a hacer cada una de mis rutas.

const router = Router();

// desde el req, es el controlador de lo que va a ejecutarse cuando alguien haga una solicitud a /ap/usuarios en el slash, osea la ruta,  

//se recomienda separar el controlador en un respectivo archivo ya q crece mucho.(se valida, se retorna usuarios) se aplican validadores, se revisa el token, verificar que la info venga etc.
router.get('/', getHospitales );   

//peticion post para crear usuario
router.post('/', 
      [
       validarJWT,
       check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
       validarCampos
      ],
    crearHospital
);  

router.put('/:id', 
  [
      
  ],
    actualizarHospital
);


router.delete('/:id', 
  borrarHospital
);


module.exports = router;