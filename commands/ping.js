const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) 
	{
		try{
			 interaction.reply(`${interaction.user.username} said Ping!\nPong!`);
		}catch(error){
			logger.error('Error while performing ping')
		}
	},
};