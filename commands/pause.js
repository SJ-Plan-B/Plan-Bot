const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('pause a song'),
        
	async execute(interaction)
	{
		try {
			music.pause({ interaction: interaction });
			return interaction.reply('song paused');
		} catch (error) {
			console.error('Error while performing pause')
		}
		
	},
};