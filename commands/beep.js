const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;


module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('beep')
		.setDescription('Beep!'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			interaction.reply('Boop!');
		}catch (error){
			logger.error('Error while performing Beep!');
		}
	},
};