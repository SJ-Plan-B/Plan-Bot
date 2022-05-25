const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop a song'),
	async execute(interaction)
	{
		try {
		music.stop({ interaction: interaction });
		return interaction.reply('music stopped');
		} catch (error) {
			console.error('Error while performing volume')
		}

	},
};