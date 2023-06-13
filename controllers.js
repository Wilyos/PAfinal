const {Usuario, Carro, Renta, Retorno } = require("./models.js");


// ------- USUARIOS

exports.readUsuarios = (req, res) =>
    Usuario.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readUsuario = (req, res) =>
    Usuario.findOne({ usuario: req.params.usuario}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.deleteUsuario = (req, res) =>
    Usuario.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.updateUsuario = (req, res) =>
    Usuario.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { usuario: req.body.usuario, nombre: req.body.nombre, contrasena:req.body.contrasena, role: req.body.role, palabrareservada: req.body.palabrareservada } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createUsuario = (req, res) =>
    new Usuario({ usuario: req.body.usuario, nombre: req.body.nombre, contrasena:req.body.contrasena, role: req.body.role, palabrareservada: req.body.palabrareservada })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

  


// ------ CARROS

exports.readCarros = (req, res) =>
    Carro.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readCarro = (req, res) =>
    Carro.findOne({ placa: req.params.placa }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });





exports.deleteCarro = (req, res) =>
    Carro.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });



exports.updateCarro = (req, res) =>
    Carro.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { placa: req.body.placa, marca: req.body.marca, estado: req.body.estado, valordiario: req.body.valordiario } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createCarro = (req, res) =>
    new Carro({ placa: req.body.placa, marca: req.body.marca, estado: req.body.estado, valordiario: req.body.valordiario })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });



// ------- RENTAS

exports.readRentas = (req, res) =>
    Renta.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readRenta = (req, res) =>
    Renta.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


    exports.readRenta = (req, res) =>
    Renta.findOne({ placa:req.params.placa}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.deleteRenta = (req, res) =>
    Renta.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.updateRenta = (req, res) =>
    Renta.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { numerorenta: req.body.numerorenta, usuario: req.body.usuario, placa:req.body.placa, fechainicial: req.body.fechainicial, fechafinal: req.body.fechafinal, estado:req.body.estado } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createRenta = (req, res) =>
    new Renta ({  numerorenta: req.body.numerorenta, usuario: req.body.usuario, placa:req.body.placa, fechainicial: req.body.fechainicial, fechafinal: req.body.fechafinal, estado:req.body.estado})
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

// ------- RETORNO

exports.readRetornos = (req, res) =>
    Retorno.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readRetorno = (req, res) =>
    Retorno.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.deleteRetorno = (req, res) =>
    Retorno.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.updateRetorno = (req, res) =>
    Retorno.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {numeroretorno: req.body.numeroretorno, numerorenta: req.body.numerorenta, fecharetorno:req.body.fecharetorno} }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createRetorno = (req, res) =>
    new Retorno ({numeroretorno: req.body.numeroretorno, numerorenta: req.body.numerorenta, fecharetorno:req.body.fecharetorno})
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

