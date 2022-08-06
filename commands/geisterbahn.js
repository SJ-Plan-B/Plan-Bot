const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
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
			const channel = interaction.member.voice.channel;
			const song = command_geisterbahn_song_link

			const GeisterbahnEmbed = new MessageEmbed()
			.setColor('#e30926')
			.setTitle('Geisterbahn')
			.setDescription(`${await(interaction.user.username)} hat die Geister Aufgeweckt`)
			.setThumbnail(command_geisterbahn_picture_link)

			switch(true){
				case(channel === null):
					interaction.reply('You must be in a Voicechannel');
					break;
	
				case(song === null):
					interaction.reply('no song in Queue');
					break;
	
				default:
					try{
						music.play({ interaction: interaction, channel: channel, song: song});
						return interaction.reply({ embeds: [GeisterbahnEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};