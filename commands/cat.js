const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Happy Cat Purring'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=CY7t8ow2gOM'
			try{
				music.play({
					interaction: interaction,
					channel: channel,
					song: song
					});
				
				return interaction.reply(`${await(interaction.user.username)} is a Purring cat`);
			}catch(error){
				interaction.reply('Invalide Song Link');
			}
		} catch (error) {
			logger.warn('Error while performing play')
			logger.error(error)
		}
	},
};