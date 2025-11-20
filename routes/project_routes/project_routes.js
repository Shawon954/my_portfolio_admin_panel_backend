const express = require('express');
const ProjectController = require('../../controller/project_controller/project_controller');
const multer = require('../../config/multer/multer');
const ProjectRouters = express.Router();


ProjectRouters.post("/",multer.single('project_img'),ProjectController.createProject);


module.exports = ProjectRouters;