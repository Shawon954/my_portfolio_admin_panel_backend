const express = require('express');
const ProjectController = require('../../controller/project_controller/project_controller');
const multer = require('../../config/multer/multer');
const authMiddleware = require('../../middelware/auth_middelware');
const ProjectRouters = express.Router();


ProjectRouters.post("/",authMiddleware,multer.single('project_img'),ProjectController.createProject);


module.exports = ProjectRouters;