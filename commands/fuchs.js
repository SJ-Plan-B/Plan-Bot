const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_fuchs_song_link, command_fuchs_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('fuchs')
		.setDescription('HBz x IIVEN x Bekkaa - Fuchs du hast die Gans gestohlen.'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { fuchscounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			let channel = interaction.member.voice.channel;
			let song = command_fuchs_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'fuchscounter'
			let newcountervalue = fuchscounter+1

			const FuchsEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Fuchs')
			.setDescription(`${await(interaction.user.username)} hat die Gans gestohlen.
							Der Fuchs hat schon zum \`${newcountervalue}\`. Mal die Gans gestohlen.`)
			.setThumbnail(command_fuchs_picture_link)

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
					console.log('Error while performing music search in fuchs.');
				});
				
			if (!searchResult || !searchResult.tracks.length) return void logger.error('The fuchs link is invalid!');
	
			const queue = await client.player.createQueue(guild, {
				ytdlOptions: {
					filter: 'audioonly',
					highWaterMark: 1 << 30,
					dlChunkSize: 0,
				},
				metadata: channel,
				disableEqualizer: true
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

			if(counted === true)interaction.reply({ embeds: [FuchsEmbed] });

		} catch (error) {
			logger.error('Error while performing fuchs.')
		}
	},
};