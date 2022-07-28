const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const music = require('@koenie06/discord.js-music');
const logger = require('../util/logger').log;
const { command_cat_song_link, command_cat_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Happy Cat Purring'),

	async execute(interaction)
	{

		const CatEmbed = new EmbedBuilder()
		.setColor('#60a8a1')
		.setTitle('Cat')
		.setDescription(`${await(interaction.user.username)} is a Purring cat`)
		.setThumbnail(command_cat_picture_link)

		try {
			const channel = interaction.member.voice.channel;
			const song = command_cat_song_link
			try{
				music.play({
					interaction: interaction,
					channel: channel,
					song: song
					});
				
				interaction.reply({ embeds: [CatEmbed] })
			}catch(error){
				interaction.reply('Invalide Song Link');
			}
		} catch (error) {
			logger.error('Error while performing play')
		}
	},
};