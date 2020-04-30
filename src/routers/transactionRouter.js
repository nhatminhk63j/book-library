const router = require('express').Router();
const controller = require('../controlls/transactionController');

router.get('/', controller.index);

router.get('/add/:id', controller.addToTransaction);

module.exports = router;