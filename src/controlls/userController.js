const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.getCreate = (req, res, next) => {
    res.render('users/register');
}

module.exports.postCreate = (req, res, next) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        avatar: req.imageDetails.cloudImage || 'https://cdn.freelancerviet.vn/fv4uploads/uploads/users/7e/dey/iqj/avatar/thumb_240701799639459.jpg'
    })

    user.save(err => {
        if(err) console.log("Save user fail!", err);
        else {
            res.redirect('/user/login');
        }
    });
}

module.exports.getLogin = (req, res, next) => {
    res.render("users/login");
}

module.exports.postLogin = (req, res, next) => {

}