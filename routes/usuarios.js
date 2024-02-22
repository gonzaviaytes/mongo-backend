//    Ruta /api/usuarios


//mi primera ruta de usuarios 
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


// en este caso separamos las rutas en un archivo independiente y creamos el controller donde vamos a tener la logica que va a hacer cada una de mis rutas.

const router = Router();

// desde el req, es el controlador de lo que va a ejecutarse cuando alguien haga una solicitud a /ap/usuarios en el slash, osea la ruta,  

//se recomienda separar el controlador en un respectivo archivo ya q crece mucho.(se valida, se retorna usuarios) se aplican validadores, se revisa el token, verificar que la info venga etc.
router.get('/', validarJWT ,getUsuarios );   

//peticion post para crear usuario
router.post('/', 
      [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
      ],
    crearUsuario 
);  

router.put('/:id', 
  [
       validarJWT,
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'El email es obligatorio').isEmail(),
       check('role', 'El role es obligatorio').not().isEmpty(),
      validarCampos,
  ],

    actualizarUsuario 
);


router.delete('/:id', 
  validarJWT,
  borrarUsuario
);


module.exports = router;