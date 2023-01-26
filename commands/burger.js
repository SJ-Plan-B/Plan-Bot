const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const logger = require('../util/logger').log;
const { command_burger_song_link, command_burger_picture_link } =require('../data/comand.json')
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('burger')
		.setDescription('Hamburger, Cheeseburger, Big Mac, Whopper.'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { burgercounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			let channel = interaction.member.voice.channel;
			let song = command_burger_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'burgercounter'
			let newcountervalue = burgercounter+1
		

			const BurgerEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Burger')
			.setDescription(`${await(interaction.user.username)} Träumt von Burgern.
							So oft wurde schon von Burgern geträumt: \`${newcountervalue}\``)
			.setThumbnail(command_burger_picture_link)

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
					console.log('Error while performing music search in burger');
				});
				
			if (!searchResult || !searchResult.tracks.length) return void logger.error('The burger link is invalid!');
	
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

			if(counted === true)interaction.reply({ embeds: [BurgerEmbed] });
				
			} catch (error) {
			logger.error('Error while performing burger.')
		}
	},
};