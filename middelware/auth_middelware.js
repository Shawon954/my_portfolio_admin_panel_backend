
const jwt = require('jsonwebtoken');
const Login = require("../model/login_model/login_model");

const authMiddleware = async (req, res, next) => {
    try {
        console.log("AUTH HEADER:", req.headers.authorization);
        console.log("EXTRACTED TOKEN:", req.headers.authorization?.split(" ")[1]);

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Login.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
