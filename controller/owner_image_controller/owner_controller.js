const OwnerImageModel = require("../../model/owner_image_model/owner_image_model.js");
const cloudinary = require("../../config/cloudinary/cloudinary.js");

class ownerImageController {

    static updateOwnerImage = async (req, res) => {
        try {
            const id = req.params.id;

            // 1. Find Image
            const ownerImg = await OwnerImageModel.findById(id);
            if (!ownerImg) {
                return res.status(404).json({
                    status: 404,
                    message: "Owner image not found"
                });
            }

            // 2. Check new image uploaded
            if (!req.file) {
                return res.status(400).json({
                    status: 400,
                    message: "New image required"
                });
            }

            // 3. Delete old cloudinary image
            if (ownerImg.cloudinary_id) {
                await cloudinary.uploader.destroy(ownerImg.cloudinary_id);
            }

            // 4. Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "owner_images"
            });

            // 5. Update DB
                 const updateBody = {
            ownerimage: result.secure_url,      // ✔ correct key
            cloudinary_id: result.public_id     // ✔ correct key
        };

           const updateImage = await OwnerImageModel.findByIdAndUpdate(id,updateBody,{new:true});


            await updateImage.save();

            return res.status(200).json({
                status: 200,
                message: "Owner image updated successfully",
                data: updateImage
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };


    static getOwnerImage= async(req,res)=>{

  
     try{
        const getImage = await OwnerImageModel.find();
                return res.status(200).json({status:200,success:true,message:"Owner Image Get Successfully",data:getImage});

     }catch(error){
        return res.status(500).json({status:500,success:false,message:"Internal Server Error",error:error.message});
     }

    }
}

module.exports = ownerImageController;
