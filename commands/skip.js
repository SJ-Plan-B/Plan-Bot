const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip a song.'),
		
	async execute(interaction)
	{
		try{
			const { client } = require('../index');

			const queue = client.player.nodes.get(interaction.guild.id);

			await interaction.deferReply();

			if (!queue || !queue.node.isPlaying()) return void interaction.editReply({ content: 'No music is being played!' });

			const currentTrack = queue.currentTrack;
			const success = queue.node.skip();

			const skipEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Skip')
			.setDescription(`${await(interaction.user.username)} has skip the song:\n${currentTrack}`)      

			if(success)return void interaction.editReply({ embeds: [skipEmbed],});

		}catch(error){
				logger.error('while performing skip.'); 
		}
	},
};