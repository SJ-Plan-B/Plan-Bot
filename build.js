const { setconfig } = require('./util/yaml-converter');
const logger = require('./util/logger').log;

// config modul
logger.info('Starting Config phraser')
setconfig()