//dentro de este archivos de controladores se hacen funciones que voy a exportar.


const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {   
   
   const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({                           
     ok: true,
     usuarios
    
    });
 
 }


 const crearUsuario = async(req, res = response) => {         

    const { email, password } = req.body;
    
    
    
    try {
     
      const existeEmail = await Usuario.findOne({ email });
      
      if ( existeEmail ) {

         return res.status(400).json({
            ok: false,
            mgs: 'El correo ya esta registrado'
         });
      
      }
      
      
      const usuario = new Usuario( req.body );
      
      //encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync( password, salt );
      
      // aqui guardo el usuario
      await usuario.save();

      
      //si llega a este punto se genera un token - jwt
       const token = await generarJWT(usuario.id);
     
      
       res.json({                           
          ok: true,
          usuario,
          token
     });



    } catch (error) {
         console.log(error);
         res.status(500).json({
            ok:false,
            mgs: 'Error inesperado... revisar logs'
         })
    }
    
    
}

const actualizarUsuario = async( req, res = response) => {
    
     // todo: validar token y comprobar si el usuario es correcto

   const uid = req.params.id;
   

    try {
 
      const usuarioDB = await Usuario.findById( uid );

      if (!usuarioDB ) {

         return res.status(400).json({
            ok: false,
            mgs: 'No existe un usuario por ese id'
         });
      }

      // acabamos de hacer la instancia del usuario, ahora actualizaciones de usuario de la base de datos
      const {password, google, email, ...campos} = req.body;
      
      if ( usuarioDB.email !== email) {
       
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
         return res.status(400).json({
              ok: false,
              mgs: 'ya existe un usuario con ese email'
           });
        }
      }
      
      campos.email = email; 
      
      const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

      res.json({
         ok: true,
          usuario: usuarioActualizado
      });


    }  catch (error) {
      console.log(error);
        res.status(500).json({
            ok:false,
            mgs: 'Error inesperado'
        })
    }

}   

const borrarUsuario = async( req, res = response) => {

   const uid = req.params.id;

   try {

      const usuarioDB = await Usuario.findById( uid );

      if (!usuarioDB ) {

         return res.status(400).json({
            ok: false,
            mgs: 'No existe un usuario por ese id'
         });
      }

      await Usuario.findByIdAndDelete( uid );
     
     res.json({
     ok: true,
     msg: 'Usuario eliminado'
     })

   } catch (error) {
      console.log(error);
      res.status(500).json({
      ok:false,
      mgs: 'Hable con el administrador'
    });   
   
   }

}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
 }