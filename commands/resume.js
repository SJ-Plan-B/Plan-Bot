const { SlashCommandBuilder } = require('discord.js');
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

			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
			const paused = queue.setPaused(false);
			return void interaction.reply({ content: paused ? '▶ | Resumed!' : '❌ | Something went wrong!' });
		
		}catch(error){
				logger.error('Error while performing resume');
		}
	}
};