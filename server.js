/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 6680;

const winston = require('winston');
const speedTest = require('speedtest-net');

// use body-parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// use static directory
app.use(express.static('./public'));

// route requires
const indexRouter = require('./routes/index.router.js'); 

// use routes
app.use('/', indexRouter); // catch all

// server listening
app.listen(port, () => {
    console.log('Server listening on port: ', port);
}); // end listen

const timeStamp = function(){
    let date = new Date();
    let timestamp = date.getTime();
    return new Date(timestamp);
}
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
});
  
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

/** convert minutes into miliseconds, default to 1 minute */
const duration = (minutes) => {
    minutes = ((typeof minutes) === 'number') ? minutes : 1; 
    return (60000 * minutes)
}

/** Loop through and log results */
setInterval(function() {
    const test = speedTest({maxTime: 5000});
    const time = timeStamp();

    test.on('data', data => {
        logger.info(time);
        logger.info(data);
    });
    test.on('error', err => {
        logger.error(time);
        logger.error(data);
    });
}, duration(15));

/*
speedTest.visual({maxTime: 5000}, (err, data) => {
    console.dir(data);
});
*/