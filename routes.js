const cors = require('cors')
const express = require("express");
const controller = require("./controllers.js");


const router = express.Router();


// --------------- API REST CRUD

router.get    ("/usuarios",         cors(), controller.readUsuarios);   // Read All
router.get    ("/usuarios/:usuario",  cors(), controller.readUsuario);    // Read
router.delete ("/usuarios/:id",     cors(), controller.deleteUsuario);  // Delete
router.put    ("/usuarios/:id",     cors(), controller.updateUsuario);  // Update
router.post   ("/usuarios",         cors(), controller.createUsuario);  // Create


router.get    ("/carros",     cors(), controller.readCarros);  // Read All
router.get    ("/carros/:placa", cors(), controller.readCarro);   // Read
router.delete ("/carros/:id", cors(), controller.deleteCarro); // Delete
router.put    ("/carros/:id", cors(), controller.updateCarro); // Update
router.post   ("/carros",     cors(), controller.createCarro); // Create


router.get("/rentas", cors(), controller.readRentas);  // Read All
router.get("/rentas/:placa", cors(), controller.readRenta);   // Read
router.delete("/rentas/:id", cors(), controller.deleteRenta); // Delete
router.put("/rentas/:id", cors(), controller.updateRenta); // Update
router.post("/rentas", cors(), controller.createRenta); // Create

router.get("/retornos", cors(), controller.readRetornos);  // Read All
router.get("/retornos/:id", cors(), controller.readRetorno);   // Read
router.delete("/retornos/:id", cors(), controller.deleteRetorno); // Delete
router.put("/retornos/:id", cors(), controller.updateRetorno); // Update
router.post("/retornos", cors(), controller.createRetorno); // Create



module.exports = router;
