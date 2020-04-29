const router = require('express').Router();
const controller = require('../controlls/userController');

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

module.exports = router;