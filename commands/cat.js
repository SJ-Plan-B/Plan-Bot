const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const logger = require('../util/logger').log;
const { command_cat_song_link, command_cat_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Happy cat purring.'),

	async execute(interaction)
	{
		try {
				const song = command_cat_song_link
				const channel = interaction.member.voice.channel;

				const CatEmbed = new EmbedBuilder()
				.setColor('#60a8a1')
				.setTitle('Cat')
				.setDescription(`${await(interaction.user.username)} is a purring cat!`)
				.setThumbnail(command_cat_picture_link)


				const voiceEmbed = new EmbedBuilder()
				.setColor('#e30926')
				.setTitle('Error')
				.setDescription(`${await(interaction.user.username)} You are required to be in a voice channel.`)
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

				const { client } = require('../index');
				const guild = interaction.guild
				const searchResult = await client.player
					.search(song, {
						requestedBy: interaction.user.username,
						searchEngine: QueryType.AUTO
					})
					.catch(() => {
						console.log('he');
					});
					
				if (!searchResult || !searchResult.tracks.length) return void logger.error('The cat link is invalid!');

				const queue = await client.player.createQueue(guild, {
					ytdlOptions: {
						filter: 'audioonly',
						highWaterMark: 1 << 30,
						dlChunkSize: 0,
					},
					metadata: channel
				});

				try {
					if (!queue.connection) await queue.connect(channel);
				} catch {
					void client.player.deleteQueue(guild.id);
					return void interaction.reply({ embeds: [voiceEmbed] });
				}
				
				await interaction.reply({ embeds: [CatEmbed] });
				
				searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
				if (!queue.playing) await queue.play();
				if(queue.playing) queue.setVolume(5);
		

		} catch (error) {
			logger.error('Error while performing cat.')
		}
	},
};