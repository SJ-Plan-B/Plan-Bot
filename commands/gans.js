const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('gans')
		.setDescription('The Holy Santa Barbara - Dance mit de Gänse'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=_LGXSnHtq8Q'

			const GansEmbed = new MessageEmbed()
			.setColor('#e30926')
			.setTitle('Gans')
			.setDescription(`${await(interaction.user.username)} wird vom fuchs gestolen`)
			.setThumbnail('https://media.4-paws.org/b/6/3/d/b63d0abfe39e4dcae26568ef10abc59d3844c0e7/VIER%20PFOTEN-1918x1328.jpg')
			
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
						console.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			console.warn('Error while performing play')
			console.error(error)
		}
	},
};