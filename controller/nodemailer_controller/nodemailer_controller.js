const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailController {
  static createEmail = async (req, res) => {
    try {
      console.log("BODY RECEIVED:", req.body);

      const { name, email, phone, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields required: name, email, phone, message",
        });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"Portfolio Message" <${process.env.USER_EMAIL}>`,
        to: process.env.USER_EMAIL,
        subject: `New Message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Email sent successfully!",
      });
    } catch (error) {
      console.log("EMAIL ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
    }
  };
}

module.exports = EmailController;
