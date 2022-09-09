const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('jump multiple songs')
        .addIntegerOption(option => option.setName('number').setDescription('number of songs to skip')),
        
	async execute(interaction)
	{
		try{
			let tracks = interaction.options.getInteger('number');

			const jumpEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Queue Jumped')
			.setDescription(`${await(interaction.user.username)} has skipped ${tracks} songs`)

			const { client } = require('../index');
	
			if (!tracks || tracks<2) tracks = 2;
			
			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: 'No music is being played!' });
			
			const trackIndex = tracks - 1;
			const trackName = queue.tracks[trackIndex].title;
			queue.jump(trackIndex);
	
			interaction.reply({ embeds: [jumpEmbed] });
		} catch (error) {
			logger.error('Error while performing jump');
		}
	},
};