const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const logger = require('../util/logger').log;
const { command_gans_song_link, command_gans_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('gans')
		.setDescription('The Holy Santa Barbara - Dance mit de Gänse'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = command_gans_song_link

			const GansEmbed = new MessageEmbed()
			.setColor('#e30926')
			.setTitle('Gans')
			.setDescription(`${await(interaction.user.username)} wird vom fuchs gestolen`)
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
						music.play({ interaction: interaction, channel: channel, song: song});
						return interaction.reply({ embeds: [GansEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.warn('Error while performing play')
			logger.error(error)
		}
	},
};