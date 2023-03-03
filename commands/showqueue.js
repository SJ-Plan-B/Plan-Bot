const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
			let pagesNum = interaction.options.getInteger('page');
			const { client } = require('../index');
        
			const queue = client.player.nodes.get(interaction.guild.id);

			await interaction.deferReply();

			if (!queue || !queue.node.isPlaying()) return void interaction.editReply({ content: 'No music is being played!' });
			if (!pagesNum || pagesNum <= 0) pagesNum = 1;
			
			const tracks = queue.tracks.toArray().map((track, idx) => `**${++idx})** [${track.title}](${track.url})`);
	
			if (pagesNum > 25) pagesNum = 25;
	
			for (let i = 0; i < pagesNum; i++) {
			var list = tracks.slice(i * 5, i * 5 + 5).join('\n');
			var out = i
			}
			const qeueembed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Server Queue')
			.setDescription(await list || '**No more queued songs**')
			.addFields([{ name: 'Now Playing', value: `[${queue.currentTrack?.title}](${queue.currentTrack?.url})` }])
			.setFooter({
				text: `Page ${out + 1} of ${pagesNum} | Total ${queue.tracks.size} tracks`
			});

				return void interaction.editReply({embeds: [qeueembed]})

		} catch (error) {
			logger.error('Error while performing showqueue.')
			console.log(error)
		}
	}
};