const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '.env.local' });

const auth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    const secretKey = process.env.JWT_SECRET;
    
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretKey);
        req.userId = decodedToken._id;
        req.isAuth = true;
        next();
    } catch (error) {
        req.isAuth = false;
        error.statusCode = 401;
        error.message = "jwt token verification failed"
        return next(error);
    }
};

module.exports = auth;
