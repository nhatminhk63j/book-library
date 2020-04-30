const Book = require('../models/bookModel');

module.exports.index = async(req, res, next) => {
    var books = await Book.find();
    // pagination here
    res.render('books/index', {books: books});
}

module.exports.getCreate = (req, res, next) => {
    res.render('books/create');
}

module.exports.postCreate = (req, res, next) => {
    var book = new Book({
        title: req.body.title,
        description: req.body.description,
        cover: req.imageDetails.cloudImage
    })
    book.save(err => {
        if(err) console.log('Save book fail', err);
        else {
            res.redirect('/books/create');
        }
    })
}