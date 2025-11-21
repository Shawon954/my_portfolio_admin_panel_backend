const cloudinary = require('../../config/cloudinary/cloudinary.js');
const AcivementModel = require('../../model/acivement_model/acivemenent_model.js');

class AcivemenetController {

 static createAcivemenet = async(req, res) =>{
    
    const {title,} = req.body;
    try {
        if(!title){
            return res.status(400).json({message: "Title fields are required"});
        }   
        
        const alreadyAcivement = await AcivementModel.findOne({title: title});
        if(alreadyAcivement){
            return res.status(409).json({status:409,message: "Acivement already exists"});
        }
         

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "acivemenet_images",
        }); 

        const newAcivement = new AcivementModel({
            title: title,
            acivement_image: result.secure_url,
            cloudinary_id: result.public_id
        });
        await newAcivement.save();
     
        return res.status(201).json({status:201,message: "Acivement created successfully",data: newAcivement});
    } catch (error) {
        return res.status(500).json({status:500,message: "Internal server error",error: error.message});
    }
 };


static getAcivemenets = async(req, res) =>{
    try {
        const acivemenets = await AcivementModel.find();
        return res.status(200).json({status:200,message: "Acivemenets fetched successfully",data: acivemenets});
    } catch (error) {
        return res.status(500).json({status:500,message: "Internal server error",error: error.message});
    }

};

 static deleteAcivemenet = async(req, res) =>{
    const id = req.params.id;
    try {
        await AcivementModel.findByIdAndDelete(id,req.body, {new: true});
        return res.status(200).json({status:200,message: "Acivement deleted successfully"});
    } catch (error) {
        return res.status(500).json({status:500,message: "Internal server error",error: error.message});
    }
};
};

module.exports = AcivemenetController;