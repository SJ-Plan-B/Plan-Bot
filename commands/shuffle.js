const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle songs.'),

	async execute(interaction)
	{
		try{
			const { client } = require('../index');

			const queue = client.player.nodes.get(interaction.guild.id);

			await interaction.deferReply();

			const shuffleEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Shuffle')
			.setDescription(`${await(interaction.user.username)} has shuffled the queue.`)

            if (!queue || !queue.node.isPlaying()) return void interaction.editReply({ content: 'No music is being played!' });
        
            await queue.tracks.shuffle();

            return void interaction.editReply({ embeds: [shuffleEmbed] });
		
		}catch(error){
				logger.error('Error while performing shuffle.');
		}
	}
};