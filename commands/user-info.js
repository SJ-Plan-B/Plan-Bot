const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('user-info')
		.setDescription('Display info about yourself.'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			return interaction.reply(`Your username: ${await(interaction.user.username)}\nYour ID: ${await(interaction.user.id)}`);
		} catch (error) {
			logger.error('Error while performing user-info')
		}
	},
};