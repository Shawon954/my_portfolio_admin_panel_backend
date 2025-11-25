const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailController {
  static createEmail = async (req, res) => {
    console.log("BODY:", req.body); // debug

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "EMPTY BODY RECEIVED",
      });
    }

    const { email, name, message, phone } = req.body;

    if (!email || !name || !message || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

   // try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: name,
        text: `Message: ${message}\nPhone: ${phone}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        status:200,
        success: true,
        message: "Email Sent Successfully",
      });
    // } catch (error) {
    //   return res.status(500).json({
    //     status:500,
    //     success: false,
    //     message: "Mail Sending Failed",
    //     error: error.message,
    //   });
    // }
  };
}

module.exports = EmailController;
