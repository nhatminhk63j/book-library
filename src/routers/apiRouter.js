const router = require('express').Router();
const controller = require('../controlls/apiController');
const uploadMulter = require('../models/multerModel');
const uploadController = require('../controlls/uploadController');


// auth router
router.post('/register', uploadMulter.single('avatar'), uploadController.uploadSingleFile, controller.register);
router.post('/login', controller.postLogin);
router.get('/profile', controller.getInfoUser);


// books router
router.get('/books', controller.getBooks);
router.post('/books', uploadMulter.single('cover'), uploadController.uploadSingleFile, controller.postBooks);


// bag router
router.get('/bag', controller.getBag);
router.get('/bag/add/:bookID', controller.addToBag);
router.get('/bag/delete/:bookID', controller.deleteOutBag);


// transactions router
router.get('/transactions', controller.getTransactions);
router.get('/transactions/add/:bookID', controller.addToTransactions);
router.get('/transactions/done/:transactionID', controller.setDoneTransaction);



module.exports = router;