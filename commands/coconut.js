const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_coconut_song_link, command_coconut_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('coconut')
		.setDescription('Coconut is a giant nut!'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { coconutcounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			const channel = interaction.member.voice.channel;
			const song = command_coconut_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'coconutcounter'
			let newcountervalue = coconutcounter+1

			const CoconutEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Coconut')
			.setDescription(`${await(interaction.user.username)} ist von 'ner Kokosnuss erschlagen worden.
							\`${newcountervalue}\` Personen wurden schon von Kokosnüssen erschlagen.`)
			.setThumbnail(command_coconut_picture_link)

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
				
			if (!searchResult || !searchResult.tracks.length) return void logger.error('The coconut link is invalid.');
	
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

			if(counted === true)interaction.reply({ embeds: [CoconutEmbed] });

		} catch (error) {
			logger.error('Error while performing coconut.')
		}
	},
};