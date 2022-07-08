const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('spezi')
		.setDescription('Nico trinkt sein Spezi aus oder auch nicht'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://youtu.be/Lp1o3jOmc3I'

			const FuchsEmbed = new MessageEmbed()
			.setColor('#073682')
			.setTitle('Spezi')
			.setDescription(`${await(interaction.user.username)} Trinkt etwas von seinem Spezi, Legenden besagen dass er bis heute noch nicht fertig ist.`)
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
						logger.info('Invalide Song Link');
					}}
		} catch (error) {
			logger.warn('Error while performing Spezi')
			logger.error(error)
		}
	},
};