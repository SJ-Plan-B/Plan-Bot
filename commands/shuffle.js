const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('shuffle song'),

	async execute(interaction)
	{
		try{
			const { client } = require('../index');

			const queue = client.player.getQueue(interaction.guild.id);
            if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
        
            await queue.shuffle();

            interaction.reply({ content: '✅ | Queue has been shuffled!' });
		
		}catch(error){
				logger.error('Error while performing shuffle');
		}
	}
};