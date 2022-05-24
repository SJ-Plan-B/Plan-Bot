const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('jump multiple songs'),
        //.addIntegerOption(option => option.setName('number').setDescription('number of songs')),
        
	async execute(interaction)
	{

		
		try {
			const number = interaction.options.getInteger('number');

			music.jump({
				interaction: interaction,
				number: number
			});
			interaction.reply('jump '+number+ ' songs');
		} catch (error) {
			console.error('Error while performing jump'); 
		}

	},
};