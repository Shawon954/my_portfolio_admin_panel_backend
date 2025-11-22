const HomeTitleModel = require("../../model/home_title_model/hometitle");

class HomeTitleController{

static getHomeTitle = async(req, res)=>{

  try {
      const homeInfo = await HomeTitleModel.find();
      res.status(200).json({status:200,message: 'Data retrieved successfully',data:homeInfo});
  } catch (error) {
      res.status(500).json({status:500,message: 'Internal Server Error' });
  }
}


static createHomeTitle = async(req, res,)=>{
 const id = req.params.id;

  try {
      const userID = await HomeTitleModel.findById(id);
      const homeInfo = await HomeTitleModel.findOne(userID);
      if(!homeInfo){
        return res.status(404).json({status:404,message: 'Data not found' });
      }

      const updateData = await HomeTitleModel.findByIdAndUpdate(
        id,req.body,{ new: true }
      );


 return res.status(200).json({status:200,message: 'Data updated successfully',data:updateData });

  }catch (error) {
    res.status(500).json({status:500,message: 'Internal Server Error' });
  }

};

}


module.exports = HomeTitleController;