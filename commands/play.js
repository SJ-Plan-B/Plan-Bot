const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log
const { QueryType } = require('discord-player');
const { Standart_Volumen } = require ('../data/comand.json');

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
			const { client } = require('../index');

			const voiceEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Error')
			.setDescription(`${await(interaction.user.username)} You must be in a Voicechannel`)
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

			if (!channel) return interaction.reply({ embeds: [voiceEmbed] }); 

			await interaction.deferReply();	
			try {
				await client.player.play(channel, song, {
										nodeOptions: {
										metadata: {
										channel: interaction.channel,
										client: interaction.guild.members.me,
										requestedBy: interaction.user,
										},
										selfDeaf: true,
										volume: Standart_Volumen,
										leaveOnEmpty: true,
										leaveOnEmptyCooldown: 300000,
										leaveOnEnd: true,
										leaveOnEndCooldown: 300000,
										},
										});
				} catch (error) {
					return interaction.editReply(`Something went wrong: ${error}`);
				}

				const searchResult = await client.player
					.search(song, {
						requestedBy: interaction.user.username,
						searchEngine: QueryType.AUTO
					})
					.catch(() => {
						console.log('error during resolve of the song in play function');
					});
				

			const playEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Playing')
			.setDescription(`The bot is now playing ${searchResult.playlist ? 'the playlist '+searchResult.tracks[0].playlist.title+' with '+searchResult.tracks[0].playlist.tracks.length+' songs' : 'the song '+searchResult.tracks[0].title}`)
			.setThumbnail('https://cdn-icons-png.flaticon.com/512/1384/1384060.png')
			
			await interaction.editReply({ embeds: [playEmbed] });

		}catch(error){
			logger.error('Error while performing play.');
			console.log(error)
		}
	}
};