/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 6680;

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


var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/result.log', {flags : 'w'});
var log_stdout = process.stdout;

var error_log_file = fs.createWriteStream(__dirname + '/error.log', {flags : 'w'});
var error_log_stdout = process.stdout;

timeStamp = function(){
    let date = new Date();
    let timestamp = date.getTime();
    return new Date(timestamp);
}

const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

/*
resultLogs = function(d) {
    log_file.write(util.format(timeStamp()) + '\n');
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

errorLogs = function(d) {
    error_log_file.write(util.format(timeStamp()) + '\n');
    error_log_file.write(util.format(d) + '\n');
    error_log_stdout.write(util.format(d) + '\n');
};
*/

var speedTest = require('speedtest-net');

setInterval(function() {
    var test = speedTest({maxTime: 5000});

    test.on('data', data => {
        logger.info(timeStamp());
        logger.info(data);
        //resultLogs(data);
    });
      
      test.on('error', err => {
          logger.error(timeStamp());
          logger.error(data);
        //errorLogs(err);
    });
}, 60 * 1000); // 60 * 15000 milsec - 15 min

/*
speedTest.visual({maxTime: 5000}, (err, data) => {
    console.dir(data);
});

test.on('data', data => {
  console.dir(data);
});

test.on('error', err => {
  console.error(err);
});
*/