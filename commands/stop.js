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

			const queue = client.player.nodes.get(interaction.guild.id);

			await interaction.deferReply();

			const stopEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Stop')
			.setDescription(`${await(interaction.user.username)} has stopped the queue!`)  
			
			if (!queue || !queue.node.isPlaying()){
				return void interaction.editReply({ content: 'No music is being played!' });
			}else{
				if (!queue.deleted) queue.delete();
				return void interaction.editReply({ embeds: [stopEmbed],});
			}

		}catch(error){
				logger.error('Error while performing Stop');
				console.log(error)
		}
	},
};