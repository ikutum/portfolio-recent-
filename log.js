const winston = require('winston');

const {combine, timestamp, printf} = winston.format;
const myFormate =printf (({level,message,timestamp}) => {
    return `${timestamp} [${level}]: ${message}`;
    });
    const logger = winston.createLogger({
        level: 'info',
        format: combine(timestamp(),myFormate),
        transports: [
          new winston.transports.File({ filename: 'app.log' })
    
        ],
      });

      module.exports= logger;