const Session = require('../models/sessionModel');

module.exports = async(req, res, next) => {
    if(!req.signedCookies.sessionID) {
        var session = new Session({});
        session.save((err, session) => {
            if(err) console.log('Save session fail', err);
            else {
                res.cookie('sessionID', session._id, {signed: true});
            }
        })
    } else {
        var session = await Session.findById(req.signedCookies.sessionID);
        var numberBook = 0;
        for(let prop in session.bag) {
            numberBook += session.bag[prop];
        }
        res.locals.numberBook = numberBook;
    }
    next();
}