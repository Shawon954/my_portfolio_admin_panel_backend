const express = require('express');
const HomeTitleController = require('../../controller/home_title/home_title_controller.js');
const authMiddleware = require('../../middelware/auth_middelware.js');
const HomeTitleRoutes = express.Router();

HomeTitleRoutes.put('/:id',authMiddleware,HomeTitleController.createHomeTitle);

module.exports = HomeTitleRoutes;