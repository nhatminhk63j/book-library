const router = require('express').Router();
const controller = require('../controlls/userController');
const uploadMulter = require('../models/multerModel');
const uploadController = require('../controlls/uploadController');
const validate = require('../validates/authValidate');
const middleware = require('../middlewares/authMiddleware');

router.get('/register', middleware.notRequireAuth, controller.getCreate);

router.post('/register', uploadMulter.single('avatar'), validate.register, uploadController.uploadSingleFile, controller.postCreate);

router.get('/login', middleware.notRequireAuth, controller.getLogin);

router.post('/login', validate.login, controller.postLogin);

router.get('/logout', controller.logout);

router.get('/profile', middleware.requireAuth, controller.getProfile);

router.get('/error', controller.errorTest);

module.exports = router;