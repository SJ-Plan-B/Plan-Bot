const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('resume song'),

	async execute(interaction)
	{
		try{
			const { client } = require('../index');

			const resumEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Resume')
			.setDescription(`${await(interaction.user.username)} has Resumed the queue`)

			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
			const paused = queue.setPaused(false);
			if (paused) return void interaction.reply({ embeds: [resumEmbed] });
		
		}catch(error){
				logger.error('Error while performing resume');
		}
	}
};