const logger = require('../util/logger').log
module.exports = {
	name: 'channelCreate',
	execute(channel) {
		try {
            console.log(`channelCreate: ${channel}`);
		} catch (error) {
			logger.warn('Error while performing channelCreate')
			logger.error(error)
		}
	},
};