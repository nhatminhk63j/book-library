const router = require('express').Router();
const controller = require('../controlls/apiController');

router.post('/login', controller.postLogin);

router.get('/transactions', controller.getTransactions);

module.exports = router;