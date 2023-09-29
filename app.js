const mongoose = require('mongoose');
const express=require('express');
const morgan = require('morgan');
const winston = require('winston');
//const fs = require('fs'); 
//const path = require('path');
const authRoutes =require('./routes/authRoutes.js');
const resourceRoutes= require('./routes/resourceRoutes.js');
require('dotenv').config();
const app= express();
const logger =require('./logs/log.js');
//logger.info('This is an informational message.');
app.use(express.json());
const winstonLoggerStream = {            //winston loggerStream
    write: (message) => {
      logger.info(message);
    },
  };
  app.use(morgan('combined' ,{stream : winstonLoggerStream})); 
 //const morganLoggerStream = {
  //  write: (message) => {
    //  logger.info(message.trim());
   // },
  //};
  //app.use(morgan('combined', { stream: morganLoggerStream }));
//const logFilePath = path.join(__dirname, 'logs', 'app.log');
//const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });
//app.use(morgan('combined', { stream: accessLogStream }));
app.use('/authRoutes', authRoutes);
app.use('/resourceRoutes',resourceRoutes);
const PORT = process.env.PORT||8000;                       //port

url = 'mongodb+srv://kalsoom:kutum06@cluster0.0v9buxt.mongodb.net/';                  //DATABASE CONNECTION
mongoose.connect(url,
    {useNewUrlParser:true,
     useUnifiedTopology:true,})
    .then(()=>
    console.log("Database connected"))
    .catch(err =>
        console.log(`Error connecting to the database ${err}`));
    
app.listen(PORT,()=>{                                             //PORT LISTENING
    console.log(`server is listening at port ${PORT}`);
});
