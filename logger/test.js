const logger = require('../util/logger').log
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		try {
			logger.info(`das ist der logger test`);
		} catch (error) {
			logger.warn('Error while performing ready')
			logger.error(error)
		}
	},
};