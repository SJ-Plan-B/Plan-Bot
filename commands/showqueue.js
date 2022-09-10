const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('showqueue')
		.setDescription('Shows the music queue.')
		.addIntegerOption(option => option.setName('page').setDescription('Enter the page of queue that you want to view.')),

	async execute(interaction)
	{
		try {
			let page = interaction.options.getInteger('page');
			const { client } = require('../index');
        
			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: 'No music is being played!' });
			if (!page) page = 1;
			
			const pageStart = 10 * (page - 1);
			const pageEnd = pageStart + 10;

			const currentTrack = queue.current;
			const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
				return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
			});
	
			return void interaction.reply({
				embeds: [
					{
						title: 'Server Queue',
						description: `${tracks.join('\n')}${
							queue.tracks.length > pageEnd
								? `\n...${queue.tracks.length - pageEnd} more track(s)`
								: ''
						}`,
						color: 0xff0000,
						fields: [{ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
					}
				]
			});

		} catch (error) {
			logger.error('Error while performing showqueue.')
		}
	}
};