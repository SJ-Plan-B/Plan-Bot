const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('server')
		.setDescription('Display info about this server.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction)  // Funktion des Comands
	{
		try{
			interaction.reply(`Server name: ${await(interaction.guild.name)}\nTotal members: ${await(interaction.guild.memberCount)}`);
		}catch(error){
			logger.error('Error while performing server')
		}
	},
};