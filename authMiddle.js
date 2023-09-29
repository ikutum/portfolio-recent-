const jwt = require("jsonwebtoken");
const { access_secret, refresh_secret} =require("C:/Users/LENOVO/Desktop/Portpolio Project/config/jwt.js");
 function verifyAccessToken(req,res,next){
    const token = req.header.authorization;

    if (!token){
        return res.status(404).json({message:"Token is not received"});
    }
    jwt.verify(token,access_secret,(err,decode)=>{
        if (err) {
            return res.status(403).json({message:"Invalid Token"});
        } else { 
            console.log(decode);
            req.userId=decode.userId;
            req.name=decode.name;
            req.age=decode.age;
            next();
        }
    });
 }

 function VerifyRefreshToken(refreshToken){
    try {
        const decoded =jwt.verify(refreshToken, refresh_secret);
        console.log(decoded)
        return decoded;
    } catch (error) {
        return null;
    }
 }
 module.exports = { verifyAccessToken , VerifyRefreshToken};