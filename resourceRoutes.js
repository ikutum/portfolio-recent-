const express = require('express');
const authMiddleware =require('../middleware/authMiddle.js');
const router = express.Router();
//const {getProtectedResource}= require('/');
const {refreshToken} = require('../controller/authController.js');
 router.get('/verifyToken',(req,res)=>{
   res.json({message: 'here is verify token.' , userId:req.userId});
} );
 //router.get('/refreshToken',authMiddleware,(req,res)=>{
   // res.json({message: 'here is refresh token.' , userId:req.userId});
 //} );
 module.exports =router;