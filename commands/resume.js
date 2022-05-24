const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('resume song'),

	async execute(interaction)
	{
		try {
			music.resume({ interaction: interaction });
			interaction.reply('resume music');
		} catch (error) {
			console.error('Error while performing resume')
		}
	},
};