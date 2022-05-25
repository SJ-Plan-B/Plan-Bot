const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip a song'),
	async execute(interaction)
	{
		try {
			music.skip({ interaction: interaction });
			return interaction.reply('music skipped');	
		} catch (error) {
			console.error('Error while performing skip')
		}
	},
};