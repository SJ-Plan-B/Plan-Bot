const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('options-info')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back')),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const value = interaction.options.getString('input');

			if(value)
			return interaction.reply(`The options value is: \`${value}\``);
			return interaction.reply('No option was provided!');
		}catch(error){
			logger.warn('Error while performing options-info')
			logger.error(error)
		}
	},
};