const SocialContactModel = require('../../model/social_contact_model/social_contact.js');

const cloudinary = require('../../config/cloudinary/cloudinary.js');




class SocialContactController {

static getSocialContacts = async(req, res) =>{
    try{
          const socialInfo = await SocialContactModel.find();
             if(!socialInfo){
            return res.status(404).json({ status:404, message: "Social Contacts not found" });
        }


          return res.status(200).json({ status:200, message: "Social Contacts fetched successfully", data:socialInfo });        


    }catch(error){
        console.error("Error in getSocialContacts:", error);
       return res.status(500).json({ status:500,message: "Internal Server Error" });
    }
  };


static createSocialContact = async (req, res,next) => {
    const { link, socialIcon } = req.body;

    try {
     
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "social_contacts",
        });
        const newSocialContact = new SocialContactModel({
            link: link,
            socialIcon: result.secure_url,
            cloudinary_id: result.public_id
        });

       const socialData =   await newSocialContact.save();

      
        return res.status(201).json({
            status: 201,
            message: "Social Contact created successfully",
            data: socialData,
        });

    } catch (error) {
        console.error("Error in createSocialContact:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


};

module.exports = SocialContactController;