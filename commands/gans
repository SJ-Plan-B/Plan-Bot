const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const music = require('@koenie06/discord.js-music');
const logger = require('../util/logger').log;
const { command_gans_song_link, command_gans_picture_link } =require('../data/comand.json')
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('gans')
		.setDescription('The Holy Santa Barbara - Dance mit de Gänse'),

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
			.setDescription(`${await(interaction.user.username)} wird vom fuchs gestolen.
			So oft wurde die Gans schon vom Fuchs gestohlen: \`${newcountervalue}\``)
			.setThumbnail(command_gans_picture_link)
			
			switch(true){
				case(channel === null):
					interaction.reply('You must be in a Voicechannel');
					break;
	
				case(song === null):
					interaction.reply('no song in Queue');
					break;
	
				default:
					try{
						let output = Number((newcountervalue))
            			let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder)

						music.play({ interaction: interaction, channel: channel, song: song});
						if(counted === true)interaction.reply({ embeds: [GansEmbed] });
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};