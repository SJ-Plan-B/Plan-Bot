const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('Spezi')
		.setDescription('Nico du Spast'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=QwZRRsh6khA'

			const FuchsEmbed = new MessageEmbed()
			.setColor('#073682')
			.setTitle('Spezi')
			.setDescription(`${await(interaction.user.username)} hat die Gans gestohlen`)
			.setThumbnail('https://cdn.discordapp.com/attachments/371668449987919873/985488556707422258/2455-1672-max.jpg')

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
						return interaction.reply({ embeds: [FuchsEmbed] })
					}catch(error){
						logger.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			logger.warn('Error while performing Spezi')
			logger.error(error)
		}
	},
};