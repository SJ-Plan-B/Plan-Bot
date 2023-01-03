const logger = require('../util/logger').log
const date1 = new Date();

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		try {
			console.log("Started at "+ date1)
			logger.info(`Ready! Logged in as ${client.user.tag}`);
		} catch (error) {
			logger.error('Error while performing ready')
		}
		//const Guilds = client.channels.cache.map(guild => guild.id);
		//console.log(Guilds);
	},
};