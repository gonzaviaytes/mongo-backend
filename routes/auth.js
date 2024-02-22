const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const router = Router();


router.post( '/',
 [
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'El password es obligatorio').not().isEmpty(),
   validarCampos,
 ],
 login
)





module.exports = router;