let user = require('../models/model.js');
const auth =require('../routes/authRoutes.js');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const logger = require('../logs/log.js');
const app = express();

// REGISTERING

module.exports.register_post =async (req,res) =>{
    try{
        const{username ,email,password ,age} =req.body;
        console.time("registerTimer");
        const hashedPassword = await bcrypt.hash(password, 10);
        const myUser =new user({username ,email,password:hashedPassword ,age});
        const saveUser = await myUser.save();
        logger.info('registration Successful for user');
        res.status(201).json(saveUser);
       // console.log(user);
    }catch (error){
        console.log('Error while registering', error);
        logger.error('An error occurred:', error);
        res.status(401).json({error:error.message});
    } finally {
        console.timeEnd("registerTimer");
   console.log('registration Successful for user') }
};



// LOGIN
module.exports.login_post =async (req,res) =>{
    try{
        console.time("loginTimer");
        const {email , password} =req.body;
        const myUser = await user.findOne({email});
        if (!myUser){
            console.timeEnd("loginTimer");
            return res.status(401).json({error:'Invalid email'});
        }
        const isPasswordValid =await bcrypt.compare(password, myUser.password);
      if (!isPasswordValid) {
        console.timeEnd("loginTimer"); 
        return res.status(401).json({error: 'Incorrect password'});
      }

// Accessing token
      const accessToken =jwt.sign({userId: user.id, username: user.username},process.env.jwt_Secret, {expiresIn:'30m'}); 

// Refreshing it
      const refreshToken =jwt.sign({userId: user.id, username: user.username},process.env.jwt_Secret, {expiresIn:'2h'});

// Sending these both   
      console.timeEnd("loginTimer");   
      logger.info('login successfully');
      res.json({ accessToken,refreshToken });
    } catch(error){
     console.timeEnd("loginTimer");
     logger.error('Invalid email or password');
        res.status(400).json({error: error.message});
    }
    console.log('login successfully')
};



// refresh token 
module.exports.renew_token_post =async (req,res) =>{
    try{
        console.time("refreshTokenTimer");
         const refreshToken =req.headers.authorization;

    jwt.verify(refreshToken,process.env.jwt_Secret,(err,decoded) =>{                             //verification of refreshToken
        if(err){
            console.timeEnd("refreshTokenTimer");
            return res.status(401).json({error:'Invalid refresh token'});
        }
                                                                                //generatate access token
const accessToken = jwt.sign({userId: decoded.userId, username:decoded.username},process.env.jwt_Secret, {expiresIn:'1h'});
console.timeEnd("refreshTokenTimer"); 
logger.info('Access token generated ')
res.json({accessToken});
    });
} catch (error){
    console.timeEnd("refreshTokenTimer");
    logger.error('an error occurred', error);
    res.status(400).json({error:error.message});
}
console.log('Access token generated successfully');
}


// LOGOUT

    module.exports.logout_get =async (req,res) =>{
        try{
            console.time("logoutTimer");
            const token = req.header('Authorization').split('')[1];
            logger.info('Logout Successfully');
            console.timeEnd("logoutTimer");
            res.status(200).json({message:"Logout successfully"});
        } catch(error){
            console.log('Error during logout!', error);
            console.timeEnd("logoutTimer");
            res.status(500).json({error:'logout failed'});
        }
        console.time
        console.log('logout successfully!')
        };
