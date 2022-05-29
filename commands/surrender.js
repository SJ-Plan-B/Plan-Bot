const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('surrender')
		.setDescription('surrenders (musik)'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=K04aZ90Vo4A'

			const surrenderEmbed = new MessageEmbed()
						.setColor('#e30926')
						.setTitle('Surrender')
						.setDescription(`${await(interaction.user.username)} hat surrenderd`)
						.setThumbnail('https://cdn.sanity.io/images/ccckgjf9/production/0f881cfc9a1c8da6c9bb464c621c9f55d0d87462-1098x752.png?max-h=1080&max-w=1920&fit=scale&auto=format')

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
						console.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
					
		} catch (error) {
			console.warn('Error while performing play')
			console.error(error)
		}
	},
};