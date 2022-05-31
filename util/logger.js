const winston = require('winston');
require('winston-daily-rotate-file');


var transport = new (winston.transports.DailyRotateFile)({
  name: 'log-file',
  level: 'silly',
  filename: './logs/log-%DATE%.log',
  json: false,
  datePattern: 'yyyy-MM-dd',
  prepend: true
});

var logger = new (winston.createLogger)({
  transports: [
    new winston.transports.Console({colorize : true, timestamp:true, level: 'silly'}),
    transport
  ]
});

module.exports = {
  'errorlog': logger
};
/*
error: 0,
warn: 1,
info: 2,
http: 3,
verbose: 4,
debug: 5,
silly: 6
*/