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
            res.redirect('/users/login');
        }
    });
}

module.exports.getLogin = (req, res, next) => {
    res.render("users/login");
}

module.exports.postLogin = (req, res, next) => {
    var errors = [];
    const {email, password} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(err) console.log("Login fail", err);
        else {
            if(!user) {
                errors.push("Email is not existed!");
                res.render('users/login', {errors: errors, email: email, password: password});
            } else {
                if(!bcrypt.compareSync(password, user.password)) {
                    errors.push("Password is not correct!");
                    res.render('users/login', {errors: errors, email: email, password: password});
                } else {
                    res.cookie('userID', user._id, {signed: true})
                    res.redirect('/books');
                }
            }
        }
    })
}

module.exports.logout = (req, res, next) => {
    res.clearCookie('userID');
    res.redirect('/books');
}

module.exports.getProfile = async(req, res, next) => {
    var user = await User.findById(req.signedCookies.userID);
    res.render('users/profile', {user: user});
}

module.exports.errorTest = (req, res, next) => {
    try {
        var a;
        a.b();
    } catch(err) {
        res.status(500);
        next();
    }
}