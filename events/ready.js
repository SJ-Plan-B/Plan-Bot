const logger = require('../util/logger').log
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		try {
			logger.info(`Ready! Logged in as ${client.user.tag}`);
		} catch (error) {
			logger.error('Error while performing ready')
		}
		//const Guilds = client.channels.cache.map(guild => guild.id);
		//console.log(Guilds);
	},
};