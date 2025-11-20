const cloudinary = require('../../config/cloudinary/cloudinary.js');
const EducationModel = require('../../model/education_model/education_model.js');

class EducationController {


static createEducation = async (req, res) => {

    const { institution, department, yearOfPassing, cgpa,  } = req.body;
   try{

    if (!institution || !department || !yearOfPassing || !cgpa ) {
        return  res.status(400).json({ status:400,message: 'All fields are required' });
    }


    const result  = await cloudinary.uploader.upload(req.file.path, {
        folder: 'education_certificates',
    });

    const newEducation = new EducationModel({
        certificate_image: result.secure_url,
        cloudinary_id: result.public_id,        
        institution,
        department,
        yearOfPassing,
        cgpa,
    });

    await newEducation.save();
    return res.status(201).json({ status:201,message: 'Education record created successfully', data: newEducation });

   } catch (error) {
    return res.status(500).json({ status:500,message: 'Internal Server Error', error: error.message });

}

};

static getEducations = async (req, res) => {

    try {
        const educations = await EducationModel.find();
        return res.status(200).json({ status:200,message: 'Education records fetched successfully', data: educations });
    } catch (error) {
        return res.status(500).json({ status:500,message: 'Internal Server Error', error: error.message });
    }

};

static updateEducation = async (req, res) => {
    const  id  = req.params.id;  
    try {
           const eduId = await EducationModel.findById(id);

           if(eduId.certificate_image.cloudinary_id){
            await cloudinary.uploader.destroy(eduId.certificate_image.cloudinary_id);
           }

           const result  = await cloudinary.uploader.upload(req.file.path, {
            folder: 'education_certificates',
        });

        const updateBody = {
            certificate_image: result.secure_url,
            cloudinary_id: result.public_id,        
            ...req.body
        };

        const updatedEducation = await EducationModel.findByIdAndUpdate(id,updateBody, { new: true });
        return res.status(200).json({ status:200,message: 'Education record updated successfully', data: updatedEducation });
    } catch (error) {
        return res.status(500).json({ status:500,message: 'Internal Server Error', error: error.message });
    }   
};

static deleteEducation = async (req, res) => {

    const  id  = req.params.id;  
    try {

        await EducationModel.findByIdAndDelete(id,req.body, { new: true });
        return res.status(200).json({ status:200,message: 'Education record deleted successfully' });

    } catch (error) {
        return res.status(500).json({ status:500,message: 'Internal Server Error', error: error.message });
    }

}


};


module.exports = EducationController;