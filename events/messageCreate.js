const { clientId, log_messages_in_consol } = require('../data/config.json');
module.exports = {
	name: 'messageCreate',
	execute(messageCreate){
		try {
			if(log_messages_in_consol == true){console.log(`message is created -> ${messageCreate}`)};
			if (messageCreate.content.startsWith("Ping!")) {
				return messageCreate.reply('Pong!')
			}else if (messageCreate.content.startsWith("Pong!") && messageCreate.author.id === clientId) {
				//console.log('Bot: Pong!')
			}else{}
		}catch(error){
			console.warn('Error while performing interactionCreate')
			console.error(error)
		}
	}
};