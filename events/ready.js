const logger = require('../util/logger').log
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		try {
			logger.info(`Ready! Logged in as ${client.user.tag}`);
		} catch (error) {
			logger.warn('Error while performing ready')
			logger.error(error)
		}
	},
};