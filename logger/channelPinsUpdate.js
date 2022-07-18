const logger = require('../util/logger').log
module.exports = {
	name: 'channelPinsUpdate',
	execute(channel, time) {
		try {
            console.log(`channelPinsUpdate: ${channel}:${time}`);
		} catch (error) {
			logger.warn('Error while performing channelPinsUpdate in logger')
			logger.error(error)
		}
	},
};