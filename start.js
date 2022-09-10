const { deploybot } = require('./deploy-commands.js');
const { startbot } = require('./index.js');
const { cascadingChannels_DB } = require('./util/cascadingChannels_DB.js');
const { role_reaction_DB } = require('./util/role_reaction_DB.js');
const logger = require('./util/logger').log;


// Send Comands to Discord API
logger.info('Deploying Bot');
deploybot()

//Init DB'S
logger.info('initializing Databases');
cascadingChannels_DB()
role_reaction_DB()

// Start the bot
logger.info('Starting Bot');
startbot()