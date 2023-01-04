const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const logger = require('../util/logger').log;
const { command_gans_song_link, command_gans_picture_link } =require('../data/comand.json')
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('gans')
		.setDescription('The Holy Santa Barbara - Dance mit de Gänse.'),

	async execute(interaction)
	{
		try {

			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { ganscounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			const channel = interaction.member.voice.channel;
			const song = command_gans_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'ganscounter'
			let newcountervalue = ganscounter+1

			const GansEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Gans')
			.setDescription(`${await(interaction.user.username)} wird vom Fuchs gestolen.
			So oft wurde die Gans schon vom Fuchs gestohlen: \`${newcountervalue}\``)
			.setThumbnail(command_gans_picture_link)

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
				
			if (!searchResult || !searchResult.tracks.length) return void logger.error('The gans link is invalid!');
	
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

			searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
			if (!queue.playing) await queue.play();

			let output = Number((newcountervalue))
			let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder)

			if(counted === true)interaction.reply({ embeds: [GansEmbed] });

		} catch (error) {
			logger.error('Error while performing gans.')
		}
	},
};