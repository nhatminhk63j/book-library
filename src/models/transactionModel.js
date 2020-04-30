const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    bookID: String,
    userID: String,
    numberBook: Number,
    status: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;

