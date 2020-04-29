var router = require('express').Router();
const controller = require('../controlls/bookController');

router.get('/', controller.index);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

module.exports = router;