const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
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
			const channel = interaction.member.voice.channel;
			const song = command_surrender_song_link

			const surrenderEmbed = new MessageEmbed()
						.setColor('#e30926')
						.setTitle('Surrender')
						.setDescription(`${await(interaction.user.username)} hat surrenderd`)
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
						music.play({ interaction: interaction, channel: channel, song: song});
						return interaction.reply({ embeds: [surrenderEmbed] });

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