const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip a song'),
		
	async execute(interaction)
	{
		try{
			const { client } = require('../index');
        

			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
			const currentTrack = queue.current;
			const success = queue.skip();
			return void interaction.reply({
				content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
			});
		}catch(error){
				logger.error('while performing skip'); 
		}
	},
};