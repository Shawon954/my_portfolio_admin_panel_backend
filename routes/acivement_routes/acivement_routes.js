const express = require('express');

const AcivemenentRouters = express.Router();
const AcivemenetController = require('../../controller/acivemenet_controller/acivemenet_controller.js');
const multer = require('../../config/multer/multer.js');
const authMiddleware = require('../../middelware/auth_middelware.js');

// Create Acivemenet
AcivemenentRouters.post('/',authMiddleware ,multer.single('acivement_image'), AcivemenetController.createAcivemenet);
// Get Acivemenets
AcivemenentRouters.get('/',authMiddleware ,AcivemenetController.getAcivemenets);
// Delete Acivemenet
AcivemenentRouters.delete('/:id',authMiddleware , AcivemenetController.deleteAcivemenet);

module.exports = AcivemenentRouters;