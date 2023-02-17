const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause music.'),
        
	async execute(interaction)
	{
		try{

			const { client } = require('../index');

			const pauseEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Music paused')
			.setDescription(`${await(interaction.user.username)} has paused the music,`)
	
			const queue = client.player.nodes.get(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: 'No music is being played!' });
			const paused = queue.setPaused(true);
			
			if (paused === true) {
				return void interaction.reply({ embeds: [pauseEmbed] });
			} else {
				return void interaction.reply({ content: 'Something went wrong!' });
			}

		}catch(error){
			logger.error('Error while performing pause,')
			console.log(error)
		}
	}
}