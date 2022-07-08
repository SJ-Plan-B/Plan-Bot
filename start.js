const { deploybot } = require('./deploy-commands.js');
const { startbot } = require('./index.js');
const { cascadingChannels_DB } = require('./util/cascadingChannels_DB.js');
const logger = require('./util/logger').log;

// Send Comands to Discord API
logger.info('Deploying Bot');
deploybot()

//Init DB'S
logger.info('initializing Databases');
cascadingChannels_DB()

logger.info('Starting Bot');
startbot()