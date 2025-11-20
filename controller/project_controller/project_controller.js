const ProjectModel = require("../../model/project_model/project_model");
const cloudinary = require("../../config/cloudinary/cloudinary");

class ProjectController {
 
    static createProject = async (req, res) => {
    try {


      const { title, description } = req.body;

      if (!title || !description || !req.file) {
        return res.status(400).json({
          status: 400,
          message: "All fields are required",
        });
      }

      // Check duplicate
      const exists = await ProjectModel.findOne({ title });
      if (exists) {
        return res.status(409).json({
          status: 409,
          message: "Project with this title already exists",
        });
      }

      // Upload image
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects_images",
      });

      const newProject = new ProjectModel({
        title,
        description,
        project_img: uploadImage.secure_url,
        cloudinary_id: uploadImage.public_id,
      });

      const saved = await newProject.save();

      return res.status(201).json({
        status: 201,
        message: "Project created successfully",
        data: saved,
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  
  static getProjects = async(req, res) => {
    
    try {
     const projects = await ProjectModel.find();
      return res.status(200).json({
        status: 200,
        message: "Projects fetched successfully",
        data: projects,
      });
    } 
    catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


  static updateProject = async (req, res) => {
    const id = req.params.id;
   try {
     const projectId = await ProjectModel.findById(id);

     if(projectId.project_img.cloudinary_id){
        await cloudinary.uploader.destroy(projectId.project_img.cloudinary_id);
     }

     const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects_images",
     });
        const updateBody = {    
        ...req.body,
        project_img: result.secure_url,
        cloudinary_id: result.public_id,
        
        };
    
      const updateProject = await ProjectModel.findByIdAndUpdate(id, updateBody, { new: true });

    return res.status(200).json({
        status:200,
        message:"Project updated successfully",
        data:updateProject
    });

   } catch (error) {
     return res.status(500).json({
       status: 500,
       message: "Internal Server Error",
       error: error.message,
     });    
   }    
  };


  static deleteProject = async (req, res) => {
    const id = req.params.id;       
    try {
    await ProjectModel.findByIdAndDelete(id,req.body,{new:true});
      return res.status(200).json({
        status: 200,
        message: "Project deleted successfully",
      });

    }
    catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
};

module.exports = ProjectController;
