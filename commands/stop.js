const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop a song.'),
		
	async execute(interaction)
	{
		try{
			const { client } = require('../index');
			const queue = client.player.getQueue(interaction.guild.id);
			const stopEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Stop')
			.setDescription(`${await(interaction.user.username)} has stopped the queue!`)  
			
			if (!queue || !queue.playing){
				return void interaction.reply({ content: 'No music is being played!' });
			}else{
				queue.destroy();
				return void interaction.reply({ embeds: [stopEmbed],});
			}

		}catch(error){
				logger.error('Error while performing Stop');
				console.log(error)
		}
	},
};