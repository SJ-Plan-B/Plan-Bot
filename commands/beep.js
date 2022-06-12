const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log;


module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('beep')
		.setDescription('Beep!'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			return interaction.reply('Boop!');
		}catch (error){
			logger.warn('Error while performing Beep!');
			logger.error(error)
		}
	},
};