const logger = require('../util/logger').log
module.exports = {
	name: 'channelUpdate',
	execute(oldChannel, newChannel,) {
		try {
            console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`)
            console.log(`oldChannel: ${oldChannel}, newChannel: ${newChannel}`)
		} catch (error) {
			logger.warn('Error while performing channelUpdate in logger')
			logger.error(error)
		}
	},
};