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

resultLogs = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

errorLogs = function(d) {
    error_log_file.write(util.format(d) + '\n');
    error_log_stdout.write(util.format(d) + '\n');
};

var speedTest = require('speedtest-net');
var test = speedTest({maxTime: 5000});

test.on('data', data => {
    resultLogs(data);
});
  
  test.on('error', err => {
    errorLogs(err);
});

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