const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    bag: Object
})

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;