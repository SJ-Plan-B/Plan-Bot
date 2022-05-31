const { Logform } = require('winston');
const { deploybot } = require('./deploy-commands.js');
const { startbot } = require('./index.js');
const logger = require('./util/logger').log;

logger.info('Deploying Bot');
deploybot()
logger.info('Starting Bot');
startbot()