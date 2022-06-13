const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song')
		.setDMPermission(false)
		.addStringOption(option => option.setName('song').setDescription('add a song youtube link').setRequired(true)),

	async execute(interaction)
	{
		try{
			const channel = interaction.member.voice.channel;
			const song = interaction.options.getString('song');

			const playEmbed = new MessageEmbed()
				.setColor('#e30926')
				.setTitle('Playing')
				.setDescription(`${await(interaction.user.username)} plays \n ${song} `)
				.setThumbnail('https://cdn-icons-png.flaticon.com/512/1384/1384060.png')

				const nosongEmbed = new MessageEmbed()
				.setColor('#e30926')
				.setTitle('Error')
				.setDescription(`${await(interaction.user.username)} no song in Queue`)
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

				const voiceEmbed = new MessageEmbed()
				.setColor('#e30926')
				.setTitle('Error')
				.setDescription(`${await(interaction.user.username)} You must be in a Voicechannel`)
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')


			switch(true){
				case(channel === null):
					interaction.reply({ embeds: [voiceEmbed] });
					break;
	
				case(song === null):
					interaction.reply({ embeds: [nosongEmbed] });
					break;
	
				default:
					try{
						music.play({ interaction: interaction, channel: channel, song: song});
						return interaction.reply({ embeds: [playEmbed] });
					}catch(error){
						interaction.reply('Invalide Song Link');
					}}
		}catch(error){
			logger.warn('Error while performing ping');
			logger.error(error)
		}
	}
};