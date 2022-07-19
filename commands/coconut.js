const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
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
			const channel = interaction.member.voice.channel;
			const song = command_coconut_song_link

			const CoconutEmbed = new MessageEmbed()
			.setColor('#e30926')
			.setTitle('Coconut')
			.setDescription(`${await(interaction.user.username)} ist von ner Kokosnuss erschlagen worden`)
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
						music.play({ interaction: interaction, channel: channel, song: song});
						return interaction.reply({ embeds: [CoconutEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};