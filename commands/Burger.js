const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const music = require('@koenie06/discord.js-music');
const logger = require('../util/logger').log;
const { command_burger_song_link, command_burger_picture_link } =require('../data/comand.json')
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('burger')
		.setDescription('Hamburger Cheeseburger Bigmac Wopper'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { burgercounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			let channel = interaction.member.voice.channel;
			console.log(channel)
			let song = command_burger_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'burgercounter'
			let newcountervalue = burgercounter+1
		

			const BurgerEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Burger')
			.setDescription(`${await(interaction.user.username)} Träumt von Burgern.
							So oft wurde schon von Burgern getäumt: \`${newcountervalue}\``)
			.setThumbnail(command_burger_picture_link)

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
						if(counted === true)interaction.reply({ embeds: [BurgerEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}

				
			} catch (error) {
			logger.error('Error while performing play')
		}
	},
};