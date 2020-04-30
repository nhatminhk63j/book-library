const router = require('express').Router();
const controller = require('../controlls/bagController');

router.get('/', controller.index);

router.get('/add/:id', controller.addToBag);

router.get('/delete/:id', controller.deleteToBag);

module.exports = router;