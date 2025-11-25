const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailController {

  static createEmail = async (req, res) => {
    const { email, name, message,phone } = req.body;

  //  try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: name,
        text: `Message: ${message}\nPhone: ${phone}`,
      };

      // FIX → store result in "info"
      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        status: 200,
        success:true,
        message: "Email Sent Successfully",
       
      });

    // } catch (error) {
    //   return res.status(500).json({
    //     status: 500,
    //      success:false,
    //     message: "Mail Sending Failed",
    //     error: error.message
    //   });
    // }
  };

}

module.exports = EmailController;
