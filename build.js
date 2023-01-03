const { log } = require('./util/logger');
const { setconfig } = require('./util/yaml-converter');
const fs = require('node:fs');
const logger = require('./util/logger').log;

// check if DATA dir Exists
let folderName = './data';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  log.error(err);
}

// config modul
logger.info('Starting Config phrasing')
setconfig()