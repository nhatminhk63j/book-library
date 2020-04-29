var router = require('express').Router();
const controller = require('../controlls/bookController');
const uploadMulter = require('../models/multerModel');
const uploadController = require('../controlls/uploadController')

router.get('/', controller.index);

router.get('/create', controller.getCreate);

router.post('/create', uploadMulter.single('cover'), uploadController.uploadSingleFile, controller.postCreate);

module.exports = router;