const SkillsModel = require("../../model/skills_model/skills_model.js");
const cloudinary = require("../../config/cloudinary/cloudinary.js");

class SkillsController {

    static createSkill = async (req, res,next) => {

        const { skillname, skillimage } = req.body;

        try {
           
            const alreasySkill = await SkillsModel.findOne({ skillname: skillname });
            if (alreasySkill) {
                return  res.status(409).json({ status:409,message: "Skill already exists" });
            }

            const uploadedSkillImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "Skills",
            });

            const newSkill = new SkillsModel({
                skillname,
                skillimage: uploadedSkillImage.secure_url,
                cloudinary_id: uploadedSkillImage.public_id,
            });

            const savedSkill = await newSkill.save();
                 
            return res.status(201).json({ status:201,message: "Skill created successfully",data: savedSkill });

        } catch (error) {
          return res.status(500).json({ status:500,message: "Internal Server Error",error: error.message });
        }
};


static getSkills = async (req, res) => {
    try {
        const skills = await SkillsModel.find();
        return res.status(200).json({ status:200,message: "Skills fetched successfully",data: skills });
    } catch (error) {
        return res.status(500).json({ status:500,message: "Internal Server Error",error: error.message });
    }

};


static deleteSkill = async (req, res) => {
    const  id  = req.params.id;      
      try {
           await SkillsModel.findByIdAndDelete(id,req.body, { new: true });
           return res.status(200).json({ status:200,message: "Skill deleted successfully" });
        } catch (error) {
          return res.status(500).json({ status:500,message: "Internal Server Error",error: error.message });
        }
};


};


module.exports = SkillsController;