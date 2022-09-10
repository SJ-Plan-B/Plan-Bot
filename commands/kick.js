const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick.'))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const user = interaction.options.getUser('target');

			interaction.reply({ content: `You wanted to kick: ${await(user.username)}`, ephemeral: true });
		} catch (error) {
			logger.error('Error while performing Kick.');
		}
	},
};