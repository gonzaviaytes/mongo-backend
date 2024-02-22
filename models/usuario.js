//esto sera un modelo de mongose que sera encargado de ponerle restricciones a mi base de datos o que cada registro de usuarios luzca de la manera q yo quiero

const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({

   nombre: {
      type: String,
      required: true,
   },
   email: {
    type: String,
    required: true,
    unique: true,
   },
   password: {
    type: String,
    required: true,
   },
   img: {
    type: String,
   
   },
   role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
   },
   google: {
    type: Boolean,
    default: false,
   },

});    


usuarioSchema.method('toJSON', function() {
   const { __v, _id, password, ...object } = this.toObject();
   
   object.uid = _id;
   return object;

})
module .exports = model('Usuario', usuarioSchema);