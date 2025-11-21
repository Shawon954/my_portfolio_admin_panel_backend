const cloudinary = require('../../config/cloudinary/cloudinary.js');
const ContactModel = require('../../model/contact_model/contact_model.js');

class ContactController {


    static createContact = async (req, res) => {

        const {title} =req.body;

        try{
            if (!title || !req.file) {  
                return res.status(400).json({ status: 400, success: false, message: "All Fields are required" });
            };

            const alreadyContact = await ContactModel.findOne({ title: title });
            if (alreadyContact) {
                return res.status(409).json({ status: 409, success: false, message: "Contact with this title already exists" });
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "Portfolio_Contacts",
            });

            const newContact = new ContactModel({
                title: title,
                contact_image: result.secure_url,
                cloudinary_id: result.public_id,
            });
            await newContact.save();

            return  res.status(201).json({ status: 201, success: true, message: "Contact Created Successfully", data: newContact });


        }catch (error) {
          return res.status(500).json({ status: 500, success: false, message: "Internal Server Error",error: error.message });
        }

    };


    static getContacts = async (req, res) => {
        try {
            const contacts =  await ContactModel.find().sort({ createdAt: -1 });
            return res.status(200).json({ status: 200, success: true, message: "Contacts fetched successfully", data: contacts });
        } catch (error) {
            return res.status(500).json({ status: 500, success: false, message: "Internal Server Error", error: error.message });
        }   
    };

    static deleteContact = async (req, res) => {
        const id = req.query.id;
        try{
            await ContactModel.findByIdAndDelete(id,req.body,{new:true});

            return res.status(200).json({ status: 200, success: true, message: "Contact Deleted Successfully" });
        }catch (error) {
            return res.status(500).json({ status: 500, success: false, message: "Internal Server Error", error: error.message });   

        }
};

};

module.exports = ContactController;