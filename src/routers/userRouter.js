const router = require('express').Router();
const controller = require('../controlls/userController');
const uploadMulter = require('../models/multerModel');
const uploadController = require('../controlls/uploadController');
const validate = require('../validates/authValidate');

router.get('/register', controller.getCreate);

router.post('/register', validate.register, uploadMulter.single('avatar'), uploadController.uploadSingleFile, controller.postCreate);

router.get('/login', controller.getLogin);

router.post('/login', validate.login, controller.postLogin);

module.exports = router;