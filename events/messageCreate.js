const logger = require('../util/logger').log
const { clientId, log_messages_in_consol } = require('../data/event.json');
module.exports = {
	name: 'messageCreate',
	execute(messageCreate){
		try {
			if(log_messages_in_consol == true){logger.verbose(`message is created -> ${messageCreate}`)};
			if (messageCreate.content.startsWith("Ping!")) {
				return messageCreate.reply('Pong!')
			}else if (messageCreate.content.startsWith("Pong!") && messageCreate.author.id === clientId) {
				//console.log('Bot: Pong!')
			}else{}
		}catch(error){
			logger.error('Error while performing interactionCreate')
		}
	}
};