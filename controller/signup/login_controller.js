const Login = require("../../model/login_model/login_model");

class LoginController {

    static login = async (req, res) => {
        try {
            const { username, email, password } = req.body;

           
            if (!username || !email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "All fields are required"
                });
            }

           
            const user = await Login.findOne({ email: email });

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found"
                });
            }

         
            if (user.password !== password) {
                return res.status(401).json({
                    status: 401,
                    message: "Incorrect password"
                });
            }

            // ✅ Login successful
            return res.status(201).json({
                status: 201,
                message: "Login successful",
                user: {
                    username: user.username,
                    email: user.email
                }
            });

        } catch (error) {
            console.log("Login Error:", error);

            return res.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };
}

module.exports = LoginController;
