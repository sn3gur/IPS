/* Middleware to authenticate JWT tokens */

const jwt  = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach user info to request
        next(); // go to the next middleware or route handler
    }catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};