const AboutMeModel = require("../../model/about_me_model/about_me_model");


class AboutMeController {

    static updateAboutMe = async (req, res) =>{
         const id = req.params.id;

         try {

              const updateId = await AboutMeModel.findById(id);
                if(!updateId){  
                     return res.status(404).json({ status:404, message: 'About Me Title not found' });
                }

                const updateAboutMeTitle = await AboutMeModel.findByIdAndUpdate(id, req.body, { new: true });

                return res.status(200).json({ status:200, message: 'About Me Title updated successfully', data: updateAboutMeTitle });

         } catch (error) {
           return  res.status(500).json({ status:500, message: 'Internal server error', error: error.message });
         }


    };


    static getAboutMe = async (req, res) =>{
        try {
            const aboutMeData = await AboutMeModel.find();
            return res.status(200).json({ status:200, message: 'About Me Data fetched successfully', data: aboutMeData });
        } catch (error) {
            return res.status(500).json({ status:500, message: 'Internal server error', error: error.message });
        }
};

};

module.exports = AboutMeController;
