const Session = require('../models/sessionModel');
const Book = require('../models/bookModel');

module.exports.index = async(req, res, next) => {
    var session = await Session.findById(req.signedCookies.sessionID);
    var bag = session.bag;
    var books = [];
    for(let prop in bag) {
        let book = await Book.findById(prop);
        book.number = bag[prop];
        books.push(book);
    }
    res.render('bag/index', {
        books: books
    })
}

module.exports.addToBag = async(req, res, next) => {
    var bookID = req.params.id;
    var sessionID = req.signedCookies.sessionID;

    var session = await Session.findById(sessionID);
    var field = 'bag.' + bookID;
    var count = 1;
    if(session.bag[bookID]) count = session.bag[bookID] + 1;

    await Session.findOneAndUpdate({_id: sessionID}, {[field]: count});
    res.redirect('/books');
}

module.exports.deleteToBag = async(req, res, next) => {
    var bookID = req.params.id;
    var field = 'bag.' + bookID;
    var sessionID = req.signedCookies.sessionID;
    await Session.updateOne({_id: sessionID}, {$unset: {[field] : ''}})
    res.redirect('/bag');
}