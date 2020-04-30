module.exports.checkHasUser = (req, res, next) => {
    if(req.signedCookies.userID){
        res.locals.hasUser = true;
    }
    next();
}