const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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

			const shuffleEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Shuffle')
			.setDescription(`${await(interaction.user.username)} has shuffled the queue`)

			const queue = client.player.getQueue(interaction.guild.id);
            if (!queue || !queue.playing) return void interaction.reply({ content: 'No music is being played!' });
        
            await queue.shuffle();

            return void interaction.reply({ embeds: [shuffleEmbed] });
		
		}catch(error){
				logger.error('Error while performing shuffle');
		}
	}
};