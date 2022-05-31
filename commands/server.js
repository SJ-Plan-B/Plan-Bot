const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('server')
		.setDescription('Display info about this server.'),

	async execute(interaction)  // Funktion des Comands
	{
		try{
			return interaction.reply(`Server name: ${await(interaction.guild.name)}\nTotal members: ${await(interaction.guild.memberCount)}`);
		}catch(error){
			logger.warn('Error while performing server')
			logger.error(error)
		}
	},
};