const express = require('express');

const OwnerImageRoutes = express.Router();
const multer = require('../../config/multer/multer.js');
const ownerImageController = require('../../controller/owner_image_controller/owner_controller.js');
const authMiddleware = require('../../middelware/auth_middelware.js');

OwnerImageRoutes.put("/:id",authMiddleware,multer.single('ownerimage'),ownerImageController.updateOwnerImage);
OwnerImageRoutes.get('/',ownerImageController.getOwnerImage);

module.exports = OwnerImageRoutes;