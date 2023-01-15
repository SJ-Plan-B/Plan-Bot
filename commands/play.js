const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log
const { QueryType } = require('discord-player');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song!')
		.addStringOption(option => option.setName('song').setDescription('Add a song link from youtube.').setRequired(true)),

	async execute(interaction)
	{

		try{
			const channel = interaction.member.voice.channel;
			const song = interaction.options.getString('song');

				const nosongEmbed = new EmbedBuilder()
				.setColor('#e30926')
				.setTitle('Error')
				.setDescription(`${await(interaction.user.username)} no song in link`)
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

				const voiceEmbed = new EmbedBuilder()
				.setColor('#e30926')
				.setTitle('Error')
				.setDescription(`${await(interaction.user.username)} You must be in a Voicechannel`)
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
					
				if (!searchResult || !searchResult.tracks.length) return void interaction.reply({ embeds: [nosongEmbed] });
		
				const queue = await client.player.createQueue(guild, {
					leaveOnEnd: true,
					leaveOnStop: true,
					leaveOnEmpty: true,
					leaveOnEmptyCooldown: 300000,
					disableEqualizer: true,
					ytdlOptions: {
						filter: "audioonly",
						opusEncoded: true,
						quality: "highestaudio",
						highWaterMark: 1 << 30,
					},
					metadata: channel,
					
				});				
				try {
					if (!queue.connection) await queue.connect(channel);
				} catch {
					void client.player.deleteQueue(guild.id);
					return void interaction.reply({ embeds: [voiceEmbed] });
				}


				searchResult.playlist ? await queue.addTracks(searchResult.tracks) : await queue.addTrack(searchResult.tracks[0]);
				if (!queue.playing) await queue.play();
				const playEmbed = new EmbedBuilder()
				.setColor('#e30926')
				.setTitle('Playing')
				.setDescription(`The bot is now playing ${searchResult.playlist ? 'the playlist '+searchResult.tracks[0].playlist.title+' with '+searchResult.tracks[0].playlist.tracks.length+' songs' : 'the song '+searchResult.tracks[0].title}`)
				.setThumbnail('https://cdn-icons-png.flaticon.com/512/1384/1384060.png')
				
				await interaction.reply({ embeds: [playEmbed] });
		}catch(error){
			logger.error('Error while performing play.');
			console.log(error)
		}
	}
};