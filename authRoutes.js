const {Router}= require('express');
const authController = require('../controller/authController');
//const authController =require('C:/Users/LENOVO/Desktop/Portpolio Project/controller/authController.js');
const router = Router();

router.post('/register', authController.register_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/renew_token', authController.renew_token_post);
module.exports= router;

