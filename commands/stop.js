const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log
const { QueryType } = require('discord-player');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop a song'),
		
	async execute(interaction)
	{
		try{

			const { client } = require('../index');
			const queue = client.player.getQueue(interaction.guild.id);

			if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
			queue.destroy();
			return void interaction.reply({ content: '🛑 | Stopped the player!' });

		}catch(error){
				logger.error('Error while performing Stop');
				console.log(error)
		}
	},
};