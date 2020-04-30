const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const bcrypt = require('bcrypt');

module.exports.postLogin = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email) res.json({
        message: 'Email is required!',
        status: -1
    });
    if(!password) res.json({
        message: 'Password is required!',
        status: -1
    });

    if(email && password) {
        var user = await User.findOne({email: email});
        if(!user) {
            res.json({
                message: 'This email does not exist!',
                status: -1
            });
        } else {
            if(!bcrypt.compareSync(password, user.password)) {
                res.json({
                    message: 'Wrong password!',
                    status: -1
                });
            } else {
                res.cookie('userID', user._id, {signed: true});
                res.json({
                    message: 'Login success!',
                    status: 1
                });
            }
        }
    }
}

module.exports.getTransactions = async(req, res, next) => {
    var userID = req.signedCookies.userID;
    var transactions = await Transaction.find({userID: userID});
    res.json(transactions);
}