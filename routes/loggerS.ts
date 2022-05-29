const winston = require('winston');
const option = {
    // level: 'info',
    transports : [
            new winston.transports.Console({
                level: 'info',
            colorize: true
        }),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'info',
                maxsize :5242880,
                maxFiles : 5,
                colorize: true
        
              }),

    ]
}

const logger = winston.createLogger(option);
logger.info('info');
logger.warn('warn');