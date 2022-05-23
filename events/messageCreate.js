module.exports = {
	name: 'messageCreate',
	execute(messageCreate) {
		console.log(`message is created -> ${messageCreate}`);
		if (messageCreate.content.startsWith("Ping!")) {
			return messageCreate.reply('Pong!')
		}else {
			console.log('false Ping!')
		}
	},
};
