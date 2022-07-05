const logger = require('../util/logger').log
module.exports = {
	name: 'channelDelete',
	execute(channel) {
		try {
            console.log(`channelDelete: ${channel}`);
		} catch (error) {
			logger.warn('Error while performing channelDelete')
			logger.error(error)
		}
	},
};