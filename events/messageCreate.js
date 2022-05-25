const { clientId } = require('../config.json');
module.exports = {
	name: 'messageCreate',
	execute(messageCreate) {
		console.log(`message is created -> ${messageCreate}`);
		if (messageCreate.content.startsWith("Ping!")) {
			return messageCreate.reply('Pong!')
		}else if (messageCreate.content.startsWith("Pong!") && messageCreate.author.id === clientId) {
			console.log('Bot: Pong!')
		}else{}
	},
};