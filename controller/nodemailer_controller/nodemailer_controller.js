const EmailModel = require("../../model/email_model/email_model");



class EmailController {
  static createEmail = async (req, res) => {
    try {
   
      const {name,email,phone,message} =req.body;

       const  sendEmail = await EmailModel.create({
        name,
        email,
        phone,
        message,
       });    
      
       const savemail = await sendEmail.save();

        return res.status(201).json({
          status:201,
        success: true,
        message: "Email sending successfully",
        data: savemail,
      });

    } catch (error) {
      return res.status(500).json({
        status:500,
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
    }
  };


  static getEmail = async(req,res)=>{
     try {
   
      const mail = await EmailModel.find();
     
        return res.status(200).json({
          status:200,
        success: true,
        message: "Email sending successfully",
        data: mail,
      });

    } catch (error) {
      return res.status(500).json({
        status:500,
        success: false,
        
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


    static deleteMail = async(req,res)=>{
      
      const id = req.params.id
      
      try {

    await EmailModel.findByIdAndDelete(id,req.body,{new:true});
     
        return res.status(200).json({
          status:200,
        success: true,
        message: "Delete email successfully",
       
      });

    } catch (error) {
      return res.status(500).json({
        status:500,
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
    };

}

module.exports = EmailController;
