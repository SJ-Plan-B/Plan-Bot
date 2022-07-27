const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js');
const logger = require('../util/logger').log
const { MessageEmbed } = require('discord.js');
const { command_surrender_song_link, command_surrender_picture_link } =require('../data/comand.json')

module.exports = 
{ 
	data: new SlashCommandBuilder()
		.setName('surrender')
		.setDescription('surrenders (musik)'),

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

			const surrenderEmbed = new MessageEmbed()
						.setColor('#e30926')
						.setTitle('Surrender')
						.setDescription(`${await(interaction.user.username)} hat surrenderd.
										es wurde bereits ${newcountervalue} Aufgegeben.`)
						.setThumbnail(command_surrender_picture_link)

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
						if(counted === true)interaction.reply({ embeds: [surrenderEmbed] });
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
						
					}}
					
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};