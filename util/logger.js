const winston = require('winston');
require('winston-daily-rotate-file');
const {console_log_lvl} = require('../data/config.json')


var transportallevents = new (winston.transports.DailyRotateFile)({
  name: 'log-file',
  level: 'debug',
  filename: './logs/debug-log-%DATE%.log',
  json: false,
  datePattern: 'D-MM-yyyy',
  prepend: true,
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '2d'
});

var transportinfolog = new (winston.transports.DailyRotateFile)({
  name: 'info-file',
  level: 'info',
  filename: './logs/info-log-%DATE%.log',
  json: false,
  datePattern: 'D-MM-yyyy',
  prepend: true,
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '2d'
});

var transporterrorlog = new (winston.transports.DailyRotateFile)({
  name: 'error-file',
  level: 'warn',
  filename: './logs/error-log-%DATE%.log',
  json: false,
  datePattern: 'D-MM-yyyy',
  prepend: true,
  zippedArchive: true,
  maxSize: '200m',
  maxFiles: '2d'
});

var logger = new (winston.createLogger)({
  transports: [
    new winston.transports.Console({colorize : true, timestamp:true, level: console_log_lvl}),
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
info: 2, Logger Events
http: 3, Datenbank Requsts/ API Hocks
verbose: 4, Nachrichten im chat
debug: 5, Debug
silly: 6 only console
*/