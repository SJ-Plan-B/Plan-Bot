const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_fuchs_song_link, command_fuchs_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('fuchs')
		.setDescription('HBz x IIVEN x Bekkaa - Fuchs du hast die Gans gestohlen'),

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

			const FuchsEmbed = new MessageEmbed()
			.setColor('#e30926')
			.setTitle('Fuchs')
			.setDescription(`${await(interaction.user.username)} hat die Gans gestohlen.
							Der Fuchs hat schon zum \`${newcountervalue}\` mal die Gans gestohlen `)
			.setThumbnail(command_fuchs_picture_link)

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
						if(counted === true)interaction.reply({ embeds: [FuchsEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};