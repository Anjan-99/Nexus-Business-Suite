const jwt = require("jsonwebtoken");
const User = require('../models/user');
const cookieParser = require('cookie-parser');

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) {
            console.log('User not found');
        }
        else {
            console.log("User found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next(); 
    } catch (err) {
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
}

module.exports = authentication 