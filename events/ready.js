module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		try {
			console.log(`Ready! Logged in as ${client.user.tag}`);
		} catch (error) {
			console.warn('Error while performing ready')
			console.error(error)
		}
	},
};