const logger = require('../util/logger').log
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		try {
			logger.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		} catch (error) {
			logger.warn('Error while performing interactionCreate')
			logger.error(error)
		}
	
	},
};