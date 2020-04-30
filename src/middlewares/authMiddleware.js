const User = require('../models/userModel');

module.exports.requireAuth = (req, res, next) => {
    if(req.signedCookies.userID) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports.requireAdmin = async(req, res, next) => {
    var user = await User.findById(req.signedCookies.userID);
    if(user.isAdmin) {
        next();
    } else {
        res.redirect('/books');
    }
}

module.exports.notRequireAuth = (req, res, next) => {
    if(!req.signedCookies.userID) {
        next();
    } else {
        res.redirect('/books');
    }
}