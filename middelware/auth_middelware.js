
const jwt = require('jsonwebtoken');
const Login = require("../model/login_model/login_model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];   
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Access Denied: No Token Provided"
            });
        }   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Login.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }   
        req.user = user;
        next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(500).json({
            status: 500,    
            message: "Internal Server Error"
        });
    }
};

module.exports = authMiddleware;
