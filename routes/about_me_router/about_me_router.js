const express = require('express');
const AboutMeController = require('../../controller/about_me_controller/about_me_controller.js');
const authMiddleware = require('../../middelware/auth_middelware.js');
const AboutMeRouter = express.Router();

// Update About Me Title
AboutMeRouter.put('/:id',authMiddleware, AboutMeController.updateAboutMe);
// Get About Me Data
AboutMeRouter.get('/', authMiddleware,AboutMeController.getAboutMe);

module.exports = AboutMeRouter;