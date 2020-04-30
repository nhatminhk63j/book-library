const Transaction = require('../models/transactionModel');
const Session = require('../models/sessionModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

module.exports.index = async(req, res, next) => {
    var userID = req.signedCookies.userID;
    var transactions = await Transaction.find({userID: userID});
    Promise.all(transactions.map(async(item) => {
        let book = await Book.findById(item.bookID);
        let user = await User.findById(item.userID);
        return {
            book: {
                title: book.title,
                number: item.numberBook,
                cover: book.cover,
                _id: book._id
            },
            user: {
                name: user.name,
                _id: user._id
            }
        }
    })).then(result => {
        res.render('transactions/index', {
            transactions: result
        });
    })
}

module.exports.addToTransaction = async(req, res, next) => {
    var bookID = req.params.id;
    var userID = req.signedCookies.userID;
    var sessionID = req.signedCookies.sessionID;
    var session = await Session.findById(sessionID);

    var transaction = new Transaction({
        bookID: bookID,
        userID: userID,
        numberBook: session.bag[bookID],
        status: false
    });

    await transaction.save();

    await Session.findOneAndUpdate({_id: sessionID}, {$unset: {["bag." + bookID]: ''}});

    res.redirect('/bag');
}