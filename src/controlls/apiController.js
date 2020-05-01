const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel');
const Session = require('../models/sessionModel');

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
    Promise.all(transactions.map(async(item) => {
        let book = await Book.findById(item.bookID);
        return {
            _id: item._id,
            status: item.status,
            book: {
                title: book.title,
                number: item.numberBook,
                cover: book.cover,
                _id: book._id
            }
        }
    })).then(result => {
        res.json(result);
    }).catch(err => res.json({message: 'Get transactions fail!'}));
}

module.exports.getInfoUser = async(req, res, next) => {
    var userID = req.signedCookies.userID;
    if(!userID) res.json({message: 'You do not login!'});
    var user = await User.findById(userID);
    res.json({name: user.name, email: user.email, avatar: user.avatar});
}

module.exports.register = (req, res, next) => {
    
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        avatar: req.imageDetails.cloudImage
    })

    user.save(err => {
        if(err) res.json({message: 'Register fail!'});
        else {
            res.json({message: 'Register success!'});
        }
    })
}

module.exports.getBooks = async(req, res, next) => {
    var books = await Book.find();
    if(!books) res.json({message: 'Nothing in here!'});
    res.json(books);
}

module.exports.postBooks = async(req, res, next) => {
    var book = new Book({
        title: req.body.title,
        description: req.body.description,
        cover: req.imageDetails.cloudImage
    });

    book.save(err => {
        if(err) res.json({message: 'Save book errror'});
        else {
            res.json({message: 'Upload success!'})
        }
    });
}

module.exports.getBag = async(req, res, next) => {
    var sessionID = req.signedCookies.sessionID;
    if(!sessionID) res.json({message: 'Get bag fail!'});
    var session = await Session.findOne({_id: sessionID});
    var bag = [];
    for(let prop in session.bag) {
        let book = await Book.findById(prop);
        bag.push({...book._doc, number: session.bag[prop]});
    }
    if(!bag) res.json({message: 'Nothing in here!'});
    else {
        res.json(bag);
    }
}

module.exports.addToBag = async(req, res, next) => {
    var sessionID = req.signedCookies.sessionID;
    if(!sessionID) res.json({message: 'Add to bag fail!'});
    var bookID = req.params.bookID;
    var session = await Session.findById(sessionID);
    var number = 1;
    if(session.bag && session.bag[bookID]) {
        number = session.bag[bookID] + 1;
    }
    Session.findOneAndUpdate({_id: sessionID}, {['bag.'+ bookID]: number}, (err) => {
        if(err) res.json({message: 'Add to bag fail!'});
        else res.json({message: 'Add to bag success!'});
    });
}

module.exports.deleteOutBag = async(req, res, next) => {
    var bookID = req.params.bookID;
    var sessionID = req.signedCookies.sessionID;
    await Session.updateOne({_id: sessionID}, {$unset: {['bag.' + bookID] : ''}}, (err) => {
        if(err) res.json({message: 'Delete fail!'});
        else res.json({message: 'Delete success!'});
    });
}

module.exports.addToTransactions = async(req, res, next) => {
    var bookID = req.params.bookID;
    var userID = req.signedCookies.userID;
    var sessionID = req.signedCookies.sessionID;
    var session = await Session.findById(sessionID);

    var transaction = new Transaction({
        bookID: bookID,
        userID: userID,
        numberBook: session.bag[bookID],
        status: false
    });

    await transaction.save(err => {
        if(err) res.json({message: 'Save transaction fail!'});
    });

    await Session.findOneAndUpdate({_id: sessionID}, {$unset: {["bag." + bookID]: ''}}, (err) => {
        if(err) res.json({message: 'Add to transaction fail!'});
        else res.json({message: 'Add to transactions success!'})
    });
}

module.exports.setDoneTransaction = async(req, res, next) => {
    var transactionID = req.params.transactionID;
    await Transaction.findOneAndUpdate({_id: transactionID}, {status: true}, (err) => {
        if(err) res.json({message: 'Set done Transaction fail!'});
        else res.json({message: 'Set done success!'});
    })
}