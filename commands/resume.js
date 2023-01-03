const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume song.'),

	async execute(interaction)
	{
		try{
			const { client } = require('../index');

			const resumEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Resume')
			.setDescription(`${await(interaction.user.username)} has resumed the queue.`)

			const queue = client.player.nodes.get(interaction.guild.id);

			await interaction.deferReply();

			if (!queue || !queue.node.isPlaying()) return void interaction.editReply({ content: 'No music is being played!' });
			const paused = queue.node.pause();
			if (paused) return void interaction.editReply({ embeds: [resumEmbed] });
		
		}catch(error){
				logger.error('Error while performing resume.');
		}
	}
};