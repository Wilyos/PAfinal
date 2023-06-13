const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario',
  new mongoose.Schema({ usuario: String, nombre: String, contrasena: String, role:String, palabrareservada: String})
);

const Carro = mongoose.model('Carro',
  new mongoose.Schema({ placa: String, marca: String, estado: Boolean, valordiario:Number })
);

const Renta = mongoose.model('Renta',
new mongoose.Schema({numerorenta: Number, usuario: String, placa: String, fechainicial: String, fechafinal:String, estado:Boolean})
);
const Retorno = mongoose.model('Retorno',
new mongoose.Schema({numeroretorno:Number, numerorenta:Number, fecharetorno: String})
);

module.exports = {
  Usuario: Usuario,
  Carro: Carro,
  Renta: Renta,
  Retorno: Retorno,
}

// Otra forma más corta:
// module.exports = {
//     Cliente,
//     Articulo
// }
