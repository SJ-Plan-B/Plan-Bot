const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js');
const logger = require('../util/logger').log
const { command_surrender_song_link, command_surrender_picture_link } =require('../data/comand.json')

module.exports = 
{ 
	data: new SlashCommandBuilder()
		.setName('surrender')
		.setDescription('Surrender (musik)'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { surrendercounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			const channel = interaction.member.voice.channel;
			const song = command_surrender_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'surrendercounter'
			let newcountervalue = surrendercounter+1

			const surrenderEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Surrender')
			.setDescription(`${await(interaction.user.username)} hat aufgegeben.
							Es wurde bereits ${newcountervalue} aufgegeben.`)
			.setThumbnail(command_surrender_picture_link)

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
					console.log('Error while performing music search in surrender.');
				});
				
			if (!searchResult || !searchResult.tracks.length) return void logger.error('The surrender link is invalid.');
	
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

			searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
			if (!queue.playing) await queue.play();
			
 
			let output = Number((newcountervalue))
			let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder)

			if(counted === true)interaction.reply({ embeds: [surrenderEmbed] });
					
		} catch (error) {
			logger.error('Error while performing surrender.')
		}
	},
};