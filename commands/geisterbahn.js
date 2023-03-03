const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Standart_Volumen } = require ('../data/comand.json');
const logger = require('../util/logger').log;
const { command_geisterbahn_song_link, command_geisterbahn_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('geisterbahn')
		.setDescription('HBz x Pazoo x Schalldicht - GEISTERBAHN '),

	async execute(interaction)
	{
		try {
				const song = command_geisterbahn_song_link
				const channel = interaction.member.voice.channel;

				const geisterbahnEmbed = new EmbedBuilder()
				.setColor('#60a8a1')
				.setTitle('Geisterbahn')
				.setDescription(`${await(interaction.user.username)} Fährt mit der geisterbahn`)
				.setThumbnail(command_geisterbahn_picture_link)


				const voiceEmbed = new EmbedBuilder()
				.setColor('#e30926')
				.setTitle('Error')
				.setDescription(`${await(interaction.user.username)} You are required to be in a voice channel.`)
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

				const { client } = require('../index');

			if (!channel) return interaction.reply({ embeds: [voiceEmbed] }); 

			await interaction.deferReply();	
			
			try {
				await client.player.play(channel, song, {
										nodeOptions: {
										metadata: {
										channel: interaction.channel,
										client: interaction.guild.members.me,
										requestedBy: interaction.user,
										},
										selfDeaf: true,
										volume: Standart_Volumen,
										leaveOnEmpty: true,
										leaveOnEmptyCooldown: 300000,
										leaveOnEnd: true,
										leaveOnEndCooldown: 300000,
										},
										});
				} catch (error) {
					return interaction.editReply(`Something went wrong: ${error}`);
				}
				
				await interaction.editReply({ embeds: [geisterbahnEmbed] });
		

		} catch (error) {
			logger.error('Error while performing geisterbahn.')
		}
	},
};