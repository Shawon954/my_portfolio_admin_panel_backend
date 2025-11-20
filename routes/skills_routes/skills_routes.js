const express = require('express');
const SkillsController = require('../../controller/skills_controller/skills_controller.js');
const SkillsRouters = express.Router();
const multer = require('../../config/multer/multer.js');
const authMiddleware = require('../../middelware/auth_middelware.js');

SkillsRouters.post('/', authMiddleware,multer.single('skillimage'), SkillsController.createSkill);
SkillsRouters.get('/', authMiddleware,SkillsController.getSkills);
SkillsRouters.delete('/:id',authMiddleware ,SkillsController.deleteSkill);

module.exports = SkillsRouters;