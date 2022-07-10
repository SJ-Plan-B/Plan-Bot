const logger = require('../util/logger').log
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		try {
			if (!interaction.isButton()){console.log(interaction);}

			logger.verbose(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		} catch (error) {
			logger.error('Error while performing interactionCreate')
		}
	
	},
};