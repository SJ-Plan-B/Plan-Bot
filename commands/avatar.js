const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show.')),

	async execute(interaction)  // Funktion des Comands
	{
		try{
			const user = interaction.options.getUser('target');

			if(user){
			await interaction.reply(`${await(user.username)}'s avatar: ${await(user.displayAvatarURL({ dynamic: true }))}`)
			} else {
			await interaction.reply(`Your avatar: ${await(interaction.user.displayAvatarURL({ dynamic: true }))}`)
		}
		}catch(error){
			logger.error('Error while performing avatar.'); 
		}
	},
};