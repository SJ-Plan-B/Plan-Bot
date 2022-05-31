const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) 
	{
		try{
			return interaction.reply(`${interaction.user.username} said Ping!\nPong!`);
		}catch(error){
			logger.warn('Error while performing ping')
			logger.log(error)
		}
	},
};