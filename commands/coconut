const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const music = require('@koenie06/discord.js-music');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_coconut_song_link, command_coconut_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('coconut')
		.setDescription('Coconut Nut is a Giant Nut'),

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
			.setDescription(`${await(interaction.user.username)} ist von ner Kokosnuss erschlagen worden.
							\`${newcountervalue}\` leute sind schon von Kokosnüssen erschlagen.`)
			.setThumbnail(command_coconut_picture_link)

			switch(true){
				case(channel === null):
					interaction.reply('You must be in a Voicechannel');
					break;
	
				case(song === null):
					interaction.reply('no song in Queue');
					break;
	
				default:
					try{
						let output = Number((fuchscounter));
						let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder);

						music.play({ interaction: interaction, channel: channel, song: song});
						if(counted === true)interaction.reply({ embeds: [CoconutEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};