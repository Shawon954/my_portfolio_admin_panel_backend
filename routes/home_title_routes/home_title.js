const express = require('express');
const HomeTitleController = require('../../controller/home_title/home_title_controller.js');
const HomeTitleRoutes = express.Router();

HomeTitleRoutes.put('/:id',HomeTitleController.createHomeTitle);

module.exports = HomeTitleRoutes;