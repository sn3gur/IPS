module.exports = function(req, res, next) {
    //Check if the request DOES have an active session
    if (req.session && req.session.userId) {
        // Attach the user ID to the request so controllers can use it
        req.user = { id : req.session.userId }; 
        next();
    } else {
        // If they don't have a session, block them
        return res.status(401).json({ message: 'No active session, authorization denied' });
    }
};