const winston = require('winston');
require('winston-daily-rotate-file');


var transportallevents = new (winston.transports.DailyRotateFile)({
  name: 'log-file',
  level: 'silly',
  filename: './logs/log-%DATE%.log',
  json: false,
  datePattern: 'yyyy-MM-dd',
  prepend: true,
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '14d'
});

var transportinfolog = new (winston.transports.DailyRotateFile)({
  name: 'info-file',
  level: 'info',
  filename: './logs/info-log-%DATE%.log',
  json: false,
  datePattern: 'yyyy-MM-dd',
  prepend: true,
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '14d'
});

var transporterrorlog = new (winston.transports.DailyRotateFile)({
  name: 'error-file',
  level: 'warn',
  filename: './logs/error-log-%DATE%.log',
  json: false,
  datePattern: 'yyyy-MM-dd',
  prepend: true,
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '14d'
});

var logger = new (winston.createLogger)({
  transports: [
    new winston.transports.Console({colorize : true, timestamp:true, level: 'silly'}),
    transportallevents,
    transportinfolog,
    transporterrorlog
  ]
});

module.exports = {
  'log': logger
};


/*
error: 0, error codes
warn: 1, error text
info: 2, 
http: 3, Datenbank Requsts/ API Hocks
verbose: 4, Nachrichten im chat
debug: 5, Debug
silly: 6 only console
*/