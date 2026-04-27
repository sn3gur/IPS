/* Middleware to authenticate */

module.exports = function(req, res, next) {
    //check if request has active session
    if (!req.session.userId) {
        req.user = {id : req.session.userId}; 
        next();
    }else{
        return res.status(401).json({ message: 'No active session, authorization denied' });
    }
};