const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_geisterbahn_song_link, command_geisterbahn_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('geisterbahn')
		.setDescription('HBz x Pazoo x Schalldicht - GEISTERBAHN'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { geistercounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			let channel = interaction.member.voice.channel;
			let song = command_geisterbahn_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'geistercounter'
			let newcountervalue = geistercounter+1

			const GeisterEmbed = new MessageEmbed()
			.setColor('#e30926')
			.setTitle('Geisterbahn')
			.setDescription(`${await(interaction.user.username)} hat die Geister befreit.
							Die Geister wurden zum \`${newcountervalue}\` mal befreit `)
			.setThumbnail(command_geister_picture_link)

			switch(true){
				case(channel === null):
					interaction.reply('You must be in a Voicechannel');
					break;
	
				case(song === null):
					interaction.reply('no song in Queue');
					break;
	
				default:
					try{
						let output = Number((newcountervalue));
						let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder);

						music.play({ interaction: interaction, channel: channel, song: song});
						if(counted === true)interaction.reply({ embeds: [GeisterEmbed] });
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};