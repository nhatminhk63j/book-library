module.exports.index = (req, res, next) => {
    res.render('books/index');
}

module.exports.getCreate = (req, res, next) => {
    res.render('books/create');
}

module.exports.postCreate = (req, res, next) => {
    
}